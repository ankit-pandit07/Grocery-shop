import { useContext } from "react";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useContext(AppContext);
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 pb-20 animate-fadeIn">

      {/* CATEGORY HEADER */}
      {searchCategory && (
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
            {searchCategory.text}
          </h1>

          <div className="h-[3px] w-20 bg-indigo-600 mt-2 rounded-full"></div>
        </div>
      )}

      {/* PRODUCT GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-600">
            No Products Found
          </h1>

          <p className="mt-3 text-gray-500">
            Try browsing another category or search for something else.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
