$(document).ready(function () {
    var id = "";
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        id = searchParams.get('id');
    }
    // var feedid = "";
    // var searchParams = new URLSearchParams(window.location.search);
    // if (searchParams.has('feedid')) {
    //     feedid = searchParams.get('feedid');
    // }
    // alert(id)
    var data = {
         userId:localStorage.getItem("_id"),
        productId: id
    }

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/productDetail/' + id,
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            
            $('#prodname').html(response.product.productname);
            $('#product-detail-name').html(response.product.productname);
            $('#prodprice').html(response.product.price);
            $('#proddesc').html(response.product.description);
            $('#prodmadein').html(response.product.madein);
            $('#prodbrand').html(response.product.brand);
            $('.productimage').attr('src', 'http://localhost:3000/' + response.product.image);
            feedid = response.product.feedid;
        }
    })
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/productlistbyfeed/' + "5e3cbd9cbd491b4ec16a62b4",
        dataType: 'JSON',
        success: function (res) {
            console.log(res);
            var datas = "";
            $.each(res.products, function (index) {
                datas += '<div class="item-slick2 p-l-15 p-r-15">';
                datas += '<div class="block2">';
                datas += '<div class="block2-img wrap-pic-w of-hidden pos-relative">';
                datas += '<img src="http://localhost:3000/' + res.products[index].image + '" alt="IMG-PRODUCT" style="width: 270px; height:260px;>';

                datas += '<div class="block2-overlay trans-0-4">';
                datas += '<a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">';
                datas += '<i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>';
                datas += '<i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>';
                datas += '</a>';

                datas += '<div class="block2-btn-addcart w-size1 trans-0-4">';
                datas += '<button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">';
                datas += 'Add to Cart';
                datas += '</button>';
                datas += '</div>';
                datas += '</div>';
                datas += '</div>';

                datas += '<div class="block2-txt p-t-20">';
                datas += '<a href="product-detail.html?id=' + res.products[index]._id + '" class="block2-name dis-block s-text3 p-b-5">';
                datas += res.products[index].productname;
                datas += '</a>';

                datas += '<span class="block2-price m-text6 p-r-5">';
                datas += res.products[index].price;
                datas += '</span>';
                datas += '</div>';
                datas += '</div>';
                datas += '</div>';

            })
            $("#relatedproduct").append(datas);
        }
    })
    $('#addtocart').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/api/cartpost/',
            data: data,
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
            }
        })
    })

})
