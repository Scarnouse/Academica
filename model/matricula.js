var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matriculaSchema = Schema({
    asignatura : [{type : Schema.Types.ObjectId, ref : "Asignatura"}],
    alumno : [{type : Schema.Types.ObjectId, ref : "Alumno"}],
    fecha_inicio : { type : Date, default: Date.now},
    fecha_final : {type : Date, default : Date.now}
});

var Matricula = mongoose.model('Matricula', matriculaSchema);