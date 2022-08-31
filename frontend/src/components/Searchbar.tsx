import { useApolloClient, useLazyQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search, searchData, searchVars } from "../graphql/queries/search";
import { UserNotebook } from "../types/Results";
import { SearchContainer } from "./Search/Container";
import { SearchResult } from "./Search/SearchResult";

export const Searchbar = () => {
  const navigateTo = useNavigate();
  const [Search, { data, loading }] = useLazyQuery<searchData, searchVars>(
    search,
    {
      fetchPolicy: "no-cache",
    }
  );
  const [query, setQuery] = useState("");
  const apolloClient = useApolloClient();

  const inputHandler = (ev: any) => setQuery(ev.target.value);
  const submitHandler = (ev: any) => {
    if (ev.keyCode === 13) {
      setQuery("");
      navigateTo(`/s/${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    apolloClient.cache.reset();
    if (query.trim() !== "") {
      Search({
        variables: {
          query: query,
          limit: 3,
          offset: 0,
        },
      });
    }
  }, [query]);

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
      {query.trim() !== "" && (
        <SearchContainer isBarResult>
          {loading && <p>Loading...</p>}
          {data &&
            data.search.map((result: UserNotebook, key: number) => (
              <SearchResult key={key} data={result} isBarResult />
            ))}
        </SearchContainer>
      )}
    </div>
  );
};
