import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { Socket } from "socket.io";
import { usuariosConectados } from "../sockets/socket";

export const router = Router( );

router.get( '/mensajes', ( req: Request, res: Response ) => {

    res.status( 200 ).json({
        ok: true,
        mensaje: 'GET - Listo!'
    });

});

router.post( '/mensajes', ( req: Request, res: Response ) => {

    const cuerpo    = req.body.cuerpo;
    const de        = req.body.de;
    const payload   = { de, cuerpo  };

    const server    = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload );

    res.status( 200 ).json({
        ok: true,
        mensaje: 'GET - Listo!'
    });

});

router.post( '/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo    = req.body.cuerpo;
    const de        = req.body.de;
    const id        = req.params.id;
    const payload   = { de, cuerpo  };

    const server = Server.instance;
    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.status( 200 ).json({
        ok: true,
        mensaje: 'POST - Listo!',
        cuerpo,
        de,
        id
    });

});

// Servicios para obtener los IDs de los usuarios
router.get( '/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;
    server.io.clients( ( err: any, clientes: string[] ) => {
        if ( err ) {
            return res.json({   ok: false,  err });
        }

        res.json({  ok: true,   clientes    })
    })
});

// Obtener usuarios y sus nombres
router.get( '/usuarios/detalle', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        clientes: usuariosConectados.getList()
    })
});
// export default router;