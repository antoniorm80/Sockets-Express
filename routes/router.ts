import { Router, Request, Response  } from 'express';

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

    res.json({
        ok: true,
        mensaje: "POST - Estúpida OSEA",
        cuerpo,
        de,
        id
    })
});

export default router;