import Link from "next/link"; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="sticky z-50 top-0">
        <nav className="bg-gray-500 border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/">
              <button className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  FSJ01
                </span>
              </button>
            </Link>
          </div>
        </nav>
      </header> */}

      <main className="flex-grow flex items-center justify-center text-3xl">
   
      </main>

      {/* <footer className="bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
    <div className="bg-black/5 p-4 text-center">
     © 2024 Copyright:
    <span> FSJ01</span>
  </div>
</footer> */}
    </div>
  );
}
