import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";


export default function Navbar() {

    const [allProducts, setAllProducts] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

     useEffect(() => {
    
        fetch(`${API_URL}/products`)
          .then((res) => res.json())
          .then((data) => setAllProducts(data));
      }, []);

  return (
    <nav className="bg-yellow-400 text-black px-6 py-4 flex justify-between items-center">
      <Link to="/" className="hover:underline"><h1 className="font-bold text-xl">FiapStore</h1></Link>
      <div className="flex gap-4 items-center">
        <div className="relative ml-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          <SearchBar products={allProducts} />
        </div>
        <Link to="/categories" className="hover:underline">Categorias</Link>
        <Link to="/profile" className="hover:underline">Perfil</Link>
        <Link to="/cart" className="hover:underline">Carrinho</Link>
      </div>
    </nav>
  );
}
