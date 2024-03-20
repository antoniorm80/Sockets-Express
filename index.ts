
import Server from "./clases/server";
import { SERVER_PORT } from "./global/environment";
import  router  from "./routes/router";
import  bodyParser  from "body-parser";


const server = Server.instance;


// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());

//CORS -- esta línea de código no funiona
// server.app.use(cors( { origin: true, credentials: true }));

// Rutas de servicos. 
server.app.use('/', router);


server.start( () => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);    
})