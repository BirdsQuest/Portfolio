<?php //getQuestionTickets

/**
 * Get a list of open question tickets that the user is assigned to
 * It is to populate the righthand pannel for quick access of chat
 *
 * @return The list of tickets
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$UNOPENED = 0;
$WAITINGFORCUSTOMER = 1;
$RESPONSEREQUIRED = 2;
$results = DB::select(array("status" => array("<", $RESPONSEREQUIRED + 1)));

//We want to remove any irrelevant results(unopened tickets or not assigned to staff member), with the remaining ones we want to structure them as [askerID,askerName]
for ($index = sizeof($results) - 1;$index > - 1;$index--) {
	$result = $results[$index];
	//If the ticket is not unopened
	if ($result["status"] != $UNOPENED) {
		$assignedTo = expand($ARRAY, $result["assignedTo"]);
		//Check that the user has claim on the ticket
		if (in_array(User::$ID, $assignedTo)) {
			$results[$index] = collapse($SUBARRAY, array($result["askerID"], User::nameFromID($result["askerID"])));
		}
		//Not assigned to user, so remove it from the array
		else {
			unset($results[$index]);
		}
	}
	//Ticket is unopened, so remove it from the array
	else {
		unset($results[$index]);
	}
}
respond(collapse($OBJECT, $results));

PHP(); ?>