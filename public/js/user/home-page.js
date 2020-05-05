

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
          response1.map(function(item1){
              str1 +=
                   `<li><a href="shop-grid.html">${item1.publisherName}</a></li>
                   `
           })
       $publisher.html(str1)
    });

    let $userName = $('#Showusername')
    window.onload = function() {
     var userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
     var a = userLogin.userId;
     console.log(a);
     var settings = {
       "async": true,
       "crossDomain": true,
       "url": "http://localhost:9000/api/user/"+a,
       "method": "GET",
       "headers": {
         "content-type": "application/json",
       },  
     }
     
     $.ajax(settings).done(function (response) {
       console.log(response);
       let str = '';
       response.map(function(item){
         str +=
              `${item.username}`
             })
           $userName.html(str)
     });
    }
    //===================================//==============================