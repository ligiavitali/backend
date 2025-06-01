import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('oficinas')
export class OficinasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column('text')
  conteudo: string;

  @Column('text', { nullable: true })
  imagem_url: string;
}
