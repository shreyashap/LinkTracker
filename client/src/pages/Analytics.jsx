import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClicksOverTimeChart from "../components/ClickOverTimeChart";
import DeviceBreakdownChart from "../components/DeviceBreakdown";
import BrowserBreakdownChart from "../components/BrowserBreakdown";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";
const AnalyticsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analyticsData, setAnalyticsData] = useState({
    clicksOverTime: [],
    deviceBreakdown: [],
    browserBreakdown: [],
  });

  const linkData = useSelector((state) => state.link.links);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false); // Loading state for delete

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/link/${id}/analytics`,
          { withCredentials: true }
        );

        if (res.data) {
          setAnalyticsData({
            clicksOverTime: res.data.clicksByDate,
            deviceBreakdown: res.data.deviceBreakdown,
            browserBreakdown: res.data.browserBreakdown,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAnalyticsData();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/link/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Link deleted successfully!");
        navigate("/dashboard"); // Redirect to the dashboard after deleting
      } else {
        toast.error("Failed to delete link.");
      }
    } catch (error) {
      toast.error("Error deleting link.");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-white dark:bg-[#1f1f1f] dark:text-white">
        <div className=" flex justify-between items-center mx-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Link Analytics
          </h2>
          <div>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              {deleting ? (
                <ClipLoader color="#ff3b30" size={20} />
              ) : (
                <FaTrash size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Delete Icon */}

        {/* Link Details */}
        <div className="bg-white dark:bg-[#1f1f1f] shadow-md rounded-lg p-4 mb-6 space-y-2">
          <p className="text-gray-800 dark:text-white">
            <strong>Original URL:</strong>{" "}
            <a
              href={linkData?.longUrl}
              className="text-indigo-500 underline"
              target="_blank"
              rel="noreferrer"
            >
              {linkData?.longUrl}
            </a>
          </p>
          <p className="text-gray-800 dark:text-white">
            <strong>Short URL:</strong>{" "}
            <a
              href={linkData?.shortUrl}
              className="text-blue-500 underline"
              target="_blank"
              rel="noreferrer"
            >
              {linkData?.shortUrl}
            </a>
          </p>
          <p className="text-gray-800 dark:text-white">
            <strong>Created At:</strong>{" "}
            {new Date(linkData?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-800 dark:text-white">
            <strong>Expiration Date:</strong>{" "}
            {new Date(linkData?.expirationDate).toLocaleDateString()}
          </p>
          <p className="text-gray-800 dark:text-white">
            <strong>Total Clicks:</strong> {linkData?.clickCount}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {linkData?.isExpired ? (
              <span className="inline-block px-2 py-1 text-xs bg-red-100 dark:bg-red-600 text-red-600 dark:text-white rounded-full">
                Expired
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-600 text-green-600 dark:text-white rounded-full">
                Active
              </span>
            )}
          </p>
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-lg flex flex-col gap-10 p-4">
          <ClicksOverTimeChart
            data={analyticsData.clicksOverTime}
            loading={loading}
          />
          <DeviceBreakdownChart
            data={analyticsData.deviceBreakdown}
            loading={loading}
          />
          <BrowserBreakdownChart
            data={analyticsData.browserBreakdown}
            loading={loading}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AnalyticsPage;
