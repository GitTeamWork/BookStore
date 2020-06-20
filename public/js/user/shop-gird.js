window.onload = function () {
    let $catalog = $('#ShowCatalog')
    let $catalog2 = $('#ShowCatalog2')
    const LoadCatalog = () => {
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
            $catalog2.html(str)
        });
    }
    LoadCatalog();
    //==============================
    let $publisher = $('#ShowPublisher')
    let $publisher2 = $('#ShowPublisher2')
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
        $publisher2.html(str1)
    });

    let $userName = $('#Showusername')
    let $sumitem = $('#sumItem')
    let $linkcart = $('#linkcart')
    var a = null;
    console.log(a);
    var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
    a = userLogin.userId;
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
                `${item.username}`
            str2 += `<a class="cart__btn" href="cart/${item.userId}">View and edit cart</a>`
        })
        $userName.html(str);
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

    let $showpage = $('#showpage')
    Loadpage = () => {
        var settingsp = {
            async: true,
            url: "/api/page",
            method: "GET",
            headers: {
                "cache-control": "no-cache",
            },
        };
        $.ajax(settingsp).done(function (responsep) {
            console.log(responsep + 'aaaaaaaaaaaaaaaaaaaa');
            let strp = '';
            responsep.map(function (item) {
                console.log(item);
                
                for (i = 1; i <= item.page; i++) {
                    strp += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`;
                  }
                
            })
            $showpage.html(strp)
        })
            .fail(function (err) {
                console.log(err);

            })
    }
    Loadpage();

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?') // Split the string into an array with / as separator
    var last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)
    console.log(last_segment);

    const LoadDataProduct = () => {
        var settings = {
            async: true,
            url: "/api/productList?" + last_segment,
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
        self.total = ko.computed(function () {
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
            self.amount = ko.computed(function () {
                var subtotal = 0;
                $(self.cart()).each(function () {
                    subtotal += this.total();
                    //console.log(cart_item.total());
                });
                return subtotal;
            });
            self.addToCart = function (product, event) {
                console.log(a);
                if (a == null) {
                    location.assign('/login');
                }
                else {
                    var cart_item = new CartItem(product, 1);

                    // Add the CartItem instance to the self.cart (Observable Array)
                    //self.cart.push(cart_item);
                    //console.log([cart_item.product](0));
                    let fcpush = function () {
                        self.cart.push(cart_item);
                        let settings = {
                            type: "POST",
                            url: "/api/addDetail",
                            data: { productId: product.productId, quantity: 1, amount: product.price, userId: a },
                            dataType: "html",
                        };
                        $.ajax(settings).done(function (response) {
                            //console.log(response);
                            try {
                                if (response == 'Them thanh cong') {
                                    try {
                                        LoadSumItem();
                                        alert('Them san pham vao gio hang thanh cong!');
                                    } catch (error) {
                                        console.log(error);
                                    }
                                } else {
                                    alert(response);
                                    LoadSumItem();
                                }
                            } catch (error) {
                                alert('Error network!!!' + error)
                            }
                        });

                        // return $.ajax({
                        //     type: "POST",
                        //     url: "/api/addDetail",
                        //     data: { productId: product.productId, quantity: 1, amount: product.price, userId: 23 },
                        //     dataType: "html",
                        //     success: function (response) {
                        //         console.log(response.message);

                        //         if (response.message == 'Them thanh cong') {
                        //             alert('Them san pham vao gio hang thanh cong!');
                        //             LoadSumItem();
                        //         }
                        //         else {
                        //             alert("San pham da ton tai, vui long update trong gio hang");
                        //             LoadSumItem();
                        //         }
                        //     },
                        //     error: function () {
                        //         alert("Problem communicating with the server");
                        //     }
                        // });
                    }
                    fcpush()
                }

            };
        };

        // Instantiate the ViewModel
        window.view_model = new ViewModel();

        //   // Add some products...
        view_model.products(data);

        // Away we go...
        ko.applyBindings(window.view_model);

    })


    // search in shop girl

    let $test1 = $("#productGird");
    $("body").ready(() => {
        console.log(document.querySelector("#search_mini_form a"));

        $("#search_mini_form > div > div > a").click((e) => {
            e.preventDefault();
            let search = $("#search_mini_form > div > input[type=text]").val();
            let settings = {
                url: "/api/product-admin/search",
                method: "GET",
                data: { name: search },
            };
            $.ajax(settings).done(function (response) {
                let str = "";
                response.map(function (item) {
                    str += `   <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12" data-bind="foreach:products">
      <div class="product__thumb">
          <a class="first__img" href="single-product/${item.productId}"><img src=${item.image} alt="product image"></a>
          <a class="second__img animation1" href="single-product/${item.productId}"><img src=${item.image} alt="product image"></a>
          
      </div>
      <div class="product__content content--center">
          <h4><a href="single-product/${item.productId}">${item.productName}</a></h4>
          <ul class="prize d-flex">
              <li>${item.price}</li>
              <li class="old_prize">${item.oldPrice}</li>
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
                $test1.html(str);
            });
        });
    });


}
