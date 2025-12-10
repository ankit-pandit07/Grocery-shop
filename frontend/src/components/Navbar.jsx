import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    searchQuery,
    setSearchQuery,
  } = useContext(AppContext);

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white shadow-sm">
      <Link to="/">
        <h2 className="text-3xl font-extrabold text-indigo-600 tracking-tight hover:opacity-80 transition">
          FreshCart
        </h2>
      </Link>

      <div className="hidden sm:flex items-center gap-8 text-gray-700 font-medium">
        <Link
          to={"/"}
          className="relative hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
        >
          Home
        </Link>

        <Link
          to={"/products"}
          className="relative hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
        >
          All Products
        </Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full hover:shadow-md transition">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} className="w-4 opacity-70" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:scale-110 transition"
        >
          <img src={assets.cart_icon} className="w-6" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-600 w-[19px] h-[19px] flex items-center justify-center rounded-full">
            {cartCount()}
          </span>
        </div>

        {user ? (
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-9 cursor-pointer hover:scale-105 transition"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <ul className="absolute top-11 right-0 bg-white shadow-lg border border-gray-200 py-2 w-40 rounded-md text-sm z-[99999]">
                <li
                  onClick={() => {
                    navigate("/my-orders");
                    setShowMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    setUser(null);
                    setShowMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full shadow-md hover:shadow-lg"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <img src={assets.menu_icon} className="w-6" />
      </button>

      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[64px] left-0 w-full bg-white shadow-xl py-5 flex-col items-start gap-4 px-6 text-sm md:hidden z-[9999]`}
      >
        <Link to={"/"} className="hover:text-indigo-600 transition">
          Home
        </Link>

        <Link to={"/products"} className="hover:text-indigo-600 transition">
          All Products
        </Link>

        {user ? (
          <div className="flex flex-col gap-2">
            <p
              onClick={() => {
                navigate("/my-orders");
                setOpen(false);
              }}
              className="cursor-pointer hover:text-indigo-600 transition"
            >
              My Orders
            </p>

            <p
              onClick={() => {
                setUser(null);
                setOpen(false);
              }}
              className="cursor-pointer hover:text-indigo-600 transition"
            >
              Logout
            </p>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full shadow-md"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
