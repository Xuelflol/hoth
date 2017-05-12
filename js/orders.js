$(document).ready(function() {
    var submitButton = document.getElementById("order-submit-btn");
    var socket = io();
    var orders = {"han_burger": 3, "lightsabre_fries": 4};

    submitButton.addEventListener("click", function() {
        socket.emit("send message", orders);
        
        console.log("orders submitted");
    });
});