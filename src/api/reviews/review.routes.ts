import express from "express";
import { deleteReview, getReview, postReview, updateReview } from "./review.controller";
import { upload } from "../../utils/upload.util";

const router = express.Router();

router.get("/", getReview);
router.post("/", upload.single("img"), postReview);
router.put("/:id", upload.single("img"), updateReview);
router.delete("/:id", deleteReview);

export default router;
