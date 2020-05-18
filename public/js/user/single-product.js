let $catalog = $('#ShowCatalog')
var settingsCa = {
  "async": true,
  "url": "/api/cataList",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
  },
}

$.ajax(settingsCa).done(function (response) {
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

var settingsPu = {
  "async": true,
  "url": "/api/publisherList",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
  },
}

$.ajax(settingsPu).done(function (response1) {
  console.log(response1);
  let str1 = '';
  
  response1.map(function (item1) {
    str1 +=
      `<li><a http://localhost:9000/showproductpublisher/${item1.publisherId}">${item1.publisherName}</a></li>
                   `
                  
  })
  $publisher.html(str1)
  
});

let $userName = $('#Showusername')
let $linkcart = $('#linkcart')
let $sumitem = $('#sumItem')
window.onload = function () {
  var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
  var a = userLogin.userId;
  console.log(a);

  var settingsU = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9000/api/user/" + a,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
    },
  }

  $.ajax(settingsU).done(function (response) {
    console.log(response);
    $("#userid").html(a)
    let strU = '';
    let str2 = '';
    response.map(function (item) {
      strU +=
        `${item.username}`;
        str2 += `<a class="cart__btn" href="cart/${item.userId}">View and edit cart</a>`
    })
    $userName.html(strU)
    $linkcart.html(str2)
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
        str3 +=
          `<span class="product_qun">${item.sumitem}</span>`;
      })
      $sumitem.html(str3)
    })
      .fail(function (err) {
        console.log(err);

      })
  }
  LoadSumItem();
}
var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length - 1];
// GET
// let $getproduct1 = $("#singlePoduct1");
// let $getproduct2 = $("#singlePoduct2");
// const LoadSingleProduct = () => {
//     var settings = {
//         async: true,
//         url: "/api/product/" + last_segment,
//         method: "GET",
//         headers: {
//             "cache-control": "no-cache",
//         },
//     };

//     return $.ajax(settings).done(function (response) {
//         //console.log(response);
//         let str1 = "";
//         let str2 = "";
//         response.map(function (item) {
//             str1 += `<div class="fotorama wn__fotorama__action" data-nav="thumbs">
//             <a href="1.jpg"><img src="${item.image}" alt=""></a>
//             <a href="2.jpg"><img src="${item.image}" alt=""></a>
//             <a href="3.jpg"><img src="${item.image}" alt=""></a>
//             <a href="4.jpg"><img src="${item.image}" alt=""></a>
//             <a href="5.jpg"><img src="${item.image}" alt=""></a>
//             <a href="6.jpg"><img src="${item.image}" alt=""></a>
//             <a href="7.jpg"><img src="${item.image}" alt=""></a>
//             <a href="8.jpg"><img src="${item.image}" alt=""></a>
//       </div>
//       <span id="productid"  style="display: none;" data-bind='value: productId'>${item.productId}</span>
//                    `;
//             str2 += `<h1>${item.productName}</h1>
//             <div class="product-reviews-summary d-flex">
//                 <ul class="rating-summary d-flex">
//                     <li><i class="zmdi zmdi-star-outline"></i></li>
//                     <li><i class="zmdi zmdi-star-outline"></i></li>
//                     <li><i class="zmdi zmdi-star-outline"></i></li>
//                     <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
//                     <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
//                 </ul>
//             </div>
//             <div class="price-box">
//                 <span id="price">${item.price}</span>
//             </div>
//             <div class="product__overview">
//                 <p>${item.detail}</p>

//             </div>`
//         });
//         $getproduct1.html(str1);
//         $getproduct2.html(str2);
//     });
// };
//LoadSingleProduct();


const LoadSingleProduct = () => {
  var settings = {
    async: true,
    url: "/api/product/" + last_segment,
    method: "GET",
    headers: {
      "cache-control": "no-cache",
    },
  };

  return $.ajax(settings)
}
// CLASS CartItem 
var CartItem = function (product, quantity) {
  var self = this; // Scope Trick

  self.product = ko.observable(product);
  self.quantity = quantity;
  self.total = ko.computed(function () {
    return self.product().price * self.quantity;
  });
};

LoadSingleProduct().done(data => {

  let ViewModel = function () {
    let self = this; // Scope Trick
    self.cart = ko.observableArray();
    self.products = ko.observableArray();

    self.item = ko.computed(function () {
      var item = 0;
      $(self.cart()).each(function () {
        item += parseInt(this.quantity);
      });
      return item;
    })
    self.amount = ko.computed(function () {
      var subtotal = 0;
      $(self.cart()).each(function () {
        subtotal += this.total();
        //console.log(cart_item.total());
      });
      return subtotal;
    });
    var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
    var a = userLogin.userId;
    console.log(a);

    
    self.addToCart = function (product, event) {
      var qt = $("#qty").val();
      //id.toLocaleString();
      console.log(id);
      var cart_item = new CartItem(product, qt);

      // Add the CartItem instance to the self.cart (Observable Array)
      let fcpush = function () {
        self.cart.push(cart_item);
        return $.ajax({
          type: "POST",
          url: "/api/addDetail",
          data: { productId: product.productId, quantity: qt, amount: self.amount, userId: a },
          dataType: "html",
          success: function (response) {
            alert('Add new product successfully!');
            console.log(response);
            (response);
            LoadSumItem();
          },
          error: function () {
            console.log(response);
            alert("Problem communicating with the server");
          }
        });
      }
      fcpush()
    };
  };

  // Instantiate the ViewModel
  window.view_model = new ViewModel();

  //   // Add some products...
  view_model.products(data);

  // Away we go...
  ko.applyBindings(window.view_model);

})

