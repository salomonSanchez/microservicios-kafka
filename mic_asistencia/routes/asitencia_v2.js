const modelos = require('../database/dbconf')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const security = require('../controller/autcontroller');
var producer = require('../services/kafkaproducer')

router.get('/', (req, res) => {
    res.send('welcome asictencia v2:  visit /listar/asistencias  + token')
})

router.get('/listar/asistencias', security, async(request, response) => {
    try {
        var result = await modelos.Model.find().exec();
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/listar/asistencia/:id', security, async(request, response) => {
    try {
        var result = await modelos.Model.find({ id_alumno: request.params.id }).exec();
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/registrar/asistencia", security, async(request, response) => {
    try {
        var item = new modelos.Model(request.body);
        var result = await item.save();
        response.status(200).json(result)
        sendKafka(result)
    } catch (error) {
        response.status(500).send("Error al guardar registro: " + error);
    }
});

router.delete("/eliminar/asistencia/:id", security, async(request, response) => {
    try {
        var result = await modelos.Model.deleteOne({ id_alumno: request.params.id }).exec();
        response.status(200).send(result.deletedCount == 1 ? { msg: "registro eliminado" } : { msg: "registro inexistente" });
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/actualizar/asistencia/:id", security, async(request, response) => {
    try {
        var result = await modelos.Model.updateOne({ id_alumno: request.params.id }, { $set: request.body }).exec();
        response.status(200).send(result.nModified == 1 ? { msg: "registro actualizado" } : { msg: "error de registro" });
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/actualizar/asistencia/:id", security, async(request, response) => {
    try {
        var result = await modelos.Model.updateOne({ id_alumno: request.params.id }, { $set: { disponible: request.body.disponible } }).exec();
        response.status(200).send(
            request.body.disponible == undefined ? { msg: "datos incorrectos: disponible: valor (si/no)" } :
            result.nModified == 1 ? { msg: "registro actualizado" } : { msg: "error de registro {duplicacion/no existe el objeto}" }
        );
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/token', (request, response) => {
    let privateKey = "PASSWORD";
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256' }, { expiresIn: '1h' });
    response.send({ token: token });
})

function sendKafka(item) {
    try {
        const msg = {
            asitencia: item
        }
        payload = [{
            topic: 'asitencia',
            messages: JSON.stringify(msg)
        }]

        producer.send(payload, function(error, result) {
            if (error) {
                throw error
            }
        })

    } catch (error) {
        throw error
    }
}

module.exports = router;