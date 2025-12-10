import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    user,
  } = useContext(AppContext);

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let temp = [];
    for (const key in cartItems) {
      const product = products.find((p) => p._id === key);
      product.quantity = cartItems[key];
      temp.push(product);
    }
    setCartArray(temp);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  useEffect(() => {
    if (products.length > 0) getCart();
  }, [products, cartItems]);

  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((i) => ({
            product: i._id,
            quantity: i.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", {
          items: cartArray.map((i) => ({
            product: i._id,
            quantity: i.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) window.location.replace(data.url);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return products.length > 0 ? (
    <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 pb-20">

      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Your Cart <span className="text-indigo-600 text-xl">({cartCount()} items)</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* LEFT SIDE - PRODUCTS */}
        <div className="flex-1 space-y-5">
          {cartArray.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-6 bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 border border-gray-200"
            >
              <img
                onClick={() => navigate(`/product/${product.category}/${product._id}`)}
                src={`http://localhost:5000/images/${product.image[0]}`}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 text-sm capitalize">{product.category}</p>

                <div className="flex items-center gap-3 mt-2">
                  <select
                    onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                    value={cartItems[product._id]}
                    className="border rounded-md px-2 py-1"
                  >
                    {Array(Math.max(cartItems[product._id], 9))
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>

                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="text-xl font-bold text-indigo-600">
                ₹{product.offerPrice * product.quantity}
              </p>
            </div>
          ))}

          <button
            onClick={() => navigate("/products")}
            className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2 mt-5"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="w-full md:w-[360px] bg-white shadow-lg border border-gray-200 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalCartAmount()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (2%)</span>
              <span>₹{(totalCartAmount() * 2) / 100}</span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-3 border-t">
              <span>Total</span>
              <span>
                ₹{totalCartAmount() + (totalCartAmount() * 2) / 100}
              </span>
            </div>
          </div>

          <hr className="my-4" />

          {/* DELIVERY ADDRESS SECTION */}
          <div>
            <p className="text-sm font-semibold text-gray-700 uppercase">
              Delivery Address
            </p>

            <div className="relative mt-2">
              <p className="text-gray-600">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No Address Available"}
              </p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-indigo-500 hover:text-indigo-700 text-sm mt-1"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute bg-white border shadow-lg rounded-lg mt-2 w-full p-2 z-10">
                  {address.map((addr) => (
                    <p
                      key={addr._id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddress(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {addr.street}, {addr.city}, {addr.state}
                    </p>
                  ))}

                  <p
                    onClick={() => navigate("/add-address")}
                    className="text-indigo-600 p-2 text-center hover:bg-indigo-50 cursor-pointer"
                  >
                    + Add New Address
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm font-semibold mt-5">Payment Method</p>
            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              className="border px-3 py-2 rounded-md mt-2 w-full"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
