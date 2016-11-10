var mongoose = require('mongoose');

var profesorSchema = new mongoose.Schema({
    "id" : Number,
    "nombre" : String,
    "apellido" : String,
    "email" : String 
});

mongoose.model('Profesor', profesorSchema);