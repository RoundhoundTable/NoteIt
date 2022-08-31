import { createContext } from "react";
import { Note } from "../../interfaces/Entities";

export const NoteContext = createContext<Note | null>(null);
