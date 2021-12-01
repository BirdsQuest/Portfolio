<?php //getUsersQuestions

/**
 * Get all users tickets regardless of status
 *
 * @param Integer userID   The user whose tickets you want
 *
 * @return List of tickets
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$userID = (int)$_POST["userID"];
//Get all the users tickets
$results = DB::select(array("askerID" => $userID));
//Collapse all the results
for ($index = 0;$index < sizeof($results);$index++) {
	$results[$index] = collapse($ARRAY, $results[$index]);
}
respond($OBJECT, $results);
PHP(); ?>