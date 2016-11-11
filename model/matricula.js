var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matriculaSchema = Schema({
    asignatura : [mongoose.model('Asignatura').schema],
    alumno : [mongoose.model('Alumno').schema],
    fecha_inicio : Date,
    fecha_final : Date
});

mongoose.model('Matricula', matriculaSchema);