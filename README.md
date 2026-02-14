# Go Cart E-Commerce Application

A modern responsive e-commerce platform built with React and Redux Toolkit, featuring a smooth shopping experience with user authentication, shopping cart management, product details, and receipt generation.

## 🚀 Features

- **User Authentication** - Register, login, and logout functionality
- **Product Catalog** - Browse products with filtering and search options
- **Product Details** - View detailed product information with related products
- **Shopping Cart** - Add, remove, and update quantity of items
- **Checkout System** - Complete orders with automated receipt generation
- **PDF Receipt Download** - Generate and download order receipts as PDF
- **Responsive Design** - Mobile-friendly interface that works on all devices
- **Contact Form** - Get in touch with support team

## 🛠️ Technologies Used

- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Styling
- **React Hot Toast** - Toast notifications
- **jsPDF** - PDF generation for receipts
- **Axios** - API requests
- **React Icons** - Icons

## 📁 Project Structure

```
Frontend-React/reduxEcommerce/
├── public/                  # Static files
├── src/                     # Source files
│   ├── assets/              # Images and static assets
│   ├── components/          # Reusable UI components
│   │   ├── CartItem.jsx     # Shopping cart item component
│   │   ├── Footer.jsx       # Footer component
│   │   ├── Login.jsx        # Login form
│   │   ├── LoginPrompt.jsx  # Login prompt modal
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Product.jsx      # Product component
│   │   ├── ProductDetails.css # Styling for product details
│   │   ├── ProductDetails.jsx # Product details component
│   │   ├── Register.jsx     # Registration form
│   │   ├── Slider.jsx       # Image slider component
│   │   ├── Spinner.jsx      # Loading spinner component
│   │   └── Spinner.css      # Spinner styling
│   ├── context/             # Context providers
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── Cart.jsx         # Shopping cart page
│   │   ├── Contact.jsx      # Contact page
│   │   ├── Home.jsx         # Home page
│   │   └── Products.jsx     # Products listing page
│   ├── redux/               # Redux state management
│   │   ├── Slices/          # Redux slices
│   │   │   └── CartSlice.js # Cart state management
│   │   └── store.js         # Redux store configuration
│   ├── utils/               # Utility functions
│   │   └── currencyConverter.js # Currency formatting utilities
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.x or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/go-cart-ecommerce.git
   cd go-cart-ecommerce/Frontend-React/reduxEcommerce
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🧰 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons provided by React Icons
- CSS styling with Tailwind CSS
- PDF generation using jsPDF library
