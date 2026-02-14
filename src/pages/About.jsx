import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaStar, FaUsers, FaTruck, FaCreditCard, FaHeadset } from "react-icons/fa";

const About = () => {
  const [activeAccordion, setActiveAccordion] = useState("mission");
  const [isVisible, setIsVisible] = useState({
    header: false,
    story: false,
    values: false,
    testimonials: false
  });

  // Animation when scrolling
  useEffect(() => {
    setIsVisible({
      header: true,
      story: true,
      values: true,
      testimonials: true
    });
  }, []);

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      text: "Go Cart has transformed how I shop online. Their product quality and customer service are unmatched!",
      rating: 5
    },
    {
      id: 2,
      name: "Ananya Desai",
      text: "I've been a loyal customer for over a year now. The ease of shopping and quick delivery keeps me coming back.",
      rating: 5
    },
    {
      id: 3,
      name: "Suresh Menon",
      text: "Great products at competitive prices. Very satisfied with my purchases so far.",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen mt-16 sm:mt-20 px-4 py-8 sm:py-12 bg-gray-50">
      {/* Header Section */}
      <div className={`text-center max-w-4xl mx-auto mb-10 sm:mb-16 transition-opacity duration-1000 ${isVisible.header ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-green-600">Go Cart</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mx-auto max-w-2xl">
          We're on a mission to provide quality products at affordable prices, with exceptional customer service.
          </p>
        </div>
        
      {/* Our Story Section */}
      <div className={`max-w-4xl mx-auto mb-10 sm:mb-16 transition-opacity duration-1000 ${isVisible.story ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="prose text-gray-600 max-w-none">
              <p className="mb-4 text-sm sm:text-base">
                Founded in 2023, Go Cart began with a simple idea: make online shopping accessible, affordable, and enjoyable for everyone. What started as a small venture has grown into a marketplace that connects customers with quality products across multiple categories.
              </p>
              <p className="mb-4 text-sm sm:text-base">
                Our founder envisioned an e-commerce platform that prioritizes customer satisfaction above all else. This vision continues to guide every decision we make, from product selection to website design and customer service policies.
              </p>
              <p className="text-sm sm:text-base">
                Today, we're proud to serve thousands of customers with a curated selection of products that meet our high standards for quality and value.
              </p>
            </div>
          </div>
          </div>
        </div>
        
      {/* Our Values and FAQs */}
      <div className={`max-w-4xl mx-auto mb-10 sm:mb-16 transition-opacity duration-1000 ${isVisible.values ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Values & FAQ</h2>
          
          <div className="space-y-4">
          {/* Mission Accordion */}
            <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:border-green-500">
              <button 
              className={`w-full flex justify-between items-center p-3 sm:p-4 text-left font-semibold text-base sm:text-lg transition-all duration-300 ${
                  activeAccordion === "mission" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => toggleAccordion("mission")}
              >
                <div className="flex items-center">
                  <FaUsers className={`mr-3 transition-transform duration-500 ${activeAccordion === "mission" ? "transform rotate-360" : ""}`} />
                  Our Mission
                </div>
                <div className="transition-transform duration-300">
                  {activeAccordion === "mission" ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeAccordion === "mission" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
              <div className="p-4 sm:p-6 bg-white text-sm sm:text-base">
                <p className="text-gray-700 mb-4">
                  At Go Cart, our mission is to create an e-commerce experience that combines quality, affordability, and exceptional service. We believe everyone deserves access to great products without breaking the bank.
                </p>
                  <p className="text-gray-700">
                  We're committed to continuous improvement, expanding our product range, and implementing customer feedback to better serve our community of shoppers.
                  </p>
              </div>
            </div>
          </div>
          
          {/* Shipping Accordion */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:border-green-500">
            <button 
              className={`w-full flex justify-between items-center p-3 sm:p-4 text-left font-semibold text-base sm:text-lg transition-all duration-300 ${
                activeAccordion === "shipping" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => toggleAccordion("shipping")}
            >
              <div className="flex items-center">
                <FaTruck className={`mr-3 transition-transform duration-500 ${activeAccordion === "shipping" ? "transform rotate-360" : ""}`} />
                Shipping & Returns
              </div>
              <div className="transition-transform duration-300">
                {activeAccordion === "shipping" ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeAccordion === "shipping" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 sm:p-6 bg-white text-sm sm:text-base">
                <p className="text-gray-700 mb-4">
                  <strong>Shipping Policy:</strong> We offer free standard shipping on orders over ₹1000. Most orders are processed and shipped within 1-2 business days. Delivery typically takes 3-7 business days depending on your location.
                </p>
                <p className="text-gray-700">
                  <strong>Returns:</strong> We accept returns within 30 days of delivery for most products in original condition. Contact our customer service team to initiate a return or exchange.
                </p>
              </div>
            </div>
          </div>
          
          {/* Payment Accordion */}
            <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:border-green-500">
              <button 
              className={`w-full flex justify-between items-center p-3 sm:p-4 text-left font-semibold text-base sm:text-lg transition-all duration-300 ${
                activeAccordion === "payment" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              onClick={() => toggleAccordion("payment")}
              >
                <div className="flex items-center">
                <FaCreditCard className={`mr-3 transition-transform duration-500 ${activeAccordion === "payment" ? "transform rotate-360" : ""}`} />
                Payment Options
                </div>
                <div className="transition-transform duration-300">
                {activeAccordion === "payment" ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeAccordion === "payment" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 sm:p-6 bg-white text-sm sm:text-base">
                <p className="text-gray-700 mb-4">
                  We accept various payment methods to provide flexibility for our customers:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-4">
                  <li>Credit/Debit Cards (Visa, MasterCard, Rupay)</li>
                  <li>Net Banking</li>
                  <li>UPI Payments</li>
                  <li>Mobile Wallets</li>
                  <li>Cash on Delivery (for eligible orders)</li>
                </ul>
                  <p className="text-gray-700">
                  All transactions are secure and encrypted for your safety.
                  </p>
                </div>
              </div>
            </div>
            
          {/* Why Choose Us Accordion */}
            <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:border-green-500">
              <button 
              className={`w-full flex justify-between items-center p-3 sm:p-4 text-left font-semibold text-base sm:text-lg transition-all duration-300 ${
                  activeAccordion === "choose" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => toggleAccordion("choose")}
              >
                <div className="flex items-center">
                  <FaHeadset className={`mr-3 transition-transform duration-500 ${activeAccordion === "choose" ? "transform rotate-360" : ""}`} />
                  Why Choose Us
                </div>
                <div className="transition-transform duration-300">
                  {activeAccordion === "choose" ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeAccordion === "choose" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
              <div className="p-4 sm:p-6 bg-white text-sm sm:text-base">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700"><strong>Quality Products:</strong> Every item in our inventory is carefully selected for quality and value.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700"><strong>Competitive Pricing:</strong> We offer the best possible prices without compromising on quality.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700"><strong>Customer Service:</strong> Our team is available to assist you with any questions or concerns.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700"><strong>Fast Shipping:</strong> We process orders quickly to get products to you as soon as possible.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700"><strong>Secure Shopping:</strong> Our website features robust security measures to protect your information.</span>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
        
      {/* Testimonials */}
      <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${isVisible.testimonials ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
              <p className="text-gray-700 mb-4 text-sm sm:text-base italic">"{testimonial.text}"</p>
              <p className="font-semibold text-sm sm:text-base text-gray-800">{testimonial.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default About; 