import { useEffect, useState } from "react";

export default function Times() {
  const [poke, setPoke] = useState({});
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPoke(data)})
      .catch((erro) => console.error("Erro ao buscar times: ", erro));
  }, []);

  return (
    <div className="p-6 flex-1 bg-gray-100">
    <h1 className="text-2xl font-bold">{
        poke.name
}</h1>
<img src = {poke.sprites.front_default}/>
      <p className="mt-2 text-gray-600">Página de times.</p>
    </div>
  );
}
