$(document).ready(function() {
    var orderNum = document.getElementById("order_num");
    var orderList = document.getElementById("order_list");
	var table = document.getElementById("table");
    
    var socket = io();
    
    $.ajax({
        url:"/submit/order",
        type:"post",
        success:function(resp) {
            console.log(resp);
            
            orderNum.innerHTML = resp[0].order_id;
            
            for (var i = 0; i < resp.length; i++) {
				var row = table.insertRow();
				var cel0 = row.insertCell(0);
				var cel1 = row.insertCell(1);
				cel0.innerHTML = resp[i].item_name;
				cel1.innerHTML = resp[i].quantity;
				table.appendChild(row);
//                var ndiv = document.createElement("div");
//                ndiv.innerHTML = resp[i].item_name + " x " + resp[i].quantity;
//                orderList.appendChild(ndiv);
            }
            
            socket.emit("send message", resp);
        }
    })
})