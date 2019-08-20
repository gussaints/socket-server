import { Router, Request, Response } from "express";
import Server from "../classes/server";

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

// export default router;