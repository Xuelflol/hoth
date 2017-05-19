$(document).ready(function() {
/*    var ordersContainer = document.getElementById("container");
    var logout = document.getElementById("logout");
    var socket = io();
    var kitchenItem = 0;
    var status = false;
    
    $.ajax({
        url:"/start-kitchen",
        type:"post",
        success:function(resp) {
            console.log(resp);
            
            if (kitchenItem == 0) {
                for (key in resp) {
                    var order = document.createElement("div");
                    var orderNum = document.createElement("div");
                    var orderList = document.createElement("div");
                    var orderTimeLeft = document.createElement("div");

                    order.id = "order-" + resp[key].order_id;
                    order.className = "item container-fluid";

                    orderNum.innerHTML = resp[key].order_id;

                    var timeLeft = 0;

                    //for (var i = 0; i < resp[key].item_name.length; i++) {
                    for (items in resp[key].items) {
                        var orderListDiv = document.createElement("div");
                        orderListDiv.innerHTML = items + "x " + resp[key].items[items];
                        timeLeft = resp[key].time_left;
                        orderList.appendChild(orderListDiv);
                    }

                    orderTimeLeft.innerHTML = timeLeft;
                    orderTimeLeft.id = "timer-order-" + resp[key].order_id;

                    order.appendChild(orderNum);
                    order.appendChild(orderList);
                    order.appendChild(orderTimeLeft);

                    ordersContainer.appendChild(order);
                    
                    kitchenItem++;
                    console.log(kitchenItem);
                }
            }
            
            check();
        }
    });
    
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
        console.log(kitchenItem);
        
        check();
    });
    
    function startCountdown() {
        var ndiv = document.getElementById(ordersContainer.children[1].id);
        var tdiv = document.getElementById("timer-" + ordersContainer.children[1].id);
        var orderid = ordersContainer.children[1].id;
        var duration = parseInt(tdiv.innerHTML);
        
        console.log(orderid);

        var cd = setInterval(countdown, 1000);
        
        function countdown() {
            duration--;

            tdiv.innerHTML = duration;

            if (duration == 0) {
                clearInterval(cd);

                ndiv.parentNode.removeChild(ndiv);
                var orderDigit = splitString(orderid);
                console.log(orderDigit);
                
                $.ajax({
                    url:"/order/complete",
                    type:"post",
                    data: {
                        orderid: orderDigit
                    },
                    success:function(resp) {
                        var orderStatus = document.getElementById("order-status");
                        
                        orderStatus.innerHTML = "Order #" + resp.orderid + " is complete.";
                    }
                });

                kitchenItem--;
                console.log(kitchenItem);
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
    
    function splitString(string) {
        var stringArray = string.split("-");
        var sliceArray = stringArray.slice(-1)
        
        return sliceArray[0];
    }
    
    logout.addEventListener("click", function() {
        location.href = "/logout";
    });*/
    
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

    var orderNum = 0;
    var socket = io();

    if (orderNum == 0) {
        $.ajax({
            url:"/start-kitchen",
            type:"post",
            success:function(resp) {
                console.log(resp);
            }
        })
    }
});