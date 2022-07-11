import { PartialNote } from "../components/PartialNote";

export const Feed = () => {
    return (
      <div className="flex flex-col justify-center items-center mt-4 mb-16 p-8 md:p-0">
        <PartialNote />
        <PartialNote />
        <PartialNote />
      </div>
    );
  };