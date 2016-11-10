function alumnoPut(){
    var datos = {
        "_id" : $("#_id").val(),
        "id" : $("#id").val(),
        "nombre" : $("#nombre").val(),
        "apellido" : $("#apellido").val(),
        "email" : $("#email").val()      
    };

    $.ajax({
        url : '/AlumnoUpdate',
        type : 'PUT',
        data : datos,
        dataType: 'json',
        success : function(json) {
            $('<h1/>').text(json.title).appendTo('body');
            $('<div class="content"/>')
                .html(json.html).appendTo('body');
        }
    });
}