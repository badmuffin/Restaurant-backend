import express, { Request, Response } from "express";
import cors from "cors";
import menuRoutes from "./api/menu/menu.routes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/images'));


// routes
app.use("/api/menu", menuRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello")
})

app.all('*', (req: Request, res: Response) => {
  res.status(404).send("Route does not exist");
});

export default app;

