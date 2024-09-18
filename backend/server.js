import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { extractVideoId, getVideoDetails } from "./lib/VideoHelpers.js";

//imports environment variables from .env or .env.local file
dotenv.config({ path: ".env.local" });

//creating express app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//state for songs (can possibly be stored in a database)
let queue = [];
let storage = [];
let currentVideo = null;
let videoTimer = null;

let skipCount = 0;
const skipRequests = new Set();

//middleware to parse json
app.use(express.json());

app.use(cors());

//middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//function to update storage with plays and lastPlayed
function updateStorage(videoId) {
  const index = storage.findIndex((video) => video.id === videoId);

  if (index != -1) {
    storage[index].plays++;
    storage[index].lastPlayed = new Date();
    io.emit("storageUpdated", { storage });
  }
}

//function to start video timer
function startVideoTimer() {
  if (videoTimer) {
    clearInterval(videoTimer); // Clear the previous timer if it exists
  }

  if (currentVideo) {
    console.log("Starting video timer for ", currentVideo.title);

    videoTimer = setTimeout(() => {
      // Set a new timer for the new current video
      nextVideo();
    }, currentVideo.duration * 1000);
  }
}

//function to go to next video
function nextVideo() {
  //Reset skip count emits an update
  skipCount = 0;
  skipRequests.clear();
  io.emit("skipCountUpdated", { skipCount });

  if (currentVideo) {
    //uses the current video to update storage
    updateStorage(currentVideo.id);
  }

  if (queue.length > 0) {
    //checks if there are videos in the queue
    console.log("Video ended, next video starting...");

    currentVideo = queue.shift();
    io.emit("currentVideoChanged", { currentVideo });
    io.emit("queueUpdated", { queue });
    startVideoTimer(); //starts the timer for the new current video
  } else {
    console.log("Video ended, no more videos in queue.");

    if (videoTimer) {
      //clears the timer if there are no more videos in the queue
      clearInterval(videoTimer);
    }

    currentVideo = null;
    io.emit("currentVideoChanged", { currentVideo });
  }
}

//endpoints for storage, queue, and currentVideo
app.get("/songs/storage", (req, res) => {
  return res.status(200).json(storage);
});

app.get("/songs/queue", (req, res) => {
  return res.status(200).json(queue);
});

app.get("/songs/current", (req, res) => {
  return res.status(200).json(currentVideo);
});

//add song through url
app.post("/songs/url", async (req, res) => {
  //extracts video id from url
  const { url } = req.body;
  const videoId = extractVideoId(url);

  if (!videoId) {
    //checks if videoId is valid (not null)
    return res.status(400).json({ error: "Invalid youtube url" });
  }

  let video = storage.find((video) => video.id === videoId); //checks if video is already in storage

  if (!video) {
    //if video is not in storage, get video details
    console.log("not found in storage");
    const newVid = await getVideoDetails(videoId);

    //if video is not found, return error
    if (!newVid) {
      return res.status(401).json({ error: "Invalid video id" });
    }

    //if video is found, add to storage
    const { id, title, duration } = newVid;
    video = {
      id,
      url,
      title,
      duration,
      plays: 0,
      likes: 0,
      lastPlayed: new Date(0),
    };
    storage.push(video);
    io.emit("storageUpdated", { storage });
  }

  //add video to queue if it is not the current video
  if (currentVideo) {
    queue.push(video);
    io.emit("queueUpdated", { queue });
  } else {
    currentVideo = video;
    io.emit("currentVideoChanged", { currentVideo });
    startVideoTimer();
  }

  return res.status(200).json(video);
});

//socket io connection
io.on("connection", (socket) => {
  //emits the skipCount once a user connects
  io.emit("skipCountUpdated", { skipCount });

  //Listens for skipRequest from the client
  socket.on("skipRequest", () => {
    if (currentVideo) {
      console.log("Skip request received");

      //checks if the user has already requested to skip
      if (!skipRequests.has(socket.id)) {
        console.log("Skip request added");
        skipRequests.add(socket.id);
        skipCount++;
      }

      //if skipCount reaches 5, go to the next video
      if (skipCount >= 5) {
        console.log("Skip count reached, skipping video");
        nextVideo();
      }

      io.emit("skipCountUpdated", { skipCount });
    } else {
      console.log("No video to skip");
    }
  });
});

//Listen in PORT
server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
