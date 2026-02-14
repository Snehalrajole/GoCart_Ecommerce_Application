import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Shop = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    }
    catch (error) {
      console.log("Error fetching products:", error);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen mt-16 sm:mt-20 p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 pt-4">Shop Our Products</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2 overflow-x-auto">
        <button 
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full whitespace-nowrap transition-colors duration-200 ${
            selectedCategory === "all" 
              ? "bg-green-600 text-white" 
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category 
                ? "bg-green-600 text-white" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Display */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto gap-4 sm:gap-6 md:gap-8">
          {filteredProducts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-gray-700">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Shop; 