import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* 🔌 MONGO CONNECT */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB ligado ✅"))
  .catch(err => console.log("Erro Mongo:", err));

/* 🧪 TEST ROUTE */
app.get("/", (req, res) => {
  res.send("FlashStream Backend a funcionar 🚀");
});

/* 📌 POST MODEL */
const PostSchema = new mongoose.Schema({
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

/* 📌 GET POSTS */
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

/* 📌 CREATE POST */
app.post("/posts", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

/* 🚀 START SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
