$(document).ready(function() {
    var ordersContainer = document.getElementById("orders");
    var socket = io();
    
    socket.on("create message", function(order) {
        var orderNum = document.createElement("div");
        var orderList = document.createElement("div");
        var orderTimeLeft = document.createElement("div");
        
        orderNum.innerHTML = "#1";
        
        console.log(Object.keys(order)[0], Object.values(order)[0]);
    });
});