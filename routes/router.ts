import { Router, Request, Response } from "express";

export const router = Router( );

router.get( '/mensajes', ( req: Request, res: Response ) => {

    res.status( 200 ).json({
        ok: true,
        mensaje: 'GET - Listo!'
    });

});

router.post( '/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo    = req.body.cuerpo;
    const de        = req.body.de;
    const id        = req.params.id;
    console.log( req.body );
    

    res.status( 200 ).json({
        ok: true,
        mensaje: 'POST - Listo!',
        cuerpo,
        de,
        id
    });

});

// export default router;