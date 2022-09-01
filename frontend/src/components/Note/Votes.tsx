import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "./context";
import { vote } from "../../graphql/mutations/vote";
import { useAuth } from "../../context/AuthProvider";
import { Note } from "../../interfaces/Entities";

interface IVotesProps {
  isPreview?: boolean;
}

enum VOTE_VALUE {
  NONE = 0,
  DOWNVOTE = -1,
  UPVOTE = 1,
}

export const Votes = (props: IVotesProps) => {
  const noteContext = useContext(NoteContext) as Note;
  const { currentUser } = useAuth();
  const [Vote, { data }] = useMutation(vote);
  const [currentVote, setCurrentVote] = useState<VOTE_VALUE>(
    noteContext.userVote
  );
  const [score, setScore] = useState<number>(noteContext!.score);
  const navigateTo = useNavigate();

  const makeVote = async (value: VOTE_VALUE) => {
    if (!currentUser) navigateTo("/account/login");

    setCurrentVote(value);
    Vote({
      variables: {
        noteId: noteContext!.id,
        value,
      },
    });
  };

  useEffect(() => {
    if (data) setScore(data.vote);
  }, [data]);

  return (
    <div
      className={`flex ${
        props.isPreview ? "flex-row" : "flex-col"
      } items-center`}
    >
      <Icon
        className="w-6 h-6 text-primary-500"
        icon={currentVote !== VOTE_VALUE.UPVOTE ? "bx:like" : "bxs:like"}
        onClick={() =>
          makeVote(
            currentVote === VOTE_VALUE.UPVOTE
              ? VOTE_VALUE.NONE
              : VOTE_VALUE.UPVOTE
          )
        }
      />
      <p className="text-sm text-primary-500 font-medium mx-2">{score}</p>
      <Icon
        className="w-6 h-6 text-primary-500"
        icon={
          currentVote !== VOTE_VALUE.DOWNVOTE ? "bx:dislike" : "bxs:dislike"
        }
        onClick={() =>
          makeVote(
            currentVote === VOTE_VALUE.DOWNVOTE
              ? VOTE_VALUE.NONE
              : VOTE_VALUE.DOWNVOTE
          )
        }
      />
    </div>
  );
};
