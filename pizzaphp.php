<?php 
	$customer = array();
	$customer = json_decode($_POST['customer'], true);
	//print_r($customer['name']);
	
	$price = 0;
	$price1 = 0;
	if ( $customer['topping[0]'] = "Supreme" || $customer['topping[1]'] = "Supreme" || $customer['topping[2]'] = "Supreme") {
			$price += 24;
	}
	if ( $customer['topping[0]'] = "Vegetarian" || $customer['topping[1]'] = "Vegetarian" || $customer['topping[2]'] = "Vegetarian") {
			$price += 16;
	}
	if ( $customer['topping[0]'] = "Hawaiian" || $customer['topping[1]'] = "Hawaiian" || $customer['topping[2]'] = "Hawaiian") {
			$price += 20;
	}
	if ( $customer['dairy[0]'] = "Supreme" || $customer['dairy[1]'] = "Supreme" ) {
			$price1 += 5;
	}
	if ( $customer['dairy[0]'] = "Vegetarian" || $customer['dairy[1]'] = "Vegetarian" ) {
			$price1 += 7;
	}

	//variable initialization
	$sauce = $customer['sauces'] + 0;
	
	$name = $customer['name'];
	$topping = implode(" ", $customer['topping']);
	$extras = implode(" ", $customer['dairy']);
	$delivery = $customer['delivery'];
	$total = $price+$price1+$sauce;
	
	date_default_timezone_set("Asia/Kuala_Lumpur");
	$date = date("d-m-Y h:i:sa");
	
	
	// Database Configuration
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "pizza";
	
	// create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// check connection
	if ($conn->connect_error) {
		die ("Connection failed: " . $conn->connect_error);
	}
	
	$sql = "INSERT INTO bill (Time,Name,Topping,Sauce,Extras,Delivery,Cost) VALUES ( '$date', '$name', '$topping', '$sauce', '$extras', '$delivery', '$total')";

	
	// output after saving data
	if ($conn->query($sql) === TRUE) {
	echo 'alert("Success")';
	} else{
	echo "error: " . $sql . "<br>" . $conn->error;
	}
	
	$conn->close();

?>
