$(document).ready(function () {
    mainMenu();
});

function mainMenu() {
    var text ='<div class="jumbotron"><h2>Académica</h2></div>';
    $('#main').html(text);
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
        url: '/Asignatura',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            var asignaturas = json;
            $.ajax({
                url: '/Alumno',
                type: 'GET',
                dataType: 'json',
                success: function (alumnos) {
                    matriculaForm(asignaturas, alumnos);
                }
            });
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
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
    div.append('<input id="fecha_inicio" type="date" class="form-control" />');
    form.append(div);
    div.append('<label for="fecha_final">FECHA FIN DE MATRICULA:</label>');
    div.append('<input id="fecha_final" type="date" class="form-control" />');
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

function matriculaRead(){
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
            div.append('<button onclick="listarMatriculas()" class="btn btn-success form-control"> Listar </div>');
            $('#main').append(div);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function listarMatriculas(){

    var dato = {
        "asignatura" : $('#asignatura').val()
    }

    $.ajax({
        url: '/ObtenerAsignaturaPorNombre',
        data: dato,
        type: 'POST',
        dataType: 'json',
        success: function(asignatura){
            $.ajax({
                url: '/ObtenerMatriculas',
                data : asignatura,
                type : 'POST',
                dataType: 'json',
                success: function(matriculas){
                    $('#main').html('<h3>Matrículas</h3>');
                    var table = $('<table/>').addClass('table');
                    table.append($('<tr />').append('<th>NOMBRE ALUMNO</th>', '<th>APELLIDO ALUMNO</th>', '<th>FECHA INICIO</th>', '<th>FECHA FIN</th>'));
                    for(var i = 0; i < matriculas.length; i++){
                        var array = matriculas[i].fecha_inicio.split("T");
                        var partesFecha = array[0].split("-");
                        var fecha_inicio = partesFecha[1] + "-" + partesFecha[2] + "-" +partesFecha[0];
                        array = matriculas[i].fecha_final.split("T");
                        partesFecha = array[0].split("-");
                        var fecha_final = partesFecha[1] + "-" + partesFecha[2] + "-" +partesFecha[0];                     
                        var dato = {
                                "_id" : matriculas[i].alumno[0]
                            }                  
                        $.ajax({
                            url : '/ObtenerAlumnosPorId',
                            data : dato,
                            type : 'POST',
                            success : function (alumno){                              
                                table.append($('<tr />').append('<td>' + alumno.nombre + '</td>',
                                    '<td>' + alumno.apellido + '</td>', '<td>' + fecha_inicio + '</td>',
                                    '<td>' + fecha_final + '</td>'));
                            }
                        });
                    }
                    $('#main').append(table);
                }
            });
            
        },error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
        
    });
}



