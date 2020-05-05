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
    
var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length - 1];
// GET
let $getproduct1 = $("#singlePoduct1");
let $getproduct2 = $("#singlePoduct2");
const LoadSingleProduct = () => {
    var settings = {
        async: true,
        url: "/api/product/" + last_segment,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settings).done(function (response) {
        //console.log(response);
        let str1 = "";
        let str2 = "";
        response.map(function (item) {
            str1 += `<div class="fotorama wn__fotorama__action" data-nav="thumbs">
            <a href="1.jpg"><img src="${item.image}" alt=""></a>
            <a href="2.jpg"><img src="${item.image}" alt=""></a>
            <a href="3.jpg"><img src="${item.image}" alt=""></a>
            <a href="4.jpg"><img src="${item.image}" alt=""></a>
            <a href="5.jpg"><img src="${item.image}" alt=""></a>
            <a href="6.jpg"><img src="${item.image}" alt=""></a>
            <a href="7.jpg"><img src="${item.image}" alt=""></a>
            <a href="8.jpg"><img src="${item.image}" alt=""></a>
      </div>
      <span id="productid"  style="display: none;" data-bind='value: productId'>${item.productId}</span>
                   `;
            str2 += `<h1>${item.productName}</h1>
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
                <span id="price">${item.price}</span>
            </div>
            <div class="product__overview">
                <p>${item.detail}</p>

            </div>`
        });
        $getproduct1.html(str1);
        $getproduct2.html(str2);
    });
};
LoadSingleProduct();


// var CartLine = function() {
//     var self = this;
//     self.orderId = ko.observable();
//     self.productId = ko.observable();
//     self.quantity = ko.observable();
//     self.amount = ko.observable(parseInt($("#price").text()) * self.quantity);
//     // self.amount = ko.computed(function() {
//     //     return self.product() ? self.product().price * parseInt("0" + self.quantity(), 10) : 0;
//     // });

// };
// var Cart = function() {
//     // Stores an array of lines, and from these, can work out the grandTotal
//     var self = this;
//     self.lines = ko.observableArray([new CartLine()]); // Put one line in by default
//     self.grandTotal = ko.computed(function() {
//         var total = 0;
//         $.each(self.lines(), function() { total += this.amount() })
//         return total;
//     });
 
//     // Operations
//     //self.addLine = function() { self.lines.push(new CartLine()) };
//     //self.removeLine = function(line) { self.lines.remove(line) };
//     self.save = function() {
//         self.lines.push(new CartLine())
//         // var dataToSave = $.map(self.lines(), function(line) {
//         //     return line.product() ? {
//         //         productName: line.product().name,
//         //         quantity: line.quantity()
//         //     } : undefined
//         // });
//         alert("Could now send this to server: " );
//     };
// };
// ko.applyBindings(new Cart());


