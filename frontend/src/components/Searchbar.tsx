import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetMockSearchResults } from "../services/GetMockSearchResults";
import { SearchbarResult } from "./SearchbarResult";
import { SearchbarResultsContainer } from "./SearchbarResultsContainer";

export const Searchbar = () => {
  const navigateTo = useNavigate()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  const inputHandler = (ev: any) => setQuery(ev.target.value)
  const submitHandler = (ev: any) => {
    if(ev.keyCode === 13) {
      setQuery("");
      navigateTo(`/search/${query}`)
    }
  }

  useEffect(() => {
    const search = async () => {
      const searchResults = await GetMockSearchResults(query);
      setResults(searchResults);
    }

    if (query === "") setResults([])
    else search();
  }, [query])

  return (
    <div className="py-1">
      <div>
        <input
          type="text"
          onChange={inputHandler}
          onKeyDown={submitHandler}
          placeholder="Buscar..."
          className="h-8 bg-primary-500/25 rounded-l-full px-4 inline-block align-middle"
          value={query}
          />
        <div className="w-8 h-8 inline-block align-middle bg-primary-500/25 rounded-r-full">
          <Icon className="w-7 h-7 text-primary-900" icon="ci:search" />
        </div>
      </div>
      <SearchbarResultsContainer>
            {
              query !== "" ?
              results.length > 0 ? results.map((result, key) => {
                return <SearchbarResult key={key} {...result}/>
              }) : <li>No se han encontrado resultados</li> : null
            }
      </SearchbarResultsContainer>
    </div>
  );
};