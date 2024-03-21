import { Router, Request, Response  } from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

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

// Servicio para obtener todos los ID's de los usuarios.
router.get('/usuarios', ( req: Request, res: Response) => {
    const server = Server.instance;

    server.io.fetchSockets().then( (sockets) => {
        res.json({
            ok: true,
            clientes: sockets.map( cliente => cliente.id)
        });
    }).catch( (err) => {
        res.json({
            ok: false,
            err
        })
    });        
})

// Obtener los usuarios y sus nombres.
router.get('/usuarios/detalle', ( req: Request, res: Response) => {
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

 })

export default router;