<?php include("dbconnection.php"); ?> 

<?php

$sql = "SELECT username, gameScore, (SELECT COUNT(*)+1  FROM jeyganesh.score B WHERE gameID = 1 and A.gamescore<B.gamescore) AS Rank FROM jeyganesh.score A where gameID = 1 and username = 'emily'
ORDER BY gamescore DESC";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$rnum = $result->num_rows;

echo "Executed Statement";
echo $rnum;
echo sizeof($row);
echo array_values($row);
?>