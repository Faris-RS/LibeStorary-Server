import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  author: {
    type: String,
  },
  published: {
    type: String,
  },
  pages: {
    type: Number,
  },
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});

const bookModel = mongoose.model("Book", bookSchema);
export default bookModel;
