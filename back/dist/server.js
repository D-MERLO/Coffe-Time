"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const indexRouter_1 = __importDefault(require("../src/routes/indexRouter"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use('/', indexRouter_1.default);
exports.default = server;
