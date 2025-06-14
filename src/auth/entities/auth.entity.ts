import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

   @Column({ type: 'varchar', length: 50, default: 'user' })
    role: string;
}
