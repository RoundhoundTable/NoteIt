import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notebook } from "./Notebook";
import { User } from "./User";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column({ name: "notebook_name" })
  notebookName: string;

  @Column()
  content: string;

  @Column()
  title: string;

  @CreateDateColumn({ name: "created_on" })
  createdOn: Date;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "username" })
  user: Promise<User>;

  @ManyToOne(() => Notebook, (notebook) => notebook.notes)
  @JoinColumn({ name: "notebook_name" })
  notebook: Promise<Notebook>;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Promise<Vote[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Promise<Comment[]>;
}
