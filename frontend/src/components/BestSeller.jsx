import { useContext } from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="mt-20">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-wide">
          Best Sellers
        </h2>

        <div className="w-14 h-1 bg-orange-500 rounded-full mt-2"></div>

        <p className="text-gray-500 text-sm mt-1">
          Our most-loved and highly rated items this week
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <div
              key={index}
              className="opacity-0 animate-realFadeUp"
              style={{ animationDelay: `${index * 0.09}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
