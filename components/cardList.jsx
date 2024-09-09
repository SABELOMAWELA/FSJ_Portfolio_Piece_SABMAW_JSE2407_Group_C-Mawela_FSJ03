"use client"; 

import React, { useState, useEffect } from 'react';

export default function Cards() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://next-ecommerce-api.vercel.app/products');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch products. Status: ${res.status}`);
        }

        const data = await res.json();
        
        if (Array.isArray(data)) {
          setProducts(data); 
        } else {
          throw new Error('Invalid products data');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  
  const totalPages = Math.ceil(products.length / itemsPerPage);

 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!currentProducts.length) {
    return <p className="text-center text-gray-500">No products available at the moment.</p>;
  }

  return (
    <section className="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
           <a
           key={product.id}
           href="#"
           className="relative bg-cover group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer"
         >
           <img
             src={product.images} 
             alt={product.title} 
        
             className="rounded-2xl object-cover w-[calc(100%-24px)]"
           />
               <div
            class="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-semibold text-base leading-7 text-black">{product.title}</h6>
                  <h6 className="font-semibold text-base leading-7 text-indigo-600 text-right">${product.price}</h6>
                </div>
                <p className="text-xs leading-5 text-gray-500">{product.category}</p>
              </div>
            </a>
          ))}
        </div>
    
       
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
