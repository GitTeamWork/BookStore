
// GET
let $test = $("#ShowProduct");
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
      str += `<tr>
                          <td>${item.productId}</td>
                          <td>${item.productName}</td>
                          <td>${item.price}</td>
                          <td>${item.oldPrice}</td>
                          <td><img style="width=100px;height:150px" src="${item.image}"></td>
                          <td>${item.detail}</td>
                          <td>${item.inventory}</td>
                          <td>${item.catalogId}</td>
                          <td>${item.publisherId}</td>
                          <td><button onclick="deleteProduct(${item.productId})" >Delete</button></td>
                          <td>
                            <form method="GET" action="/updateproduct-admin/${item.productId}">
                              <button>Update</button>
                            </form>
                          </td>
                          
                   </tr>
                   `;
    });
    $test.html(str);
  });
};
LoadProduct();

//DELETE
const deleteProduct = (idProduct) => {
  if (confirm(`Are you sure delete product id : ${idProduct}`)) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:9000/api/delProduct/${idProduct}`,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      LoadProduct();
    });
  }
};

//ADD
$("#form-addproduct").submit((e) => {
  e.preventDefault();

  let addproductName = $("#addproductName").val();
  let addprice = $("#addprice").val();
  let addoldPrice = $("#addoldPrice").val();
  let addimage = $("#addimage").val();
  let adddetail = $("#adddetail").val();
  let addinventory = $("#addinventory").val();
  let addcatalogId = $("#addcatalogId").val();
  let addpublisherId = $("#addpublisherId").val();
  console.log(e);
  
  let data = { 
    productName: addproductName,
    price: addprice,
    oldPrice: addoldPrice,
    image: addimage,
    detail: adddetail,
    inventory: addinventory,
    catalogId: addcatalogId,
    publisherId: addpublisherId,
  };
  console.log(JSON.stringify(data));
  
  let settings = {
      async: true,
      crossDomain: true,
      url: "http://localhost:9000/api/addProduct",
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "cache-control": "no-cache",
        "postman-token": "b2479ce6-e9bc-65af-1ed7-7b40dfba0b64"
      },
      
      processData: false,
      data: JSON.stringify(data) ,
  };
    $.ajax(settings).done(function (response) {
      try {
          if(response.message == 'Them thanh cong'){
              //console.log(message)
              localStorage.setItem('addproduct', JSON.stringify(response.data))
              location.assign('/Product-admin');
          } else {
              alert(response.message)
          }
      } catch (error) {
          alert('Error network!!!-----------------------------------------')
          console.log(erro);
      }
    });
    });
    
//UPDATE
var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
//alert( last_segment ); // Alert last segment


let $getproduct = $("#form-updateproduct");
const LoadSingleProduct = () => {
    var settings = {
        async: true,
        url: "/api/product/"+last_segment,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        let str = "";
        response.map(function (item) {
            str += `  <div class="form-group">
            <label class="col-sm-2">productName</label>
            <input class="input-css" type="text" id="updateproductName" value="${item.productName}">
        </div>
        <div class="form-group">
            <label class="col-sm-2">price</label>
            <input class="input-css" type="text" id="updateprice" value="${item.price}">
        </div>
        <div class="form-group">
            <label class="col-sm-2">image</label>
            <input class="input-css" type="text" id="updateimage" value="${item.image}">
        </div>
        <div class="form-group">
            <label class="col-sm-2">detail</label>
            <input class="input-css" type="text" id="updatedetail" value="${item.detail}">
        </div>
        <div class="form-group">
            <label class="col-sm-2">inventory</label>
            <input class="input-css" type="text" id="updateinventory" value="${item.inventory}">
        </div>
        <div class="form-group">
            <label class="col-sm-2">catalogId</label>
            <input class="input-css" type="text" id="updatecatalogId" value="${item.catalogId}">
        </div>
        <div class="form-group">
            <label class="col-sm-2">publisherId</label>
            <input class="input-css" type="text" id="updatepublisherId" value="${item.publisherId}">
        </div> 
        <button type="submit" class="button-css" id=" button">Update sản phẩm</button>`;
        });
        $getproduct.html(str);
    });
};
LoadSingleProduct();



//
$("#form-updateproduct").submit((e) => {
    e.preventDefault();
    
    let updateproductName = $("#updateproductName").val();
    let updateprice = $("#updateprice").val();
    let updateimage = $("#updateimage").val();
    let updatedetail = $("#updatedetail").val();
    let updateinventory = $("#updateinventory").val();
    let updatecatalogId = $("#updatecatalogId").val();
    let updatepublisherId = $("#updatepublisherId").val();
    console.log(e);
    
    let data = { 
      productName: updateproductName,
      price: updateprice,
      image: updateimage,
      detail: updatedetail,
      inventory: updateinventory,
      catalogId: updatecatalogId,
      publisherId: updatepublisherId,
    };
    console.log(JSON.stringify(data));
   
    let settings = {
        async: true,
        crossDomain: true,
       
        url: "http://localhost:9000/api/updateProduct/"+last_segment,
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        
        processData: false,
        data: JSON.stringify(data) ,
    };
      $.ajax(settings).done(function (response) {
        try {
            if(response.message == 'update thanh cong'){
                localStorage.setItem('update', JSON.stringify(response.data))
                location.assign('/Product-admin');
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('Error network!!!')
            console.log(erro);
        }
    });
});