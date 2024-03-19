import  express  from 'express';
import { SERVER_PORT } from '../global/environment';
import http  from "http";
import socketIO from "socket.io";


export default class Server {

    public app: express.Application;
    public port:  number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;        

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true}});
       
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback() );

    }

}