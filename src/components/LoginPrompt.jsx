import { useNavigate } from "react-router-dom";

const LoginPrompt = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full border-2 border-green-500">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Login Required</h3>
          <p className="mb-6 text-gray-700">Login to enjoy the shopping!</p>
          
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt; 