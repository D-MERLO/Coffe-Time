import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log("Conexión a la DB realizada con éxito");
    server.listen(PORT,()=>{
    console.log(`Server escuchando puerto ${PORT}`)
    })
})

