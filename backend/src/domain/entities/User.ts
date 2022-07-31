import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Account } from "./Account";
import { Membership } from "./Membership";
import { Note } from "./Note";
import { Vote } from "./Vote";
import { Comment } from "./Comment";
import { Length } from "class-validator";

const DEFAULT_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/noteit-36706.appspot.com/o/profile-pictures%2Fdefault.jpg?alt=media&token=b4d777a9-a23b-4812-a42b-b665b25ee496";

@Entity("user")
@ObjectType()
export class User {
  @PrimaryColumn({ unique: true })
  @Length(1, 20)
  @Field()
  username: string;

  @Column({ name: "display_name" })
  @Length(1, 20)
  @Field()
  displayName: string;

  @Column({ name: "account_id" })
  @Field(() => String)
  accountId: string;

  @Column({ default: DEFAULT_IMAGE_URL })
  @Field()
  thumbnail: string;

  @CreateDateColumn({ name: "created_on" })
  @Field()
  createdOn: Date;

  @OneToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  @Field(() => Account, { nullable: true })
  account: Account;

  @OneToMany(() => Note, (note) => note.user)
  @Field(() => [Note], { nullable: true })
  notes: Note[];

  @OneToMany(() => Membership, (membership) => membership.notebook)
  @Field(() => [Membership], { nullable: true })
  notebooks: Membership[];

  @OneToMany(() => Vote, (vote) => vote.note)
  @Field(() => [Vote], { nullable: true })
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.note)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
