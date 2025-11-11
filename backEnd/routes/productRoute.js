import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add product with images
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// Remove product
productRouter.post('/remove', adminAuth, removeProduct);

// Single product
productRouter.post('/single', singleProduct);

// List all products
productRouter.get('/list', listProducts);

// ✅ Update product (new)
productRouter.post('/update', adminAuth, updateProduct);

export default productRouter;
