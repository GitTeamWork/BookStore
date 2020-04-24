$("#form-addproduct").submit((e) => {
    e.preventDefault();
 
    let addproductName = $("#addproductName").val();
    let addprice = $("#addprice").val();
    let addimage = $("#addimage").val();
    let adddetail = $("#adddetail").val();
    let addinventory = $("#addinventory").val();
    let addcatalogId = $("#addcatalogId").val();
    let addpublisherId = $("#addpublisherId").val();
    console.log(e);
    
    let data = { 
      productName: addproductName,
      price: addprice,
      image: addimage,
      detail: adddetail,
      inventory: addinventory,
      catalogId: addcatalogId,
      publisherId: addpublisherId,
    };
    console.log(JSON.stringify(data));
    
    let settings = {
        async: true,
        crossDomain: true,
        url: "http://localhost:9000/api/addProduct",
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "cache-control": "no-cache",
          "postman-token": "b2479ce6-e9bc-65af-1ed7-7b40dfba0b64"
        },
        
        processData: false,
        data: JSON.stringify(data) ,
    };
      $.ajax(settings).done(function (response) {
        try {
            if(response.message == 'Them thanh cong'){
                //console.log(message)
                localStorage.setItem('addproduct', JSON.stringify(response.data))
                location.assign('/Product-admin');
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('Error network!!!-----------------------------------------')
            console.log(erro);
        }
      });
      });
      
     

    