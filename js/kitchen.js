$(document).ready(function() {
    var ordersContainer = document.getElementById("container");
    var logout = document.getElementById("logout");
    var socket = io();
    var kitchenItem = 0;
    var status = false;
    
    /*$.ajax({
        url:"/start-kitchen",
        type:"post",
        success:function(resp) {
            if (kitchenItem == 0) {
                var order = document.createElement("div");
                var orderNum = document.createElement("div");
                var orderList = document.createElement("div");
                var orderTimeLeft = document.createElement("div");

                order.id = "order-" + resp[0].order_id;
                order.className = "item container-fluid";

                orderNum.innerHTML = resp[0].order_id;

                var timeLeft = 0;

                for (var i = 0; i < resp.length; i++) {
                    var orderListDiv = document.createElement("div");
                    orderListDiv.innerHTML = resp[i].item_name + "x " + resp[i].quantity;
                    timeLeft += resp[i].time_left;
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
    });*/
    
    socket.on("create message", function(obj) {
        var order = document.createElement("div");
        var orderNum = document.createElement("div");
        var orderList = document.createElement("div");
        var orderTimeLeft = document.createElement("div");
        var timeLeft = 0;
        
        order.id = "order-" + obj[0].order_id;
        order.className = "item container-fluid";
        
        orderNum.innerHTML = obj[0].order_id;
        
        for (var i = 0; i < obj.length; i++) {
            var orderListDiv = document.createElement("div");
            orderListDiv.innerHTML = obj[i].item_name + "x " + obj[i].quantity;
            timeLeft += obj[i].time_left;
            orderList.appendChild(orderListDiv);
        }
        
        orderTimeLeft.innerHTML = timeLeft;
        orderTimeLeft.id = "timer-order-" + obj[0].order_id;
        
        order.appendChild(orderNum);
        order.appendChild(orderList);
        order.appendChild(orderTimeLeft);
        
        ordersContainer.appendChild(order);
        
        kitchenItem++;
        
        check();
    });
    
    function startCountdown() {
        var ndiv = document.getElementById(ordersContainer.children[1].id);
        var tdiv = document.getElementById("timer-" + ordersContainer.children[1].id);
        var duration = parseInt(tdiv.innerHTML);

        var cd = setInterval(countdown, 1000);
        
        function countdown() {
            duration--;

            tdiv.innerHTML = duration;

            if (duration == 0) {
                clearInterval(cd);

                ndiv.parentNode.removeChild(ndiv);

                kitchenItem--;
                status = false;
                
                if (kitchenItem > 0) {
                    check();
                }
            }
        }
    }
    
    function check() {
        var ndiv = document.getElementById(ordersContainer.children[1].id);
        
        if (ordersContainer.children[1] == ndiv && status == false) {
            startCountdown();
            status = true;
        } else {
            return false;
        }
    }
    
    logout.addEventListener("click", function() {
        location.href = "/logout";
    });
    
    /*function checkDiv(orderid, time) {
        var ndiv = document.getElementById("order-" + orderIds[0]);
        var tdiv = document.getElementById("order-timer-" + orderIds[0]);

        if (ordersContainer.children[1] == ndiv) {
            tdiv.innerHTML = time;
            
            var countdownTimer = setInterval(function() {countdown(time, tdiv, ndiv, countdownTimer);}, 1000);
        }
    }*/
    
    /*function deleteItem() {
        ndiv.parentNode.removeChild("order-" + orderid);
    }*/
});