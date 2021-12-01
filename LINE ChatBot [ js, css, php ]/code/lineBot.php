<?php
/*〜電子桜〜
少人電　春花枝
し生子　がをを
待は世　来漂吹
て速に　たうく
＝＝＝＝＝＝＝
~Digital Blossom~
Breeze blows through branches
Causing blossoms to float down
Spring has arrived

In this digi-world,
Life can move too fast for us
Please take a moment*/
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/db.php");

$lineBotID = "";
$lineBotSecret = "";
//Channel Access Token
$lineBotCAT = "";

class LineBot {
	public $id = null;
	public $cat = null;
	public $secret = null;
	public $userID = "temp";
	public $replyCode = null;
	public $messages = array();
	public $queue = array();
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Initialisation Functions]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	public function __construct($lineBotID, $lineBotSecret, $lineBotCAT) {
		$this->id = $lineBotID;
		$this->secret = $lineBotSecret;
		$this->cat = $lineBotCAT;
		//handle request
		$message = $this->validateSignatureAndGetBody();
		$this->messages = $this->parseBody($message);
		//$this->setUpMenu();
		
	}
	/**
	 *	Validate that we are who we say we are and get the messages by comparing the headers and secret
	 *
	 *	@throws Exit if verificaionHash is not equal signature(headers X-Line-Signature)
	 *	@return An array of LINE events
	 */
	private function validateSignatureAndGetBody() {
		$signature = getallheaders() ["X-Line-Signature"];
		$message = file_get_contents("php://input"); //
		$verificaionHash = base64_encode(hash_hmac("sha256", $message, $this->secret, true));
		if ($verificaionHash != $signature) {
			tLog("Error handling ID token");
			exit();
		}
		else {
			tLog($message);
		}
		return json_decode($message, true) ["events"];
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Incoming Message Parser Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	Parse through the LINE events to make them more readable by the LINEBot.
	 *
	 *	@param EventArray	$events	A set of the events(text,image,video,ect) that were sent from the bot
	 *
	 *	@throws Some_Exception_Class If something interesting cannot happen
	 *	@return a messages array parsed to work within the system
	 */
	private function parseBody($events) {
		$messages = array();
		for ($index = 0;$index < sizeof($events);$index++) { //A webhook may have multiple events, parse through them
			//Parse the message data with the approprite parser(to make the data handlable by our application)
			$messages[$index] = call_user_func(array($this, "parse" . ucFirst($events[$index]["type"]) . "Event"), $events[$index]);
			if ($events[$index]["type"] == "message") {
				$messages[$index]["type"] = $events[$index]["message"]["type"];
			}
			else {
				$messages[$index]["type"] = $events[$index]["type"];
			}
			if (isset($events[$index]["replyToken"])) {
				$this->replyCode = $events[$index]["replyToken"];
			}
			//If there is a userId, set it to the object
			if (isset($events[$index]["source"]["userId"])) {
				$this->userID = $events[$index]["source"]["userId"];
			}
		}
		return $messages;
	}
	/**
	 *	Parse through an individual LINE event to make it more readable by the LINEBot.
	 *
	 *	@param EventObject	$event	A single event object from the bot
	 *
	 *	@return a message parsed to work within the system
	 */
	private function parseMessageEvent($event) {
		$message = array();
		switch ($event["message"]["type"]) {
			case "text":
				$message = LineBot::handleMessageText($event);
			break;
			case "image":
			case "video":
			case "audio":
			case "file":
				$message = $this->handleMessageMedia($event);
			break;
			case "location":
				$message = LineBot::handleMessageLocation($event);
			break;
			case "sticker":
				$message = LineBot::handleMessageSticker($event);
			break;
		}
		return $message;
	}
	/**
	 *	Event object for when your account is added as a friend (or unblocked). You can reply to follow events.
	 *
	 *	@param FollowEventObject	$event
	 *
	 *	@return
	 */
	public static function parseFollowEvent($event) {
		return false;
	}
	/**
	 *	Event object for when your account is blocked
	 *
	 *	@param UnfollowEventObject	$event
	 *
	 *	@return
	 */
	public static function UnfollowEvent($event) {
		return false;
	}
	/**
	 *	Event object for when your bot joins a group or room. You can reply to join events.
	 *	A join event is triggered at different times for groups and rooms.
	 *	For groups: A join event is sent when a user invites your bot.
	 *	For rooms: A join event is sent when the first event (for example when a user sends a message or is added to the room) occurs after your bot is added.
	 *
	 *	@param JoinEventObject	$event
	 *
	 *	@return
	 */
	private function parseJoinEvent($event) {
		return false;
	}
	/**
	 *	Event object for when a user removes your bot from a group or when your bot leaves a group or room.
	 *
	 *	@param LeaveEventObject	$event
	 *
	 *	@return
	 */
	private function parseLeaveEvent($event) {
		return false;
	}
	/**
	 *	Event object for when a user performs a postback action which initiates a postback.
	 *	postback.data 	String 	Postback data
	 *	The params only returned for postback actions via a datetime picker action.
	 *	Object with the date and time selected by a user through a datetime picker action. The full-date, time-hour, and time-minute formats follow the RFC3339 protocol.
	 *	postback.params 	Object 	JSON object with the date and time selected by a user through a datetime picker action.
	 *	date 	full-date 	Date selected by user. Only included in the date mode.
	 *	time 	time-hour ":" time-minute 	Time selected by the user. Only included in the time mode.
	 *	datetime 	full-date "T" time-hour ":" time-minute 	Date and time selected by the user. Only included in the datetime mode.
	 *
	 *	@param PostbackEventObject	$event
	 *
	 *	@return
	 */
	private function parsePostbackEvent($event) {
		return array("data" => $event["postback"]["data"], "date" => $event["postback"]["params"]["datetime"]);
	}
	/**
	 *	Event object for when a user enters or leaves the range of a LINE Beacon.
	 *	https://developers.line.me/en/docs/messaging-api/using-beacons/
	 *	replyToken 	String 	Token for replying to this event
	 *	beacon.hwid 	String 	Hardware ID of the beacon that was detected
	 *	beacon.type 	String 	Type of beacon event. See Beacon event types.
	 *		enter 	Entered beacon's reception range
	 *		banner 	Tapped beacon banner (https://developers.line.me/en/docs/messaging-api/using-beacons/#beacon-banner ) If you are interested in using the Beacon Banner feature, please make an inquiry at LINE Partner. ( https://partner.line.me/ )
	 *	beacon.dm 	String 	Device message of beacon that was detected. This message consists of data generated by the beacon to send notifications to bots. Only included in webhooks from devices that support the "device message" property.
	 *
	 *	@param BeaconEventObject	$event
	 *
	 *	@return a parsed Beacon Event
	 */
	private function parseBeaconEvent($event) {
		return array("hwid" => $event["beacon"]["hwid"], "type" => $event["beacon"]["type"], "dm" => $event["beacon"]["dm"]);
	}
	/**
	 *	Event object for when a user has linked his/her LINE account with a provider's service account. You can reply to account link events.
	 *	If the link token has expired or has already been used, no webhook event will be sent and the user will be shown an error.
	 *	replyToken 	String 	Token for replying to this event. This value will not be included if the link has failed.
	 *	link 	Object 	link object. This will include whether the account link was successful or not and a nonce generated from the user ID on the provider's service.
	 *		result 	String 	One of the following values to indicate whether the link was successful or not. "ok": Indicates the link was successful. "failed": Indicates the link failed for any reason, such as due to a user impersonation.
	 *		nonce 	String 	Specified nonce when verifying the user ID
	 *
	 *	@param AccountEventObject	$event
	 *
	 *	@return parsed Account Event
	 */
	private function parseAccountEvent($event) {
		return array("result" => $event["link"]["result"]);
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Message Handler Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	Parse the event object of a basic text message
	 *
	 *	@param TextEventObject	$event	The event containing the text message
	 *
	 *	@return parsed Message Text
	 */
	public static function handleMessageText($event) {
		return array("text" => $event["message"]["text"]);
	}
	/**
	 *	Parse a media object and save its contents to the appropriate place on the server
	 *
	 *	@param MediaEventObject	$event	The event containing a link to the media file
	 *
	 *	@return The saved filename
	 */
	public function handleMessageMedia($event) {
		$event = $event["message"];
		$type = $event["type"];
		if ($type == "image" || $type == "video" || $type == "file") {
			$type .= "s";
		}
		$curl = curl_init();
		curl_setopt_array($curl, array(CURLOPT_URL => "https://api.line.me/v2/bot/message/" . $event["id"] . "/content", CURLOPT_POST => false, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array('Content-type: application/x-www-form-urlencoded;charset=UTF-8', 'Accept: image/png, image/gif, image/x-bitmap, image/jpeg, image/pjpeg', 'Connection: Keep-Alive', 'Authorization: Bearer ' . $this->cat)));
		$image = curl_exec($curl);
		curl_close($curl);

		$filename = DB::encodeID((string)rand());
		while (file_exists($_SERVER["DOCUMENT_ROOT"] . "/$type/lineBot/$filename.jpg")) {
			$filename = DB::encodeID((string)rand());
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/$type/lineBot/$filename.jpg", $image);
		return array("url" => $filename);
	}
	/**
	 *	Parse the location from a location event object
	 *
	 *	@param LocationEventObject	$event	Message object which contains the location data sent from the source.
	 *		title 	String 	Title
	 *		address 	String 	Address
	 *		latitude 	Decimal 	Latitude
	 *		longitude 	Decimal 	Longitude
	 *
	 *	@return the parsed location
	 */
	public static function handleMessageLocation($event) {
		$event = $event["message"];
		return array("title" => $event["title"], "address" => $event["address"], "latitude" => $event["latitude"], "longitude" => $event["longitude"]);
	}
	/**
	 *	Parse the information from a sticker event object
	 *	For a list of basic LINE stickers and sticker IDs, see sticker list.
	 *	https://developers.line.me/media/messaging-api/sticker_list.pdf
	 *
	 *	@param StickerEventObject	$event	Message object which contains the sticker data sent from the source.
	 *		packageId 	String 	Package ID
	 *		stickerId 	String 	Sticker ID
	 *
	 *	@return a parsed sticker object
	 */
	public static function handleMessageSticker($event) {
		return array("packageId" => $event["packageId"], "stickerId" => $event["stickerId"]);
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Feature Setup Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	Adds a LIFF to the bot(to be opened with MSG::liff), a LIFF is essentially a webpage in a inbuilt browser window
	 *
	 *	@param URLString	$url The url to display
	 *	@param TypeString	$type	The size if the LIFF ("compact" || "tall" || "full")
	 *	see https://developers.line.biz/media/liff/overview/viewTypes-4cb714f3.png for sizes
	 */
	public function addLIFF($url, $type = "compact") {
		global $baseURL;
		$fields = array("view" => array("type" => $type, "url" => "$baseURL/$url"));
		$response = $this->sendToAPI("https://api.line.me/liff/v1/apps", $fields);
		$this->queueContent(json_encode($response));
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Auxilary Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	Sends data to the Line API using curl and the appropriate credentials
	 *
	 *	@param URLString	$url	The location of where to send the content
	 *	@param Array	$fields	The content to send to the API
	 *
	 *	@return The response from the server
	 */
	private function sendToAPI($url, $fields = []) {
		$fields = json_encode($fields);
		$curl = curl_init();
		curl_setopt_array($curl, array(CURLOPT_URL => $url, CURLOPT_POST => false, CURLOPT_POSTFIELDS => $fields, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'Authorization: Bearer ' . $this->cat)));

		$response = curl_exec($curl);
		curl_close($curl);
		return $response;
	}
	/**
	 *	Send a simple text message to the user using the provided reply token
	 *
	 *	@param String	$message	The text of of what to reply
	 */
	private function replyText($message) {
		$this->sendToAPI("https://api.line.me/v2/bot/message/reply", array("replyToken" => $this->replyCode, "messages" => array(array("type" => "text", "text" => $message))), true);
	}
	/**
	 *	Send a message to the user using the provided reply token
	 *
	 *	@param MessageObject	$message	An event object (built by the MSG class) of what to reply
	 */
	private function replyContent($content) {
		if (isset($content["type"])) {
			$content = array($content);
		}
		$this->sendToAPI("https://api.line.me/v2/bot/message/reply", array("replyToken" => $this->replyCode, "messages" => $content), true);
	}

	/**
	 *	Add to a queue to send multiple messages at once
	 *
	 *	@param ResponseObject	$content	An object capiable of being displayed by the Line App.
	 *
	 */
	public function queueContent($content) {
		if (is_string($content)) {
			$content = MSG::text($content);
		}
		array_push($this->queue, $content);
	}
	/**
	 *	Reply the array of the queued messages to the user. This sends the queue array to the Line App(but does not need to return anything)
	 *
	 */
	public function replyQueue() {
		if (sizeof($this->queue) > 0) {
			$this->replyContent($this->queue);
		}
	}
	/**
	 *	Writes to an external file to keep a history of the users requests and interaction with the bot.
	 *
	 *	@param IDString	$userID	The id of the user being recorded(this will be the filename)
	 *	@param MessageString	$message	What is being recorded(if it is an array or an object, it is converted to a JSON string)
	 *	@param Boolean	$clear	if true, it will clear the contents of the file before writing to it.
	 *
	 */
	public static function writeTotLog($userID, $message, $clear = false) {
		if (!isset($clear)) {
			$clear = false;
		}
		if (is_array($message)) {
			$message = json_encode($message) . "\n";
		}
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/chatLogs/" . $userID . ".txt", $clear == true ? "w" : "a");
		fwrite($file, $message . "\n");
		fclose($file);
	}
	/**
	 *	Create an imagemap menu to popup from the bottom of the screen
	 *	2500x1686 or 2500x843 pixels, JPEG or PNG,1 MB
	 *	up to 20 different tappable areas
	 *
	 *	@param String	menuName	The name of the menu
	 *	@param String	chatBarText	The text to be displayed on the bar when the menu is collapsed
	 *	@param URLString	imageURL	A url linking to the image to be uploaded
	 *	@param Array	names	The names of the touchable areas
	 *	@param Array	hotspots	An array of the coordinates of the touchable areas represented by the names array
	 *	@param Integer	size	An index of 0(843) or 1(1686) to represent the height of the image
	 *
	 *	@return the rich menu ID
	 */
	public function createRichMenu($menuName, $chatBarText, $imageURL, $names, $hotspots, $size, $default = false) {
		$height = array(843, 1686);
		$menu = array("size" => array("width" => 2500, "height" => $height[$size]), "selected" => false, "name" => $menuName, "areas" => array(), "chatBarText" => $chatBarText != null ? $chatBarText : "Menu");
		for ($index = 0;$index < sizeof($names);$index++) {
			$hotspots[$index] = explode(",", $hotspots[$index]);
			array_push($menu["areas"], array("bounds" => array("x" => round((int)$hotspots[$index][0] * 2.40384615), "y" => round((int)$hotspots[$index][1] * 2.40384615), "width" => round((int)$hotspots[$index][2] * 2.40384615), "height" => round((int)$hotspots[$index][3] * 2.40384615)), "action" => array("type" => "message", "text" => $names[$index])));
		}
		$richMenuID = json_decode($this->sendToAPI("https://api.line.me/v2/bot/richmenu", $menu), true) ["richMenuId"];
		$this->sendImage("https://api.line.me/v2/bot/richmenu/" . $richMenuID . "/content", $imageURL);
		if ($default) {
			$this->setRichMenu($richMenuID, true);
		}
		return $richMenuID;
	}
	public function setRichMenu($id, $default = false) {
		if ($default) {
			$this->sendToAPI("https://api.line.me/v2/bot/user/all/richmenu/" . $id);
		}
		else {
			$this->sendToAPI("https://api.line.me/v2/bot/user/$this->userID/richmenu/$id");

		}
	}
	/**
	 *	Uploads an image to the line server for the purposes of creating a rich menu.
	 *
	 *	@param URLString	$uploadUrl	The url on the Line server where the image is being sent to
	 *	@param URLString	$imageURL	The url of the image being sent
	 *
	 *	@return The response from the server
	 */
	public function sendImage($uploadUrl, $imageURL) {
		global $baseURL;
		$imageURL = realpath("../" . $imageURL);
		$curl = curl_init();
		curl_setopt_array($curl, array(CURLOPT_URL => $uploadUrl, CURLOPT_CUSTOMREQUEST => "POST", CURLOPT_BINARYTRANSFER => true, CURLOPT_HEADER => true, CURLOPT_HTTPHEADER => array('Content-Type: image/png', 'Authorization: Bearer ' . $this->cat, 'Content-Length: ' . filesize($imageURL)), CURLOPT_PUT => true, CURLOPT_INFILE => fopen($imageURL, 'r'), CURLOPT_INFILESIZE => filesize($imageURL)));
		$response = curl_exec($curl);
		curl_close($curl);
		return $response;
	}

	/**
	 * Scan through and delete all associated rich menus
	 */
	public static function deleteAllRichMenus() {
		global $lineBotCAT;
		$curl = curl_init();
		curl_setopt_array($curl, array(CURLOPT_URL => "https://api.line.me/v2/bot/richmenu/list", CURLOPT_POST => false, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'Authorization: Bearer ' . $lineBotCAT)));

		$response = curl_exec($curl);
		curl_close($curl);
		$response = json_decode($response, true) ["richmenus"];
		foreach ($response as $key => $value) {
			$curl = curl_init();
			curl_setopt_array($curl, array(CURLOPT_URL => "https://api.line.me/v2/bot/richmenu/" . $value["richMenuId"], CURLOPT_CUSTOMREQUEST => "DELETE", CURLOPT_HTTPHEADER => array('Content-Type: application/json', 'Authorization: Bearer ' . $lineBotCAT)));

			$response = curl_exec($curl);
			curl_close($curl);
		}
	}
}

class MSG {
	/**
	 *	This returns all arguments as an array as the containers want arrays
	 *
	 *	@params ... Anything you want
	 *
	 *	@return an array of the params
	 */
	public static function content() {
		return func_get_args();
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Containers Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	Creates a flex object which is essentially a way of creating various custom layouts given the content
	 *	@param String	$altText Alt text is required by the Line API, it is used for accessability purposes
	 *	@param MessageObjectArray	$contents An array of the elements that will populate the flex box.
	 *	@param Boolean	$carousel Whether the flex box is a carousel or not
	 *
	 *	@return A flex object of the given contents
	 */
	public static function flex($altText, $contents, $carousel = false) {
		$contents = $carousel ? MSG::bubble($contents) : MSG::bubble($contents);
		return array("type" => "flex", "altText" => $altText, "contents" => $contents);
	}
	/**
	 *	A box is a simple container for grouping and displaying content horizontally or vertically
	 *
	 *	@param Boolean	$vertical	If true, the content will be vertical
	 *	@param MessageObjectArray	$content An array of the objects to be put into the box
	 *
	 *	@return The box object
	 */
	public static function box($vertical, $content) {
		return array("type" => "box", "layout" => $vertical ? "vertical" : "horizontal", "spacing" => "md", "contents" => $content);
	}
	/**
	 *	A bubble is a simpler container
	 *
	 *	@param MessageObjectArray	$body	The content of the bubble
	 *
	 *	@return The bubble object
	 */
	public static function bubble($body) {
		return array("type" => "bubble", "body" => $body);
	}
	/**
	 *	A carousel is a form of containers that let users horizontally swipe through
	 *
	 *	@param MessageObjectArray	$body	The containers that will populate the carousel
	 *
	 *	@return The carousel object
	 */
	public static function carousel($body) {
		return array("type" => "carousel", "body" => $body);
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Message Content Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	An object that contains a basic text message to send to the user
	 *
	 *	@param String	$content The string to be displayed
	 *
	 *	@return A TextMessage object
	 */
	public static function text($content) {
		return array("type" => "text", "text" => $content);
	}
	/**
	 *	A button object that links to an external website with LINEs internal browser
	 *
	 *	@param String	$text	The text that will be dispayed along with the link
	 *	@param URLString	$uri	The URL of the page that the button will link to
	 *
	 *	@return	A button that will link to a webpage
	 */
	public static function linkButton($text, $uri) {
		return array("type" => "button", "action" => array("type" => "uri", "uri" => $uri, "label" => $text,), "style" => "primary", "color" => "#0000ff");
	}
	/**
	 *	A basic button object, can be used to send postback events.
	 *
	 *	@param String	$text The text to be displayed on the button
	 *	@param PostbackAction	$data	The text that will be sent back when the user presses the button
	 *	@param String	$response The text that will be displayed to the user when they press the button
	 *
	 *	@return The button object
	 */
	public static function button($text, $data, $response = "") {
		return array("type" => "button", "action" => MSG::postback($text, $data, $response), "style" => "primary", "style" => "primary", "color" => "#0000ff");
	}
	/**
	 *	A wrapper for the sprintf function that allows the enjecting of a variable into a string
	 *
	 *	@param Variable	$var	The content to inject
	 *	@param String	$string	The base string with formatable portions, ie (%s or %d)
	 *
	 *	@return The formatted string
	 */
	public static function injectVarToString($var, $string) {
		return sprintf($string, $var);
	}
	/**
	 *	A seperator is basically a HR for visually dividing content in a box or other container
	 *
	 *	@return A seperator object
	 */
	public static function separator() {
		return array("type" => "separator");
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[ Postbacks Functions ]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
	
	/**
	 *	A postback event requesting the user place a GPS marker on a map
	 *
	 *	@param String	$text	The text to be displayed as an accompanying message
	 *	@param String	$text	The text to be displayed on the button
	 *
	 *	@return	A buttonTemplate for requesting a GPS location
	 */
	public static function gps($text, $buttonText = "Select Location") {
		return MSG::buttonTemplate($text, array(array("type" => "location", "label" => $buttonText, //Required	Label for the action.max: 20 characters
		)), "buttons");
	}
	/**
	 *	A simple question format with a boolean answer, ususally yes/no
	 *
	 *	@param String	$questionText	The text of the question to be asked
	 *	@param StringArray	$answerText The text to be asked, an array of the two options. Defaults to yes/no
	 *
	 *	@return A Yes/No Question object
	 */
	public static function yesNoQuestion($questionText, $answerText = array("Yes", "No")) { //$questionText max length=240 characters
		return array("type" => "template", "altText" => $questionText, "template" => array("type" => "confirm", "text" => $questionText, "actions" => array(MSG::message($answerText[0], $answerText[0]), MSG::message($answerText[1], $answerText[1]))));
	}
	/**
	 *	A multiple choice question, ie question text followed by buttons
	 *
	 *	@param CollapsedArrayString	$text	a collapsed array(as a string) of the question and following answers
	 *
	 *	@return A Multi Choice question object.
	 */
	public static function multiChoice($text) {
		global $FIELD;
		$options = expand($FIELD, $text);
		$text = $options[0];
		array_shift($options);
		for ($index = 0;$index < sizeof($options);$index++) {
			$options[$index] = MSG::button($options[$index], $options[$index], null);
		}
		return MSG::flex($text, MSG::box(true, MSG::content(MSG::text($text), MSG::box(true, $options))), false);
	}
	/**
	 *	A Postback action is a simple object that is sent back to the server when the user completes a simple or complex action. From clicking a button to taking a photo.
	 *
	 *	$label is required for templates other than image carousel. Max: 20 characters.
	 *	Optional for image carousel templates. Max: 12 characters.
	 *	Optional for rich menus. Spoken when the accessibility feature is enabled on the client device. Max: 20 characters.
	 *	Supported on LINE 8.2.0 and later for iOS.
	 *	Required for quick reply buttons. Max: 20 characters.
	 *	Supported on LINE 8.11.0 and later for iOS and Android.
	 *	Requird for the button component of Flex Message.
	 *	This property can be specified for the box, image, and text components but its value is not displayed. Max: 20 characters.
	 *
	 *	$data max: 300 characters
	 *	displayText	The displayText the replied text =>Max 300 characters, eg. action=buy&itemid=111
	 *
	 *	@param String	$label The text that is displayed to the user
	 *	@param PostbackAction	$data	The data that is returned by the action
	 *	@param String	$displayText	Required for quick reply buttons. Optional for the other message types.
	 *
	 *	@return	A postback message object
	 */
	public static function postback($label, $data, $displayText = null) {
		$response = array("type" => "postback", "label" => $label, "data" => $data);
		if ($displayText != null) {
			$response["displayText"] = $displayText;
		}
		return $response;
	}
	//message Action
	
	/**
	 *	When the user uses a postback, this sends a text message
	 *
	 *	@param String	$label	The text that is displayed
	 *	@param String	$text	The text that is displayed to the user
	 *
	 *	@return A message object
	 */
	public static function message($label, $text) {
		return array("type" => "message", "label" => $label, "text" => $text);
	}
	//URI Action
	
	/**
	 *	When the user uses a postback, they are directed to the provided link
	 *
	 *	@param String	$label	The text that is displayed
	 *	@param URLString	$url The link that the user is directed to; maxLength=1000; http, https, line, and tel schemes available
	 *
	 *	@return A URI Object
	 */
	public static function uri($label, $url) {
		return array("type" => "uri", "label" => $label, "uri" => $url);
	}
	/**
	 *	A button object set, used for postback events
	 *
	 *	@param String	$text	The text displayed in conjunction with the buttons
	 *	@param Array	$buttons
	 *	@param String	$type The type of buttons to send("buttons" or "confirm")
	 *
	 *	@return
	 */
	public static function buttonTemplate($text, $buttons, $type = "buttons") {
		return array("type" => "template", "altText" => $text, "template" => array("type" => "$type", "text" => $text, "actions" => $buttons));
	}
	/**
	 *	This postback action lets the user select a date and/or time to upload
	 *
	 *	@param String	$label	The text that is displayed
	 *	@param String	$data	String returned via webhook in the postback.data property of the postback event(300 chars)
	 *	@param Integer	$mode	The three modes are 0:date(2017-06-18),1:time(06:15),2:datetime(2017-06-18t06:15) - follow the RFC3339 protocol.
	 *	@param DateTime	$initial	The initial value of the date time
	 *	@param DateTime	$min	The smallest datetime that can be selected
	 *	@param DateTime	$max	The largest datetime that can be selected
	 *
	 *	@return A datetime postback object
	 */
	public static function datetime($label, $data, $mode, $initial, $min = "1900-01-01t00:00", $max = "2099-12-31t23:59") {
		$response = array("type" => "datetimepicker", "label" => $label, "text" => $data, "data" => $data);
		switch ($mode) {
			case 0:
				$response["mode"] = "date";
			break;
			case 1:
				$response["mode"] = "time";
			break;
			case 2:
				$response["mode"] = "datetime";
			break;
			default:
				$response["mode"] = $mode;
		}
		if ($initial != null) {
			$response["initial"] = str_replace('	', 't', $initial);
		}
		if ($max != null) {
			$response["max"] = str_replace('	', 't', $max);
		}
		if ($min != null) {
			$response["min"] = str_replace('	', 't', $min);
		}
		return $response;
	}
	/**
	 *	When the user does the postback action, it opens the camera
	 *
	 *	@param String	$label	The text displayed to the user
	 *
	 *	@return	A camera action object
	 */
	public static function camera($label) { //can be configured only with quick reply buttons
		//return array("type"=>"camera","label"=>$label);
		return MSG::buttonTemplate($label, array(array("type" => "camera", "label" => "Take photo", //Required	Label for the action.max: 20 characters
		)));
	}
	//Camera roll action
	
	/**
	 *	A camera roll allows users to select multiple images from their gallery to send
	 *
	 *	@param String	$label The text to be displayed to the user
	 *
	 *	@return A Camera Roll Action
	 */
	public static function cameraRoll($label) {
		return array("type" => "cameraRoll", "label" => $label);
	}
	//Location action
	
	/**
	 *	When the user does the postback action, a map opens for the user to select a location
	 *
	 *	@param String	$label	The text to be displayed by the
	 *
	 *	@return	A location postback object
	 */
	public static function location($label) {
		return array("type" => "location", "label" => $label);
	}
	/**
	 *	A LIFF is a browser window that takes up a portion of the screen to mimic being part of the chat bot.
	 *	It has to be preregistered using LineBot->addLIFF
	 *
	 *	@param String	$id The id of the LIFF to go to(returns when registered with the addLiff function)
	 *	@param String	$label The text to be displayed, the default is "liff"
	 *	@param String	$fields The fields provided to the page in the form of a GET request
	 *
	 *	@return a LIFF object
	 */
	public static function LIFF($id, $label = "liff", $fields = null) {
		if ($fields != null) {
			$id .= "?" . $fields;
		}
		return MSG::uri($label, "line://app/" . $id);
	}
	/**
	 * Let quick reply options appear at the bottom of a message
	 *
	 * @param MessageObject     $baseObj    The object to attach the menu to
	 *                                      If a string, it makes a message
	 * @param MultiDimenArray   $options    The array of quickReply options
	 * [[[actionText,actionText],[action,action],[extra,extra]],[...],...]
	 *      String  actionText   The text next to the quick array button
	 *      String  action  postback,message,datetime,camera,cameraRoll,location
	 *      URL     image   The icon next to the button
	 *                      The images are stored on the server
	 *                      Max character limit: 1000
	 *                      URL scheme: https
	 *                      Image format: PNG
	 *                      Aspect ratio: 1:1
	 *                      Data size: Up to 1 MB
	 *                      Max dimens: unlimited
	 *      Array   extra   Any extra information inserted into the action
	 *
	 * @return The baseObj with a quickMenu attached
	 */
	public static function quickReply($baseObj, $options) {
		for ($index = 0;$index < sizeof($options);$index++) {
			$extra = sizeof($options[$index]) > 3 ? $options[$index][3] : null;
			$options[$index] = array("type" => "action", "imageUrl" => $options[$index][0], "action" => array("type" => $options[$index][1], "label" => $options[$index][2]));
			if (!getimagesize($options[$index]["imageUrl"])) {
				unset($options[$index]["imageUrl"]);
			}
			if ($options[$index]["action"]["type"] == "message") {
				$options[$index]["action"]["text"] = $extra != null ? $extra : $options[$index]["action"]["label"];
			}
			else if ($options[$index]["action"]["type"] == "postback") {
				$options[$index]["action"]["data"] = $extra != null ? $extra[0] : $options[$index]["action"]["label"];
				$options[$index]["action"]["displayText"] = $extra != null && sizeof($extra) > 1 ? $extra[1] : $options[$index]["action"]["label"];
			}
		}
		$baseObj["quickReply"] = array("items" => $options);
		return $baseObj;
	}
	/**
	 *
	 *
	 * @param URLString $url    The location of the image
	 *                          format: JPEG or PNG
	 *                          width: 240px, 300px, 460px, 700px, 1040px
	 *                          maxSize: 1 MB
	 * @param Array $hotspots   The touchable locations
	 * @param Array $text       An associative array of the names/keys
	 *
	 * @return An image map object
	 */
	public static function imageMap($name, $url, $hotspots, $text) {
		global $baseURL;
		$url = $baseURL . "/" . $url;
		list($width, $height, $type, $attr) = getimagesize($url . "/1040");
		$imageMap = array("type" => "imagemap", "altText" => $name, "baseUrl" => $url, "baseSize" => array("width" => 1040, "height" => $height), "actions" => array());

		for ($index = 0;$index < sizeof($text);$index++) {
			$hotspots[$index] = explode(",", $hotspots[$index]);
			array_push($imageMap["actions"], array("type" => "message", "label" => $text[$index], "text" => $text[$index], "area" => array("x" => $hotspots[$index][0], "y" => $hotspots[$index][1], "width" => $hotspots[$index][2], "height" => $hotspots[$index][3])));
		}
		return $imageMap;
	}
	/**
	 * Send a simple image to the user
	 *
	 * @param URLString $url The location(in the images dir) of the image to send
	 *                       JPG, max:4096px*4096px, 1MB
	 * @param URLString $previewUrl The address(in the images dir) of the preview image
	 *                       JPG, max:240px*240px, 1MB
	 *
	 * @return The image object
	 */
	public static function image($url, $previewUrl) {
		global $baseURL;
		return array("type" => "image", "originalContentUrl" => "$baseURL/images/$url", "previewImageUrl" => "$baseURL/images/$previewUrl");
	}
}

/**
 *
 *	@param String	$lineBotID
 *	@param String	$lineBotSecret
 *	@param String	$lineBotCAT
 *
 *	@return
 */
class QuestionBot {
	public $user = null;
	public $questions = array();
	public $dictEntriesEN = array();
	public $dictEntriesJP = array();
	public $lang = 0;
	public $questionSet = null;
	public function __construct($dbTable = null) {
		global $baseURL, $lineBotID, $lineBotSecret, $lineBotCAT;
		if ($dbTable != null) {
			$_POST["CAT1"] = $dbTable;
			DB::$table = DB::tableDetails();
		}
		$this->lineBot = new LineBot($lineBotID, $lineBotSecret, $lineBotCAT);
		$this->addQuestionSets(array_merge(array("welcome" => array(array("func", "settings", 0, "welcome"), array("mc", "settings", 1, "lang"), array("func", "settings", 4, "name"), array("text", "settings", 5, "email"), array("dt", "settings", 6, "birthday", 0)), "default" => array(array("preText", "menu", 0, "preText"), array("menu", "menu", 0, "choice")), "menu" => array(array("menu", "menu", 0, "choice")), "question" => array(array("func", "askQuestion", 0, "question")), "postQuestion" => array(array("func", "askQuestion", 0, "question")), "settings" => array(array("mc", "settings", 0, "setting"), array("settings", "settings", 1, "set"))), $this->questions));
		$this->addDictEntries(array_merge(array("menu" => array("question" => "Ask A Question", "settings" => "Settings"), "default" => array("menu" => "Open The Menu", "postQuestion" => "Ask That Message As A Question", "settings" => "Settings"), "settings" => array("What setting would you like to change?~!Language(言語)~!Name~!Email~!Birthday", "Which language do you prefer?\nどのような言語を好むのですか？~!English~!日本語", "Language(言語)", "Language has been changed. To update the menu, please reopen the chat.", "What is your name?", "What is your email?", "What is your date of birth?"), "askQuestion" => array("What would you like to ask?", "Your question has been sent, please wait while our staff gets back to you."), "basicDefault" => array("What time would you like to select?", "What photos would you like to select?", "What would you like to do?", "Yes", "No", "Thank you! Welcome to the enCharge system.")), $this->dictEntriesEN), array_merge(array("settings" => array("どの設定を変更しますか？~!言語(Language)~!名前~!電子メール~!誕生日", "Which language do you prefer?\nどのような言語を好むのですか？~!English~!日本語", "言語(Language)", "言語を変わりました。メニューを更新するには、チャットを再度開いてください。", "お名前は?", "メールは？", "誕生は?"), "menu" => array("menu" => "メニューを開く", "question" => "前の文書で伺います", "settings" => "設定"), "default" => array("menu" => "メニューを開きます", "postQuestion" => "前のメッセージで質問を伺います", "settings" => "設定"), "askQuestion" => array("何を質問したいですか？", "質問が送信されました。スタッフがご連絡するのをお待ち下さい。"), "basicDefault" => array("何時を選択しますか？", "どの写真を選択したいですか？", "何をしたいですか?", "はい", "いいえ", "enChargeシステムへようこそ。")), $this->dictEntriesJP));
		$this->user = $this->fetchUser();
		//$this->resetQuestionSet();
		$response = $this->parseResponse($this->lineBot->messages);
	}

	/**
	 *	This is the current set, depending on the input variable it will return either the set name or the set itself
	 *
	 *	@param Integer	$index If it is a positive integer it is index of the associated question set.
	 *							An $index of -3(default) will return the name of the set
	 *							An $index of -2 will return all of the questions associated with the set
	 *							An $index of -1 will return the current question set
	 *
	 *	@return Either a question set(from $this->questions), collection of sets or the name of the set
	 */
	public function set($index = - 3) {
		if ($index === - 3) {
			return $this->questionSet["set"];
		}
		else if ($index == - 2) {
			return $this->questions[$this->set() ];
		}
		else if ($index == - 1) {
			$index = $this->index();
		}
		return $this->set(-2) [$index];
	}
	/**
	 *	Set the name of the current set
	 *
	 *	@param String	$set	The id key　of the desired set
	 */
	public function setSet($set = "default") {
		$this->questionSet["set"] = $set;
	}
	/**
	 *	A getter for the current questionSet index(Which question is being asked)
	 *
	 *	@return The current questionSet index
	 */
	public function index() {
		return (int)$this->questionSet["index"];
	}
	/**
	 *	A setter for the current questionSet index(Which question is being asked)
	 *
	 *	@param Integer	$index The index to set the current index to
	 */
	public function setIndex($index) {
		$this->questionSet["index"] = $index;
	}

	/**
	 *	This function is a getter for the answers that the user has already answered
	 *
	 *	@param String	$key	If a key is set, only fetch the single answer tied to the key otherwise get all of the answers
	 *
	 *	@return Either the set of answers or just the one designated by the supplied key
	 */
	public function answers($key = null) {
		if ($key == null) {
			return $this->questionSet["answers"];
		}
		else {
			return $this->questionSet["answers"][$key];
		}
	}
	/**
	 *	This function is the setter for the users answers
	 *
	 *	@param String	$key	The key that the answer is going to be assigned to
	 *	@param String	$answer	The answer to store
	 */
	public function setAnswer($key, $answer) {
		$this->questionSet["answers"][$key] = $answer;
	}
	/**
	 *	Clears all of the stored answers
	 */
	public function clearAnswers() {
		$this->questionSet["answers"] = array();
	}
	/**
	 *	Clears the entire questionSet(set, index and answers)
	 *
	 *	@param String	$set	The new set name to start defaults to the default set
	 */
	public function resetQuestionSet($set = "default") {
		$this->setSet($set);
		$this->setIndex(0);
		$this->clearAnswers();
	}
	/**
	 *	Adds any question sets to the collection of question sets
	 *
	 *	@param AssociativeArray	$sets	An associative array of the questions, each question is an array of the following: [type,dictSet,dictIndex,fieldName]
	 *	 		String type	The type of question (text,mc[multichoice],schedule,gps,dt[datetime],liff,photo,yn(yesNo),next,func[customFunction])
	 *			String dictSet The group of strings to use from the dictionary
	 *			Integer	dictIndex	The index of what string to use from the dictionarySet
	 *			String fieldName	The name that the answer will be saved as
	 */
	public function addQuestionSets($sets) {
		$this->questions = array_merge($this->questions, $sets);
	}
	/**
	 *	This is the dictionary of text that bot can send
	 *
	 *	@param AssociativeArray	$en	An associative array of arrays of English text
	 *	@param AssociativeArray	$jp	An associative array of arrays of Japanese text
	 */
	public function addDictEntries($en, $jp = array()) {
		$this->dictEntriesEN = array_merge($this->dictEntriesEN, $en);
		$this->dictEntriesJP = array_merge($this->dictEntriesJP, $jp);
	}
	/**
	 *	Get a dictionary or string in the users language
	 *
	 *	@param String	$set	The group of dict entries
	 *	@param Str/Int	$text	The index of the specific string to be used
	 *
	 *	@return A dict array or string
	 */
	public function dict($set = null, $text = - 1) {
		switch ($this->lang) {
			case 0:
				$dict = $this->dictEntriesEN;
			break;
			case 1:
				$dict = $this->dictEntriesJP;
			break;
			default:
				$dict = $this->dictEntriesEN;
		}
		if ($set != null) {
			$dict = $dict[$set];
		}
		if ($text != - 1) {
			$dict = $dict[$text];
		}
		return $dict;
	}

	/**
	 *	Using the Line User ID provided by the incoming message, search the database for the user. Set the language and get the current question set.
	 *
	 *	@return The user ID
	 */
	public function fetchUser() {
		//Check connections table for user id by searching the line id
		$user = DB::selectSingleFrom("users", array("LineID" => $this->lineBot->userID));

		//if it doesn't exist, register it
		if (!$user) {
			$user = $this->registerUser($this->lineBot->userID);
		}

		//Set the language
		DB::tempTable("USER");
		$details = DB::selectSingle(array("id" => $user["id"]));
		$this->lang = (int)$details["language"];
		DB::restoreTable();

		//Get current question
		$question = json_decode($user["lastQuestion"], true);
		$this->questionSet = array("set" => $question[0], "index" => $question[1], "answers" => $question[2]);

		return $user["id"];
	}
	/**
	 *	The user doesn't exist, so we want to create a new one
	 *
	 *	@param String	$lineID
	 *
	 *	@return The new entry of the LINE user table
	 */
	public function registerUser($lineID) {
		$user = DB::insertInto("users", array("lineID" => $lineID, "lastQuestion" => json_encode(array("welcome", "0", array()))));

		//We need to insert to the regular user tables otherwise it will throw off the ID count(they're matched by the primary key)
		DB::tempTable("USER");
		DB::insert(array("language" => 0));
		DB::insertInto("Connections", array("LineID" => $lineID));
		DB::insertInto("Login", array("Username" => $lineID, "Email" => $lineID, "Password" => $lineID));
		DB::restoreTable();
		return DB::selectSingleFrom("users", array("id" => $user));
	}
	/**
	 *	Parse through the current question in tangent with the users text to start or continue the question
	 *
	 *	@param EventObject	$answer	The parsed event from the user
	 */
	public function parseResponse($answer) {
		$this->answerQuestion($answer);

		if ($this->set(-1) [0] == "preText") {
			$set = $this->parseMenu($this->answers("preText"));
			if ($set != "default") {
				$this->resetQuestionSet($set);
			}
			else {
				$this->continueQuestionSet();
			}
		}
		else {
			$this->continueQuestionSet();
		}

		//Ask the next question if available
		if ($this->index() > - 1 && $this->index() < sizeof($this->questions[$this->set() ]) && $this->set() != "") {
			$this->askQuestion();
		}
		else {
			$this->resetQuestionSet();
		}

		//Store the current question/answers in the databse
		DB::updateOn("users", array("lastQuestion" => json_encode(array($this->set(), $this->index(), $this->answers()))), array("id" => $this->user));
		//Send the responses
		$this->lineBot->replyQueue();
	}

	/**
	 *	Parse the users answer and store it in the assigned field
	 *
	 *	@param EventObject	$answer	The text/data provided by the user
	 */
	public function answerQuestion($answer) {
		global $ARRAY;
		$set = $this->set(-1);
		$answers = array();
		//Go through every one of the
		if ($set != null) {
			for ($index = 0;$index < sizeof($answer);$index++) {
				switch ($set[3]) { //field
						
					case "gps":
						array_push($answers, collapse($ARRAY, array($answer[$index]["address"], $answer[$index]["latitude"], $answer[$index]["longitude"])));
					break;
					default:
						if (hasKey($answer[$index], "text")) {
							array_push($answers, $answer[$index]["text"]);
						}
						else if (hasKey($answer[$index], "data")) {
							if (hasKey($answer[$index], "date") && $answer[$index]["date"] != null) {
								array_push($answers, str_replace("T", " ", $answer[$index]["date"]));
							}
							else {
								array_push($answers, $answer[$index]["data"]);
							}
						}
						else if (hasKey($answer[$index], "type") && $answer[$index]["type"] == "image") {
							array_push($answers, $answer[$index]["url"]);
						}
					}
				}
				if (sizeof($answers) == 1) {
					$answer = $answers[0];
				}
				else if (sizeof($answers) > 1) {
					$answer = $answers;
				}
				$this->setAnswer($set[3], $answer);
			}
	}
	/**
	 *	Use the message from the user to select a menu option to start a new question set
	 *
	 *	@param String	$incoming	The message from the user, the option to be selected
	 */
	public function parseMenu($incoming) {
		$setID = "default";
		if ($incoming == $this->dict("default", "postQuestion")) {
			$this->askHelpDesk($this->answers("preText"), $this->user);
		}
		else {
			if ($this->set() == "default") {
				foreach ($this->dict("default") as $key => $value) {
					if ($value == $incoming) {
						$setID = $key;
						break;
					}
				}
			}
			foreach ($this->dict("menu") as $key => $value) {
				if ($value == $incoming) {
					$setID = $key;
					break;
				}
			}
		}
		return $setID;
	}
	/**
	 *	Builds a multichoice menu for either the main menu or default response
	 *
	 *	@param String	$menu	The name of the menu to build, either "menu" or "defualt"
	 *
	 *	@return The menu object
	 */
	public function menu($menu = "default") {
		/*$options=array();
			foreach($this->dict($menu) as $value){
				array_push($options,MSG::button($value,$value,null));
			}
			return MSG::flex($this->dict("basicDefault",2),MSG::box(true,MSG::content(
				MSG::text($this->dict("basicDefault",2)),
				MSG::box(true,$options)
			)	),false);*/
		$options = array();
		foreach ($this->dict($menu) as $id => $value) {
			array_push($options, $value);
		}
		return MSG::imageMap(($this->lang == 0 ? "Menu" : "メニュー"), "images/" . ($menu == "default" ? "lineBot" : $this->botName) . "/menu/" . ($this->lang == 0 ? "en" : "jp"), $this->menuHotspots, $options);
	}
	/**
	 *	Increase the question index by moving to the next index, unless the set is over then handle the sets completion
	 */
	public function continueQuestionSet() {
		$current = $this->index();
		if ($current + 1 >= sizeof($this->set(-2))) { //Out of questions in the set
			$set = $this->set();
			if ($set == "default" || $set == "menu") {
				$set = $this->parseMenu($this->answers("choice"));
				if ($set == null) {
					$set = $this->parseMenu($this->answers("preText"));
				}
				$this->resetQuestionSet($set);
				return;
			}
			else if ($set == "question") {
				$this->askHelpDesk($this->answers("question"), $this->user);
			}
			else if ($set == "settings") {
				$this->setDefaultSetting();
			}
			else if ($set == "welcome") {
				$this->setWelcomeDetails();
			}
			else {
				$this->handleComplete();
			}
		}
		$this->setIndex($this->index() + 1); //Move to next question
		
	}

	/**
	 *	Prepares the message to ask based on the question type, then sends it to the user
	 */
	public function askQuestion() {
		global $ARRAY, $baseURL;
		$question = $this->set(-1);
		$text = $this->dict($question[1], $question[2]);
		switch ($question[0]) { //type
				
			case "menu":
				$question = $this->menu($this->set());
			break;
			case "dt":
				$dateTime = sizeof($this->set(-1)) > 4 ? $this->set(-1) [4] : 2;
				$question = MSG::buttonTemplate($text, array(MSG::datetime("Select Time", "Select Time", 2, date("Y-m-d\tH:i"))));
			break;
			case "gps":
				$question = MSG::gps($text);
			break;
			case "text":
				$question = MSG::text($text);
			break;
			case "liff":
				$text = expand($ARRAY, $text);
				$question = $bot->openLIFF($text[0], $text[1]); //$text is collapsed liff name and vars
				
			case "qrep":
				$options = expand($ARRAY, $text);
				$text = array_shift($options);
				$actions = sizeof($question) > 5 ? $question[5] : array();
				for ($index = 0;$index < sizeof($options);$index++) {
					$action = isset($actions[$index]) ? $actions[$index] : "message";
					if (is_array($action)) {
						$extra = $action[1];
						$action = $action[0];
					}
					$options[$index] = array($baseURL . "/images/" . $question[4] . "/$index.png", $action, $options[$index]);
					if (isset($extra)) {
						array_push($options, $extra);
					}
				}
				$question = MSG::quickReply(MSG::text($text), $options);
			break;
			case "mc":
				$question = MSG::multiChoice($text);
			break;
			case "cam":
				$question = MSG::camera($text);
			break;
			case "photo":
				$question = MSG::buttonTemplate("What photos would you like to select?", array(MSG::cameraRoll("Select Photos")));
			break;
			case "yn":
				$options = sizeof($question) > 5 ? $question[5] : array("Yes", "No");
				$question = MSG::yesNoQuestion($text, $options);
			break;
			case "settings":
				switch ($this->answers("setting")) {
					case $this->dict("settings", 2):
						$question = MSG::multiChoice($this->dict("settings", 1));
					break;
					case $this->dict("settings", 4):
						$question = MSG::text($this->dict("settings", 4));
					break;
					case $this->dict("settings", 5):
						$question = MSG::text($this->dict("settings", 5));
					break;
					case $this->dict("settings", 6):
						$question = MSG::buttonTemplate($text, array(MSG::datetime($this->dict("settings", 5), $this->dict("settings", 5), 2, date("Y-m-d\tH:i"))));
					break;
					default:
						if (method_exists($this, "askCustomQuestion")) {
							$question = $this->askCustomQuestion();
						}
				}
			break;
			case "func":
				if ($this->set() == "welcome") {
					$this->setDefaultSetting($this->dict("settings", 2), $this->answers("lang"));
					$question = MSG::text($this->dict("settings", 4));
				}
				else if ($this->set() == "question") {
					$this->lineBot->queueContent(MSG::text($text));
					$this->lineBot->queueContent(MSG::image("lineBot/keyBoard" . ($this->lang == 0 ? "EN" : "JP") . ".jpg", "lineBot/keyBoardPreview" . ($this->lang == 0 ? "EN" : "JP") . ".jpg"));
				}
				else if (method_exists($this, "askCustomQuestion")) {
					$question = $this->askCustomQuestion();
					break;
				}
			default:
				return;
			}
			//send
			if (isset($question)) {
				$this->lineBot->queueContent($question);
			}
		}

		/**
		 *	This is a placeholder object for when questions have a func type
		 *
		 *	@return A placeholder Text Message
		 */
		public function askCustomQuestion() {
			return MSG::text("Error::Custom funcion has not been defined.");
		}

		/**
		 *
		 *	@param String	$text
		 *	@param Integer	$userID
		 *
		 *	@return
		 */
		public function askHelpDesk($text, $userID) {
			$_POST["text"] = $text;
			$_POST["t"] = date('Y-m-d H:i:s');
			$_POST["id"] = $userID;
			$_POST["skipEnd"] = true;
			$_POST["sentFrom"] = 1;
			DB::tempTable("TICKETS");
			require_once ($_SERVER['DOCUMENT_ROOT'] . "/core/enCharge/ticketing/sendSupportTicket.php");
			DB::restoreTable();
			$this->lineBot->queueContent(MSG::text($this->dict("askQuestion", 1)));
		}
		/**
		 *	When a user makes a choice in settings, set it here. If it isn't one of the default settings it will check the class for a setSetting function
		 */
		public function setDefaultSetting($setting = null, $set = null) {
			if ($setting == null) {
				$setting = $this->answers("setting");
				$set = $this->answers("set");
			}
			switch ($setting) {
				case $this->dict("settings", 2):
					DB::tempTable("USER");
					$set = $set == "English" ? 0 : 1;
					DB::update(array("language" => $set), array("id" => $this->user));
					$this->lang = $set;
					DB::restoreTable();
					$this->lineBot->queueContent(MSG::text($this->dict("settings", 3)));
					$this->lineBot->setRichMenu($this->menuIDs[$set == "English" ? "en" : "jp"]);
				break;
				case $this->dict("settings", 4):
					DB::tempTable("USER");
					DB::update(array("FirstName" => $set), array("id" => $this->user));
					DB::restoreTable();
				break;
				case $this->dict("settings", 5):
					DB::tempTable("LOGIN");
					DB::update(array("Email" => $set), array("id" => $this->user));
					DB::restoreTable();
				break;
				case $this->dict("settings", 6):
					DB::tempTable("USER");
					DB::update(array("Birthday" => $set), array("id" => $this->user));
					DB::restoreTable();
				break;
				default:
					if (method_exists($this, "setSetting")) {
						$question = $this->setSetting();
						break;
					}
			}
		}

		public function setWelcomeDetails() {
			DB::tempTable("USER");
			DB::update(array("Birthday" => $this->answers("birthday"), "FirstName" => $this->answers("name")), array("id" => $this->user));
			DB::restoreTable();

			DB::tempTable("LOGIN");
			DB::update(array("Email" => $this->answers("email")), array("id" => $this->user));
			DB::restoreTable();
			$this->lineBot->queueContent(MSG::text("basicDefault", 5));
		}

		/**
		 *	Opens a LIFF window(inbuilt browser page)
		 *
		 *	@param String	$vars The title of the page
		 *	@param String	$vars the GET variables that are sent to the page
		 *
		 *	@return	The LIFF Object
		 */
		public function openLIFF($pageName, $id, $vars) {
			MSG::LIFF($this->liffIDs[$id], $pageName, $vars);
		}
		/**
		 *	This function should be called only once when creating a new bot,
		 * it registers any LIFF pages and Rich Menus with the LINE server.
		 * In order for the LIFFs to be made, the class needs a liffURL variable
		 * For the menus to be made, menuIDs, menuImages, menuHotspots and the menu key of dictEntries needs to be set
		 */
		public function setUpBot() {
			if (property_exists($this, "liffURLs") && sizeof($this->liffIDs) == 0) {
				$liffs = array();
				for ($index = 0;$index < sizeof($this->liffURLs);$index++) {
					array_push($liffs, $this->lineBot->addLIFF($this->liffURLs[$index]));
				}
			}
			if (property_exists($this, "menuImages") && (!property_exists($this, "menuIDs") || sizeof($this->menuIDs) == 0)) {
				LineBot::deleteAllRichMenus();
				$menus = array();
				foreach ($this->menuImages as $key => $value) {
					array_push($menus, "\"$key\"=>\"" . $this->setUpMenu($this->botName . "Menu", $key) . "\"");
				}
			}
		}
		/**
		 *	This only needs to be called once, it is used to set up the default menu.
		 */
		public function setUpMenu($menuName, $lang = "default") {
			$names = array();
			$this->lang = $lang == "jp" ? 1 : 0;
			foreach ($this->dict("menu") as $key => $value) {
				array_push($names, $value);
			}
			//Send to Line
			return $this->lineBot->createRichMenu($menuName, ($lang == "jp" ? "メニュー" : "Menu"), $this->menuImages[$lang], $names, $this->menuHotspots, 1, $lang == "default");
		}
}

function tLog($message) {
	LineBot::writeTotLog("test", $message, false);
}
?>