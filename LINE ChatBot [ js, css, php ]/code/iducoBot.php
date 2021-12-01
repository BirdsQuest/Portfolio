<?php
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/lineBot.php");
$lineBotID = "";
$lineBotSecret = "";
$lineBotCAT = "";
class IducoBot extends QuestionBot {
	public $botName = "iduco";
	public $dictEntriesEN = array("menu" => array("register" => "Check Register", "staffHours" => "Log Work Hours", "checkBoxes" => "Final Checks", "countries" => "Customers Countries", "food" => "Check Food", "drink" => "Check Drinks", "notes" => "Notes", "settings" => "Settings"), "register" => array("How many ¥100 coins are there?", "How many ¥500 coins are there?", "How many ¥50 coins are there?", "How many ¥1,000 bills are there?", "How many ¥5,000 bills are there?", "How many ¥10,000 bills are there?", "Are there any 10s, 5s or ones?", "How many ¥10 coins are there?", "How many ¥5 coins are there?", "How many ¥1 coins are there?", "What amount is on the cash register receipt.", "Please take a photo of the cash register receipt."), "staffHours" => array("What time did you start?", "What time did you finish?", "Did you have anything to eat or drink?", "You only get paid till 2:30am at the latest."), "checkBoxes" => array("Have you checked the gas taps on the wall?", "Have the stoves been cleaned and taps been turned off?", "Has the air con/heater turned off?", "Have the cloths been cleaned", "Is all the dashi prepared?", "Have you done the ice?", "Have you replaced the garbage bag?"), "countries" => array("What country does the customer come from?~@Japan~@China~@Korea~@Thailand~@Canada~@America~@Mexico~@UK~@France~@Germany~@Sweden~@Australia~@New Zealand"), "food" => array("What food do you want to count?~@batter~@boxes~@shiitakekonnyaku~@dashi~@onion~@tenkasu~@ginger~@egg", "Remaining %s quantity is?", "batter", "boxes", "shiitakekonnyaku", "dashi", "onion", "tenkasu", "ginger", "egg"), "drink" => array("What food do you want to count?~@yebisu~@kinmugi~@chuuhai~@imoshochu~@mugishochu~@ramune~@soda~@oneCup", "How many %s is needed?", "yebisu", "kinmugi", "chuuhai", "imoshochu", "mugishochu", "soda", "ramune", "oneCup"), "notes" => array("Is anything low?", "Have you finished anything?", "Have you moved anything from the attic?", "Custom Note", "We have run out of %s", "We have runing low of %s", "We need more %s"));
	public $dictEntriesJP = array("menu" => array("register" => "レジを数える", "staffHours" => "勤務時間を登録します", "checkBoxes" => "最後チェック", "countries" => "お客さんの国", "food" => "食べ物を確認し", "drink" => "飲み物を確認して", "notes" => "ノート", "settings" => "設定"), "register" => array("100円硬貨はいくつありますか？", "500円硬貨はいくつありますか？", "50円硬貨はいくつありますか？", "1,000円札はいくつありますか？", "5,000円札はいくつありますか？", "10,000円札はいくつありますか？", "10円、5円、1円のコインはありますか？", "10円硬貨はいくつありますか？", "50円硬貨はいくつありますか？", "1円硬貨はいくつありますか？", "レジの領収書に印刷される金額。", "レジの領収書の写真を撮ってください。"), "staffHours" => array("何時に始めましたか？", "何時に終わりましたか？", "何か食べたり飲んだりしましたか？（賄い）", "遅くとも午前2時30分までしか支払われません。"), "checkBoxes" => array("壁のガス栓を確認しましたか？", "ストーブは掃除されており、タップはオフになっていますか？", "冷暖房の電源を切ってましたか？", "拭きは掃除されましたか？", "出しは準備しましたか？", "氷を作りましたか？", "ゴミ袋を換えりましたか？"), "countries" => array("お客さんはどこの国から？~@日本~@中国~@韓国~@タイ~@カナダ~@アメリカ~@メキシコ~@イギリス~@フランス~@ドイツ~@スウェーデン~@オーストラリア~@ニュージーランド"), "food" => array("どんな食べ物を数えたいですか？~@ねり粉~@箱~@椎茸蒟蒻~@だし~@ネギ~@テンカス~@ショウガ~@卵", "残りの%s量は？", "ねり粉", "箱", "椎茸蒟蒻", "だし", "ネギ", "テンカス", "ショウガ", "卵"), "drink" => array("どんな飲み物を数えたいですか？~@エビス~@金麦~@チューハイ~@芋焼酎~@麦焼酎~@ラムネ~@ソーダ~@ワーンカップ", "%sはいくつ必要ですか？", "エビス", "金麦", "チューハイ", "芋焼酎", "麦焼酎", "ソーダ", "ラムネ", "ワーンカップ"), "restock" => array(), "notes" => array("在庫が少ないものはありますか？", "何か終わった？", "屋根裏部屋から何かを移動しましたか？", "カスタムノート", "%sは売り切れです。", "%sは少ないです。", "もっと%sが必要です。"));
	public $questions = array("drink" => array(array("qrep", "drink", 0, "whichDrink", "iduco/drink"), array("func", "drink", 1, "drinkCount")), "register" => array(array("text", "register", 0, "worksheet", "¥100"), array("text", "register", 1, "worksheet", "¥500"), array("text", "register", 2, "worksheet", "¥50"), array("text", "register", 3, "worksheet", "¥1,000"), array("text", "register", 4, "worksheet", "¥5,000"), array("text", "register", 5, "worksheet", "¥10,000"), array("text", "register", 7, "worksheet", "¥10"), array("text", "register", 8, "worksheet", "¥5"), array("text", "register", 9, "worksheet", "¥1"), array("text", "register", 10, "worksheet", "registerReceipt"), array("cam", "register", 11, "worksheet", "registerReceiptPhoto")), "staffHours" => array(array("dt", "staffHours", 0, "worksheet", "startTime"), array("dt", "staffHours", 1, "worksheet", "finishTime"), array("text", "staffHours", 2, "worksheet", "makanai"),), "checkBoxes" => array(array("yn", "checkBoxes", 0, "worksheet", "checkGas"), array("yn", "checkBoxes", 1, "worksheet", "stoveCleaned"), array("yn", "checkBoxes", 2, "worksheet", "airConOff?"), array("yn", "checkBoxes", 3, "worksheet", "clothsCleaned"), array("yn", "checkBoxes", 4, "worksheet", "dashiPrepared"), array("yn", "checkBoxes", 5, "worksheet", "iceDone"), array("yn", "checkBoxes", 6, "worksheet", "replacedGarbageBag")), "countries" => array(array("qrep", "countries", 0, "country", "iduco/countries")), "food" => array(array("qrep", "food", 0, "whichFood", "iduco/food"), array("func", "food", 1, "foodCount")), "restock" => array(array("text", "restock", 0, "worksheet", "lowSupplies"), array("text", "restock", 1, "worksheet", "finishedProducts"), array("text", "restock", 2, "worksheet", "movedFromAttic")), "notes" => array(array("text", "notes", 0, "worksheet", "runOutOf"), array("text", "notes", 1, "worksheet", "runingLow"), array("text", "notes", 2, "worksheet", "moreMisc"), array("text", "notes", 3, "worksheet", "customNote")));
	public $menuIDs = array("en" => "", "jp" => "", "default" => "");
	public $menuImages = array("en" => "images/iduco/menuEN.png", "jp" => "images/iduco/menuJP.png", "default" => "images/iduco/menu.png");
	public $menuHotspots = array("0,0,322,345", "322,0,254,345", "574,0,208,345", "782,0,316,345", "0,345,279,356", "279,345,297,356", "576,345,250,356", "866,345,214,356");
	public function __construct() {
		parent::__construct("IDUCO");
		//$this->setUpBot();
		
	}
	/**
	 　*	Custom questions are slightly core complex questions(beyond basic functionality) that require their own functions
	 *
	 *	@return The event object to be sent
	 */
	public function askCustomQuestion() {
		$question = $this->set(-1) [3];
		switch ($this->set()) {
			case "drink":
				if ($question == "drinkCount") {
					return MSG::text(sprintf($this->dict("drinks", 1), $this->answers("whichDrink")));
				}
			break;
			case "food":
				if ($question == "foodCount") {
					return MSG::text(sprintf($this->dict("food", 1), $this->answers("whichFood")));
				}
			break;
		}
	}
	/**
	 *	When the sets questions are over, save the changes to the db
	 */
	public function handleComplete() {
		$data = array();
		$answers = $this->answers();
		//Get date, if after midnight but before noon count as yesterdays date
		$date = time();
		if (date('H', $date) < 13) {
			$date = date('Y-m-d', strtotime("-1 days"));
		}
		else {
			$date = date('Y-m-d');
		}
		//Check if date is in DB
		$dbEntry = DB::select(array("date" => $date));
		//If not, create new DB entry
		if ($dbEntry == false) {
			DB::insert(array("date" => $date));
			$dbEntry = DB::select(array("date" => $date));
		}
		//Parse the information
		switch ($this->set()) {
			case "register":
				//Add up the coins and notes
				$cash = ((int)$answers["¥100"] * 100) + ((int)$answers["¥500"] * 500) + ((int)$answers["¥50"] * 50) + ((int)$answers["¥1,000"] * 1000) + ((int)$answers["¥5,000"] * 5000) + ((int)$answers["¥10,000"] * 10000) + ((int)$answers["¥10"] * 10) + ((int)$answers["¥5"] * 5) + (int)$answers["¥1"];
				$data = array("cash" => $cash, "reciept" => (int)preg_replace("/[^0-9]/", "", $answers["registerReceipt"]), "recieptPhoto" => $answers["registerReceiptPhoto"], "ones" => (int)$answers["¥1"], "fives" => (int)$answers["¥5"], "tens" => (int)$answers["¥10"], "fifties" => (int)$answers["¥50"], "hundreds" => (int)$answers["¥100"], "fiveHundreds" => (int)$answers["¥500"], "thousands" => (int)$answers["¥1,000"], "fiveThousands" => (int)$answers["¥5,000"], "tenThousands" => (int)$answers["¥10,000"]);
			break;
			case "staffHours":
				$data = array("start" => $answers["startTime"], "finish" => $answers["finishTime"], "makanai" => $answers["makanai"]);
			break;
			case "checkBoxes":
				$checkArray = array($answers["checkGas"], $answers["stoveCleaned"], $answers["airConOff?"], $answers["clothsCleaned"], $answers["dashiPrepared"], $answers["iceDone"], $answers["replacedGarbageBag"]);
				$data = array("checkArray" => collapse($SUBARRAY, $checkArray));
			break;
			case "food":
				$index = array_search($answers["whichFood"], $this->dict("food"));
				if ($index == false) {
					return;
				}
				$index = $this->dictEntriesEN["food"][$index];
				$data = array();
				$data[$answers["whichFood"]] = $answers["foodCount"];
			break;
			case "drink":
				$index = array_search($answers["whichDrink"], $this->dict("drink"));
				if ($index == false) {
					return;
				}
				$index = $this->dictEntriesEN["food"][$index];
				$data = array();
				$data[$index] = $answers["drinkCount"];
			break;
			case "countries":
				$countries = expand($dbEntry["countries"]);
				if ($countries[0] == "") {
					$countries = array();
				}
				array_push($countries, $answers["countries"]);
				$data = array("countries" => collapse($SUBARRAY, $countries));
			break;
			case "restock":
				$data = array("restock" => collapse($SUBARRAY, array($answers["lowSupplies"], $answers["finishedProducts"], $answers["movedFromAttic"])));
			break;
			case "notes":
				$data = array("notes" => (int)$answers["notes"]);
			break;
		}
		//Edit fields of DB entry
		DB::update($data, array("date" => $date));
		$this->lineBot->queueContent("Saved info to DB");
	}
}
new IducoBot();
?>