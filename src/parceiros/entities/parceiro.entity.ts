import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('parceiros')
export class ParceiroEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    nome: string;
  
    @Column('text')
    site_url: string;
  
    @Column('text', { nullable: true })
    imagem_url?: string;
}
