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

const DEFAULT_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/noteit-36706.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=b4d777a9-a23b-4812-a42b-b665b25ee496";

@Entity("user")
export class User {
  @PrimaryColumn()
  username: string;

  @Column({ name: "display_name" })
  displayName: string;

  @Column({ name: "account_id" })
  accountId: string;

  @Column({ default: DEFAULT_IMAGE_URL })
  thumbnail: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account: Promise<Account>;

  @OneToMany(() => Note, (note) => note.user)
  notes: Promise<Note[]>;

  @OneToMany(() => Membership, (membership) => membership.notebook, {
    onDelete: "CASCADE",
  })
  notebooks: Promise<Membership[]>;

  @OneToMany(() => Vote, (vote) => vote.note)
  votes: Promise<Vote[]>;

  @OneToMany(() => Comment, (comment) => comment.note)
  comments: Promise<Comment[]>;
}
