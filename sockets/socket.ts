import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsersList } from "../classes/usuarios-lista";
import { User } from "../classes/user";

export const usuariosConectados = new UsersList( );

export const conectarCliente = ( cliente: Socket ) => {
    const user = new User( cliente.id );
    usuariosConectados.addUser( user );
}

export const desconectar = ( cliente: Socket ) => {
    cliente.on( 'disconnect', ( ) => {
        usuariosConectados.delUser( cliente.id );
        console.log( 'Cliente desconectado' ); 
    });
}

// Recibir
export const msg = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'msg', ( payload: { de: string, cuerpo: string } ) => {
        console.log( 'mensaje recibido ', payload );
        io.emit( 'mensaje-nuevo', payload );
    })
}

export const configUser = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'configurar-usuario', ( payload: { name: string }, callback: Function ) => {
        usuariosConectados.updateUser( cliente.id, payload.name )
        callback({
            ok:true,
            mensaje: `Usuario ${ payload.name } configurado`
        });
        // io.emit(  );
    })
}