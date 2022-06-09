import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn()
  username: string;

  @PrimaryColumn({ name: "note_id" })
  noteId: string;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn({ name: "created_on" })
  createdOn: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "username" })
  user: Promise<User>;

  @ManyToOne(() => Note, (note) => note.comments)
  @JoinColumn({ name: "note_id" })
  note: Promise<Note>;
}
