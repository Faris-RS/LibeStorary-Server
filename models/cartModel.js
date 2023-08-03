import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Objectid = mongoose.Types.ObjectId;

const cartSchema = new Schema({
  user: {
    type: Objectid,
    ref: "User",
  },
  items: [
    {
      book: {
        type: Objectid,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        default: 0,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
