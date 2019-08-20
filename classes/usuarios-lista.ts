import { User } from "./user";

export class UsersList {
    private list: User[ ] = [ ];

    constructor( ){ }

    public addUser( user: User ){

        this.list.push( user );
        console.log( 'adding user => ', user );
        console.log( this.list );
        return user;

    }

    public updateUser( id: string, name: string ){

        const user = this.list.map( ( user, inc ) => {
            if ( user.id === id ) {
                console.log( 'check => ', user, name, id );
                
                user.name = name;
                return user;
            }
        });

        console.log( '==== Actualizando usuario ====' );
        console.log( user );
        console.log( this.list );
        return user;
    }

    // Obtener lista de usuarios
    public getList( ){
        return this.list;
    }

    // Obtener un usuario
    public getUser( id: string ){
        return this.list.find( user => user.id === id );
    }

    // Obtener usuarios en una sala
    public getUsersByRoom( room: string ){
        return this.list.filter( user => user.room === room )
    }

    // Borrar usuario
    public delUser( id: string ){
        const tempUser = this.getUser( id );
        this.list = this.list.filter( user => user.id !== id );
        console.log( 'borrando usuario => ', tempUser );
        console.log( this.list );
        return tempUser;
    }

}