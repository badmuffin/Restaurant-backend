import express from "express";
import { deleteMenu, getMenu, postMenu, updateMenu } from "./menu.controller";
import { upload } from "../../utils/upload.util";

const router = express.Router();

router.get("/", getMenu);
router.post("/", upload.single('img'), postMenu);
router.put("/:id",upload.single('img'), updateMenu);
router.delete("/:id", deleteMenu);

export default router;