$(document).ready(function() {
    var orderNum = document.getElementById("order_num");
    var orderList = document.getElementById("order_list");
	var table = document.getElementById("table");
    var socket = io();
    
    $.ajax({
        url:"/submit/order",
        type:"post",
        success:function(resp) {
            
            orderNum.innerHTML = resp.order_id;
            
            for (key in resp) {
                for (items in resp[key].items) {
                    var row = table.insertRow();
                    var cel0 = row.insertCell(0);
                    var cel1 = row.insertCell(1);
                    cel0.innerHTML = items;
                    cel1.innerHTML = resp[key].items[items];
                    table.appendChild(row);
    //                var ndiv = document.createElement("div");
    //                ndiv.innerHTML = resp[i].item_name + " x " + resp[i].quantity;
    //                orderList.appendChild(ndiv)
                }
            }
            
            socket.emit("send message", resp);
        }
    });
    
    socket.on("order up", function(id) {
        for (var i = 0; i < id.length; i++) {
            if (id[i] == getId()) {
                alert("Your order is ready");
            }
        }
    });
    
    socket.on("new order", createCurrentOrders(document.getElementById("current_orders"), order_num));
    
//    This function is for getting the current orders
    $.ajax({
        url: "/submit/getOrdersNums",
        type: "get",
        success: function(resp) {
            getCurrentOrders(document.getElementById("current_orders"), resp);
        }
    });
    
    function createCurrentOrders(div, message) {
        var ndiv = document.createElement("div");
        ndiv.className = "num";
        ndiv.innerHTML = "Order #"+message;

        div.appendChild(ndiv);
    }
    
    function getCurrentOrders(div, arr) {
        for (var i = 0; i < arr.length; i++) {
            var ndiv = document.createElement("div");
            ndiv.className = "num";
            ndiv.innerHTML = "Order #"+arr.orders[i].id;

            div.appendChild(ndiv);
        }
    }
        
    function getId() {
        var id = 0;
        
        $.ajax({
            url: "/getId",
            type: "get",
            success: function(gottenId) {
                id = gottenId;
            }
        });
        
        return id;
    }
});