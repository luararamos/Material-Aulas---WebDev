import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
const SearchResults = () => {

    const [products, setProducts] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const {termoBusca} = useParams()


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

       const produtosFiltrados = products.filter(pegaItem => pegaItem.title.toLowerCase().includes(termoBusca.toLowerCase()))



    return (
        <div>
            <h1 className="text-2xl font-bold">Resultados da Pesquisa para: {termoBusca}</h1>
            {
                produtosFiltrados.map(pegaItem =>(
                    <ProductCard { ... pegaItem}/>
                ))
            }
        </div>
    );
};

export default SearchResults;