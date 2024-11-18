import express, { RequestHandler } from "express"
import { handleUserLogin , handleUserSignup } from "./user.controller";

const router = express.Router();

// login routes
router.post("/login", handleUserLogin as RequestHandler);
router.post("/signup", handleUserSignup as RequestHandler);

export default router;
