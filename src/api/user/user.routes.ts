import express from "express"
import { handleUserLogin , handleUserSignup } from "./user.controller";

const router = express.Router();

// login routes
router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);

export default router;
 