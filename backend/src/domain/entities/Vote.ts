import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@Entity("vote")
@ObjectType()
export class Vote {
  @PrimaryColumn()
  @Field()
  username: string;

  @PrimaryColumn({ name: "note_id" })
  @Field()
  noteId: string;

  @Column()
  @Field()
  value: number;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: "username" })
  @Field(() => User, { nullable: true })
  user: Promise<User>;

  @ManyToOne(() => Note, (note) => note.votes)
  @JoinColumn({ name: "note_id" })
  @Field(() => Note, { nullable: true })
  note: Promise<Note>;
}
