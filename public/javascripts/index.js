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
                table.append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>', '<th>email</th>', '<th> </th>'));
            } else {
                table.append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>', '<th>email</th>'));
            }
            
            for (var profe in json) {
                console.log(json);
                if (del === 1) {
                    table.append($('<tr />').append('<td>' + json[profe].id + '</td>',
                        '<td>' + json[profe].nombre + '</td>', '<td>' + json[profe].apellido + '</td>',
                        '<td>' + json[profe].email + '</td>', 
                        '<td> <button class="btn btn-danger" onclick="profesorDel()" value='+json[profe]._id+' id="_id">eliminar</button></td>'));
                } else if (del === 2) {
                    table.append($('<tr />').append('<td>' + json[profe].id + '</td>',
                        '<td>' + json[profe].nombre + '</td>', '<td>' + json[profe].apellido + '</td>',
                        '<td>' + json[profe].email + '</td>', 
                        '<td> <button class="btn btn-sucess" onclick="profesorPostUpdate()" value='+json[3]._id+' id="_id">modificar</button></td>'));
                } else {
                    table.append($('<tr />').append('<td>' + json[profe].id + '</td>',
                        '<td>' + json[profe].nombre + '</td>', '<td>' + json[profe].apellido + '</td>',
                        '<td>' + json[profe].email + '</td>'));
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
    $('#main').html('<h3>Crear nuevo profesor:</h3>');
    var form = $('<form />').addClass('table');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id">ID:</label>');
    div.append('<input id="id" type="number" class="form-control" />');
    form.append(div);
    div.append('<label for="nombre">NOMBRE:</label>');
    div.append('<input id="nombre" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">APELLIDOS:</label>');
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
            profesorRead(0);
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function profesorDel() {

    var datos = {
        "_id": $('#_id').val()        
    };
    $.ajax({
        url: '/ProfesorDelete',
        data: datos,
        type: 'DELETE',
        dataType: 'json',
        success: function (json) {
            profesorRead(1);
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
    profesorRead(1);
}

function profesorUpdate(){
    profesorRead(2);
}

function profesorUpdateForm(json) {
    $('#main').html('<h3>Crear nuevo profesor:</h3>');
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
    div.append("<button onclick='profesorPutUpdate()' class='btn btn-success' id='_id' value="+jason._id+"> Aceptar </div>");
    form.append(div);
    
    $('#main').append(form);
}

function profesorPostUpdate() {

    var datos = {
        "_id": $('#_id').val()        
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
