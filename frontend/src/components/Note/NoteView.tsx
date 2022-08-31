import { UserAvatar } from "../UserAvatar";
import { Votes } from "./Votes";
import { NoteWrapper } from "./NoteWrapper";
import { Content } from "./Content";
import { Header } from "./Header";
import { Metadata } from "./Metadata";
import { useState } from "react";
import { DropdownMenu } from "../DropdownMenu";
import { DropdownNoteOptions } from "../DropdownNote";
import { Note } from "../../interfaces/Entities";
import { NoteContext } from "./context";

export const NoteView = (props: Note) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const toggleDropdown = (event: any) => {
    setShowDropdown(!showDropdown);
    event.stopPropagation();
  };

  return (
    <NoteContext.Provider value={props}>
      <NoteWrapper>
        <div className="flex flex-col items-center mt-8">
          <Votes />
        </div>
        <div className="flex flex-col">
          <Header toggleDropdown={toggleDropdown}>
            <UserAvatar src={props.user.thumbnail} />
            <Metadata />
          </Header>
          {showDropdown && (
            <DropdownMenu togglerFunc={setShowDropdown}>
              <DropdownNoteOptions noteId={props.id} />
            </DropdownMenu>
          )}
          <Content />
        </div>
      </NoteWrapper>
    </NoteContext.Provider>
  );
};
