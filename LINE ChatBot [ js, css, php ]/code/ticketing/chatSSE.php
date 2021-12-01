<?php //ChatSSE

/**
 * When a JS file connects to this stream, the file essentially loops
 * It checks the database for any new messages,
 * if there are any then it broadcasts it to the JS page
 *
 */
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$_POST["CAT1"] = "SEKAIWACNV";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");

$whereID = "userTo='" . User::$ID . "' OR userFrom='" . User::$ID . "'";
//We want to get the last id, either set in $_SESSION or getting the 5th to last index that the user has interacted with
$lastID = isset($_SESSION["lastHelpID"]) ? $_SESSION["lastHelpID"] : DB::iterateResults(DB::query("SELECT id FROM " . DB::$table["tableName"] . " WHERE " . $whereID . " ORDER BY id DESC LIMIT 5,1")) [0]["id"];
//Get all of the results since the lastID
$results = DB::iterateResults(DB::query("SELECT id,conversationID,userTo,userFrom,text,timestamp FROM " . DB::$table["tableName"] . " WHERE id > " . $lastID . " AND (" . $whereID . ")"));

//Make sure we have any new entries
if ($results != false && sizeof($results) > 0) {
	//Every result becomes [conversationID,toFrom,text,timestamp] and streams back to the JS
	for ($index = 0;$index < sizeof($results);$index++) {
		$_SESSION["lastHelpID"] = array_shift($results[$index]); //Knock off the db id
		$conversationID = array_shift($results[$index]);
		$userTo = array_shift($results[$index]);
		$userFrom = array_shift($results[$index]);
		$toFrom = $userFrom == User::$ID ? 0 : 1;
		array_unshift($results[$index], $toFrom);
		array_unshift($results[$index], $conversationID);
		echo "data: " . collapse($OBJECT, $results[$index]) . " \n\n";
	}
}

ob_flush();
flush();
?>