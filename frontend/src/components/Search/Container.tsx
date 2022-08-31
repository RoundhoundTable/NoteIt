import { PropsWithChildren } from "react";

interface IContainerProps {
  isBarResult?: boolean;
}

export const SearchContainer = ({
  children,
  isBarResult,
}: PropsWithChildren<IContainerProps>) => {
  return isBarResult ? (
    <div className="relative">
      <div className="p-2 ml-2 z-10 absolute bg-white w-11/12 mt-3 rounded shadow-xl shadow-primary-500/20">
        {children}
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center p-8 md:p-0">
      <div className="p-4 max-w-xl shadow-xl shadow-primary-500/30 flex flex-col pt-5 max-h-max">
        {children}
      </div>
    </div>
  );
};
