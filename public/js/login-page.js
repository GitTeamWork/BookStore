// let eleUsername = document.getElementById('username');
// let elePassword = document.getElementById('password');

// document.getElementById('form-login').addEventListener('submit', (event) => {
//     event.preventDefault();
//     let username = eleUsername.value;
//     let password = elePassword.value;
//     console.log(username, password);

// })

$("#form-login").submit((e) => {
  e.preventDefault();
  console.log(e);
  let username = $("#username").val();
  let password = $("#password").val();
  let data = {
    email: username,
    password: password,
  };
  let settings = {
    async: true,
    url: "/api/login",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify(data) ,
  };
  $.ajax(settings).done(function (response) {
    try {
        if(response.message == 'Dang nhap thanh cong'){
            localStorage.setItem('userLogin', JSON.stringify(response.data))
            location.assign('/home');
        } else {
            alert(response.message)
        }
    } catch (error) {
        alert('Error network!!!')
    }
  });
});
