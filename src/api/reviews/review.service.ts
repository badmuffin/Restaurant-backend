import Review from "./review.model";
import fs from "fs";

export const getAllReview = async () => {
  const allReview = await Review.find();
  if (allReview.length <= 0) throw new Error("Reviews Not Found");
  return allReview;
}

export const createReview = async (file: Express.Multer.File | undefined, review: string, name: string, title: string) => {
  if (!file) throw new Error("No file uploaded");
  if (!review || !name || !title) throw new Error("Missing field(s)");

  const image = `images/${file.filename}`;
  const newReview = new Review({ img: image, review, name, title });
  return await newReview.save();
}

export const updateReviewService = async (id: string, file: Express.Multer.File | undefined, review: string, name: string, title: string) => {
  const updatedReview = await Review.findByIdAndUpdate(
    id,
    { img: file?.path, review, name, title },
    { new: true, runValidators: true }
  );
  if(!updatedReview) throw new Error("Review Not Found");
  return updatedReview;
}

export const deleteReviewService = async (id: string) => {
  const deletedReview = await Review.findByIdAndDelete(id);
  if(!deletedReview) throw new Error("Review Not Found");
  
  if(deletedReview.img) {
    try {
      fs.unlinkSync(`./public/${deletedReview.img}`);
    } catch (error) {
      console.log("Image not deleted - ", error);
    }
  }
  return deletedReview;
}