
var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1]; 
// GET
let $getproduct = $("#singlePoduct");
const LoadSingleProduct = () => {
    var settings = {
        async: true,
        url: "/api/product/"+last_segment,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let str = "";
        response.map(function (item) {
            str += `<div class="row">
            <div class="col-lg-6 col-12">
                <div class="wn__fotorama__wrapper">
                    <div class="fotorama wn__fotorama__action" data-nav="thumbs">
                          <a href="1.jpg"><img src=${item.image} alt=""></a>
                          <a href="2.jpg"><img src=${item.image} alt=""></a>
                          <a href="3.jpg"><img src=${item.image} alt=""></a>
                          <a href="4.jpg"><img src=${item.image} alt=""></a>
                          <a href="5.jpg"><img src=${item.image} alt=""></a>
                        
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="product__info__main">
                    <h1>${item.productName}</h1>
                    <div class="product-reviews-summary d-flex">
                        <ul class="rating-summary d-flex">
                            <li><i class="zmdi zmdi-star-outline"></i></li>
                            <li><i class="zmdi zmdi-star-outline"></i></li>
                            <li><i class="zmdi zmdi-star-outline"></i></li>
                            <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                            <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                        </ul>
                    </div>
                    <div class="price-box">
                        <span>${item.price}</span>
                    </div>
                    <div class="product__overview">
                        <p>${item.detail}</p>
                        
                    </div>
                    <div class="box-tocart d-flex">
                        <span>Qty</span>
                        <input id="qty" class="input-text qty" name="qty" min="1" value="1" title="Qty" type="number">
                        <div class="addtocart__actions">
                            <button class="tocart" type="submit" title="Add to Cart">Add to Cart</button>
                        </div>
                        <div class="product-addto-links clearfix">
                            <a class="wishlist" href="#"></a>
                            <a class="compare" href="#"></a>
                        </div>
                    </div>
                    <div class="product_meta">
                        <span class="posted_in">Categories: 
                            <a href="#">Adventure</a>, 
                            <a href="#">Kids' Music</a>
                        </span>
                    </div>
                    <div class="product-share">
                        <ul>
                            <li class="categories-title">Share :</li>
                            <li>
                                <a href="#">
                                    <i class="icon-social-twitter icons"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-social-tumblr icons"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-social-facebook icons"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-social-linkedin icons"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
                   `;
        });
        $getproduct.html(str);
    });
};
LoadSingleProduct();


// GET CATALOG
let $catalog = $('#ShowCatalog')
const Load = () => {
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
};
Load();
