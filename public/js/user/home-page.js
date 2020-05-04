
 
 window.onload = function() {
  var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
  document.getElementById("testUser").innerHTML = userLogin.email;
  alert(userLogin.email)
 }

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