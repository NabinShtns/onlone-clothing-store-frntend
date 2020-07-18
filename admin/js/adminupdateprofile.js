$(document).ready(function () {

    let imageName = '';
    var id = localStorage.getItem("_id");
    var data = {
        'token': localStorage.getItem("token"),
        '_id': localStorage.getItem("_id"),
    };

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3000/api/profile',
        data: data,
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            $('#adminuser').html(response.firstname + ' ' + response.lastname);
            $('#adminfname').val(response.firstname);
            $('#adminlname').val(response.lastname);
            $('#phoneno').val(response.phoneno);
            $('#adminemail').val(response.email);
            $('#address').val(response.address);
            $('#adminimgProfile').attr('src', 'http://localhost:3000/' + response.image);
        }
    });
    $('#updateuser').on('click', function (e) {
        e.preventDefault();

        if (imageName == '') {
            var dataupdate = {
                'token': localStorage.getItem("token"),
                '_id': localStorage.getItem("_id"),
                'phoneno': $('input[name=phoneno]').val(),
                'email': $('input[name=adminemail]').val(),
                'firstname': $('input[name=adminfname]').val(),
                'lastname': $('input[name=adminlname]').val(),
                'address': $('input[name=address]').val()

            };
        } else {
            var dataupdate = {
                'token': localStorage.getItem("token"),
                '_id': localStorage.getItem("_id"),
                'phoneno': $('input[name=phoneno]').val(),
                'email': $('input[name=email]').val(),
                'firstname': $('input[name=adminfname]').val(),
                'lastname': $('input[name=adminlname]').val(),
                'address': $('input[name=address]').val(),
                'image': imageName
            };
        }

        $.ajax({
            type: 'PUT',
            url: 'http://127.0.0.1:3000/api/userupdate/',
            data: dataupdate,
            success: function (response) {
                console.log(response);
                alert('Updated Succefully')
                window.location.reload();
            },
            error: function () {

                alert(response.name);
            }


        })

    })

    $("#image").on('change', function () {
        let formData = new FormData();
        let files = $("#image").get(0).files;
        if (files.length > 0) {
            formData.append("imageName", files[0]);
        }
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/api/uploadimage',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            dataType: 'JSON',
            success: function (response) {
                imageName = response;
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });


})