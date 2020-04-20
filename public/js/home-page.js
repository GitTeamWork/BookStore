// let userLogin = JSON.parse(localStorage.getItem('userLogin'));
// if(userLogin){
//     alert(userLogin.email);
// }

// let $test = $('#testShowAccount')
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