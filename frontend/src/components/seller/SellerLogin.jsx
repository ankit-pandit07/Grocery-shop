import { toast } from "react-hot-toast";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", { email, password });

      if (data.success) {
        setIsSeller(true);
        toast.success(data.message);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    !isSeller && (
      <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
        
        {/* CARD */}
        <form
          onSubmit={submitHandle}
          className="relative bg-white w-80 sm:w-[360px] p-8 py-10 rounded-xl shadow-2xl border border-gray-200 animate-fadeIn flex flex-col gap-5"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>

          <p className="text-2xl font-semibold text-center text-gray-700">
            <span className="text-indigo-600">Seller</span> Login
          </p>

          {/* EMAIL */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 outline-indigo-500"
              type="email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 outline-indigo-500"
              type="password"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
