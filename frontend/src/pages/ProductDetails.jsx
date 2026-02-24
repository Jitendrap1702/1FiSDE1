import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../services/productService";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await getProductBySlug(slug);
      setProduct(data.data);
      setSelectedVariant(data.data.variants[0]);
      setSelectedColor(data.data.colors[0]);
      setSelectedEmiPlan(data.data.variants[0].emiPlans[0]);
    })();
  }, [slug]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Image Section */}
        <div>
          <div className="relative bg-white rounded-2xl p-8 shadow overflow-hidden">

            {/* Slider Container */}
            <div className="relative h-[420px] flex items-center justify-center">

              <img
                src={selectedColor.images[currentIndex]}
                alt={product.name}
                className="w-full h-full object-contain transition duration-300"
              />

              {/* Left Arrow */}
              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="absolute left-4 bg-white shadow-md rounded-full p-2 hover:scale-105 transition"
                >
                  ‹
                </button>
              )}

              {/* Right Arrow */}
              {currentIndex < selectedColor.images.length - 1 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="absolute right-4 bg-white shadow-md rounded-full p-2 hover:scale-105 transition"
                >
                  ›
                </button>
              )}

              {/* Image Index */}
              <div className="absolute bottom-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                {currentIndex + 1} / {selectedColor.images.length}
              </div>

            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-6">
            {selectedColor.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setCurrentIndex(i)}
                className={`h-20 w-20 object-contain border rounded-lg cursor-pointer transition
                  ${
                    currentIndex === i
                      ? "border-black"
                      : "border-gray-200 hover:border-black"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <div className="flex items-start gap-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">{product.brandName}</p>
          </div>
          <div className="flex items-start">
            <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-gray-900">{product.name}</h2>
          </div>
          
          <div className="flex items-start mt-2">
            <p className="text-md text-gray-500 ">
              {product.name} {selectedColor.name} {selectedVariant.storage}
            </p>
          </div>

          <div className="flex items-start mt-4">
            <p className="text-3xl font-semibold text-gray-700">
                ₹{selectedVariant.price.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col items-start mt-4">
            <p className="text-md font-semibold text-gray-700">
                Price after cashback
            </p>
            <p className="text-4xl font-bold tracking-tight text-gray-700">
                ₹{(selectedVariant.price - product.cashback).toLocaleString()}
            </p>
          </div>


          {/* Storage Section */}
          <div className="mt-4">
            <div className="flex items-start">
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">STORAGE</h4>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              {product.variants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => {
                    setSelectedVariant(variant);
                    // setSelectedImage(variant.images[0]);
                  }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedVariant._id === variant._id
                      ? "bg-blue-700 text-white shadow-md scale-105"
                      : "border border-gray-300 hover:border-black hover:scale-105"
                  }`}
                >
                  {variant.storage}
                </button>
              ))}
            </div>
          </div>

          {/* Color variant */}
        <div>
          <div className="flex items-start mt-6">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">COLOR</h4>
          </div>

          <div className="flex items-start gap-3">
        {product.colors.map((color) => (
          <button
            key={color._id}
            onClick={() => {
              setSelectedColor(color)
              // setSelectedImage(color.images[0]);
              setCurrentIndex(0); // reset to first image of the newly selected color
            }}
            className="relative group"
            title={color.name}
          >
            {/* Outer Ring (selected state) */}
            <span
                className={`block w-8 h-8 rounded-full transition-all duration-200
                  ${
                    selectedColor._id === color._id
                      ? "scale-110 ring-2 ring-blue-700 ring-offset-2"
                      : "ring-1 ring-gray-300 hover:scale-105"
                  }
                `}
                style={{ backgroundColor: color.hex }}
              />

              </button>
            ))}
            </div>
        </div>

          {/* EMI Plans */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900">
              Choose Your EMI Plan
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              Backed by mutual funds • Zero hidden charges
            </p>
            <div className="space-y-3">
              {selectedVariant.emiPlans.map((emi, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedEmiPlan(emi)}
                  className={`border rounded-2xl p-6 transition-all duration-200 cursor-pointer
                    ${
                      selectedEmiPlan === emi
                        ? "border-blue-700 shadow-lg scale-[1.02]"
                        : "border-gray-200 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                      <p className="text-3xl font-semibold text-gray-900">
                        ₹{emi.monthlyPayment.toLocaleString()}
                      </p>
                      <span className="text-sm text-gray-500">/month</span>
                  </div>
                  {/* tenure, interest, additional cashback */}
                  <div className="flex flex-row lg:flex-col lg:gap-1 gap-3">
                    <div className="flex flex-row items-center gap-3">
                    <div>
                      <p className="inline text-sm font-semibold text-gray-600 mt-1">
                        {emi.tenure} months
                      </p>
                      <span className="ml-1 text-sm text-gray-600">
                        tenure
                      </span>
                    </div>
                    <div>
                      <p className="inline text-sm font-semibold text-gray-600 mt-1">
                        {emi.interestRate}%
                      </p>
                      <span className="ml-1 text-sm text-gray-600">
                        interest
                      </span>
                      <span className="ml-1 text-sm text-[#4406a7]">
                        (No Cost)
                      </span>
                    </div>
                    </div>
                    <div>
                        <p className="inline text-sm lg:text-md font-semibold text-[#4406a7] mt-1">
                          ₹{product.cashback.toLocaleString()}
                        </p>
                        <span className="ml-1 text-sm lg:text-md lg:font-semibold text-[#4406a7]">
                          additional cashback
                        </span>
                      </div>
                  </div>
                  <div className="mt-1 text-[12px] text-gray-600">
                    <p>Total: ₹{(emi.monthlyPayment * emi.tenure - product.cashback).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-12 w-full bg-blue-700 text-white py-4 rounded-2xl text-lg font-medium tracking-wide hover:opacity-90 transition">
            Buy on {selectedEmiPlan ? `${selectedEmiPlan.tenure} months EMI` : "EMI"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
