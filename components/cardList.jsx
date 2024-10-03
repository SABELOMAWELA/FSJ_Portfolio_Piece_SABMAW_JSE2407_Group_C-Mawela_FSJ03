'use client';

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase"; 
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import CardSkeleton from "./cardskeleton";
import Error from "./404";

export default function Cards({ category, search, sort, currentPage }) {
  const router = useRouter(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const itemsPerPage = 20; 
  const [lastDoc, setLastDoc] = useState(null); 
  const [currentPageNum, setCurrentPageNum] = useState(currentPage || 1); 

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      let productsQuery = collection(db, "products");
      let q = query(productsQuery, limit(itemsPerPage));

 

      
      if (lastDoc && currentPageNum > 1) {
        q = query(q, startAfter(lastDoc));
      }

      try {
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDoc(lastVisible);

        setProducts(fetchedProducts); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products"); 
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [currentPageNum]);

 
  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPageNum(newPage);
      const query = new URLSearchParams({
        page: newPage,
        search: search || "",
        sort: sort || "",
        category: category || "",
      });
      router.push(`?${query.toString()}`); 
    }
  };

  const handleNextPage = () => {
    handlePageChange(currentPageNum + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageNum > 1) {
      handlePageChange(currentPageNum - 1);
    }
  };


  if (loading) {
    return (
      <section className="py-4">
        <div className="mx-auto max-w-7.5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

 
  if (error) {
    return <Error />;
  }


  if (products.length === 0) {
    return <Error message="No products found." />;
  }

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7.5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="cursor-pointer">
                <ImageSelector
                  images={Array.isArray(product.images) ? product.images : [product.thumbnail]}
                  productId={product.id}
                />
                <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-4 rounded-b-3xl">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="font-semibold text-base text-blue-500">{product.title}</h6>
                    <h6 className="font-semibold text-base text-indigo-600">${product.price}</h6>
                  </div>
                  <p className="text-xs text-green-500">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md mr-2"
            onClick={handlePreviousPage}
            disabled={currentPageNum === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-black">Page {currentPageNum}</span>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md ml-2"
            onClick={handleNextPage}
            disabled={products.length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}


const ImageSelector = ({ images, productId }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const displayedImages = images.slice(0, 4);

  return (
    <div className="relative">
      <div className="flex justify-center mb-2 space-x-2">
        {displayedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-12 h-12 object-cover rounded-full cursor-pointer border-2 ${
              mainImage === image ? "border-indigo-600" : "border-gray-300"
            }`}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>

      <Link href={`/product/${productId}`}>
        <img
          src={mainImage}
          alt="Product image"
          className="object-cover w-full h-[300px] transition-transform duration-500 group-hover:scale-105 cursor-pointer"
        />
      </Link>
    </div>
  );
};
