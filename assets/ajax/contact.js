$(document).ready(function() {

    $(".leave-comment").submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/api/contact',
            data: $('.leave-comment').serialize(),
            dataType: "json",
            success: function(response) {
                alert("Successfully Message Send")
                console.log(response);
                location.reload();
            },
            error: function() {}
        })
    })
});