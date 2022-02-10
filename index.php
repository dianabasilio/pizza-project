<?php

if (!isset($_GET['action'])) {
	$_GET['action'] = '';
}
session_start();

switch($_GET['action']){

	case 'addTopping': 
		$result = array();
		$result['errormsg'] = '';
		$result['success'] = 0;

		if (isset($_GET['topping']) && strlen(str_replace(' ', '', $_GET['topping'])) > 0 ) {
			if (!isset($_SESSION['toppings'])) {
				$_SESSION['toppings'] = array();
			}
			$_SESSION['toppings'][] = $_GET['topping'];
			$result['success'] = 1;
		} else {
			$result['success'] = 0;
			$result['errormsg'] = 'No Topping Entered';
		}

		echo json_encode($result);
		exit;
	break;

	case 'getToppings'; 
		$result = array();
		$result['errormsg'] = '';
		$result['success'] = 1;
		$result['toppings'] = array();

		if (isset($_SESSION['toppings'])) {
			$result['toppings'] = $_SESSION['toppings'];
			$result['success'] = 1;
		}

		echo json_encode($result);
		exit;
	break;

	case 'deleteTopping':

		$result = array();
		$result['errormsg'] = '';
		$result['success'] = 0;

		$toppingsBefore = count($_SESSION['toppings']);
		$toppings = $_SESSION['toppings'];

		if(sizeof($_SESSION['toppings']) > 1){
			$result['toppings'] = $_SESSION['toppings'];
			array_splice($_SESSION['toppings'], $_GET['toppingId'], 1);
		}else{
			unset($_SESSION['toppings']);
		}

		if(!isset($_SESSION['toppings'])){
			$result['success'] = 1;
			echo json_encode($result);
			return;
		}

		if(count($_SESSION['toppings']) < $toppingsBefore){
			$result['success'] = 1;
		}else{
			$result['errormsg'] = "The topping was not removed";
		}
		echo json_encode($result);
		exit;
	break;

	case 'checkOut'; 
		$result = array();
		$result['errormsg'] = '';
		$result['success'] = 1;
		$result['toppings'] = array();

		if (isset($_SESSION['toppings'])) {
			$result['toppings'] = $_SESSION['toppings'];
			$result['success'] = 1;
		}

		echo json_encode($result);
		exit;
	break;

	default: 
		printForm();
}


function printForm()
{ ?>
	<!DOCTYPE html>
	<html>

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Pizza Pizza</title>
		<script src="./jquery.min.js"></script>
		<script src="https://kit.fontawesome.com/74f3529e12.js" crossorigin="anonymous"></script>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="./public/css/app.css"></script>
	</head>
	<header>
		<!-- Image and text -->
		<nav class="navbar navbar-light">
  			<a class="navbar-brand" href="#">
    		<img src="https://scalebranding.com/wp-content/uploads/2021/02/pizza.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
    		Pizza Pizza
  			</a>
		</nav>

	</header>

	<body>

		<div class="main">
			<div>
				<div>
					<label for="topping">What topping would you like?</label>
					<div>
					<select name="topping" id="topping" class="">
						<option value="Cheese">Cheese</option>
						<option value="Bacon">Bacon</option>
						<option value="Pineapple">Pineapple</option>
						<option value="Onion">Onion</option>
						<option value="Pepper">Pepper</option>
					</select>

						<div>
							<button type="button" onclick="addTopping()">Add it!</button>
						</div>
					</div>
					<div>
						<ul id="listToppings"></ul>
						<i class='fas fa-kiwi-bird'></i>
					</div>
					<p class="images-ing"></p>
					<div>
							<button type="button" onclick="checkOut()">Go to check out!</button>
					</div>
				</div>
			</div>
		</div>
		<script src="./public/js/index.js"></script>
	</body>

	</html>
<?php
}
?>