// GET
$(function () {

    $('input[name="daterange"]').daterangepicker({
        opens: 'left'
    }, function (start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        strFill = `<form method="GET" action="/api/revenueFill">
                    <input hiden="true" type="text" id="start" value="${start.format('YYYY-MM-DD')}" />
                    <input hiden="true" type="text" id="end" value="${end.format('YYYY-MM-DD')}" />
                    <button hiden="false">Fill</button>
                </form>`
    let $fill = $("#formFill")
    $fill.html(strFill);
    
    
    // let $test = $("#ShowRevenue");
    // const LoadRevenue = () => {
    //     var settings = {
    //         async: true,
    //         url: "/api/revenue",
    //         method: "GET",
    //         headers: {
    //             "cache-control": "no-cache",
    //         },
    //     };

    //     $.ajax(settings).done(function (response) {
    //         console.log(response);
    //         let str = "";
    //         response.map(function (item) {
    //             str += `<tr>
    //                           <td>${item.orderId}</td>
    //                           <td>${item.total}</td>
    //                           <td>${item.created}</td>
    //                           <td>${item.status}</td>
    //                           <td>${item.userId}</td>
    //                           <td>${item.address}</td>
    //                    </tr>
    //                    `;
    //         });
    //         $test.html(str);
    //     });
    // };
    // LoadRevenue();
}
    );
});


 let $test = $("#ShowRevenue");
$("#formFill").submit((e) => {
    e.preventDefault();
    console.log(e);
    let start = $("#start").val();
    let end = $("#end").val();
    let startStr = start.toString();
    let endStr = end.toString();
    let settings = {
    url: "/api/revenueFill",
    method: "GET",
    data: {start: start, end: end},
    };
    $.ajax(settings).done(function (response) {
    let str = "";
    response.map(function (item) {
        str += `<tr>
        <td>${item.orderId}</td>
        <td>${item.total}</td>
        <td>${item.created}</td>
        <td>${item.status}</td>
        <td>${item.userId}</td>
        <td>${item.address}</td>
    </tr>`;
    });
    $test.html(str);
    });
});