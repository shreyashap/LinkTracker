import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateLinkPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    // Validation
    if (!longUrl.trim() || !validateUrl(longUrl)) {
      return setError("Please enter a valid long URL.");
    }

    if (alias.trim().length > 0 && !/^[a-zA-Z0-9_-]+$/.test(alias)) {
      return setError(
        "Alias can only contain letters, numbers, underscores, or dashes."
      );
    }

    if (expirationDate && new Date(expirationDate) < new Date()) {
      return setError("Expiration date must be in the future.");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/link/create`,
        {
          longUrl,
          alias: alias || undefined,
          expirationDate: expirationDate || undefined,
        },
        { withCredentials: true }
      );

      setShortUrl(response.data.shortUrl);
      setLongUrl("");
      setAlias("");
      setExpirationDate("");
      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white dark:bg-[#1f1f1f] shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Create a Short Link
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Enter long URL"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#2c2c2c] dark:border-gray-700 dark:text-white"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />

          <input
            type="text"
            placeholder="Custom alias (optional)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#2c2c2c] dark:border-gray-700 dark:text-white"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />

          <input
            type="date"
            placeholder="Expiration date (optional)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#2c2c2c] dark:border-gray-700 dark:text-white"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            {loading ? "Creating..." : "Generate Short Link"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-green-100 dark:bg-green-900 p-4 rounded-md text-center">
            <p className="text-green-800 dark:text-green-300 font-medium">
              Shortened URL:
            </p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-300 font-semibold hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default CreateLinkPage;
