<!DOCTYPE html>
<html lang="en">
<head>
	<title>Admin Panel</title>
</head>
<body>
	<center>
		<h1>Add Car data in Database</h1>
		<form action="insert.php" method="post">
			
<p>
			<label for="car_id">car_id :</label>
			<input type="int(11)" name="car_id" id="car_id" ng-model="car_id">
			</p>

			
<p>
			<label for="make">Make:</label>
			<input type="text" name="make" id="make" ng-model="make">
			</p>

			
<p>
			<label for="model">Model:</label>
			<input type="text" name="model" id="model" ng-model="model">
			</p>

			
<p>
			<label for="price">Price:</label>
			<input type="decimal" name="price" id="price" ng-model="price">
			</p>

<p>
			<label for="colour">Colour:</label>
			<input type="text" name="colour" id="colour" ng-model="colour">
			</p>

			
<p>
			<label for="category_id">category_id:</label>
			<input type="int(11)" name="category_id" id="category_id" ng-model="category_id">
			</p>

			<input type="submit" value="Submit">
		</form>
        <hr>

        <!-- Add form for selecting and deleting car data -->
        <h1>Delete Car Data</h1>
		<form action="delete.php" method="post">
			<p>
					<label for="car_id_select">Select Car ID:</label>
					<input type="text" name="car_id_select" id="car_id_select" required>
			</p>
			<input type="submit" name="select" value="Select">
			<input type="submit" name="delete" value="Delete">
		</form>
	</center>
</body>
</html>
