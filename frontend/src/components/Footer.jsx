import React from 'react'
import { assets } from '../assets/assets'
import NewsletterBox from './NewsletterBox'

const Footer = () => {
  return (
    
    <div className="bg-gray-50 text-gray-800 px-6 pt-1 rounded-3xl mt-16">


      {/* Stylish Newsletter Section */}
      <NewsletterBox />

      {/* Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1.5fr] gap-14 my-16 text-sm">

        {/* About Bellini */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Bellini Logo" />
          <p className="text-gray-600">
            Bellini is a bold and youthful Sri Lankan fashion brand redefining everyday style for modern women. From statement tees to chic dresses, Bellini blends comfort and confidence empowering you to express your unique style every day.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>FAQs</li>
            <li>Terms and Conditions</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <p className="text-xl font-medium mb-5">Customer Care</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Refund Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">Contact Us</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Bellini (Pvt) Ltd</li>
            <li>No. 117, Hunupitiya Lake Road, Colombo 02</li>
            <li>0770699259</li>
            <li>customercare@bellini.lk</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr />
      <p className="py-5 text-sm text-center text-gray-500">
        © 2025, Bellini - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
