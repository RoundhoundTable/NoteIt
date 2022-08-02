import { Comment } from "../components/Comment";
import { CommentForm } from "./CommentForm";

export const CommentList = () => (
    <div className="flex flex-col items-center w-2/3">
        <article className="px-6 max-h-5xl shadow-xl shadow-primary-500/30 flex flex-col pt-5 mt-5 w-4/5 gap-4">
            <CommentForm />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </article>
    </div>
)