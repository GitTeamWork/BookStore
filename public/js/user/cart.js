let $userName = $('#Showusername')
let $linkcart = $('#link')
let $sumitem = $('#sumItem')
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
// let $sumitem = $('#sumItem')
// LoadSumItem = () => {
//     var settings = {
//         async: true,
//         url: "/api/getDetail/"+a,
//         method: "GET",
//         headers: {
//             "cache-control": "no-cache",
//         },
//     };
//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         let str = '';
//         response.map(function (item) {
//             str +=
//                 `<span class="product_qun">${item}</span>`;
//         })
//         $sumitem.html(str)
//     });
// }
// LoadSumItem();
var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var last_segment = url_array[url_array.length - 1];
const LoadDataCart = () => {
    
    var settings = {
        async: true,
        url: "/api/getDetail/" + last_segment,
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
    let ViewModel = function () {
        let self = this; // Scope Trick
        //self.cart = ko.observableArray();
        //self.products = ko.observableArray();
        self.details = ko.observableArray();
        self.subtt = ko.computed(function () {
            var subtotal = 0;
            $(self.details()).each(function () {
                subtotal += this.amount;
            });
            return subtotal;
        });

        self.subam = ko.computed(function () {
            $(self.details()).each(function () {
                //console.log(this.price * this.quantity);
                this.amount = this.price * this.quantity
                return this.amount;
            });
        });
        self.removeFromCart = function (cart_item, event) {
            //var qt = $("#producid").val();
            productid = cart_item.productId
            //console.log(cart_item.productId);

            let fcremove = function () {
                self.details.remove(cart_item);
                return $.ajax({
                    type: "DELETE",
                    url: "/api/delItem",
                    data: { productId: productid },
                    success: function (response) {
                        alert('Xóa sản phẩm thành công!');
                        LoadSumItem();
                    },
                    error: function () {
                        alert("Lỗi xóa sản phẩm");
                    }
                });
            }
            fcremove()
        };
        self.updateCart = function (cart_item, event) {

            self.details().forEach(function (item, index, array) {
                console.log(item);

                let fcupdate = function () {
                    //self.cart.push(cart_item);
                    let settings = {
                        type: "PUT",
                        url: "/api/updateItem/"+last_segment,
                        data: { productId: item.productId, quantity: item.quantity, amount: item.quantity*item.price },
                        dataType: "html",
                    };
                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        try {
                            if (response.message == 'update thanh cong') {
                                try {
                                    LoadSumItem();
                                    alert('Them san pham vao gio hang thanh cong!');
                                } catch (error) {
                                    console.log(error);
                                }
                            } else {
                                alert(response.message);
                                LoadSumItem();
                            }
                        } catch (error) {
                            alert('Error network!!!' + error)
                        }
                    });
                }
                fcupdate()
            });
            

        }
        
    };

    // Instantiate the ViewModel
    window.view_model = new ViewModel();

    //   // Add some products...
    view_model.details(data);

    // Away we go...
    ko.applyBindings(window.view_model);

})
LoadDataCart().fail(err => {
    console.log(err);
})