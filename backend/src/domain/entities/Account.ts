import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("account")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
