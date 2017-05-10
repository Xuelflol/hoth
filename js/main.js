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
    }
    
    function addToCart(item_name, price, qty, item_code) {
        //var cart_item = document.getElementById("item_" + item_code);
        
        var idiv = document.createElement("div");
        idiv.id = "item_" + item_code;
        idiv.className = "container-fluid item";

        var del = document.createElement("div");
        del.id = "del_" + item_code;
        del.className = "delete";

        var ndiv = document.createElement("div");
        ndiv.className = "text";
        ndiv.innerHTML = item_name;

        var pdiv = document.createElement("div");
        pdiv.className = "price2";
        pdiv.id = "price_" + item_code;
        pdiv.innerHTML = "$" + price + " X <span id='qcount_" + item_code + "'>" + qty + "</span>";

        var form = document.createElement("form");
        form.setAttribute("method","post");
        form.setAttribute("action","javascript:console.log('updated');");
        form.name = "iform_" + item_code;

        var qinput = document.createElement("input");
        qinput.type = "number";
        qinput.name = "uqty_" + item_code;
        qinput.id = "uqty_id_" + item_code;
        qinput.min = "1";
        qinput.max = "5";
        qinput.className = "qty2";

        var abutton = document.createElement("input");
        abutton.value = "Add";
        abutton.type = "Submit";
        abutton.id = "add_" + item_code;
        abutton.className = "add2";

        var sbutton = document.createElement("input");
        sbutton.value = "Update";
        sbutton.type = "Submit";
        sbutton.id = "update_" + item_code;
        sbutton.className = "add2";
        form.appendChild(qinput);
        form.appendChild(abutton);
        form.appendChild(sbutton);

        idiv.appendChild(del);
        idiv.appendChild(ndiv);
        idiv.appendChild(pdiv);
        idiv.appendChild(form);
        items.appendChild(idiv);

        var del_button = document.getElementById("del_" + item_code);
        var update_button = document.getElementById("update_" + item_code);
        var add_button = document.getElementById("add_" + item_code);
        var quform = document.forms["iform_" + item_code].elements["uqty_" + item_code];
        var item_price = document.getElementById("price_" + item_code);
        var cart_i = document.getElementById("item_" + item_code);

        add_button.addEventListener("click", function() {
            if (quform.value > 0 && quform.value <= 5) {

                updateQuantity(item_code, quform.value, price);
            }
        });

        update_button.addEventListener("click", function() {
            if (quform.value > 0 && quform.value <= 5) {
                orders[item_code] = parseInt(quform.value);

                item_price.innerHTML = "$" + price + " X <span id='qcount_" + item_code + "'>" + orders[item_code] + "</span>";
                
                total_price = parseInt(quform.value) * price;
                console.log(total_price);
            }
        });

        del_button.addEventListener("click", function() {
            total_price = total_price - orders[item_code] * price;
            console.log(total_price);
            delete orders[item_code];
            
            cart_i.parentNode.removeChild(cart_i);
        });
    }
    
    function populateMenu(divid, div_name, item_name, description, price, item_code) {
        divid.style.display = "inline";
                    
        ndiv = document.createElement("div");
        var menuImg = document.createElement("img");
        menuImg.src = "/images/Rebel-50.png";
        ndiv.appendChild(menuImg);
        ndiv.id = item_code;
        ndiv.className = "container-fluid col-lg-3 col-md-3 col-sm-3 col-xs-3 inside";

        tdiv = document.createElement("div");
        tdiv.className = "title-div";
        tdiv.innerHTML = "<h4>" + item_name + "</h4>";

        ddiv = document.createElement("div");
        ddiv.className = "desc-div";
        ddiv.innerHTML = "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 desc'>" + description + "</div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 price'>$" + price + "</div>";

        cdiv = document.createElement("div");
        cdiv.className = "control-div";

        var form = document.createElement("form");
        form.name = "form_" + item_code;
        form.id = "form_id_" + item_code;
        qinput = document.createElement("input");
        qinput.type = "number";
        qinput.name = "qty_" + item_code;
        qinput.min = "1";
        qinput.max = "5";
        qinput.className = "qty";

        sbutton = document.createElement("input");
        sbutton.id = "button_" + item_code;
        sbutton.type = "Submit";
        sbutton.value = "Add";
        form.appendChild(qinput);
        form.appendChild(sbutton);
        
        cdiv.appendChild(form);

        ndiv.appendChild(tdiv);
        ndiv.appendChild(ddiv);
        ndiv.appendChild(cdiv);

        divid.appendChild(ndiv);
        
        var item_form = document.getElementById("form_id_" + item_code);
        var submit_item = document.getElementById("button_" + item_code);
        
        var qform = document.forms["form_" + item_code].elements["qty_" + item_code];
        
        item_form.setAttribute("action","javascript:console.log('added')");
        
        submit_item.addEventListener("click", function() {
            var cart_item = document.getElementById("item_" + item_code);
            
            if (cart_item == null) {
                if (qform.value > 0 && qform.value <= 5) {
                    addToCart(item_name, price, qform.value, item_code);
                    
                    updateQuantity(item_code, qform.value, price);
                }
            } else if (cart_item != null) {
                updateQuantity(item_code, qform.value, price);
            }
        });
    } */
    
// *************** Alex took out lines 195-263 ***************
//    function populateMenu(divname, url) {
//        $.ajax({
//            url:url,
//            type:"post",
//            success:function(resp) {
//                for (var i = 0; i < resp.length; i++) {
//                    var container  = document.createElement("div");
//                    container.className = "col-lg-2 col-md-4 col-sm-6 col-xs-12";
//                    
//                    var panel = document.createElement("div");
//                    panel.className = "panel panel-default text-center";
//                    
//                    var panelHeading = document.createElement("div");
//                    panelHeading.className = "panel-heading head";
//                    panelHeading.innerHTML = "<h3>" + resp[i].item_name + "</h3>";
//                    
//                    var panelBody = document.createElement("div");
//                    panelBody.className = "panel-body body";
//                    
//                    var imgHolder = document.createElement("div");
//                    imgHolder.className = "menu_imgs";
//                    
//                    var newImg = document.createElement("img");
//                    newImg.src = "/images/" + resp[i].filename;
//                    newImg.className = "menu";
//                    imgHolder.appendChild(newImg);
//                    panelBody.appendChild(imgHolder);
//                    
//                    var panelFooter = document.createElement("div");
//                    panelFooter.className = "panel-footer foot";
//                    
//                    var h4 = document.createElement("h4");
//                    h4.innerHTML = resp[i].description;
//                    
//                    var h3 = document.createElement("h3");
//                    h3.innerHTML = resp[i].price;
//                    panelFooter.appendChild(h4);
//                    panelFooter.appendChild(h3);
//
//                    var input = document.createElement("input");
//                    input.type = "number";
//                    input.className = "form-control";
//                    
//                    var button = document.createElement("button");
//                    button.className = "btn btn-lg";
//                    
//                    panelFooter.appendChild(input);
//                    panelFooter.appendChild(button);
//
//                    panel.appendChild(panelHeading);
//                    panel.appendChild(panelBody);
//                    panel.appendChild(panelFooter)
//                    container.appendChild(panel);
//                    divname.appendChild(container);
//
//                    var clearDiv = document.createElement("div");
//                    if ((i + 1) % 3 == 0) {
//                        clearDiv.className = "clearfix";
//                        divname.appendChild(clearDiv);
//                    }
//                }
//            }
//        });
//    }
//    
//    populateMenu(appetizers, "/appetizers");
//    populateMenu(meals, "/meals");
//    populateMenu(drinks, "/drinks");
//    populateMenu(desserts, "/desserts");
// *************** Alex took out lines 195-263 ***************

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

        submitCart.addEventListener("click", function() {
           addToCart(item_name, item_code, price, quantityInput.value); 
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
    
    /*appetizers.addEventListener("click", function() {
        if (app_digit == 0) {
            $.ajax({
                url:"/appetizer",
                type:"post",
                success:function(resp) {
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(appetizersDiv, "appetizers_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                        
                        app_digit = 1;
                    }
                }
            });
        }
        
        $("#appetizers_div").show()
        $("#appetizers_div").siblings().hide();
    });
    
    drinks.addEventListener("click", function() {
        if (bev_digit == 0) {
            $.ajax({
                url:"/drinks",
                type:"post",
                success:function(resp) {
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(drinksDiv, "drinks_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                        
                        bev_digit = 1;
                    }
                }
            });
        }
        
        $("#drinks_div").show()
        $("#drinks_div").siblings().hide();
            
    });
    
    desserts.addEventListener("click", function() {
        if (des_digit == 0) {
            $.ajax({
                url:"/desserts",
                type:"post",
                success:function(resp) {
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(dessertsDiv, "desserts_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                    }
                
                    des_digit = 1;
                }
            });
        }
        
        $("#desserts_div").show()
        $("#desserts_div").siblings().hide();
    });
    
    meals.addEventListener("click", function() {
        if (meals_digit == 0) {
            $.ajax({
                url:"/meals",
                type:"post",
                success:function(resp) {
                
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(mealsDiv, "meals_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                    }
                
                    meals_digit = 1;
                } 
            });
        }
        
        $("#meals_div").show()
        $("#meals_div").siblings().hide();
    });
    
    $.ajax({
        url:"/user-cp",
        type:"post",
        success:function(resp) {
            if (resp.status == "customer") {
                document.getElementById("sign_in").innerHTML = '<a href="/user_profile" class="reg"><span class="glyphicon glyphicon-user"></span> Profile</a>';
                
                document.getElementById("log_out").style.display = "inline";
            }
        }
    });*/
    
    //document.getElementById("log_out").addEventListener("click", function() {
       // location.href = "/logout";
    //});
});