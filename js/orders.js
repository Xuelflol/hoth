$(document).ready(function(){    
    var orderDispaly = document.getElementById("order-div");
    var submitButton = document.getElementById("checkout-but"),
        cancelButton = document.getElementById("cancel-but"),
        fname = document.getElementById("f-name"),
        userName = document.getElementById("u-name"),
        email = document.getElementById("e-mail"),
        foodTotal = document.getElementById("fb-total"),
        taxCost = document.getElementById("taxes"),
        orderTotal = document.getElementById("order-total") 
    
    var orders = {};
    var itemName = [];
    var itemPrice = [];
    var itemQuantity = [];
    var totalPrice = 0;
    var tax;

    $.ajax({
        url:"/get/orders",
        type:"post",
        success:function(resp){
            console.log(resp)
            orders = resp.orders[0];
            getOrderItems(orders);
            
            for(var i=0; i<itemQuantity.length;i++){
                var itemTotalPrice = itemPrice[i] * itemQuantity[i];

                var newD = document.createElement('div');
                newD.innerHTML = itemName[i]+" X "+ itemQuantity[i]+ " $"+itemTotalPrice;
                orderDispaly.appendChild(newD);
                totalPrice = totalPrice + itemTotalPrice;
            }
            tax = totalPrice * 0.1;
            console.log(tax)
            fname.innerHTML = fname.innerHTML + ' ' + resp.fname;
            userName.innerHTML = userName.innerHTML + ' ' + resp.username;
            email.innerHTML = email.innerHTML + ' '+ resp.email;
            foodTotal.innerHTML = foodTotal.innerHTML + ' ' + totalPrice;
            taxCost.innerHTML = taxCost.innerHTML + ' ' + tax;
            orderTotal.innerHTML = orderTotal.innerHTML + ' ' + (tax + totalPrice);
            console.log(tax+totalPrice)
        }
    });
    
   
    function getOrderItems(orders){
        Object.keys(orders).forEach(function(key){
            var orderItem = key;
            var quantity = parseInt(orders[key]);

            itemQuantity.push(quantity)

            $.ajax({
                url:"/get/price",
                type:"post",
                data: {
                    item:orderItem
                },
                success:function(resp){
                    itemName.push(resp.name);
                    itemPrice.push(parseFloat(resp.price));
                },
                async:false
            });
        });
    };
    
    submitButton.addEventListener("click",function(){
        
        $.ajax({
            url:"/save/order",
            type:"post",
            data:{
                totalPirce:totalPrice
            },
            success:function(resp){
                console.log(resp)
                var orderId = resp.id;
                
                for(var i=0; i<itemName.length;i++){
                    $.ajax({
                        url:"/order/detailes",
                        type:"post",
                        data:{
                            name:itemName[i],
                            quantity:itemQuantity[i],
                            id:orderId
                        },
                        success:function(res){
                            if (res.status == "success") {
                                location.href = "/order/submitted/" + orderId;
                            }
                        }
                    });
                }
            }
        });
    });
    
    cancelButton.addEventListener("click",function(){
        location.href = "/"
    });
});