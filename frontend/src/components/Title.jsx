import React from 'react'
import { assets } from '../assets/assets'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-center font-medium'>
      <img src={assets.pattern} className='w-20 mb-[-19px]' alt="" />

      <div className='inline-flex gap-3 mb-3'>
        <p className='text-gray-500 leading-none'>
          {text1} <span className='text-gray-700 font-medium'>{text2}</span>
        </p>
      </div>
    </div>
  )
}

export default Title
