<?php $_POST["CAT1"] = "SCHEDULE";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$fields = array("notes", "gps", "user", "maxUsers", "level", "activityTopic");
$week = DB::getWeek("time", $_POST["week"]);
//message::ARR($week);
$result = array();
for ($index = 0;$index < sizeof($week);$index++) {
	array_push($result, collapse($FIELD, $week[$index]));
}
respond(collapse($OBJECT, $result));
PHP(); ?>
