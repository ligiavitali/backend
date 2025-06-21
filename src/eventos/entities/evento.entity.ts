import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('eventos')
export class EventoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column('text')
  descricao: string;

  @Column('date')
  data_evento: Date;

  @Column({ length: 150 })
  local: string;

  @Column('text', { nullable: true })
  imagem_url: string;
}

