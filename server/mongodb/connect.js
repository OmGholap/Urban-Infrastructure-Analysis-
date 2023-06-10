import mongoose from "mongoose";


const connectDB = (url) => {
    mongoose.set("strictQuery", true);

    mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected - om"))
        .catch((error) => console.log(error));
};

export default connectDB;
