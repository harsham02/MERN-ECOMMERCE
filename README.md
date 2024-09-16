# Forever - MERN E-commerce Website

**Forever** is a full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, and Node.js), providing a seamless shopping experience for users and powerful admin management tools. The site allows users to browse products, shop, and track orders, while the admin can manage products, users, and orders.

## Features

### User Features:
- User authentication (JWT-based login/register)
- Browse and search for products
- Add products to the shopping cart and wishlist
- Checkout with multiple payment options:
  - **Stripe** for card payments
  - **Razorpay** for multiple payment methods (cards, UPI, etc.)
  - **Cash on Delivery (COD)**
- Track order status after placing an order
- Fully responsive design for optimal experience across devices

### Admin Features:
- Admin-only access for managing the platform
  - Add, update, and delete products
  - View and manage user details
  - Track and update order statuses
- Admin dashboard for tracking total orders, sales, and inventory

## Tech Stack

- **Frontend:**
  - React.js for building the UI
  - Context API for state management
  - Tailwind CSS for styling
  - Axios for API communication
  - React Router for navigation

- **Backend:**
  - Node.js and Express.js for the API
  - MongoDB for database management
  - Mongoose for modeling database objects
  - bcrypt for secure password hashing
  - JWT (JSON Web Tokens) for user authentication

- **Payments Integration:**
  - **Stripe** for secure card payments
  - **Razorpay** for various payment methods
  - **Cash on Delivery (COD)** for offline payments

- **Hosting:**
  - **Frontend & Backend** hosted on **Vercel**

## Live Demos

- **User-facing Website:** [Forever E-commerce Website](https://mern-ecommerce-frontend-tawny.vercel.app/)
- **Admin Panel:** [Forever Admin Panel](https://mern-ecommerce-admin-seven.vercel.app/)
  - **Admin Credentials:**
    - Email: `admin@gmail.com`
    - Password: `admin@123`

## State Management

- **Context API** is used for managing global states like user authentication, cart, wishlist, and admin operations.

## Payment Methods

- **Stripe**: Secure card payments.
- **Razorpay**: Supports multiple payment methods including cards, UPI, net banking, and more.
- **Cash on Delivery (COD)**: Available for offline payments.

## Admin Panel

The admin panel is restricted to the administrator, allowing control over:
- Managing products (Add, Update, Delete)
- Managing and tracking orders (View, Update Order Status)

Admins can log in securely and manage the platform via the [Admin Panel](https://mern-ecommerce-admin-seven.vercel.app/).


## Certificate of Completion

I have successfully completed the development of the **Forever** e-commerce project. You can view or download the certificate of completion below:

[Download Certificate](https://drive.google.com/file/d/1RffJbUZjQ2cGI53bPwDaZ8U9k7E0Ddtx/view?usp=drivesdk)

---

This project provides a robust e-commerce solution, featuring modern design, flexible payment options, and powerful admin functionality for maintaining the platform.
