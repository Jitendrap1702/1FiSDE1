const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');
// Importing mongoose package for MongoDB connection
const mongoose = require('mongoose');
// DNS Configuration : To avoid DNS resolution issues when connecting to MongoDB Atlas
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);
// Importing CORS middleware to handle cross-origin requests
const cors = require('cors');

dotenv.config();

const app = express();

// ✅ Enable CORS
// This allows our frontend (running on a different port) to communicate with this backend without CORS issues.
app.use(cors({
  origin: "http://localhost:5173",
//   origin: "", // Allow all origins (for development purposes). In production, specify the frontend URL for better security.
  credentials: true
}));

app.get('/', (req, res) => {
    res.status(200).send('1Fi SDE1 Assignment');
});

// Remove Content-Security-Policy header to allow loading resources from different origins (like images from MongoDB Atlas)
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});
// Logging middleware to log incoming requests (for debugging purposes)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server is up and running on port: http:localhost:${port}`);
});
