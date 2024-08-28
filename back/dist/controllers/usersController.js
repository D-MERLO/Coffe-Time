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
exports.loginUser = exports.registerUser = exports.getUserById = exports.getUsers = void 0;
const usersService_1 = require("../services/usersService");
const credentialsService_1 = require("../services/credentialsService");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userById = yield (0, usersService_1.getUsersByIdService)(Number(id));
        res.status(200).json(userById);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        yield (0, usersService_1.createUserService)({ name, email, birthdate, nDni, username, password });
        res.status(201).json({ message: "Usuario registrado" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const credential = yield (0, credentialsService_1.validateCredentials)({ username, password });
        const user = yield (0, usersService_1.getUsersByIdService)(credential);
        res.status(200).json({
            login: true,
            user
        });
    }
    catch (error) {
        res.status(400).json({ login: false, error: error.message });
    }
});
exports.loginUser = loginUser;
