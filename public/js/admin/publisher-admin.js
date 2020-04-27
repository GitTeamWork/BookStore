//GET
let $show = $("#ShowPublisher");
const LoadPublisher = () => {
  var settings = {
    async: true,
    url: "/api/publisherList",
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
                            <td>${item.publisherId}</td>
                            <td>${item.publisherName}</td>
                            <td><button onclick="deletePublisher(${item.publisherId})" >Delete</button></td>
                            <td>
                              <form method="GET" action="/updatepublisher-admin/${item.publisherId}">
                                <button>Update</button>
                              </form>
                            </td>
                     </tr>
                     `;
    });
    $show.html(str);
  });
};
LoadPublisher();

//DELETE
const deletePublisher = (idPublisher) => {
  if (confirm(`Are you sure delete publisher id : ${idPublisher}`)) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:9000/api/delPublisher/${idPublisher}`,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      LoadPublisher();
    });
  }
};

//ADD
$("#form-addpublisher").submit((e) => {
  e.preventDefault();

  let addpublisherName = $("#addpublisherName").val();
  console.log(e);

  let data = {
    publisherName: addpublisherName,
  };
  console.log(JSON.stringify(data));

  let settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:9000/api/addPublisher",
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "no-cache",
      "postman-token": "b2479ce6-e9bc-65af-1ed7-7b40dfba0b64"
    },

    processData: false,
    data: JSON.stringify(data),
  };
  $.ajax(settings).done(function (response) {
    try {
      if (response.message == 'Them thanh cong') {
        //console.log(message)
        localStorage.setItem('addpublisher', JSON.stringify(response.data))
        location.assign('/publisher-admin');
      } else {
        alert(response.message)
      }
    } catch (error) {
      alert('Error network!!!')
      console.log(erro);
    }
  });
});

//UPDATE
var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
//alert( last_segment ); // Alert last segment

$("#form-updatepublisher").submit((e) => {
    e.preventDefault();
    
    let updatepublisherName = $("#updatepublisherName").val();
    console.log(e);
    
    let data = { 
      publisherName: updatepublisherName,
    };
    console.log(JSON.stringify(data));
   
    let settings = {
        async: true,
        crossDomain: true,
       
        url: "http://localhost:9000/api/updatePublisher/"+last_segment,
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
                location.assign('/publisher-admin');
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('Error network!!!')
            console.log(erro);
        }
    });
});
      

