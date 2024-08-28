// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
// import { User } from "./User"

// @Entity({
//     name: "Appointments"
// })
// export class Appointment {
//     @PrimaryGeneratedColumn()
//     id: number
  
//     @Column()
//     date: string;

//     @Column()
//     time: string

//     @Column({ default: 1 })
//     numberOfPeople: number;

//     @Column({ default : "active" })
//     status: string

//     @ManyToOne(()=> User, (user)=>user.appointments)
//     user: User
// }  

//     // @Column({ type: 'date', nullable: false })
//     // date: string

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "Appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string; // YYYY-MM-DD

    @Column()
    time: string; // HH:mm

    @Column({ default: 1 })
    numberOfPeople: number;

    @Column({ default: "active" })
    status: string;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;
}