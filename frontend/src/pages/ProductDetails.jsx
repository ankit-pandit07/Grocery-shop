import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const { products, navigate, addToCart } = useContext(AppContext);
  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (product) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 pb-20 animate-fadeIn">

      {/* Breadcrumb */}
      <p className="text-gray-600 mb-4">
        <Link to="/" className="hover:text-indigo-600">Home</Link> /
        <Link to="/products" className="hover:text-indigo-600"> Products</Link> /
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-indigo-600"
        >
          {" "}{product.category}
        </Link>{" "}
        / <span className="text-indigo-600">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-12">

        {/* LEFT: IMAGES */}
        <div className="flex gap-4">
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-4">
            {product.image.map((img, index) => (
              <div
                key={index}
                className={`border w-20 h-20 rounded-lg cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition 
                ${thumbnail === img ? "border-indigo-500" : "border-gray-300"}`}
                onClick={() => setThumbnail(img)}
              >
                <img
                  src={`http://localhost:5000/images/${img}`}
                  className="w-full h-full object-cover"
                  alt="thumb"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border rounded-xl overflow-hidden shadow-md">
            <img
              src={`http://localhost:5000/images/${thumbnail}`}
              className="w-[350px] md:w-[450px] h-full object-cover"
              alt="main"
            />
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="flex-1 text-gray-700">

          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <img
                  key={i}
                  src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                  className="w-5"
                  alt="rating"
                />
              ))}
            <p className="ml-2 text-gray-600">( {product.rating} )</p>
          </div>

          {/* Pricing */}
          <div className="mt-6">
            <p className="text-gray-500 line-through text-lg">MRP: ₹{product.price}</p>
            <p className="text-3xl font-semibold text-indigo-600">
              ₹{product.offerPrice}
            </p>
            <p className="text-sm text-gray-500">(Inclusive of all taxes)</p>
          </div>

          {/* About Product */}
          <div className="mt-8">
            <p className="text-lg font-semibold">About Product</p>
            <ul className="list-disc ml-6 space-y-1 mt-2 text-gray-600">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-900 font-medium transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
