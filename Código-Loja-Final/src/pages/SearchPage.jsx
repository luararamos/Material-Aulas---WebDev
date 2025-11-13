import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { search } = useParams();
    return (
        <div>
            <h1 className="text-2xl font-bold">Resultados da Pesquisa para: {search}</h1>
        </div>
    );
};

export default SearchPage;
