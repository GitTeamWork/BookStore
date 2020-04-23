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

let $test = $('#ShowProduct')
var settings = {
    "async": true,
    "url": "/api/productList",
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
                 `<tr>
                        <td>${item.productId}</td>
                        <td>${item.productName}</td>
                        <td>${item.price}</td>
                        <td><img style="width=100px;height:150px" src="${item.image}"></td>
                        <td>${item.detail}</td>
                        <td>${item.inventory}</td>
                        <td>${item.catalogId}</td>
                        <td>${item.publisherId}</td>
                        <td>Delete</td>
                        <td>Update</td>
                        <td>Add</td>
                 </tr>
                 `
         })
     $test.html(str)
  });