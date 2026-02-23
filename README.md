# 🛒 E-Commerce MERN Application

A full-stack E-Commerce web application built using the MERN stack.  
This project includes slug-based routing, responsive UI, image sliders, EMI plans, cashback system, and a scalable product schema.

---# 🛠️ Features
- **Slug-Based Routing**: Clean and SEO-friendly URLs for product pages.
- **Responsive UI**: Optimized for both desktop and mobile devices.
- **Image Slider**: Showcase multiple product images in an interactive slider.
- **EMI Plans**: Flexible payment options for customers.
- **Cashback System**: Incentivize purchases with cashback rewards.
- **Scalable Product Schema**: Designed to accommodate future product attributes and variations.


---

# 🚀 1. Setup & Run Instructions

## 📌 Clone the Repository

```bash
-> git clone https://github.com/Jitendrap1702/1FiSDE1.git
-> cd your-repo-name
```

## Backend Setup

```bash
-> cd backend
-> npm install
```

-> create a .env file in the backend directory and add the following environment variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string

-> Start the backend server:
```bash
-> npm run dev
 ```
-> Backend server will be running on http://localhost:5000

## Frontend Setup

```bash
-> cd frontend
-> npm install
-> npm run dev
```
-> Frontend server will be running on http://localhost:5173

# 🛠️ 2. Technologies Used
- **Frontend**: React, Tailwind CSS, React Router, Axios, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, slugify(for SEO-friendly URLs)
- other dependencies include cors, dotenv, and nodemon for development.
- other tools include **Postman** for API testing and **Git** for version control.

# 📁 3. Project Structure
```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── .env
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.js
│   │   └── main.js
│   └── package.json
└── README.md
```

# 4. API Endpoints
- **GET /api/products**: Fetch all products
Example Response:
```json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "slug": "product-name",
    "brandName": "Brand Name",
    "category": "Category Name",
    "description": "Product Description",
    "cashback": 10,
    "colors": [
        {
            "name": "Red",
            "hex": "#FF0000",
            "images": [
                "image1_url",
                "image2_url"
            ]
        },
        {
            "name": "Blue",
            "hex": "#0000FF",
            "images": [
                "image3_url",
                "image4_url"
            ]
        }
    ],
    "variants": [
        {
            "storage": "128GB",
            "price": 121000,
            "emiPlans": [
                {
                    "tenure": "12 months",
                    "interestRate": 0,
                    "monthlyPayment": 10083.33,
                    "downPayment": 0
                },
                {
                    "tenure": "6 months",
                    "interestRate": 0,
                    "monthlyPayment": 20166.67,
                    "downPayment": 0
                }
            ]
        }
    ]
  },
  {
    "_id": "product_id",
    "name": "Product Name",
    "slug": "product-name",
    "brandName": "Brand Name",
    "category": "Category Name",
    "description": "Product Description",
    "cashback": 10,
    "colors": [
        {
            "name": "Red",
            "hex": "#FF0000",
            "images": [
                "image1_url",
                "image2_url"
            ]
        },
        {
            "name": "Blue",
            "hex": "#0000FF",
            "images": [
                "image3_url",
                "image4_url"
            ]
        }
    ],
    "variants": [
        {
            "storage": "128GB",
            "price": 121000,
            "emiPlans": [
                {
                    "tenure": "12 months",
                    "interestRate": 0,
                    "monthlyPayment": 10083.33,
                    "downPayment": 0
                },
                {
                    "tenure": "6 months",
                    "interestRate": 0,
                    "monthlyPayment": 20166.67,
                    "downPayment": 0
                }
            ]
        }
    ]
  }
]
```

- **GET /api/products/:slug**: Fetch product details by slug
Example Response:
```json
{
  "_id": "product_id",
  "name": "Product Name",
  "slug": "product-name",
  "brandName": "Brand Name",
  "category": "Category Name",
  "description": "Product Description",
  "cashback": 10,
  "colors": [
      {
          "name": "Red",
          "hex": "#FF0000",
          "images": [
              "image1_url",
              "image2_url"
          ]
      },
      {
          "name": "Blue",
          "hex": "#0000FF",
          "images": [
              "image3_url",
              "image4_url"
          ]
      }
  ],
  "variants": [
      {
          "storage": "128GB",
          "price": 121000,
          "emiPlans": [
              {
                  "tenure": "12 months",
                  "interestRate": 0,
                  "monthlyPayment": 10083.33,
                  "downPayment": 0
              },
              {
                  "tenure": "6 months",
                  "interestRate": 0,
                  "monthlyPayment": 20166.67,
                  "downPayment": 0
              }
          ]
      }
  ]
}
```

- **POST /api/products**: Create a new product
- **PUT /api/products/:slug**: Update product details
- **DELETE /api/products/:slug**: Delete a product

# 5. Database Schema
```javascript
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    cashback: { type: Number, default: 0 },
    colors: [
        {
        name: { type: String, required: true },
        hex: { type: String, required: true },
        images: [{ type: String }]
        }
    ],
    variants: [
        {
        storage: { type: String, required: true },
        price: { type: Number, required: true },
        emiPlans: [
            {
            tenure: { type: String, required: true },
            interestRate: { type: Number, default: 0 },
            monthlyPayment: { type: Number, required: true },
            downPayment: { type: Number, default: 0 }
            }
        ]
        }
    ]
    }, { timestamps: true });
    ```


