// AppInit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppInit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/verify-user`,
          {
            withCredentials: true,
          }
        );

        if (res.data?.valid) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="bg-white text-black dark:bg-gray-800 dark:text-gray-200 p-10">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return null;
};

export default AppInit;
