<?php //recieveSupportTicket

/**
 * Recieve a ticket sent from a user
 *
 * @param String text  The message text being sent
 * @param Integer id   The ID of the user that is sending
 * @param Integer sentFrom Is 1 if sent from LINE
 * @param Boolean  skipEnd Don't do my libraries response
 *                         (as it ends code prematurely)
 *
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$text = $_POST["text"];
$id = (int)$_POST["id"];
if (!isset($_POST["sentFrom"])) {
	$sentFrom = 0;
}
else {
	$sentFrom = (int)$_POST["sentFrom"];
}
$UNOPEN = 0;
$CLOSED = 3;

$ticket = DB::selectSingle(array("askerID" => $id, "status" => array("<", $CLOSED)));
$date = gmdate("Y-m-d H:i:s");
//if not, create one and get id
if ($ticket == false) {
	$ticket = DB::insert(array("askerID" => $id, "status" => $UNOPEN, "startDate" => $date));
}
else {
	$ticket = $ticket["id"];
}
//add chat to conversations
DB::insertInto("conversations", array("userFrom" => $id, "userTo" => User::$ID, "text" => $text, "timestamp" => $date, "conversationID" => $ticket, "sentFrom" => $sentFrom));
respond("success " . $date);
if (!isset($_POST["skipEnd"])) {
	PHP();
}
?>