import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ProductList = () => {
  const { products, fetchProducts, axios } = useContext(AppContext);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 py-10 px-4 md:px-10">
      <h2 className="pb-4 text-xl font-semibold text-gray-700">All Products</h2>

      <div className="w-full overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 hidden md:table-cell">Price</th>
              <th className="px-4 py-3">Stock</th>
            </tr>
          </thead>

          <tbody className="text-gray-600">
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="border border-gray-300 rounded-md p-1 bg-white">
                    <img
                      src={`http://localhost:5000/images/${product.image[0]}`}
                      alt="Product"
                      className="w-14 h-14 object-cover rounded"
                    />
                  </div>

                  <span className="truncate max-sm:hidden w-40">
                    {product.name}
                  </span>
                </td>

                {/* CATEGORY */}
                <td className="px-4 py-3 capitalize">{product.category}</td>

                {/* PRICE */}
                <td className="px-4 py-3 hidden md:table-cell">
                  ₹{product.offerPrice}
                </td>

                {/* STOCK TOGGLE */}
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.inStock}
                      onChange={() => toggleStock(product._id, !product.inStock)}
                      className="sr-only peer"
                    />

                    <div className="
                      w-12 h-7 
                      bg-gray-300 rounded-full 
                      peer-checked:bg-indigo-600 
                      transition-all duration-200
                    "></div>

                    <span
                      className="
                      absolute top-1 left-1 
                      w-5 h-5 bg-white rounded-full shadow 
                      transition-all duration-200 
                      peer-checked:translate-x-5
                    "
                    ></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
