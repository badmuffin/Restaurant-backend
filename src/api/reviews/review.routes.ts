import express, { RequestHandler } from "express";
import { deleteReview, getReview, postReview, updateReview } from "./review.controller";
import { upload } from "../../utils/upload.util";

const router = express.Router();

router.get("/", getReview as RequestHandler);
router.post("/", upload.single("img"), postReview as RequestHandler);
router.put("/:id", upload.single("img"), updateReview as RequestHandler);
router.delete("/:id", deleteReview as RequestHandler);

export default router;
