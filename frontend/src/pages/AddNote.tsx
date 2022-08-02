import RichTextEditor from "../components/RichTextEditor";
import { TopNavbar } from "../components/TopNavbar";

export const AddNote = () => {
  return (
    <div className="font-montserrat flex flex-col justify-center items-center">
      <TopNavbar />
      <div className="shadow-xl shadow-primary-500/30 p-5 mt-20 border-2 max-w-7xl">
        <input
          className="placeholder:italic placeholder:text-primary-500/40 pl-2 h-8  bg-primary-500/25 rounded-md"
          placeholder="Select a Notebook"
        />
        <input
          className="placeholder:italic placeholder:text-primary-500/40 pl-2 mt-3 mb-3 h-8 flex flex-col bg-primary-500/25 rounded-md"
          placeholder="Note a Title..."
        />
        <div className="align-middle">
          <RichTextEditor />
        </div>
        <div className="flex flex-row-reverse">
          <button className="mt-5 bg-primary-400 rounded font-semibold text-sm text-white w-40 h-8">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
