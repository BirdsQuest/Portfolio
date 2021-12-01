<?php //sendToLine

/**
 * Send a message to LINE
 *
 * @param String text  The message to send
 * @param DateTime t   The time of the message sent
 * @param Integer id   The DB ID of the user to send to
 */
$_POST["CAT1"] = "CNCT";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$text = $_POST["text"];
$t = $_POST["t"];
$id = (int)$_POST["id"];

$lineBotID = "1645399070";
$lineBotSecret = "11753e079a293be03d16a23ee17d348b";
//Channel Access Token
$lineBotCAT = "DORSVoOC5mykg7MjGBYBq/4AmS8iMzyM3hWPcLvrNtMsSZBHCm7dEFQ1slSjDZbCUEYXEXM4hrlOhj8BxMQNdn8HmG902rGVZZmpfxSzMOQ0e8IerkDPhjCV2BExnyCTgwhXQVwewlxG2BAq2KkuQVGUYhWQfeY8sLGRXgo3xvw=";

//Use CURL to send a message
function sendToLine($url, $fields, $cat) {
	$fields = json_encode($fields);
	$curl = curl_init();
	$cat = $cat;
	curl_setopt_array($curl, array(CURLOPT_URL => $url, CURLOPT_POST => true, CURLOPT_POSTFIELDS => $fields, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array('Content-Type: application/json',
	//'Content-Length: '.strlen($fields),
	'Authorization: Bearer ' . $cat)));
	$response = curl_exec($curl);
	curl_close($curl);
	return $response;
}
//Get the users LINE ID
$id = DB::selectSingle(array("id" => $id)) ["LineID"];

//Send the message
sendToLine("https://api.line.me/v2/bot/message/push", array("to" => $id, "messages" => array(array("type" => "text", "text" => "Test!"))), $lineBotCAT);

PHP(); ?>