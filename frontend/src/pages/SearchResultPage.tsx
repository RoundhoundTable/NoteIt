import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchContainer } from "../components/Search/Container";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useWindowSize } from "../hooks/useWindowSize";
import { Searchbar } from "../components/Searchbar";
import { search, searchData, searchVars } from "../graphql/queries/search";
import { UserNotebook } from "../types/Results";
import { SearchResult } from "../components/Search/SearchResult";

export const SearchResultPage = () => {
  const { width } = useWindowSize();
  const [mobileView, setMobileView] = useState<boolean>(width < 768);

  useEffect(() => {
    setMobileView(width < 768);
  }, [width]);

  const { query } = useParams<string>();
  const { data, fetchMore, loading } = useQuery<searchData, searchVars>(
    search,
    {
      variables: {
        query: query!,
        offset: 0,
        limit: 6,
      },
    }
  );

  return (
    <>
      <div className="flex flex-row align-middle justify-center mt-5">
        {mobileView && <Searchbar />}
      </div>
      <SearchContainer>
        <InfiniteScroll
          dataLength={data?.search.length || 0}
          next={() =>
            fetchMore({
              variables: {
                query: query,
                pagination: {
                  take: 6,
                  skip: data?.search.length,
                },
              },
            })
          }
          hasMore={Boolean(loading && data)}
          loader={<h4>Loading...</h4>}
        >
          {!data || data.search.length < 0 ? (
            <h1>No se han encontrado resultados para su busqueda</h1>
          ) : (
            data.search.map((result: UserNotebook, key: number) => {
              return <SearchResult key={key} data={result} />;
            })
          )}
        </InfiniteScroll>
      </SearchContainer>
    </>
  );
};
