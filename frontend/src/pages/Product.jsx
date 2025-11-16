import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ReviewSection from '../components/ReviewSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(item => item._id === productId);
      if (found) {
        setProductData(found);
        setImage(found.image[0]);
        window.scrollTo(0, 0);
      }
    }
  }, [productId, products]);

  // Validate size and color selection
  const validateSelection = () => {
    toast.dismiss(); // remove any previous lingering toast
    if (!size) {
      toast.error('Please select a size', { autoClose: 2000 });
      return false;
    }
    if (!color) {
      toast.error('Please select a color', { autoClose: 2000 });
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    addToCart(productData._id, size, color, quantity);
    toast.success('Added to cart successfully!', { autoClose: 2000 });
  };

  const handleBuyNow = async () => {
    if (!validateSelection()) return;

    if (addToCart.constructor.name === 'AsyncFunction') {
      await addToCart(productData._id, size, color, quantity);
    } else {
      addToCart(productData._id, size, color, quantity);
    }

    toast.success('Added to cart! Redirecting...', { autoClose: 2000 });

    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* Product Layout */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.59%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt={`Product thumbnail ${index + 1}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="flex-1 justify-center items-center relative">
            <img src={image} alt="Main product" className="w-full h-auto" />
            <button
              onClick={() => setShowSizeChart(true)}
              className="mt-6 border border-gray-500 py-2 px-4 bg-gray-50 rounded text-sm w-full"
            >
              View Size Chart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-1">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="" className="w-3.5" />)}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(06)</p>
          </div>

          {/* Price */}
          <p className="text-2xl text-gray-700 mb-0">
            {currency} {productData.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Tax included. Shipping calculated at checkout.
          </p>

          <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 rounded ${item === size ? 'border-black' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Color</p>
            <div className="flex gap-2">
              {productData.colors.map((item, index) => (
                <button
                  onClick={() => setColor(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 rounded ${item === color ? 'border-black' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-4 my-4">
            <label htmlFor="quantity" className="text-sm">Select Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="border border-gray-500 py-2 px-4 bg-gray-50 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 rounded"
            >
              Buy it Now
            </button>
          </div>

          {/* Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Quality Materials.</p>
            <p>Cash on delivery is available.</p>
            <p>Easy return available within 7 days.</p>
            <p>Pickup available at Colombo 02.</p>
            <p>Usually ready in 2-4 days.</p>
          </div>
        </div>
      </div>

      <ReviewSection />
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSizeChart(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Size Chart</h2>

            {/* Tops Table */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tops</h3>
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">Size</th>
                    <th className="border px-2 py-1">Bust (in)</th>
                    <th className="border px-2 py-1">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {['XS','S','M','L','XL','XXL'].map((s,i)=>(
                    <tr key={i}>
                      <td className="border px-2 py-1">{s}</td>
                      <td className="border px-2 py-1">{30+i*2}-{31+i*2}</td>
                      <td className="border px-2 py-1">{24+i*2}-{25+i*2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center py-20">Loading product...</div>
  );
};

export default Product;
