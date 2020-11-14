import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './image';
//Decorator @ associa a classe a tabela na base de dados

@Entity('orphanages')
export default class {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    openingHours: string;

    @Column()
    openOnWeekends: boolean;

  /*  @OneToMany(()=>Image, image=>image.orphanage, {
        cascade: ["insert", "update"]
    })*/
    /*@OneToMany(() => Image, image => image.orphanage)
    @JoinColumn({ name: 'orphanageId'})*/
    // images: Image[];

}