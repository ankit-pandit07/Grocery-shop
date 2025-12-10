import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center py-10 px-4 md:px-10 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-700">Add New Product</h2>

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />

                  <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition">
                    <img
                      src={
                        files[index]
                          ? URL.createObjectURL(files[index])
                          : assets.upload_area
                      }
                      alt="uploadArea"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </label>
              ))}
          </div>
        </div>

        {/* PRODUCT NAME */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type product name"
            className="border border-gray-300 rounded-lg px-3 py-2 outline-indigo-500"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Product Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write product details"
            className="border border-gray-300 rounded-lg px-3 py-2 outline-indigo-500 resize-none"
          ></textarea>
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-indigo-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.path}>
                {cat.text}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE + OFFER PRICE */}
        <div className="flex gap-5 flex-wrap">
          <div className="flex-1 min-w-[120px] flex flex-col gap-1">
            <label className="font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-indigo-500"
              required
            />
          </div>

          <div className="flex-1 min-w-[120px] flex flex-col gap-1">
            <label className="font-medium">Offer Price</label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="0"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-indigo-500"
              required
            />
          </div>
        </div>

        <button className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
