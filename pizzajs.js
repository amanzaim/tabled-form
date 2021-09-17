function formValidation() {
	var uname = document.registration.userid;
	var top = document.getElementById("top");
	var top1 = document.getElementById("top1");
	var top2 = document.getElementById("top2");
	var sauce = document.getElementById("sauce");
	var dairy1 = document.getElementById("dairy1");
	var dairy2 = document.getElementById("dairy2");
	var delivery = document.getElementById("textarea");

	if (userid_validation(uname)) {
		if (topping_validation(top,top1,top2)){
			if (extras_validation(dairy1,dairy2)){
				if(delivery_validation(delivery)){
					if ( phpcall(uname,top,top1,top2,sauce,dairy1,dairy2,delivery)){
					
					}
				}
			}
		}
	}
	
	return false;
}

function userid_validation(uname){
	var uid_len = uname.value.length;
	var numbers = /^[0-9]+$/;
	if(uname.value.match(numbers) || uid_len >= 50 ) {
		alert("Please do not input integer in Name / restrict the maximum number of words to 50");
		uname.focus();
		return false;
	}
	return true;
}

function topping_validation(top,top1,top2){
	x=0;
	
	if (top.checked){
		x++;
	}
	if (top1.checked){
		x++;
	}
	if (top2.checked) {
		x++;
	}
	if (x==0){
		alert("Select at least one checkbox for Topping");
		top.focus();
		return false;
	}
	return true;
}


function extras_validation(dairy1,dairy2){
	x=0;
	
	if (dairy1.checked){
		x++;
	}
	if (dairy2.checked){
		x++;
	}
	if (x==0){
		alert("Select at least one checkbox for Extras");
		dairy.focus();
		return false;
	}
	return true;

}

function delivery_validation(delivery) {

	var max = 100;
	var wordcount = delivery.value.length;
	var i = 0;
	var returnValue = 0;
	var stringtext = delivery.value;
	
	for ( i = 0 ; i < wordcount ; i ++ ) {
		if( stringtext.charCodeAt(i) >= "A".charCodeAt(0) && stringtext.charCodeAt(i) <= "Z".charCodeAt(0)){

       		returnValue++;
		}
	}
		
	if ( returnValue > 0 ){
		alert ('Make sure that the delivery instruction only contain small letters');
	}
	
	if ( wordcount >= max ) {
		
		alert('Please limit the delivery instructions to 100 words'  );
		delivery.focus();
		return false;
	}
		
	return true;
}

function phpcall(uname,top,top1,top2,sauce,dairy1,dairy2,delivery) {
	
	var customer = {};
	var text = [];
	var text2 = [];
	
	if (top.checked){
		text.push(top.value);
	}
	if (top1.checked){
		text.push(top1.value);
	}
	if (top2.checked) {
		text.push(top2.value);
	}
	if (dairy1.checked){
		text2.push(dairy1.value);
	}
	if (dairy2.checked){
		text2.push(dairy2.value);
	}
	
	
	customer.name = uname.value;
	customer.topping = text;
	customer.sauces = sauce.value;
	customer.dairy = text2;
	customer.delivery = delivery.value;
	
	console.log(customer)
	$.ajax({
		url:"pizzaphp.php",
		method:"post",
		data : { customer : JSON.stringify( customer ) },
		success : function(res){
			console.log(res);
		}
	})
}
