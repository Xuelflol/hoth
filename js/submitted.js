$(document).ready(function() {
    var orderNum = document.getElementById("order_num");
    var orderList = document.getElementById("order_list");
    
    var socket = io();
    
    $.ajax({
        url:"/submit/order",
        type:"post",
        success:function(resp) {
            console.log(resp);
            
            orderNum.innerHTML = resp[0].order_id;
            
            for (var i = 0; i < resp.length; i++) {
                var ndiv = document.createElement("div");
                ndiv.innerHTML = resp[i].item_name + " x " + resp[i].quantity;
                orderList.appendChild(ndiv);
            }
            
            socket.emit("send message", resp);
        }
    })
})