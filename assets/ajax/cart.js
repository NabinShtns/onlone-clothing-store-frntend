$(document).ready(function () {
    var id = localStorage.getItem("_id");

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/cart-items/' + id,
        dataType: 'JSON',
        success: function (res) {
            var count = res.cart.length;
            $('#noofcarts').html(count);
            var datas = "";
            $.each(res.cart, function (index) {

                datas += '<li class="header-cart-item">';
                datas += '<div class="header-cart-item-img">';
                datas += '<img src="http://localhost:3000/' + res.cart[index].image + '" alt="IMG">';
                datas += ' </div>';

                datas += '<div class="header-cart-item-txt">';
                datas += '<a href="#" class="header-cart-item-name">';
                datas += res.cart[index].productname;
                datas += '</a>';

                datas += '<span class="header-cart-item-info">';
                datas += '1 x ' + res.cart[index].price + '';
                datas += '</span>';
                datas += '</div>';
                datas += '</li>';
            })
            $("#cartheader").append(datas);
        }
    })
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/cart-total/' + id,
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            $('#totalamount').html("Total: $ " + response.total);
        }
    })

})
