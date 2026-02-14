import React from "react";
import { FaShoppingCart, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 shadow-md mt-10">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and About Section */}
          <div className="flex flex-col space-y-3 md:w-1/3">
            <Link to="/" className="flex items-center space-x-2">
              <FaShoppingCart className="text-green-400 text-xl" />
              <span className="text-white text-xl font-bold">Go Cart</span>
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Your one-stop destination for quality products at affordable prices. Shop with confidence and enjoy a seamless experience.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:w-1/4">
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Shop</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:w-1/4">
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Email: support@gocart.com</li>
              <li className="text-gray-400 text-sm">Phone: +91 9876543210</li>
              <li className="text-gray-400 text-sm">Address: Electronic City, Bangalore</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-white text-center text-xs md:text-sm">
            All rights reserved. Terms of use and privacy policy @Go Cart 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 