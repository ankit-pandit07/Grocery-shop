const NewsLetter = () => {
  return (
    <div className="my-20 flex flex-col items-center justify-center text-center px-6">
      <div className="bg-white shadow-lg border border-gray-200 rounded-2xl py-10 px-6 md:px-14 w-full max-w-3xl">
        <h1 className="md:text-4xl text-2xl font-bold text-gray-800">
          Never Miss a Deal!
        </h1>

        <p className="md:text-lg text-gray-500 mt-2 mb-6">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>

        <form className="flex items-center max-w-2xl mx-auto w-full">
          <input
            className="
              flex-1 h-12 md:h-13 px-4 outline-none text-gray-600
              border border-gray-300 rounded-l-xl
              focus:border-indigo-500 transition-all
            "
            type="text"
            placeholder="Enter your email"
            required
          />

          <button
            type="submit"
            className="
              h-12 md:h-13 px-8 md:px-12 bg-indigo-600 text-white font-medium
              rounded-r-xl shadow-md hover:bg-indigo-700 transition-all 
              hover:shadow-lg active:scale-95
            "
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
