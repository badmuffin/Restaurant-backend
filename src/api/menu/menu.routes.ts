import express, { RequestHandler } from "express";
import { deleteMenu, getMenu, postMenu, updateMenu } from "./menu.controller";
import { upload } from "../../utils/upload.util";

const router = express.Router();

router.get("/", getMenu as RequestHandler);
router.post("/", upload.single('img'), postMenu as RequestHandler);
router.put("/:id", updateMenu as RequestHandler);
router.delete("/:id", deleteMenu as RequestHandler);

export default router;