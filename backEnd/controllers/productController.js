import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for add products
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller, colors, availability } = req.body;

        // Ensure files exist before proceeding
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        if (images.length === 0) {
            return res.json({ success: false, message: "At least one image is required" });
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Parse sizes and colors as JSON, with error handling
        let parsedSizes = [];
        let parsedColors = [];
        try {
            parsedSizes = JSON.parse(sizes);
            parsedColors = JSON.parse(colors);
        } catch (error) {
            return res.json({ success: false, message: "Invalid JSON for sizes or colors" });
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true",
            sizes: parsedSizes,
            image: imagesUrl,
            colors: parsedColors,
            date: Date.now(),
            availability: availability === "true", // changed to boolean
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for remove products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Function for update product
const updateProduct = async (req, res) => {
    try {
        const { _id, name, price, category } = req.body;

        if (!_id) {
            return res.json({ success: false, message: "Product ID is required" });
        }

        await productModel.findByIdAndUpdate(
            _id,
            {
                ...(name && { name }),
                ...(price && { price: Number(price) }),
                ...(category && { category }),
            },
            { new: true }
        );

        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };
