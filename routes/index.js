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
    console.log(req.body._id);
    
    /*Profesor.remove({"_id": req.body._id}, function (error, data){
        if (!error) {
            res.json({});
        } else {
            res.send("Error!!!!");
        }
    });*/
});

/* POST Profesor Update */
router.post("/ProfesorUpdate", function(req, res, next){
    var Profesor = mongoose.model('Profesor');
    console.log(req.body._id);

    /*Profesor.findById(req.body._id, function(err, profesor){
        console.log(profesor);
        if(!err)
            res.json(profesor);
    })*/
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

module.exports = router;
