
import { Request, RequestHandler, Response } from "express"
// import Menu from "./menu.model";
// import fs from "fs";
import { createMenu, deleteMenuService, getAllMenu, updateMenuService } from "./menu.service";
import { handleError } from "../../utils/handleError";

// export const getMenu: RequestHandler = async (req: Request, res: Response) => {
//   try {
//     const allMenu = await Menu.find();

//     if (allMenu.length <= 0)
//       throw new Error("Menus Not found");

//     console.log(allMenu);
//     res.status(200).json(allMenu);
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(404).json({ message: error.message });
//     else
//       res.status(500).json({ message: "An Unknown Error Occurred" });
//   }
// }

export const getMenu: RequestHandler = async (req: Request, res: Response) => {
  try {
    const menu = await getAllMenu();
    res.status(200).json(menu);
  } catch (error) {
    handleError(res, error, 404);
  }
}

// export const postMenu: RequestHandler = async (req: Request, res: Response) => {
//   try {
//     const { title, desc } = req.body;

//     // check if file and required fields are present
//     if (!req.file) {
//       res.status(400).send("No file uploaded");
//       return;
//     }
//     if (!title || !desc) {
//       res.status(400).send("Title and desc are required");
//       return;
//     }

//     let image = `images/${req.file.filename}`
//     const newMenu = new Menu({ img: image, title, desc });
//     await newMenu.save();

//     res.status(201).json({
//       msg: "menu added successfully",
//       data: newMenu
//     })
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(400).json({ message: error.message });
//     else
//       res.status(500).json({ message: "An Unknown Error Occurred" });
//   }

// }

export const postMenu: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { title, desc } = req.body;
    const newMenu = await createMenu(req.file, title, desc);
    res.status(201).json({ message: "Menu added successfully", data: newMenu })
  } catch (error) {
    handleError(res, error, 400);
  }
}

// export const updateMenu: RequestHandler = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   // console.log(req.body);
//   const { title, desc } = req.body;

//   try {
//     const updatedMenu = await Menu.findByIdAndUpdate(
//       id,
//       { img: req.file?.path, title, desc },
//       { new: true, runValidators: true }
//     )

//     console.log(updatedMenu);
//     if (!updatedMenu) {
//       res.status(404).json({ message: "Menu Not found" });
//       return;
//     }

//     res.status(201).json({
//       message: "Menu Updated successfully",
//       data: updatedMenu
//     });
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(400).json({ message: error.message });
//     else
//       res.status(500).json({ message: "An Unknown Error Occurred" });
//   }
// }

export const updateMenu: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, desc } = req.body;
    const updatedMenu = await updateMenuService(id, req.file, title, desc);
    res.status(200).json({ message: "Menu updated successfully", data: updatedMenu });
  } catch (error) {
    handleError(res, error, 400);
  }
}

// export const deleteMenu: RequestHandler = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const deletedMenu = await Menu.findByIdAndDelete(id);
//     console.log(deletedMenu);
//     if (!deletedMenu) {
//       res.status(404).json({ message: "Menu not found" });
//       return;
//     }

//     if (deletedMenu.img) {
//       try {
//         fs.unlinkSync(`${deletedMenu.img}`);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     res.status(200).json({ message: "Menu Deleted Successfully", Data: deletedMenu });
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(400).json({ message: error.message });
//     else
//       res.status(500).json({ message: "An Unknown Error Occurred" });
//   }
// }

export const deleteMenu: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMenu = await deleteMenuService(id);
    res.status(200).json({ message: "Menu deleted successfully", data: deletedMenu });
  } catch (error) {
    handleError(res, error, 400);
  }

}
