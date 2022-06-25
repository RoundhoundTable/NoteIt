import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Notebook } from "./Notebook";
import { User } from "./User";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@Entity("note")
@ObjectType()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ select: false })
  username: string;

  @Column({ name: "notebook_name", select: false })
  notebookName: string;

  @Column({ type: "text" })
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => String)
  title: string;

  @CreateDateColumn({ name: "created_on" })
  @Field()
  createdOn: Date;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "username" })
  @Field(() => User, { nullable: true })
  user?: User;

  @ManyToOne(() => Notebook, (notebook) => notebook.notes)
  @JoinColumn({ name: "notebook_name" })
  @Field(() => Notebook, { nullable: true })
  notebook?: Notebook;

  @OneToMany(() => Vote, (vote) => vote.user)
  @Field(() => [Vote], { nullable: true })
  votes?: Vote[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => Boolean)
  likedByUser?: boolean;

  @Field(() => Number)
  score?: number;
}
