import express, { Request, Response } from "express";
import cors from "cors";
import menuRoutes from "./api/menu/menu.routes";
import userRoutes from "./api/user/user.routes";
import reviewRoutes from "./api/reviews/review.routes";
import newsletterRoutes from "./api/newsletter/newsletter.routes";
import path from "path";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


// routes
app.use("/api/menu", menuRoutes);
app.use("/user", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello")
})

// app.all('*', (req: Request, res: Response) => {
//   res.status(404).send("Route does not exist");
// });

export default app;
