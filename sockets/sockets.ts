import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";


export const usuariosConectados = new UsuarioLista();

export const conectarCliente = ( cliente: Socket ) => {
    
    const usaurio = new Usuario (cliente.id);
    usuariosConectados.agregar( usaurio );
}

// Detectar la desconexión
export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cient@ Desconectado');  
        usuariosConectados.borrarUsuario( cliente.id );              
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', ( payload: { de: string, cuerpo: string }) => {
        
        console.log('Mensaje recibido', payload );          
        io.emit('Mensaja-Nueva', payload);   

    })

}

// Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
        
        usuariosConectados.actualizarUsuario( cliente.id, payload.nombre);

        callback( {
            ok: true,
            mensaje: `Usuari@ ${ payload.nombre }, configruado`
        });

                
    })

}