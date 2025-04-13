import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setLinksData } from "../redux/features/linkSlice";

const LinkTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);
  const [linkData, setLinkData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        let res;

        if (search.trim() !== "") {
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/link/link-search?query=${search}`,
            { withCredentials: true }
          );

          setLinkData(res.data.results || []);
          setTotalLinks(res.data.results?.length || 0);
          setTotalPages(1); // Assuming no pagination on search
        } else {
          // All Links API
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/link/user?page=${currentPage}`,
            {
              withCredentials: true,
            }
          );

          setLinkData(res.data.links || []);
          setTotalLinks(res.data.totalLinks || 0);
          setTotalPages(res.data.totalPages || 1);
        }
      } catch (error) {
        console.error(error);
        alert(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [search, currentPage]);

  const handleClick = (link) => {
    dispatch(setLinksData(link));
    navigate(`/analytics/${link._id}`);
  };

  const handleQrClick = (link) => {
    dispatch(setLinksData(link));
    navigate(`/qr`);
  };

  return (
    <div className="bg-white dark:bg-[#1f1f1f] shadow-xl rounded-xl p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Your Shortened Links
        </h2>

        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by long URL..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-[#2c2c2c] text-gray-800 dark:text-white placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="text-md font-semibold text-gray-800 dark:text-white mb-4">
        <p>Total Links: {totalLinks}</p>
      </div>

      {loading ? (
        <ScaleLoader
          width={6}
          height={80}
          radius={2}
          margin={6}
          color="skyblue"
          className="mx-auto text-center mt-28"
        />
      ) : (
        <>
          {linkData?.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#2c2c2c] text-gray-600 dark:text-gray-300">
                      <th className="py-3 px-2 text-left font-medium">
                        Original URL
                      </th>
                      <th className="py-3 px-2 text-left font-medium">
                        Short URL
                      </th>
                      <th className="py-3 px-2 text-center font-medium hidden sm:table-cell">
                        Clicks
                      </th>
                      <th className="py-3 px-2 text-center font-medium hidden md:table-cell">
                        Created
                      </th>
                      <th className="py-3 px-2 text-center font-medium hidden md:table-cell">
                        Status
                      </th>
                      <th className="py-3 px-2 text-center font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkData?.map((link) => (
                      <tr
                        key={link._id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition"
                      >
                        <td className="py-2 px-2 max-w-[150px] break-words text-indigo-600 dark:text-indigo-400">
                          <a
                            href={link.longUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.longUrl}
                          </a>
                        </td>
                        <td className="py-2 px-2 break-words text-blue-500 dark:text-blue-400">
                          <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {link.shortUrl}
                          </a>
                        </td>
                        <td className="py-2 px-2 text-center text-gray-800 dark:text-white hidden sm:table-cell">
                          {link.clickCount}
                        </td>
                        <td className="py-2 px-2 text-center text-gray-600 dark:text-gray-300 hidden md:table-cell">
                          {new Date(link.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-2 text-center hidden md:table-cell">
                          {link.isExpired ? (
                            <span className="inline-block px-2 py-1 rounded-full bg-red-100 dark:bg-red-600 text-red-600 dark:text-white text-xs font-semibold">
                              Expired
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 dark:bg-green-600 text-green-600 dark:text-white text-xs font-semibold">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button
                            className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline mr-2"
                            onClick={() => handleClick(link)}
                          >
                            Analytics
                          </button>
                          <button
                            className="text-sm text-blue-500 dark:text-blue-300 hover:underline"
                            onClick={() => handleQrClick(link)}
                          >
                            QR Code
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {search === "" && (
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Showing Page: {currentPage}
                  </span>
                  <div className="flex gap-2 md:gap-4">
                    <button
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      className="px-3 py-1 rounded-md text-sm transition font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer disabled:dark:bg-gray-900 disabled:bg-gray-50 disabled:dark:text-gray-400 disabled:text-gray-400"
                      disabled={currentPage <= 1}
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded-md text-sm transition font-medium bg-indigo-500 text-white dark:text-gray-200">
                      {currentPage}
                    </button>
                    <button
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      className="px-3 py-1 rounded-md text-sm transition font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer disabled:bg-gray-50 disabled:dark:bg-gray-900 disabled:dark:text-gray-400 disabled:text-gray-400"
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-2xl font-normal text-gray-400">
              No data found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LinkTable;
