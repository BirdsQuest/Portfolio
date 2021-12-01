dict.en = {
	sseBrowserError: "This browser does not support desktop notification",
	status: ["Unopen", "Waiting For Customer", "Response Required", "Closed - Success", "Closed - Fail"],
	ticketCollectionHeaders: ["Status", "User", "Topic", "Start Date", "End Date", "Assigned To"],
	ticketHeaders: ["statusDOM", "userName", "topic", "startDate", "endDate", "assignedTo"],
	claim: "claim",
	join: "join",
	share: "share",
	passOn: "pass on",
	anotherDepartment: "another department",
	anotherUser: "another user",
	closeSuccess: "close success",
	closeFail: "close fail",
	reopen: "reopen"
};
dict.jp = {
	sseBrowserError: "お使いのブラウザはサーバー送信イベントをサポートしていません",
	status: ["未開封", "顧客を待っています", "応答が必要", "閉じられた成功", "閉じられた失敗"],
	ticketCollectionHeaders: ["状態", "ユーザー", "トピック", "開始日", "終了日", "に割り当てられた"],
	ticketHeaders: ["ステータスドム", "ユーザー名", "トピック", "開始日", "終了日", "に割り当てられた"],
	claim: "請求",
	join: "参加する",
	share: "共有",
	passOn: "渡す",
	anotherDepartment: "別の部門",
	anotherUser: "別のユーザー",
	closeSuccess: "近い成功",
	closeFail: "閉じる失敗",
	reopen: "再開する"
};

/**
 *	SSE or Server Sent Events is a 1 way broadcast method of pushing information from the server to the client
 *
 *	@param URLString	source  The relative url of where the SSE PHP file to connect to is
 */
class SSE extends DOMObj {
	constructor(source) {
		super(Obj.extendable(1, arguments), "source", source);
	}
	/**
	 *	Connect to the php SSE page and set up the broadcast listener
	 *
	 *	@throws error log if browser doesn't support sse
	 */
	preGen() {
		if (typeof(EventSource) !== "undefined") {
			this.source = new EventSource("core/db/sse/" + this.source + ".php");
			this.source.onmessage = e => this.recieved;
		} else {
			log.error(dict[lang].sseBrowserError);
		}
	}
	/**
	 *	Handle the server data, this should be extended in the extended class
	 *
	 *	@param String	event	The data sent from the server
	 *
	 *	@return a messages array parsed to work within the system
	 */
	recieved(event) {
		log.debug(event.data);
	}
}
/**
 *	The list of question tickets
 *
 *	@param String	currentSort	What order to sort the results in
 */
class TicketingSystem extends SSE {
	constructor(vars) {
		super("../../sekaiwa/ticketing/chatSSE", "currentSort", 0);
	}
	generate() {
		/*Dashboard
			Menu>Open,Awaiting Customer,Awaiting Parts,Closed,Sticky,Support Enquiry,Billable
			Table headers>Staus(upopen,open,waiting for customer,response required,closed),users name,start date,closed date,assigned to
		*/
		this.sortBy = ACE(this.DOM, "slt", n, [CE("opt", "Sort by...", n, n, {
			selected: t,
			disabled: t,
			hidden: t
		}), ...dict[lang].ticketCollectionHeaders.map((e, i) => CE("opt", e, n, i))]);
		this.sortBy.addEventListener("change", e => this.sortBy(getE(e).value));
		
		this.resultsList = CE("tbody");
		this.table = ACE(this.DOM, "table", [CE("thead", [CE("tr", dict[lang].ticketCollectionHeaders.map(e => CE("td", e)))]), this.resultsList]);
		
		this.ticketDetails = new TicketDetails(this.shareVars("backToList", "hideTable"));
		AE(hardHide(this.ticketDetails), this.DOM);
		this.fetchResults();
		
		this.openTickets = new OpenTickets(id => this.openChatBox(id));
		AE(this.openTickets, this.DOM);
		this.chatBoxesDOM = ACE(this.DOM, "div");
		window.addEventListener("resize", e => this.calculatePopups(e));
		this.chatBoxes = [];
		this.calculatePopups();
	}
	/**
	 *	Return to the list of tickets from the ticket details view
	 */
	backToList() {
		hardShow(this.table);
		hardShow(this.sortBy);
		hardHide(this.ticketDetails);
	}
	
	/**
	 *	Hides the table of the tickets
	 */
	hideTable() {
		hardHide(this.table);
		hardHide(this.sortBy);
	}
	/**
	 *	Get the list of tickets from the server
	 *
	 *	@param String	filter
	 *	@param Integer	userID
	 */
	fetchResults(filter, userID) {
		this.resultsList.innerHTML = "";
		ajax("../sekaiwa/ticketing/questionTickets", ["filter", filter, "responderID", userID], e => {
			if (e[0] == "") {
				return;
			}
			if (!isArray(e[0])) {
				e = [e];
			}
			e.map(result => {
				let id = result.shift();
				let userID = result.shift();
				let statusID = result[0];
				if (result[5] == "") {
					result[5] = [];
				}
				if (result[5].length > 0 && !isArray(result[5][0])) {
					result[5] = [result[5]];
				}
				let assignedTo = result[5].map(e => e[0]);
				result[5] = result[5].map(e => e[1]);
				
				result[0] = dict[lang].status[result[0]];
				
				if (isString(result[3])) {
					result[3] = result[3].replace(/\-/g, '/').replace(/\T/g, " ").split(".")[0];
				}
				if (result[4] != n) {
					result[4] = result[4].replace(/\-/g, '/').replace(/\T/g, " ").split(".")[0];
				}
				let row = ACE(this.resultsList, "tr", result.map(e => CE("td", e)), id, n, e => this.ticketDetails.set(getE(e)));
				row.children[0].className = "status " + String.fromCharCode(97 + statusID);
				row.setAttribute('data-user', userID);
				row.setAttribute('data-assignedTo', assignedTo);
			})
		});
	}
	/**
	 *	Change the order that the results are displayed in
	 *
	 *	@param Integer	field	Which order to sort the results
	 */
	sortBy(field) {
		let results = [...this.resultsList.children];
		if (field != this.currentSort) {
			this.currentSort = field;
			results = results.sort((a, b) => {
				if (isNum(a.children[field].innerText) && a.children[field].innerText !== b.children[field].innerText) {
					return Number(a.children[field].innerText) < Number(b.children[field].innerText) ? -1 : 1;
				}
				return a.children[field].innerText.localeCompare(b.children[field].innerText);
			});
		} else { //Sortby is already selected, reverse the sort
			let halfway = Math.floor(results.length / 2),
				temp = n;
			for (let i = 0; i < halfway; i++) {
				temp = results[i];
				results[i] = results[results.length - 1 - i];
				results[results.length - 1 - i] = temp;
			}
		}
		this.resultsList.innerHTML = "";
		results.map(r => AE(r, this.resultsList));
	}
	/**
	 *	Revieve data broadcast by the server, and if the message is in the relevant question, update the message
	 *
	 *	@param String	e	The data sent from the SSE
	 */
	recieved(e) {
		e = split(e.data, SPLIT.OBJECT);
		if (!isHardHidden(this.ticketDetails) && e.shift() == this.chatHistory.conversationID) {
			this.chatHistory.addMessage(e);
			
		}
	}
	
	calculatePopups() { //calculate the total number of popups suitable and then populate the toatal_popups variable.
		let width = window.innerWidth;
		if (width < 540) {
			this.totalPopups = 0;
		} else {
			width -= 200; //320 is width of a single popup box
			this.totalPopups = parseInt(width / 250);
		}
		
		//display the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
		var right = 220;
		var index = 0;
		for (let index = 0; index < this.totalPopups; index++) {
			if (this.chatBoxes[index] != undefined) {
				let element = this.chatBoxes[index].DOM;
				element.style.right = right + "px";
				right = right + 320;
				element.style.display = "block";
			}
		}
	}
	chatBoxIsOpen(id) {
		let chatBoxes = this.chatBoxes;
		for (let index = 0; index < chatBoxes.length; index++) {
			if (chatBoxes[index].id == id) {
				return chatBoxes[index];
			}
		}
		return false;
	}
	openChatBox(id) { //creates markup for a new popup. Adds the id to popups array.
		if (!isInt(id)) { //If id isn't an int it's a click event
			id = getE(id);
			if (id.id == n || id.id == "") {
				id = id.parentNode;
			}
			id = id.id;
			name = this.openTickets.getNameFromID(id);
		}
		for (let index = 0; index < this.chatBoxes.length; index++) {
			if (id == this.chatBoxes[index]) { //already registered. Bring it to front.
				this.chatBoxesDOM.removeChild(this.chatBoxes[index]);
				AEF(this.chatBoxes[index], this.chatBoxesDOM);
				this.calculatePopups();
				return;
			}
		}
		
		//If it didn't exist, create it
		let element = new ChatBox(id, name, this.calculatePopups.bind(this));
		AEF(element.DOM, this.chatBoxesDOM);
		this.chatBoxes.unshift(element);
		this.calculatePopups();
		return element;
	}
}

/**
 *	The details of a ticket, all of the things that are listed in their row entry from the ticket list as well as options to claim/close/share the ticket and message history/chat window
 *
 *	@param SharedVars	vars    sharedVars=>backToList,hideTable
 */
class TicketDetails extends DOMObj {
	constructor(vars) {
		super("sharedVars", vars);
	}
	generate() {
		this.backButton = ACE(this.DOM, "btn", "\u21b6", n, n, e => this.backToList())
		this.userName = ACE(this.DOM, "div");
		this.topic = ACE(this.DOM, "div");
		this.startDate = ACE(this.DOM, "div");
		this.endDate = ACE(this.DOM, "div");
		this.assignedTo = ACE(this.DOM, "div");
		this.chatHistory = new MessagesWindow();
		AE(this.chatHistory, this.DOM);
		this.statusDOM = ACE(this.DOM, "div");
		this.ticketButtons = ACE(this.DOM, "div", [
			CE("btn", dict[lang].claim, n, n, e => this.claim()),
			CE("btn", dict[lang].join, n, n, e => this.join()),
			CE("btn", dict[lang].share, n, n, e => this.share(getE(e))),
			CE("btn", dict[lang].passOn, n, n, e => this.share(getE(e))),
			CE("div", [
				CE("btn", dict[lang].anotherDepartment, n, n, e => e.shareToAnotherDept()),
				CE("btn", dict[lang].anotherUser, n, n, e => e.shareToAnotherUser())
			]),
			CE("btn", dict[lang].closeSuccess, n, n, e => this.close(t)),
			CE("btn", dict[lang].closeFail, n, n, e => this.close(f)),
			CE("btn", dict[lang].reopen, n, n, e => this.claim())
		]);
		this.shareDialog = hardHide(ACE(this.DOM, "div", [], n, "shareDialog"));
	}
	/**
	 *	If someone hits the share button, then hide the share button and instead display its subobtions of whether to share to a user or department
	 */
	share(e) {
		hardHide(e);
		hardShow(e.parentNode.children[3]);
	}
	/**
	 *	Someone has clicked the shareToAnotherDept button, so open the share dialog and populate it with the departments
	 */
	shareToAnotherDept() {
		this.popuplateShareDialog("depart", t);
	}
	/**
	 *	The user claims the ticket to join the conversation
	 *
	 *	@param Integer	id	The tickets ID
	 */
	join(id) {
		ajax("../sekaiwa/ticketing/claimTicket", ["id", id], e => {
			this.setButtons(TicketDetails.OPEN);
			this.unlockChat();
		});
	}
	/**
	 *	Allow the user to send replies
	 */
	unlockChat() {
		this.chatHistory.enableSend();
	}
	/**
	 *	Make the text message reply box unusable
	 */
	lockChat() {
		this.chatHistory.enableSend(f);
	}
	/**
	 *	Get the list of people or departments to share the ticket with and have an onclick on who to share it with
	 *
	 *	@param String	where	Department or individual user
	 *	@param Boolean	passOn	Whether or not remove the users claim from the ticket
	 */
	popuplateShareDialog(where, passOn) {
		ajax("../sekaiwa/ticketing/" + where + "List", [], users => { //[id,name]
			users.map(e => ACE(this.shareDialog, "div", user[1], user[0], n, e => {
				ajax("../sekaiwa/ticketing/shareTicket", ["to", where, "ticketID", getE(e).id, "passOn", passOn], e => {
					hardHide(this.shareDialog);
					this.setButtons(TicketDetails.PASSEDON);
				});
			}));
			hardShow(this.shareDialog);
		});
	}
	/**
	 *	When the user wants to share the ticket with another user
	 */
	shareToAnotherUser() {
		this.popuplateShareDialog("user", f);
	}
	/**
	 *	Close down the ticket(whether success or failure) and return to the ticket list
	 *
	 *	@param Boolean	success	Whether the ticket was successful or a failure
	 */
	close(success) {
		ajax("../sekaiwa/ticketing/closeTicket", ["id", this.id, "success", success], e => {
			this.backToList();
		});
	}
	/**
	 *	The user claims the ticket, it's registered on the server, unlocks the reply message box and updates the buttons
	 */
	claim() {
		ajax("../sekaiwa/ticketing/claimTicket", ["ticketID", this.id], e => {
			this.unlockChat();
			this.setButtons(TicketDetails.RESPONSEREQUIRED);
		});
	}
	/**
	 *	Check if the current user has claimed the ticket
	 *
	 *	@return A boolean of whether or not the user has claimed the ticket
	 */
	get assignedToStaff() {
		return this.assignedToIDs.includes(User.ID);
	}
	/**
	 *	Set the button on how to handle a ticket, eg. open/close/passOn
	 *
	 *	@param Integer	btnID	The set of buttons to show
	 */
	setButtons(btnID) {
		let buttons = [...this.ticketButtons.children].map(e => hardHide(e));
		switch (btnID) {
			case TicketDetails.UNOPEN:
				hardShow(buttons[0]);
				break;
			case TicketDetails.RESPONSEREQUIRED:
			case TicketDetails.WAITINGFORCUSTOMER:
				if (!this.assignedToStaff) {
					hardShow(buttons[1]);
				} else {
					hardShow(buttons[2]);
					hardShow(buttons[3]);
				}
				hardShow(buttons[5]);
				hardShow(buttons[6]);
				break;
			case TicketDetails.SUCCESS:
				hardShow(buttons[7]);
				break;
			case TicketDetails.FAILED:
				hardShow(buttons[7]);
				break;
		}
	}
	/**
	 *	Set the DOM elements with the values fed to it by the clicked ticket row and fetch the chat log of the ticket.
	 *
	 *	@param DOMObject	row	The DOM that the user ckicked on, it may be the cell rather than the row. But if that's the case, it will move back up to the parent row.
	 */
	set(row) {
		//If the clicked DOM element was one of the rows cells, move it up to the row
		if (row.nodeName == "TD") {
			row = row.parentNode;
		}
		this.id = row.id;
		let userID = row.getAttribute('data-user');
		//The staff members that have taken control of this ticket
		this.assignedToIDs = row.getAttribute('data-assignedto') != n ? row.getAttribute('data-assignedto').split(",").map(e => parseInt(e)) : [];
		//If the user hasn't taken control of the ticket, then the chat bar is locked so the user can't comment
		if (!this.assignedToStaff) {
			this.lockChat();
		} else {
			this.unlockChat();
		} //Otherwise the user can send replies
		//Put the contents of each cell in an array
		row = [...row.children].map(e => e.innerText.length == 0 ? "\u2002" : e.innerText);
		//fetch the chat log
		ajax("../sekaiwa/ticketing/getTicketChat", ["id", this.id], e => {
			//An individual chat object is [toFrom,text,timeStamp]
			//If the first index is an array, then it's a set of messages
			if (!isArray(e[0])) {
				e = [e];
			}
			//Make headers row
			dict[lang].ticketHeaders.map((field, i) => this[field].innerText = row[i]);
			//Set the text name of the status
			this.statusDOM.className = "status " + String.fromCharCode(97 + dict[lang].status.indexOf(row[0]));
			
			//Set the buttons
			this.setButtons(dict[lang].status.indexOf(row[0]));
			//Set the chat history
			this.chatHistory.id = userID;
			this.chatHistory.conversationID = this.id;
			e.map(value => {
				this.chatHistory.addMessage(value);
			});
			//Finally show the ticketDetails
			hardShow(this.DOM);
		});
		//Hide the current screens to make way for the new one
		this.hideTable();
	}
}
TicketDetails.UNOPEN = 0;
TicketDetails.WAITINGFORCUSTOMER = 1;
TicketDetails.RESPONSEREQUIRED = 2;
TicketDetails.SUCCESS = 3;
TicketDetails.FAILED = 4;
TicketDetails.OPEN = 2;

/**
 *	The chat window of the terminal and message sending input
 *
 *	@param Integer	id	The user id of the other user(client)
 *	@param String	name	The name of said user
 *	@param Integer	conversationID	The id of the conversation
 */
class MessagesWindow extends DOMObj {
	/**
	 *
	 *
	 *	@param String	events
	 *
	 *	@return a messages array parsed to work within the system
	 */
	constructor(id, name, conversationID) {
		super(Obj.extendable(2, arguments), "id", id, "name", name, "conversationID", conversationID, "autoScroll", t);
	}
	generate() {
		console.trace("MessagesWindow is ", this.id);
		this.className = "messageWindow";
		//body
		this.terminal = CE("div", n, n, "chatTerminal");
		let form = CE("div", n, n, "outBox");
		this.writeMessage = ACE(form, "tbx");
		this.writeMessage.onkeyup = e => {
			let shiftKeyDown = (e || window.event).shiftKey ? true : false;
			if (shiftKeyDown && e.keyCode == KEY.ENTER) {
				this.writeMessage.value += "\n";
			} else if (e.keyCode == KEY.ENTER) {
				this.send();
			}
		};
		this.sendButton = ACE(form, "btn", ">", n, n, e => this.send);
		ACE(this.DOM, "div", [this.terminal, form], n, "popupMessages");
		
		this.terminal.onscroll = e => this.userScrolled();
	}
	/**
	 *	Get the messages from the server
	 *
	 *	@param Integer	secondUser	The clients user id
	 *	@param Date	date	The datetime to fetch previous messages from
	 *	@param Integer	count	How many messages to fetch
	 *	@param Integer	from	The staffs user id
	 */
	fetchMessages(secondUser, date, count, from) {
		ajax("../sekaiwa/ticketing/getTicketChat", ["user", this.id, "secondUser", secondUser, "count", count, "date", date, "from", from], response => {
			response.map(value => {
				this.addMessage(value);
			});
		});
	}
	/**
	 *	Send the message to the server, when its successful post it in the terminal
	 */
	send() {
		if (this.writeMessage.value != "") {
			let m = this.writeMessage.value;
			ajax("../sekaiwa/ticketing/sendMessage", ["m", this.writeMessage.value, "t", new Time().toDB(), "user", this.id, "conversationID", this.conversationID], (response) => {
				response = response.split(" ");
				if (response.shift() == "success") {
					this.addMessage([0, m, response.join("T")]);
				}
			});
		}
		this.writeMessage.value = "";
	}
	/**
	 *	Allow/disallow the user to write and send messages by enable/disabling the message box
	 *
	 *	@param Boolean	enable	Whether to enable or disable the text box
	 */
	enableSend(enable = t) {
		this.writeMessage.disabled = !enable;
		this.sendButton.disabled = !enable;
	}
	/**
	 *	If the user scrolls up, it turns off the autoscroll but if they have scrolled to the bottom, autoscroll is turned on
	 *
	 *	@param EventListenerEvent	e	Scroll event
	 */
	userScrolled(e) {
		this.autoScroll = this.terminal.scrollTop != this.terminal.scrollHeight;
	}
	/**
	 *	If the user hasn't scrolled up, then when a new message is appended then the terminal scrolls to the bottom to view the new message
	 */
	scrollToBottom() {
		if (this.autoScroll) {
			setTimeout(e => {
				this.terminal.scrollTo(0, 9999999);
			}, 1);
		}
	}
	/**
	 *	Push a speech bubble containint the message to the terminal
	 *
	 *	@param Array	data	The messages content[direction,text,date]
	 */
	addMessage(data) {
		let date = new Date(data[1] + ' UTC');
		ACE(this.terminal, "div", data[1], n, "speechBubble " + (data[0] == 1 ? "-right -top" : "-left"), n, {
			title: date
		});
		this.scrollToBottom();
	}
}


class OpenTickets extends DOMObj {
	constructor(clickAction) {
		super("clickAction", clickAction);
	}
	generate() {
		this.className = "chatSidebar";
		this.fetchOpenTickets();
	}
	fetchOpenTickets() {
		ajax("../sekaiwa/ticketing/fetchUsersTickets", [], (response => {
			if (isArray(response) && response[0] != -1) {
				if (!isArray(response[0])) {
					response = [response];
				}
				response.map((user) => {
					this.userOnline(...user);
				});
			}
		}));
	}
	userOnline(id, name) {
		let image = new Image();
		Login.profilePic(id, image);
		ACE(this.DOM, "div", [
			image,
			CE("spn", name)
		], id, "sidebarName", this.clickAction);
	}
	getNameFromID(id) {
		let friends = this.DOM.children;
		for (let index = 0; index < friends.length; index++) {
			if (friends[index].id == id) {
				return friends[index].children[1].innerText;
			}
		}
	}
}

class ChatBox extends DOMObj {
	constructor(id, name, calculatePopups) {
		super("id", id, "name", name, "calculatePopups", calculatePopups);
	}
	generate() {
		this.className = "popupBox chatPopup";
		let clear = CE("div");
		clear.style = "clear: both";
		this.autoScroll = true;
		//header
		this.header = ACE(this.DOM, "div", [
			CE("div", this.name, n, "popupHeadLeft"),
			CE("div", [CE("div", "\u2715", n, "close", e => this.close())], n, "popupHeadRight"),
			clear
		], n, "popupHead", this.shrink.bind(this));
		this.terminal = new MessagesWindow(this.id, this.name);
		AE(this.terminal, this.DOM);
		this.fetchPreviousFiveMessages(new Date());
	}
	fetchPreviousFiveMessages(from) {
		this.terminal.fetchMessages(n, n, 5);
	}
	close(e) { //this is used to close a popup
		e = getE(e).parentNode.parentNode.parentNode;
		let popups = e.parentNode;
		for (let index = 0; index < popups.children.length; index++) {
			popups.removeChild(e);
			this.calculatePopups();
			return;
		}
	}
	shrink(e) {
		e = getE(e);
		if (e.classList.contains("close")) {
			return;
		}
		while (!e.classList.contains("popupHead")) {
			e = e.parentNode;
		}
		e = e.parentNode.children[1];
		if (isHardHidden(e)) {
			hardShow(e);
		} else {
			hardHide(e);
		}
	}
	clearNew() {
		this.header.classList.remove("new");
	}
	onClick() {
		this.clearNew();
	}
	setNew() {
		this.header.classList.add("new");
	}
}
run.ticketer = e => {
	AE(new LoginBox());
	AE(new TicketingSystem());
};

function addCustomerSimulator() {
	let dom = ACE(content, "div", [
		CE("tbx", 1), //User ID
		CE("tbx", "Test"), //Conversation ID
		CE("btn", "send test", n, n, (e) => {
			e = getE(e).parentNode;
			let user = e.children[0].value,
				convo = e.children[1].value;
			ajax("../sekaiwa/ticketing/sendSupportTicket", ["id", user, "text", convo],
				response => console.log(response));
		})
	]);
}