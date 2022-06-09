import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Account } from "./Account";
import { Membership } from "./Membership";
import { Note } from "./Note";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@Entity("user")
export class User {
  @PrimaryColumn()
  username: string;

  @Column({ name: "display_name" })
  displayName: string;

  @Column({ default: "default_user.jpg" })
  thumbnail: string;

  @OneToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account: Account;

  @OneToMany(() => Note, (note) => note.user, { onDelete: "SET NULL" })
  notes: Promise<Note[]>;

  @OneToMany(() => Membership, (membership) => membership.notebook, {
    onDelete: "CASCADE",
  })
  notebooks: Promise<Membership[]>;

  @OneToMany(() => Vote, (vote) => vote.note, { onDelete: "CASCADE" })
  votes: Promise<Vote[]>;

  @OneToMany(() => Comment, (comment) => comment.note, { onDelete: "SET NULL" })
  comments: Promise<Comment[]>;
}
