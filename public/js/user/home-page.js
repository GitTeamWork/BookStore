let $catalog = $('#ShowCatalog')
var settings = {
    "async": true,
    "url": "/api/cataList",
    "method": "GET",
    "headers": {
      "cache-control": "no-cache",
    },
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    let str = '';
        response.map(function(item){
            str +=
                 `<li><a href="shop-grid.html">${item.catalogName} </a></li>
                 `
         })
     $catalog.html(str)
  });
//==============================
  let $publisher = $('#ShowPublisher')
  var settings = {
      "async": true,
      "url": "/api/publisherList",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      },
    }
    
    $.ajax(settings).done(function (response1) {
      console.log(response1);
      let str1 = '';
          response1.map(function(item1){
              str1 +=
                   `<li><a href="shop-grid.html">${item1.publisherName}</a></li>
                   `
           })
       $publisher.html(str1)
    });

    let $userName = $('#Showusername')
    window.onload = function() {
     var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
     var a = userLogin.userId;
     console.log(a);
     var settings = {
       "async": true,
       "crossDomain": true,
       "url": "http://localhost:9000/api/user/"+a,
       "method": "GET",
       "headers": {
         "content-type": "application/json",
       },  
     }
     
     $.ajax(settings).done(function (response) {
       console.log(response);
       let str = '';
       response.map(function(item){
         str +=
              `${item.username}`
             })
           $userName.html(str)
     });
    }
    //===================================//==============================
    // GET
let $newProduct = $("#newProduct");
const LoadNewProduct = () => {
    var settings = {
        async: true,
        url: "/api/newProduct",
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let str = "";
        response.map(function (item) {
            str += `
            <div class="product product__style--3" >
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
            <div class="product__thumb">
              <a class="first__img" href="single-product.html"><img style="width:250px; height: 340px" src=${item.image} alt="product image"></a>
              <a class="second__img animation1" href="single-product.html"></a>
              <div class="hot__box">
                <span class="hot-label">BEST SALLER</span>
              </div>
            </div>
            <div class="product__content content--center">
              <h4><a href="single-product.html">${item.productName}</a></h4>
              <ul class="prize d-flex">
                <li>${item.price}</li>
                <li class="old_prize">${item.oldPrice}</li>
              </ul>
              <div class="action">
                <div class="actions_inner">
                  <ul class="add_to_links">
                    <li><a class="cart" href="cart.html"><i class="bi bi-shopping-bag4"></i></a></li>
                    <li><a class="wishlist" href="wishlist.html"><i class="bi bi-shopping-cart-full"></i></a></li>
                    <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li>
                    <li><a data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
                  </ul>
                </div>
              </div>
              <div class="product__hover--content">
                <ul class="rating d-flex">
                  <li class="on"><i class="fa fa-star-o"></i></li>
                  <li class="on"><i class="fa fa-star-o"></i></li>
                  <li class="on"><i class="fa fa-star-o"></i></li>
                  <li><i class="fa fa-star-o"></i></li>
                  <li><i class="fa fa-star-o"></i></li>
                </ul>
              </div>
            </div>
          </div>
          </div>
                   `;
        });
        $newProduct.html(str);
    });
};
LoadNewProduct();

let $productHome = $("#productHome");
const LoadProduct = () => {
    var settingss = {
        async: true,
        url: "/api/productList",
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settingss).done(function (response) {
        console.log(response);
        let strs = "";
        response.map(function (item) {
            strs += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
            <div class="product product__style--3">
              <div class="product__thumb">
                <a class="first__img" href="single-product.html"><img src="${item.image}" alt="product image"></a>
                <a class="second__img animation1" href="single-product.html"><img src="assets/template/images/books/2.jpg" alt="product image"></a>
                <div class="hot__box">
                  <span class="hot-label">BEST SALER</span>
                </div>
              </div>
              <div class="product__content content--center content--center">
                <h4><a href="single-product.html">${item.productName}</a></h4>
                <ul class="prize d-flex">
                  <li>${item.price}</li>
                  <li class="old_prize">${item.oldPrice}</li>
                </ul>
                <div class="action">
                  <div class="actions_inner">
                    <ul class="add_to_links">
                      <li><a class="cart" href="cart.html"><i class="bi bi-shopping-bag4"></i></a></li>
                      <li><a class="wishlist" href="wishlist.html"><i class="bi bi-shopping-cart-full"></i></a></li>
                      <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li>
                      <li><a data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div class="product__hover--content">
                  <ul class="rating d-flex">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
                   `;
        });
        $productHome.html(strs);
    });
};
LoadProduct();

