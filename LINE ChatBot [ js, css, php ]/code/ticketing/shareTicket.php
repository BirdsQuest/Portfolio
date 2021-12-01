<?php //shareTicket

/**
 * Share or pass along a ticket to another staff member
 *
 * @param Integer to    Who to assign the ticket to
 * @param Integer ticketID  The id of the ticket being assigned
 * @param Boolean passOn    Whether the original user wants to keep the ticket
 *
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$to = (int)$_POST["to"];
$ticketID = (int)$_POST["ticketID"];
$passOn = (bool)$_POST["passOn"];
//Get the list of staff that the ticket is assigned to
$assignedTo = explode(DB::selectSingle(array("id" => $ticketID))->assignedTo, ",");
//If noone, then make a new array
if ($assignedTo == null) {
	$assignedTo = [];
}
//If the user doesn't already have the ticket assigned, assign it to them
if (!in_array($assignedTo, $to)) {
	array_push($assignedTo, $to);
}
//If passOn is set, then remove the current user from the ticket
if ($passOn) {
	array_diff($assignedTo, [User::ID]);
}
//TODO: Send alert to new staff member
DB::edit(array("id" => $ticketID), array("assignedTo", implode($assignedTo, ","), "status", $RESPONSEREQUIRED));
PHP(); ?>
