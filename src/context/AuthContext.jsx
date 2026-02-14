import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/Slices/CartSlice";

const AuthContext = createContext();

// Custom toast options for better visibility
const toastOptions = {
  duration: 3000,
  style: {
    padding: '16px',
    fontWeight: 'bold',
  },
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const register = (username, email, password) => {
    // Check if username or email already exists
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
      toast.error("Username already exists!", toastOptions);
      return false;
    }
    
    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      toast.error("Email already exists!", toastOptions);
      return false;
    }

    // Add new user
    const newUser = { username, email, password };
    setUsers([...users, newUser]);
    
    // Enhanced registration success message
    toast.success("Registered successfully!", {
      ...toastOptions,
      icon: '🎉',
    });
    
    return true;
  };

  const login = (username, password) => {
    // Log for debugging
    console.log("Attempting login with:", username);
    console.log("Available users:", users);

    // Find user with case-insensitive username match
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      
      // Enhanced login success message
      toast.success("Logged in successfully! Enjoy Shopping", {
        ...toastOptions,
        icon: '🛒',
        duration: 4000,
      });
      
      return true;
    } else {
      toast.error("Invalid username or password!", toastOptions);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    // Clear the cart when user logs out
    dispatch(clearCart());
    toast.success("Logged out successfully", toastOptions);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoggedIn, 
      register, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 