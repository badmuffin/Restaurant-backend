import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

import menuRoutes from "./api/menu/menu.routes";
import userRoutes from "./api/user/user.routes";
import reviewRoutes from "./api/reviews/review.routes";
import newsletterRoutes from "./api/newsletter/newsletter.routes";
import { authenticate } from "./middlewares/Auth";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // for making public static

// routes
app.use("/api/menu", authenticate, menuRoutes);
app.use("/api/review", authenticate, reviewRoutes);

app.use("/user", userRoutes);
app.use("/api/newsletter", newsletterRoutes);

// testing 
app.get("/", (req: Request, res: Response) => {
  res.send("Hello")
})

export default app;
