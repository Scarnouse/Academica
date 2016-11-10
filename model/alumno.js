var mongoose = require('mongoose');

var alumnoSchema = mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "apellido" : String,
    "email" : String
});

mongoose.model('Alumno', alumnoSchema);