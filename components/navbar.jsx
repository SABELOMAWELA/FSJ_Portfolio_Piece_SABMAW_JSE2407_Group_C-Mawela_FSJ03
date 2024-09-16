import Link from "next/link";
/**
 * Navbar component renders the navigation bar for the website.
 * 
 * This component includes:
 * - A logo or brand name.
 * - A search bar with a search button.
 * - Navigation links and icons for user interaction.
 * - A responsive design that adapts to different screen sizes.
 * - Dropdown menus for different categories in the desktop view.
 * 
 * @returns {JSX.Element} The Navbar component.
 */

export default function Navbar() {
  return (
    <div className="flex flex-wrap place-items-center w-full">
      <section className="relative mx-auto w-full">
    
        <nav className="flex justify-between bg-gray-800 text-white w-full">
          <div className="px-5 xl:px-2 py-4 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="#">
              {/* <img class="h-9" src="/worldwide.png" alt="logo" />  */}
              PrimePicks
            </a>
            
        
            <div className="relative mx-auto text-gray-600 hidden md:block">
  <input
    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
    type="search"
    name="search"
    placeholder="Search..."
  />
  <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
    <svg
      className="text-gray-600 h-4 w-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 56.966 56.966"
      width="512px"
      height="512px"
    >
      <path d="M55.146,51.887l-14.81-14.81c3.486-4.241,5.63-9.682,5.63-15.579c0-13.039-10.61-23.649-23.649-23.649 S0.668,8.459,0.668,21.498s10.61,23.649,23.649,23.649c5.897,0,11.338-2.144,15.579-5.63l14.81,14.81 c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586C55.926,53.933,55.926,52.669,55.146,51.887z M24.317,39.497 c-9.94,0-18.001-8.061-18.001-18.001S14.377,3.495,24.317,3.495s18.001,8.061,18.001,18.001S34.257,39.497,24.317,39.497z" />
    </svg>
  </button>
</div>
           
            <div className="hidden xl:flex items-center space-x-5">
              <a className="hover:text-gray-200" href="#">
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
              <a className="flex items-center hover:text-gray-200" href="#">
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
             
              <a className="flex items-center hover:text-gray-200" href="#">
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
          </div>
         
          <a className="xl:hidden flex mr-6 items-center" href="#">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </a>
          <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>

      
        <hr className="border-white w-4/5 mx-auto" />
        <nav
  className="hidden bg-gray-800 lg:flex lg:justify-center lg:space-x-8 lg:py-2"
  aria-label="Global"
>
  
  <div className="relative group">
    <a
      href="#"
      className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
      aria-current="page"
    >
      Beauty and Personal Care
      <svg
        className="ml-1 h-4 w-4"
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
    </a>
    <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Beauty
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Fragrances
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Skin-care
      </a>
    </div>
  </div>

 
  <div className="relative group">
    <a
      href="#"
      className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Fashion and Accessories
      <svg
        className="ml-1 h-4 w-4"
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
    </a>
    <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Men's Shirts
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Men's Shoes
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Men's Watches
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Sunglasses
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Tops
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Women's Bags
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Women's Dresses
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Women's Jewellery
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Women's Shoes
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Women's Watches
      </a>
    </div>
  </div>

  
  <div className="relative group">
    <a
      href="#"
      className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Electronics
      <svg
        className="ml-1 h-4 w-4"
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
    </a>
    <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Laptops
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Mobile Accessories
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Smartphones
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Tablets
      </a>
    </div>
  </div>

  
  <div className="relative group">
    <a
      href="#"
      className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Home and Living
      <svg
        className="ml-1 h-4 w-4"
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
    </a>
    <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Furniture
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Home Decoration
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Kitchen Accessories
      </a>
    </div>
  </div>

  <div className="relative group">
    <a
      href="#"
      className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Sports and Outdoor
      <svg
        className="ml-1 h-4 w-4"
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
    </a>
    <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Motorcycle
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Sports Accessories
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Vehicle
      </a>
    </div>
  </div>

  <div className="relative group">
    <a
      href="#"
      className="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Groceries
      <svg
        className="ml-1 h-4 w-4"
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
    </a>
    <div className="z-50 absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 py-2">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        Groceries
      </a>
    </div>
  </div>
</nav>

      </section>
    </div>
  );
}
