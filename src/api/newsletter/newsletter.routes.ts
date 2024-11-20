import express, { RequestHandler } from "express";
import { sendingMail } from "./newsletter.controller";

const router = express.Router();

router.post("/", sendingMail as RequestHandler);

export default router;