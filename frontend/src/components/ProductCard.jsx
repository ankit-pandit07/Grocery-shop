import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } =
    useContext(AppContext);

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
          scrollTo(0, 0);
        }}
        className="
          bg-white border border-gray-300/30 rounded-xl p-3 md:p-4 w-full min-w-56 max-w-56 cursor-pointer
          transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        "
      >
        <div className="flex items-center justify-center py-2 group">
          <img
            className="transition-transform duration-300 group-hover:scale-110 w-28 md:w-36 object-contain"
            src={`http://localhost:5000/images/${product.image[0]}`}
            alt={product.name}
          />
        </div>

        <div className="mt-2 text-gray-600 text-sm">
          <p className="capitalize">{product.category}</p>

          <p className="text-gray-800 font-semibold text-base md:text-lg leading-tight truncate">
            {product.name}
          </p>

          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-3.5"
                />
              ))}
            <span className="text-gray-500 text-xs">(4.0)</span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="text-indigo-600 font-semibold text-lg md:text-xl">
                ₹{product.offerPrice}
                <span className="text-gray-500 text-xs md:text-sm line-through ml-1">
                  ₹{product.price}
                </span>
              </p>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="
                    flex items-center gap-1 bg-indigo-100 border border-indigo-300 text-indigo-600 
                    w-[70px] md:w-[85px] h-[34px] rounded-md font-medium text-sm
                    hover:bg-indigo-200 active:scale-95 transition-all duration-200
                  "
                >
                  <img src={assets.cart_icon} alt="cart" className="w-4" />
                  Add
                </button>
              ) : (
                <div
                  className="
                    flex items-center justify-center gap-2 bg-indigo-500/20 rounded-md
                    w-16 md:w-20 h-[34px] select-none font-medium
                  "
                >
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="px-2 text-lg"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-sm">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
