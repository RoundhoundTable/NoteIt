import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { NoteContext } from "./context";

export const Metadata = () => {
  const context = useContext(NoteContext);

  return (
    <div className="ml-2">
      <p className="text-primary-800 text-base font-medium">
        <Link to={`/u/${context?.user.username}`}>
          {context?.user.displayName}
        </Link>
      </p>
      <p className="text-primary-400 text-xs font-extralight">
        <Link to={`/nb/${context?.notebook.name}`}>
          nb/{context?.notebook.name} - {formatDate(context!.createdOn)}
        </Link>
      </p>
    </div>
  );
};
