import express, { Request, Response } from "express";
import cors from "cors";
import menuRoutes from "./api/menu/menu.routes";
import userRoutes from "./api/user/user.routes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/images'));


// routes
app.use("/api/menu", menuRoutes);
app.use("/user", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello")
})

app.all('*', (req: Request, res: Response) => {
  res.status(404).send("Route does not exist");
});

export default app;

