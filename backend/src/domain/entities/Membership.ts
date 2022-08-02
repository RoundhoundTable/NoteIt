import { ObjectType, Field } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ERoles } from "../enumerators/ERoles";
import { Notebook } from "./Notebook";
import { User } from "./User";

@Entity("membership")
@ObjectType()
export class Membership {
  @PrimaryColumn()
  username: string;

  @PrimaryColumn({ name: "notebook" })
  notebookName: string;

  @Column({
    type: "enum",
    enum: ERoles,
    default: ERoles.USER,
  })
  @Field(() => ERoles)
  role: ERoles;

  @ManyToOne(() => User, (user) => user.notebooks)
  @JoinColumn({ name: "username" })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Notebook, (notebook) => notebook.members)
  @JoinColumn({ name: "notebook" })
  @Field(() => Notebook)
  notebook: Notebook;
}
