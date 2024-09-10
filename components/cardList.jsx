"use client";
// import "../src/app/globals.css"

import React, { useState, useEffect } from "react";

export default function Cards() {
  const [products, setProducts] = useState([]); // Store all fetched products
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 20; // Define the number of items to display per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://next-ecommerce-api.vercel.app/products");

        if (!res.ok) {
          throw new Error(`Failed to fetch products. Status: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data); // Store fetched products
        } else {
          throw new Error("Invalid products data");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage); // Calculate total pages
  const startIndex = (currentPage - 1) * itemsPerPage; // Determine the start index for the current page
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage); // Slice products to show on the current page

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!currentProducts.length) {
    return <p className="text-center text-gray-500">No products available at the moment.</p>;
  }

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Display products in a grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300"
            >
              <a href="#" className="cursor-pointer">
                {/* Display the first image in the array */}
                <img
                  src={Array.isArray(product.images) ? product.images[0] : product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-[300px] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-4 rounded-b-3xl">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="font-semibold text-base text-blue-500">{product.title}</h6>
                    <h6 className="font-semibold text-base text-indigo-600">${product.price}</h6>
                  </div>
                  <p className="text-xs text-green-500">{product.category}</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-black">{currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md ml-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
