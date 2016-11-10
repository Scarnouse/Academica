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
    var Alumno = mongoose.model('Alumno');
    var alumno = new Alumno();

    alumno.id = req.body.id;
    alumno.nombre = req.body.nombre;
    alumno.apellido = req.body.apellido;
    alumno.email = req.body.email;

    alumno.save(function(err){
        if(!err)
            res.redirect("/");
        else
            res.render("error", {
                "message" : "Error: alumnoUpdate",
                "error" : {
                    "status" : "Imposible acceder a la base de datos",
                    "stack" : "Volcado de pila..."
                }
            });
    })
});

/* GET asignaturaCreate */
router.get('/AsignaturaCreate', function(req, res, next){
    res.render('asignaturaCreate');
});

/* POST asignaturaCreate */
router.post('/AsignaturaCreate', function(req, res, next){
    var Asignatura = mongoose.model('Asignatura');
    var asignatura = new Asignatura();

    asignatura.id = req.body.id;
    asignatura.nombre = req.body.nombre;
    asignatura.ciclo = req.body.ciclo;
    asignatura.curso = req.body.curso;
    asignatura.horas = req.body.horas;

    asignatura.save(function(err){
        if(!err)
            res.redirect("/");
        else 
            res.render("error", {
                "message" : "Error: asignaturaCreate",
                "error" : {
                    "status" : "Imposible acceder a la base de datos",
                    "stack" : "Volcado de pila..."
                }
            });
    });
});

/* GET profesorCreate */
router.get('/ProfesorCreate', function(req, res, next){
    res.render('profesorCreate');
});

/* POST profesorCreate */
router.post('/ProfesorCreate', function(req, res, next){
    var Profesor = mongoose.model('Profesor');
    var profesor = new Profesor();

    profesor.id = req.body.id;
    profesor.nombre = req.body.nombre;
    profesor.apellido = req.body.apellido;
    profesor.email = req.body.email;

    profesor.save(function(err){
         if(!err)
            res.redirect("/");
        else
            res.render("error", {
                "message" : "Error: profesorCreate",
                "error" : {
                    "status" : "Imposible acceder a la base de datos",
                    "stack" : "Volcado de pila..."
                }
            });
    });
});

/* GET alumnoUpdate */
router.get('/AlumnoUpdate', function(req, res, next){
    mongoose.model('Alumno').find({}, function(err, alumnos){
        if(!err)
            res.render('/alumnoUpdate', {
                "listaAlumnos" : alumnos
            });
        else
            res.send('error');
    });
});

/* POST alumnoUpdate */
router.post('/AlumnoUpdate', function(req, res, next){
    if(req.body._id === 'undefined'){
        res.redirect('/alumnoUpdate');
    } else {
        mongoose.model('Alumno').findById(req.body._id, function(err, data){
            if(!err)
                res.render("alumnoUpdateForm", {'alumno' : data});
            });
    }
        
    
});

/* PUT alumnoUpdate */
router.put('/AlumnoUpdate', function(req, res, next){
    mongoose.model('Alumno').findByIdAndUpdate(req.body._id, 
    { "id" : req.body.id, "nombre" : req.body.nombre, "apellido" : req.body.apellido, "email" : req.body.email}, 
    function(err){
        if(!err)
            res.redirect("/alumnoUpdate");
        else
            res.render("error", {
                "message" : "Error: alumnoUpdate",
                "error" : {
                    "status" : "Imposible acceder a la base de datos",
                    "stack" : "Volcado de pila..."
                }
            });
    });
});


module.exports = router;
