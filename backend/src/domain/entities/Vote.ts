import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@Entity("vote")
export class Vote {
  @PrimaryColumn()
  username: string;

  @PrimaryColumn({ name: "note_id" })
  noteId: string;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.votes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "username" })
  user: Promise<User>;

  @ManyToOne(() => Note, (note) => note.votes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note: Promise<Note>;
}
