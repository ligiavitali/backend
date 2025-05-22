import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  nome: string;
}

