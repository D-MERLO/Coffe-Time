import { Request, Response } from 'express';
import { createUserService, getUsersByIdService, getUsersService } from '../services/usersService';
import IUserDto from '../dto/IUserDto';
import { User } from '../entities/User';
import ICredentialsDto from '../dto/ICredentialsDto';
import { validateCredentials } from '../services/credentialsService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params; 
        const userById: User = await getUsersByIdService(Number(id));
        res.status(200).json(userById);
    } catch (error: any){
        res.status(404).json({message: error.message})
    }
    
};

// export const registerUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email, birthdate, nDni, username, password }: IUserDto & ICredentialsDto = req.body;
//         await createUserService({ name, email, birthdate, nDni, username, password })
//         res.status(201).json({message: "Usuario registrado"});
//     } catch (error: any){
//         res.status(400).json({message: error.message});
//     }
    
// };
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        console.log('Datos de registro recibidos:', req.body); // Log para depuración
        await createUserService({ name, email, birthdate, nDni, username, password });
        res.status(201).json({ message: "Usuario registrado" });
    } catch (error: any) {
        console.error('Error durante el registro:', error.message); // Log de errores
        res.status(400).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body); // Añade este log
        const { username, password } = req.body;
        const credentialsId = await validateCredentials({ username, password });
        const user: User = await getUsersByIdService(credentialsId);
        res.status(200).json({ login: true, user });
    } catch (error: any) {
        console.error('Login error:', error.message); // Añade este log
        res.status(400).json({ login: false, error: error.message });
    }
};

// export const loginUser = async (req: Request, res: Response) => {
//     try{
//         const {username, password} = req.body;
//         const credentialsId = await validateCredentials({username, password})
//         const user: User = await getUsersByIdService(credentialsId)
//         res.status(200).json({ login: true, user})
//     } catch(error: any) {
//         res.status(400).json({login: false, error: error.message})
//     }
// };



