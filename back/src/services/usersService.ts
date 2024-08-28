import { UserModel } from "../config/data-source";
import ICredentialsDto from "../dto/ICredentialsDto";
import IUserDto from "../dto/IUserDto";
import { User } from "../entities/User";
import {createCredencialsService} from "./credentialsService"

//Implementar una función que pueda retornar el arreglo completo de usuarios.
export const getUsersService = async () =>{
    const allUsers: User[] = await UserModel.find();
    return allUsers;
}

//Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
export const getUsersByIdService = async (id: number): Promise<User> => {
    const foundUser: User|null = await UserModel.findOne(
        { where:{id}, relations:{appointments:true} });
    if (!foundUser) throw Error("No se encontró ningun usuario con ese ID en la DB");
    return foundUser;
}

//Implementar una función que pueda crear un nuevo usuario dentro del arreglo.
//Debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales.
//Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
export const createUserService = async (createUserDto: IUserDto & ICredentialsDto): Promise<void> => {
    console.log("Creating credentials for:", createUserDto.username);
    const newCredential = await createCredencialsService({
        username: createUserDto.username,
        password: createUserDto.password,
    });

    console.log("Creating user with credentials ID:", newCredential.id);
    const userCreated = UserModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        birthdate: createUserDto.birthdate,
        nDni: createUserDto.nDni,
        credentials: newCredential 
    });

    await UserModel.save(userCreated);
    console.log("User created with ID:", userCreated.id);
};

