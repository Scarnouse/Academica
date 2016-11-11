$(document).ready(function () {
    mainMenu();
});

function mainMenu() {
    var text ='<div class="jumbotron"><h2>Académica</h2></div>';
    $('#main').html(text);
}

function conversorFechas(fecha){
    var array = fecha.split("T");
    var partesFecha = array[0].split("-");
    return partesFecha[2] + "/" + partesFecha[1] + "/" +partesFecha[0];
}

function inversorFechas(fecha){
    var partesFecha = fecha.split("/");
    return partesFecha[1] + "/" + partesFecha[0] + "/" +partesFecha[2];
}

function profesorRead(del) {
    $.ajax({
        url: '/ProfesorRead',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            //console.log(JSON.stringify(json));
            $('#main').html('<h3>Profesores</h3>');
            var table = $('<table />').addClass('table');
            if (del) {
                table.append($('<tr />').append('<th>ID</th>', '<th>NOMBRE</th>', '<th>APELLIDO</th>', '<th>EMAIL</th>', '<th> </th>'));
            } else {
                table.append($('<tr />').append('<th>ID</th>', '<th>NOMBRE</th>', '<th>APELLIDO</th>', '<th>EMAIL</th>'));
            }

            for(var i = 0; i < json.length; i++){
                if (del === "del") {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].apellido + '</td>',
                        '<td>' + json[i].email + '</td>', 
                        '<td> <button class="btn btn-danger" onclick="profesorDel(\''+json[i]._id+'\')">eliminar</button></td>'));
                } else if (del === "up") {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].apellido + '</td>',
                        '<td>' + json[i].email + '</td>',  
                        '<td> <button class="btn btn-success" onclick="profesorPostUpdate(\''+json[i]._id+'\')">modificar</button></td>'));
                } else {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].apellido + '</td>',
                        '<td>' + json[i].email + '</td>'));
                }
            }
            
            $('#main').append(table);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function profesorForm() {
    $('#main').html('<h3>Insertar profesor:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append('<input id="id" type="number" class="form-control" />');
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append('<input id="nombre" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">APELLIDO:</label>');
    div.append('<input id="apellido" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="email">EMAIL:</label>');
    div.append('<input id="email" type="email" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="profesorPost()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function profesorPost() {

    var datos = {
        "id": $('#id').val(),
        "nombre": $('#nombre').val(),
        "apellido": $('#apellido').val(),
        "email": $('#email').val()
        
    };
    $.ajax({
        url: '/ProfesorCreate',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            profesorRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function profesorDel(dato) {

    var datos = {
        "_id": dato       
    };
    $.ajax({
        url: '/ProfesorDelete',
        data: datos,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {
            profesorRead("del");
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function profesorDelete(){
    profesorRead("del");
}

function profesorUpdate(){
    profesorRead("up");
}

function profesorUpdateForm(json) {
    $('#main').html('<h3>Modificar profesor:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append("<input id='id' type='number' class='form-control' value=" +json.id+ " />");
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append("<input id='nombre' type='text' class='form-control' value=" +json.nombre+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">APELLIDOS:</label>');
    div.append("<input id='apellido' type='texto' class='form-control' value=" +json.apellido+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="email">EMAIL:</label>');
    div.append("<input id='email' type='email' class='form-control' value=" +json.email+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append("<button onclick='profesorPutUpdate()' class='btn btn-success' id='_id' value="+json._id+"> Aceptar </div>");
    form.append(div);
    
    $('#main').append(form);
}

function profesorPostUpdate(datos) {

    var datos = {
        "_id": datos
    };
    $.ajax({
        url: '/ProfesorUpdate',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            profesorUpdateForm(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });

}

function profesorPutUpdate() {

    var datos = {
        "_id" : $('#_id').val(),
        "id" : $('#id').val(),
        "nombre": $('#nombre').val(),
        "apellido": $('#apellido').val(),
        "email": $('#email').val()       
    };
    $.ajax({
        url: '/ProfesorUpdate',
        data: datos,
        type: 'PUT',
        dataType: 'json',
        success: function (json) {
            profesorUpdate(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

// ============================================================================================================== //

function alumnoForm(){
    $('#main').html('<h3>Insertar alumno:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append('<input id="id" type="number" class="form-control" />');
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append('<input id="nombre" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">APELLIDO:</label>');
    div.append('<input id="apellido" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="email">EMAIL:</label>');
    div.append('<input id="email" type="email" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="alumnoPost()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function alumnoPost(){
    var datos = {
        "id": $('#id').val(),
        "nombre": $('#nombre').val(),
        "apellido": $('#apellido').val(),
        "email": $('#email').val()
        
    };
    $.ajax({
        url: '/Alumno',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            alumnoRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function alumnoRead(del){
    $.ajax({
        url: '/Alumno',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            //console.log(JSON.stringify(json));
            $('#main').html('<h3>Alumnos</h3>');
            var table = $('<table/>').addClass('table');
            if (del) {
                table.append($('<tr />').append('<th>ID</th>', '<th>NOMBRE</th>', '<th>APELLIDO</th>', '<th>EMAIL</th>', '<th> </th>'));
            } else {
                table.append($('<tr />').append('<th>ID</th>', '<th>NOMBRE</th>', '<th>APELLIDO</th>', '<th>EMAIL</th>'));
            }

            for(var i = 0; i < json.length; i++){
                if (del === "del") {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].apellido + '</td>',
                        '<td>' + json[i].email + '</td>', 
                        '<td> <button class="btn btn-danger" onclick="alumnoDel(\''+json[i]._id+'\')">eliminar</button></td>'));
                } else if (del === "up") {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].apellido + '</td>',
                        '<td>' + json[i].email + '</td>',  
                        '<td> <button class="btn btn-success" onclick="alumnoPostUpdate(\''+json[i]._id+'\')">modificar</button></td>'));
                } else {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].apellido + '</td>',
                        '<td>' + json[i].email + '</td>'));
                }
            }
            
            $('#main').append(table);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function alumnoUpdate(){
    alumnoRead("up");
}

function alumnoPostUpdate(datos){

    var datos = {
        "_id": datos
    };

    $.ajax({
        url: '/AlumnoUpdate',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            alumnoUpdateForm(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
    
}

function alumnoUpdateForm(json) {
    $('#main').html('<h3>Modificar Alumno:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append("<input id='id' type='number' class='form-control' value=" +json.id+ " />");
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append("<input id='nombre' type='text' class='form-control' value=" +json.nombre+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">APELLIDOS:</label>');
    div.append("<input id='apellido' type='texto' class='form-control' value=" +json.apellido+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="email">EMAIL:</label>');
    div.append("<input id='email' type='email' class='form-control' value=" +json.email+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append("<button onclick='alumnoPutUpdate()' class='btn btn-success' id='_id' value="+json._id+"> Aceptar </div>");
    form.append(div);
    
    $('#main').append(form);
}

function alumnoPutUpdate() {

    var datos = {
        "_id" : $('#_id').val(),
        "id" : $('#id').val(),
        "nombre": $('#nombre').val(),
        "apellido": $('#apellido').val(),
        "email": $('#email').val()       
    };
    $.ajax({
        url: '/AlumnoUpdate',
        data: datos,
        type: 'PUT',
        dataType: 'json',
        success: function (json) {
            alumnoUpdate(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function alumnoDelete(){
    alumnoRead("del");
}

function alumnoDel(dato){
    var datos = {
        "_id": dato       
    };
    $.ajax({
        url: '/Alumno',
        data: datos,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {
            alumnoRead("del");
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

// ================================================================================================================

function asignaturaForm(){
    $('#main').html('<h3>Insertar asignatura:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append('<input id="id" type="number" class="form-control" />');
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append('<input id="nombre" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="ciclo">CICLO:</label>');
    div.append('<input id="ciclo" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="curso">CURSO:</label>');
    div.append('<input id="curso" type="number" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="horas">HORAS:</label>');
    div.append('<input id="horas" type="number" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="asignaturaPost()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function asignaturaPost(){
    var datos = {
        "id": $('#id').val(),
        "nombre": $('#nombre').val(),
        "ciclo": $('#ciclo').val(),
        "curso": $('#curso').val(),
        "horas": $('#horas').val()
        
    };
    $.ajax({
        url: '/Asignatura',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            asignaturaRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function asignaturaRead(del){
    $.ajax({
        url: '/Asignatura',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            //console.log(JSON.stringify(json));
            $('#main').html('<h3>Asignaturas</h3>');
            var table = $('<table/>').addClass('table');
            if (del) {
                table.append($('<tr />').append('<th>ID</th>', '<th>NOMBRE</th>', '<th>CICLO</th>', '<th>CURSO</th>', '<th>HORAS</th>', '<th> </th>'));
            } else {
                table.append($('<tr />').append('<th>ID</th>', '<th>NOMBRE</th>', '<th>CICLO</th>', '<th>CURSO</th>', '<th>HORAS</th>'));
            }

            for(var i = 0; i < json.length; i++){
                if (del === "del") {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].ciclo + '</td>',
                        '<td>' + json[i].curso + '</td>', '<td>' + json[i].horas + '</td>',
                        '<td> <button class="btn btn-danger" onclick="asignaturaDel(\''+json[i]._id+'\')">eliminar</button></td>'));
                } else if (del === "up") {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].ciclo + '</td>',
                        '<td>' + json[i].curso + '</td>', '<td>' + json[i].horas + '</td>',  
                        '<td> <button class="btn btn-success" onclick="asignaturaPostUpdate(\''+json[i]._id+'\')">modificar</button></td>'));
                } else {
                    table.append($('<tr />').append('<td>' + json[i].id + '</td>',
                        '<td>' + json[i].nombre + '</td>', '<td>' + json[i].ciclo + '</td>',
                        '<td>' + json[i].curso + '</td>', '<td>' + json[i].horas + '</td>'));
                }
            }
            
            $('#main').append(table);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function asignaturaUpdate(){
    asignaturaRead("up");
}

function asignaturaPostUpdate(datos){
    
    var datos = {
        "_id": datos
    };

    $.ajax({
        url: '/AsignaturaUpdate',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            asignaturaUpdateForm(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });

}

function asignaturaUpdateForm(json) {
    $('#main').html('<h3>Modificar Asignatura:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append("<input id='id' type='number' class='form-control' value=" +json.id+ " />");
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append("<input id='nombre' type='text' class='form-control' value=" +json.nombre+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="ciclo">CICLO:</label>');
    div.append("<input id='ciclo' type='texto' class='form-control' value=" +json.ciclo+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="curso">CURSO:</label>');
    div.append("<input id='curso' type='number' class='form-control' value=" +json.curso+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="horas">HORAS:</label>');
    div.append("<input id='horas' type='number' class='form-control' value=" +json.horas+ " />");
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append("<button onclick='asignaturaPutUpdate()' class='btn btn-success' id='_id' value="+json._id+"> Aceptar </div>");
    form.append(div);
    
    $('#main').append(form);
}

function asignaturaPutUpdate() {

    var datos = {
        "_id" : $('#_id').val(),
        "id" : $('#id').val(),
        "nombre": $('#nombre').val(),
        "ciclo": $('#ciclo').val(),
        "curso": $('#curso').val(),
        "horas": $('#horas').val()       
    };
    $.ajax({
        url: '/AsignaturaUpdate',
        data: datos,
        type: 'PUT',
        dataType: 'json',
        success: function (json) {
            asignaturaUpdate(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function asignaturaDelete(){
    asignaturaRead("del");
}

function asignaturaDel(dato){
    var datos = {
        "_id": dato       
    };
    $.ajax({
        url: '/Asignatura',
        data: datos,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {
            asignaturaRead("del");
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

// =======================================================================================================================


function cargaDatosMatricula(){
    $.ajax({
        url : '/Matricula',
        type : 'GET',
        dataType : 'json',
        success: function(datos){
            var asignaturas = datos[0];
            var alumnos = datos[1];
            matriculaForm(asignaturas, alumnos);
        }
    });
}

function matriculaForm(asignaturas, alumnos){
   $('#main').html('<h3>Matricular Alumno:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="asignatura">ASIGNATURA:</label>');
    var select = $("<select id='asignatura' class='form-control'/>");
    for(var i = 0; i < asignaturas.length; i++){
        select.append('<option class="form-control">'+asignaturas[i].nombre+'</option>');
    }
    div.append(select);
    form.append(div);
    div.append('<label for="alumno">ALUMNO:</label>');
    var select = $("<select id='alumno' class='form-control'/>");
    for(var i = 0; i < alumnos.length; i++){
        select.append('<option class="form-control">'+alumnos[i].nombre+" "+alumnos[i].apellido+'</option>');
    }
    div.append(select);
    form.append(div);
    div.append('<label for="fecha_inicio">FECHA DE MATRICULA:</label>');
    div.append('<input id="fecha_inicio" type="date" class="form-control" required/>');
    form.append(div);
    div.append('<label for="fecha_final">FECHA FIN DE MATRICULA:</label>');
    div.append('<input id="fecha_final" type="date" class="form-control" required/>');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="matriculaPost()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function matriculaPost(){

    var nombreApellido = $("#alumno").val();
    var array = nombreApellido.split(" ");

    var datos = {
        "asignatura" : $('#asignatura').val(),
        "nombre_alumno" : array[0],
        "apellido_alumno" : array[1],
        "fecha_inicio" : $('#fecha_inicio').val(),
        "fecha_final" : $('#fecha_final').val(),
    };

    $.ajax({
        url: '/Matricula',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            matriculaRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function matriculaRead(estado){

    var aqui = estado;

    $.ajax({
        url: '/Asignatura',
        type: 'GET',
        dataType: 'json',
        success: function (asignatura) {
            //console.log(JSON.stringify(json));
            $('#main').html('<h3>Listado Matrículas por asignatura</h3>');
            var div = $('<div />').addClass('form-group');
            var select = $("<select id='asignatura' class='form-control'/>");
            for(var i = 0; i < asignatura.length; i++){
                select.append('<option class="form-control">'+asignatura[i].nombre+'</option>');
            }
            div.append(select);
            div.append('<button onclick="listarMatriculas(\''+aqui+'\')" class="btn btn-success form-control"> Listar </div>');
            $('#main').append(div);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function listarMatriculas(estado){

    var _estado = estado;

    var dato = {
        "asignatura" : $('#asignatura').val()
    }
    $.ajax({
        url : '/ListarMatriculas',
        type : 'POST',
        data : dato,
        dataType : 'json',
        success: function(matriculas){

            var alumnos = [];

            for(var i = 0; i < matriculas.length; i++){
                var dato = {
                        "_id" : matriculas[i].alumno[0]
                    }
                  
                $.ajax({
                    url : '/ObtenerAlumnosPorId',
                    data : dato,
                    type : 'POST',
                    success : function (alumno){
                        alumnos.push(alumno);
                        pintarListado(_estado, matriculas, alumnos);                       
                    }
                });
            }
        }
    });
}

function pintarListado(estado, matriculas, alumnos){
    $('#main').html('<h3>Matrículas</h3>');
    var table = $('<table/>').addClass('table');
    if(estado === "up"){
        table.append($('<tr />').append('<th>NOMBRE ALUMNO</th>', '<th>APELLIDO ALUMNO</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>', '<th></th>'));
    } else if(estado === "del"){ 
        table.append($('<tr />').append('<th>NOMBRE ALUMNO</th>', '<th>APELLIDO ALUMNO</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>', '<th></th>'));
    } else {                           
        table.append($('<tr />').append('<th>NOMBRE ALUMNO</th>', '<th>APELLIDO ALUMNO</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>'));
    }
                    
    if(estado === "up"){  
        for(var i = 0; i < matriculas.length; i++){
            table.append($('<tr />').append('<td>' + alumnos[i].nombre + '</td>',
                '<td>' + alumnos[i].apellido + '</td>', '<td>' + conversorFechas(matriculas[i].fecha_inicio) + '</td>',
                '<td>' + conversorFechas(matriculas[i].fecha_final) + '</td>',
                '<td> <button class="btn btn-success" onclick="matriculaPostUpdate(\''+matriculas[i]._id+'\')">modificar</button></td>'));
        }
    } else if(estado === "del"){
        for(var i = 0; i < matriculas.length; i++){
            table.append($('<tr />').append('<td>' + alumnos[i].nombre + '</td>',
                '<td>' + alumnos[i].apellido + '</td>', '<td>' + conversorFechas(matriculas[i].fecha_inicio) + '</td>',
                '<td>' + conversorFechas(matriculas[i].fecha_final) + '</td>',
                '<td> <button class="btn btn-danger" onclick="matriculaDel(\''+matriculas[i]._id+'\')">borrar</button></td>'));
        }    
    } else {
        for(var i = 0; i < matriculas.length; i++){
            table.append($('<tr />').append('<td>' + alumnos[i].nombre + '</td>',
                '<td>' + alumnos[i].apellido + '</td>', '<td>' + conversorFechas(matriculas[i].fecha_inicio) + '</td>',
                '<td>' + conversorFechas(matriculas[i].fecha_final) + '</td>'));
        } 
    }
    $('#main').append(table);

}

function matriculaUpdate(){
    matriculaRead("up");
}

    
function matriculaPostUpdate(datos){
    
    var datos = {
        "_id": datos
    };

    $.ajax({
        url: '/MatriculaUpdate',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            matriculaUpdateForm(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });

}

function matriculaUpdateForm(matricula){
    var matricula = matricula;

    $.ajax({
        url: '/Asignatura',
        type: 'GET',
        dataType: 'json',
        success: function (asig) {
            var asignaturas = asig;
            $.ajax({
                url: '/Alumno',
                type: 'GET',
                dataType: 'json',
                success: function (alum) {
                    var alumnos = alum;
                    $('#main').html('<h3>Matricular Alumno:</h3>');
                    var form = $('<form />').addClass('table');
                    var div = $('<div />').addClass('form-group');
                    div.append('<label for="asignatura">ASIGNATURA:</label>');
                    var select = $("<select id='asignatura' class='form-control'/>");
                    for(var i = 0; i < asignaturas.length; i++){
                        if(matricula.asignatura[0] === asignaturas[i]._id)
                            select.append('<option class="form-control" selected>'+asignaturas[i].nombre+'</option>');
                        else 
                            select.append('<option class="form-control">'+asignaturas[i].nombre+'</option>');
                    }
                    div.append(select);
                    form.append(div);
                    div.append('<label for="alumno">ALUMNO:</label>');
                    var select = $("<select id='alumno' class='form-control'/>");
                    for(var i = 0; i < alumnos.length; i++){
                        if(matricula.alumno[0] === alumnos[i]._id)
                            select.append('<option class="form-control" selected>'+alumnos[i].nombre+" "+alumnos[i].apellido+'</option>');
                        else
                            select.append('<option class="form-control">'+alumnos[i].nombre+" "+alumnos[i].apellido+'</option>');
                    }
                    div.append(select);
                    form.append(div);
                    div.append('<label for="fecha_inicio">FECHA DE MATRICULA:</label>');
                    div.append('<input id="fecha_inicio" type="date" class="form-control" value = ' + conversorFechas(matricula.fecha_inicio) +' required/>');
                    form.append(div);
                    div.append('<label for="fecha_final">FECHA FIN DE MATRICULA:</label>');
                    div.append('<input id="fecha_final" type="date" class="form-control" value = ' + conversorFechas(matricula.fecha_final) +' required/>');
                    form.append(div);
                    div = $('<div />').addClass('form-group');
                    div.append('<button onclick="matriculaPutUpdate()" class="btn btn-success" value='+ matricula._id +' id="_id"> Aceptar </div>');
                    form.append(div);
    
                    $('#main').append(form);
                }
            });
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function matriculaPutUpdate() {

    var nombreApellido = $("#alumno").val();
    var array = nombreApellido.split(" ");

    var datos = {
        "_id" : $('#_id').val(),
        "asignatura" : $('#asignatura').val(),
        "nombre_alumno" : array[0],
        "apellido_alumno" : array[1],
        "fecha_inicio" : inversorFechas($('#fecha_inicio').val()),
        "fecha_final" : inversorFechas($('#fecha_final').val())
    };

    $.ajax({
        url: '/MatriculaPutUpdate',
        data: datos,
        type: 'PUT',
        dataType: 'json',
        success: function (json) {
            matriculaRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function matriculaDelete(){
    matriculaRead("del");
}

function matriculaDel(dato){

    datos = {
        "_id" : dato
    }

    $.ajax({
        url: '/Matricula',
        data: datos,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {
            matriculaRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });

}

// ========================================================

function cargaDatosAsignacion(){
    $.ajax({
        url : '/Asignacion',
        type : 'GET',
        dataType : 'json',
        success: function(datos){
            var asignaturas = datos[0];
            var profesores = datos[1];
            asignacionForm(asignaturas, profesores);
        }
    });
}

function asignacionForm(asignaturas, profesores){
   $('#main').html('<h3>Asignar Materia a Profesor:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="asignatura">ASIGNATURA:</label>');
    var select = $("<select id='asignatura' class='form-control'/>");
    for(var i = 0; i < asignaturas.length; i++){
        select.append('<option class="form-control">'+asignaturas[i].nombre+'</option>');
    }
    div.append(select);
    form.append(div);
    div.append('<label for="alumno">ALUMNO:</label>');
    var select = $("<select id='profesor' class='form-control'/>");
    for(var i = 0; i < profesores.length; i++){
        select.append('<option class="form-control">'+profesores[i].nombre+" "+profesores[i].apellido+'</option>');
    }
    div.append(select);
    form.append(div);
    div.append('<label for="horas">HORAS:</label>');
    div.append('<input id="horas" type="number" class="form-control" required/>');
    form.append(div);
    div.append('<label for="fecha_inicio">FECHA DE INICIO:</label>');
    div.append('<input id="fecha_inicio" type="date" class="form-control" required/>');
    form.append(div);
    div.append('<label for="fecha_final">FECHA FIN:</label>');
    div.append('<input id="fecha_final" type="date" class="form-control" required/>');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="asignacionPost()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function asignacionPost(){

    var nombreApellido = $("#profesor").val();
    var array = nombreApellido.split(" ");

    var datos = {
        "asignatura" : $('#asignatura').val(),
        "nombre_profesor" : array[0],
        "apellido_profesor" : array[1],
        "horas" : $('#horas').val(),
        "fecha_inicio" : $('#fecha_inicio').val(),
        "fecha_final" : $('#fecha_final').val(),
    };

    $.ajax({
        url: '/Asignacion',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            asignacionRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function asignacionRead(estado){

    var aqui = estado;

    $.ajax({
        url: '/Asignatura',
        type: 'GET',
        dataType: 'json',
        success: function (asignatura) {
            //console.log(JSON.stringify(json));
            $('#main').html('<h3>Listado Matrículas por asignatura</h3>');
            var div = $('<div />').addClass('form-group');
            var select = $("<select id='asignatura' class='form-control'/>");
            for(var i = 0; i < asignatura.length; i++){
                select.append('<option class="form-control">'+asignatura[i].nombre+'</option>');
            }
            div.append(select);
            div.append('<button onclick="listarAsignaciones(\''+aqui+'\')" class="btn btn-success form-control"> Listar </div>');
            $('#main').append(div);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function listarAsignaciones(estado){

    var _estado = estado;

    var dato = {
        "asignatura" : $('#asignatura').val()
    }
    $.ajax({
        url : '/ListarAsignaciones',
        type : 'POST',
        data : dato,
        dataType : 'json',
        success: function(asignaciones){

            var profesores = [];

            for(var i = 0; i < asignaciones.length; i++){
                var dato = {
                        "_id" : asignaciones[i].profesor[0]
                    }
                  
                $.ajax({
                    url : '/ObtenerProfesoresPorId',
                    data : dato,
                    type : 'POST',
                    success : function (profesor){
                        profesores.push(profesor);
                        pintarListadoAsignaciones(_estado, asignaciones, profesores);                       
                    }
                });
            }
        }
    });
}

function pintarListadoAsignaciones(estado, asignaciones, profesores){
    $('#main').html('<h3>Asignaciones</h3>');
    var table = $('<table/>').addClass('table');
    if(estado === "up"){
        table.append($('<tr />').append('<th>NOMBRE PROFESOR</th>', '<th>APELLIDO PROFESOR</th>', '<th>HORAS</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>', '<th></th>'));
    } else if(estado === "del"){ 
        table.append($('<tr />').append('<th>NOMBRE PROFESOR</th>', '<th>APELLIDO PROFESOR</th>', '<th>HORAS</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>', '<th></th>'));
    } else {                           
        table.append($('<tr />').append('<th>NOMBRE PROFESOR</th>', '<th>APELLIDO PROFESOR</th>', '<th>HORAS</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>'));
    }
                    
    if(estado === "up"){  
        for(var i = 0; i < asignaciones.length; i++){
            table.append($('<tr />').append('<td>' + profesores[i].nombre + '</td>',
                '<td>' + profesores[i].apellido + '</td>', '<td>' +asignaciones[i].horas+ '</td>',
                '<td>' + conversorFechas(asignaciones[i].fecha_inicio) + '</td>',
                '<td>' + conversorFechas(asignaciones[i].fecha_final) + '</td>',
                '<td> <button class="btn btn-success" onclick="asignacionesPostUpdate(\''+asignaciones[i]._id+'\')">modificar</button></td>'));
        }
    } else if(estado === "del"){
        for(var i = 0; i < asignaciones.length; i++){
            table.append($('<tr />').append('<td>' + profesores[i].nombre + '</td>',
                '<td>' + profesores[i].apellido + '</td>', '<td>' +asignaciones[i].horas+ '</td>',
                '<td>' + conversorFechas(asignaciones[i].fecha_inicio) + '</td>',
                '<td>' + conversorFechas(asignaciones[i].fecha_final) + '</td>',
                '<td> <button class="btn btn-danger" onclick="asignacionDel(\''+asignaciones[i]._id+'\')">borrar</button></td>'));
        }    
    } else {
        for(var i = 0; i < asignaciones.length; i++){
            table.append($('<tr />').append('<td>' + profesores[i].nombre + '</td>',
                '<td>' + profesores[i].apellido + '</td>', '<td>' +asignaciones[i].horas+ '</td>',
                '<td>' + conversorFechas(asignaciones[i].fecha_inicio) + '</td>',
                '<td>' + conversorFechas(asignaciones[i].fecha_final) + '</td>'));
        } 
    }
    $('#main').append(table);

}

function asignacionUpdate(){
    asignacionRead("up");
}

function asignacionesPostUpdate(datos){
    
    var datos = {
        "_id": datos
    };

    $.ajax({
        url: '/AsignacionUpdate',
        data: datos,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            asignacionUpdateForm(json);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });

}

function asignacionUpdateForm(asignacion){
    var asignacion = asignacion;

    $.ajax({
        url: '/Asignatura',
        type: 'GET',
        dataType: 'json',
        success: function (asig) {
            var asignaturas = asig;
            $.ajax({
                url: '/ProfesorRead',
                type: 'GET',
                dataType: 'json',
                success: function (profe) {
                    var profesores = profe;
                    $('#main').html('<h3>Modificar Asignación Profesor:</h3>');
                    var form = $('<form />').addClass('table');
                    var div = $('<div />').addClass('form-group');
                    div.append('<label for="asignatura">ASIGNATURA:</label>');
                    var select = $("<select id='asignatura' class='form-control'/>");
                    for(var i = 0; i < asignaturas.length; i++){
                        if(asignacion.asignatura[0] === asignaturas[i]._id)
                            select.append('<option class="form-control" selected>'+asignaturas[i].nombre+'</option>');
                        else 
                            select.append('<option class="form-control">'+asignaturas[i].nombre+'</option>');
                    }
                    div.append(select);
                    form.append(div);
                    div.append('<label for="profesor">PROFESOR:</label>');
                    var select = $("<select id='profesor' class='form-control'/>");
                    for(var i = 0; i < profesores.length; i++){
                        if(asignacion.profesor[0] === profesores[i]._id)
                            select.append('<option class="form-control" selected>'+profesores[i].nombre+" "+profesores[i].apellido+'</option>');
                        else
                            select.append('<option class="form-control">'+profesores[i].nombre+" "+profesores[i].apellido+'</option>');
                    }
                    div.append(select);
                    form.append(div);
                    div.append('<label for="horas">HORAS:</label>');
                    div.append('<input id="horas" type="date" class="form-control" value = ' + asignacion.horas +' required/>');
                    form.append(div);
                    div.append('<label for="fecha_inicio">FECHA DE MATRICULA:</label>');
                    div.append('<input id="fecha_inicio" type="date" class="form-control" value = ' + conversorFechas(asignacion.fecha_inicio) +' required/>');
                    form.append(div);
                    div.append('<label for="fecha_final">FECHA FIN DE MATRICULA:</label>');
                    div.append('<input id="fecha_final" type="date" class="form-control" value = ' + conversorFechas(asignacion.fecha_final) +' required/>');
                    form.append(div);
                    div = $('<div />').addClass('form-group');
                    div.append('<button onclick="asignacionPutUpdate()" class="btn btn-success" value='+ asignacion._id +' id="_id"> Aceptar </div>');
                    form.append(div);
    
                    $('#main').append(form);
                }
            });
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function asignacionPutUpdate() {

    var nombreApellido = $("#profesor").val();
    var array = nombreApellido.split(" ");

    var datos = {
        "_id" : $('#_id').val(),
        "asignatura" : $('#asignatura').val(),
        "nombre_profesor" : array[0],
        "apellido_profesor" : array[1],
        "horas" : $('#horas').val(),
        "fecha_inicio" : inversorFechas($('#fecha_inicio').val()),
        "fecha_final" : inversorFechas($('#fecha_final').val())
    };

    $.ajax({
        url: '/AsignacionPutUpdate',
        data: datos,
        type: 'PUT',
        dataType: 'json',
        success: function (json) {
           asignacionRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function asignacionDelete(){
    asignacionRead("del");
}

function asignacionDel(dato){

    datos = {
        "_id" : dato
    }

    $.ajax({
        url: '/Asignacion',
        data: datos,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {
            asignacionRead();
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });

}