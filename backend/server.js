import express from "express";
import dotenv from "dotenv";
import http, { get } from "http";
import { Server } from "socket.io";
import { extractVideoId, getVideoDetails } from "./lib/VideoHelpers.js";

//imports environment variables from .env or .env.local file
dotenv.config({ path: '.env.local' });

//creating express app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//state for songs (can posiibly be stored in a database)
let queue = [];
let storage = [];
let currentVideo = null;
let videoTimer = null;

//middleware to parse json
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/songs", (req, res) => {});

//add song through url
app.post("/songs/url", async (req, res) => {
  const { url } = req.body;
  const videoId = extractVideoId(url);

  if (!videoId) {
    return res.status(400).json({ error: "Invalid youtube url" });
  }

  let video = storage.find((video) => video.id === videoId);

  if (!video) {
    console.log("not found in storage")
    const newVid = await getVideoDetails(videoId);

    if (!newVid) {
      return res.status(401).json({ error: "Invalid video id" });
    }

    const { id, title, duration } = newVid;
    video = { id, title, duration, plays: 0, likes: 0 };
    storage.push(video);
  }

  queue.push(video);

  io.emit("queueUpdated", { queue});

  return res.status(200).json(video);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
