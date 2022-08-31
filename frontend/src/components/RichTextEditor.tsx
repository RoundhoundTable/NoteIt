import { useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../styles/RichTextEditor.css";

interface IRichTextEditorProps {
  cb: (content: string) => void;
  initialContent?: string;
  error?: {
    message?: string;
  };
}

const RichTextEditor = ({
  cb,
  initialContent,
  error,
}: IRichTextEditorProps) => {
  const [editorState, setEditorState] = useState(
    initialContent
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(initialContent))
        )
      : EditorState.createEmpty()
  );

  const onEditorStateChange = (state: EditorState) => {
    const currentContent = state.getCurrentContent();
    const raw = convertToRaw(currentContent);
    const stringifiedContent = JSON.stringify(raw);

    if (!currentContent.hasText()) cb("");
    else cb(stringifiedContent);
    setEditorState(state);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        toolbar={{
          options: ["inline", "list", "textAlign", "remove"],
        }}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={`${
          error?.message ? "border-2 border-danger-500 rounded-lg" : ""
        }`}
      />
      {error?.message && (
        <div className="text-xs font-light text-danger-500">
          {error.message}
        </div>
      )}
    </>
  );
};

export default RichTextEditor;
