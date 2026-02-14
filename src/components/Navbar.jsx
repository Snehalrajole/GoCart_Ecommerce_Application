import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          !event.target.closest('.mobile-menu') && 
          !event.target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 bg-slate-900 shadow-md transition-all duration-300 ${
      isScrolled ? 'py-1 sm:py-2' : 'py-2 sm:py-3'
    }`}>
      <nav className="flex justify-between items-center h-14 sm:h-16 max-w-6xl mx-auto px-3 sm:px-4 md:px-5">
        <NavLink to="/" onClick={closeMobileMenu}>
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_1280.png"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-cover"
              alt="Logo"
            />
            <h2 className="text-white text-base sm:text-lg md:text-xl font-bold">Go Cart</h2>
          </div>
        </NavLink>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <NavLink to="/cart" className="relative mr-4" onClick={closeMobileMenu}>
            <FaShoppingCart className="text-lg sm:text-xl text-white hover:text-green-400 transition duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-[10px] w-4 h-4 sm:w-5 sm:h-5 flex 
                            justify-center items-center animate-bounce rounded-full text-white">
                {cart.length}
              </span>
            )}
          </NavLink>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white p-1 sm:p-2 menu-button"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center font-medium text-slate-100 space-x-6">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive 
                ? "text-green-400 hover:text-green-300 transition duration-300" 
                : "hover:text-green-400 transition duration-300"
            }
          >
            <p>Home</p>
          </NavLink>
          
          <NavLink 
            to="/shop" 
            className={({isActive}) => 
              isActive 
                ? "text-green-400 hover:text-green-300 transition duration-300" 
                : "hover:text-green-400 transition duration-300"
            }
          >
            <p>Shop</p>
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              isActive 
                ? "text-green-400 hover:text-green-300 transition duration-300" 
                : "hover:text-green-400 transition duration-300"
            }
          >
            <p>About</p>
          </NavLink>
          
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              isActive 
                ? "text-green-400 hover:text-green-300 transition duration-300" 
                : "hover:text-green-400 transition duration-300"
            }
          >
            <p>Contact</p>
          </NavLink>
        </div>

        {/* Desktop cart and auth */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-xl hover:text-green-400 transition duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                              justify-center items-center animate-bounce rounded-full text-white">
                {cart.length}
              </span>
            )}
          </NavLink>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm hidden md:inline">{currentUser.username}</span>
              <button 
                onClick={logout}
                className="text-sm px-3 py-1 border border-green-400 rounded-full hover:bg-green-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className="text-sm px-3 py-1 border border-green-400 rounded-full hover:bg-green-600 transition duration-300 flex items-center space-x-1"
            >
              <FaUser className="text-xs" />
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`fixed top-14 sm:top-16 left-0 right-0 bg-slate-800 shadow-lg transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden z-40 mobile-menu`}
      >
        <div className="flex flex-col py-4 px-4 sm:px-6 space-y-2 sm:space-y-4 max-h-[calc(100vh-56px)] overflow-y-auto">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `block py-2 ${isActive ? "text-green-400" : "text-white hover:text-green-400"}`
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/shop" 
            className={({isActive}) => 
              `block py-2 ${isActive ? "text-green-400" : "text-white hover:text-green-400"}`
            }
            onClick={closeMobileMenu}
          >
            Shop
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `block py-2 ${isActive ? "text-green-400" : "text-white hover:text-green-400"}`
            }
            onClick={closeMobileMenu}
          >
            About
          </NavLink>
          
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              `block py-2 ${isActive ? "text-green-400" : "text-white hover:text-green-400"}`
            }
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
          
          {/* User info and logout button for mobile */}
          {isLoggedIn ? (
            <div className="border-t border-slate-700 pt-3 mt-2">
              <div className="flex flex-col space-y-3">
                <div className="text-white text-sm">
                  Signed in as <span className="font-medium">{currentUser.username}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full bg-transparent border border-green-500 text-green-500 rounded-lg py-2 text-sm hover:bg-green-500 hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-slate-700 pt-3 mt-2">
              <NavLink 
                to="/login" 
                className="block w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-center text-sm transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Login / Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
