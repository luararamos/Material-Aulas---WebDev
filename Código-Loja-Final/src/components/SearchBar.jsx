import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({products}) => {
    
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [suggestions, setSuggestions] = useState([]);

    function handleSearch(e) {

        const value = e.target.value;
        setSearch(value);

        if (!value) {
            setSuggestions([]);
            return;
            }

            // filtra produtos que contenham o termo digitado
            const filtered = products.filter((p) =>
            p.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
    }

    function handleKeyDown(e) {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
      setSuggestions([]);
      setSearch('');
    }
  }

    return (
         <div className="relative w-64">
         <input
            type="text"
            id="search"
            placeholder="Pesquisar produtos..."
            value={search}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            // onFocus={() => navigate("search")}
            // onBlur={() => navigate("/")}
            className="pl-10 pr-3 py-1 w-64 bg-transparent border-b-2 border-black focus:border-black outline-none transition-colors duration-300"
          />

      {/* Renderização condicional das sugestões */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border shadow mt-1 z-10 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate(`/product/${item.id}`);
                setSuggestions([]);  
                setSearch('');
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
        
        </div>
          
    )
}

export default SearchBar;