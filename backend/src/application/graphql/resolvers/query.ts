import { CommentsQueryHandler } from "../../handlers/query/CommentsQueryHandler";
import { CurrentUserQueryHandler } from "../../handlers/query/CurrentUserQueryHandler";
import { NotebookQueryHandler } from "../../handlers/query/NotebookQueryHandler";
import { NoteQueryHandler } from "../../handlers/query/NoteQueryHandler";
import { NotesQueryHandler } from "../../handlers/query/NotesQueryHandler";
import { SearchQueryHandler } from "../../handlers/query/SearchQueryHandler";
import { UserQueryHandler } from "../../handlers/query/UserQueryHandler";
import { FeedQueryHanlder } from "../../handlers/query/FeedQueryHandler";
import { MembersQueryHanlder } from "../../handlers/query/MembersQueryHandler";
import { JoinedQueryHandler } from "../../handlers/query/JoinedQueryHandler";

const Query = {
  note: NoteQueryHandler,
  notes: NotesQueryHandler,
  user: UserQueryHandler,
  notebook: NotebookQueryHandler,
  comments: CommentsQueryHandler,
  _user: CurrentUserQueryHandler,
  search: SearchQueryHandler,
  feed: FeedQueryHanlder,
  members: MembersQueryHanlder,
  joined: JoinedQueryHandler,
};

export default Query;
