requires("suggestionBox,db");
run["hashtag"]=()=>{
	var hashtag=AE(new HashTag("TEST",1,false));
	ACE(content,"btn","Cancel",null,null,(e)=>{hashtag.readOnly=true;});
	ACE(content,"btn","Submit",null,null,hashtag.submit.bind(hashtag));
};


class InputWord extends DOMObj{//,keyword,"keyword",keyword
	constructor(pos,placeholder,options,editable){super("pos",pos,"placeholder",placeholder,"options",options,"canEdit",editable);}
	generate(){
		this.DOM=new SuggestionBox("word"+this.pos,this.placeholder,(typeof this.options === "string"?this.options:null),null,this.options);
		this.DOM.input.addEventListener("focusout",this.blur.bind(this),false);
		this.editable=this.canEdit;
		this.text="";
		delete this.canEdit;
	}
	set editable(bool){
		this.DOM.readOnly=bool;
	}
	get length(){
		return this.innerText.length;
	}
	get innerText(){
		return this.DOM.innerText;
	}
	set innerText(text){
		this.DOM.innerText=text;
	}
	close(){
		this.text=this.innerText;
		this.innerText=(this.text!=""&&this.text.indexOf("#")==-1?"#":"")+this.text;
		this.DOM.input.placeholder="";
		this.DOM.input.readOnly=true;
	}
	open(){
		if(this.text.indexOf("#")==0){this.text=this.text.substring(1);}
		this.innerText=this.text;
		this.DOM.input.placeholder="#";
		this.DOM.input.readOnly=false;this.DOM.input.hidden=false;
		this.DOM.input.focus();
	}
	blur(e){
		if(this.parentNode.children.length>1){
			this.close();
			if(this.text==""){this.DOM.input.hidden=true;}
		}
	}
	get closed(){
		return this.DOM.input.readOnly;
	}
}

class InputLine extends DOMObj{
	constructor(existing,baseList,className,editable){super("existing",existing,"baseList",baseList,"tempClassName",className,"editable",editable);}
	generate(){
		this.DOM.className=this.className;
		delete this.tempClassName;
		this.words=[];
		for(var index=0;index<this.existing.length;index++){
			this.words[index]=AE(new InputWord(this.children.length,"#",this.baseList,true),this);
			this.words[index].innerText=this.existing[index];
			this.words[index].close();
		}
		this.current=this.existing.length;
		this.words.push(AE(new InputWord(this.children.length,"#",this.baseList,true),this));
		this.currentWord.DOM.input.focus();
	}
	keyDown(e){
		this.caretWasAt=getCaret(e.target);
		switch(e.keyCode){
			case KEY.ENTER:this.nextWord();break;
			case KEY.SPACE:e.preventDefault();if(this.caretWasAt==e.target.length){this.nextWord();}else{this.addWord(e.keyCode);}break;
			case KEY.LEFT:if(this.caretWasAt==0&&this.current>0){this.prevWord();}break;
			case KEY.RIGHT:if(this.caretWasAt==e.target.value.length){this.nextWord();}break;
			case KEY.ESC: this.closeWord();break;
			case KEY.BACKSPACE:if(this.caretWasAt==0&&this.current>0){e.preventDefault();this.removeWord();this.openWord();}break;
		}
	}
	mouseDown(e){
		if(e.target.name.length<4){return;}
		var clickIndex=e.target.name.substring(4);
		if(!this.editable){return;}
		if(this.editable&&this.current!=clickIndex||this.currentWord.closed){
			this.closeWord();
			this.current=clickIndex;
			this.openWord();
	}	}
	blur(e){
		this.close();
	}
	addWord(keyCode=0){
		var text=this.currentWord.innerText;
		if(this.caretWasAt!=text.length&&text.length>0){
			this.currentWord.innerText=text.substring(0,this.caretWasAt+(keyCode==KEY.SPACE?0:1));
			text=text.substring(this.caretWasAt+(keyCode==KEY.SPACE?0:1));
		}else{text="";}
		
		var word=new InputWord(this.children.length,"#",this.baseList,true);
		word.insertAfter(this.children[this.current]);
		this.current++;
		this.words.splice(this.current, 0, word);
		word.DOM.input.focus();
		word.innerText=text;
		setCaret(word.DOM.input,0);
		return word;
	}
	closeWord(){
		this.currentWord.close();
	}
	openWord(){
		this.currentWord.open();
	}
	nextWord(){
		//Only go to the next word if the current word isn't the last word and blank
		if(this.current==this.wordCount-1&&this.currentWord.innerText==""){return;}
		this.closeWord();
		if(this.current>this.wordCount-2){this.addWord();}
		else{
			this.current++;
			this.openWord();
			setCaret(this.currentWord.DOM.input,0);
		}
	}
	removeWord(){
		var text=this.currentWord.innerText;
		this.currentWord.text="";
		this.currentWord.innerText="";
		this.words.splice(this.current,1);
		this.current--;
		this.currentWord.text=this.currentWord.text+text;
	}
	get caret(){
		var location=0;
		for(var index=0;index<this.current;index++){
			location+=this.currentWord.length;
		}
	}
	get currentWord(){
		return this.words[this.current];
	}
	get wordCount(){
		return this.words.length;
	}
	prevWord(){
		this.closeWord();
		if(this.current>0){
			this.current--;
			this.openWord();
		}
	}
	getAutoCompleteList(pos,listOfLists){
		return null;
	}
	setEditable(editable){
		if(editable&&!this.editable){
			this.text=this.innerHTML;
			this.openWord();
		}
		this.editable=editable;
	}
	getPlaceholder(pos,listOfLists){
		return null
	}
	fromString(level=2){
		printTODO("StringToTagSet");
	}
	toString(level=2){
		var strings=[];
		for(var index=0;index<this.wordCount;index++){
			this.strings.push(this.words[index].innerText);
		}
		return collapse(string,level);
	}
}

class HashTag extends DOMObj{
	constructor(type,id,editing,editButton,commitButton){super("type",type,"id",id,"editing",(editing!=null?editing:false),"editButton",editButton,"commitButton",commitButton);}
	generate(){
		this.fetch();
	}
	setUpDOM(){
		this.inputLine=new InputLine(this.tags,HashTag.TAGS);
		AE(this.inputLine,this);
	}
	fetch(){//String tag returns string[][]
		ajax("tags/get",["CAT1",this.type,"id",this.id],((response)=>{
			//Each is a tagName
			this.tags=[];
			for(var index=0;index<response.length;index++){
				this.tags.push(response[index]);
			}
			this.setUpDOM();
		}).bind(this));
	}
	get tagSet(){
		//join tags with # delimiters
		var tags="";
		for(var index=0;index<this.inputLine.words.length;index++){
			tags+=this.inputLine.words[index].text;
		}
		return tags==""?tags:tags.substring(1);
	}
	addTags(){//int objID, String objTable, String tags
		ajax("tags/set",["CAT1",this.type,"id",this.id,"tags",this.tagSet],((response)=>{console.log(response);}));
	}
	set readOnly(bool){
		this.editing=!bool;
		if(this.inputLine!=null){this.inputLine.setEditable(!bool);}
	}
	submit(){
		this.inputLine.currentWord.close();
		ajax("tags/set",["CAT1",this.type,"id",this.id,"tags",this.tagSet],(response)=>{
			console.log(response);
		});
	}
}
ajax("fetch",["CAT1","TAGS","toFetch","id,name"],(response)=>{
	//Each is a set of [tagID,tagName]
	HashTag.TAGS=[];
	for(var index=0;index<response.length;index++){
		HashTag.TAGS.push({id:response[index][0],name:response[index][1]});
	}
});

run["hashtagViewer"]=()=>{AE(new HashTagViewer("TEST"));};
class HashTagViewer extends DBDOM{
	constructor(type){super(type);}
	makeDOM(){
		this.selectorBox=ACE(this.DOM,"div",null,null,"hashtagSelectorBox");
		this.selectedTags=ACE(this.DOM,"div",null,null,"hashtagSelectedTags")
		this.display=ACE(this.DOM,"div",null,null,"hashtagSelectorBox")
	}
	addTags(){
		//Goto the database and fetch the tags
		ajax("",[],((response)=>{}).bind(this));
	}
}