import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto">
      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className="bg-gray-100 p-4 flex items-center rounded-lg">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt="Product"
                className="w-full max-h-full object-contain object-top"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>

          {product.images && product.images.length > 1 ? (
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="bg-gray-100 p-4 flex items-center rounded-lg">
                  <img
                    src={image}
                    alt="Product"
                    className="w-full max-h-full object-contain object-top"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="max-w-xl">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{product.category}</p>
          </div>

          <div className="flex space-x-1 mt-4">
            <svg
              className="w-5 fill-yellow-400"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* rating icon */}
            </svg>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>

          <div className="mt-4">
            <h3 className="text-gray-800 text-4xl font-bold">${product.price}</h3>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
            <p className="text-sm text-gray-600 mt-4">{product.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Reviews</h3>
            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-600">
              {product.reviews &&
                product.reviews.map((review, index) => (
                  <li key={index}>
                    <span className="font-bold">{review.name}</span> - {review.date}
                    <br />
                    {review.comment}
                    <br />
                    Rating: {review.rating}
                  </li>
                ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Stock and Availability</h3>
            <p className="text-sm text-gray-600 mt-4">{product.stock}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Tags</h3>
            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-600">
              {product.tags &&
                product.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              type="button"
              className="min-w-[200px] px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold rounded-lg"
            >
              Buy now
            </button>
            <button
              type="button"
              className="min-w-[200px] px-4 py-2.5 border border-yellow-400 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;