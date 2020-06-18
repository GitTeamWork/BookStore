//GET
let $show = $("#Showuser");
const LoadUser = () => {
  var settings = {
    async: true,
    url: "/api/userList",
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
                            <td>${item.userId}</td>
                            <td>${item.email}</td>
                            <td>${item.username}</td>
                            <td>${item.fullname}</td>
                            <td>${item.password}</td>
                            <td>${item.phone}</td>
                            <td>${item.status}</td>
                            <td><button onclick="deleteUser(${item.userId})" >Delete</button></td>
                            <td>
                              <form method="GET" action="/updateUser-admin/${item.userId}">
                                <button>Update</button>
                              </form>
                            </td>
                     </tr>
                     `;
    });
    $show.html(str);
  });
};
LoadUser();

//DELETE
const deleteUser = (userId) => {
  if (confirm(`Are you sure delete User id : ${userId}`)) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:9000/api/delUser/${userId}`,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      LoadUser();
    });
  }
};

//ADD chua lam add chua lamf add nha 
$("#form-addpublisher").submit((e) => {
  e.preventDefault();
  let addpublisherName = $("#addpublisherName").val();
  console.log(e);
  if(addpublisherName=='')
  {
    alert('không có publisher để thêm');
  }
  else{
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
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
  
      processData: false,
      data: JSON.stringify(data),
    };
    $.ajax(settings).done(function (response) {
      try {
        if (response.message == 'them thanh cong') {
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
  }
 
});

//UPDATE


let $getproduct = $("#str");
const LoadgetUser = () => {
  var full_url = document.URL; // Get current url
  var url_array = full_url.split('/') // Split the string into an array with / as separator
  var last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)
  //alert( last_segment ); // Alert last segment
  var settings = {
    async: true,
    url: "/api/user/" + last_segment,
    method: "GET",
    headers: {
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {

    let str = "";
    response.map(function (item) {

      str += `   <div class="form-group">
      <label for="updateEmail">Email</label>
      <input class="input-css" type="text" value="${item.email}" id="updateEmail" disabled>
  </div>
  <div class="form-group">
      <label for="updateUsername">Username</label>
      <input style="margin-left: 37px !important;" class="input-css" type="text" value="${item.username}" id="updateUsername" disabled>
  </div>
      
  <div class="form-group">
      <label for="updateFullname">Fullname</label>
      <input style="margin-left: 45px !important;" class="input-css" type="text" value="${item.fullname}" id="updateFullname">
  </div>
  <div class="form-group">
      <label for="updatePassword">Password</label>
      <input style="margin-left: 43px !important;" class="input-css" type="text" value="${item.password}" id="updatePassword">
  </div>
  <div class="form-group">
      <label for="updatePhone">Phone</label>
      <input style="margin-left: 64px !important;" class="input-css" type="text" value="${item.phone}" id="updatePhone" >
  </div>
  <div class="form-group">
      <label for="updateStatus">Status</label>
      <input style="margin-left: 66px !important;" class="input-css" type="text" value="${item.status}" id="updateStatus" disabled>
  </div>
<button type="submit" class="button-css" id = " button">Update User</button>
        `;
    });
    $getproduct.html(str);
  });
};

LoadgetUser();



//update
var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
//alert( last_segment ); // Alert last segment
$("#form-updateUser").submit((e) => {
    e.preventDefault();
    
    let updateEmail = $("#updateEmail").val();
    let updateUsername = $("#updateUsername").val();
    let updateFullname = $("#updateFullname").val();
    let updatePassword = $("#updatePassword").val();
    let updatePhone = $("#updatePhone").val();
    let updateStatus = $("#updateStatus").val();

    console.log(e);
    
    let data = { 
        email: updateEmail,
        username: updateUsername,
        fullname: updateFullname,
        password: updatePassword,
        phone: updatePhone,
        status: updateStatus
    };
    console.log(JSON.stringify(data));
   
    let settings = {
        async: true,
        crossDomain: true,
        url: "http://localhost:9000/api/updateUser/"+last_segment,
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
                location.assign('/user-admin');
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('Error network!!!')
            console.log(erro);
        }
    });
});



      

