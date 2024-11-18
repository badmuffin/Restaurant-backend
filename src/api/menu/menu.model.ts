import mongoose, { Document, Schema } from "mongoose";

// define this in the dtos folder in the same api/menu dir
interface IMenu extends Document {
  img: string;
  title: string;
  desc: string;
}

const MenuSchema: Schema = new Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})

export default mongoose.model<IMenu>("Menu", MenuSchema);