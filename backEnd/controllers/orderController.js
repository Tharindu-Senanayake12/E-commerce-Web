import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; // If using JWT for token

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const token = req.headers.token;

    // Extract userId from token if not provided
    let finalUserId = userId;
    if (!userId && token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust secret
      finalUserId = decoded.userId; // Adjust based on your JWT structure
    }

    // Validate fields
    if (!finalUserId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required and must be a non-empty array" });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number" });
    }
    if (!address || typeof address !== "object") {
      return res.status(400).json({ success: false, message: "Address is required and must be an object" });
    }

    const orderData = {
      userId: finalUserId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    console.log('Saving order:', orderData); // Debug

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(finalUserId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log('Error placing order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Placing orders using VISA Method
const placeOrderVisa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const token = req.headers.token;

    // Extract userId from token if not provided
    let finalUserId = userId;
    if (!userId && token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust secret
      finalUserId = decoded.userId; // Adjust based on your JWT structure
    }

    // Validate fields
    if (!finalUserId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required and must be a non-empty array" });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number" });
    }
    if (!address || typeof address !== "object") {
      return res.status(400).json({ success: false, message: "Address is required and must be an object" });
    }

    const orderData = {
      userId: finalUserId,
      items,
      address,
      amount,
      paymentMethod: "Visa",
      payment: false,
      date: Date.now(),
    };

    console.log('Saving order:', orderData); // Debug

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(finalUserId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log('Error placing order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placing orders using KOKO Method
const placeOrderKoko = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const token = req.headers.token;

    // Extract userId from token if not provided
    let finalUserId = userId;
    if (!userId && token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust secret
      finalUserId = decoded.userId; // Adjust based on your JWT structure
    }

    // Validate fields
    if (!finalUserId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required and must be a non-empty array" });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number" });
    }
    if (!address || typeof address !== "object") {
      return res.status(400).json({ success: false, message: "Address is required and must be an object" });
    }

    const orderData = {
      userId: finalUserId,
      items,
      address,
      amount,
      paymentMethod: "Koko",
      payment: false,
      date: Date.now(),
    };

    console.log('Saving order:', orderData); // Debug

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(finalUserId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log('Error placing order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log('Error fetching orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Order Data for FrontEND
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await orderModel.find({ userId });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log('Error updating order status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderVisa, placeOrderKoko, allOrders, userOrders, updateStatus };