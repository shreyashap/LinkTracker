import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
  const { alias } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/link/${alias}`,
          { withCredentials: true }
        );
        const originalUrl = response.data.longUrl;

        window.location.href = originalUrl;
      } catch (err) {
        console.error(err);
        setError("Invalid or expired link.");
        setRedirecting(false);
      }
    };

    fetchOriginalUrl();
  }, [alias]);

  return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-[#1f1f1f]">
      <div className="text-center">
        {redirecting ? (
          <>
            <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Redirecting to original page...
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Please wait.
            </p>
          </>
        ) : (
          <div>
            <h2 className="text-red-600 dark:text-red-400 text-lg font-semibold">
              {error}
            </h2>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
