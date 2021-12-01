<?php //closeTicket

/**
 * Close an open ticket as either a success or a failure
 *
 * @param Integer  id  The tickets ID
 * @param Boolean  success Whether the ticket was a success or failure
 *
 * @return true
 */
$_POST["CAT1"] = "TICKETS";
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");
$id = (int)$_POST["id"];
$success = $_POST["success"];
$SUCCEED = 3;
$FAIL = 4;
DB::update(array("status" => $success ? $SUCCEED : $FAIL), array("id" => $id));
respond(1);
PHP(); ?>