import { Request, Response } from "express"
import Menu from "./menu.model";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const allMenu = await Menu.find();

    if (allMenu.length <= 0)
      return res.status(404).json({ msg: "Not found" })

    console.log(allMenu);
    res.status(200).json(allMenu);
  } catch (error) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
    else
      res.status(404).json({ message: "An Unknown Error Occurred" });
  }
}

export const postMenu = async (req: Request, res: Response) => {
  try {
    const { title, desc } = req.body;

    // check if file and required fields are present
    if (!req.file)
      return res.status(400).send("No file uploaded");
    if (!title || !desc) {
      return res.status(400).send("Title and desc are required");
    }

    const newMenu = new Menu({img: req.file.path, title, desc});
    await newMenu.save();

    return res.status(200).json({
      msg: "Dish added successfully",
      data: {
        title: title,
        desc: desc,
        imagePath: req.file.path
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

}

export const updateMenu = async (req: Request, res: Response) => {

}

export const deleteMenu = async (req: Request, res: Response) => {

}