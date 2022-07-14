import React from "react";

export const SearchResultContainer = (props: React.PropsWithChildren<any>) => {
    return (
        <div className="flex flex-col justify-center items-center my-3 mb-16 p-8 md:p-0">
            <div className="p-4 max-w-xl shadow-xl  shadow-primary-500/30 flex flex-col pt-5 mt-5 max-h-max px-3">
                {props.children}
            </div>
        </div>
    );
};