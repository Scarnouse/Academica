var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matriculaSchema = Schema({
    asignatura : [{ type : Schema.ObjectId, ref : 'Asignatura'}],
    alumno : [{ type : Schema.ObjectId, ref : 'Alumno'}],
    fecha_inicio : Date,
    fecha_final : Date
});

mongoose.model('Matricula', matriculaSchema);