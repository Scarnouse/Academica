var db = require('./model/db.js');
var mongoose = require('mongoose');
var profesor = require('./model/profesor.js');
var alumno = require('./model/alumno.js');

function aleatorio(tamano)  {
    return ( Math.floor(Math.random() * tamano) ); 
}

function generaPersonas(cuantas){
    var nombres = [ 'Pedro', 'Juan', 'Pablo', 'Miguel', 'Jacinto', 'José', 'Samuel', 'Ángel', 'Ramón', 'Julian', 'Lola', 'María', 'Antonia', 'Josefa', 'Teresa', 'Manuela', 'Inmaculada'];
    var apellidos = [ 'Antón', 'Baeza', 'Caparrós', 'Díaz' , 'Esteban', 'Fernández' , 'García' , 'Heredia' , 'Iniesta', 'Jiménez', 'Lara', 'Martínez', 'Navarro', 'Ortega', 'Pérez', 'Quesada', 'Ruiz', 'Sánchez', 'Toledano', 'Ureña', 'Vega', 'Yeguas', 'Zamorano'  ];

    var personas = [];
    var persona;
    var nombre;
    var apellido;

    for (var i=0; i<cuantas; i++ ) {
        nombre=nombres[aleatorio(nombres.length)];
        apellido=apellidos[aleatorio(nombres.length)];
        persona = {
            "nombre": nombre,
            "apellido": apellido,
            "email":nombre[0]+apellido+"@sincorreo.es",
            "id": i
        } 
        personas.push(persona);
    }
    return personas;
}

profesores = generaPersonas(20);
alumnos = generaPersonas(20);

for(var i = 0; i < 20; i++){
    var Profesor = mongoose.model('Profesor');
    var profesor = new Profesor(profesores[i]);

    var Alumno = mongoose.model('Alumno');
    var alumno = new Alumno(alumnos[i]);

    profesor.save(function(err){
        if(!err) console.log("Insertado profesor");
    });

    alumno.save(function(err){
        if(!err) console.log("Insertado alumno");
    });
}

