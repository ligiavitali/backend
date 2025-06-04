import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('oficinas')
export class OficinasEntity {
   @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 150 })
    titulo: string;
  
    @Column('text')
    descricao: string;
  
    @Column('date')
    data_evento: string;
  
    @Column({ length: 150 })
    local: string;
  
    @Column('text', { nullable: true })
    imagem_url: string;
}
