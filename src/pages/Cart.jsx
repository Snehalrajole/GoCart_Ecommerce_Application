import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { convertToINR } from "../utils/currencyConverter";
import { useAuth } from "../context/AuthContext";
import { clearCart } from "../redux/Slices/CartSlice";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { FaShoppingCart, FaDownload, FaTimes } from 'react-icons/fa';
import { toast } from "react-hot-toast";

// Add this for font support
import 'jspdf-autotable';

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { isLoggedIn, currentUser } = useAuth();
  const dispatch = useDispatch();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Calculate total amount considering item quantities
    setTotalAmount(
      cart.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0)
    );
    
    // Calculate total number of items including quantities
    setTotalItems(
      cart.reduce((acc, curr) => acc + (curr.quantity || 1), 0)
    );
  }, [cart]);

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleCheckout = () => {
    const now = new Date();
    setOrderDate(now.toLocaleString());
    setShowReceipt(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  // Basic PDF generator with minimal styling
  const basicPdfDownload = () => {
    try {
      setIsGeneratingPDF(true);
      toast.loading("Creating receipt...");
      
      // Generate a random order ID
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Create most basic PDF with bare-minimum features
      const doc = new jsPDF();
      
      // Basic header
      doc.setFontSize(16);
      doc.text("Go Cart - Receipt", 105, 15, { align: 'center' });
      
      // Basic info
      doc.setFontSize(10);
      doc.text(`Date: ${orderDate}`, 15, 25);
      doc.text(`Customer: ${currentUser?.username || 'Guest'}`, 15, 30);
      doc.text(`Order ID: ${orderId}`, 15, 35);
      doc.text(`Payment Method: Online Payment`, 15, 40);
      
      // Simple table without fancy styling
      let yPos = 50;
      
      // Table header
      doc.setFont('helvetica', 'bold');
      doc.text("Product", 15, yPos);
      doc.text("Price", 110, yPos);
      doc.text("Qty", 140, yPos);
      doc.text("Total", 170, yPos);
      
      yPos += 5;
      
      // Separator line
      doc.line(15, yPos, 195, yPos);
      yPos += 8;
      
      // Table rows
      doc.setFont('helvetica', 'normal');
      cart.forEach(item => {
        // Truncate product name if too long
        const productName = item.title.length > 40 
          ? item.title.substring(0, 38) + "..." 
          : item.title;
          
        // Unit price
        const price = convertToINR(item.price).replace('₹', 'Rs. ');
        
        // Quantity
        const qty = item.quantity || 1;
        
        // Total for this item
        const total = convertToINR(item.price * qty).replace('₹', 'Rs. ');
        
        // Add row
        doc.text(productName, 15, yPos);
        doc.text(price, 110, yPos);
        doc.text(qty.toString(), 140, yPos);
        doc.text(total, 170, yPos);
        
        yPos += 8;
        
        // If we're getting close to page end, start a new page
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      });
      
      // Separator line
      yPos += 2;
      doc.line(15, yPos, 195, yPos);
      yPos += 10;
      
      // Summary
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Items: ${totalItems}`, 140, yPos);
      yPos += 7;
      doc.text(`Grand Total: ${convertToINR(totalAmount)}`, 140, yPos);
      
      // Footer
      yPos += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text("Thank you for shopping with us!", 105, yPos, { align: 'center' });
      
      yPos += 5;
      // Updated eco-friendly message with bold font
      doc.setTextColor(0, 100, 0); // Green color
      doc.setFont('helvetica', 'bold'); // Bold font
      doc.setFontSize(9); // Slightly larger for better visibility
      doc.text("Go Green — Reuse, Recycle, Repeat!", 105, yPos, { align: 'center' });
      
      // Directly download without any fancy features
      doc.save("GoCart-Receipt.pdf");
      
      toast.dismiss();
      toast.success("Receipt downloaded!");
      setIsGeneratingPDF(false);
      
      // Add a small delay before clearing cart to ensure proper sequencing
      setTimeout(() => {
        // Perform the same actions as completeOrder
        dispatch(clearCart());
        setShowReceipt(false);
        toast.success("Thank you for your order! Your items will be shipped soon.");
      }, 1000);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.dismiss();
      toast.error("There was a problem creating your receipt. Please try again later.");
      setIsGeneratingPDF(false);
    }
  };

  const downloadReceipt = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // First generate and download the PDF receipt
    basicPdfDownload();
    
    // Then perform the same actions as completeOrder
    // Set success message and clear cart
    setSuccessMessage("Order completed successfully!");
    dispatch(clearCart());
    
    // Show success message
    toast.success("Order completed successfully!");
    
    // Hide success message after delay
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="min-h-screen mt-16 sm:mt-20 bg-gray-400 py-6 sm:py-10 px-4">
      {cart.length > 0 ? (
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            {/* Cart Items Section */}
            <div className="w-full md:w-[60%] bg-white p-4 sm:p-5 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-3 sm:mb-4">Shopping Cart</h2>
              <div className="divide-y divide-gray-300">
                {cart.map((item, index) => (
                  <CartItem key={item.id} item={item} itemIndex={index} />
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-[40%] bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Your Cart</h3>
                <h2 className="text-2xl sm:text-4xl font-bold text-green-700 mt-1 sm:mt-2">Summary</h2>
                <p className="text-base sm:text-lg text-gray-700 mt-2 sm:mt-3">
                  <span className="font-semibold">Total Items:</span> {totalItems}
                </p>
                <p className="text-base sm:text-lg text-gray-700 mt-1">
                  <span className="font-semibold">Products:</span> {cart.length}
                </p>
              </div>

              <div className="border-t pt-3 sm:pt-4">
                <p className="text-lg sm:text-xl font-semibold">
                  <span className="text-gray-700">Total Amount:</span>
                  <span className="text-green-700 ml-2">{convertToINR(totalAmount)}</span>
                </p>
                <button 
                  onClick={handleCheckout}
                  className="mt-4 sm:mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 rounded-lg shadow-lg transition duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Receipt Section */}
          {showReceipt && (
            <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-xl mt-6 sm:mt-8 relative">
              <button 
                onClick={closeReceipt}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              
              {/* Receipt Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex justify-center items-center mb-2">
                  <FaShoppingCart className="text-green-600 text-2xl sm:text-3xl mr-2" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-600">Go Cart</h2>
                </div>
                <p className="text-gray-600">Order Receipt</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">{orderDate}</p>
              </div>

              {/* Receipt Content - Made scrollable for mobile */}
              <div className="overflow-x-auto -mx-4 sm:mx-0 pb-2">
                <div className="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-green-600 text-white text-left">
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm uppercase font-semibold">Product</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm uppercase font-semibold">Price</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm uppercase font-semibold">Quantity</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm uppercase font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-2 sm:py-3 px-2 sm:px-4">
                            <div className="flex items-center">
                              <img src={item.image} alt={item.title} className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3 object-contain bg-gray-50 p-1 rounded" />
                              <span className="truncate max-w-[120px] sm:max-w-[200px] text-xs sm:text-sm font-medium">{item.title}</span>
                            </div>
                          </td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{convertToINR(item.price)}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-center">{item.quantity || 1}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">{convertToINR(item.price * (item.quantity || 1))}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-300 font-bold bg-gray-50">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm" colSpan="2">Total</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-center">{totalItems}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-green-600">{convertToINR(totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg text-xs sm:text-sm">
                <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <p><span className="font-medium">Name:</span> {currentUser?.username || 'Guest'}</p>
                    <p><span className="font-medium">Order Date:</span> {orderDate}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Order ID:</span> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                    <p><span className="font-medium">Payment Method:</span> Online Payment</p>
                  </div>
                </div>
              </div>

              {/* Receipt Actions */}
              <div className="flex justify-center mt-4 sm:mt-6">
                <button 
                  onClick={downloadReceipt}
                  disabled={isGeneratingPDF}
                  className={`flex items-center ${isGeneratingPDF ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white px-4 sm:px-6 py-2 rounded-lg transition duration-300 text-sm sm:text-base shadow-md`}
                >
                  <FaDownload className="mr-2" /> {isGeneratingPDF ? 'Generating...' : 'Download Receipt'}
                </button>
              </div>
              
              {/* Updated eco-friendly message with bold text */}
              <div className="text-center text-green-600 text-xs sm:text-sm mt-4 sm:mt-6 font-bold">
                Go Green 🌍 — Reuse, Recycle, Repeat! ♻️
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <h1 className="text-xl sm:text-2xl text-gray-700 font-semibold mb-4">Your cart is empty!</h1>
          <Link to={"/"}>
            <button className="uppercase bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-md transition duration-300 text-sm sm:text-base">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
