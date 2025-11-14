import React, { useEffect } from 'react';
import Title from './../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from './../components/NewsletterBox';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-down">
        <Title text1="ABOUT" text2="US" />
        <div className="mt-2 w-20 h-1 bg-black mx-auto rounded"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center" data-aos="fade-up">
        
        {/* Image */}
        <img
          className="w-full max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out"
          src={assets.about_img}
          alt="About Bellini"
        />

        {/* Text Content */}
        <div className="md:w-1/2 text-gray-700 space-y-6 leading-relaxed text-lg">
          <p>
            Bellini is a Sri Lankan fashion brand established in April 2022, offering stylish and affordable women's clothing.
            Based in Colombo 05, Bellini operates as a manufacturer, retailer, brand owner, exporter, and wholesaler in the fashion industry.
          </p>
          <p>
            Our product range includes dresses, tops, pants, skirts, and workwear, catering to diverse fashion preferences.
            Bellini aims to provide versatile and trendy apparel for everyday living.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1 border-l-4 border-black pl-3">Our Vision</h3>
            <p className="pl-3 text-gray-800 italic">
              To redefine everyday fashion in Sri Lanka with style, ease, and affordability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1 border-l-4 border-black pl-3">Our Mission</h3>
            <p className="pl-3 text-gray-800 italic">
              To offer trendy, quality clothing at great prices, making fashion accessible to all Sri Lankans.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;
