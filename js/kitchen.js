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

    var ordersDiv = document.getElementById("orders"),
        itemList = document.getElementById("item-list"),
        makeOne = document.getElementById("make1"),
        makeTwo = document.getElementById("make2"),
        makeSix = document.getElementById("make6"),
        controllerDiv = document.getElementById("controller"),
        loadingDiv = document.getElementById("controller_2"),
        percentageSpan = document.getElementById("percentage"),
        loadingBar = document.getElementById("timeout"),
        hotPlate = document.getElementById("hot_plate"),
        perc = 0,
        orderCount = 0,
        totalOrder = 0,
        socket = io();

    // socket connection to listen to orders
    socket.on("create message", function(orders) {
        console.log(orders)
        if (totalOrder < 10) {
            getItems(orders["0"].item_code, orders["0"].items, orders["0"].order_id);
        }

        console.log(orderCount);
        console.log(totalOrder);
    });

    // populate kitchen with pending orders
    $.ajax({
        url:"/start-kitchen",
        type:"post",
        success:function(resp) {
            console.log(resp);

            for (key in resp) {
                if (orderCount < 10) {
                    getItems(resp[key].item_code, resp[key].items, resp[key].order_id);
                }
            }

            console.log(orderCount);
            console.log(totalOrder);
        }
    });

    // function to create "bag" button
    function getItems(item_code, items, order_id) {
        var orderWrapper = document.createElement("div");
        orderWrapper.id = "order-" + order_id;
        orderWrapper.className = "container-fluid alert alert-danger";

        var orderNum = document.createElement("strong");
        orderNum.className = "col-lg-1 col-md-1 col-sm-1 col-xs-1";
        orderNum.innerHTML = "Order #" + order_id;
        orderWrapper.appendChild(orderNum);

        var orderItemWrapper = document.createElement("div");
        orderItemWrapper.className = "items col-lg-8 col-md-8 col-sm-9 col-xs-9";

        var completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.id = "fill-order-" + order_id;
        completeButton.disabled = true;
        completeButton.className = "col-lg-3 col-md-3 col-sm-2 col-xs-2 btn btn-success";
        completeButton.innerHTML = "Fill Order";
        orderWrapper.appendChild(orderItemWrapper);
        orderWrapper.appendChild(completeButton);

        ordersDiv.appendChild(orderWrapper);

        if (orderCount < 10) {
            orderCount++
        }

        totalOrder++;

        for (key in items) {
            var itemDiv = document.createElement("div");
            itemDiv.className = "i";
            itemDiv.innerHTML = items[key] + "x " + key;
            
            var bagButton = document.createElement("button");
            bagButton.className = "btn btn-default";
            bagButton.id = "bag-" + item_code[key] + "-" + order_id;
            bagButton.type = "button";
            bagButton.innerHTML = "Bag";
            itemDiv.appendChild(bagButton);
            orderItemWrapper.appendChild(itemDiv);

            bagClick(item_code[key], order_id, items[key], key)
        }
    }

    function bagClick(ic, oid, qty, name) {
        var getBagButton = document.getElementById("bag-" + ic + "-" + oid);
        var orderid = oid;
        var quantity = qty;
        var item_name = name;
        
        getBagButton.addEventListener("click", function() {
            $.ajax({
                url:"/bag/item",
                type:"post",
                data: {
                    orderid: orderid,
                    item: item_name,
                    quantity: quantity 
                },
                success:function(resp) {
                    console.log(resp);

                    if (resp.status == "fail") {
                        alert("You don't have enough");
                    } else if (resp.status == "success") {
                        var qtyDiv = document.getElementById("qty-" + resp.item_code + "-" + resp.prep_id);
                        var itemDiv = document.getElementById("item-" + resp.item_code + "-" + resp.prep_id);

                        if (resp.quantity > 0) {
                            qtyDiv.innerHTML = "Quantity: " + resp.quantity;
                        } else {
                            itemDiv.parentNode.removeChild(itemDiv);
                        }

                        getBagButton.disabled = true;
                        getBagButton.innerHTML = "Completed";

                        $.ajax({
                            url:"/item/complete",
                            type:"post",
                            data: {
                                orderid: orderid,
                                item: item_name
                            },
                            success:function(resp) {
                                if (resp.status == "success") {
                                    var fillButton = document.getElementById("fill-order-" + resp.orderid);
                                    fillButton.disabled = false;
                                    var orderid = resp.orderid;

                                    fillButton.addEventListener("click", function() {
                                        $.ajax({
                                            url:"/complete/order",
                                            type:"post",
                                            data: {
                                                orderid: orderid
                                            },
                                            success:function(resp) {
                                                console.log(resp);

                                                var orderDiv = document.getElementById("order-" + resp.orderid);
                                                orderDiv.className = "container-fluid alert alert-success alert-dismissable fade in";
                                                fillButton.disabled = true;
                                                var countdown = setInterval(buttonCountdown, 1000);
                                                
                                                var cd = 5;

                                                function buttonCountdown() {
                                                    cd--;

                                                    fillButton.innerHTML = cd + "s...";

                                                    if (cd == 0) {
                                                        clearInterval(countdown);
                                                        orderDiv.parentNode.removeChild(orderDiv);
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    }
                }
            });
        });
    }

    // populate the item drop down list
    $.ajax({
        url:"/get/items",
        type:"post",
        success:function(resp) {
            for (var i = 0; i < resp.result.length; i++) {
                var items = document.createElement("option");
                items.id = resp.result[i].item_code;
                items.value = resp.result[i].item_name;
                items.innerHTML = resp.result[i].item_name;

                itemList.appendChild(items);
            }
        }
    });

    makeOne.addEventListener("click", function() {
        makeItem(1);
    });

    makeTwo.addEventListener("click", function() {
        makeItem(2);
    });

    makeSix.addEventListener("click", function() {
        makeItem(6);
    })

    function makeItem(qty) {
        $.ajax({
            url:"/prepare/item",
            type:"post",
            data: {
                item: itemList.value,
                item_id: itemList.options[itemList.selectedIndex].id,
                quantity: qty
            },
            success:function(resp) {
                controllerDiv.style.display = "none";
                loadingDiv.style.display = "inline";

                var loadingTime = setInterval(loadingAnimation, 1000);

                function loadingAnimation() {
                    perc += 20;

                    percentageSpan.innerHTML = perc + "%";
                    loadingBar.style.width = perc + "%";
                    loadingBar.setAttribute("aria-valuenow", perc);

                    if (perc == 120) {
                        clearInterval(loadingTime);

                        controllerDiv.style.display = "inline";
                        loadingDiv.style.display = "none";

                        var itemWrapper = document.createElement("div");
                        itemWrapper.className = "panel panel-warning";
                        itemWrapper.id = "item-" + resp.item_code + "-" + resp.prep_id;
                        var itemNameWrapper = document.createElement("div");
                        itemNameWrapper.className = "pos panel-heading";
                        itemNameWrapper.innerHTML = resp.item;

                        itemTimer = document.createElement("div");
                        itemTimer.className = "hot-plate-timer";
                        itemTimer.id = "timer-" + resp.item_code + "-" + resp.prep_id;
                        
                        var itemQty = document.createElement("div");
                        itemQty.innerHTML = "Quantity: " + resp.quantity;
                        itemQty.className = "hot-plate-qty";
                        itemQty.id = "qty-" + resp.item_code + "-" + resp.prep_id;

                        itemNameWrapper.appendChild(itemQty);
                        itemNameWrapper.appendChild(itemTimer);
                        itemWrapper.appendChild(itemNameWrapper);
                        hotPlate.appendChild(itemWrapper);

                        var timerDiv = document.getElementById("timer-" + resp.item_code + "-" + resp.prep_id);
                        countdownTimer(timerDiv, resp.item_code, resp.prep_id);

                        perc = 0;
                        percentageSpan.innerHTML = perc + "%";
                        loadingBar.style.width = perc + "%";
                        loadingBar.setAttribute("aria-valuenow", perc);
                    }
                }
            }
        });
    }

    function countdownTimer(timer_div, item_code, id) {
        var duration = 120;

        var cd = setInterval(function() {countdown(timer_div, item_code, id);}, 1000);

        function countdown(timer_div, item_code, id) {
            duration--;
            
            timer_div.innerHTML = "Time: " + duration + "s";

            if (duration == 0) {
                clearInterval(cd);

                $.ajax({
                    url:"/discard/item",
                    type:"post",
                    data: {
                        item: id
                    },
                    success:function(resp) {
                        if (resp == "success") {
                            timer_div.parentNode.parentNode.parentNode.removeChild(timer_div.parentNode.parentNode);
                        }
                    }
                });
            }
        }
    }
});