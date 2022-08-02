import * as React from "react";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../styles/RichText.css";
import placeholder from "../assets/images/placeholder.jpg";
import { Icon } from "@iconify/react";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (state: any) => {
    setEditorState(state);
  };

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        options: ["inline", "list", "textAlign", "remove"],
        inline: {
          //  bold: { icon: <Icon icon="carbon:text-bold" /> },
        },
      }}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default RichTextEditor;
