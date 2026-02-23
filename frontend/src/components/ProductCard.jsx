import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="group cursor-pointer bg-white rounded-2xl border border-gray-200 
           hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
           overflow-hidden h-full 
           flex flex-row sm:flex-col"
    >
      {/* Image Section */}
      <div className="relative bg-gray-100 
           w-[35%] sm:w-full 
           aspect-square 
           overflow-hidden shrink-0">
        <img
          src={product.colors[0].images[0]}
          alt={product.name}
          className="w-full h-full object-contain 
                     group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* EMI Badge */}
        <div className="absolute top-2 left-0 bg-violet-600 text-white 
                        text-[10px] md:text-xs font-semibold 
                        px-2 md:px-3 py-0.5 md:py-1 rounded-r-full shadow">
          0% EMI
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-3 md:p-4 lg:p-5 gap-1 md:gap-2">

        {/* Product Name */}
        <h3 className="text-xs md:text-sm lg:text-base 
                       font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Variant Info */}
        <p className="text-[11px] md:text-xs lg:text-sm 
                      text-gray-500 line-clamp-1">
          {product.variants[0].storage} · {product.colors[0].name}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm md:text-base lg:text-lg 
                           font-bold text-gray-900">
            ₹{product.variants[0].price}
          </span>
        </div>

        {/* Cashback */}
        <p className="text-[11px] md:text-xs lg:text-sm 
                      text-violet-600 font-medium">
          ₹{product.cashback} Cashback
        </p>

        {/* EMI Box */}
        <div className="mt-auto bg-violet-50 rounded-xl 
                        p-2 md:p-2.5 lg:p-3
                        flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-500">Starts at</p>
            <p className="text-sm md:text-base lg:text-base 
                         font-bold text-gray-900">
              ₹{product.variants[0].emiPlans[0].monthlyPayment}
              <span className="text-[10px] md:text-xs text-gray-500 font-normal">
                {" "}
                /mo
              </span>
            </p>
          </div>

          <button className="text-[10px] md:text-xs lg:text-sm 
                             font-medium text-violet-600 hover:underline">
            View Plans
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;