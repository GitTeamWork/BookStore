let $userName = $('#Showusername')
let $linkcart = $('#link')
window.onload = function () {
    var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
    var a = userLogin.userId;
    //var b=''
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
            str2 += `<a class="cart__btn" href="cart/${item.userId}">View and edit cart</a>`
        })
        $userName.html(str)
        $linkcart.html(str2)
    });
}


const LoadDataCart = () => {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var last_segment = url_array[url_array.length - 1];
    var settings = {
        async: true,
        url: "/api/getDetail/"+last_segment,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    return $.ajax(settings)
}
//LoadDataCart()
var CartItem = function (product, quantity) {
    var self = this; // Scope Trick
  
    self.product = ko.observable(product);
    self.quantity = quantity;
  
    self.total = ko.computed(function () {
      return self.product().price * self.quantity;
    });
  };
  
  LoadDataCart().done(data => {
    console.log('okkkkkkkkkk');
    let ViewModel = function () {
      let self = this; // Scope Trick
      self.test1 = function (test, eve) {
        alert("ok")
      }
      //self.cart = ko.observableArray();
      //self.products = ko.observableArray();
      self.details = ko.observableArray();

      self.removeFromCart = function(cart_item, event) {
        //var qt = $("#producid").val();
        productid=cart_item.productId
        //console.log(cart_item.productId);
        
        let fcremove = function () {
            self.details.remove(cart_item);
            return $.ajax({
                type: "DELETE",
                url: "/api/delItem",
                data: {productId:productid},
                success: function(response) {
                    alert('Add new product successfully!');
                },
                error: function() {
                    alert("Problem communicating with the server");
                }
            });
          }
          fcremove()
      };

     
  
    //   self.item = ko.computed(function () {
    //     var item = 0;
    //     $(self.cart()).each(function () {
    //       item += 1;
    //     });
    //     return item;
    //   })
    //   self.amount = ko.computed(function () {
    //     var subtotal = 0;
    //     $(self.cart()).each(function () {
    //       subtotal += this.total();
    //       //console.log(cart_item.total());
    //     });
    //     return subtotal;
    //   });
  
    //   var full_url = document.URL; // Get current url
    //   var url_array = full_url.split('/') // Split the string into an array with / as separator
    //   var last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)
    //   self.addToCart = function (product, event) {
    //     // Instantiate a new CartItem object using the passed
    //     // in `Product` object, and then set a quantity of 1.
    //     var qt = $("#qty").val();
  
    //     var id = last_segment
    //     id.toLocaleString();
    //     console.log(id);
    //     var cart_item = new CartItem(product, qt);
  
    //     // Add the CartItem instance to the self.cart (Observable Array)
    //     let fcpush = function () {
    //       self.cart.push(cart_item);
    //       return $.ajax({
    //           type: "POST",
    //           url: "/api/addDetail",
    //           data: {orderId:1,productId:id,quantity:qt, amount: self.amount},
    //           dataType: "html",
    //           success: function(response) {
    //               alert('Add new product successfully!');
    //           },
    //           error: function() {
    //               alert("Problem communicating with the server");
    //           }
    //       });
    //     }
    //     fcpush()
  
  
  
    //     //alert(qt)
    //     // self.addToCart().done(data => {
    //     //   console.log(product);
  
    //     // })   
    //   };
    };
  
    // Instantiate the ViewModel
    window.view_model = new ViewModel();
  
    //   // Add some products...
    view_model.details(data);
  
    // Away we go...
    ko.applyBindings(window.view_model);
  
  })
  LoadDataCart().fail(err =>{
      console.log(err);
  })