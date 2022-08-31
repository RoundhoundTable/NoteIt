import { Link } from "react-router-dom";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../styles/RichTextView.css";
import { useContext } from "react";
import { NoteContext } from "./context";

interface IContentProps {
  isPreview?: boolean;
}

export const Content = (props: IContentProps) => {
  const context = useContext(NoteContext);
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(context!.content))
  );

  return props.isPreview ? (
    <Link to={`/n/${context?.id}`}>
      <div className="flex flex-col px-4 max-h-80 overflow-hidden">
        <h2 className="font-semibold text-xl">{context?.title}</h2>
        <Editor
          editorState={editorState}
          editorClassName="clean-rich-text"
          toolbarHidden
          readOnly={true}
        />
      </div>
    </Link>
  ) : (
    <div className="flex flex-col px-4 lg:max-w-6xl">
      <h2 className="font-semibold text-xl">{context?.title}</h2>
      <Editor
        editorState={editorState}
        editorClassName="clean-rich-text"
        toolbarHidden
        readOnly={true}
      />
    </div>
  );
};
