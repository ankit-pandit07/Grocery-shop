import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { axios, user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT FORM SECTION */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Add Delivery <span className="text-indigo-600">Address</span>
          </h2>

          <form onSubmit={submitHanlder} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* First Name */}
            <div>
              <label className="font-medium mb-1 block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="font-medium mb-1 block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <label className="font-medium mb-1 block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Street */}
            <div className="col-span-2">
              <label className="font-medium mb-1 block text-gray-700">Street</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="font-medium mb-1 block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* State */}
            <div>
              <label className="font-medium mb-1 block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Zip */}
            <div>
              <label className="font-medium mb-1 block text-gray-700">Zip Code</label>
              <input
                type="number"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className="font-medium mb-1 block text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <label className="font-medium mb-1 block text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                required
              />
            </div>

            {/* Submit */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Save Address
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex items-center justify-center animate-fadeIn">
          <img
            src={assets.add_address_iamge}
            alt="Address Illustration"
            className="w-full max-w-sm drop-shadow-2xl rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
