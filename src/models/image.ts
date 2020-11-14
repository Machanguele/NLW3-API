import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Orphanage from './orphanage';
//Decorator @ associa a classe a tabela na base de dados

@Entity('images')
export default class {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @Column()
    orphanageId: number;

   /* @ManyToOne(()=>Orphanage, orphanage=>orphanage.images)
    @JoinColumn({name: 'orphanageId'})
    orphanage: Orphanage*/
/*
    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanageId'})*/
    // orphanage: Orphanage;

}