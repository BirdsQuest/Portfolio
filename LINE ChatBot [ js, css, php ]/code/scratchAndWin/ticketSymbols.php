<?php //ticketSymbols

/**
 * This checks that a ticketCode has been set in the sekaiwaBot.php file
 * If it is, then generate a set of symbols based on the percent chances
 *
 * @param  Integer  ticketCode Random int set previously in the database
 *                             Used as a seed for the random symbol set
 *
 * @return The tickets symbols
 */
$_POST["CAT1"] = "SEKAIWA";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
//Set the odds and potential combinations of sets
$percents = array(30, 20, 10); //Odds of winning prize 1, 2, or 3 as a %
$sets = array([0, 0, 1, 1, 2, 2], [0, 0, 0, 1, 1, 2], [0, 0, 0, 1, 2, 2], [0, 0, 1, 1, 1, 2], [0, 1, 1, 1, 2, 2], [0, 0, 1, 2, 2, 2], [0, 1, 1, 2, 2, 2]);
$noWin = 99;

//Get the userID from the LineID
DB::tempTable("CNCT");
$userID = DB::selectSingle(array("LineID" => $_POST["id"])) ["id"];
DB::restoreTable();

//Get the lastQuestion array from the database
$userDetails = DB::selectSingle(array("id" => $userID));
$gold = $userDetails["gold"];
$lastQuestion = json_decode($userDetails["lastQuestion"], true);
//If the ticketCode is set(from buying a ticket)
if (!!isset($lastQuestion[2]["ticketCode"]) && $gold >= 100) {
	//Seed random with the ticketCode
	srand($lastQuestion[2]["ticketCode"]);
	$set = rand(0, 99);
	//Unset the ticketCode to prevent people from getting tickets without buying them, the code is set during the buying process
	unset($lastQuestion["ticketCode"]);
	//Half each percent chance and insert it back into the array as each winning chance has two potential sets
	for ($index = sizeof($percents) - 1;$index >= 0;$index--) {
		$noWin -= $percents[$index];
		$percents[$index] /= 2;
		array_splice($percents, $index, 0, array($percents[$index]));
	}
	//Add in the chance of losing
	array_unshift($percents, $noWin);

	$past = 0;
	//Scan through to the percents
	for ($index = 0;$index < sizeof($percents);$index++) {
		if ($set <= ($past + $percents[$index])) {
			shuffle($sets[$index]);
			$symbols = $sets[$index];
			break;
		}
		else {
			$past += $percents[$index];
		}
	}

	$count = array_count_values($symbols);
	$win = array_search(3, array_count_values($symbols));
	$prizes = explode(",", $userDetails["pendingTicketPrizes"]);
	if (!!$win) {
		if ($prizes[0] == "") {
			$prizes = [];
		}
		array_push($prizes, $win);
	}
	$prizes = implode(",", $prizes);
	$ticketCount = $userDetails["boughtTickets"] + 1;
	if ($ticketCount > 1) {
		$gold -= 100;
	}
	//Set the symbols and removed ticketCode to the database
	DB::update(array("lastQuestion" => json_encode($lastQuestion), "boughtTickets" => $ticketCount, "gold" => $gold, "pendingTicketPrizes" => $prizes), array("id" => $userID));
	respond(collapse($ARRAY, $symbols));
}
else {
	respond(0);
}
PHP(); ?>