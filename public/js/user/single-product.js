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
      `<li><a http://localhost:9000/showproductpublisher/${item1.publisherId}">${item1.publisherName}</a></li>
                   `
  })
  $publisher.html(str1)
});

let $userName = $('#Showusername')
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
    response.map(function (item) {
      str +=
        `${item.username}`
    })
    $userName.html(str)
  });
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
  console.log('okkkkkkkkkk');
  

  let ViewModel = function () {
    let self = this; // Scope Trick
    self.test1 = function (test, eve) {
      alert("ok")
    }

    self.cart = ko.observableArray();
    self.products = ko.observableArray();

    self.item = ko.computed(function () {
      var item = 0;
      $(self.cart()).each(function () {
        item += 1;
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

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)
    self.addToCart = function (product, event) {
      // Instantiate a new CartItem object using the passed
      // in `Product` object, and then set a quantity of 1.
      var qt = $("#qty").val();

      var id = last_segment
      id.toLocaleString();
      console.log(id);
      var cart_item = new CartItem(product, qt);

      // Add the CartItem instance to the self.cart (Observable Array)
      let fcpush = function () {
        self.cart.push(cart_item);
        return $.ajax({
            type: "POST",
            url: "/api/addDetail",
            data: {orderId:1,productId:id,quantity:qt, amount: self.amount},
            dataType: "html",
            success: function(response) {
                alert('Add new product successfully!');
            },
            error: function() {
                alert("Problem communicating with the server");
            }
        });
      }
      fcpush()



      //alert(qt)
      // self.addToCart().done(data => {
      //   console.log(product);

      // })   
    };
  };

  // Instantiate the ViewModel
  window.view_model = new ViewModel();

  //   // Add some products...
  view_model.products(data);

  // Away we go...
  ko.applyBindings(window.view_model);

})

