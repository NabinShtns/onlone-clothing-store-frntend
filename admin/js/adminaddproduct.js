$(document).ready(function () {
    let imageName = '';
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
    $("#post").on("submit", function (e) {
        e.preventDefault();
        var data = {
            token: localStorage.getItem("token"),
            id: localStorage.getItem("_id"),
            productname: $("#productname").val(),
            price: $("#price").val(),
            brand: $("#brand").val(),
            madein: $("#madein").val(),
            feedid:"5e3cbd9cbd491b4ec16a62b4",
            image: imageName,
            description: $("#description").val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/api/admin/product/',
            data: data,
            dataType: "JSON",
            success: function (response) {
                alert("Product added successfully")
                console.log(response);
                location.href = "./post.html"

            },
            error: function () {
                alert("Product add Failed")
            }
        })

    })
})