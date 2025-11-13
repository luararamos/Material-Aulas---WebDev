import { useState, useEffect } from "react";

const CategoryTabs = () => {
  const BASE_URL = "https://fakestoreapi.com/products";
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar categorias uma única vez
  useEffect(() => {
    fetch(`${BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setSelectedCategory(data[0]); // Seleciona a primeira categoria automaticamente
      });
  }, []);

  // Toda vez que selectedCategory mudar, busca os produtos
  useEffect(() => {
    if (!selectedCategory) return; // Evita erro inicial enquanto não carregamos a categoria
    setLoading(true);

    fetch(`${BASE_URL}/category/${selectedCategory}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erro ao buscar produtos:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Navegação por Categorias</h2>

      {/* Abas de categorias */}
      <div className="flex gap-4 justify-center mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 border rounded ${
              selectedCategory === cat ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      {loading ? (
        <p className="text-center text-gray-500">Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(prod => (
            <div
              key={prod.id}
              className="border rounded-lg p-3 shadow hover:shadow-md transition"
            >
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{prod.title}</h3>
              <p className="text-lg font-bold mt-1">${prod.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
