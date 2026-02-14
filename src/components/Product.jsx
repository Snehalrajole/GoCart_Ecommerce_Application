import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {add, remove} from "../redux/Slices/CartSlice";
import { convertToINR } from "../utils/currencyConverter";
import { useState } from "react";
import LoginPrompt from "./LoginPrompt";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Product = ({post}) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const {cart} = useSelector((state) => state);
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const addToCart = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    
    dispatch(add(post));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between 
      hover:shadow-xl transition duration-300 ease-in gap-2 p-2 sm:p-3 md:p-4 rounded-xl border border-gray-200 bg-white
      h-full">
        <div className="w-full">
          <Link to={`/product/${post.id}`} className="hover:text-green-600 transition-colors">
            <p className="text-gray-700 font-semibold text-xs sm:text-sm md:text-base text-left truncate w-full">{post.title}</p>
          </Link>
        </div>
        <div className="w-full">
          <p className="w-full text-gray-400 font-normal text-[10px] xs:text-xs md:text-sm text-left line-clamp-2">{post.description}</p>
        </div>
        <Link to={`/product/${post.id}`} className="h-[100px] xs:h-[120px] sm:h-[150px] md:h-[180px] w-full flex items-center justify-center p-2 hover:opacity-90 transition-opacity">
          <img src={post.image} className="h-full max-h-full w-auto object-contain" alt={post.title} />
        </Link>

        <div className="flex justify-between items-center w-full mt-1 sm:mt-2 md:mt-4">
          <div>
            <p className="text-green-600 font-semibold text-xs sm:text-sm md:text-base">{convertToINR(post.price)}</p>
          </div>
          
          {
            cart.some((p) => p.id == post.id) ?
            (<button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-[8px] sm:text-[10px] md:text-[12px] p-1 px-1.5 sm:px-2 md:px-3 uppercase 
            hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
            onClick={removeFromCart}>
              Remove
            </button>) :
            (<button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-[8px] sm:text-[10px] md:text-[12px] p-1 px-1.5 sm:px-2 md:px-3 uppercase 
            hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
            onClick={addToCart}>
              Add to Cart
            </button>)
          }
        </div>
      </div>

      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </>
  );
};

export default Product;
