import { Request, Response } from "express"
import Menu from "./menu.model";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const allMenu = await Menu.find();

    if(allMenu.length <= 0) 
      return res.status(404).json({msg: "Not found"})

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

}

export const updateMenu = async (req: Request, res: Response) => {

}

export const deleteMenu = async (req: Request, res: Response) => {

}