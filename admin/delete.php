<!DOCTYPE html>
<html>
<head>
	<title>Delete Page</title>
</head>
<body>
	<center>
		<?php
		$conn = mysqli_connect("localhost", "root", "", "car_hire_db");
		if($conn === false){
			die("ERROR: Could not connect. " . mysqli_connect_error());
		}

		$car_id_select = $_POST['car_id_select'];

		if(isset($_POST['select'])){
			$sql = "SELECT * FROM car WHERE car_id = '$car_id_select'";
			$result = mysqli_query($conn, $sql);
			if(mysqli_num_rows($result) > 0){
				while($row = mysqli_fetch_assoc($result)){
					echo "<h3>Selected Car:</h3>";
					echo nl2br("\nCar ID: " . $row['car_id'] . "\nMake: " . $row['make'] . "\nModel: " . $row['model'] . "\nPrice: " . $row['price'] . "\nColour: " . $row['colour'] . "\nCategory ID: " . $row['category_id']);
				}
			} else{
				echo "<h3>No car found with the specified Car ID.</h3>";
			}
		} elseif(isset($_POST['delete'])){
			$sql = "DELETE FROM car WHERE car_id = '$car_id_select'";
			if(mysqli_query($conn, $sql)){
				echo "<h3>Car deleted successfully.</h3>";
			} else{
				echo "ERROR: Sorry, $sql. " . mysqli_error($conn);
			}
		}

		mysqli_close($conn);
		?>
	</center>
</body>
</html>
