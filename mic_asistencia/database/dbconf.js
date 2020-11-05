const mongoose = require('mongoose')
const uri = 'mongodb://root:secret@mongo:27017/asistenciadb?authSource=admin';

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("‘MongoDB Connected…’") })
    .catch(err => console.log(err))


const Model = mongoose.model("asistencias", {
    id_alumno: { type: String, required: true },
    id_curso: { type: String, required: true },
    asistencia: { type: String, required: true },
    registro: { type: Date, default: Date.now }
});

module.exports = {
    Model
}