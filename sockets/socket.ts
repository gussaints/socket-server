import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsersList } from "../classes/usuarios-lista";
import { User } from "../classes/user";

export const usuariosConectados = new UsersList( );

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {
    const user = new User( cliente.id );
    usuariosConectados.addUser( user );
}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'disconnect', ( ) => {
        usuariosConectados.delUser( cliente.id );
        console.log( 'Cliente desconectado' );
        io.emit( 'usuarios-activos', usuariosConectados.getList( ) );
    });
}

// Recibir
export const msg = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'msg', ( payload: { de: string, cuerpo: string } ) => {
        console.log( 'mensaje recibido ', payload );
        io.emit( 'mensaje-nuevo', payload );
    })
}

// Configurar nombre usuario
export const configUser = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'configurar-usuario', ( payload: { name: string }, callback: Function ) => {
        usuariosConectados.updateUser( cliente.id, payload.name );
        io.emit( 'usuarios-activos', usuariosConectados.getList( ) );
        callback({
            ok:true,
            mensaje: `Usuario ${ payload.name } configurado`
        });
        // io.emit(  );
    })
}

// obtener usuarios
export const getUsersByOne = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'obtener-usuarios', ( ) => {
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getList( ) );
        // const users = usuariosConectados.getList( );
        // let byOne = null;
        // let exceptMe = users.filter( ( one: any ) => {
        //     if ( one.name !== payload.name ) {
        //         return one;
        //     } else {
        //         byOne = one;
        //     }
        // });
        // callback({
        //     ok:true,
        //     exceptMe
        // });
        // io.in( byOne.id ).emit( '' );
    })
}