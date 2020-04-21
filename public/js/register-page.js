//register
$("#form-register").submit((e) => {
    e.preventDefault();
    console.log(e);
    let email = $("#Emailrs").val();
    let username = $("#Usernamers").val();
    let password = $("#Passwordrs").val();
    let data = {
      email:email ,
      username: username,
      password: password,
    };
    let settings = {
      async: true,
      url: "/api/signup",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(data) ,
    };
    $.ajax(settings).done(function (response) {
      try {
          if(response.message == 'create account success'){
              alert(response.message)
              localStorage.setItem('userRegister', JSON.stringify(response.data))
              location.assign('/login');
          } else {
              alert(response.message)
          }
      } catch (error) {
          alert('Error network!!!')
      }
    });
  });