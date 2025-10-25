import express from "express";
import multer from "multer";
import { sendBulkEmail } from "../controllers/mailController.js";

const router = express.Router();
const upload = multer(); // memory storage

router.post("/send-bulk", upload.single("file"), sendBulkEmail);

export default router;
