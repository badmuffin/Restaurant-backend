import { Request, Response } from "express"
import Menu from "./menu.model";
import fs from "fs";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const allMenu = await Menu.find();

    if (allMenu.length <= 0)
      throw new Error("Menus Not found");

    console.log(allMenu);
    res.status(200).json(allMenu);
  } catch (error) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
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

    let image = `images/${req.file.filename}`
    const newMenu = new Menu({ img: image, title, desc });
    await newMenu.save();

    return res.status(200).json({
      msg: "Dish added successfully",
      data: newMenu
    })
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }

}

export const updateMenu = async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(req.body);
  const { title, desc } = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { img: req.file?.path, title, desc },
      { new: true, runValidators: true }
    )

    console.log(updatedMenu);
    if (!updatedMenu)
      return res.status(404).json({ message: "Menu Not found" });

    res.status(201).json({
      message: "Menu Updated successfully",
      data: updatedMenu
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}

export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);
    console.log(deletedMenu);
    if (!deletedMenu)
      return res.status(404).json({ message: "Menu not found" });

    if (deletedMenu.img) {
      try {
        fs.unlinkSync(`${deletedMenu.img}`);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ message: "Menu Deleted Successfully", Data: deletedMenu });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}
