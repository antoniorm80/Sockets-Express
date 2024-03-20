import  express  from 'express';
import { SERVER_PORT } from '../global/environment';
import http  from "http";
import socketIO from "socket.io";
import * as sockets from '../sockets/sockets';


export default class Server {

    private static _intance: Server;
    public app: express.Application;
    public port:  number;

    public io: socketIO.Server;
    private httpServer: http.Server;

   private  constructor(){
        this.app = express();
        this.port = SERVER_PORT;        

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true}});

        this.escucharSockets();
       
    }

    public static get instance() {
        return this._intance || ( this._intance = new this());        
    }

    private escucharSockets() {
        // console.log('escuchando conexiones - socketas');

        this.io.on('connection', cliente => {
            
            console.log(cliente.id); 

            sockets.conectarCliente( cliente ); 

            // Configurar usuario
            sockets.configurarUsuario(cliente, this.io);
            // Mensajes
            sockets.mensaje(cliente, this.io);
            // Desconectar
            sockets.desconectar(cliente);

            

        })
        
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback() );
    }

}