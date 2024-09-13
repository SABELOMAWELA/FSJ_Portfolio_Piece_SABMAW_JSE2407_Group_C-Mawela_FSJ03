export default function Error() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 max-w-md mx-auto">
          <h1 className="text-indigo-600 font-extrabold text-6xl">Oops... 404</h1>
          <p className="text-gray-800 text-xl font-semibold mt-4">Page Not Found</p>
          <p className="text-gray-600 mt-2">
            It seems the page you're looking for doesn't exist. Please check your internet connection and ensure the URL or search term is correct.
          </p>
          <p className="text-gray-600 mt-2">
            If you believe this is an error, feel free to contact support. Thank you!
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
  
    );
  }
  