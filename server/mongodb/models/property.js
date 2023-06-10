import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageType: { type: String, required: true },
    location: { type: String, required: true },
    buildings: { type: Number, required: false },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const propertyModel = mongoose.model("Property", PropertySchema);

export default propertyModel;
