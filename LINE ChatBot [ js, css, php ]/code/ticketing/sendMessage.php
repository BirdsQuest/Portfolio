<?php //sendMessage

/**
 * Send a message from the staff to the user, add to the DB and if the previous message was sent via LINE then reply it.
 *
 * @param String   m   The text to send
 * @param DateTime t   What time the message was sent
 * @param Integer  user    The user to send to
 * @param Integer  conversationID  (optional) The conversation that the
 *                                 message is attached to
 *
 * @return success and the timedate
 */
$_POST["CAT1"] = "SEKAIWACNV";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
//POST Variables
$message = $_POST["m"];
$time = $_POST["t"];
$user = (int)$_POST["user"];
$conversationID = (int)$_POST["conversationID"];
//Status Constants
$WAITINGFORCUSTOMER = 1;
$RESPONSEREQUIRED = 2;
$SENTFROMLINE = 1;

//The LINE Channel Access Token
$lineBotCAT = "DORSVoOC5mykg7MjGBYBq/4AmS8iMzyM3hWPcLvrNtMsSZBHCm7dEFQ1slSjDZbCUEYXEXM4hrlOhj8BxMQNdn8HmG902rGVZZmpfxSzMOQ0e8IerkDPhjCV2BExnyCTgwhXQVwewlxG2BAq2KkuQVGUYhWQfeY8sLGRXgo3xvw=";

//Send the message to LINE using CURL
function sendToLine($userID, $message) {
	$url = "https://api.line.me/v2/bot/message/push";
	global $lineBotCAT;
	$curl = curl_init();
	curl_setopt_array($curl, array(CURLOPT_URL => $url, CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_POSTFIELDS => json_encode(array("to" => $userID, "messages" => array(array("type" => "text", "text" => User::nameFromID(User::$ID) . ": " . $message)))), CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'Authorization: Bearer ' . $lineBotCAT)));
	$response = curl_exec($curl);
	curl_close($curl);
	return $response;
}

//If the conversationID isn't set, check to see if the user has an open conversation and set the id
if ($conversationID == 0) {
	$details = DB::selectSingleFrom("tickets", array("askerID" => $user, "status" => array("<", $RESPONSEREQUIRED + 1)));
	if (!!$details) {
		$conversationID = $details["id"];
	}
}

//Set the details of the message
$details = array("userFrom" => User::$ID, "userTo" => $user, "text" => $message, "timestamp" => $time);

//If there is a conversationID, then change the status and set the id to the message details
if ($conversationID != 0) {
	$details["conversationID"] = $conversationID;
	$question = DB::selectSingleFrom("tickets", array("id" => $conversationID));
	//var_dump($question);
	if ($question["askerID"] == $user) {
		$question = array("status" => $WAITINGFORCUSTOMER);
	}
	else {
		$question = array("status" => $RESPONSEREQUIRED);
	}
	DB::updateOn("tickets", $question, array("id" => $conversationID));
}
//Add the message
DB::insert($details);

//If previous chat was sent from Line, send one back to Line
$previousMessage = DB::iterateResults(DB::query("SELECT id,sentFrom FROM conversations WHERE conversationID=$conversationID AND userFrom=$user ORDER BY id DESC LIMIT 1"));
if (sizeof($previousMessage) > 0 && $previousMessage[0]["sentFrom"] == $SENTFROMLINE) {
	//Get line userID
	DB::tempTable("CNCT");
	$lineUser = DB::selectSingle(array("id" => $user)) ["LineID"];
	//var_dump($lineUser);
	DB::restoreTable();
	sendToLine($lineUser, $message);
}
respond("success " . $time);
PHP(); ?>