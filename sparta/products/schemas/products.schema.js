import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
  },
  author: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});

productsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export default mongoose.model("Product", productsSchema);
