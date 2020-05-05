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
            str += `
    <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12" data-bind="foreach:products">
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



// CLASS Product 
var Product = function(id, name, price) {
    this.productId    = ko.observable(productId);
    this.productName  = ko.observable(productName);
    this.price = ko.observable(price);
  };

  // CLASS CartItem 
var CartItem = function(product, quantity) {
    var self      = this; // Scope Trick
   
    self.product  = ko.observable(product);
    self.quantity = ko.observable(quantity || 1);
   
    self.cost     = ko.computed(function(){
      return self.product().price() * self.quantity();
    });
  };
  // CLASS ViewModel 
var ViewModel = function() {
    var self = this; // Scope Trick
   
    self.cart           = ko.observableArray();
    self.products       = ko.observableArray();
   
    /**
     * Computed Observables
     */
    self.subtotal = ko.computed(function(){
      var subtotal = 0;
      $(self.cart()).each(function(index, cart_item){
        subtotal += cart_item.cost();
      });
      return subtotal;
    });
   
   
   
    self.total = ko.computed(function(){
      return self.subtotal();
    });
   
    /**
     * Actions
     */
    self.addToCart = function(product, event) {
      // Instantiate a new CartItem object using the passed
      // in `Product` object, and then set a quantity of 1.
      var cart_item = new CartItem(product, 1);
   
      // Add the CartItem instance to the self.cart (Observable Array)
      self.cart.push(cart_item);
    };
   
    // self.removeFromCart = function(cart_item, event) {
    //   // Remove the `cart_item` (which is a `CartItem` instance) from self.cart
    //   self.cart.remove(cart_item);
    // };
  };
    
  // Instantiate the ViewModel
//   window.view_model = new ViewModel();
   
//   // Add some products...
//   view_model.products([
//     new Product(1, "Laptop", 1229.99),
//     new Product(2, "Mouse", 14.95),
//     new Product(3, "Keyboard", 29.99),
//     new Product(4, "Monitor", 278.93)
//   ]);
   
  // Away we go...
  ko.applyBindings(new ViewModel());