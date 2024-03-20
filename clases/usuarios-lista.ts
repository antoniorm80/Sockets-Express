import { Usuario } from "./usuario";

export class UsuarioLista {

    private lista: Usuario[] = [];
    
    constructor( ){ }

    // Agregar un usuario
    public agregar( usuario: Usuario ) {
        this.lista.push( usuario );
        console.log(this.lista);
        return usuario;        
    }

    public actualizarUsuario( id: string, nombre: string) {

        for (let usuario of this.lista) {
            if ( usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }            
        }
        console.log('===== Actualizando usuario =====');
        console.log(this.lista);
        
    }

    // Obtener lista de suuarios
    public getLista() {
        return this.lista;
    }

    // Obtener el usuario
    public getUsuario(id: string )  {
        return this.lista.find ( usuario => usuario.id === id);
    }

    // Obtener usuario en una sala en particular
    public getUsuariosEnSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    // Borrar usuario
    public borrarUsuario( id: string ) {
        const tempUsuario = this.getUsuario ( id );
        this.lista = this.lista.filter( usuario => usuario.id !== id);
        console.log(this.lista);
        
        return tempUsuario;
    }





}