"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CardSkeleton from "./cardskeleton";
import Error from "./404";
import { fetchProducts } from "../src/app/api/product"; 

/**
 * Component that displays product images and allows users to select a main image.
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.images - Array of image URLs for the product.
 * @param {string} props.productId - The ID of the product for navigation.
 * @returns {JSX.Element} The ImageSelector component.
 */
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

/**
 * Component that fetches and displays product cards with pagination.
 *
 * @returns {JSX.Element} The CardsContent component.
 */
const CardsContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const itemsPerPage = 20;

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const category = searchParams.get("category");
  const sortOrder = searchParams.get("sort");
  const pageParam = searchParams.get("page");

  useEffect(() => {
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [pageParam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery, sortOrder]);

  useEffect(() => {
    const query = new URLSearchParams({
      page: currentPage,
      search: searchQuery || "",
      sort: sortOrder || "",
      category: category || "",
    });

    router.push(`?${query.toString()}`);
  }, [category, searchQuery, sortOrder, currentPage, router]);

  /**
   * Fetches product data from the API and updates state.
   *
   * @returns {Promise<void>}
   */
  const fetchProductsData = async () => {
    setLoading(true);
    setError("");

    try {
      const allProducts = await fetchProducts(category);
      setProducts(allProducts);
    } catch (error) {
      setError(error.message || "An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [currentPage, category, searchQuery, sortOrder]);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage);
    setFilteredProducts(paginatedProducts);
  }, [products, searchQuery, category, sortOrder, currentPage]);

  /**
   * Handles page changes for pagination.
   *
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
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
    return <Error message={error} />;
  }

  if (!filteredProducts.length) {
    return <Error message="No products found." />;
  }

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7.5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredProducts.map((product) => (
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
                    <h6 className="font-semibold text-base text-blue-500">
                      {product.title}
                    </h6>
                    <h6 className="font-semibold text-base text-indigo-600">
                      ${product.price}
                    </h6>
                  </div>
                  <p className="text-xs text-green-500">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md mr-2 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-black">Page {currentPage}</span>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md ml-2 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={filteredProducts.length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * Main component for rendering the Cards section.
 *
 * @returns {JSX.Element} The Cards component.
 */
export default function Cards() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardsContent />
    </Suspense>
  );
}
