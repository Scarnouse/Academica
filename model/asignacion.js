var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var asignacionSchema = Schema({
    "asignatura" : [{ type : Schema.ObjectId, ref : 'Asignatura'}],
    "profesor" : [{ type : Schema.ObjectId, ref : 'Profesor'}],
    "horas" : Number,
    "fecha_inicio" : Date,
    "fecha_final" : Date
});

mongoose.model('Asignacion', asignacionSchema);