import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        My Orders
      </h1>

      {myOrders.length === 0 && (
        <p className="text-gray-600 text-lg">No orders found.</p>
      )}

      {myOrders.map((order) => (
        <div
          key={order._id}
          className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition rounded-xl p-6 mb-10"
        >
          {/* Order Header */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
            <div>
              <p className="text-gray-700 font-medium">
                <span className="font-semibold text-gray-900">Order ID:</span>{" "}
                {order._id}
              </p>

              <p className="text-gray-700 font-medium">
                <span className="font-semibold text-gray-900">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.paymentType === "COD"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.paymentType}
              </span>

              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
                Total: ₹{order.amount}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/images/${item.product.image[0]}`}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-500 capitalize">
                      {item.product.category}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quantity:{" "}
                      <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                </div>

                {/* Status + Price */}
                <div className="text-right mt-4 md:mt-0">
                  <p
                    className={`font-semibold text-sm mb-1 ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    Status: {order.status}
                  </p>

                  <p className="text-gray-700 font-semibold text-lg">
                    ₹{item.product.offerPrice * item.quantity}
                  </p>

                  <p className="text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
