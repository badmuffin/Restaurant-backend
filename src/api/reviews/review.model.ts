import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
  img: String;
  review: String;
  name: String;
  title: String;
}

const ReviewSchema: Schema = new Schema({
  img: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

export default mongoose.model<IReview>("Review", ReviewSchema);