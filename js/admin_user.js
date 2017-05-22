$(document).ready(function() {
    var orderReportDiv = document.getElementById("order-report-div");
    var itemReportDiv = document.getElementById("item-report-div");
    var userTable = document.getElementById("user-table");
    var allAccountButton = document.getElementById("show_all_accounts"),
        custAccountButton = document.getElementById("show_customer_accounts"),
        empAccountButton = document.getElementById("show_employee_accounts"),
        adminAccountButton = document.getElementById("show_admin_accounts"),
        generateOrder = document.getElementById("gen_order_report"),
        generateItem = document.getElementById("gen_item_report");

    $.ajax({
        url:"/report",
        type:"post",
        data: {
            type: "order"
        },
        success:function(resp) {
            for (key in resp.result) {
                var reportWrapper = document.createElement("div");
                reportWrapper.className = "report-wrapper";

                var orderIdDiv = document.createElement("div");
                orderIdDiv.className = "report-data";
                var totalPriceDiv = document.createElement("div");
                totalPriceDiv.className = "report-data";
                var customerDiv = document.createElement("div");
                customerDiv.className = "report-data";

                orderIdDiv.innerHTML = resp.result[key].order_id;
                totalPriceDiv.innerHTML = "$" + resp.result[key].total_price;
                customerDiv.innerHTML = resp.result[key].customer;

                reportWrapper.appendChild(orderIdDiv);
                reportWrapper.appendChild(totalPriceDiv);
                reportWrapper.appendChild(customerDiv);
                orderReportDiv.appendChild(reportWrapper);
            }

            var sumWrapper = document.createElement("div");
            sumWrapper.className = "report-wrapper";
            sumWrapper.innerHTML = "<h4>Total: $" + resp.result["0"].sum + "</h4>";
            orderReportDiv.appendChild(sumWrapper);
        }
    });

    $.ajax({
        url:"/report",
        type:"post",
        data: {
            type: "item"
        },
        success:function(resp) {
            console.log(resp);

            for (var i = 0; i < resp.length; i++) {
                var reportWrapper = document.createElement("div");
                reportWrapper.className = "report-wrapper";

                var itemNameDiv = document.createElement("div");
                itemNameDiv.className = "report-data";
                var totalPriceDiv = document.createElement("div");
                totalPriceDiv.className = "report-data";
                var quantityDiv = document.createElement("div");
                quantityDiv.className = "report-data";

                itemNameDiv.innerHTML = resp[i].item_name;
                totalPriceDiv.innerHTML = "$" + resp[i].price;
                quantityDiv.innerHTML = resp[i].quantity;

                reportWrapper.appendChild(itemNameDiv);
                reportWrapper.appendChild(totalPriceDiv);
                reportWrapper.appendChild(quantityDiv);
                itemReportDiv.appendChild(reportWrapper);
            }
        }
    });

    generateOrder.addEventListener("click", function() {
        orderReportDiv.style.display = "inline";
        itemReportDiv.style.display = "none";
        userTable.style.display = "none";
    });

    generateItem.addEventListener("click", function() {
        orderReportDiv.style.display = "none";
        itemReportDiv.style.display = "inline";
        userTable.style.display = "none";
    });
});