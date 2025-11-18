import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Handle both string and array formats for image
  const imageSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      <div className='overflow-hidden shadow-sm'>
        <img
          src={imageSrc}
          alt={name}
          className='w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out'
        />
      </div>
      <p className='pt-3 pb-1 text-sm truncate'>{name}</p>
      <p className='text-sm font-medium'>
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
