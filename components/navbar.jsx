"use client";
/**
 * Navbar component renders the top navigation bar of the website, 
 * including a logo, search bar, category dropdowns, and user interaction icons.
 * 
 * The component adapts responsively to different screen sizes, moving 
 * the search bar into a mobile menu on smaller devices and providing
 * easy access to sorting, searching, and category-based navigation.
 * 
 * @component
 * 
 * @example
 * <Navbar />
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  /**
   * State for the search input field.
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * State for the selected sort order.
   * Possible values are 'asc' for ascending and 'desc' for descending.
   * @type {string}
   */
  const [sortOrder, setSortOrder] = useState("");

  /**
   * State to track whether the mobile menu is open or closed.
   * @type {boolean}
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Next.js router instance used for programmatic navigation.
   * @see {@link https://nextjs.org/docs/api-reference/next/router}
   */
  const router = useRouter();

  /**
   * Pathname of the current route, used for navigation logic.
   * @see {@link https://nextjs.org/docs/api-reference/next/router#usepathname}
   */
  const pathname = usePathname();

  /**
   * Search parameters from the URL query string.
   * @see {@link https://nextjs.org/docs/api-reference/next/router#usesearchparams}
   */
  const searchParams = useSearchParams();

  /**
   * Extracts the current product category from URL query parameters.
   * @type {string}
   */
  const currentCategory = searchParams.get("category") || "";

  /**
   * Handles the form submission for the search bar.
   * Navigates to the home page with the search term as a query parameter.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Clear input field after search
      setIsMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  /**
   * Clears the search term, sorting order, and navigates to the home page.
   */
  const handleClear = () => {
    router.push(`/`);
    setSearchTerm("");
    setSortOrder("");
    setIsMobileMenuOpen(false); // Close mobile menu after clearing
  };

  /**
   * Handles sorting by updating the sortOrder state and navigating to the page
   * with the selected sort option (ascending or descending).
   * 
   * @param {string} order - The sort order, either "asc" or "desc".
   */
  const handleSort = (order) => {
    setSortOrder(order);
    router.push(`/?sort=${order}`);
    setIsMobileMenuOpen(false); // Close mobile menu after sorting
  };

  /**
   * Effect hook to automatically close the mobile menu when the route changes.
   * 
   * @see {@link https://reactjs.org/docs/hooks-effect.html}
   */
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };
    router.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


  return (
    <div className="w-full">
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
        
            <div className="flex-shrink-0 flex items-center">
              <a
                className="text-3xl font-bold cursor-pointer"
                onClick={handleClear}
                aria-label="PrimePicks Home"
              >
                PrimePick
              </a>
            </div>

          
            <div className="hidden md:flex md:items-center md:w-1/2">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  className="w-full border-2 border-gray-300 bg-white text-gray-900 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-3 mr-4"
                  aria-label="Search"
                >
                  <svg
                    className="text-gray-600 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.966 56.966"
                  >
                    <path d="M55.146,51.887l-14.81-14.81c3.486-4.241,5.63-9.682,5.63-15.579c0-13.039-10.61-23.649-23.649-23.649 S0.668,8.459,0.668,21.498s10.61,23.649,23.649,23.649c5.897,0,11.338-2.144,15.579-5.63l14.81,14.81 c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586C55.926,53.933,55.926,52.669,55.146,51.887z M24.317,39.497 c-9.94,0-18.001-8.061-18.001-18.001S14.377,3.495,24.317,3.495s18.001,8.061,18.001,18.001S34.257,39.497,24.317,39.497z" />
                  </svg>
                </button>
              </form>
            </div>

           
            <div className="flex items-center">
           
              <div className="hidden xl:flex items-center space-x-5">
              
                <a
                  className="hover:text-gray-200"
                  href="#"
                  aria-label="Wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a>
                
                
                <a
                  className="flex items-center hover:text-gray-200 relative"
                  href="#"
                  aria-label="Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </a>
                
            
                <a
                  className="flex items-center hover:text-gray-200"
                  href="#"
                  aria-label="Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>

          
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden ml-4 flex items-center justify-center p-2 rounded-md hover:text-gray-200 focus:outline-none"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

       
        <hr className="border-gray-700" />
        <div className="hidden lg:flex justify-center space-x-8 py-2">
       
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-10 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
           
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt- py-2">
              <button
                onClick={() => handleSort("asc")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Lowest to Highest
              </button>
              <button
                onClick={() => handleSort("desc")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Highest to Lowest
              </button>
            </div>
          </div>

       
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Beauty and Personal Care
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
              <Link
                href="/?category=beauty"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "beauty"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Beauty
              </Link>
              <Link
                href="/?category=fragrances"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "fragrances"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Fragrances
              </Link>
              <Link
                href="/?category=skin-care"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "skin-care"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Skin-care
              </Link>
            </div>
          </div>

        
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Fashion and Accessories
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
      
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
              <Link
                href="/?category=mens-shirts"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "mens-shirts"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Men's Shirts
              </Link>
              <Link
                href="/?category=mens-shoes"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "mens-shoes"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Men's Shoes
              </Link>
              <Link
                href="/?category=mens-watches"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "mens-watches"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Men's Watches
              </Link>
              <Link
                href="/?category=sunglasses"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "sunglasses"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sunglasses
              </Link>
              <Link
                href="/?category=tops"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "tops"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tops
              </Link>
              <Link
                href="/?category=womens-bags"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "womens-bags"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Women's Bags
              </Link>
              <Link
                href="/?category=womens-dresses"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "womens-dresses"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Women's Dresses
              </Link>
              <Link
                href="/?category=womens-jewellery"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "womens-jewellery"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Women's Jewellery
              </Link>
              <Link
                href="/?category=womens-shoes"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "womens-shoes"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Women's Shoes
              </Link>
              <Link
                href="/?category=womens-watches"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "womens-watches"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Women's Watches
              </Link>
            </div>
          </div>

        
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Electronics
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
           
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
              <Link
                href="/?category=laptops"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "laptops"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Laptops
              </Link>
              <Link
                href="/?category=mobile-accessories"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "mobile-accessories"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Mobile Accessories
              </Link>
              <Link
                href="/?category=smartphones"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "smartphones"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Smartphones
              </Link>
              <Link
                href="/?category=tablets"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "tablets"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tablets
              </Link>
            </div>
          </div>

       
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Home and Living
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
              <Link
                href="/?category=furniture"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "furniture"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Furniture
              </Link>
              <Link
                href="/?category=home-decoration"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "home-decoration"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Home Decoration
              </Link>
              <Link
                href="/?category=kitchen-accessories"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "kitchen-accessories"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Kitchen Accessories
              </Link>
            </div>
          </div>

         
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sports and Outdoor
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
           
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
              <Link
                href="/?category=motorcycle"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "motorcycle"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Motorcycle
              </Link>
              <Link
                href="/?category=sports-accessories"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "sports-accessories"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sports Accessories
              </Link>
              <Link
                href="/?category=vehicle"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "vehicle"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Vehicle
              </Link>
            </div>
          </div>

         
          <div className="relative group">
            <button
              className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Groceries
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
              <Link
                href="/?category=groceries"
                className={`block px-4 py-2 text-sm ${
                  currentCategory === "groceries"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Groceries
              </Link>
              
            </div>
           
          </div>
          <div className="relative group">
          <button
                onClick={handleClear}
                className="hidden xl:flex bg-gray-900 text-white items-center rounded-md py-2 px-3 text-sm font-medium ml-4"
                aria-label="Clear Search and Sort"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M9 6v12m6-12v12M10.5 6V4.5a1.5 1.5 0 013 0V6m6.75 0h-13.5M18 6v12a2.25 2.25 0 01-2.25 2.25H8.25A2.25 2.25 0 016 18V6h12z"
                  />
                </svg>
                Clear
              </button>
          </div>
        </div>
      </nav>

  
      {isMobileMenuOpen && (
        <div className="bg-gray-800 text-white xl:hidden">
          <div className="px-4 pt-4 pb-3 space-y-1">
           
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                className="w-full border-2 border-gray-300 bg-white text-gray-900 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
                aria-label="Search"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.966 56.966"
                >
                  <path d="M55.146,51.887l-14.81-14.81c3.486-4.241,5.63-9.682,5.63-15.579c0-13.039-10.61-23.649-23.649-23.649 S0.668,8.459,0.668,21.498s10.61,23.649,23.649,23.649c5.897,0,11.338-2.144,15.579-5.63l14.81,14.81 c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586C55.926,53.933,55.926,52.669,55.146,51.887z M24.317,39.497 c-9.94,0-18.001-8.061-18.001-18.001S14.377,3.495,24.317,3.495s18.001,8.061,18.001,18.001S34.257,39.497,24.317,39.497z" />
                </svg>
              </button>
            </form>

            
            <div className="mt-3">
              <button
                onClick={() => handleSort("asc")}
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-md"
                aria-label="Sort products from lowest to highest"
              >
                Sort: Lowest to Highest
              </button>
              <button
                onClick={() => handleSort("desc")}
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-md mt-1"
                aria-label="Sort products from highest to lowest"
              >
                Sort: Highest to Lowest
              </button>
            </div>

   
            <div className="mt-4 space-y-1">
              
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-md cursor-pointer">
                  Beauty and Personal Care
                  <svg
                    className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/?category=beauty"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "beauty"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Beauty
                  </Link>
                  <Link
                    href="/?category=fragrances"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "fragrances"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Fragrances
                  </Link>
                  <Link
                    href="/?category=skin-care"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "skin-care"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Skin-care
                  </Link>
                </div>
              </details>

    
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-md cursor-pointer">
                  Fashion and Accessories
                  <svg
                    className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/?category=mens-shirts"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "mens-shirts"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Men's Shirts
                  </Link>
                  <Link
                    href="/?category=mens-shoes"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "mens-shoes"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Men's Shoes
                  </Link>
                  <Link
                    href="/?category=mens-watches"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "mens-watches"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Men's Watches
                  </Link>
                  <Link
                    href="/?category=sunglasses"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "sunglasses"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Sunglasses
                  </Link>
                  <Link
                    href="/?category=tops"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "tops"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Tops
                  </Link>
                  <Link
                    href="/?category=womens-bags"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "womens-bags"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Women's Bags
                  </Link>
                  <Link
                    href="/?category=womens-dresses"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "womens-dresses"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Women's Dresses
                  </Link>
                  <Link
                    href="/?category=womens-jewellery"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "womens-jewellery"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Women's Jewellery
                  </Link>
                  <Link
                    href="/?category=womens-shoes"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "womens-shoes"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Women's Shoes
                  </Link>
                  <Link
                    href="/?category=womens-watches"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "womens-watches"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Women's Watches
                  </Link>
                </div>
              </details>

           
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-md cursor-pointer">
                  Electronics
                  <svg
                    className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/?category=laptops"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "laptops"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Laptops
                  </Link>
                  <Link
                    href="/?category=mobile-accessories"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "mobile-accessories"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Mobile Accessories
                  </Link>
                  <Link
                    href="/?category=smartphones"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "smartphones"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Smartphones
                  </Link>
                  <Link
                    href="/?category=tablets"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "tablets"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Tablets
                  </Link>
                </div>
              </details>

           
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-md cursor-pointer">
                  Home and Living
                  <svg
                    className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/?category=furniture"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "furniture"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Furniture
                  </Link>
                  <Link
                    href="/?category=home-decoration"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "home-decoration"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Home Decoration
                  </Link>
                  <Link
                    href="/?category=kitchen-accessories"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "kitchen-accessories"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Kitchen Accessories
                  </Link>
                </div>
              </details>

              
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-md cursor-pointer">
                  Sports and Outdoor
                  <svg
                    className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/?category=motorcycle"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "motorcycle"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Motorcycle
                  </Link>
                  <Link
                    href="/?category=sports-accessories"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "sports-accessories"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Sports Accessories
                  </Link>
                  <Link
                    href="/?category=vehicle"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "vehicle"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Vehicle
                  </Link>
                </div>
              </details>

             
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-md cursor-pointer">
                  Groceries
                  <svg
                    className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    href="/?category=groceries"
                    className={`block px-4 py-2 text-sm ${
                      currentCategory === "groceries"
                        ? "bg-gray-600 text-gray-100"
                        : "text-gray-200 hover:bg-gray-700"
                    } rounded-md`}
                  >
                    Groceries
                  </Link>
                </div>
              </details>
            </div>

      
            <div className="mt-4 flex items-center justify-around">
              
              <a
                className="hover:text-gray-300"
                href="#"
                aria-label="Wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </a>
              
              
              <a
                className="flex items-center hover:text-gray-300 relative"
                href="#"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </a>
              
              <a
                className="flex items-center hover:text-gray-300"
                href="#"
                aria-label="Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
