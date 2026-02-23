import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await getAllProducts();
    console.log(data);
    if (data) setProducts(data.data);
    else setProducts([]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      <div className="grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4 
        xl:grid-cols-4 
        gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
