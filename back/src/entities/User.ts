import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";

@Entity({
    name: "Users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column()
    email: string;

    @Column()
    birthdate: string;

    @Column()
    nDni: string;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];

    @OneToOne(() => Credential)
    @JoinColumn()
    credentials: Credential;
}
