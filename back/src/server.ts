import express from "express";
import morgan from "morgan";
import indexRouter from "../src/routes/indexRouter";
import cors from "cors";


const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors()); 

server.use('/', indexRouter);

export default server;
