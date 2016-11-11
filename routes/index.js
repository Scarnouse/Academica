var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET profesorRead */
router.get('/profesorRead', function(req, res, next){
    var Profesor = mongoose.model('Profesor');
    
    Profesor.find({}, function(err, profesores){
        if(!err)
            res.json(profesores);
        else
            res.json({});
    })
});

/* POST Profesor */
router.post('/ProfesorCreate', function(req, res, next) {
    var Profesor = mongoose.model('Profesor');
    var profesor = new Profesor();

    profesor.id = req.body.id;
    profesor.nombre = req.body.nombre;
    profesor.apellido = req.body.apellido;
    profesor.email = req.body.email;

    profesor.save(function(err){
        if (err) return handleError(err);
        res.json({});
    })

});

/* DELETE Profesor */
router.delete('/ProfesorDelete', function (req, res, next) {
    var Profesor = mongoose.model('Profesor');
    
    Profesor.remove({"_id": req.body._id}, function (err){
        if (!err) {
            res.json({});
        } else {
            res.send("Error!!!!");
        }
    });
});

/* POST Profesor Update */
router.post("/ProfesorUpdate", function(req, res, next){
    var Profesor = mongoose.model('Profesor');

    Profesor.findById(req.body._id, function(err, profesor){
        if(!err)
            res.json(profesor);
    })
});

/* PUT Profesor */
router.put("/ProfesorUpdate", function(req, res, next){
    var Profesor = mongoose.model('Profesor');

    Profesor.findByIdAndUpdate(req.body._id, {"id": req.body.id, "nombre" : req.body.nombre, "apellido" : req.body.apellido, "email" : req.body.email},
        function (err){
            if(!err)
                res.json({});
    });

});

/* POST Alumno */
router.post("/Alumno", function(req, res, next){
    var Alumno = mongoose.model('Alumno');
    var alumno = new Alumno();

    alumno.id = req.body.id;
    alumno.nombre = req.body.nombre;
    alumno.apellido = req.body.apellido;
    alumno.email = req.body.email;

    alumno.save(function(err){
        if(!err)
            res.json({}); 
    });
})

/* GET Alumno */
router.get("/Alumno", function(req, res, next){
    mongoose.model('Alumno').find({}, function(err, alumnos){
        if(!err)
            res.json(alumnos);
        else
            res.json({});
    });
});

/* POST AlumnoUpdate */
router.post("/AlumnoUpdate", function(req, res, next){

    mongoose.model('Alumno').findById(req.body._id, function(err, alumno){
        if(!err)
            res.json(alumno);
    })
})

/* PUT AlumnoUpdate */
router.put("/AlumnoUpdate", function(req, res, next){
    var Alumno = mongoose.model('Alumno');

    Alumno.findByIdAndUpdate(req.body._id, {"id": req.body.id, "nombre" : req.body.nombre, "apellido" : req.body.apellido, "email" : req.body.email},
        function (err){
            if(!err)
                res.json({});
    });
});

/* DELETE Alumno */
router.delete("/Alumno", function(req, res, next){
    
    mongoose.model('Alumno').remove({"_id" : req.body._id}, function(err){
        if (!err)
            res.json({});
    });

});

/* POST Asignatura */
router.post("/Asignatura", function(req, res, next){
    var Asignatura = mongoose.model('Asignatura');
    var asignatura = new Asignatura();

    asignatura.id = req.body.id;
    asignatura.nombre = req.body.nombre;
    asignatura.ciclo = req.body.ciclo;
    asignatura.curso = req.body.curso;
    asignatura.horas = req.body.horas;

    asignatura.save(function(err){
        if(!err)
            res.json({}); 
    });
})

/* GET Asignatura */
router.get("/Asignatura", function(req, res, next){
    mongoose.model('Asignatura').find({}, function(err, asignaturas){
        if(!err)
            res.json(asignaturas);
        else
            res.json({});
    });
});

/* POST AsignaturaUpdate */
router.post("/AsignaturaUpdate", function(req, res, next){
    console.log(req.body._id);
    mongoose.model('Asignatura').findById(req.body._id, function(err, asignatura){
        if(!err)
            
            res.json(asignatura);
    })
})

/* PUT AsignaturaUpdate */
router.put("/AsignaturaUpdate", function(req, res, next){
    var Asignatura = mongoose.model('Asignatura');

    Asignatura.findByIdAndUpdate(req.body._id, {"id": req.body.id, "nombre" : req.body.nombre, "ciclo" : req.body.ciclo, "curso" : req.body.curso, "horas" : req.body.horas},
        function (err){
            if(!err)
                res.json({});
    }); 
});

/* DELETE Asignatura */
router.delete("/Asignatura", function(req, res, next){
    
    mongoose.model('Asignatura').remove({"_id" : req.body._id}, function(err){
        if (!err)
            res.json({});
    });

});

/* GET Matricula */
router.get("/Matricula", function(req, res, next){
    mongoose.model('Asignatura').find({}, function(err, asignaturas){
        mongoose.model('Alumno').find({}, function(err, alumnos){
            res.json([asignaturas, alumnos]);
        });
    });
});

/* POST Matricula */
router.post("/Matricula", function(req, res, next){
    mongoose.model('Asignatura').findOne({ nombre : req.body.asignatura }, function(err, asignatura) {      
        mongoose.model('Alumno').findOne({ nombre : req.body.nombre_alumno, apellido : req.body.apellido_alumno}, function (err, alumno){        
            var Matricula = mongoose.model('Matricula');
            var matricula = new Matricula();

            matricula.asignatura = asignatura._id;
            matricula.alumno = alumno._id;
            matricula.fecha_inicio = req.body.fecha_inicio;
            matricula.fecha_final = req.body.fecha_final;

            matricula.save(function(err){
                res.json({});
            });
        });
    });
});

/* GET ListarMatriculas */
router.post("/ListarMatriculas", function(req, res, next){
    mongoose.model('Asignatura').findOne({nombre : req.body.asignatura}, function(err, dato){
        mongoose.model('Matricula').find({asignatura : dato._id}, function(err, matriculas){
           res.json(matriculas);
        });
    });
})

/* POST ObtenerAlumnosPorID */
router.post("/ObtenerAlumnosPorId", function(req, res, next){
    mongoose.model('Alumno').findOne({_id : req.body._id}, function(err, alumno){
        res.json(alumno);
    });
});

/* POST MatriculaUpdate */
router.post("/MatriculaUpdate", function(req, res, next){
    mongoose.model('Matricula').findOne({_id : req.body._id}, function(err, matricula){
        res.json(matricula);
    });
});

/* PUT MatriculaPutUpdate */
router.put("/MatriculaPutUpdate", function(req, res, next){
    mongoose.model('Asignatura').findOne({nombre : req.body.asignatura}, function(err, _asignatura){
        mongoose.model('Alumno').findOne({nombre : req.body.nombre_alumno, apellido : req.body.apellido_alumno}, function(err, _alumno){
            mongoose.model('Matricula').findByIdAndUpdate(req.body._id, { "asignatura" : _asignatura._id, "alumno" : _alumno._id, "fecha_inicio" : req.body.fecha_inicio, "fecha_final" : req.body.fecha_final}, function (err){
                if(!err)
                    res.json({});
                else
                    console.log(err);
            });
        });
    });
});

/* DELETE Matricula */
router.delete("/Matricula", function(req, res, next){
    mongoose.model('Matricula').findOneAndRemove({ "_id" : req.body._id}, function(err){
        if (!err)
            res.json({});
        else
            console.log(err);
    });
});

/* GET Asignacion */
router.get("/Asignacion", function(req, res, next){
    mongoose.model('Asignatura').find({}, function(err, asignaturas){
        mongoose.model('Profesor').find({}, function(err, profesores){
            res.json([asignaturas, profesores]);
        });
    });
});

/* POST Asignacion */
router.post("/Asignacion", function(req, res, next){
    mongoose.model('Asignatura').findOne({ nombre : req.body.asignatura }, function(err, asignatura) {      
        mongoose.model('Profesor').findOne({ nombre : req.body.nombre_profesor, apellido : req.body.apellido_profesor}, function (err, profesor){        
            var Asignacion = mongoose.model('Asignacion');
            var asignacion = new Asignacion();

            asignacion.asignatura = asignatura._id;
            asignacion.profesor = profesor._id;
            asignacion.fecha_inicio = req.body.fecha_inicio;
            asignacion.fecha_final = req.body.fecha_final;
            asignacion.horas = req.body.horas;

            asignacion.save(function(err){
                res.json({});
            });
        });
    });
});

/* GET ListarAsignaciones */
router.post("/ListarAsignaciones", function(req, res, next){
    mongoose.model('Asignatura').findOne({nombre : req.body.asignatura}, function(err, dato){
        mongoose.model('Asignacion').find({asignatura : dato._id}, function(err, asignaciones){
           res.json(asignaciones);
        });
    });
})

/* POST ObtenerProfesoresPorID */
router.post("/ObtenerProfesoresPorId", function(req, res, next){
    mongoose.model('Profesor').findOne({_id : req.body._id}, function(err, profesor){
        res.json(profesor);
    });
});

/* POST AsignacionUpdate */
router.post("/AsignacionUpdate", function(req, res, next){
    mongoose.model('Asignacion').findOne({_id : req.body._id}, function(err, asignacion){
        res.json(asignacion);
    });
});

/* PUT AsignacionPutUpdate */
router.put("/AsignacionPutUpdate", function(req, res, next){
    mongoose.model('Asignatura').findOne({nombre : req.body.asignatura}, function(err, _asignatura){
        console.log(req.body)
        mongoose.model('Profesor').findOne({nombre : req.body.nombre_profesor, apellido : req.body.apellido_profesor}, function(err, _profesor){
            mongoose.model('Asignacion').findByIdAndUpdate(req.body._id, { "asignatura" : _asignatura._id, "profesor" : _profesor._id, "fecha_inicio" : req.body.fecha_inicio, "fecha_final" : req.body.fecha_final, "horas" : req.body.horas}, function (err){
                if(!err)
                    res.json({});
                else
                    console.log(err);
            });
        });
    });
});

/* DELETE Matricula */
router.delete("/Asignacion", function(req, res, next){
    mongoose.model('Asignacion').findOneAndRemove({ "_id" : req.body._id}, function(err){
        if (!err)
            res.json({});
        else
            console.log(err);
    });
});

module.exports = router;
