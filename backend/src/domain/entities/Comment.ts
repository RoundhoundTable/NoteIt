import { Field, ObjectType } from "type-graphql";
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
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @PrimaryColumn()
  username: string;

  @PrimaryColumn({ name: "note_id" })
  noteId: string;

  @Column({ type: "text" })
  @Field()
  content: string;

  @CreateDateColumn({ name: "created_on" })
  @Field()
  createdOn: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "username" })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Note, (note) => note.comments)
  @JoinColumn({ name: "note_id" })
  @Field(() => Note, { nullable: true })
  note: Note;
}
