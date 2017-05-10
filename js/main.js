$(document).ready(function() {    
    var signInButton = document.getElementById("sign_in");
    var appetizers = document.getElementById("appetizers");
    var desserts = document.getElementById("desserts");
    var drinks = document.getElementById("drinks");
    var meals = document.getElementById("meals");
    var mealsDiv = document.getElementById("meals_div");
    var appetizersDiv = document.getElementById("appetizers_div");
    var dessertsDiv = document.getElementById("desserts_div");
    var drinksDiv = document.getElementById("drinks_div");
    var holderDiv = document.getElementById("holder");
    
    var app_digit = 0;
    var bev_digit = 0;
    var meals_digit = 0;
    var des_digit = 0;
    
    var orders = {};
    var total_price = 0;
    
    /* function updateQuantity(item, qty, price) {
        if (!(item in orders)) {
            orders[item] = parseInt(qty);
        } else if (item in orders) {
            orders[item] = orders[item] + parseInt(qty);
        }     
        
        var qtyupdate = document.getElementById("qcount_" + item);
        
        if (qtyupdate != null) {
            qtyupdate.innerHTML = orders[item];
        }
        
        total_price = total_price + qty * price;
        console.log(total_price);
    }*/

    $.ajax({
        url:"/meals",
        type:"post",
        success:function(resp) {
            for (var i = 0; i < resp.length; i++) {
                createItem(i, meals, resp[i].item_name, resp[i].item_code, resp[i].price, resp[i].filename, resp[i].description)
            }
        }
    });
    
    $.ajax({
        url:"/appetizers",
        type:"post",
        success:function(resp) {
            for (var i = 0; i < resp.length; i++) {
                createItem(i, appetizers, resp[i].item_name, resp[i].item_code, resp[i].price, resp[i].filename, resp[i].description)
            }
        }
    });
    
    $.ajax({
        url:"/drinks",
        type:"post",
        success:function(resp) {
            for (var i = 0; i < resp.length; i++) {
                createItem(i, drinks, resp[i].item_name, resp[i].item_code, resp[i].price, resp[i].filename, resp[i].description)
            }
        }
    });
    
    $.ajax({
        url:"/desserts",
        type:"post",
        success:function(resp) {
            for (var i = 0; i < resp.length; i++) {
                createItem(i, desserts, resp[i].item_name, resp[i].item_code, resp[i].price, resp[i].filename, resp[i].description)
            }
        }
    });
    
    function createItem(i, divname, item_name, item_code, price, filename, description) {
        var container  = document.createElement("div");
        container.className = "col-sm-4 col-xs-12";
        var panel = document.createElement("div");
        panel.className = "panel panel-default text-center";
        var panelHeading = document.createElement("div");
        panelHeading.className = "panel-heading";
        panelHeading.innerHTML = "<h1>" + item_name + "</h1>";
        var panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        var newImg = document.createElement("img");
        newImg.src = "/images/" + filename;
        newImg.className = "item_img";
        panelBody.appendChild(newImg);
        var panelFooter = document.createElement("div");
        panelFooter.className = "panel-footer";
        var h4 = document.createElement("h4");
        h4.innerHTML = description;
        var h3 = document.createElement("h3");
        h3.innerHTML = price;
        panelFooter.appendChild(h4);
        panelFooter.appendChild(h3);

        var controlDiv = document.createElement("div");
        var form = document.createElement("form");
        form.id = "form-" + item_code;
        form.className = "item-control-form";
        form.action = "javascript:console.log('added');";
        form.method = "post";
        var quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.max = "5";
        quantityInput.name = "qty_input";
        quantityInput.id = "qty-" + item_code;
        quantityInput.className = "item-control-input";
        var submitCart = document.createElement("input");
        submitCart.type = "submit";
        submitCart.value = "Add to Cart";
        submitCart.id = "add-" + item_code;
        submitCart.className = "item-control-input";

        form.appendChild(quantityInput);
        form.appendChild(submitCart);
        panelFooter.appendChild(form);

        panel.appendChild(panelHeading);
        panel.appendChild(panelBody);
        panel.appendChild(panelFooter)
        container.appendChild(panel);
        divname.appendChild(container);

        var clearDiv = document.createElement("div");
        if ((i + 1) % 3 == 0) {
            clearDiv.className = "clearfix";
            divname.appendChild(clearDiv);
        }

        var cartItem = document.getElementById("cart-item-" + item_code);
        
        submitCart.addEventListener("click", function(event) {
            if(cartItem != undefined) {
                addToCart(item_name, item_code, price, quantityInput.value);

                orders[item_code] = parseInt(quantityInput.value);
            } else {
                var warningDiv = document.createElement("div");
                warningDiv.className = "warning";
                warningDiv.innerHTML = "You already have this item in the cart";
                warningDiv.top = event.clientY + "px";
                warningDiv.left = event.clientX + "px";
            }
        });
    }
    
    function addToCart(item_name, item_code, price, qty) {
        var container = document.createElement("div");
        container.className = "cart_items container-fluid";
        container.id = "cart-item-" + item_code;
        var deleteButton = document.createElement("div");
        deleteButton.className = "item-label col-lg-1 col-md-1 col-sm-2 col-xs-2";
        var deleteIcon = document.createElement("span");
        deleteIcon.className = "glyphicon glyphicon-remove";
        deleteButton.appendChild(deleteIcon);
        var itemName = document.createElement("div");
        itemName.className = "item-label col-lg-9 col-md-9 col-sm-7 col-xs-7";
        itemName.innerHTML = item_name;
        var qtyDiv = document.createElement("div");
        qtyDiv.className = "item-label col-lg-1 col-md-1 col-sm-2 col-xs-2";
        qtyDiv.id = "cart-items-qty-" + item_code;
        qtyDiv.innerHTML = qty;
        var priceDiv = document.createElement("div");
        priceDiv.className = "item-label col-lg-1 col-md-1 col-sm-2 col-xs-2";
        priceDiv.id = "cart-price-" + item_code;
        priceDiv.innerHTML = price;
        var form = document.createElement("form");
        form.id = "cart-form-" + item_code;
        form.className = "item-control-form";
        form.action = "javascript:console.log('updated');";
        form.method = "post";
        var cartQuantityInput = document.createElement("input");
        cartQuantityInput.type = "number";
        cartQuantityInput.min = "1";
        cartQuantityInput.max = "5";
        cartQuantityInput.name = "qty_input";
        cartQuantityInput.id = "cart-qty-" + item_code;
        cartQuantityInput.className = "item-control-input";
        var updateCart = document.createElement("input");
        updateCart.type = "submit";
        updateCart.value = "Update";
        updateCart.id = "cart-update-" + item_code;
        updateCart.className = "item-control-input";
        
        form.appendChild(cartQuantityInput);
        form.appendChild(updateCart);
        
        container.appendChild(deleteButton);
        container.appendChild(itemName);
        container.appendChild(qtyDiv);
        container.appendChild(priceDiv);
        container.appendChild(form);
        holderDiv.appendChild(container);
    }
});