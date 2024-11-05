import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ProductsContext } from "../utils/Context.jsx";

const Home = () => {
  const { products } = useContext(ProductsContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [...new Set(products.map(item => item.category))];

  const filteredProducts = category 
    ? products.filter(item => item.category === category)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 ml-4 ">
            <GoHomeFill className="h-6 w-6 text-blue-500" />
          </Link>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <HiMenuAlt2 className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          <aside 
            className={`fixed lg:relative lg:block top-[73px] left-0 h-[calc(100vh-73px)] lg:h-[10px] w-64 bg-white lg:w-64 transform transition-transform duration-300 ease-in-out z-10 
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            <div className="sticky top-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                <Link 
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className={`block px-3 py-2 rounded-md ${!category ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Products
                </Link>
                {categories.map((item, index) => (
                  <Link
                    key={index}
                    to={`?category=${item}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block px-3 py-2 rounded-md ${
                      category === item ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category ? `${category} Products` : 'All Products'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  place-items-center ">
              {filteredProducts.map((item) => (
                <Link 
                  key={item.id}
                  to={`/details/${item.id}`}
                  className="bg-white hover:scale-110 transition-all duration-200 flex flex-col items-center p-2 rounded-md shadow-md w-[200px] h-[250px] cursor-pointer"
                >
                  <img 
                    src={item.image}
                    className="object-contain h-[60%] w-[60%]"
                    alt="product"
                  />
                  <h1 className="text-sm h-[25%] overflow-hidden font-medium mt-2">{item.title}</h1>
                  <p className="text-md text-blue-500 font-semibold mt-1">${item.price}</p>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
