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
GoCart/
├── public/                  # Static files
│   └── vitee.png           # Project logo/image
├── src/                     # Source files
│   ├── assets/              # Images and static assets
│   │   └── react.svg        # React logo
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
│   │   ├── About.jsx        # About page
│   │   ├── Cart.jsx         # Shopping cart page
│   │   ├── Contact.jsx      # Contact page
│   │   ├── Home.jsx         # Home page
│   │   └── Shop.jsx         # Products listing page
│   ├── redux/               # Redux state management
│   │   ├── Slices/          # Redux slices
│   │   │   ├── CartSlice.js # Cart state management
│   │   │   └── UserSlice.jsx # User state management
│   │   └── Store.jsx        # Redux store configuration
│   ├── tests/               # Test files
│   │   ├── App.test.jsx     # App component tests
│   │   └── setup.js         # Test setup configuration
│   ├── utils/               # Utility functions
│   │   └── currencyConverter.js # Currency formatting utilities
│   ├── App.jsx              # Main application component
│   ├── App.css              # App component styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── dist/                    # Build output directory
├── node_modules/            # Dependencies
├── babel.config.cjs         # Babel configuration
├── Dockerfile               # Docker configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── Jenkinsfile              # Jenkins CI/CD configuration
├── jest.config.cjs          # Jest test configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Locked dependency versions
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```
