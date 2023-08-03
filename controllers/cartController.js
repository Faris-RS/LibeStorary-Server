import bookModel from "../models/bookModel.js";
import userModel from "../models/userModel.js";
import cartModel from "../models/cartModel.js";

export const viewCart = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartModel
      .findOne({ user: user._id })
      .populate("user")
      .populate("items.book");
    res.status(200).json({ data: cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const isAlreadyInCart = async (req, res) => {
  const title = req.params.book;
  const user = req.user;
  try {
    const book = await bookModel.findOne({ title: title });
    const cart = await cartModel.findOne({ user });
    if (cart) {
      let exist = false;
      const bookExist = cart.items;
      bookExist.forEach((element, index, array) => {
        let productExist = element.book.valueOf();
        if (productExist == book._id) {
          exist = true;
          res
            .status(200)
            .json({ status: 200, message: "Item already in cart" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const addToCart = async (req, res) => {
  const title = req.body.book;
  const user = req.user;
  try {
    const book = await bookModel.findOne({ title: title });
    const cart = await cartModel.findOne({ user });
    // Check if user already has a cart allocated
    if (cart) {
      let exist = false;
      //   Check if book is already in user's cart
      const bookExist = cart.items;
      bookExist.forEach((element, index, array) => {
        let productExist = element.book.valueOf();
        if (productExist == book._id) {
          exist = true;
        }
      });

      if (exist) {
        res
          .status(201)
          .json({ status: 305, message: "Book is already in cart" });
        console.error("book already in cart");
      } else {
        await cartModel.findOneAndUpdate(
          { user: user._id },
          {
            $push: {
              items: {
                book: book._id,
                price: book.price,
              },
            },
          }
        );
        await cartModel.updateOne(
          { userId: user._id },
          { $inc: { total: book.price } }
        );
        res.status(200).json({ status: 200, message: "Item added to cart" });
      }
    }
    // If user does not have a cart
    else {
      const newCart = new cartModel({
        user: user._id,
        total: book.price,
        items: [
          {
            book: book._id,
            price: book.price,
          },
        ],
      });
      newCart.save().then(() => {
        res.status(200).json({ status: 200, message: "Item added to cart" });
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const increment = async (req, res) => {
  const title = req.body.book;
  const user = req.user;
  try {
    const cartData = await cartModel
      .find({ user: user._id })
      .populate("items.book");
    let cart = cartData[0];
    let items = cart.items;
    let itemIndex = items.findIndex((p) => p.book.title == title);
    let product = items[itemIndex];
    product.quantity++;
    cart.total += product.price;
    await cart
      .save()
      .then(() => {
        res.status(200).json({ status: 200, message: "Item incremented" });
      })
      .catch((err) => {
        console.error(err);
        res.status(201).json({
          status: 201,
          message: "An error occured while incrementing",
        });
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const decrement = async (req, res) => {
  const title = req.body.book;
  const user = req.user;
  try {
    const cartData = await cartModel
      .find({ user: user._id })
      .populate("items.book");
    let cart = cartData[0];
    let items = cart.items;
    let itemIndex = items.findIndex((p) => p.book.title == title);
    let product = items[itemIndex];
    product.quantity--;
    cart.total -= product.price;
    await cart
      .save()
      .then(() => {
        res.status(200).json({ status: 200, message: "Item decremented" });
      })
      .catch((err) => {
        console.error(err);
        res.status(201).json({
          status: 201,
          message: "An error occured while incrementing",
        });
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const removeFromCart = async (req, res) => {
  const title = req.params.book;
  const user = req.user;
  try {
    const cartData = await cartModel
      .find({ user: user._id })
      .populate("items.book");
    const book = await bookModel.findOne({ title: title });
    let cart = cartData[0];
    let items = cart.items;
    let itemIndex = items.findIndex((p) => p.book.title == title);
    let product = items[itemIndex];
    let productPrice = product.price * product.quantity;
    cart.total -= productPrice;
    await cart.save().then(async () => {
      await cartModel
        .findOneAndUpdate(
          { userId: user._id },
          { $pull: { items: { book: book._id } } }
        )
        .then(() => {
          res.status(200).json({ status: 200, message: "Item deleted", cart });
        })
        .catch((err) => {
          console.error(err);
          res.status(201).json({
            status: 201,
            message: "An error occured while deleting",
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(201).json({
            status: 201,
            message: "An error occured while deleting",
          });
        });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
