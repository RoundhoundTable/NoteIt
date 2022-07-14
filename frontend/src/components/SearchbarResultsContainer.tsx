import React from "react";

export const SearchbarResultsContainer = (props: React.PropsWithChildren<any>) => {
    return (
      <div className="relative">
        <ul className="ml-2 z-10 absolute bg-white w-11/12 mt-3 rounded shadow-xl shadow-primary-500/20">
            {props.children}
        </ul>
      </div>
    );
}