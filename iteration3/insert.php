<?php include("dbconnection.php"); ?> 

<?php
$username = $_POST['username'];
$password = $_POST['password'];
if (!empty($username) || !empty($password)) {

     $SELECT = "SELECT username From user Where username = ? Limit 1";
     $INSERT = "INSERT Into user (username, password) values(?, ?)";
     //Prepare statement
     $stmt = $conn->prepare($SELECT);
     $stmt->bind_param("s", $username);
     $stmt->execute();
     $stmt->bind_result($username);
     $stmt->store_result();
     $rnum = $stmt->num_rows;
     if ($rnum==0) {
      $stmt->close();
      $stmt = $conn->prepare($INSERT);
      $stmt->bind_param("ss", $username, $password);
      $stmt->execute();
      echo "Signup sucessfull";
     }
	 else {
     echo "Name already exists. Enter new name";
     }
     $stmt->close();
     $conn->close();
    } 
else {
 echo "All fields are required";
 die();
}
?>