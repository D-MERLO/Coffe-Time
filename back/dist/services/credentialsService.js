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
exports.validateCredentials = exports.createCredencialsService = void 0;
const data_source_1 = require("../config/data-source");
const credentials = [];
let credentialId = 1;
//función que reciba username y password y cree un nuevo par de credenciales con estos datos.
//retornar id del par de credenciales creadas.
const createCredencialsService = (credentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = yield data_source_1.CredentialModel.create(credentialDto);
    data_source_1.AppDataSource.manager.save(newCredential);
    return newCredential;
});
exports.createCredencialsService = createCredencialsService;
const validateCredentials = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = params;
    const foundCredentials = credentials.find((credential) => credential.username === username && credential.password === password);
    if (foundCredentials && foundCredentials.username === username && foundCredentials.password === password) {
        return foundCredentials.id;
    }
    else {
        throw Error("Credenciales incorrectas");
    }
});
exports.validateCredentials = validateCredentials;
