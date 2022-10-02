import InfiniteScrollComponent from "react-infinite-scroll-component";
import { Note } from "../interfaces/Entities";
import { NotePreview } from "./Note/NotePreview";

interface INoteInfiniteScroll {
  notes: Note[];
  hasMore: boolean;
  fetchMore: () => Promise<void>;
}

export const NoteInfiniteScroll = ({
  notes,
  hasMore,
  fetchMore,
}: INoteInfiniteScroll) => (
  <InfiniteScrollComponent
    dataLength={notes.length}
    loader={<h4>Loading...</h4>}
    hasMore={hasMore}
    next={fetchMore}
    className="p-2"
  >
    {notes.map((note: Note, key: number) => (
      <NotePreview {...note} key={key} />
    ))}
  </InfiniteScrollComponent>
);
