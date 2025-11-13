import { useState, useEffect } from "react";
import SectionContainer from "../components/SectionContainer";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [electronics, setElectronics] = useState([]);
  const [jewelery, setJewelery] = useState([]);
  const [mensClothing, setMensClothing] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
useEffect(() => {
  setLoading(true);

  Promise.all([
    fetch(`${API_URL}/products/category/electronics`).then(res => res.json()),
    fetch(`${API_URL}/products/category/jewelery`).then(res => res.json()),
    fetch(`${API_URL}/products/category/men's clothing`).then(res => res.json()),
    fetch(`${API_URL}/products`).then(res => res.json()),
  ])
  .then(([electronicsData, jeweleryData, mensClothingData, allProductsData]) => {
    setElectronics(electronicsData);
    setJewelery(jeweleryData);
    setMensClothing(mensClothingData);
    setAllProducts(allProductsData);
  })
  .finally(() => setLoading(false));
}, []);


let queridinhos = [];
if (allProducts && allProducts.length > 0) {
  queridinhos = allProducts.filter(
    (product) => product.rating && product.rating.rate >= 4
  );
}

if (loading) {
  return <p className="text-center">Carregando produtos...</p>;
}

  return (
    
    <div>
      <SectionContainer title="Eletrônicos">
        {electronics.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Joias">
        {jewelery.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Roupas Masculinas">
        {mensClothing.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Queridinhos dos Clientes">
        {queridinhos.length > 0 ? (
          queridinhos
            .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0) || (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
            .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="text-center col-span-4">Nenhum produto disponível</p>
        )
        }
      </SectionContainer>

        <SectionContainer title="Baratinhos Imperdíveis">
        {allProducts
          .filter((product) => product.price >= 0 && product.price <= 50)
          .sort((a, b) => a.price - b.price)
          .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </SectionContainer>
      
      <SectionContainer title="Jaquetas e Casacos">
        {allProducts
          .filter((product) => product.title.toLowerCase().includes("jacket") || product.title.toLowerCase().includes("coat"))
          .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </SectionContainer>
    </div>
  );
}
