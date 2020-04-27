var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
//alert( last_segment ); // Alert last segment

$("#form-updateproduct").submit((e) => {
    e.preventDefault();
    
    let updateproductName = $("#updateproductName").val();
    let updateprice = $("#updateprice").val();
    let updateimage = $("#updateimage").val();
    let updatedetail = $("#updatedetail").val();
    let updateinventory = $("#updateinventory").val();
    let updatecatalogId = $("#updatecatalogId").val();
    let updatepublisherId = $("#updatepublisherId").val();
    console.log(e);
    
    let data = { 
      productName: updateproductName,
      price: updateprice,
      image: updateimage,
      detail: updatedetail,
      inventory: updateinventory,
      catalogId: updatecatalogId,
      publisherId: updatepublisherId,
    };
    console.log(JSON.stringify(data));
   
    let settings = {
        async: true,
        crossDomain: true,
       
        url: "http://localhost:9000/api/updateProduct/"+last_segment,
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
                location.assign('/Product-admin');
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('Error network!!!')
            console.log(erro);
        }
    });
});
      