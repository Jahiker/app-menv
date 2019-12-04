import express from 'express';
const router = express.Router();

// importar el modelo nota
import Nota from '../models/nota';

// Agregar una nota
router.post('/nueva-nota', async(req, res) => {

    const body = req.body;

    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un Error',
            error
        });
    }
});

// Get con parametros
router.get('/nota/:id', async(req, res) => {

    const _id = req.params.id;

    try {
        const notaDB = await Nota.findOne({ _id });
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).jason({
            mensaje: 'No se encontro la Nota',
            error
        });
    }
});

// Get con todos los documentos
router.get('/nota', async(req, res) => {

    try {

        const notaDB = await Nota.find();
        res.status(200).json(notaDB);

    } catch (error) {
        return res.status(400).jason({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Eliminar una nota
router.delete('/nota/:id', async(req, res) => {
    const _id = req.params.id;

    try {

        const notaDB = await Nota.findByIdAndDelete({ _id });

        if (!notaDB) {
            return res.status(400).json({
                mensaje: 'No se econtro la nota',
                error
            });
        }

        res.status(200).json(notaDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al eliminar la nota',
            error
        });
    }
});

// Modificar una nota
router.put('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const notaDB = await Nota.findByIdAndUpdate(_id, body, { new: true });
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al modificar la nota',
            error
        });
    }
});

// Exportacion de router
module.exports = router;