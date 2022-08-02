import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SearchbarResult } from "./SearchbarResult";
import { SearchbarResultsContainer } from "./SearchbarResultsContainer";

export const Searchbar = () => {
  const navigateTo = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const inputHandler = (ev: any) => setQuery(ev.target.value);
  const submitHandler = (ev: any) => {
    if (ev.keyCode === 13) {
      setQuery("");
      navigateTo(`/search/${query}`);
    }
  };

  const UserResult = {
    "__typename": "User",
    "username": "gglassborow0",
    "displayName": "gdozdill0",
    "thumbnail": "http://dummyimage.com/600x600.png/5fa2dd/ffffff"
   }
const NotebookResult =   {
    "__typename": "Notebook",
    "name": "nunc",
    "thumbnail": "http://dummyimage.com/600x600.png/ff4444/ffffff",
    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "memberCount": 431,
    "joinedByUser": true,
  }

const NotebookResult2 =   {
    "__typename": "Notebook",
    "name": "zzzz",
    "thumbnail": "http://dummyimage.com/600x600.png/ff4444/ffffff",
    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "memberCount": 431,
    "joinedByUser": true,
  }

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
      <SearchbarResult {...UserResult} />
      <SearchbarResult {...NotebookResult} />
      <SearchbarResult {...NotebookResult2} />
        {query !== "" ? (
          results.length > 0 ? (
            results.map((result, key) => {
              return <SearchbarResult key={key} {...result} />;
            })
          ) : (
            <li>No se han encontrado resultados</li>
          )
        ) : null}
      </SearchbarResultsContainer>
    </div>
  );
};
