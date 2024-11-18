import express, { RequestHandler } from "express";
import { deleteMenu, getMenu, postMenu, updateMenu } from "./menu.controller";

const router = express.Router();

router.get("/", getMenu as RequestHandler);
router.post("/", postMenu as RequestHandler);
router.put("/:id", updateMenu as RequestHandler);
router.delete("/:id", deleteMenu as RequestHandler);

export default router;