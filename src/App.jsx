import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");

      const response = await fetch(
        "https://ytdownloader-script.onrender.com/download-video",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Download failed");
      }

      // ✅ Extract filename from headers
      const disposition = response.headers.get("Content-Disposition");
      let fileName = "video.mp4";
      if (disposition && disposition.includes("filename=")) {
        fileName = disposition.split("filename=")[1].replace(/['"]/g, "");
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(urlBlob);
      setUrl("");
      toast.success("Download started!");
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
      toast.error(err.message || "Download failed");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          Enter YouTube URL
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Submit
          </button>
          <ToastContainer />
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
};

export default App;
