const title="randomcode",pageName="rc",version=.01,baseURL="https://randomcode.run/",rcVersion=1.05,lang="en",TIMESTAMP=(()=>Date.now()/1e3|0)(),classes={},t=!0,f=!1,n=null,KEY={SHIFT:16,BACKSPACE:8,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40},KEYS={chromeExtensionID:"gjhlocconbbejhcbajenldfaidlcakce"},image={};var content,VERSION,run={},aniFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||(e=>{setTimeout(e,1e3/60)});if(Date.now||(Date.now=(()=>(new Date).getTime())),isDefined(get))get=window.location.href.split("/").splice(4);else var get=[];class Obj{constructor(){var e=ArgToArr(arguments);e[0]instanceof ExtendedObj&&(e[0].expand(this),e.shift());for(let t=0;t<e.length;t++)this[e[t++]]=e[t]}static null(){var e=new Obj,t=arguments;for(let n=0;n<t.length;n++)e[t[n]]=null;return e}static extendable(e,t){return new ExtendedObj(ArgToArr(t).slice(e))}shareVars(){return ArgToArr(arguments).map(e=>isFunc(this[e])?t=>{t[e]=this[e].bind(this)}:t=>{Object.defineProperty(t,e,{get:(()=>this[e]).bind(this),set:(t=>{this[e]=t}).bind(this)})})}set sharedVars(e){e.map(e=>e(this))}setProperty(e,t,n){let r={};null!=t&&(r.get=t),null!=n&&(r.set=n),Object.defineProperty(this,e,r)}}class ExtendedObj extends Obj{constructor(e){super("args",e)}expand(e){for(let t=0;t<this.args.length;t++)e[this.args[t++]]=this.args[t]}}class DOMObj{constructor(e){var t=ArgToArr(arguments);t[0]instanceof ExtendedObj&&(t[0].expand(this),t.shift());for(let e=0;e<t.length;e++)this[t[e++]]=t[e];this.DOM=CE("div"),isDefined(this.preGen)&&this.preGen(),this.boundEvents={};let n=[["keyUp","keyup"],["keyDown","keydown"],["onClick","click"],["mouseUp","mouseup"],["hover","mousemove"],["mouseDown","mousedown"],["mouseOut","mouseout"],["mouseIn","mouseenter"],["contextMenu","contextmenu"],["onBlur","focusout"],["onFocus","onfocus"],["onChange","change"],["drag","drag"],["dragStart","dragstart"],["dragEnd","dragend"],["dragOn","dragenter"],["dragOff","dragleave"],["dragOver","dragover"],["drop","drop"]];this.generate();for(let e=0;e<n.length;e++)null!=this[n[e][0]]&&this.addListener(n[e][1],this[n[e][0]]);isDefined(this.postGen)&&this.postGen()}addListener(e,t,n=this.DOM){this.boundEvents.hasOwnProperty(e)&&this.removeListener(e,n),this.boundEvents[e]=t.bind(this),n.addEventListener(e,this.boundEvents[e],!1)}shareVars(){return ArgToArr(arguments).map(e=>isFunc(this[e])?t=>{t[e]=this[e].bind(this)}:t=>{Object.defineProperty(t,e,{get:(()=>this[e]).bind(this),set:(t=>{this[e]=t}).bind(this)})})}set sharedVars(e){e.map(e=>e(this))}removeListener(e,t=this.DOM){try{t.removeEventListener(e,this.boundEvents[e]),delete this.boundEvents[e]}catch(e){}}preventDefault(e){e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation()}generate(e){return null}insertChild(e,t){for(var n=this;n instanceof DOMObj;)n=n.DOM;for(;null!=e.DOM;)e=e.DOM;t>=e.children.length?AE(n,e):e.insertBefore(n,e.children[t].nextSibling)}insertAfter(e){for(var t=this;t instanceof DOMObj;)t=t.DOM;for(;!isDOM(e);)e=e.DOM;e.parentNode.insertBefore(t,e.nextSibling)}appendChild(e){for(;null!=e.DOM;)e=e.DOM;this.DOM.appendChild(e)}removeChild(e){this.DOM.removeChild(e)}remove(){if(null!=this.parentNode){for(var e=this.DOM;null!=e&&e instanceof DOMObj;)e=e.DOM;this.parentNode.removeChild(e)}}toggleCSS(e,t=this.DOM){t.classList.contains(e)?t.classList.remove(e):t.classList.add(e)}overlaps(e){return!(this.bottom<e.top||this.top>e.bottom||this.right<e.left||this.left>e.right)}setProperty(e,t,n){let r={};null!=t&&(r.get=t),null!=n&&(r.set=n),Object.defineProperty(this,e,r)}get height(){return this.DOM.offsetHeight}get width(){return this.DOM.offsetWidth}set width(e){null!=e&&(this.DOM.style.width=e+"px")}set height(e){null!=e&&(this.DOM.style.height=e+"px")}get top(){return this.DOM.offsetTop}get classList(){return this.DOM.classList}get left(){return this.DOM.offsetLeft}get right(){return this.left+this.width}get bottom(){return this.top+this.height}get innerHTML(){return this.DOM.innerHtml}set hidden(e){e&&!this.DOM.classList.contains("hidden")?this.DOM.classList.add("hidden"):!e&&this.DOM.classList.contains("hidden")&&this.DOM.classList.remove("hidden")}get innerText(){return this.DOM.innerText}set innerText(e){this.DOM.innerText=e}get className(){return this.DOM.className}set className(e){this.DOM.className=e}get childNodes(){return this.DOM.childNodes}get children(){return this.DOM.children}clearChildren(){this.DOM.innerHTML=""}get parentNode(){for(var e=this.DOM;null!=e.DOM;)e=e.DOM;return e.parentNode}replaceDOM(e){for(;null!=e.DOM;)e=e.DOM;var t=Array.from(this.parentNode.children).indexOf(this.DOM);this.parentNode.replaceChild(e,this.parentNode.childNodes[t]),this.DOM=e}}class Cookie{static set(e,t,n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3);var o="expires="+r.toUTCString();document.cookie=e+"="+t+"; "+o}static get(e){var t=e+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){for(var r=n[e];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}static clear(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}static check(e,t){var n=getCookie(e);return""==n&&(n=t,setCookie(e,n,365)),e}}class Device{constructor(){this.browser=this.checkBrowser(),this.os=this.checkOS(),this.renderer="Canvas",this.bigEndian=this.getEndian()}checkBrowser(){var e=window.chrome,t=window.navigator,n=t.vendor,r=t.userAgent.indexOf("OPR")>-1,o=t.userAgent.indexOf("Edge")>-1,i=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;return null!=e&&"Google Inc."===n&&0==r&&0==o?"Chrome":i?(log.arg=console.log,log.args=console.log,log.func=console.log,log.debug=console.log,log.error=console.log,log.info=console.log,"Firefox"):r?"Opera":o?"IE Edge":"Unknown"}checkOS(){return-1!=navigator.appVersion.indexOf("Win")?"Windows":-1!=navigator.appVersion.indexOf("Mac")?"MacOS":-1!=navigator.appVersion.indexOf("X11")?"UNIX":-1!=navigator.appVersion.indexOf("Linux")?"Linux":"Unknown"}checkAudio(){try{window.AudioContext=window.AudioContext||window.webkitAudioContext;new AudioContext;return"WebAudio"}catch(e){return"HTML Audio"}}getEndian(){var e=new ArrayBuffer(4);return new Uint32Array(e)[0]=168496141,10===e[4]&&11===e[5]&&12===e[6]&&13===e[7]}print(){console.log("OS:",this.os,", Browser:",this.browser,", Renderer:",this.renderer,", Audio:",this.audio,", Endian: "+(this.bigEndian?"big":"little"))}}class log{static construct(e,t){if(log.SHOW.construct){t=["%cConstruct "+e.constructor.name,"color: #ffffff; background: #003300;",t];log.apply(t)}}static args(e,t,n){if(log.SHOW.args){var r=[];null!=n?(r.push("%c"+e),r.push("color: #ffffff; background: #0000ff;")):(n=t,t=e);for(let e=0;e<n.length;e++)r.push("%c"+t[e]),r.push("color: #ffffff; background: #00e600;"),r.push(n[e]);log.apply(r)}}static arg(e,t,n=!1){if(log.SHOW.arg){var r=["%c"+e,"color: #ffffff; background: #00e600;",t];log.apply(r,!0)}}static statFunc(e,t,n){if(log.SHOW.statFunc){var r=["%cstatFunc "+e+"."+t,"color: #ffffff; background: #009900;"];for(let e=0;e<n.length;e++)r.push(n[e]);log.apply(r)}}static func(e,t,n){if(log.SHOW.func){var r=["%cfunc "+e.constructor.name+"."+t,"color: #ffffff; background: #009900;"];for(let e=0;e<n.length;e++)r.push(n[e]);log.apply(r)}}static apply(e,t=!1){t&&(e[0]+="%c\t%c"+log.caller(2)+"\n",e.splice(2,0,"background: #FFFFFF;","color: #FFFFFF; background: #000000;")),"Chrome"==device.browser?console.log.apply(console,e):window.console&&(e=e[0]).replace("%c","")}static trace(){try{throw Error("")}catch(e){return e.stack.split("\n").slice(2)}}static caller(e){var t=log.trace()[e+1];return t=(t=t.slice(t.indexOf("at ")+3,t.lastIndexOf(":"))).split(baseURL+"scripts/").join("").split("(").join("=> ")}static debug(){if(log.SHOW.debug){var e=["%cDEBUG:","color: #4d004d; background: #e600e6;",...arguments];log.apply(e,!0)}}static error(){if(log.SHOW.error){var e=["%cERROR:\n"+log.trace().join("\n")+"\n","color: #990000; background: #ff0000;",...arguments];log.apply(e,!0)}}static info(){if(log.SHOW.info){var e=["%cINFO:","color: #b34700; background: #ff751a;",...arguments];log.apply(e,!0)}}static header(){if(log.SHOW.header){var e=[log.HEADER];for(let t=0;t<4;t++)e.push("background: #00e600"),e.push("background: #009900"),e.push("background: #006600"),e.push("color: #ffffff; background: #003300;"),e.push("background: #006600"),e.push("background: #009900"),e.push("background: #00e600");log.apply(e)}}static response(e,t,n,r){if(log.SHOW.debug){n=["%cResponse:%c %c"+t+"%c\t%c"+e+"\n","color: #cc0066; background: #9966ff;","background: #FFFFFF;","color: #9900ff; background: #ffcccc;","background: #FFFFFF;","color: #FFFFFF; background: #000000;",n,"\n",r];log.apply(n)}}}class CR extends DOMObj{constructor(e){super("coords",e)}generate(){this.DOM=CE("svg"),this.line=ACE(this.DOM,"line"),this.start=this.start,this.end=this.end}get width(){return this.end.x-this.start.x}get height(){return this.end.y-this.start.y}set start(e){setCoord("A",e)}set end(e){this.setCoord("B",e)}get start(){return{x:this.coords.aX,y:this.coords.aY}}get end(){return{x:this.coords.bX,y:this.coords.bY}}setCoord(e,t){hasKey(t,"x")&&(this.line["x"+("A"==e?1:2)]=t.x,this.coords[e+"X"]=t.x),hasKey(t,"y")&&(this.line["y"+("A"==e?1:2)]=t.y,this.coords[e+"Y"]=t.y),this.DOM.height=this.height,this.DOM.width=this.width}}class B64Img extends DOMObj{constructor(){super()}generate(){this.input=ACE(this.DOM,"ipt",n,n,n,"file"),this.input.onchange=this.fromInput.bind(this),this.input.multiple=!0,this.url=ACE(this.DOM,"textArea"),ACE(this.DOM,"btn","Convert URL",n,n,this.fromURL.bind(this)),this.results=ACE(ACE(this.DOM,"table"),"tr"),this.code=ACE(this.DOM,"div")}fromInput(){for(let e=0;e<this.input.files.length;e++)this.toB64(this.input.files[e])}static has(e){return hasKey(image,e)}fromURL(){this.url.value.split("\n").map(((e,t)=>{var n=new XMLHttpRequest;n.onload=(()=>{this.toB64(n.response,t+this.total)}),n.open("GET",url),n.responseType="blob",n.send()}).bind(this))}fromClipboard(e){}toB64(e,t=0){this.addCell();let n=e.name,r=new FileReader;r.onloadend=(()=>{B64Img.add(n,r.result),this.setCell(n,r.result,t+this.total),this.code.innerText+=(this.code.innerText.length>0?",\n":"")+this.toCodeText(n,r.result)}).bind(this),r.readAsDataURL(e)}addCell(){ACE(this.results,"td")}setCell(e,t,n){let r=this.results.children[n];ACE(r,"h3",e),AE(B64Img.get(e),r)}static toCode(e){return[(e=e.split(";"))[0].split(":")[1],e[1].substring("base64,".length)]}toCodeText(e,t){return e+':["'+(t=B64Img.toCode(t))[0]+'","'+t[1]+'"]'}static add(e,t){if(e instanceof Object)for(let t in e)image[t]=e[t];else image[e]=B64Img.toCode(t),console.log(image)}static get(e){return image[e]}static toImage(e,t){let n=new Image,r=(-1!=image[e][0].indexOf("/")?"":"image/")+image[e][0],o="image/href"==r?image[e][1]:"data:"+r+";base64,"+image[e][1];return n.onload=t,n.src=o,n}static loaded(e){return e.path[0]}get total(){return this.code.children.length}static convert(){AE(CE("div",[new B64Img,CE("div","X",n,n,e=>{(e=getE(e).parentNode).parentNode.removeChild(e)})],n,n,n,{style:"position:absolute;top=0;right=0;"}),document.body)}static preload(){let e=new SimpleLoader,t=t=>e.removeItem();for(let e in image)isArray(image[e])&&(image[e]=B64Img.toImage(e,t))}static copy(e){return B64Img.get(e).cloneNode(!0)}}function onLoad(e){"complete"===document.readyState?e():window.onload=((e,t)=>(function(){e&&e(),t()}))(window.onload,e)}onLoad(()=>{B64Img.preload(),document.title=title,B64Img.has("background")&&(document.body.style.backgroundImage="url('"+B64Img.get("background").src+"')"),B64Img.has("favicon")&&CE("favico",B64Img.get("favicon").src)}),log.time=(()=>{var e=new Time;log.arg("TIME",e.toString("hms"))}),log.out=console&&"function"==typeof console.log?console.log.bind?console.log.bind(console):$.proxy(console.log,console):function(){(window.__im_log=window.__im_log||[]).push(Array.prototype.join.call(arguments," "))},log.SHOW={construct:!0,args:!0,arg:!0,statFunc:!0,func:!0,debug:!0,error:!0,info:!0,header:!0},log.CODE={e:log.error,i:log.info,d:log.debug},log.HEADER=["%c  %c  %c   %c ▐█▀▄ ▄▀▀▄ █▄  █▐█▀█ ▄▀▀▄ █▄ ▄█ ▄▀▀▄ ▄▀▀▄▐█▀█ █▀▀ %c   %c  %c  \n%c  %c  %c   %c ▐█▄▀ █▄▄█ █ █ █▐█ ▐▌█  █ █ █ █ █    █  █▐█ ▐▌█▀  %c   %c  %c  \n%c  %c  %c   %c ▐█ █ █  █ █  ▀█▐█▄█ ▀▄▄▀ █   █ ▀▄▄▀ ▀▄▄▀▐█▄█ █▄▄ %c   %c  %c  \n%c  %c  %c   %c https://randomcode.run | mattbird@randomcode.run %c   %c  %c  "].join("\n"),log.section=(e=>{console.log("=======================================",e,"===================")});var random=(()=>{var e=window;pool=[],math=Math,width=256,chunks=6,digits=52,module="object"==typeof module&&module,define="function"==typeof define&&define,rngname="random";var t,n=math.pow(width,chunks),r=math.pow(2,digits),o=2*r,i=width-1,s=math["seed"+rngname]=function(s,c,d){var u=[],h=a(function e(t,n){var r,o=[],i=typeof t;if(n&&"object"==i)for(r in t)try{o.push(e(t[r],n-1))}catch(e){}return o.length?o:"string"==i?t:t+"\0"}((c=1==c?{entropy:!0}:c||{}).entropy?[s,l(pool)]:null==s?function(n){try{return t?l(t.randomBytes(width)):(e.crypto.getRandomValues(n=new Uint8Array(width)),l(n))}catch(t){return[+new Date,e,(n=e.navigator)&&n.plugins,e.screen,l(pool)]}}():s,3),u),g=new function(e){var t,n=e.length,r=this,o=0,s=r.i=r.j=0,a=r.S=[];n||(e=[n++]);for(;o<width;)a[o]=o++;for(o=0;o<width;o++)a[o]=a[s=i&s+e[o%n]+(t=a[o])],a[s]=t;(r.g=function(e){for(var t,n=0,o=r.i,s=r.j,a=r.S;e--;)t=a[o=i&o+1],n=n*width+a[i&(a[o]=a[s=i&s+t])+(a[s]=t)];return r.i=o,r.j=s,n})(width)}(u);return a(l(g.S),pool),(c.pass||d||function(e,t,n){return n?(math[rngname]=e,t):e})(function(){for(var e=g.g(chunks),t=n,i=0;e<r;)e=(e+i)*width,t*=width,i=g.g(1);for(;e>=o;)e/=2,t/=2,i>>>=1;return(e+i)/t},h,"global"in c?c.global:this==math)};function a(e,t){for(var n,r=e+"",o=0;o<r.length;)t[i&o]=i&(n^=19*t[i&o])+r.charCodeAt(o++);return l(t)}function l(e){return String.fromCharCode.apply(0,e)}if(a(math[rngname](),pool),module&&module.exports){module.exports=s;try{t=require("crypto")}catch(e){}}else define&&define.amd&&define(function(){return s});Math.totalDice=((e=1,t=6)=>{let n=0;for(let r=0;r<e;r++)n+=Math.random(1,t);return n}),Math.generateSeed=(()=>{let e=encodeID(Math.random()*(1e3*Math.random())*1e3);return Math.seedrandom(e),e})})();function isInt(e){var t;return!isNaN(e)&&(0|(t=parseFloat(e)))===t}function isNum(e){return!isNaN(e)}function isString(e){return"string"==typeof e}function isArray(e){return e instanceof Array}function isDefined(e){return void 0!==e}function isObj(e,t){return e.constructor.name==t}function isObject(e){return"object"==typeof e&&e!==n}function isDOM(e,t){return null==t?null!=e.tagName:e.tagName=t}function isBool(e){}function isDOMObj(e,t){return isDefined(e.DOM)&&(isDOM(e.DOM)||isDOMObj(e.DOM))&&(null==t||e.constructor.name==t)}function isFunc(e){return"function"==typeof e}function hasKey(e,t){return e.hasOwnProperty(t)}function setCSSVar(e,t,n){return"root"==e?e=document.documentElement.style:getComputedStyle(e).style,e.setProperty("--"+t,n),n}function getCSSVar(e,t){return"root"==e?document.documentElement.style.getPropertyValue("--"+t):getComputedStyle(e).style.getProperty("--"+t)}function getByClass(e){return document.getElementsByClassName(e)}function getByID(e){return document.getElementById(e)}function getE(e){return e.target||e.srcElement}function forIn(e,t){for(let n in e)t(n,e[n])}function addClass(e){ArgToArr(arguments).map(e=>{classes[e.name]=e})}function setCaret(e,t){e.setSelectionRange(e,t)}function getCaret(e){return e.selectionStart}function clearInnerHTML(e){for(;e.hasChildNodes();)e.removeChild(e.firstChild)}function strip(e){var t=document.createElement("DIV");return t.innerHTML=e,t.textContent||t.innerText||""}function hide(e){return DOMElem(e).style.visibility="hidden",e}function show(e){return DOMElem(e).style.visibility="initial",e}function isHidden(e){return"hidden"==DOMElem(e).style.visibility}function isDisabled(e){return 1==DOMElem(e).disabled}function disable(e){return DOMElem(e).disabled=!0,e}function enable(e){return DOMElem(e).disabled=!1,e}function hardHide(e){return DOMElem(e).style.display="none",e}function hardShow(e){return DOMElem(e).style.display="block",e}function isHardHidden(e){return"none"==DOMElem(e).style.display}function DOMElem(e){for(;isDOMObj(e);)e=e.DOM;return e}function AEF(e,t=content){var n=e;if(t instanceof DOMObj)t.appendChild(e.DOM);else if(isDefined(e.DOM))for(;null!=e.DOM;)e=e.DOM;return t.insertBefore(e,t.firstChild),"appended"in n&&n.appended(),n}function AE(e,t=content){var n=e;if(t instanceof DOMObj)t.appendChild(e.DOM);else if(isDefined(e.DOM))for(;null!=e.DOM;)e=e.DOM;return t.appendChild(e),"appended"in n&&n.appended(),n}function ACE(e=content){var t=ArgToArr(arguments);t.shift();var n=CE(...t);return AE(n,e),n}function CE(){var e,t,n=ArgToArr(arguments);if(t=cElement.hasOwnProperty(n[0])?cElement[n[0]]:[n[0],"generic"],e=document.createElement(t[0]),-1!=["svg","polygon"].indexOf(t[0])&&(e=document.createElementNS("http://www.w3.org/2000/svg",t[0])),"generic"==t[1])t=cElement.generic;else{if("func"==t[1])return cElement[n[0]][2](...n);if("domobj"==t[0])return new t[1](...n.shift())}for(let r=1;r<t.length;r++)if("set"==t[r])e[t[++r]]=t[++r];else if(null==n[r]);else if("content"==t[r]){if(null!=n[r])if(n[r]instanceof Array)for(let t=0;t<n[r].length;t++)"string"==typeof n[r][t]&&(n[r][t]=document.createTextNode(n[r][t])),AE(n[r][t],e);else e.innerText=n[r]}else"keySet"==t[r]?forIn(n[r],(t,n)=>{e.setAttribute(t,n)}):"rt"==t[r]?e.appendChild(CE("rt",n[r])):"points"==t[r]?e.setAttribute(t[r],n[r]):-1!=["onclick"].indexOf(t[r])?e.addEventListener("click",n[r]):-1!=["innerText"].indexOf(t[r])?e[t[r]]=n[r]:null!=n[r]&&e.setAttribute(t[r],n[r]);return e}function addCE(){let e=ArgsToArr(arguments);cElement[e.pop()]=e}random=((e=1,t=0)=>Math.floor(Math.random()*(e-t)+t));const cElement={a:["a","href","content","id","class","onclick"],ado:["audio","id","controls","src","onload","set","autoplay","false"],artcl:["article","generic"],br:["br"],btn:["input","value","id","class","onclick","set","type","button"],cnt:["content","generic"],cvs:["canvas","id","class","onclick","left","top","width","height"],date:["datepicker","set","type","grid"],div:["div","generic"],dls:["datalist","generic"],frm:["form","content","id","action"],hr:["hr"],iframe:["iframe","src","id","class","width","height"],preload:["link","href","as","set","preload"],img:["img","id","src","alt","class","onclick","keySet"],ipt:["input","value","name","class","type","keySet"],lbl:["label","innerText","htmlFor"],li:["li","generic"],line:["line","x1","x2","y1","y2","id","class","onclick","set","style","stroke:rgb(255,0,0);stroke-width:2"],ol:["ol","generic"],opt:["option","innerText","name","value","keySet"],p:["p","generic"],pbr:["div","set","class","pageBreak"],pdf:["embed","src","id","class","set","alt","pdf","set","pluginspage","http://www.adobe.com/products/acrobat/readstep2.html"],pre:["pre","generic"],pgn:["polygon","points","class"],rdo:["input","content","name","id","class","onclick","set","type","radio"],rt:["rt","content"],ruby:["ruby","content","rt","id","class","onclick"],stn:["section","generic"],slt:["select","name","content","value","keySet"],spn:["span","generic"],table:["table","generic"],tbx:["input","value","id","class","placeholder","onClick","keySet","set","type","textbox"],txtArea:["textarea","content","name","class","placeholder","cols","rows","wrap"],td:["td","generic"],tr:["tr","generic"],txtarea:["textarea","innerText","name","class","onclick","cols","rows"],ul:["ul","generic"],vid:["vid","src","id","class","onload","type","width","height"],dropdown:["select","func",(e,t,r,o,i,s,a={},l={})=>{let c=CE("slt",t,r.map(e=>CE("opt",e[1],t,e[0])),n,a);return c.selectedIndex=i,o!=n&&c.addEventListener("change",e=>{let t=(e=getE(e)).selectedIndex;e=e.options[t],o(e.value,e.text,t)}),c}],favico:["favicon","func",(e,t,n=document.getElementsByTagName("script")[0])=>{let r=CE("link");return r.setAttribute("rel","shortcut icon"),r.setAttribute("type","image/x-icon"),r.setAttribute("title","favIcon"),r.setAttribute("href",t),n.parentNode.insertBefore(r,n),r}],popup:["popup","func",(e,t,n,r=1250,o=200,i=250,s=400)=>{var a=linkTo(n,t,"screenX="+r,"screenY="+o,"width="+i,"height="+s);a.resizeTo(i,s),a.moveTo(r,o)}],ico:["icon","func",(e,t)=>CE("spn",null,null,"ico-"+t)],plx:["img","func",(e,t,n=500,r,o,i,s)=>{let a=CE("div",r,o,i,s);return a.classList.add("parallax"),a.style="background-image: url("+t+");--height:"+n+"px;",a}],fld:["field","func",(e,t,n,r,o,i=!1,...s)=>{let a=i?CE(o,...s):CE("ipt","",n,null,null!=o?o:"text");return CE("lgnd",t,[a],r,e=>{a.focus()})}],css:["css","func",(e,t,n=document.getElementsByTagName("script")[0])=>{var r=document.createElement("style");return null!=t&&(r.innerText=t.replace(/[\t\n\r]/gm,"")),n.parentNode.insertBefore(r,n),r}],image:["image","func",(e,t,n,r,o)=>{var i=new Image;return i.src=t,null!=o&&(i.onload=o),null!=n&&(i.height=n),null!=r&&(i.width=r),i}],lgnd:["legend","func",(e,t,n,r,o)=>CE("fieldset",[CE("legend",t),...n],null,r,o)],style:["style","func",(e,t,n)=>{var r=document.createElement("link");null!=n&&(r.onload=n),r.type="text/css",r.rel="stylesheet",r.href=t,document.getElementsByTagName("head")[0].appendChild(r)}],script:["script","func",(e,t,n,r,o=!1,i)=>{var s=document.createElement("script");if(null!=r&&(s.onload=r),null!=n&&(s.innerText=n),null!=t&&(s.src=t),s.language="javascript",s.type="text/javascript",null!=i){i=i.split(",");for(let e=0;e<i.length;e++)s[i[e]]=!0}if(o){var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(s,a)}else document.head.appendChild(s)}],txt:[null,"func",(e,t)=>document.createTextNode(t)],meta:["meta","func",(e,t,n,r)=>{var o=document.createElement("meta");null!=r&&(o.onload=r),o.name=t,o.content=n,document.getElementsByTagName("head")[0].appendChild(tag)}],jp:["japaneseText","func",(e,t,n=!1)=>{let r=isArray(t)?t.map(e=>isString(e)?"\n"===e?br():CE("spn",e):isArray(e)?CE("ruby",...e):e):t;return(r=CE("div",r,null,n?"vertical":null)).lang="jp",r}],generic:["","content","id","class","onclick","keySet"]};function br(e=content){return ACE(e,"br")}function CEHelp(e){null==e?forIn(cElement,(e,t)=>{console.log(e,t.join(","))}):console.log(cElement[e])}function firstCharToUpper(e){return e.replace(/^\w/,e=>e.toUpperCase())}function firstCharToLower(e){return e.replace(/^\w/,e=>e.toLowerCase())}function spacesBeforeCaps(e){return e.replace(/([A-Z])/g," $1").trim()}function strFormat(e){var t=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,(e,n)=>t[n])}function copyTextToClipboard(e){var t=document.createElement("textarea");return t.value=e,t.setAttribute("readonly",""),t.style={position:"absolute",left:"-9999px"},document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),e}function encodeID(e){if(null==e||"number"!=typeof e)throw new Error("ID needs to be a number");e=parseInt(e+1e11);var t="",n=dict.length;for(let r=Math.floor(Math.log(e)/Math.log(n));r>=0;r--)t+=dict.substr(Math.floor(e/Math.pow(n,r))%n,1);return t.split("").reverse().join("")}function decodeID(e){if(null==e||"string"!=typeof e)throw new Error("Encoded ID needs to be a string.");e=e.split("").reverse().join("");var t=0;for(let n=0;n<=e.length-1;n++)t+=dict.indexOf(e.substr(n,1))*Math.pow(dict.length,e.length-1-n);return t-1e11}function ArgToArr(e){return Array.prototype.slice.call(e)}function arraySplit(e,t){return[e.slice(0,t),e.slice(t)]}function cloneArr(e){return e.slice(0)}function removeDuplicates(e){return Array.from(new Set(e))}function arrayDiff(e){let t=[];for(let n in this)e.indexOf(this[n])>-1&&t.push(this[n]);return t}function flatten(e){return e.reduce((e,t)=>e.concat(Array.isArray(t)?flatten(t):t),[])}function deleteArrElem(e,t){e.splice(t,1)}function split(e,t=0){var n;if((!isDefined(e)||""!=e)&&isDefined(e)){e=e.split(SPLIT.SET[t++]);for(let r=0;r<e.length;r++)n=t,-1==e[r].indexOf(SPLIT.SET[n])&&(n=checkForSplit(e[r],n)),n<SPLIT.SET.length&&(e[r]=split(e[r],n));return e}}function checkForSplit(e,t){for(;t<SPLIT.SET.length&&-1==e.indexOf(SPLIT.SET[t]);t++);return t}function collapse(e,t=SPLIT.OBJECT){return e.join(SPLIT.SET[t])}function splitHelp(e){null==e?forIn(SPLIT,(e,t)=>{log.arg("SPLIT.SET[SPLIT["+e+"]]",t)}):console.log(SPLIT[e])}String.toCamelCaps=(e=>e.replace(/^\w/,e=>e.toLowerCase()).replace(/\s/g,"")),String.toNormal=(e=>e.replace(/^\w/,e=>e.toUpperCase()).replace(/([A-Z])/g," $1").trim()),String.prototype.replaceChar=function(e,t){return this.substr(0,t)+e+this.substr(t+e.length)},Array.generate=((e,t)=>[...Array(e).keys()].map(t)),Array.remove=function(e,t,n){var r=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,r)},Array.shuffle=(e=>{for(var t,n,r=e.length;0!==r;)n=Math.floor(Math.random()*r),t=e[r-=1],e[r]=e[n],e[n]=t;return e});var SPLIT={SET:["~&","~`","~!","~@","~$","~%","~^"],META:0,OBJECT:1,FIELD:2,ARRAY:3,SUBARRAY:4,SUB2ARRAY:5,SUB3ARRAY:6},dict={};function linkTo(e,t){if(null!=t)return"tab"==t&&(t="_blank"),window.open(...arguments);window.location=e}function ajax(e,t,n,r="application/x-www-form-urlencoded"){var o,i,s=log.caller(1);try{o=new XMLHttpRequest}catch(e){try{o=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{o=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){return alert("Your browser broke!"),!1}}}if(o.onreadystatechange=(()=>{var r=o.responseText+"";4==o.readyState&&log.response(s,e,t,r||"No response",null);var i=7==o.responseText.charCodeAt(0);if(i&&(r=r.substring(1)),r=split(r),i){if("array"!=typeof(i="array"==typeof r[0][0]?r[0]:[r[0]])[0][0][0])log.CODE[i[0][0][0]](i[0][1]);else for(let e=0;e<i[0].length;e++)log.arg("messages[0][index][0]",i[0][e][0]),log.CODE[i[0][e][0]](i[0][e][1]);r.shift()}null!=n&&4==o.readyState&&n(r[0])}),o.open("POST",baseURL+"core/db/"+e+".php",!0),o.setRequestHeader("charset","utf-8"),"application/x-www-form-urlencoded"==r){o.setRequestHeader("Content-type",r),i="";for(let e=0;e<t.length-1;e++)i+=t[e++]+"="+encodeURIComponent(t[e])+"&";i=i.slice(0,-1)}else{i=new FormData;for(let e=0;e<t.length-1;e++){var a=t[e++],l=t[e];i.append(a,l)}}o.send(i)}class SimpleLoader extends Obj{constructor(e,t){super("finishedLoading",e,"items",t||0)}addItem(){this.items++}addItems(e=0){this.items+=e}removeItem(){this.items--,this.checkLoader()}checkLoader(){0!=this.items?this.load():null!=this.finishedLoading&&this.finishedLoading()}load(){0==this.items&&this.finishedLoading()}}onLoad(()=>{device=new Device,content=(content=document.getElementsByTagName("main")).length>0?content[0]:ACE(document.body,"cnt"),log.header()});
const pageListener={};chrome.runtime.onMessage.addListener((e,r,s)=>{hasKey(pageListener,e.rc)?pageListener[e.rc](e,r,s):console.log("There is no ",e.rc)});
class Extension{
	static sendInternal(c,m,r=(()=>{}),e={}){e.rc=c;e.content=m;chrome.runtime.sendMessage(e,r)}
	static sendToPage(c,m,r=n,e={}){e.rc=c,e.content=m,chrome.tabs.query({active:true,lastFocusedWindow:true},(tab)=>{console.log("send",tab[0].id);chrome.tabs.sendMessage(tab[0].id,e)})}
	//static sendToPage(c,m,r=n,e={}){e.rc=c,e.content=m,chrome.tabs.query({active:true,lastFocusedWindow:true},t=>{if(isDefined(t[0])){console.log("send",t[0]);chrome.runtime.sendMessage(t[0].id,e,r)}})}

	static newTab(u,c){return chrome.tabs.create({url:u},c);}
}

/*
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
  chrome.tabs.sendMessage(tab.id, {foo: 'bar'});
});
*/
class Storage{static init(e=((e,t,a)=>{})){chrome.storage.onChanged.addListener(function(t,a){if("sync"===a)for(var s in t)this.setLocal(s,t[s].newValue),e(s,t[s].newValue,t[s].oldValue)})}static set(e,t,a){let obj={};obj[e]=t;chrome.storage.sync.set(obj,a)}static get(e,t=(e=>{})){chrome.storage.sync.get([e],t)}static delete(e,t){chrome.storage.local.remove(e,t)}static setLocal(e,t,a){let obj={};obj[e]=t;chrome.storage.local.set(obj,a)}static getLocal(e,t){chrome.storage.local.get(e,obj=>t(obj[e]))}}
chrome.browserAction.onClicked.addListener((tab)=>{chrome.tabs.create({'url': chrome.extension.getURL('html/localDB.html')});});
//<script type="module" src=",./scripts/background.js"></script>
//import DB, {Tags} from "./localDB.js"
var testDB;
onLoad(e=>{
	testDB=new LocalDB("test");
});

function reset(){
	resetTagTable();
	testDB.dropTable("gameStore");
	generateGameTable();
}
 function resetTagTable(){
	testDB.dropTable("tags")
	testDB.addTable("tags",{name:LocalDB.STR})
	tags.map(e=>testDB.insert("tags",{name:e}));
}

function generateGameTable(){
	let tableName="gameStore";
	let tables=[["name",LocalDB.STR],["price",LocalDB.MONEY],["description",LocalDB.STR]];//rating,purchaseDetails,
	let tagSet=t;
	testDB.addTable(tableName,{name:LocalDB.STR,price:LocalDB.MONEY,description:LocalDB.STR},["name","description"],tagSet);
	[
		["Crash Bandicoot 3: Warped",10.00,"Battle the forces of the evil Dr. Neo Cortex as the mighty marsupial Crash Bandicoot. In the third installment of this beloved series you will find yourself equipped with all new abilities as you travel across various places in time and space.","GAME,PLAYSTATION,PLATFORMER,ACTION,3D,NAUGHTYDOG,SONY"],
		["Final Fantasy IX",14.00,"In a story intrigue and wonder, you play Zidane the thief and the friends he makes along the way as he discovers the secrets behind the world and his very existance.","GAME,PLAYSTATION,RPG,SQUAREENIX,SONY"],
		["Metal Gear Solid",25.00,"Sent on a stealth mission to the Fox Hound base in Alaska, Solid Snake must sneak and kill his way through a miriad of specially engineered genome soldiers to stop the terrorist plot and find out how he fits into their evil plans.","GAME,PLAYSTATION,STEALTH,ACTION,KONAMI,SONY"],
		["Tony Hawk's Pro Skater 2",15.00,"Carve up the streets to a wicked soundtrack as your choice of different Pro Skaters. Armed with a sick set of tricks, chain various moves across rails, ramps, pipes and bowls into unreal combos.","GAME,PLAYSTATION,SPORTS,NEVERSOFT,SONY"],
		["Tomba!",30.00,"On a quest to retrieve his Grandpas' lost bracelet from the Seven Evil Pigs, Tomba may even save the world while he's at it. With an innovative style of gameplay, our pink hairs cave boy hero will bite and blackjack his way from the foreground to the background, though various perpectives and biomes.","GAME,PLAYSTATION,PLATFORMER,RPG,ACTION,WHOOPIECAMP,SONY"],
		["Comix Zone",250.00,"Sucked into his own work, our protagonist comic artist will fight his way through the panels. Sometimes, even using this unique terrain to his advantage or that of his little mousey friend.","GAME,GENESIS,PLATFORMER,COMIC,IGUANA,SEGA"],
		["Earthworm Jim",150.00,"When a top of the line Super Suit falls on a lowly earthworm, he embarks on a quest to save Princess What's-Her-Name from the evils of the universe, the likes of Psycrow, Bob the Goldfish, or the ruler of Heck and the repulisive Queen Malformed-Pulsating-Slug-For-A-Butt!","GAME,GENESIS,PLATFORMER,ACTION,ACTIVISION,SEGA"],
		["Mortal Kombat",125.00,"The fate of Earthrealm stands in the blanace as you brutally fight to the death in the hidden death game, Mortal Kombat. As you rip your way through a myriad of opponents, you come to fight the four armed beast of a half-dragon and his soul stealing wizard masater. Try to finish your opponet with fatalities and flawless victories or test your might across increasingly denser matiels.","GAME,GENESIS,FIGHTING,NETHERREALMS,SEGA"],
		["Sonic The Hedgehog 2",35.00,"The evil mad scientist, Dt. Eggman Robotnik, has captured the furry residents of the planet Mobius. Moving faster than the speed of sound, Sonic will defet him at any cost.","GAME,GENESIS,PLATFORMER,SEGA"],
		["Donkey Kong Country",80.00,"One day, woken from his nap, the great ape Donkey Kong witnissed a horrific sight. His banana horde was being sucked away and stolen by the evil King K. Kruel. Battle your way through his forces and unique platform challenges get get your collection back, one banana at a time.","GAME,SNES,PLATFORMER,RARE,NINTENDO"],
		["Super Mario RPG: Legend of the Seven Stars",15.00,"A sword has fallen into the castle of the Mushroom Kingdom. Mario must team up with friends, old and new, and even unlikely allies, to defeat the new threat to his home. Using real time battle system and an isometric view, you will be faced with unique platforming and combat challenges.","GAME,SNES,RPG,SQUREENIX,NINTENDO"],
		["Super Metroid",30.00,"Bounty hunter, Samas Aran, has returned to the planet Zebes to find the missing researchers, Upgrade your equipment to unlock new paths through the depths of the planet and fight your way through the dangerous and unique flora and fauna to discover the secrets behind the parasitic Metroid species.","GAME,SNES,PLATFORMER,EXPLORATION,PUZZLE,METROIDVANIA,NINTENDO"],
		["Star Fox",80.00,"Space ace, Fox McCloud and his animal pilot squad blast through countless enemy combatants while pulling stylish manuvers through various gates scattered thoughout their path,","GAME,SNES,FLYING,ACTION,SHOOTER,NINTENDO"],
		["The Legend of Zelda: A Link To The Past",30.00,"Woken from his sleep on a stormy night by the voice of the Princess Zelda, Link embarks on a quest to rescue her and the decendants of seven sages from the evil Ganon in his own dark twised dark world.","GAME,SNES,RPG,ACTION,PUZZLE,EXPLORATION,NINTENDO"]
	].map(game=>{
		let info={};
		tables.map((table,i)=>info[table[0]]=game[i]);
		let id=testDB.insert(tableName,info);
		if(tagSet){
			testDB.tags.setTag({tableName:tableName,id:id,tags:game[game.length-1].split(",").map(tag=>{
				let results=testDB.select("tags",{name:tag});
				console.log("results of ",tag,":",results);
				return results.length>0?results[0].id:tag;
			})});
		}
	});
}

/*

		//testDB.addTable("wordTags",{item:LocalDB.INT,tag:LocalDB.INT});
		//testDB.addTable("tags",{name:LocalDB.STR});
		//tags.map(e=>testDB.insert("tags",{name:e}));
		
		//testDB.addTable("word",{eng:LocalDB.STR,jap:LocalDB.STR,kanji:LocalDB.STR,kana:LocalDB.STR,type:LocalDB.STR,definition:LocalDB.STR},["eng","kanji"]true);

		//testDB.addTable("user",{firstName:LocalDB.STR,lastName:LocalDB.STR,job:LocalDB.STR});
		//testDB.insert("user",{firstName:"Matt",lastName:"Bird",job:"Teacher"});
		//testDB.insert("user",{firstName:"Joe",lastName:"Cool",job:"Avatar"});
		//testDB.insert("user",{firstName:"Matt",lastName:"Black",job:"Painter"});


:LocalDB.BOOL
:LocalDB.GPS
testDB.addTable("words",{eng:LocalDB.STR,jp:LocalDB.STR,kana:LocalDB.STR,description:LocalDB.STR,mnemonic:LocalDB.STR,notes:LocalDB.STR,eiken:LocalDB.INT,toeic:LocalDB.INT,jlpt:LocalDB.INT});
testDB.addTable("phrases",{name:LocalDB.STR,words:LocalDB.ARR,plural:LocalDB.ARR,japWords:LocalDB.ARR,japWordsPlural:LocalDB.ARR});
testDB.addTable("sentences",{name:LocalDB.STR,words:LocalDB.ARR});
testDB.addTable("statements",{name:LocalDB.STR,sentences:LocalDB.ARR});
testDB.addTable("players",{level:LocalDB.INT,exp:LocalDB.INT,health:LocalDB.INT,money:LocalDB.INT,location:LocalDB.INT,hand:LocalDB.ARR});
testDB.addTable("cards",{userID:LocalDB.INT,wordID:LocalDB.INT,level:LocalDB.INT,nextTime:LocalDB.DATE,history:LocalDB.ARR});
testDB.addTable("npcs",{name:LocalDB.STR,occupation:LocalDB.INT,wares:LocalDB.ARR,dialog:LocalDB.ARR});
testDB.addTable("items",{name:LocalDB.STR,emoji:LocalDB.STR,type:LocalDB.INT,actions:LocalDB.ARR,extraInfo:LocalDB.STR});
testDB.addTable("locations",{title:LocalDB.INT,description:LocalDB.ARR,descLinks:LocalDB.ARR,parent:LocalDB.INT,links:LocalDB.ARR,linksPoolless:LocalDB.ARR,items:LocalDB.ARR,npcs:LocalDB.ARR,enterAction,name:LocalDB.STR});
testDB.addTable("dialogNodes",{name:LocalDB.STR,playerText:LocalDB.ARR,textSet:LocalDB.ARR,textLink:LocalDB.ARR,branchType:LocalDB.INT,branch:LocalDB.INT,extraInfo:LocalDB.ARR});
testDB.addTable("dialogBranches",{name:LocalDB.STR,options:LocalDB.ARR,nodeReactions:LocalDB.ARR});
testDB.addTable("actions",{name:LocalDB.INT,sentence:LocalDB.ARR});
testDB.addTable("wordLinks",{word:LocalDB.INT,baseWord:LocalDB.INT,relationship:LocalDB.INT});
testDB.addTable("itemTypes",{name:LocalDB.STR});
testDB.addTable("wordLinkLabels",{name:LocalDB.STR});
testDB.addTable("timeTable",{user:LocalDB.INT,time,gps,open,maxUsers:LocalDB.INT,level:LocalDB.INT,activityTopic:LocalDB.INT,notes:LocalDB.STR});
testDB.addTable("topics",{name:LocalDB.STR,description:LocalDB.ARR});
testDB.addTable("branchTypes",{name:LocalDB.STR});
testDB.addTable("occupations",{name:LocalDB.STR});
testDB.addTable("srs",{user:LocalDB.INT,word:LocalDB.INT,level:LocalDB.INT,nextTime:LocalDB.DATE,history:LocalDB.ARR});

	
	
lessons
	{name:LocalDB.STR,description,sections,prereqs,related}

friends
	{userA,userB}

users
	{name:LocalDB.STR,lineID,type,language,lastQuestion}

lessonVocab
	{word:LocalDB.STR,lesson}

questions
	{askerID,text,timestamp,conversationID,open}

conversations
	{userID,text,timestamp,conversationID,sentFrom}

schedule
	{user,time,gps,open,maxUsers,level,activityTopic...

tickets
	{status,askerID,assignedTo,topic,startDate,endDa...

vocab
	{en:LocalDB.STR,jp:LocalDB.STR,kana:LocalDB.STR,user}

addTable
editTable
insert
select
edit
delete


*/

class Message{
	static toPage(command,content,tabID="*",callback=(()=>{})){
		console.log(arguments)
		console.log("*://*/"+tabID+"*");
		chrome.tabs.query({url:"*://*/"+tabID+"*"},(tabs)=>{
			console.log(tabs);
			[...tabs].map((tab)=>{chrome.tabs.sendMessage(tab.id,{rc:command,content:content},callback)})});
	}
}
//Message.toPage("notifBtn",btnIndex,tabID);

class Tags extends Obj{
	constructor(vars){
		super("sharedVars",vars);
		pageListener.getTag=(e,s,r)=>this.getTag(e,r);
		pageListener.setTag=(e,s,r)=>this.setTag(e,r);
		pageListener.topTags=(e,s,r)=>r(this.topTags(e));
		pageListener.getTagsForItems=(e,s,r)=>r(this.getTagsForItems(e));
	}
	getTagsForItems({tableName,items,includesTags}){
		includesTags=includesTags.map(e=>parseInt(e));
		console.log("getTagsForItems",{tableName,items,includesTags});
		let tags={},
				fetchedItems={},
				selected=n,
				addTag=(obj,key,arr)=>{if(!hasKey(arr,obj[key])){arr[obj[key]]=[];}arr[obj[key]].push(obj);return obj[key];};
		if(items.length>0){
			//get all tags of all items and add them to fetchedItems
			selected=this.select(tableName+"Tags",e=>items.includes(e.item)).map(e=>addTag(e,"item",fetchedItems));
			//get all items that have tags included in the previous subset
			selected=this.select(tableName+"Tags",e=>selected.includes(e.tag)&&!items.includes(e.item));
		}else{console.log("No items");selected=this.select(tableName+"Tags",e=>t);}
		selected.map(e=>addTag(e,"item",fetchedItems));
		console.log(fetchedItems);
		
		for(let key in fetchedItems){
			console.log(includesTags);
			//console.log(key,fetchedItems[key].map(e=>includesTags.includes(e.tag)));
			if(includesTags.length>0&&(fetchedItems[key].map(e=>{console.log(e);return includesTags.includes(e.tag)}).filter(e=>e).length!=includesTags.length)){
				delete fetchedItems[key];
			}else{
				fetchedItems[key].map(e=>addTag(e,"tag",tags));
			}
		}
		/*{
			//get all items with the tag that aren't the item or in includedTags
			
			//this.select("tags",e=>{})
			this.select("tags",e=>{
				e.tag==tag&&e.item!=item&&!includesTags.includes(e.tag);
				//Add each set to the tag array
			}).map(({item})=>{if(!hasKey(tags,tag)){tags[tag]=[];}tags[tag].push(item);});
		});*/
		tags=Object.entries(tags);
		console.log("after got,before sort",{tags});
		//tags=[...new Set(tags)].map(tag=>{console.log(tag);[...new Set(tag)]});//Remove Duplicates
		tags=tags.sort((a,b)=>a[1].length<b[1].length?1:(a[1].length>b[1].length?-1:0));
		console.log({fetchedItems});
		fetchedItems=Object.keys(fetchedItems).map(id=>this.select(tableName,{id:id}).map(e=>{return [e.id,e.name]})).map(e=>e[0]);
		return [tags,fetchedItems];
	}
	getTag({tableName,id},callback=(()=>{})){
		callback(this.select(tableName+"Tags",{item:parseInt(id)}));
	}
	setTag({tableName,id,tags},callback=(()=>{})){
		console.log("setTag",arguments);
		//Remove any nulls from tags and convert any strings to new tags
		tags=tags.filter(e=>e!=n).map(tag=>{
			if(isString(tag)){
				let tagIndex=this.select("tags",{name:tag});
				if(tagIndex.length==0){
					tag=this.insert("tags",{name:tag});
					console.log("inserted tag",tag)
				}else{tag=tagIndex[0];}
			}
			return tag;
		});
		
		let existingTags=this.select(tableName+"Tags",{item:parseInt(id)});
		console.log("existingTags",...existingTags);
		for(let i=tags.length-1;i>-1;i--){
			let tagIndex=existingTags.map(e=>e.tag).indexOf(tags[i]);
			console.log("add",tagIndex,existingTags,tags[i]);
			if(tagIndex==-1){
				console.log("I insert",{item:parseInt(id),tag:tags[i]});
				this.insert(tableName+"Tags",{item:parseInt(id),tag:tags[i]});
			}
		}
		for(let i=existingTags.length-1;i>-1;i--){
			let tagIndex=tags.indexOf(existingTags[i].tag);
			console.log("remove",tagIndex,existingTags[i].tag,tags);
			if(tagIndex==-1){
				console.log("I delete",existingTags[i].id);
				this.remove(tableName+"Tags",{id:existingTags[i].id});
			}
		}
		callback("success");
	}
	selectItemsFromTags(...tags){
		tags=this.select(this.tagTable,e=>tags.indexOf(e.tag)!=-1).map(e=>e.id);
		tags=[...new Set(tags)];
		return this.select(this.tableName,e=>tags.indexOf(e.id)!=-1);
	}
	selectTagsFromItem(tableName,id){
		if(this.tables[tableName].tags){
			let tags=[...new Set(this.select(tableName+"Tags",{item:id}).map(e=>e.tag))];
			tags=this.select(tableName,e=>tags.indexOf(e.id)!=-1);
			console.log(tags);
			return tags;
		}
	}
	topTags({tableName,list,limit=15}){
		console.log("topTags",tableName,list,limit);
		//If list is string, turn list to array
		if(isString(list)){list=[list];}
		//if the list is not empty, then get the tags that contain all the list items
		if(list.length>0){
			console.log("fromList");
			list=list.map(tag=>[tag,this.select(tableName+"Tags",{tag:tag})]);
			console.log("list",list);
		}else{//if list is empty get the top tags in general
			//Get all the results and group them by tag
			list={};
			this.select(tableName+"Tags",e=>t).map(tag=>{
				console.log("selected",tag);
				if(!hasKey(list,tag.tag)){console.table(list);console.log("added new");list[tag.tag]=[tag.tag,[]]}
				list[tag.tag][1].push(tag);console.log("inserted");
			});
			console.log(list);
			list=Object.values(list);
		}
		
		//restrict entries to count above 0 sorted high to low
		list=list.filter(results=>results[1].length>0).sort((a,b)=>{
			if(a[1].length<b[1].length){return 1;}
			else if(a[1].length>b[1].length){return -1;}
			return 0;
		});
		console.log(list);
		//cut results at limit
		if(list.length>limit){list.length=limit;}
		
		return list;
	}
}
function addSearchFields(){
	testDB.tables.word.searchFields=["eng","kanji"];
	testDB.tables.gameStore.searchFields=["name","description"];
	testDB.commit();
}


class LocalDB extends Obj{
	testPopulate(){
		//testDB.addTable("wordTags",{item:LocalDB.INT,tag:LocalDB.INT});
		//testDB.addTable("tags",{name:LocalDB.STR});
		//tags.map(e=>testDB.insert("tags",{name:e}));
		
		//testDB.addTable("word",{eng:LocalDB.STR,jap:LocalDB.STR,kanji:LocalDB.STR,kana:LocalDB.STR,type:LocalDB.STR,definition:LocalDB.STR},["eng","kanji"]true);

		this.addTable("user",[["firstName",LocalDB.STR],["lastName",LocalDB.STR],["job",LocalDB.STR]]);
		this.insert("user",{firstName:"Matt",lastName:"Bird",job:"Programmer"});
		//testDB.insert("user",{firstName:"Joe",lastName:"Cool",job:"Avatar"});
		//testDB.insert("user",{firstName:"Matt",lastName:"Black",job:"Painter"});
		console.log(this.dbase);
		let sel=this.select("user",e=>e.id>1);
		console.log(sel);
		//testDB.edit("user",{id:1},{firstName:"Joe"});
		//console.log(testDB.dbase);
	}
	
	constructor(db){
		super("dbase",db);
		pageListener.search=(e,s,r)=>r(this.search(e));
		pageListener.addTable=e=>this.addTable(...e.content);
		//pageListener.addTable=e=>this.addTable(e.name,e.fields,e.tags);
		pageListener.deleteTable=e=>this.dropTable(e.content);
		pageListener.addEntry=(e,s,r)=>r(this.insert(e.content.tableName,e.content.data));
		pageListener.editEntry=e=>this.edit(e.content.tableName,{id:e.content.id},e.content.change);
		pageListener.fetchDB=(e)=>{console.table({db:e.content});this.db=e.content};
		pageListener.fetchTableData=(e,s,r)=>r(this.dbase.tables[e.content]);
		pageListener.fetchTable=(e,s,r)=>{let response={name:e.content,tableData:this.dbase.tables[e.content].fields,data:this.dbase.data[e.content]};Extension.sendToPage("setTable",response);r(response);};
		pageListener.getWeek=(tableName,field,sunday,whereClause)=>this.getWeek(tableName,field,sunday,whereClause);
	}
	set db(db=""){
		if(db==""){return;}
		this.dbName=String.toCamelCaps("db "+db);
	//Storage.delete(this.db,e=>{console.log(e);});
	Storage.getLocal(this.dbName,dbase=>{
		if(!isObject(dbase)){dbase={tables:{},data:{}};this.commit();}
		console.log(dbase);
		this.dbase=dbase;
		console.log(this.dbase.tables);
		this.tags=new Tags(this.shareVars("tables","select","insert","remove"));//,"tableName"
	//	this.testPopulate();
		Extension.sendToPage("dbTables",this.dbTables);
	});
	}
	get db(){
		return this.dbName;
	}
	drop(){
		chrome.storage.local.remove(this.db,e=>{this.dbName=n;this.dbase=n;});
	}

	get dbTables(){
		return Object.keys(this.dbase.tables).map(name=>[name,this.dbase.tables[name].fields]);
	}

	search({term,tableName,fields}){
		console.log("search",term,tableName,fields)
		let results=[];
		//Search table on each field
		//console.log(this.select(tableName,o=>tableName,o=>o[f].includes(term)||term.includes(o[f])))
		if(isString(fields)){fields=[fields];}
		console.log(fields);
		results.push(...this.select(tableName,o=>{
			console.log("fields",fields);for(let i=0;i<fields.length;i++){
				console.log(o,fields[i],term,hasKey(o,fields[i]),o[fields[i]].includes(term),term.includes(o[fields[i]]));
				if(hasKey(o,fields[i])&&o[fields[i]]!=""&&(o[fields[i]].includes(term)||term.includes(o[fields[i]]))){return t;}
			}
		}));
		//(isString(fields)?[fields]:fields).map(f=>);
		if(this.tables[tableName].tags){//if table has tags, search the tag table
			let tags=this.select("tags",e=>{console.log(term,e);return term.includes(e.name)||e.name.includes(term)}).map(e=>e.id);
			console.log(tags);
			//compare tag table to associated tagtable
			tags=tags.map(t=>this.select(tableName+"Tags",{tag:t}));
			tags.map(tag=>tag.map(t=>results.push(...this.select(tableName,{id:t.item}))));
		}
		console.log(results);
		return results;
	}

	edit(tableName,where,toEdit){
		let fields=this.select(tableName,where);
		console.log({tableName:tableName,where:where,toEdit:toEdit,fields:fields});
		var editing=toEdit;
		if(isObject(toEdit)){toEdit=e=>{for(let key in editing){e[key]=editing[key];}};}
		fields.map((edit,i)=>{toEdit(edit);this.dbase.data[tableName][edit.id]=edit;});
		this.commit();
	}
	remove(tableName,where){
		let toRemove=this.select(tableName,where);
		toRemove.map(r=>delete this.dbase.data[tableName][r.id]);
		this.commit();
	}
	
	//Table Functions
	tableExists(tableName){
		console.log(this.dbase);
		return hasKey(this.dbase.tables,tableName);
	}
	get tableDoesntExistWarning(){
		if(!this.tableExists){return f;console.error("Table ("+table+") doesn't exist.");}
		return t;
	}
	//Empty the table
	trunicate(tableName){
		let fields=this.dbase[tableName].fields;
		delete this.dbase[tableName];
		this.addTable(tableName,fields);
	}
	tableCount(){
		Object.keys(this.dbase.tables).length;
	}
	addTable(tableName,fields,searchFields=[],tags=f){
		console.log(this.dbase);
		if(!this.tableExists(tableName)){
			this.dbase.tables[tableName]={fields:fields,increment:0};
			this.dbase.data[tableName]={};
			this.dbase.tables[tableName].tags=tags;
			if(tags){
				this.addTable(tableName+"Tags",{item:LocalDB.INT,tag:LocalDB.INT});
			}
			this.commit();
			return t;
		}else{console.error("Table("+tableName+") already exists");return f;}
		
	}
	tableFields(tableName){
		return this.dbase.tables[tableName].fields;
	}
	dropTable(tableName){
		if(this.tableDoesntExistWarning){
			console.log(tableName);
			if(this.dbase.tables[tableName].tags==t){
				delete this.dbase.data[tableName+"Tags"];
				delete this.dbase.tables[tableName+"Tags"];
			}
			delete this.dbase.data[tableName];
			delete this.dbase.tables[tableName];
			this.commit();
		}
	}
	
	//Data Functions
	validateData(tableName,data){
		let fields=this.dbase.tables[tableName].fields;
		for(let key in data){
			if(hasKey(fields,key)===f){console.error(`The field(${key}) doesn't exist in Table(${tableName}).`);return false;}
			switch(fields(key)){//type
				case LocalDB.INT:if(!isInt(data[key])){console.error(`The field(${key}) is not an integer.`);return false;}break;
				case LocalDB.NUM:if(!isNum(data[key])){console.error(`The field(${key}) is not a number.`);return false;}break;
				case LocalDB.STR:if(!isString(data[key])){console.error(`The field(${key}) is not a string.`);return false;}break;
				case LocalDB.BOOL:if(!isBool(data[key])){console.error(`The field(${key}) is not a boolean.`);return false;}break;
				//case LocalDB.ARR:if(!isArray(data[key])){console.error(`The field(${key}) is not an array.`);return false;}break;
				//case LocalDB.OBJ:if(!isObject(data[key])){console.error(`The field(${key}) is not an object.`);return false;}break;
				case LocalDB.DATE:if(!isObj(data[key],"Date")){console.error(`The field(${key}) is not an object.`);return false;}break;
			}
		}
		return true;
	}
	insert(tableName, data) {
		console.log(this.dbase.tables[tableName]);
		data.id=this.dbase.tables[tableName].increment;
		this.dbase.data[tableName][ this.dbase.tables[tableName].increment ] = data;
		this.dbase.tables[tableName].increment++;
		Extension.sendToPage("setNewRowID",data.id);
		this.commit();
		return data.id;
	}
	select(tableName, where, limit, sortBy, start=0,end=-1){
		console.log(this);
		console.log("select",{tableName:tableName, where:where, limit:limit, sortBy:sortBy, start:start});
		let results=[],data=this.dbase.data[tableName];//data=Object.keys(data).length;
		if(limit==n){console.log(tableName);limit=this.tables[tableName].increment;}
		if(isFunc(where)){console.log("goIntoIsFunc");results=this.selectFromFunc(data,tableName, where, limit, sortBy, start);}
		else{
			for(let id in data){
				if(id>=start){
					//console.log(hasKey(where,"id"),id,where.id,id==where.id);
					if(hasKey(where,"id")&&(id==where.id||(isArray(where.id)&&where.id.indexOf(id)!=-1))){results.push(data[id]);}
					else{
						for(let key in where){
							if(key!="id"&&data[id][key]===where[key]){results.push(data[id]);}
					}	}
					if(results.length>=limit){break;}
			}	}
		}
		if(sortBy!=n){
			results=results.sort((a,b)=>{
				if(a[sortBy]<b[sortBy]){return -1;}
				else if(a[sortBy]>b[sortBy]){return 1;}
				return 0;
		});}
		results=results.map(e=>this.cloneRow(e));
		console.log(tableName,results);
		/*if(this.tables[tableName].tags){
			results.map(e=>{
				e.tags=this.tags.selectTagsFromItem(tableName,e.id);
			});
		}*/
		return results;
	}
	get tables(){return this.dbase.tables;}
	selectFromFunc(data,tableName, where, limit, sortBy, start, results=[]){
		console.log("selectFromFunc",...arguments);
		console.log("data",data);
		for(let id in data){
			console.log("id",id);
			if(id>=start){
				//console.log(data[id],where(data[id]),where);
				if(where(data[id])){results.push(data[id]);}
			}
		}
		return results;
	}
	cloneRow(obj){
		let clone={};
		for(let key in obj){
			clone[key]=obj[key];
		}
		return clone;
	}
	getWeek(tableName,field,sunday,whereClause){
		let where=isArray(whereClause)?e=>{
			for(let i=0;i<whereClause.length;i+=2){
				e[whereClause[i]]===whereClause[i+1];
			}
		}:e=>t
		let start=Date.parse(sunday.toUTCString()),
				end=Date.parse(new Date(sunday.setDate(sunday.getDate()-sunday.getDay()+7)).toUTCString());
		Extension.sendToPage("weekFetched",this.select(tableName,e=>Date.parse(e[field])>start&&Date.parse(e[field])<end&&where(e)));
	}
	//Serialize the db
	serialize(){
		return JSON.stringify(this.dbase);
	}
	get toString(){return this.serialize();}
	commit(){
		//console.log("string",this.toString);
		try{
			Storage.setLocal(this.db,this.dbase);
			return true;
		}catch(e){return false;}
	}
}
LocalDB.INT=0;
LocalDB.NUM=1;
LocalDB.STR=2;
LocalDB.BOOL=3;
LocalDB.ARR=4;
LocalDB.OBJ=5;
LocalDB.DATE=6;
LocalDB.DATETIME=7;
LocalDB.TIME=8;
LocalDB.IMAGE=9;


const tags=["ENGLISH","ENGLISHPLURAL","KANJI","KANA","TAGS",
	"STEP5","TIME","QUESTION","UNIT","MONTH",
	"WEEKDAY","WEEKEND","PERIOD","OCCURENCE","FREQUENCY",
	"ACTION","GRAMMAR","BODY","PERSON","THING",
	"HOBBY","SCHOOL","VEHICLE","PLACE","NUMBER",
	"SEASON","WEATHER","HOLIDAY","COLOR","ADJECTIVES",
	"DESCRIPTOR","GROUP","MODIFIER","EVENT","MEDIA",
	"FUN","BOOK","EXPRESSION","WORK","CLOTHES",
	"FEELING","DESCRIPTION","DRINK","CONTAINER","UTENSIL",
	"FRUIT","INGREDIENT","MEAL","GAME","SPORT",
	"KEYOBJECT","NAVIGATION","MAIL","INSIDE","ACTIVITY",
	"DIRECTION","LOCATION","TRAVEL","TOY","MUSIC",
	"INTANGIBLETHING","MATH","SIGN","SUBJECT","LANGUAGE",
	"SCIENCE","WRITING","ANIMATE","CONCEPT","FOOD",
	"CONVERSATION","RANDOMITEM","TECH","EXERCISE","DANCE",
	"BASEBALL","FRAGMENT","FAMILY","NAME","MALE",
	"FEMALE","JAPANESE","ORDINAL","PRONOUN","POLITE",
	"CONCATINATION","ANSWER","INSTRUMENT","BUILDING","PARENT",
	"QUANTIFIER","NATURE","OUTSIDE","AIRPLANE","BIRD",
	"INSECT","ANIMAL","PET","SPATIAL","SPEAKER",
	"NEGATIVE","POSSESSIVE","MATERIAL","AFFIRMITIVE","AMOUNT",
	"TOPICMARKER","SLEEP","REST","SURFACE","INDOORS",
	"BEDROOM","HOUSE","STATEMARKER","YOUNG","PROPERNOUN",
	"CARD","POINTS","MONEY","STATUS","ITEM",
	"PM","RANDOM","ENERGY","STATEMENT","SENTENCE",
	"PHRASE","WORD","TODECK","TOSET","GAMES",
	"JAPAN","RESEARCH","ZELDA"];
	/*,
	ENGLISH=1,ENGLISHPLURAL=2,KANJI=3,KANA=4,TAGS=5,
	STEP5=6,TIME=7,QUESTION=8,UNIT=9,MONTH=10,
	WEEKDAY=11,WEEKEND=12,PERIOD=13,OCCURENCE=14,FREQUENCY=15,
	ACTION=16,GRAMMAR=17,BODY=18,PERSON=19,THING=20,
	HOBBY=21,SCHOOL=22,VEHICLE=23,PLACE=24,NUMBER=25,
	SEASON=26,WEATHER=27,HOLIDAY=28,COLOR=29,ADJECTIVES=30,
	DESCRIPTOR=31,GROUP=32,MODIFIER=33,EVENT=34,MEDIA=35,
	FUN=36,BOOK=37,EXPRESSION=38,WORK=39,CLOTHES=40,
	FEELING=41,DESCRIPTION=42,DRINK=43,CONTAINER=44,UTENSIL=45,
	FRUIT=46,INGREDIENT=47,MEAL=48,GAME=49,SPORT=50,
	KEYOBJECT=51,NAVIGATION=52,MAIL=53,INSIDE=54,ACTIVITY=55,
	DIRECTION=56,LOCATION=57,TRAVEL=58,TOY=59,MUSIC=60,
	INTANGIBLETHING=61,MATH=62,SIGN=63,SUBJECT=64,LANGUAGE=65,
	SCIENCE=66,WRITING=67,ANIMATE=68,CONCEPT=69,FOOD=70,
	CONVERSATION=71,RANDOMITEM=72,TECH=73,EXERCISE=74,DANCE=75,
	BASEBALL=76,FRAGMENT=77,FAMILY=78,NAME=79,MALE=80,
	FEMALE=81,JAPANESE=82,ORDINAL=83,PRONOUN=84,POLITE=85,
	CONCATINATION=86,ANSWER=87,INSTRUMENT=88,BUILDING=89,PARENT=90,
	QUANTIFIER=91,NATURE=92,OUTSIDE=93,AIRPLANE=94,BIRD=95,
	INSECT=96,ANIMAL=97,PET=98,SPATIAL=99,SPEAKER=100,
	NEGATIVE=101,POSSESSIVE=102,MATERIAL=103,AFFIRMITIVE=104,AMOUNT=105,
	TOPICMARKER=106,SLEEP=107,REST=108,SURFACE=109,INDOORS=110,
	BEDROOM=111,HOUSE=112,STATEMARKER=113,YOUNG=114,PROPERNOUN=115,
	CARD=116,POINTS=117,MONEY=118,STATUS=119,ITEM=120,
	PM=121,RANDOM=122,ENERGY=123,STATEMENT=124,SENTENCE=125,
	PHRASE=126,WORD=127,TODECK=128,TOSET=129,GAMES=130,
	JAPAN=131,RESEARCH=132,ZELDA=133*/

function localStorageDB(db_name, engine) {
		var db_prefix = 'db_',
	db_id = db_prefix + db_name,
	db_new = false,	// this flag determines whether a new database was created during an object initialisation
	db = null;
		var storage;
		try {
				storage = (engine === sessionStorage ? sessionStorage: localStorage);
		} catch(e) { // ie8 hack
				storage = engine;
		}
		// if the database doesn't exist, create it
		db = storage[ db_id ];
		if( !( db && (db = JSON.parse(db)) && db.tables && db.data ) ) {
				if(!validateName(db_name)) {
						error("The name '" + db_name + "' contains invalid characters");
				} else {
						db = {tables: {}, data: {}};
						commit();
						db_new = true;
				}
		}
		// ______________________ private methods
		// _________ database functions
		function getItem(key) {
				try {
						return storage.storage[key];
				} catch (e) {
						return null;
				}
		}
		function replace(data) {
				setItem(db_id, data);
		}
		function setItem(key, value) {
				try {
						storage.setItem(key, value);
						return true;
				} catch (e) {
						return false;
				}
		}
		// _________ table functions
		// check whether a table exists
		function tableExists(table_name) {
				return db.tables[table_name] ? true : false;
		}
		// check whether a table exists, and if not, throw an error
		function tableExistsWarn(table_name) {
	if(!tableExists(table_name)) {
						error("The table '" + table_name + "' does not exist");
				}
		}
		// check whether a table column exists
		function columnExists(table_name, field_name) {
				var exists = false;
				var table_fields = db.tables[table_name].fields;
	for(var field in table_fields){
		if(table_fields[field] === field_name)
		{
								exists = true;
								break;
						}
				}
				return exists;
		}
		
		//alter a table
		function alterTable(table_name, new_fields, default_values){
				db.tables[table_name].fields = db.tables[table_name].fields.concat(new_fields);
				// insert default values in existing table
				if(typeof default_values !== "undefined") {
						// loop through all the records in the table
						for(var ID in db.data[table_name]) {
								if( !db.data[table_name].hasOwnProperty(ID) ) {
										continue;
								}
								for(var field in new_fields) {
										if(typeof default_values === "object") {
												db.data[table_name][ID][new_fields[field]] = default_values[new_fields[field]];
										} else {
												db.data[table_name][ID][new_fields[field]] = default_values;
										}
								}
						}
				}
		}
		// sort a result set
		function sort_results(field, order) {
				return function(x, y) {
						// case insensitive comparison for string values
						var v1 = typeof(x[field]) === "string" ? x[field].toLowerCase() : x[field],
			v2 = typeof(y[field]) === "string" ? y[field].toLowerCase() : y[field];
						if(order === "DESC") {
								return v1 === v2 ? 0 : (v1 < v2 ? 1 : -1);
						} else {
								return v1 === v2 ? 0 : (v1 > v2 ? 1 : -1);
						}
				};
		}
		// select rows in a table by field-value pairs, returns the IDs of matches
		function queryByValues(table_name, data) {
				var result_ids = [],
		exists = false,
		row = null;
				// loop through all the records in the table, looking for matches
				for(var ID in db.data[table_name]) {
						if( !db.data[table_name].hasOwnProperty(ID) ) {
								continue;
						}
						row = db.data[table_name][ID];
						exists = true;
						for(var field in data) {
								if( !data.hasOwnProperty(field) ) {
										continue;
								}
								if(typeof data[field] === 'string') {	// if the field is a string, do a case insensitive comparison
										if(row[field] === null || row[field].toString().toLowerCase() !== data[field].toString().toLowerCase()) {
												exists = false;
												break;
										}
								} else {
										if(row[field] !== data[field]) {
												exists = false;
												break;
										}
								}
						}
						if(exists) {
								result_ids.push(ID);
						}
				}
				return result_ids;
		}
		// select rows in a table by a function, returns the IDs of matches
		function queryByFunction(table_name, query_function) {
			console.log("queryByFunction");
				var result_ids = [],
		exists = false,
		row = null;
				// loop through all the records in the table, looking for matches
				for(var ID in db.data[table_name]) {
						if( !db.data[table_name].hasOwnProperty(ID) ) {
								continue;
						}
						row = db.data[table_name][ID];
						if( query_function( clone(row) ) === true ) {	// it's a match if the supplied conditional function is satisfied
								result_ids.push(ID);
						}
				}
				return result_ids;
		}
		// return all the IDs in a table
		function getIDs(table_name) {
				var result_ids = [];
				for(var ID in db.data[table_name]) {
						if( db.data[table_name].hasOwnProperty(ID) ) {
								result_ids.push(ID);
						}
				}
				return result_ids;
		}
		// delete rows, given a list of their IDs in a table
		function deleteRows(table_name, ids) {
				for(var i=0; i<ids.length; i++) {
						if( db.data[table_name].hasOwnProperty(ids[i]) ) {
								delete db.data[table_name][ ids[i] ];
						}
				}
				return ids.length;
		}
		// update rows
		function update(table_name, ids, update_function) {
				var ID = '', num = 0;
				for(var i=0; i<ids.length; i++) {
						ID = ids[i];
						var updated_data = update_function( clone(db.data[table_name][ID]) );
						if(updated_data) {
								delete updated_data['ID']; // no updates possible to ID
								var new_data = db.data[table_name][ID];
								// merge updated data with existing data
								for(var field in updated_data) {
										if( updated_data.hasOwnProperty(field) ) {
												new_data[field] = updated_data[field];
										}
								}
								db.data[table_name][ID] = validFields(table_name, new_data);
								num++;
						}
				}
				return num;
		}
		// commit the database to localStorage
		function commit() {
				try {
						storage.setItem(db_id, JSON.stringify(db));
						return true;
				} catch(e) {
						return false;
				}
		}
		// serialize the database
		function serialize() {
				return JSON.stringify(db);
		}
		// throw an error
		function error(msg) {
				throw new Error(msg);
		}
		// clone an object
		function clone(obj) {
				var new_obj = {};
				for(var key in obj) {
						if( obj.hasOwnProperty(key) ) {
								new_obj[key] = obj[key];
						}
				}
				return new_obj;
		}
		// validate db, table, field names (alpha-numeric only)
		function validateName(name) {
				return name.toString().match(/[^a-z_0-9]/ig) ? false : true;
		}
		// given a data list, only retain valid fields in a table
		function validFields(table_name, data) {
				var field = '', new_data = {};
				for(field in data) {
						var index = db.tables[table_name].fields.indexOf(field);
						if (index === -1) {
								error("Invalid query parameter: " + field);
						}
						new_data[field] = data[field];
				}
				return new_data;
		}

		// ______________________ public methods
		return {
				// commit the database to localStorage
				commit: function() {
						return commit();
				},
				// is this instance a newly created database?
				isNew: function() {
						return db_new;
				},
				// delete the database
				drop: function() {
						drop();
				},
				getItem: function(key) {
						return getItem(key);
				},
				replace: function(data) {
						replace(data);
				},
				// serialize the database
				serialize: function() {
						return serialize();
				},
				// check whether a table exists
				tableExists: function(table_name) {
						return tableExists(table_name);
				},
				// list of keys in a table
				tableFields: function(table_name) {
						return tableFields(table_name);
				},
				// number of tables in the database
				tableCount: function() {
						return tableCount();
				},
				columnExists: function(table_name, field_name){
						return columnExists(table_name, field_name);
				},
				// create a table
				createTable: function(table_name, fields) {
						var result = false;
						if(!validateName(table_name)) {
								error("The database name '" + table_name + "' contains invalid characters.");
						} else if(this.tableExists(table_name)) {
								error("The table name '" + table_name + "' already exists.");
						} else {
								// make sure field names are valid
								var is_valid = true;
								var i;
								for(i =0; i<fields.length; i++) {
										if(!validateName(fields[i])) {
												is_valid = false;
												break;
										}
								}
								if(is_valid) {
										// cannot use indexOf due to <IE9 incompatibility
										// de-duplicate the field list
										var fields_literal = {};
										for(i=0; i<fields.length; i++) {
												fields_literal[ fields[i] ] = true;
										}
										delete fields_literal['ID']; // ID is a reserved field name
										fields = ['ID'];
										for(var field in fields_literal) {
												if( fields_literal.hasOwnProperty(field) ) {
														fields.push(field);
												}
										}
										createTable(table_name, fields);
										result = true;
								} else {
										error("One or more field names in the table definition contains invalid characters");
								}
						}
						return result;
				},
				// Create a table using array of Objects @ [{k:v,k:v},{k:v,k:v},etc]
				createTableWithData: function(table_name, data) {
						if(typeof data !== 'object' || !data.length || data.length < 1) {
								error("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]");
						}
						var fields = Object.keys(data[0]);
						// create the table
						if( this.createTable(table_name, fields) ) {
								this.commit();
								// populate
								for (var i=0; i<data.length; i++) {
										if( !insert(table_name, data[i]) ) {
												error("Failed to insert record: [" + JSON.stringify(data[i]) + "]");
										}
								}
								this.commit();
						}
						return true;
				},
				// drop a table
				dropTable: function(table_name) {
						tableExistsWarn(table_name);
						dropTable(table_name);
				},
				// empty a table
				truncate: function(table_name) {
						tableExistsWarn(table_name);
						truncate(table_name);
				},
				// alter a table
				alterTable: function(table_name, new_fields, default_values) {
						var result = false;
						if(!validateName(table_name)) {
								error("The database name '" + table_name + "' contains invalid characters");
						} else {
								if(typeof new_fields === "object") {
										// make sure field names are valid
										var is_valid = true;
										var i;
										for (i = 0; i < new_fields.length; i++) {
												if(!validateName(new_fields[i])) {
														is_valid = false;
														break;
												}
										}
										if(is_valid) {
												// cannot use indexOf due to <IE9 incompatibility
												// de-duplicate the field list
												var fields_literal = {};
												for(i=0; i<new_fields.length; i++) {
														fields_literal[ new_fields[i] ] = true;
												}
												delete fields_literal['ID']; // ID is a reserved field name
												new_fields = [];
												for(var field in fields_literal) {
														if( fields_literal.hasOwnProperty(field) ) {
																new_fields.push(field);
														}
												}
												alterTable(table_name, new_fields, default_values);
												result = true;
										} else {
												error("One or more field names in the table definition contains invalid characters");
										}
								} else if(typeof new_fields === "string") {
										if(validateName(new_fields)) {
												var new_fields_array = [];
												new_fields_array.push(new_fields);
												alterTable(table_name, new_fields_array, default_values);
												result = true;
										} else {
												error("One or more field names in the table definition contains invalid characters");
										}
								}
						}
						return result;
				},
				// number of rows in a table
				rowCount: function(table_name) {
						tableExistsWarn(table_name);
						return rowCount(table_name);
				},
				// insert a row
				insert: function(table_name, data) {
						tableExistsWarn(table_name);
						return insert(table_name, validateData(table_name, data) );
				},
				// insert or update based on a given condition
				insertOrUpdate: function(table_name, query, data) {
						tableExistsWarn(table_name);
						var result_ids = [];
						if(!query) {
								result_ids = getIDs(table_name);				// there is no query. applies to all records
						} else if(typeof query === 'object') {				// the query has key-value pairs provided
								result_ids = queryByValues(table_name, validFields(table_name, query));
						} else if(typeof query === 'function') {				// the query has a conditional map function provided
								result_ids = queryByFunction(table_name, query);
						}
						// no existing records matched, so insert a new row
						if(result_ids.length === 0) {
								return insert(table_name, validateData(table_name, data) );
						} else {
								var ids = [];
								update(table_name, result_ids, function(o) {
										ids.push(o.ID);
										return data;
								});
								return ids;
						}
				},
				// update rows
				update: function(table_name, query, update_function) {
						tableExistsWarn(table_name);
						var result_ids = [];
						if(!query) {
								result_ids = getIDs(table_name);				// there is no query. applies to all records
						} else if(typeof query === 'object') {				// the query has key-value pairs provided
								result_ids = queryByValues(table_name, validFields(table_name, query));
						} else if(typeof query === 'function') {				// the query has a conditional map function provided
								result_ids = queryByFunction(table_name, query);
						}
						return update(table_name, result_ids, update_function);
				},
				// select rows
				query: function(table_name, query, limit, start, sort, distinct) {
						tableExistsWarn(table_name);
						var result_ids = [];
						if(!query) {
								result_ids = getIDs(table_name, limit, start); // no conditions given, return all records
						} else if(typeof query === 'object') {			// the query has key-value pairs provided
								result_ids = queryByValues(table_name, validFields(table_name, query), limit, start);
						} else if(typeof query === 'function') {		// the query has a conditional map function provided
								result_ids = queryByFunction(table_name, query, limit, start);
						}
						return select(table_name, result_ids, start, limit, sort, distinct);
				},
				// alias for query() that takes a dict of params instead of positional arrguments
				queryAll: function(table_name, params) {
						if(!params) {
								return this.query(table_name)
						} else {
								return this.query(table_name,
				params.hasOwnProperty('query') ? params.query : null,
				params.hasOwnProperty('limit') ? params.limit : null,
				params.hasOwnProperty('start') ? params.start : null,
				params.hasOwnProperty('sort') ? params.sort : null,
				params.hasOwnProperty('distinct') ? params.distinct : null
			);
						}
				},
				// delete rows
				deleteRows: function(table_name, query) {
						tableExistsWarn(table_name);
						var result_ids = [];
						if(!query) {
								result_ids = getIDs(table_name);
						} else if(typeof query === 'object') {
								result_ids = queryByValues(table_name, validFields(table_name, query));
						} else if(typeof query === 'function') {
								result_ids = queryByFunction(table_name, query);
						}
						return deleteRows(table_name, result_ids);
				}
		}
}

/*
function rowDelete(elem) {
		elem.parentNode.parentNode.remove();
		var textContainer =	elem.parentNode.parentNode.firstChild;
		var textValue = $(textContainer).text();
		db.deleteRows("mytable", {code: String(textValue)});
		db.commit();
}
$(document).ready(function(){

		var databaseName = "mydatabase";
		var tableName = "mytable";
		
		db = new localStorageDB(databaseName, localStorage);

		$("#tblContent > tbody").html("");

		if (db.tableExists(tableName))
		{
				var result = db.queryAll("mytable");
				$.each(result, function( index, value ) {
						var vCode = value.code;
						var vTitle = value.title;
						var vAuthor = value.author;
						var vYear = value.year;
						var vCopies = value.copies;
		
						var rowContent = '<tr><td>' +
								vCode + '</td><td>' +
								vTitle + '</td><td>' +
								vAuthor + '</td><td>' +
								vYear + '</td><td>' +
								vCopies + '</td><td><a href="#" onclick="rowDelete(this); return false;">Delete</a></tr>';
		
						$("#tblContent tbody").append(rowContent);
				});
		}

		$('#btnInsert').click(function(){

				$(':input').val('');
				
				if (! db.tableExists(tableName) )
				{
						db.createTable(tableName, ["code", "title", "author", "year", "copies"]);
				}

				var vCode	 = $('#code').val();
				var vTitle	= $('#title').val();
				var vAuthor = $('#author').val();
				var vYear	 = $('#year').val();
				var vCopies = $('#copies').val();

				db.insert(tableName, { code: String(vCode),
																title: String(vTitle),
																author: String(vAuthor),
																year: String(vYear),
																copies: String(vCopies) });

				db.commit();

				var newRowContent = '<tr><td>' +
						vCode + '</td><td>' +
						vTitle + '</td><td>' +
						vAuthor + '</td><td>' +
						vYear + '</td><td>' +
						vCopies + '</td><td><a href="#" onclick="rowDelete(this); return false;">Delete</a></td></tr>';

				$("#tblContent tbody").append(newRowContent);

		});

});

*/