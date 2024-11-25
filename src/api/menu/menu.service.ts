import Menu from "./menu.model";
import fs from "fs";

export const getAllMenu = async () => {
  const allMenu = await Menu.find();
  if (allMenu.length <= 0) throw new Error("Menus Not found");
  return allMenu;
}

export const createMenu = async (file: Express.Multer.File | undefined, title: string, desc: string) => {
  if (!file) throw new Error("No file uploaded");
  if (!title || !desc) throw new Error("Title and desc are required");

  const image = `images/${file.filename}`;
  const newMenu = new Menu({ img: image, title, desc });
  return await newMenu.save();
}

export const updateMenuService = async (id: string, file: Express.Multer.File | undefined, title: string, desc: string) => {
  const updatedMenu = await Menu.findByIdAndUpdate(
    id,
    { img: file?.path, title, desc },
    { new: true, runValidators: true }
  )
  if (!updatedMenu) throw new Error("Menu not found");
  return updatedMenu;
}

export const deleteMenuService = async (id: string) => {
  const deletedMenu = await Menu.findByIdAndDelete(id);
  if (!deletedMenu) throw new Error("Menu not found");

  if (deletedMenu.img) {
    try {
      fs.unlinkSync(`./public/${deletedMenu.img}`)
    } catch (error) {
      console.log("Error deleting image -> ", error);
    }
  }

  return deletedMenu;
}