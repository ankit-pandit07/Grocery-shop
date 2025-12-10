import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full">
      <img
        src={assets.main_banner_bg}
        alt=""
        className="hidden md:block w-full h-[460px] object-cover"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt=""
        className="md:hidden w-full h-[520px] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-20 lg:px-28">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg text-center md:text-left max-w-lg">
          Freshness You Can Trust,
          <span className="block text-orange-400">Savings You Will Love!</span>
        </h1>

        <p className="text-gray-200 text-center md:text-left mt-4 max-w-md text-base md:text-lg opacity-90">
          Discover premium quality groceries at unbeatable prices — delivered fast to your door.
        </p>

        <div className="flex items-center mt-8 gap-5">
          <Link
            to="/products"
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-orange-600 text-white font-semibold transition-all shadow-lg
            hover:bg-orange-700 hover:shadow-orange-400/40 hover:scale-105 active:scale-95 group"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt=""
              className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 px-7 py-3 rounded-full bg-white text-orange-600 font-semibold transition-all shadow-md
            hover:bg-gray-100 hover:shadow-orange-200 hover:scale-105 active:scale-95 group"
          >
            Explore Deals
            <img
              src={assets.white_arrow_icon}
              alt=""
              className="w-4 h-4 invert brightness-0 transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
