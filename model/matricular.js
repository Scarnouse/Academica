var mongoose = require('mongoose');
var Asignatura = mongoose.model('Asignatura').schema;
var Alumno = mongoose.model('Alumno').schema;


var matricularSchema = mongoose.Schema({
    "asignatura" : [Asignatura],
    "alumno" : [Alumno],
    "fecha_inicio" : Date,
    "fecha_final" : Date
});

mongoose.model('Matricular', matricularSchema);