var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Académica' });
});

/* GET alumnoRead */
router.get('/AlumnoRead', function(req, res, next){
    mongoose.model('Alumno').find({}, function(err, alumnos){
        if(!err)
            res.render('alumnoRead', {
                "listaAlumnos" : alumnos
            });
        else
            res.send('error');
    });
});

/* GET asignaturaRead */
router.get('/AsignaturaRead', function(req, res, next){
    mongoose.model('Asignatura').find({}, function(err, asignaturas){
        if(!err)
            res.render('asignaturaRead', {
                "listaAsignaturas" : asignaturas
            });
        else
            res.send('error');
    });
});

/* GET profesorRead */
router.get('/ProfesorRead', function(req, res, next){
    mongoose.model('Profesor').find({}, function(err, profesores){
        if(!err)
            res.render('profesorRead', {
                "listaProfesores" : profesores
            });
        else
            res.send('error');
    });
});

/* GET alumnoCreate */
router.get('/AlumnoCreate', function(req, res, next){
    res.render('alumnoCreate');
});

/* POST alumnoCreate */
router.post('/AlumnoCreate', function(req, res, next){
    mongoose.model('Alumno').create({
        "id" : req.body.id,
        "nombre" : req.body.nombre,
        "apellido" : req.body.apellido,
        "email" : req.body.email
    }, function(err, alumno){
        if(!err)
            res.redirect("/");
        else
            res.sender("error");
    });
});

/* GET asignaturaCreate */
router.get('/AsignaturaCreate', function(req, res, next){
    res.render('asignaturaCreate');
});

/* POST asignaturaCreate */
router.post('/AsignaturaCreate', function(req, res, next){
    mongoose.model('Asignatura').create({
        "id" : req.body.id,
        "nombre" : req.body.nombre,
        "ciclo" : req.body.ciclo,
        "curso" : req.body.curso,
        "horas" : req.body.horas
    }, function(err, profesor){
        if(!err)
            res.redirect("/");
        else
            res.sender("error");
    });
});

/* GET profesorCreate */
router.get('/ProfesorCreate', function(req, res, next){
    res.render('profesorCreate');
});

/* POST profesorCreate */
router.post('/ProfesorCreate', function(req, res, next){
    mongoose.model('Profesor').create({
        "id" : req.body.id,
        "nombre" : req.body.nombre,
        "apellido" : req.body.apellido,
        "email" : req.body.email
    }, function(err, profesor){
        if(!err)
            res.redirect("/");
        else
            res.sender("error");
    });
});


module.exports = router;
