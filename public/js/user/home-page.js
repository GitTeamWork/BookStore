
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
  response.map(function (item) {
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
  response1.map(function (item1) {
    str1 +=
      `<li><a href="http://localhost:9000/showproductpublisher/${item1.publisherId}">${item1.publisherName}</a></li>
                   `
  })
  $publisher.html(str1)
});

let $userName = $('#Showusername')
let $sumitem = $('#sumItem')
let $linkcart = $('#linkcart')
window.onload = function () {
  var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
  var a = userLogin.userId;
  console.log(a);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9000/api/user/" + a,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
    },
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#userid").html(a)

    let str = '';
    let str2 = '';
    response.map(function (item) {
      str +=
        `${item.username}`;
      str2 += `<a class="cart__btn" href="cart/${item.userId}">View and edit cart</a>`;
    })
    $userName.html(str);
    $linkcart.html(str2);
  });
  LoadSumItem = () => {
    var settings1 = {
      async: true,
      url: "/api/sumItem/" + a,
      method: "GET",
      headers: {
        "cache-control": "no-cache",
      },
    };
    $.ajax(settings1).done(function (response1) {
      console.log(response1);
      let str3 = '';
      response1.map(function (item) {
        if (item.sumitem == null) {
          console.log(item.sumitem + "-------------------");
          str3 +=
            `<span class="product_qun">0</span>`;
        }
        else {
          str3 +=
            `<span class="product_qun">${item.sumitem}</span>`;
        }
      })
      $sumitem.html(str3)
    })
      .fail(function (err) {
        console.log(err);

      })
  }
  LoadSumItem();
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
              <a class="first__img" href="${item.link}"><img style="width: 250px; height:370px ;" src=${item.image} alt="product image"></a>
              <a class="second__img animation1" href="${item.link}"></a>
              <div class="hot__box">
                <span class="hot-label">BEST SALLER</span>
              </div>
            </div>
            <div class="product__content content--center">
              <h4><a href="${item.link}">${item.productName}</a></h4>
              <ul class="prize d-flex">
                <li>${item.price}</li>
                <li class="old_prize">${item.oldPrice}</li>
              </ul>
              <div class="action">
                <div class="actions_inner">
                  
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

// GET
let $AllProduct = $("#AllProduct");
const LoadAllProduct = () => {
  var settings = {
    async: true,
    url: "/api/AllProduct",
    method: "GET",
    headers: {
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let str2 = "";
    response.map(function (item) {
      str2 += `
                
                <div  class="col-lg-3 col-md-4 col-sm-6 col-12">
                <div class="product product__style--3">
                <div class="product__thumb">
                  <a class="first__img" href="${item.link}"><img style="height:370px; width: 270px;" src=${item.image}></a>
                  <div class="hot__box">
                    <span class="hot-label">HOT</span>
                  </div>
                </div>
                <div class="product__content content--center">
                  <h4><a href="${item.link}">${item.productName}</a></h4>
                  <ul class="prize d-flex">
                    <li>${item.price}</li>
                    <li class="old_prize">${item.oldPrice}</li>
                  </ul>
                  <div class="action">
                    <div class="actions_inner">
                      
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
    $AllProduct.html(str2);
  });
};
LoadAllProduct();





