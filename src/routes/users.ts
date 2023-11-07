import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/create", UserController.createUser);
router.get("/find/:id", UserController.getUserById);
router.get("/find/email/:email", UserController.getUserByEmail);

export default router;
