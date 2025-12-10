import { useContext } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-semibold tracking-wide">
        Categories
      </p>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            style={{ backgroundColor: category.bgColor }}
            className="
              group cursor-pointer py-6 px-4 rounded-xl flex flex-col items-center justify-center gap-3
              transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95
            "
          >
            <div
              className="
                w-20 h-20 flex items-center justify-center rounded-full p-3 bg-white shadow
                transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
              "
            >
              <img
                src={category.image}
                alt=""
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>

            <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
