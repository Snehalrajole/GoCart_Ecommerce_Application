import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaTag } from "react-icons/fa";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Summer Sale Up to 50% Off",
      description: "Get the best deals on fashion, electronics, and more!",
      buttonText: "Shop Now",
      link: "/shop",
      bgColor: "from-blue-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest products and collections",
      buttonText: "Explore",
      link: "/shop",
      bgColor: "from-green-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "On all orders above ₹1000",
      buttonText: "Learn More",
      link: "/about",
      bgColor: "from-red-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Current offers data
  const offers = [
    {
      id: 1,
      title: "Special Discount",
      description: "Use code WELCOME15 for 15% off on your first order!",
      code: "WELCOME15",
      discount: "15%",
      buttonText: "Shop Now",
      link: "/shop",
      bgColor: "from-green-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Flash Sale",
      description: "24 hours only! Get up to 30% off on selected items",
      code: "FLASH30",
      discount: "30%",
      buttonText: "Grab Now",
      link: "/shop",
      bgColor: "from-rose-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Seasonal Clearance",
      description: "End of season sale with massive discounts on all winter wear",
      code: "SEASON50",
      discount: "50%",
      buttonText: "View Offers",
      link: "/shop",
      bgColor: "from-amber-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Auto-advance the main slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Auto-advance the offers slider (pause on hover)
  useEffect(() => {
    if (isHovering) return;
    
    const offerInterval = setInterval(() => {
      setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(offerInterval);
  }, [offers.length, isHovering]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const goToOffer = (index) => {
    setCurrentOffer(index);
  };

  return (
    <div className="relative overflow-hidden mt-16 sm:mt-0">
      {/* Main slider */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform ${
              currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className={`absolute inset-0 bg-gradient-${slide.bgColor} opacity-70`}></div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-24 text-white">
              <h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 opacity-0 transform -translate-y-6 animate-slideDown"
                  style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                  {slide.title}
                </h2>
                <p 
                className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6 opacity-0 transform -translate-y-6 animate-slideDown max-w-md sm:max-w-lg md:max-w-xl"
                  style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                >
                  {slide.description}
                </p>
                <Link 
                  to={slide.link} 
                className="inline-block bg-white text-gray-800 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base opacity-0 transform -translate-y-6 animate-slideDown hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  {slide.buttonText}
                </Link>
            </div>
          </div>
        ))}
      </div>
        
      {/* Navigation buttons */}
        <button 
          onClick={prevSlide} 
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 p-1.5 sm:p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
          aria-label="Previous slide"
        >
        <FaChevronLeft size={16} />
        </button>
      
        <button 
          onClick={nextSlide} 
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 p-1.5 sm:p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
          aria-label="Next slide"
        >
        <FaChevronRight size={16} />
        </button>
        
      {/* Offer banner */}
      <div className="relative overflow-hidden bg-gray-800 w-full">
        <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {offers.map((offer, index) => (
              <div 
                key={offer.id}
                className={`transition-all duration-300 rounded-lg overflow-hidden shadow-md ${
                  currentOffer === index ? 'opacity-100' : 'opacity-50 sm:opacity-100'
                }`}
              >
                <div 
                  className="relative h-40 sm:h-44 bg-cover bg-center rounded-lg overflow-hidden"
                  style={{ backgroundImage: `url(${offer.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
                  <div className="absolute inset-0 p-3 sm:p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-1 sm:mb-2 flex items-center">
                        <FaTag className="text-yellow-400 mr-1.5 text-xs sm:text-sm" />
                        <span className="text-yellow-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                          {offer.type}
                        </span>
          </div>
                      <h3 className="text-base sm:text-lg text-white font-bold line-clamp-1">{offer.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-300 mt-1 hidden sm:block line-clamp-1">{offer.description}</p>
        </div>
                    <Link 
                      to={offer.link} 
                      className="inline-block bg-white text-gray-800 hover:bg-gray-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-300"
                    >
                      {offer.buttonText}
          </Link>
        </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these animations to your tailwind.config.js or in your CSS
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
// }
// @keyframes float-delayed {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-15px); }
// }
// @keyframes slideDown {
//   to { transform: translateY(0); opacity: 1; }
// }
// @keyframes pulse-slow {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.7; }
// }

export default Slider; 