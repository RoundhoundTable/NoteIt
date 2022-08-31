import { Icon } from "@iconify/react";
import { UserAvatar } from "../UserAvatar";
import { Votes } from "./Votes";
import { NoteWrapper } from "./NoteWrapper";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Metadata } from "./Metadata";
import { DropdownMenu } from "../DropdownMenu";
import { DropdownNoteOptions } from "../DropdownNote";
import { useEffect, useState } from "react";
import { Note } from "../../interfaces/Entities";
import { NoteContext } from "./context";

export const NotePreview = (props: Note) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const toggleDropdown = (event: any) => {
    setShowDropdown(!showDropdown);
    event.stopPropagation();
  };

  return (
    <NoteContext.Provider value={props}>
      <NoteWrapper isPreview>
        <Header toggleDropdown={toggleDropdown}>
          <UserAvatar src={props.user.thumbnail} />
          <Metadata />
        </Header>
        {showDropdown && (
          <DropdownMenu togglerFunc={setShowDropdown}>
            <DropdownNoteOptions noteId={props.id} />
          </DropdownMenu>
        )}
        <Content isPreview />
        <Footer>
          <Votes isPreview />
          <Icon className="w-6 h-6 text-primary-500" icon="bxs:comment" />
        </Footer>
      </NoteWrapper>
    </NoteContext.Provider>
  );
};
