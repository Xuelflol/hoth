$(document).ready(function(){
	var addbut = document.getElementById("addbut");
	var itemName = document.getElementById("item-name");
	var itemCat = document.getElementById("item-cat");
	var itemDesc = document.getElementById("item-desc");
	var itemPrice = document.getElementById("item-price");
	var itemImg = document.getElementById("item-image");
	var okayBut = document.getElementById("okayBut");
	var mealDiv = document.getElementById("meal-items");
	var appDiv = document.getElementById("app-items");
	var drinkDiv = document.getElementById("drink-items");
	var dessertDiv = document.getElementById("dessert-items");
	
	okayBut.addEventListener("click", function(){
		var containerDiv = document.createElement("div");
		containerDiv.className = "col-lg-2 col-md-4 col-sm-6 col-xs-12";
		
		if(itemCat.value == "Appetizers"){
			appDiv.appendChild(containerDiv);
			containerDiv.style.backgroundColor = "red";
		}
		if(itemCat.value == "Desserts"){
			dessertDiv.appendChild(containerDiv);
			containerDiv.style.backgroundColor = "green";
		}
		if(itemCat.value == "Drinks"){
			drinkDiv.appendChild(containerDiv);
			containerDiv.style.backgroundColor = "blue";
		}
		if(itemCat.value == "Meals"){
			mealDiv.appendChild(containerDiv);
			containerDiv.style.backgroundColor = "grey";
		}
		
		$.ajax({
			url:"/adminItems",
			type:"post",
			data:{
				name: itemName.value,
				img:itemImg.value	,
				desc:itemDesc.value,
				price: itemPrice.value,
				type:"create"	
			},
			success:function(resp){
				console.log(resp);
				if(resp.status == "success"){
					var name = document.createElement("div");
					var img = document.createElement("img");
					var desc = document.createElement("div");
					var price = document.createElement("div");
					
					name.id = "nameDiv";
					img.id = "imgDiv";
					desc.id = "descDiv";
					price.id = "priceDiv";
					
					name.innerHTML = resp.name;
					//img.src = resp.img;
					desc.innerHTML = resp.desc;
					price.innerHTML = resp.price;
					
					containerDiv.appendChild(name);
					name.appendChild(img);
					name.appendChild(desc);
					name.appendChild(price);
					
					
				}
			}
		});		
	});
	

	
	

	
});