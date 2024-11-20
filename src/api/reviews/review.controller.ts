import { Request, Response } from "express";
import Review from "./review.model";
import fs from "fs";

export const getReview = async (req: Request, res: Response) => {
  try {
    const allReview = await Review.find();

    if (allReview.length <= 0)
      throw new Error("No Data Available")

    console.log(allReview);
    res.status(200).json(allReview);
  } catch (error) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}

export const postReview = async (req: Request, res: Response) => {
  try {
    const { review, name, title } = req.body;

    // check whether the required files and fields are present
    if (!req.file)
      throw new Error("No File Uploaded");
    if (!review || !name || !title)
      return res.status(400).json({ message: "Missing field(s)" });

    let image = `images/${req.file.filename}`
    const newReview = new Review({ img: image, review, name, title });
    await newReview.save();

    return res.status(200).json({
      msg: "Review Added Successfully",
      data: newReview
    })
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}

// when user updates the review, the old image should also be deleted
export const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { review, name, title } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { img: req.file?.path, review, name, title },
      { new: true, runValidators: true }
    )

    console.log(updatedReview);
    if (!updatedReview)
      throw new Error("Review Not Found");

    res.status(201).json({
      message: "Review Updated Successfully",
      data: updatedReview
    })

  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}

export const deleteReview = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    console.log(deletedReview);

    if (!deletedReview)
      throw new Error("Review Not Found");

    if (deletedReview.img) {
      try {
        fs.unlinkSync(`${deletedReview.img}`);
      } catch (error) {
        throw new Error("Image Not deleted")
      }
    }

    res.status(200).json({
      message: "Review DEleted successfully",
      Data: deletedReview
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}
