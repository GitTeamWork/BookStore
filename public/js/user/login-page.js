
var userLogin = new Object();
$("#form-login").submit((e) => {
  e.preventDefault();
  console.log(e);
  let email = $("#email").val();
  let password = $("#password").val();
  let data = {
    email: email,
    password: password,
  };
  let settings = {
    async: true,
    url: "/api/login",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify(data),
  };
  $.ajax(settings).done(function (response) {
    try {
      if (response.message == 'Dang nhap thanh cong') {
        window.localStorage.setItem('userLogin', JSON.stringify(response.data))
        //console.log(response.data);
        
        
        location.assign('/home');
        
      } else {
        alert(response.message)
      }
    } catch (error) {
      alert('Error network!!!' + error)
    }
  });
});

