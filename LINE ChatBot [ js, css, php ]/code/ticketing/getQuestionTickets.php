<?php //getQuestionTickets

/**
 * Get all of the question tickets, based on the supplied filter
 *
 * @param Integer filter   The filter can be the status or based on a user
 * @param Integer userID   In the case of filter being 5 or 6
 *                         It is the clients or staff user id respectivly
 *
 * @return A list of tickets
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
if ($_POST["filter"] == "undefined") {
	$_POST["filter"] = 7;
}
$filter = (int)$_POST["filter"];
$userID = (int)$_POST["userID"];

//Filter options
$UNOPENED = 0;
$WAITINGFORCUSTOMER = 1;
$RESPONSEREQUIRED = 2;
$SUCCESS = 3;
$FAILED = 4;
$FROMUSER = 5;
$ASSIGNEDTO = 6;
if ($filter < 4) {
	$filter = array("status" => $filter);
}
else if ($filter == 5) {
	$filter = array("askerID" => $userID);
}
else if ($filter == 6) {
	$assignedTo = true;
	$filter = array();
}
else {
	$filter = array();
}

//Fetch the tickets
$results = DB::select($filter);

//If the filter is for the assignedTo, post fetch filter the results
if (isset($assignedTo)) {
	if ($userID == 0) {
		$userID = User::$ID;
	}
	for ($index = sizeof($results) - 1;$index > - 1;$index--) {
		if (!in_array($userID, expand($ARRAY, $result["assignedTo"]))) {
			unset($results[$index]);
		}
	}
}

//Set each result entry to [keyID,askerID,status,askerName,topic,startDate,endDate,[[assignedToID,assignedToName]]]
for ($index = 0;$index < sizeof($results);$index++) {
	$result = $results[$index];

	//Get all of the assigned staff and pair the id with their names
	if ($result["assignedTo"] != "") {
		$assignedTo = expand($ARRAY, $result["assignedTo"]);
		//var_dump($assignedTo);
		for ($key = 0;$key < sizeof($assignedTo);$key++) {
			$assignedTo[$key] = collapse($SUB2ARRAY, array($assignedTo[$key], User::nameFromID($assignedTo[$key])));
		}
		$assignedTo = collapse($SUBARRAY, $assignedTo);
	}
	else {
		$assignedTo = "";
	}

	$results[$index] = collapse($ARRAY, array($result["id"], $result["askerID"], $result["status"], User::nameFromID($result["askerID"]), $result["topic"], $result["startDate"], $result["endDate"], $assignedTo));

}
respond(collapse($OBJECT, $results));

PHP(); ?>