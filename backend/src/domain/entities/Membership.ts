import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ERoles } from "../../enumerators/ERoles";
import { Notebook } from "./Notebook";
import { User } from "./User";

@Entity("membership")
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
  role: ERoles;

  @ManyToOne(() => User, (user) => user.notebooks)
  @JoinColumn({ name: "username" })
  user: Promise<User>;

  @ManyToOne(() => Notebook, (notebook) => notebook.members)
  @JoinColumn({ name: "notebook" })
  notebook: Promise<Notebook>;
}
