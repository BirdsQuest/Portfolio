<?php
require_once ($_SERVER['DOCUMENT_ROOT'] . "/code/lineBot.php");
$lineBotID = "";
$lineBotSecret = "";
//Channel Access Token
$lineBotCAT = "";

class EnChargeBot extends QuestionBot {
	public $botName = "enCharge";
	public $liffIDs = array("", "");
	public $liffURLs = array("core/enCharge/scheduler/scheduler.html", "core/enCharge/scratchAndWin/tickets.html");
	public $dictEntriesEN = array("menu" => array("schedule" => "Schedule A Session", "dictionary" => "Search The Dictionary", "flashcards" => "Do Flashcards", "tickets" => "Buy a Scratch and Win Ticket", "question" => "Ask A Question", "settings" => "Settings"), "schedule" => array("When would you like to have the lesson?", "Where would you like to have the lesson?", "What activity topic would you like to cover?~@House~@Jobs~@Police~@Post Office~@Library~@School~@Medicine~@Human Body~@Travel~@Directions~@Animals~@Space~@Earth", "What level would you like the lesson to be?~!Easy~!Medium~!Hard ", "Is it open to other students or is it private?~!Open~!Private", "How many students can come?", "Please confirm your booking:\nTime: %s\nLocation: %s\nTopic: %s\nLevel: %s", "That time is taken by a lesson.", "It's as %s.", "Would you like to join?", "The groups invite code is %s", "Your session has been booked", "Book Time", "See Schedule"), "dictionary" => array("What word do you want to translate?", "Which option fits best?", "Sorry, can't find the translation", "Word added to flashcards", "Word already exists in flashcards", "Couldn't find word in dictionary."), "flashcards" => array("You need to search at least 4 dictionary entries before doing flashcards.", "That's correct! You gain %d gold.", "Sorry, %s is the correct answer. You lose %d health."), "tickets" => array("Tickets usually cost 100 gold, but your first one is free", "You have %d gold.", "Would you like to buy a ticket for 100 gold.", "You need 100 gold to buy a ticket.", "View your ticket prizes.", "You have %s.", "no prizes", "no transportation cost", "no drink cost", "half price lesson", "You won a %s.", "You didn't win anything.", "View Ticket"), "settings" => array("What setting would you like to change?~!Language(言語)~!Name~!Email~!Birthday~!Scheduled Lesson~!View your ticket prizes", "Which language do you prefer?\nどの言語を選択しますか？~!English~!日本語", "Language(言語)", "Language has been changed.", "What is your name?", "What is your email?", "What is your date of birth?", "Scheduled Lesson", "Your next scheduled appointment is %s. Would you like to cancel it?", "You have no scheduled appointment, would you like to schedule one?", "Your scheduled appointment has been deleted.", "View your ticket prizes"));
	public $dictEntriesJP = array("menu" => array("schedule" => "セッションをスケジュール", "dictionary" => "辞書で探す", "flashcards" => "単語帳をする", "tickets" => "スクラッチとウィンチケットを購入する", "question" => "質問を伺います", "settings" => "設定"), "schedule" => array("いつレッスンを受けたいですか？", "どこでレッスンを受けたいですか？", "どのようなトピックをしたいですか？~@家~@仕事~@警察~@郵便局~@図書館~@学校~@医学~@人体~@旅行~@行き方~@動物~@宇宙~@地球", "どのレベルの授業を受講したいですか？~!簡単~!普通~!難しい ", "他の学生も参加されていますか、それともプライベートですか？~!参加~!個人", "何人の生徒が来ることができますか？", "予約を確認してください：\n時間：%s\n場所：%s\nトピック：%s\nレベル：%s", "その時間はレッスンに費やされます。", "％sです。", "参加したいですか？", "グループの招待コードは％sです", "予約されました。", "予約時間", "スケジュールを見る"), "dictionary" => array("何の単語を翻訳したいですか？", "どの選択が正しいですか？", "すみません、翻訳が見つかりません", "単語は単語帳に追加されました。", "単語は既に単語帳に存在します。", "辞書に単語が見つかりませんでした。"), "flashcards" => array("単語帳を実行する前に、少なくとも4つの辞書で検索する必要があります。", "正解です！あなたは%dのゴールドを獲得します。", "すみません、%sは正解です。%dHPを失います。"), "tickets" => array("チケットは通常100ゴールドですが、最初のチケットは無料です", "%d個のゴールドがあります。", "100ゴールドのチケットを購入しますか？", "チケットを購入するには100ゴールドが必要です。", "チケットの賞品をご覧ください。", "%sを持っています。", "賞品がない", "輸送費なし", "飲み物代なし", "半額レッスン", "%sを獲得しました。", "何も獲得できませんでした。", "チケットを見ます"), "settings" => array("どの設定を変更しますか？~!言語(Language)~!名前~!電子メール~!誕生日~!予定レッスン~!チケットの賞品をご覧して", "Which language do you prefer?\nどの言語を選択しますか？~!English~!日本語", "言語(Language)", "言語が変わりました。", "名前は何ですか?", "メールアドレスは？", "お誕生はいつですか?", "レッスン予定", "次回の予定は%sです。キャンセルしますか？", "予定はありませんが、予定をいれたいですか？", "予定が削除されました。", "チケットの賞品をご覧ください"));
	public $menuIDs = array("en" => "", "jp" => "", "default" => "");
	public $menuImages = array("en" => "images/enCharge/menuEN.png", "jp" => "images/enCharge/menuJP.png", "default" => "images/enCharge/menu.png");
	public $menuHotspots = array( //x,y,w,h
	"0,0,360,366", "360,0,314,366", "674,0,366,366", "0,366,360,335", "360,366,314,335", "674,366,366,335");
	public $questions = array("schedule" => array(array("func", "schedule", 0, "time"), array("func", "schedule", 1, "gps"), //gps
	array("qrep", "schedule", 2, "activityTopic", "enCharge/lessons"), array("mc", "schedule", 3, "level"), array("func", "schedule", 6, "confirm")), "dictionary" => array(array("func", "dictionary", 0, "search"), array("func", "dictionary", 1, "answer")), "flashcards" => array(array("func", "flashcards", 0, "answer")), "tickets" => array(array("func", "tickets", 0, "buyTicket")));
	public function __construct() {
		parent::__construct("SCHEDULE");
		//$this->setUpBot();
		
	}

	/**
	 *	When the sets questions are over, come here to handle the recieved data and start the question from scratch again.
	 */
	public function handleComplete() {
		switch ($this->set()) {
			case "dictionary":
				$this->selectJishoEntry();
			break;
			case "schedule":
				$this->setSchedule();
			break;
			case "flashcards":
				$this->answerFlashCard();
			break;
		}
	}
	/**
	 　*	Custom questions are slightly core complex questions(beyond basic functionality) that require their own functions
	 *
	 *	@return The event object to be sent
	 */
	public function askCustomQuestion() {
		$question = $this->set(-1) [3];
		switch ($this->set()) {
			case "schedule":
				if ($question == "time") {
					return $this->askSchedule();
				}
				else if ($question == "gps") {
					return $this->confirmSchedule();
				}
				else if ($question == "confirm") {
					return $this->confirmBooking();
				}
				break;
			case "dictionary":
				if ($question == "search") {
					$this->lineBot->queueContent(MSG::text($this->dict("dictionary", 0)));
					return MSG::image("lineBot/keyBoard" . ($this->lang == 0 ? "EN" : "JP") . "jpg", "lineBot/keyBoardPreview" . ($this->lang == 0 ? "EN" : "JP") . ".jpg");
				}
				else if ($question == "answer") {
					return $this->searchJisho($question);
				}
				break;
			case "flashcards":
				return $this->askFlashCard();
				break;
			case "tickets":
				return $this->buyTicket();
				break;
			case "settings":
				switch ($this->answers("setting")) {
					case $this->dict("settings", 7):
						//Check if there is a scheduled session
						DB::tempTable("SCHEDULE");
						$session = DB::selectSingle(array("user" => $this->user, "time" => array(">", date("Y-m-d H:i:s"))));
						DB::restoreTable();
						if ($session != false) {
							$session = sprintf($this->dict("settings", 8), $session["time"]);
						}
						else {
							$session = $this->dict("settings", 9);
						}
						return MSG::yesNoQuestion($session);
					case $this->dict("settings", 11):
						return $this->checkTicketPrizes();
				}
				break;
			}
		}

		/**
		 *	Creates an object that allows the user to select a date/time(betwen the next day 8am and 6 months) or open up a LIFF containing the current schedule
		 *
		 *	@return A scheduler object
		 */
		public function askSchedule() {
			$tomorrowEightAM = date("Y-m-d\t08:00", strtotime('tomorrow'));
			$sixMonthsFromNow = date("Y-m-d\tH:i", strtotime(date('Y-m-d') . "+6 months"));
			return MSG::buttonTemplate($this->dict("schedule", 0), array(MSG::datetime($this->dict("schedule", 12), $this->dict("schedule", 12), 2, $tomorrowEightAM, $tomorrowEightAM, $sixMonthsFromNow), MSG::LIFF($this->liffIDs[0], $this->dict("schedule", 13), "p=schedule,l=" . $this->lang)), "confirm");
		}
		/**
		 *	Parse through a LINE datetime object, round it down to the nearest half hour(as it's a sceduled timeslot),
		 * convert to mysql format and check if it exists in the database. If the datetime is taken, it will send a
		 * message and the scheduler object. If the user selects to view schedule, it will cancel out of the question.
		 *
		 *	@return The GPS location postback object or a Scheduler object
		 */
		public function confirmSchedule() {
			//Round date down to the half hour mark
			$date = strtotime($this->answers("time"));
			$minutes = (int)date("i", $date) < 30 ? "00" : "30";
			$date = date("Y-m-d H:" . $minutes, $date);
			//Check that it's not already booked
			$booking = DB::selectSingleFrom("schedule", array("time" => $date));
			if ($booking != false) { //The booking already exists
				$this->setIndex(0);
				$this->lineBot->queueContent(MSG::text($this->dict("schedule", 7)));
				$message = $this->askSchedule();
			}
			else { //The booking doesn't exist
				$question = $this->set(-1);
				$message = MSG::gps($this->dict($question[1], $question[2]));
			}
			return $message;
		}
		/**
		 *	Take all of the details that the user has given and confirm that they want to make the booking
		 *
		 *	@return A message event with the details and yes/no confirm buttons
		 */
		public function confirmBooking() {
			$dict = explode("\n", $this->dict("schedule", 6));
			$answer = $this->answers();

			return MSG::flex($dict[0], MSG::box(true, MSG::content(MSG::text($dict[0]), MSG::text(sprintf($dict[1], $answer["time"])), MSG::text(sprintf($dict[2], explode("~@", $answer["gps"]) [0])), MSG::text(sprintf($dict[3], $answer["activityTopic"])), MSG::text(sprintf($dict[4], $answer["level"])), MSG::button($this->dict("basicDefault", 3), 0, null), MSG::button($this->dict("basicDefault", 4), 1, null))), false);

		}
		/**
		 *	If the user confirmed that they want to set the appointment and there is no clashes, save the scheduled appointment to the database
		 */
		public function setSchedule() {
			$answers = $this->answers();
			if ($answers["confirm"] == "0") {
				DB::insertInto("schedule", array("user" => $this->user, "time" => $answers["time"], "gps" => $answers["gps"], "activityTopic" => $answers["activityTopic"], "level" => $answers["level"]));
				$this->lineBot->queueContent(MSG::text($this->dict("schedule", 11)));
			}

		}
		/**
		 *	Take the word that the user is wanting to search and search jisho.org using their unnofficial API
		 *
		 *	@return A multichoice object of the different translations so the user can select the most accurate one
		 */
		private function searchJisho() {
			global $FIELD, $ARRAY;
			$word = trim(strtolower($this->answers("search")));
			$this->setAnswer("search", $word);
			$curl = curl_init();
			curl_setopt_array($curl, array(CURLOPT_URL => "https://jisho.org/api/v1/search/words?keyword=%22" . $word . "%22", CURLOPT_HTTPAUTH => CURLAUTH_BASIC, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array('Content-Type: application/json')));
			$response = curl_exec($curl);
			$response = json_decode($response, true);
			curl_close($curl);
			if (json_last_error() === JSON_ERROR_NONE) {
				$response = $response["data"];
				if (sizeof($response["data"]) > 0) {
					this . resetQuestionSet();
					return MSG::text($this->dict("dictionary", 5));
				}
				$results = array();
				$mc = array();
				for ($index = 0;$index < sizeof($response);$index++) {
					array_push($results, array($index, implode(", ", $response[$index]["senses"][0]["english_definitions"]), $response[$index]["senses"][0]["parts_of_speech"][0], $response[$index]["japanese"][0]["word"], $response[$index]["japanese"][0]["reading"]));
					array_push($mc, MSG::text($results[$index][1]));
					array_push($mc, MSG::button($results[$index][3] . "(" . $results[$index][4] . ")", $index));
					$results[$index] = collapse($ARRAY, $results[$index]);
				}
				array_unshift($results, $word);
				$this->setAnswer("search", collapse($FIELD, $results));
				$text = $this->dict("dictionary", 1);
				return MSG::flex($text, MSG::box(true, MSG::content(MSG::text($text), MSG::box(true, $mc))), false);
			}
			else {
				$results = MSG::text($this->dict("dictionary", 4));
			}
			return $results;
		}
		/**
		 *	After the user has selected the most accurate option, save it to the database under their user id
		 */
		private function selectJishoEntry() {
			global $FIELD, $ARRAY;
			$option = $this->answers("answer");
			$answer = expand($FIELD, $this->answers("search"));
			$en = array_shift($answer);
			for ($index = 0;$index < sizeof($answer);$index++) {
				$answer[$index] = expand($ARRAY, $answer[$index]);
			}
			$answer = $answer[$option];
			if (preg_match('/[\x{4E00}-\x{9FBF}\x{3040}-\x{309F}\x{30A0}-\x{30FF}]/u', $en)) {
				$jp = $en;
				$en = $answer[1];
			}
			else {
				$jp = $answer[3];
			}
			$kana = $answer[4];
			DB::tempTable("SKWVOCAB");
			$entry = DB::selectSingle(array("en" => $en, "jp" => $jp, "user" => $this->user));
			if ($entry == false) {
				DB::insert(array("en" => $en, "jp" => $jp, "kana" => $kana, "user" => $this->user));
				$this->lineBot->queueContent(MSG::text($this->dict("dictionary", 3)));
			}
			else {
				$this->lineBot->queueContent(MSG::text($this->dict("dictionary", 4)));
			}
			DB::restoreTable();
		}
		/**
		 *	Ask the user a multichoice question based on their dictionary(4 entries are needed to ask the question)
		 *
		 *	@return	A multichoice object of the question and potential answers or a text object if the users dictionary is less than 4
		 */
		private function askFlashCard() {
			global $ARRAY;
			$words = DB::selectFrom("vocab", array("user" => $this->user));
			if ($words == false || sizeof($words) < 4) {
				$this->setIndex(0);
				$this->setSet("default");
				return MSG::text($this->dict("flashcards", 0));
			}
			else {
				$answers = array();
				for ($index = 0;$index < 4;$index++) {
					$rand = rand(0, sizeof($words) - 1);
					array_push($answers, $words[$rand]);
					array_splice($words, $rand, 1);
				}
				$answer = rand(0, 3);
				$lang = rand(0, 1) ? "en" : "jp";
				$question = $answers[$answer][$lang];
				$lang = $lang == "en" ? "jp" : "en";
				if ($lang == "jp") {
					$lang = rand(0, 1) ? "jp" : "kana";
				}
				else if ($question == "") {
					$question = $answers[$answer]["kana"];
				}
				$this->setAnswer("question", collapse($ARRAY, array($question, $answers[$answer][$lang], $answer)));
				for ($index = 0;$index < 4;$index++) {
					$option = $answers[$index][$lang];
					if ($option == "") {
						$option = $answers[$index]["kana"];
					}
					$answers[$index] = MSG::button($option, $index);
				}
				return MSG::flex($question, MSG::box(true, MSG::content(MSG::text($question), MSG::box(true, $answers))), false);
			}
		}
		/**
		 *	Take the users answer and compare it to the correct answer and send a text object stating success or failure
		 */
		private function answerFlashCard() {
			global $ARRAY;
			$answer = $this->answers("answer");
			$correctAnswer = expand($ARRAY, $this->answers("question"));
			$results = DB::selectSingleFrom("users", array("id" => $this->user));
			if ($correctAnswer[2] == $answer) {
				$gold = 5;
				DB::updateOn("users", array("gold" => $gold + $results["gold"]), array("id" => $this->user));
				$this->lineBot->queueContent(MSG::text(sprintf($this->dict("flashcards", 1), $gold)));
			}
			else {
				$health = 1;
				DB::updateOn("users", array("health" => $results["health"] - $health), array("id" => $this->user));
				$this->lineBot->queueContent(MSG::text(sprintf($this->dict("flashcards", 2), $correctAnswer[1], $health)));
			}
		}
		/**
		 * Prompt the user to buy a scratch and win ticket for 100 gold
		 * The user gets their first ticket for free
		 * If the user gets a ticket, it stores a ticketCode in the answers
		 * This allows the scratch and win page to generate tickets making
		 * the system harder to cheat
		 * The odds of getting prizes are set in ticketSymbols.php
		 *
		 * @return The appropriate message based on whether the user can get the ticket
		 */
		private function buyTicket() {
			$results = DB::selectSingleFrom("users", array("id" => $this->user));
			//Set a seed to confirm that the ticket isn't being spoofed
			$this->setAnswer("ticketCode", rand());
			//The users first ticket is free
			if ($results["boughtTickets"] == 0) {
				return MSG::buttonTemplate($this->dict("tickets", 0), array(MSG::LIFF($this->liffIDs[1], $this->dict("tickets", 12), null, $this->lang)));

			}
			//If they have enough gold, allow them to
			else if ($results["gold"] >= 100) {
				return MSG::buttonTemplate(sprintf($this->dict("tickets", 1), $results["gold"]) . " " . $this->dict("tickets", 2), array(MSG::LIFF($this->liffIDs[1], $this->dict("basicDefault", 3), null, $this->lang), MSG::postback($this->dict("basicDefault", 4), $this->dict("basicDefault", 4))), "confirm");
			}
			//Otherwise they don't have enough
			else {
				$this->resetQuestionSet();
				return MSG::text(sprintf($this->dict("tickets", 1), $results["gold"]) . " " . $this->dict("tickets", 3));
			}
		}
		/**
		 * Let the user know what prizes they have
		 *
		 * @return a  message of what prizes they have available
		 */
		public function checkTicketPrizes() {
			$prizes = explode(",", DB::selectSingleFrom("users", array("id" => $this->user)) ["pendingTicketPrizes"]);
			if ($prizes[0] != "") {
				$prizes = array_count_values($prizes);
				$prizeString = array();
				foreach ($prizes as $key => $value) {
					array_push($prizeString, $this->dict("tickets", 7 + (int)$key) . "(x$value)");
				}
				$prizeString = implode(", ", $prizeString);
				$prizes = substr_replace($prizeString, ' and', strrpos($prizeString, ','), 1);
			}
			else {
				$prizes = $this->dict("tickets", 6);
			}
			$this->resetQuestionSet();
			return MSG::text(sprintf($this->dict("tickets", 5), $prizes));
		}

		/**
		 *	If the setting is to change the schedule, it handles here
		 */
		public function setSetting() {
			$setting = $this->answers("setting");
			$set = $this->answers("set");
			switch ($setting) {
				case $this->dict("settings", 7):
					DB::tempTable("SCHEDULE");
					$setting = DB::selectSingle(array("user" => $this->user, "time" => array(">", date("Y-m-d H:i:s"))));
					if ($setting != false) {
						if ($set == "Yes") {
							DB::erase(array("id" => $setting["id"]));
							$this->lineBot->queueContent(MSG::text($this->dict("settings", 10)));
						}
					}
					else {
						if ($set == "Yes") {
							$this->resetQuestionSet("schedule");
							$this->setIndex(-1);
						}
					}
					DB::restoreTable();
				break;
			}
		}
	}

	new EnChargeBot();
?>