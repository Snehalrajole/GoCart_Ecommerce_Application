import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add as addToCart } from '../redux/Slices/CartSlice'; // Update import to match existing CartSlice
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { convertToINR } from '../utils/currencyConverter';
import './ProductDetails.css'; // Will create this CSS file next

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user login status from Auth context
  const { isLoggedIn } = useAuth();
  
  // Product state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Related products state
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Selection state
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
        
        // Set default selections if available
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        
        // Fetch related products once we have the current product
        if (data.category) {
          fetchRelatedProducts(data.category, data.id);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Fetch related products by category
  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch related products');
      }
      
      const data = await response.json();
      // Filter out the current product and limit to maximum 4 related products
      const filtered = data
        .filter(product => product.id.toString() !== currentProductId.toString())
        .slice(0, 4);
        
      setRelatedProducts(filtered);
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };
  
  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    if (!selectedSize) {
      setToastMessage('Please select a size');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    if (!selectedColor) {
      setToastMessage('Please select a color');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    dispatch(addToCart({
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize
    }));
    
    setToastMessage('Product added to cart!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  // Navigate to login page
  const goToLogin = () => {
    navigate('/login');
  };
  
  // Handle quantity changes
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  if (loading) {
    return <div className="product-details-loading">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="product-details-error">Error: {error}</div>;
  }
  
  if (!product) {
    return <div className="product-details-not-found">Product not found</div>;
  }
  
  // For demo purposes, if the API doesn't provide colors/sizes
  const demoColors = ['Black', 'White', 'Red', 'Blue', 'Green'];
  const demoSizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  const colors = product.colors || demoColors;
  const sizes = product.sizes || demoSizes;
  
  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-details-left">
          <div className="product-image-container">
            <img src={product.image} alt={product.title} className="product-image" />
          </div>
        </div>
        
        <div className="product-details-right">
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-price">{convertToINR(product.price)}</div>
            <div className="product-category">
              <span className="category-tag">{product.category}</span>
            </div>
            <div className="product-rating">
              {/* Simple star rating display */}
              <span className="stars">
                {'★'.repeat(Math.round(product.rating?.rate || 0))}
                {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
              </span>
              <span className="rating-count">({product.rating?.count || 0} reviews)</span>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-colors">
              <h3>Colors</h3>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
              {selectedColor && <p className="selected-color">Selected: {selectedColor}</p>}
            </div>
            
            <div className="product-sizes">
              <h3>Sizes</h3>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="quantity-selector">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={incrementQuantity}>+</button>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              
              <button className="back-btn" onClick={() => navigate(-1)}>
                Back to Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-container">
          <h2 className="related-products-title">Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id}
                className="related-product-card"
              >
                <div className="related-product-image-container">
                  <img src={product.image} alt={product.title} className="related-product-image" />
                </div>
                <div className="related-product-info">
                  <h3 className="related-product-title">{product.title}</h3>
                  <p className="related-product-price">{convertToINR(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {showToast && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <h2>Login Required</h2>
            <p>Please log in to enjoy shopping!</p>
            <div className="login-modal-actions">
              <button className="login-btn" onClick={goToLogin}>Log In</button>
              <button className="cancel-btn" onClick={() => setShowLoginModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails; 