var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
//alert( last_segment ); // Alert last segment


let $getproductpublisher = $("#showproductpublisher");
const LoadSingleProduct = () => {
    var settings = {
        async: true,
        url: "/api/productpublisherId/"+last_segment,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let str = "";
        response.map(function (item) {
            str += `  <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12" data-bind="foreach:products">
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
        </div>`;
        });
        $getproductpublisher.html(str);
    });
};
LoadSingleProduct();


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
                 `<li><a href="http://localhost:9000/showproductcatalog/${item.catalogId}">${item.catalogName} </a></li>
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
                   `<li><a href= "http://localhost:9000/showproductpublisher/${item1.publisherId}">${item1.publisherName}</a></li>
                   `
           })
       $publisher.html(str1)
    });