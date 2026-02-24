import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

function App() {

  return (
    <>
      {/* <h1>1Fi SDE1 Assignment</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
