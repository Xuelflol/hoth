$(document).ready(function() {
    var ordersContainer = document.getElementById("container");
    var socket = io();
    var kitchenItem = 0;
    
    $.ajax({
        url:"/start-kitchen",
        type:"post",
        success:function(resp) {
            while (kitchenItem < 6) {
                var order = document.createElement("div");
                var orderNum = document.createElement("div");
                var orderList = document.createElement("div");
                var orderTimeLeft = document.createElement("div");

                order.id = "order-" + obj[0].order_id;
                order.className = "item container-fluid";

                orderNum.innerHTML = obj[0].order_id;

                var timeLeft = 0;

                for (var i = 0; i < obj.length; i++) {
                    var orderListDiv = document.createElement("div");
                    orderListDiv.innerHTML = obj[i].item_name + "x " + obj[i].quantity;
                    timeLeft += obj[i].time_left;
                    orderList.appendChild(orderListDiv);
                }
                
                orderTimeLeft.innerHTML = timeLeft;

                order.appendChild(orderNum);
                order.appendChild(orderList);
                order.appendChild(orderTimeLeft);

                ordersContainer.appendChild(order);
            }
            
            kitchenItem++;
        }
    })
    
    socket.on("create message", function(obj) {
        var order = document.createElement("div");
        var orderNum = document.createElement("div");
        var orderList = document.createElement("div");
        var orderTimeLeft = document.createElement("div");
        
        order.id = "order-" + obj[0].order_id;
        order.className = "item container-fluid";
        
        orderNum.innerHTML = obj[0].order_id;
        
        var timeLeft = 0;
        
        for (var i = 0; i < obj.length; i++) {
            var orderListDiv = document.createElement("div");
            orderListDiv.innerHTML = obj[i].item_name + "x " + obj[i].quantity;
            timeLeft += obj[i].time_left;
            orderList.appendChild(orderListDiv);
        }
        
        orderTimeLeft.innerHTML = timeLeft;
        orderTimeLeft.id = "order-timer-" + obj[0].order_id;
        
        order.appendChild(orderNum);
        order.appendChild(orderList);
        order.appendChild(orderTimeLeft);
        
        ordersContainer.appendChild(order);
            
        console.log(obj);
        
        kitchenItem++;
        console.log(kitchenItem);

        var ndiv = document.getElementById("order-" + obj[0].order_id);
        var tdiv = document.getElementById("order-timer-" + obj[0].order_id);
            
        if (ordersContainer.children[1] == ndiv) {
            var countdownTimer = setInterval(countdown, 1000);
        } else {
            console.log("false");
            
            orderTimeLeft.innerHTML = "Pending...";
        }
        
        function countdown() {
            timeLeft--;

            tdiv.innerHTML = timeLeft;
            console.log(timeLeft);
            
            if (timeLeft == 0) {
                clearInterval(countdownTimer);

                ndiv.parentNode.removeChild(ndiv);
                
                kitchenItem--;
            }
        }
    });
    
    function countdown() {
        timeLeft--;

        tdiv.innerHTML = timeLeft;
        console.log(timeLeft);

        if (timeLeft == 0) {
            clearInterval(countdownTimer);

            ndiv.parentNode.removeChild(ndiv);

            kitchenItem--;
        }
        
        return timeLeft;
    }
    
    function checkDiv(orderid, time) {
        var ndiv = document.getElementById("order-" + obj[0].order_id);
        var tdiv = document.getElementById("order-timer-" + obj[0].order_id);

        if (ordersContainer.children[1] == ndiv) {
            tdiv.innerHTML = time;
            
            var countdownTimer = setInterval(countdown, 1000);
        }
    }
    
    function deleteItem() {
        ndiv.parentNode.removeChild("order-" + orderid)
    }
});