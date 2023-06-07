<!DOCTYPE html>
<html>

<head>
	<title>Insert Page page</title>
</head>

<body>
	<center>
		<?php

		// servername => localhost
		// username => root
		// password => empty
		// database name => car
		$conn = mysqli_connect("localhost", "root", "", "car_hire_db");
		
		// Check connection
		if($conn === false){
			die("ERROR: Could not connect. "
				. mysqli_connect_error());
		}
		
		// Taking all 6 values from the form data(input)
		$car_id = $_REQUEST['car_id'];
		$make = $_REQUEST['make'];
		$model = $_REQUEST['model'];
		$price = $_REQUEST['price'];
		$colour = $_REQUEST['colour'];
		$category_id = $_REQUEST['category_id'];
		
		// Performing insert query execution
		// here our table name is car
		$sql = "INSERT INTO car VALUES ('$car_id',
			'$make','$model','$price','$colour','$category_id')";
		
		if(mysqli_query($conn, $sql)){
			echo "<h3>data stored in a database successfully."
				. " Please browse your localhost php my admin"
				. " to view the updated data</h3>";

			echo nl2br("\n$car_id\n $make\n "
				. "$model\n $price\n $colour\n $category_id");
		} else{
			echo "ERROR: Hush! Sorry $sql. "
				. mysqli_error($conn);
		}
		
		// Close connection
		mysqli_close($conn);
		?>
	</center>
</body>

</html>
