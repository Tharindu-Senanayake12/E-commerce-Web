import mongoose from "mongoose";
//import BestSeller from './../../frontend/src/components/BestSeller';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    subCategory: { type: String, required: false },
    bestSeller: { type: Boolean },
    sizes: { type: Array, required: true },
    image: { type: Array, required: false },
    colors: { type: Array, required: true },
    date: { type: Number, required: true },
    availability: { type: Boolean },
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel