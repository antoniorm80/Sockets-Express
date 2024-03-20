import { Router, Request, Response  } from 'express';
import Server from '../clases/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: "Estúpida OSEA"
    })
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {cuerpo, de }

    const server = Server.instance
    server.io.emit('Mensaja-Nueva', payload );

    res.json({
        ok: true,
        mensaje: "POST - Estúpida OSEA",
        cuerpo,
        de
    })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // Obtengo el Id del URL o los parámetrs.
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: "POST - Estúpida OSEA",
        cuerpo,
        de,
        id
    })
});

export default router;