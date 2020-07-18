$(document).ready(function () {
    var data = { //Fetch form data
        token: localStorage.getItem("token"),
        id: localStorage.getItem("_id"),
    };
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/feedlist/',
        data: data,
        dataType: 'JSON',
        success: function (res) {
            console.log(res);
            var datas = "";
            $.each(res.feed, function (index) {
                datas += '<li class="p-t-4">';
                datas += '<a href="#" class="s-text13 active1">';
                datas += res.feed[index].feedname;
                datas += '</a>';
                datas += '</li>';
            })
            $("#categories").append(datas);
        }
    })

})
$.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000/api/productlist/',
    dataType: 'JSON',
    success: function (res) {
        console.log(res);
        var datas = "";
        $.each(res.products, function (index) {
            datas += '<div class="col-sm-12 col-md-6 col-lg-4 p-b-50">';
            datas += '<!-- Block2 -->';
            datas += '<div class="block2">';
            datas += '<div class="block2-img wrap-pic-w of-hidden pos-relative">';
            datas += '<img src="http://localhost:3000/' + res.products[index].image + '" alt="IMG-PRODUCT">';

            datas += '<div class="block2-overlay trans-0-4">';
            datas += '<a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">';
            datas += '<i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>';
            datas += '<i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>';
            datas += '</a>';

            datas += '<div class="block2-btn-addcart w-size1 trans-0-4">';
            datas += '<!-- Button -->';
            datas += '<button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">';
            datas += 'Add to Cart';
            datas += '</button>';
            datas += '</div>';
            datas += '</div>';
            datas += '</div>';

            datas += '<div class="block2-txt p-t-20">';
            datas += '<a href="product-detail.html?id='+res.products[index]._id +'"  class="block2-name dis-block s-text3 p-b-5">';
            datas += res.products[index].productname;
            datas += '</a>';

            datas += '<span class="block2-price m-text6 p-r-5">';
            datas += res.products[index].price;
            datas += '</span>';
            datas += '</div>';
            datas += '</div>';
            datas += '</div>';

        })
        $("#allproduct").append(datas);
    }
})
