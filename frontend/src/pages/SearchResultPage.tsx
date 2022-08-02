import { SearchResultContainer } from "../components/SearchResultContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetMockSearchResults, INotebookResult, IUserResult } from "../services/GetMockSearchResults";
import { SearchResult } from "../components/SearchResult";

export const SearchResultPage = () => {
    const { query } = useParams<string>()
    const [results, setResults] = useState<any[]>([])

    useEffect(() => {
        const search = async () => {
            const queryResult = await GetMockSearchResults(query);
            setResults(queryResult);
        }
        search();
    }, [query])

    return (
            <SearchResultContainer>
                {
                    results.length > 0 ? results.map((result: IUserResult | INotebookResult, key: number) => {
                        return <SearchResult key={key} {...result} />
                    }) : <h1>No se han encontrado resultados para su busqueda</h1>
                }
            </SearchResultContainer>
    );
};