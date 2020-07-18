$(document).ready(function () {
    var id = localStorage.getItem("_id");

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/cart-items/' + id,
        dataType: 'JSON',
        success: function (res) {
            console.log(res);
            var datas = "";
            $.each(res.cart, function (index) {
                datas += '  <tr class="table-row">';
                datas += '	<td class="column-1">';
                datas += '<div class="cart-img-product b-rad-4 o-f-hidden">';
                datas += '<img src="http://localhost:3000/' + res.cart[index].image + '"alt="IMG-PRODUCT"></div>';
                datas += '</td>';
                datas += '<td class="column-2">' + res.cart[index].productname + '</td>';
                datas += '<td class="column-3">' + res.cart[index].price + '</td>';
                datas += '<td class="column-4 p-l-70"> ';
                datas += "<button  type='button' class='btn btn-danger' id='delete' value=" + res.cart[index]._id + "><i class='fa fa-trash fa-lg' aria-hidden='true'></i></button>";
                datas += '</td>';
                datas += '</tr>';
            })
            $("#carlist").append(datas);
            $("#carlist").on('click', '#delete', function () {
                var prodId = $(this).val();
                var userId = localStorage.getItem("_id");
                $.ajax({
                    type: "PUT",
                    url: "http://127.0.0.1:3000/api/cart-delete/" + userId + "/" + prodId,
                    success: function (responseData, textStatus, jqXHR) {
                        alert("Deleted");
                        window.location.reload();
                        console.log(responseData);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        alert(errorThrown);
                    }

                });
            })
        }
    })
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/cart-total/' + id,
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            $('#subtotal').html("$ " + response.total);
            $('#carttotal').html("$ " + response.total);
        }
    })

})
