import express from "express";
import { sendingMail } from "./newsletter.controller";

const router = express.Router();

router.post("/", sendingMail);

export default router;