"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.getUsersByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const credentialsService_1 = require("./credentialsService");
// {
//     
//     name: "Delfina",
//     email: "delfi@gmail.com",
//     birthdate: "4/6/2003",
//     nDni: "40400400",
//    
//   },
//Implementar una función que pueda retornar el arreglo completo de usuarios.
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield data_source_1.UserModel.find();
    return allUsers;
});
exports.getUsersService = getUsersService;
//Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
const getUsersByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield data_source_1.UserModel.findOne({ where: { id }, relations: { appointments: true } });
    if (!foundUser)
        throw Error("No se encontró ningun usuario con ese ID en la DB");
    return foundUser;
});
exports.getUsersByIdService = getUsersByIdService;
//Implementar una función que pueda crear un nuevo usuario dentro del arreglo.
//Debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales.
//Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
const createUserService = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await UserModel.create(userData)
    // const result = await UserModel.save(user);
    // return user;
    // }
    const newCredential = yield (0, credentialsService_1.createCredencialsService)({
        username: createUserDto.username,
        password: createUserDto.password,
    });
    const userCreated = yield data_source_1.UserModel.create(createUserDto);
    userCreated.credentialsId = newCredential;
    data_source_1.UserModel.save(userCreated);
});
exports.createUserService = createUserService;
