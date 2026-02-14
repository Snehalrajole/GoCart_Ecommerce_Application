// Currency conversion utility
// Conversion rate: 1 USD = 83.5 INR (approx)

export const convertToINR = (usdPrice) => {
  // Convert USD to INR (using a fixed rate for simplicity)
  const conversionRate = 83.5;
  const inrPrice = usdPrice * conversionRate;
  
  // Format the price with Indian Rupee symbol and thousands separator
  return `₹${inrPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}; 