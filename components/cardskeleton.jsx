export default function CardSkeleton() {
    return (
        <div className="relative bg-gray-200 rounded-3xl overflow-hidden shadow-lg animate-pulse">
        <div className="h-[250px] bg-gray-300 w-full mb-4"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

    );
  }