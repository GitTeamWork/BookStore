// GET
let $gird = $("#productGird");
const LoadProduct = () => {
    var settings = {
        async: true,
        url: "/api/productList",
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let str = "";
        response.map(function (item) {
            str += `<div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
      <div class="product__thumb">
          <a class="first__img" href="single-product/${item.productId}"><img src=${item.image} alt="product image"></a>
          <a class="second__img animation1" href="single-product/${item.productId}"><img src=${item.image} alt="product image"></a>
          <div class="hot__box">
              <span class="hot-label">BEST SALLER</span>
          </div>
      </div>
      <div class="product__content content--center">
          <h4><a href="single-product/${item.productId}">${item.productName}</a></h4>
          <ul class="prize d-flex">
              <li>${item.price}</li>
              <li class="old_prize">$35.00</li>
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
                   `;
        });
        $gird.html(str);
    });
};
LoadProduct();

// GET CATALOG
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
                 `
                  <li><a href="#">${item.catalogName} <span>(3)</span></a></li>
                 `
         })
     $catalog.html(str)
  });

 // GET PUBLISHER
let $publisher = $('#ShowPublisher')
var settings = {
    "async": true,
    "url": "/api/publisherList",
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
                 `
                  <li><a href="#">${item.publisherName} <span>(3)</span></a></li>
                 `
         })
     $publisher.html(str)
  });