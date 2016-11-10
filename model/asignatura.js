var mongoose = require('mongoose');

var asignaturaSchema = mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "ciclo" : String,
    "curso" : Number,
    "horas" : Number
});

mongoose.model('Asignatura', asignaturaSchema);