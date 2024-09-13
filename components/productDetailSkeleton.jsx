export default function ProductDetailSkeleton() {
    return (
      <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto animate-pulse">
      <button className="flex items-center text-gray-600 font-bold mb-4">
        <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full"></div>
        <span className="bg-gray-300 h-4 w-16"></span>
      </button>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className="bg-gray-200 p-4 flex items-center sm:h-[380px] rounded-lg"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 p-4 flex items-center rounded-lg sm:h-[182px]"></div>
            <div className="bg-gray-200 p-4 flex items-center rounded-lg sm:h-[182px]"></div>
          </div>
        </div>

        <div className="max-w-xl">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
          <div className="flex space-x-1 mt-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-5 h-5 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex space-x-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="h-10 bg-gray-200 rounded w-40"></div>
            <div className="h-10 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>
    );
  }