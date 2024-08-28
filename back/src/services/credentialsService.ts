import { CredentialModel } from "../config/data-source";
import ICredentialsDto from "../dto/ICredentialsDto";
import { Credential } from "../entities/Credential";

//función que reciba username y password y cree un nuevo par de credenciales con estos datos.
//retornar id del par de credenciales creadas.
export const createCredencialsService = async (credentials: { username: string; password: string }): Promise<Credential> => {
    const newCredential = CredentialModel.create(credentials);
    await CredentialModel.save(newCredential);
    return newCredential;
};

export const validateCredentials = async (params: ICredentialsDto): Promise<number> => {
    const { username, password } = params;
    console.log('Validating credentials for:', username); // Añade este log
    const foundCredential = await CredentialModel.findOne({ where: { username, password } });
    if (foundCredential) {
        return foundCredential.id;
    } else {
        throw Error("Credenciales incorrectas");
    }
};