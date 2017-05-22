$(document).ready(function() {
    $.get("/public/navbar.html", function(data){
        $("#nav").replaceWith(data);
    });
});