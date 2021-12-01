<?php //getTicketChat

/**
 * Get the chat history of a given ticket
 *
 * @param Integer id A POST variable of the ticket ID
 *
 * @return The slected chat dialog history
 */
$_POST["CAT1"] = "SEKAIWACNV";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
//Get the askers ID from the ticket
$userID = DB::selectSingleFrom("tickets", array("id" => (int)$_POST["id"])) ["askerID"];
//Get all the chat dialog tied to the conversation
$chat = DB::select(array("conversationID" => (int)$_POST["id"]));
//Set every message to [toFrom,text,timestamp]
for ($index = 0;$index < sizeof($chat);$index++) {
	$toFrom = $chat[$index]["userTo"] == $userID ? 0 : 1;
	$chat[$index] = collapse($ARRAY, array($toFrom, $chat[$index]["text"], $chat[$index]["timestamp"]));
}
respond(collapse($OBJECT, $chat));
PHP(); ?>