import bookModel from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const response = {
      data: await bookModel.find(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const getCategoryBooks = async (req, res) => {
  const category = req.params.category;
  try {
    const response = {
      data: await bookModel.find({ category: category }),
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const getBookDetails = async (req, res) => {
  const title = req.params.book;
  try {
    const response = {
      data: await bookModel.find({ title: title }),
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
