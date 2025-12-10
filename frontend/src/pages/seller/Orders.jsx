import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">Orders List</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="grid md:grid-cols-[2fr_1.5fr_0.8fr_1fr] gap-6 p-5 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          {/* PRODUCT + IMAGES */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded border object-cover"
                src={`http://localhost:5000/images/${order.items[0].product.image[0]}`}
              />

              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium text-gray-800 leading-tight">
                    {item.product.name}
                    {item.quantity > 1 && (
                      <span className="text-indigo-500 ml-1">
                        × {item.quantity}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state} {order.address.zipCode}
            </p>
            <p>{order.address.country}</p>
            <p className="mt-1">📞 {order.address.phone}</p>
          </div>

          {/* AMOUNT */}
          <p className="text-lg font-semibold text-gray-800 flex items-center">
            ₹{order.amount}
          </p>

          {/* ORDER INFO */}
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Method:</span>{" "}
              {order.paymentType}
            </p>
            <p>
              <span className="font-semibold">Payment:</span>{" "}
              {order.isPaid ? (
                <span className="text-green-600 font-semibold">Paid</span>
              ) : (
                <span className="text-red-500 font-semibold">Pending</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No orders yet.
        </p>
      )}
    </div>
  );
};

export default Orders;
