import mongoose from "mongoose";

const connection = () => {
  try {
    mongoose
      .connect(process.env.MONGODB)
      .then(() => console.log("connected to db"));
  } catch (error) {
    console.error("error connecting to database");
  }
};
mongoose.set("strictQuery", true);

export default connection;
