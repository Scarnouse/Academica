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


router.delete('/ProfesorDelete', function (req, res, next) {
    var Profesor = mongoose.model('Profesor');
    Profesor.remove({"_id": req.body._id}, function (error, data){
        if (!error) {
            res.json({});
        } else {
            res.send("Error!!!!");
        }
    });
});

module.exports = router;
