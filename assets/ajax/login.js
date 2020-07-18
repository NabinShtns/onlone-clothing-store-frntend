$(document).ready(function () {
    $("#login").submit(function (event) {
        event.preventDefault();
        var data = $('#login').serialize();
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/api/users/login',
            data: data,
            dataType: "json",
            success: function (response) {
                console.log("ressss", response);
                $('#login')[0].reset();
                if (response.success == "Success!") {
                    console.log(response.admin)
                    if (typeof (Storage) !== "undefined") {
                        localStorage.setItem("token", response.token);
                        localStorage.setItem("_id", response.user._id);
                    } else { }
                    if (response.admin == true) {
                        $('<a href="admin/dashboard.html" id="aa"></a>').appendTo("body");
                        document.getElementById("aa").click();
                    } else {
                        $('<a href="user/index.html" id="aa"></a>').appendTo("body");
                        document.getElementById("aa").click();
                        // alert("Login Successfull")
                    }
                } else {
                    alert("Email or Password doesn't match")
                }
            },
            error: function (err) {
                console.log("err", err);
            }
        })
    });

    $("#signup").submit(function (event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/api/users/registration',
            data: $('#signup').serialize(),
            dataType: "json",

            success: function (response) {
                alert("You are registered now");
                $('#signup')[0].reset();
                if (response.success == "You are regestered,You can login now.") {
                    $('<a href="page-login.html" id="aa"></a>').appendTo("body");
                    document.getElementById("aa").click();
                } else {
                    console.log(err);
                }
            },
            error: function () { }
        })
    });

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3000/api/users/profile',
        data: {
            'token': localStorage.getItem("token"),
            '_id': localStorage.getItem("_id"),
        },
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            $('.imgProfile').attr('src', 'http://localhost:3000/' + response.user.image);
        }

    })

});