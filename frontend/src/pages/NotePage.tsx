import { FullNote } from "../components/FullNote";
import { CommentList } from "../components/CommentContainer";

export const NotePage = () => (
    <div className="flex flex-col items-center">
        <FullNote />
        <CommentList />
    </div>
)