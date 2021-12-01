<?php //claimTicket

/**
 * Opens the ticket for a staff member
 *
 * @param Integer $ticketID
 *
 * @return true
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$RESPONSEREQUIRED = 2;
$ticketID = (int)$_POST["ticketID"];

//Get the ticket
$assignedTo = DB::selectSingle(array("id" => $ticketID));
//From that, get all of the staff who are currently assigned to the ticket
$assignedTo = explode(",", $assignedTo["assignedTo"]);
//If there are none, remove the blankness
if ($assignedTo[0] == "") {
	$assignedTo = [];
}
//If the user isn't assigned to the ticket, assign them
if (!in_array(User::$ID, $assignedTo)) {
	array_push($assignedTo, User::$ID);
}

//Set the changes to the DB
DB::update(array("assignedTo" => implode(",", $assignedTo), "status" => $RESPONSEREQUIRED), array("id" => $ticketID));
//Send true back to the JS
respond(1);
PHP(); ?>
