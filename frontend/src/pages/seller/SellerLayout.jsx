import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useContext } from "react";

const SellerLayout = () => {
  const { isSeller, setIsSeller, navigate } = useContext(AppContext);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-sm">
        <Link to={"/"}>
          <h1 className="text-2xl font-semibold">Grocery Store App</h1>
        </Link>

        <div className="flex items-center gap-5 text-gray-600">
          <p className="font-medium">Hi! Admin</p>

          <button
            onClick={() => {
              setIsSeller(false);
              toast.success("Logged out successfully");
              navigate("/");
            }}
            className="border border-gray-400 hover:border-indigo-500 hover:text-indigo-600 
                       rounded-full text-sm px-4 py-1 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* LAYOUT SECTION */}
      <div className="flex bg-gray-50">

        {/* SIDEBAR */}
        <div className="md:w-64 w-20 border-r h-[calc(100vh-65px)] text-base border-gray-300 
                       pt-4 flex flex-col bg-white shadow-sm">

          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition 
                ${
                  isActive
                    ? "border-r-4 border-indigo-600 bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
