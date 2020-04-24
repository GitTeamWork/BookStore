// let $test = $('#Showproduct')
// let settings = {
//     "async": true,
//     "url": "/api/userList",
//     "method": "GET",
//     "headers": {
//       "cache-control": "no-cache",
//     }
//   }

// $.ajax(settings).done(function (response) {
//     console.log(response);
//     let str = '';
//     response.map(function(item, index){
//         str += `<p>${index} - ${item.email}</p>`
//     })
//     $test.html(str)
// });

let $test = $("#ShowProduct");
var settings = {
  async: true,
  url: "/api/productList",
  method: "GET",
  headers: {
    "cache-control": "no-cache",
  },
};

const LoadProduct = () => {
  $.ajax(settings).done(function (response) {
    console.log(response);
    let str = "";
    response.map(function (item) {
      str += `<tr>
                          <td>${item.productId}</td>
                          <td>${item.productName}</td>
                          <td>${item.price}</td>
                          <td><img style="width=100px;height:150px" src="${item.image}"></td>
                          <td>${item.detail}</td>
                          <td>${item.inventory}</td>
                          <td>${item.catalogId}</td>
                          <td>${item.publisherId}</td>
                          <td><button onclick="deleteProduct(${item.productId})" >Delete</button></td>
                          <td><button id="update">Update</button></td>
                          <td><a href="http://localhost:9000/addproduct-admin" >Add</a></td>
                   </tr>
                   `;
    });
    $test.html(str);
  });
};
LoadProduct();
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
