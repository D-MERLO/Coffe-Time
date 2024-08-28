import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_TYPE,
    synchronize: true, //limpia la base de datos en cada actualizacion
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User)
export const AppointmentModel = AppDataSource.getRepository(Appointment)
export const CredentialModel = AppDataSource.getRepository(Credential)