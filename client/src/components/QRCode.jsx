import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSelector } from "react-redux";

const QRCodes = () => {
  const [loading, setLoading] = useState(true);

  const link = useSelector((state) => state.link.links);
  console.log(link);

  useEffect(() => {
    if (link) {
      setLoading(false);
    }
  }, [link]);

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-single");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code.png`;
    downloadLink.click();
  };

  if (loading || !link) {
    return (
      <div className="text-center text-indigo-500 mt-5">Loading QR Code...</div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <div className="text-center break-all text-lg font-medium text-gray-800 dark:text-gray-100">
        {link.shortUrl}
      </div>
      <QRCodeCanvas
        id="qr-single"
        value={link.shortUrl}
        size={200}
        level="H"
        includeMargin
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <button
        onClick={downloadQRCode}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodes;
