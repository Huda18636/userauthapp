import Link from "next/link";
export function Header() {
  return (
     <div className="px-4 py-4">
        {/* Top row: links aligned right */}
       <div className="flex justify-end space-x-6 mb-4">
           <Link
            href="/"
            className="text-black-600 underline hover:text-black-800 transition text-sm md:text-base"
          >
            Products
          </Link>
          <Link
            href="/register"
            className="text-black-600 underline hover:text-black-800 transition text-sm md:text-base"
          >
            Register
          </Link>
          {/* <Link
            href="/"
            className="text-black-600 underline hover:text-black-800 transition text-sm md:text-base"
          >
            Contact Us
          </Link> */}
        </div>

        {/* Centered heading with logo below */}
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <img src="nmlogo.jpg" alt="Icon" className="h-10 w-10 mr-2 object-contain" />
          Nia Mia
        </h1>
      </div>
     
  );
}