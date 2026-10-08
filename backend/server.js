import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { extractVideoId, getVideoDetails } from "./lib/VideoHelpers.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

//imports environment variables from .env or .env.local file
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicRoot = path.join(__dirname, "../backend/public/dist");

//creating express app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


//state for songs
const VideoSchema = mongoose.Schema({
  id: String,
  url: String,
  title: String,
  duration: Number,
  plays: Number,
  likes: Number,
  lastPlayed: { type: Date, default: Date(0) } // Must use type: when multiple properties
});

// Create Model - A model is a class with which we construct documents.
const VideoModel = mongoose.model('Video', VideoSchema, 'JukeboxVideo');

let queue = [];
let currentVideo = null;
let videoTimer = null;
let currentVideoStartTime = null;

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

//function to increment plays and updated lastPlayed date
async function updateStorage(videoId) {
  console.log("UPDATE ENTRY")

  const searchFilter = { id: videoId}
  const update = { $inc: {plays: 1}, $set: {lastPlayed: new Date()}} // Increment plays and set lastPlayed 
  const res = await VideoModel.updateOne(searchFilter, update)

  const storage = await VideoModel.find();
  io.emit("storageUpdated", { storage });
}

//function to set timeout for current video
function startVideoTimer() {
  if (videoTimer) {
    clearInterval(videoTimer); // Clear the previous timer if it exists
  }

  if (currentVideo) {
    console.log("Starting video timer for ", currentVideo.title);
    currentVideoStartTime = Date.now();

    videoTimer = setTimeout(() => {
      // Set a new timer for the new current video
      nextVideo();
    }, (currentVideo.duration + 1) * 1000);
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
    currentVideoStartTime = null;
    io.emit("currentVideoChanged", { currentVideo });
  }
}

//endpoints for storage, queue, and currentVideo
app.get("/songs/storage", async (req, res) => {
  const savedVideos = await VideoModel.find();
  return res.status(200).json(savedVideos);
});

app.get("/songs/queue", (req, res) => {
  return res.status(200).json(queue);
});

app.get("/songs/current", (req, res) => {
  if (currentVideo) {
    const elapsed = currentVideoStartTime ? (Date.now() - currentVideoStartTime) / 1000 : 0;
    const responseData = JSON.parse(JSON.stringify(currentVideo));
    responseData.progress = elapsed;
    return res.status(200).json(responseData);
  }
  return res.status(200).json(null);
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

  let video = await VideoModel.findOne({id: videoId})
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
    const dbVideo = new VideoModel(video)
    dbVideo.save()
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

app.use(express.static(publicRoot));

app.get("*", (req, res, next) => {
  // Frontend client handles
  return res.sendFile(path.join(publicRoot, "index.html"));
});


// Connect to database then have server listen on PORT
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, {})
  .then(() => {
    server.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`))
  })
  .catch((error) => console.log(error.message));