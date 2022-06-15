import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Membership } from "./Membership";
import { Note } from "./Note";

@Entity("notebook")
export class Notebook {
  @PrimaryColumn()
  name: string;

  @Column({ default: "default_notebook.jpg" })
  thumbnail: string;

  @CreateDateColumn({ name: "created_on" })
  createdOn: Date;

  @OneToMany(() => Note, (note) => note.notebook)
  notes: Promise<Note[]>;

  @OneToMany(() => Membership, (membership) => membership.user)
  members: Promise<Membership[]>;
}
