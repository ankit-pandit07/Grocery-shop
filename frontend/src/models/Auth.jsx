import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowUserLogin, setUser, axios, navigate } =
    useContext(AppContext);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onMouseDown={() => setShowUserLogin(false)}
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm 
        flex items-center justify-center 
        z-[2000] animate-fadeIn
      "
    >
      <form
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submitHandle}
        className="
          bg-white p-8 rounded-2xl shadow-2xl 
          w-80 sm:w-[360px] flex flex-col gap-5 
          animate-scaleIn
        "
      >
        <p className="text-3xl font-bold text-center text-gray-800">
          <span className="text-indigo-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="text-gray-600 text-sm">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter name"
              className="
                border border-gray-300 rounded-lg w-full 
                p-2.5 mt-1 outline-none 
                focus:ring-2 focus:ring-indigo-500 transition
              "
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-gray-600 text-sm">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
            className="
              border border-gray-300 rounded-lg w-full 
              p-2.5 mt-1 outline-none 
              focus:ring-2 focus:ring-indigo-500 transition
            "
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-gray-600 text-sm">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            className="
              border border-gray-300 rounded-lg w-full 
              p-2.5 mt-1 outline-none 
              focus:ring-2 focus:ring-indigo-500 transition
            "
            type="password"
            required
          />
        </div>

        {state === "login" ? (
          <p className="text-sm text-gray-600">
            Don't have an account?
            <span
              onClick={() => setState("register")}
              className="text-indigo-600 cursor-pointer ml-1 hover:underline"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?
            <span
              onClick={() => setState("login")}
              className="text-indigo-600 cursor-pointer ml-1 hover:underline"
            >
              Login
            </span>
          </p>
        )}

        <button
          className="
            bg-indigo-600 hover:bg-indigo-700 
            transition-all text-white w-full py-2.5 
            rounded-lg font-medium shadow-md active:scale-95
          "
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
