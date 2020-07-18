$(document).ready(function() {

    var data = {
        'token': localStorage.getItem("token"),
        '_id': localStorage.getItem("_id"),
    };

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3000/api/profile',
        data: data,
        dataType: 'JSON',
        success: function(response) {
            console.log(response);
            $('#user').html(response.name);
            $('#adminname').html(response.firstname +' '+ response.lastname);
            $('#username').val(response.username);
            $('#email').val(response.email);
            $('#desc').val(response.desc);
            $('#imgProfile').attr('src', 'http://localhost:3000/' + response.image);
        }
    })



})