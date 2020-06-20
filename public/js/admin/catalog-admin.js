//GET
let $show = $("#ShowCatalog");
const Loadcata = () => {
  var settings = {
    async: true,
    url: "/api/cataList",
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
                            <td>${item.catalogId}</td>
                            <td>${item.catalogName}</td>
                            <td><button onclick="deletecata(${item.catalogId})" >Delete</button></td>
                            <td>
                              <form method="GET" action="/updatecatalog-admin/${item.catalogId}">
                                <button>Update</button>
                              </form>
                            </td>
                     </tr>
                     `;
    });
    $show.html(str);
  });
};
Loadcata();

//DELETE
const deletecata = (catalogId) => {
  if (confirm(`Are you sure delete publisher id : ${catalogId}`)) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:9000/api/delCata/${catalogId}`,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      Loadcata();
    });
  }
};

//ADD
  
$("#form-addcatalog").submit((e) => {
  e.preventDefault();
  let addcatalogName = $("#addcatalogName").val();
  if (addcatalogName == "") {
    alert("vui lòng không để trống thông tin");
  }
  else {
    let data = {
      catalogName: addcatalogName,
    };
  
    console.log(JSON.stringify(data));
  
    let settings = {
      async: true,
      crossDomain: true,
      url: "http://localhost:9000/api/addCate",
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
        if (response.message == "them thanh cong") {
          //console.log(message)
          localStorage.setItem("addcata", JSON.stringify(response.data));
          location.assign("/catalog-admin");
        } else {
          alert(response);
          console.log(response);
          
        }
      } catch (error) {
        alert("Error network!!!");
        console.log(error);
      }
    })
    .fail(function (err) {
      alert("Tên đã bị trùng, vui lòng nhập lại");
    })
  }
  
});
//UPDATE
var full_url = document.URL; // Get current url
var url_array = full_url.split("/"); // Split the string into an array with / as separator
var last_segment = url_array[url_array.length - 1]; // Get the last part of the array (-1)
//alert( last_segment ); // Alert last segment

$("#form-updatecatalog").submit((e) => {
  e.preventDefault();

  let updatecataName = $("#updatecatalogName").val();
  console.log(e);

  let data = {
    catalogName: updatecataName,
  };
  console.log(JSON.stringify(data));

  let settings = {
    async: true,
    crossDomain: true,

    url: "http://localhost:9000/api/updateCata/" + last_segment,
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },

    processData: false,
    data: JSON.stringify(data),
  };
  $.ajax(settings).done(function (response) {
    try {
      if (response.message == "update thanh cong") {
        localStorage.setItem("update", JSON.stringify(response.data));
        location.assign("/catalog-admin");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Error network!!!");
      console.log(erro);
    }
  });
});
