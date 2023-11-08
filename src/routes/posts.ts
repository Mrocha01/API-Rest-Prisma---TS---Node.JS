import express from "express";
import PostController from "../controllers/PostController";

const router = express.Router();

router.post("/create", PostController.createPost);
router.get("/all", PostController.allPosts);

export default router;