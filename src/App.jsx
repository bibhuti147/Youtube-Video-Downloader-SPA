import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');     

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlObj = new URL(url).searchParams.get("v") || new URL(url).pathname.slice(1);
      alert(urlObj)
      setMessage('');
      fetch(`https://ytdownloader-script.onrender.com/yurl/${urlObj.searchParams.get("v")}`)
      setUrl(''); 
    } catch {
      setMessage('Please enter a valid URL.');
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
        {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
      </div>
    </div>
  );
}

export default App;
