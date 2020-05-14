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
        let str = '';
        response.map(function (item) {
            str +=
                `${item.username}`
        })
        $userName.html(str)
    });
}
// GET
// let $gird = $("#productGird");
// const LoadProduct = () => {
//     var settings = {
//         async: true,
//         url: "/api/productList",
//         method: "GET",
//         headers: {
//             "cache-control": "no-cache",
//         },
//     };

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         let str = "";
//         response.map(function (item) {
           
//         });
        
//     });
// };



const LoadDataProduct = () => {
    var settings = {
        async: true,
        url: "/api/productList",
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
    self.quantity = ko.observable(quantity || 1);
    //self.item = ko.observable(item || 0);
    self.amount = ko.observable(amount || 0);
    self.total= ko.computed(function(){
      return self.product().price * self.quantity;
    });
};

LoadDataProduct().done(data => {

    let ViewModel = function () {
        let self = this; // Scope Trick

        self.cart = ko.observableArray();
        self.products = ko.observableArray();
        
        self.item = ko.computed(function () {
            var item = 0;
            $(self.cart()).each(function () {
                item += 1;
            });
            return item;
        })
        self.amount = ko.computed(function(){
            var subtotal = 0;
            $(self.cart()).each(function(){
              subtotal += this.total();
              //console.log(cart_item.total());
            });
            return subtotal;
          });

        self.addToCart = function (product, event) {
            // Instantiate a new CartItem object using the passed
            // in `Product` object, and then set a quantity of 1.
            var cart_item = new CartItem(product, 1);

            // Add the CartItem instance to the self.cart (Observable Array)
            self.cart.push(cart_item);
            
            
              
        };
    };

    // Instantiate the ViewModel
    window.view_model = new ViewModel();

    //   // Add some products...
    view_model.products(data);

    // Away we go...
    ko.applyBindings(window.view_model);

})