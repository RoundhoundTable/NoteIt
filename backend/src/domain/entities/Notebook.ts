import { ObjectType, Field } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Membership } from "./Membership";
import { Note } from "./Note";

@Entity("notebook")
@ObjectType()
export class Notebook {
  @PrimaryColumn({ unique: true })
  @Field()
  name: string;

  @Column({ default: "default_notebook.jpg" })
  @Field()
  thumbnail: string;

  @CreateDateColumn({ name: "created_on" })
  @Field()
  createdOn: Date;

  @OneToMany(() => Note, (note) => note.notebook)
  @Field((type) => [Note], { nullable: true })
  notes: Note[];

  @OneToMany(() => Membership, (membership) => membership.user)
  @Field((type) => [Membership, { nullable: true }])
  members: Membership[];

  @Field({ defaultValue: false })
  joinedByUser: boolean;

  @Field({ defaultValue: 0 })
  memberCount: number;
}
