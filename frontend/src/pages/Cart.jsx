// ✅ Fixed version of Cart.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      for (const size in sizes) {
        const colors = sizes[size];
        for (const color in colors) {
          const quantity = colors[color];
          if (quantity > 0) {
            tempData.push({ _id: itemId, size, color, quantity });
          }
        }
      }
    }

    setCartData(tempData);
  }, [cartItems,products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-center py-10 text-gray-600">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id);

            return (
              <div
                key={index}
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-start gap-6'>
                  <img
                    className='w-16 sm:w-40'
                    src={productData?.image[0]}
                    alt={productData?.name}
                  />
                  <div>
                    <p className='text-s sm:text-lg font-medium'>{productData?.name}</p>

                    <div className='flex items-center gap-5'>
                          <p className='text-sm'>Unit Price : {currency}{productData?.price}</p>
                    </div>
                    <div className='flex items-center gap-5 mt-2'>
                          <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Size: {item.size}</p>
                          <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Color: {item.color}</p>
                    </div>
                    
                    <br />
                    <p className='text-sm text-gray-600'>Qty: {item.quantity}</p>
                    <p className='text-sm text-gray-700 font-medium'>
                      Subtotal of the Product :  {currency}{(productData?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <input
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 border-gray-400 rounded'
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1) {
                      updateQuantity(item._id, item.size, item.color, val);
                    }
                  }}
                />

                {/* Remove Item */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, item.color, 0)}
                  className='w-4 mr-4 sm:w-5 cursor-pointer'
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            );
          })
        )}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          <div className=' w-full text-end'>
              <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 '>PROCEED TO CHECKOUT</button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Cart;
