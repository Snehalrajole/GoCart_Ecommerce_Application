import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { remove, updateQuantity } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { convertToINR } from "../utils/currencyConverter";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    
    dispatch(updateQuantity({
      id: item.id,
      quantity: newQuantity
    }));
  }

  return (
    <div className="flex flex-col sm:flex-row items-center p-2 sm:p-5 justify-between mt-2 mb-2 md:mx-5 border-b pb-4">
      <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-5 items-center">
        {/* Product Image */}
        <div className="w-full sm:w-[30%] max-w-[120px] sm:max-w-none mb-3 sm:mb-0">
          <img className="object-contain w-full h-[100px] sm:h-[120px]" src={item.image} alt={item.title} />
        </div>
        
        {/* Product Details */}
        <div className="w-full sm:w-[70%] flex flex-col">
          {/* Title */}
          <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 text-center sm:text-left">
            {item.title}
          </h2>
          
          {/* Category */}
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-center sm:justify-start mt-3 sm:mt-4">
            <span className="text-sm text-gray-600 mr-2">Quantity:</span>
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button 
                onClick={() => handleQuantityChange((item.quantity || 1) - 1)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 flex items-center justify-center min-w-[30px]">
                {item.quantity || 1}
              </span>
              <button 
                onClick={() => handleQuantityChange((item.quantity || 1) + 1)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Price and Remove Button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mt-3">
            <div className="text-center sm:text-left mb-2 sm:mb-0">
              <p className="font-bold text-lg text-green-600">{convertToINR(item.price)}</p>
              <p className="text-sm text-gray-500">
                Total: {convertToINR(item.price * (item.quantity || 1))}
              </p>
            </div>
            <button
              className="text-red-800 bg-red-200 hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3"
              onClick={removeFromCart}
              aria-label="Remove item"
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
