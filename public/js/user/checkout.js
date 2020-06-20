let $userName = $('#Showusername')
let $linkcart = $('#link')
let $sumitem = $('#sumItem')
let $linkpay = $('#formpay')
let $address = $('#form-add')
var a;
window.onload = function () {
    var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
    a = userLogin.userId;
    //var b=''
    console.log(a);
    strpay = `
                        <div class="cartbox__btn" >
                            <ul class="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between">
                                <li><form action="/pay/${a}" method="POST">
                                <input type="submit" value="BUY WITH PAYPAL">
                                </form></li>
                                <li><form action="/payCOD/${a}" method="POST">
                                <input type="submit" value="BUY WITH COD">
                                </form></li>
                            </ul>
                        </div>
                `
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
        $linkpay.html(strpay)
        // $address.html(straddress)
    });

    $("#formaddress").submit((e) => {
        e.preventDefault();
        let name = $("#form-name").val();
        let city = $("#form-city").val();
        let distric = $("#form-distric").val();
        let street = $("#form-street").val();
        let apartment = $("#form-apartment").val();
        let phone = $("#form-phone").val();
        if (name == '') {
            alert('vui long nhap day du');
        }
        else {
            let data = {
                name: name,
                city: city,
                distric: distric,
                street: street,
                apartment: apartment, 
                phone: phone
            };
            console.log(JSON.stringify(data));
            let settings = {
                async: true,
                crossDomain: true,
                url: "http://localhost:9000/updateaddress/"+a,
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                },
    
                processData: false,
                data: JSON.stringify(data),
            };
            $.ajax(settings).done(function (response) {
                try {
                    if (response.message == 'them thanh cong') {
                        location.assign('/publisher-admin');
                    } else {
                        alert(response.message)
                    }
                } catch (error) {
                    alert('Error network!!!')
                    console.log(erro);
                }
            });
        }
    
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

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var last_segment = url_array[url_array.length - 1];
    const LoadDataCart = () => {

        var settings = {
            async: true,
            url: "/api/getDetail/" + a,
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
        };

        // Instantiate the ViewModel
        window.view_model = new ViewModel();

        //   // Add some products...
        view_model.details(data);

        // Away we go...
        ko.applyBindings(window.view_model);

    })
    LoadDataCart().fail(err => {
        console.log(err + "-----------------");
    })

}
