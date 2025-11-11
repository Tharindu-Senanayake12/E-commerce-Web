import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, color, quantity = 1 } = req.body; // Include color and quantity (default to 1)

    if (!userId || !itemId || !size || !color) {
      return res.json({ success: false, message: "Missing required fields (userId, itemId, size, color)" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
    if (cartData[itemId][size][color]) {
      cartData[itemId][size][color] += quantity; // Increment existing quantity
    } else {
      cartData[itemId][size][color] = quantity; // Set new quantity
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, color, quantity } = req.body;

    if (!userId || !itemId || !size || !color || quantity === undefined) {
      return res.json({ success: false, message: "Missing required fields (userId, itemId, size, color, quantity)" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (quantity === 0) {
      if (cartData[itemId] && cartData[itemId][size] && cartData[itemId][size][color]) {
        delete cartData[itemId][size][color];
        if (Object.keys(cartData[itemId][size]).length === 0) delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      if (!cartData[itemId][size]) cartData[itemId][size] = {};
      cartData[itemId][size][color] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };