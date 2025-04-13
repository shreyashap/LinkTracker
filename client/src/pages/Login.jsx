import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErros, setFormErros] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setFormErros({
        email: "Email is required",
        password: "Password is required",
      });
      return;
    } else if (!email) {
      setFormErros({
        email: "Email is required",
      });
      return;
    } else if (!password) {
      setFormErros({
        password: "Password is required",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res?.data) {
        dispatch(userLogin(res.data.loggedInUser));
      }
      navigate("/dashboard");
    } catch (err) {
      if (err?.response) {
        setErr(err.response?.data?.error);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Sign In
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErros({
                email: "",
              });
            }}
          />
          {formErros?.email && (
            <p className="text-red-400">{formErros.email}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-white/80 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErros({
                password: "",
              });
            }}
          />
          {formErros?.password && (
            <p className="text-red-400">{formErros.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
        {err && <p className="text-red-400 text-center mt-2">{err}</p>}
        <p className="text-sm text-center mt-4 text-gray-800 dark:text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="underline hover:text-blue-600">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
