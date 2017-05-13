$(document).ready(function() {
    $.ajax({
        url:"/user-cp",
        type:"post",
        success:function(resp) {
            console.log("a: " + resp);
            var profileLink = document.getElementById("profile_link");
            var logoutLink = document.getElementById("logout_link");

            if (resp.status = "customer") {
                profileLink.style.display = "inline";
                logoutLink.style.display = "inline";
            }
        }
    });
});