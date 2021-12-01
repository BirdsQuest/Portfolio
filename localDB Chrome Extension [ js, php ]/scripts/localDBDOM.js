const title="Local DB",pageName="rc",version=.01,baseURL="https://randomcode.run/",rcVersion=1.05,lang="en",TIMESTAMP=(()=>Date.now()/1e3|0)(),classes={},t=!0,f=!1,n=null,KEY={SHIFT:16,BACKSPACE:8,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40},KEYS={chromeExtensionID:"gjhlocconbbejhcbajenldfaidlcakce"},image={};var content,VERSION,run={},aniFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||(e=>{setTimeout(e,1e3/60)});if(Date.now||(Date.now=(()=>(new Date).getTime())),isDefined(get))get=window.location.href.split("/").splice(4);else var get=[];class Obj{constructor(){var e=ArgToArr(arguments);e[0]instanceof ExtendedObj&&(e[0].expand(this),e.shift());for(let t=0;t<e.length;t++)this[e[t++]]=e[t]}static null(){var e=new Obj,t=arguments;for(let n=0;n<t.length;n++)e[t[n]]=null;return e}static extendable(e,t){return new ExtendedObj(ArgToArr(t).slice(e))}shareVars(){return ArgToArr(arguments).map(e=>isFunc(this[e])?t=>{t[e]=this[e].bind(this)}:t=>{Object.defineProperty(t,e,{get:(()=>this[e]).bind(this),set:(t=>{this[e]=t}).bind(this)})})}set sharedVars(e){e.map(e=>e(this))}setProperty(e,t,n){let r={};null!=t&&(r.get=t),null!=n&&(r.set=n),Object.defineProperty(this,e,r)}}class ExtendedObj extends Obj{constructor(e){super("args",e)}expand(e){for(let t=0;t<this.args.length;t++)e[this.args[t++]]=this.args[t]}}class DOMObj{constructor(e){var t=ArgToArr(arguments);t[0]instanceof ExtendedObj&&(t[0].expand(this),t.shift());for(let e=0;e<t.length;e++)this[t[e++]]=t[e];this.DOM=CE("div"),isDefined(this.preGen)&&this.preGen(),this.boundEvents={};let n=[["keyUp","keyup"],["keyDown","keydown"],["onClick","click"],["mouseUp","mouseup"],["hover","mousemove"],["mouseDown","mousedown"],["mouseOut","mouseout"],["mouseIn","mouseenter"],["contextMenu","contextmenu"],["onBlur","focusout"],["onFocus","onfocus"],["onChange","change"],["drag","drag"],["dragStart","dragstart"],["dragEnd","dragend"],["dragOn","dragenter"],["dragOff","dragleave"],["dragOver","dragover"],["drop","drop"]];this.generate();for(let e=0;e<n.length;e++)null!=this[n[e][0]]&&this.addListener(n[e][1],this[n[e][0]]);isDefined(this.postGen)&&this.postGen()}addListener(e,t,n=this.DOM){this.boundEvents.hasOwnProperty(e)&&this.removeListener(e,n),this.boundEvents[e]=t.bind(this),n.addEventListener(e,this.boundEvents[e],!1)}shareVars(){return ArgToArr(arguments).map(e=>isFunc(this[e])?t=>{t[e]=this[e].bind(this)}:t=>{Object.defineProperty(t,e,{get:(()=>this[e]).bind(this),set:(t=>{this[e]=t}).bind(this)})})}set sharedVars(e){e.map(e=>e(this))}removeListener(e,t=this.DOM){try{t.removeEventListener(e,this.boundEvents[e]),delete this.boundEvents[e]}catch(e){}}preventDefault(e){e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation()}generate(e){return null}insertChild(e,t){for(var n=this;n instanceof DOMObj;)n=n.DOM;for(;null!=e.DOM;)e=e.DOM;t>=e.children.length?AE(n,e):e.insertBefore(n,e.children[t].nextSibling)}insertAfter(e){for(var t=this;t instanceof DOMObj;)t=t.DOM;for(;!isDOM(e);)e=e.DOM;e.parentNode.insertBefore(t,e.nextSibling)}appendChild(e){for(;null!=e.DOM;)e=e.DOM;this.DOM.appendChild(e)}removeChild(e){this.DOM.removeChild(e)}remove(){if(null!=this.parentNode){for(var e=this.DOM;null!=e&&e instanceof DOMObj;)e=e.DOM;this.parentNode.removeChild(e)}}toggleCSS(e,t=this.DOM){t.classList.contains(e)?t.classList.remove(e):t.classList.add(e)}overlaps(e){return!(this.bottom<e.top||this.top>e.bottom||this.right<e.left||this.left>e.right)}setProperty(e,t,n){let r={};null!=t&&(r.get=t),null!=n&&(r.set=n),Object.defineProperty(this,e,r)}get height(){return this.DOM.offsetHeight}get width(){return this.DOM.offsetWidth}set width(e){null!=e&&(this.DOM.style.width=e+"px")}set height(e){null!=e&&(this.DOM.style.height=e+"px")}get top(){return this.DOM.offsetTop}get classList(){return this.DOM.classList}get left(){return this.DOM.offsetLeft}get right(){return this.left+this.width}get bottom(){return this.top+this.height}get innerHTML(){return this.DOM.innerHtml}set hidden(e){e&&!this.DOM.classList.contains("hidden")?this.DOM.classList.add("hidden"):!e&&this.DOM.classList.contains("hidden")&&this.DOM.classList.remove("hidden")}get innerText(){return this.DOM.innerText}set innerText(e){this.DOM.innerText=e}get className(){return this.DOM.className}set className(e){this.DOM.className=e}get childNodes(){return this.DOM.childNodes}get children(){return this.DOM.children}clearChildren(){this.DOM.innerHTML=""}get parentNode(){for(var e=this.DOM;null!=e.DOM;)e=e.DOM;return e.parentNode}replaceDOM(e){for(;null!=e.DOM;)e=e.DOM;var t=Array.from(this.parentNode.children).indexOf(this.DOM);this.parentNode.replaceChild(e,this.parentNode.childNodes[t]),this.DOM=e}}class Cookie{static set(e,t,n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3);var o="expires="+r.toUTCString();document.cookie=e+"="+t+"; "+o}static get(e){var t=e+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){for(var r=n[e];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}static clear(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}static check(e,t){var n=getCookie(e);return""==n&&(n=t,setCookie(e,n,365)),e}}class Device{constructor(){this.browser=this.checkBrowser(),this.os=this.checkOS(),this.renderer="Canvas",this.bigEndian=this.getEndian()}checkBrowser(){var e=window.chrome,t=window.navigator,n=t.vendor,r=t.userAgent.indexOf("OPR")>-1,o=t.userAgent.indexOf("Edge")>-1,i=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;return null!=e&&"Google Inc."===n&&0==r&&0==o?"Chrome":i?(log.arg=console.log,log.args=console.log,log.func=console.log,log.debug=console.log,log.error=console.log,log.info=console.log,"Firefox"):r?"Opera":o?"IE Edge":"Unknown"}checkOS(){return-1!=navigator.appVersion.indexOf("Win")?"Windows":-1!=navigator.appVersion.indexOf("Mac")?"MacOS":-1!=navigator.appVersion.indexOf("X11")?"UNIX":-1!=navigator.appVersion.indexOf("Linux")?"Linux":"Unknown"}checkAudio(){try{window.AudioContext=window.AudioContext||window.webkitAudioContext;new AudioContext;return"WebAudio"}catch(e){return"HTML Audio"}}getEndian(){var e=new ArrayBuffer(4);return new Uint32Array(e)[0]=168496141,10===e[4]&&11===e[5]&&12===e[6]&&13===e[7]}print(){console.log("OS:",this.os,", Browser:",this.browser,", Renderer:",this.renderer,", Audio:",this.audio,", Endian: "+(this.bigEndian?"big":"little"))}}class log{static construct(e,t){if(log.SHOW.construct){t=["%cConstruct "+e.constructor.name,"color: #ffffff; background: #003300;",t];log.apply(t)}}static args(e,t,n){if(log.SHOW.args){var r=[];null!=n?(r.push("%c"+e),r.push("color: #ffffff; background: #0000ff;")):(n=t,t=e);for(let e=0;e<n.length;e++)r.push("%c"+t[e]),r.push("color: #ffffff; background: #00e600;"),r.push(n[e]);log.apply(r)}}static arg(e,t,n=!1){if(log.SHOW.arg){var r=["%c"+e,"color: #ffffff; background: #00e600;",t];log.apply(r,!0)}}static statFunc(e,t,n){if(log.SHOW.statFunc){var r=["%cstatFunc "+e+"."+t,"color: #ffffff; background: #009900;"];for(let e=0;e<n.length;e++)r.push(n[e]);log.apply(r)}}static func(e,t,n){if(log.SHOW.func){var r=["%cfunc "+e.constructor.name+"."+t,"color: #ffffff; background: #009900;"];for(let e=0;e<n.length;e++)r.push(n[e]);log.apply(r)}}static apply(e,t=!1){t&&(e[0]+="%c\t%c"+log.caller(2)+"\n",e.splice(2,0,"background: #FFFFFF;","color: #FFFFFF; background: #000000;")),"Chrome"==device.browser?console.log.apply(console,e):window.console&&(e=e[0]).replace("%c","")}static trace(){try{throw Error("")}catch(e){return e.stack.split("\n").slice(2)}}static caller(e){var t=log.trace()[e+1];return t=(t=t.slice(t.indexOf("at ")+3,t.lastIndexOf(":"))).split(baseURL+"scripts/").join("").split("(").join("=> ")}static debug(){if(log.SHOW.debug){var e=["%cDEBUG:","color: #4d004d; background: #e600e6;",...arguments];log.apply(e,!0)}}static error(){if(log.SHOW.error){var e=["%cERROR:\n"+log.trace().join("\n")+"\n","color: #990000; background: #ff0000;",...arguments];log.apply(e,!0)}}static info(){if(log.SHOW.info){var e=["%cINFO:","color: #b34700; background: #ff751a;",...arguments];log.apply(e,!0)}}static header(){if(log.SHOW.header){var e=[log.HEADER];for(let t=0;t<4;t++)e.push("background: #00e600"),e.push("background: #009900"),e.push("background: #006600"),e.push("color: #ffffff; background: #003300;"),e.push("background: #006600"),e.push("background: #009900"),e.push("background: #00e600");log.apply(e)}}static response(e,t,n,r){if(log.SHOW.debug){n=["%cResponse:%c %c"+t+"%c\t%c"+e+"\n","color: #cc0066; background: #9966ff;","background: #FFFFFF;","color: #9900ff; background: #ffcccc;","background: #FFFFFF;","color: #FFFFFF; background: #000000;",n,"\n",r];log.apply(n)}}}class CR extends DOMObj{constructor(e){super("coords",e)}generate(){this.DOM=CE("svg"),this.line=ACE(this.DOM,"line"),this.start=this.start,this.end=this.end}get width(){return this.end.x-this.start.x}get height(){return this.end.y-this.start.y}set start(e){setCoord("A",e)}set end(e){this.setCoord("B",e)}get start(){return{x:this.coords.aX,y:this.coords.aY}}get end(){return{x:this.coords.bX,y:this.coords.bY}}setCoord(e,t){hasKey(t,"x")&&(this.line["x"+("A"==e?1:2)]=t.x,this.coords[e+"X"]=t.x),hasKey(t,"y")&&(this.line["y"+("A"==e?1:2)]=t.y,this.coords[e+"Y"]=t.y),this.DOM.height=this.height,this.DOM.width=this.width}}class B64Img extends DOMObj{constructor(){super()}generate(){this.input=ACE(this.DOM,"ipt",n,n,n,"file"),this.input.onchange=this.fromInput.bind(this),this.input.multiple=!0,this.url=ACE(this.DOM,"textArea"),ACE(this.DOM,"btn","Convert URL",n,n,this.fromURL.bind(this)),this.results=ACE(ACE(this.DOM,"table"),"tr"),this.code=ACE(this.DOM,"div")}fromInput(){for(let e=0;e<this.input.files.length;e++)this.toB64(this.input.files[e])}static has(e){return hasKey(image,e)}fromURL(){this.url.value.split("\n").map(((e,t)=>{var n=new XMLHttpRequest;n.onload=(()=>{this.toB64(n.response,t+this.total)}),n.open("GET",url),n.responseType="blob",n.send()}).bind(this))}fromClipboard(e){}toB64(e,t=0){this.addCell();let n=e.name,r=new FileReader;r.onloadend=(()=>{B64Img.add(n,r.result),this.setCell(n,r.result,t+this.total),this.code.innerText+=(this.code.innerText.length>0?",\n":"")+this.toCodeText(n,r.result)}).bind(this),r.readAsDataURL(e)}addCell(){ACE(this.results,"td")}setCell(e,t,n){let r=this.results.children[n];ACE(r,"h3",e),AE(B64Img.get(e),r)}static toCode(e){return[(e=e.split(";"))[0].split(":")[1],e[1].substring("base64,".length)]}toCodeText(e,t){return e+':["'+(t=B64Img.toCode(t))[0]+'","'+t[1]+'"]'}static add(e,t){if(e instanceof Object)for(let t in e)image[t]=e[t];else image[e]=B64Img.toCode(t),console.log(image)}static get(e){return image[e]}static toImage(e,t){let n=new Image,r=(-1!=image[e][0].indexOf("/")?"":"image/")+image[e][0],o="image/href"==r?image[e][1]:"data:"+r+";base64,"+image[e][1];return n.onload=t,n.src=o,n}static loaded(e){return e.path[0]}get total(){return this.code.children.length}static convert(){AE(CE("div",[new B64Img,CE("div","X",n,n,e=>{(e=getE(e).parentNode).parentNode.removeChild(e)})],n,n,n,{style:"position:absolute;top=0;right=0;"}),document.body)}static preload(){let e=new SimpleLoader,t=t=>e.removeItem();for(let e in image)isArray(image[e])&&(image[e]=B64Img.toImage(e,t))}static copy(e){return B64Img.get(e).cloneNode(!0)}}function onLoad(e){"complete"===document.readyState?e():window.onload=((e,t)=>(function(){e&&e(),t()}))(window.onload,e)}onLoad(()=>{B64Img.preload(),document.title=title,B64Img.has("background")&&(document.body.style.backgroundImage="url('"+B64Img.get("background").src+"')"),B64Img.has("favicon")&&CE("favico",B64Img.get("favicon").src)}),log.time=(()=>{var e=new Time;log.arg("TIME",e.toString("hms"))}),log.out=console&&"function"==typeof console.log?console.log.bind?console.log.bind(console):$.proxy(console.log,console):function(){(window.__im_log=window.__im_log||[]).push(Array.prototype.join.call(arguments," "))},log.SHOW={construct:!0,args:!0,arg:!0,statFunc:!0,func:!0,debug:!0,error:!0,info:!0,header:!0},log.CODE={e:log.error,i:log.info,d:log.debug},log.HEADER=["%c  %c  %c   %c ▐█▀▄ ▄▀▀▄ █▄  █▐█▀█ ▄▀▀▄ █▄ ▄█ ▄▀▀▄ ▄▀▀▄▐█▀█ █▀▀ %c   %c  %c  \n%c  %c  %c   %c ▐█▄▀ █▄▄█ █ █ █▐█ ▐▌█  █ █ █ █ █    █  █▐█ ▐▌█▀  %c   %c  %c  \n%c  %c  %c   %c ▐█ █ █  █ █  ▀█▐█▄█ ▀▄▄▀ █   █ ▀▄▄▀ ▀▄▄▀▐█▄█ █▄▄ %c   %c  %c  \n%c  %c  %c   %c https://randomcode.run | mattbird@randomcode.run %c   %c  %c  "].join("\n"),log.section=(e=>{console.log("=======================================",e,"===================")});var random=(()=>{var e=window;pool=[],math=Math,width=256,chunks=6,digits=52,module="object"==typeof module&&module,define="function"==typeof define&&define,rngname="random";var t,n=math.pow(width,chunks),r=math.pow(2,digits),o=2*r,i=width-1,s=math["seed"+rngname]=function(s,c,d){var u=[],h=a(function e(t,n){var r,o=[],i=typeof t;if(n&&"object"==i)for(r in t)try{o.push(e(t[r],n-1))}catch(e){}return o.length?o:"string"==i?t:t+"\0"}((c=1==c?{entropy:!0}:c||{}).entropy?[s,l(pool)]:null==s?function(n){try{return t?l(t.randomBytes(width)):(e.crypto.getRandomValues(n=new Uint8Array(width)),l(n))}catch(t){return[+new Date,e,(n=e.navigator)&&n.plugins,e.screen,l(pool)]}}():s,3),u),g=new function(e){var t,n=e.length,r=this,o=0,s=r.i=r.j=0,a=r.S=[];n||(e=[n++]);for(;o<width;)a[o]=o++;for(o=0;o<width;o++)a[o]=a[s=i&s+e[o%n]+(t=a[o])],a[s]=t;(r.g=function(e){for(var t,n=0,o=r.i,s=r.j,a=r.S;e--;)t=a[o=i&o+1],n=n*width+a[i&(a[o]=a[s=i&s+t])+(a[s]=t)];return r.i=o,r.j=s,n})(width)}(u);return a(l(g.S),pool),(c.pass||d||function(e,t,n){return n?(math[rngname]=e,t):e})(function(){for(var e=g.g(chunks),t=n,i=0;e<r;)e=(e+i)*width,t*=width,i=g.g(1);for(;e>=o;)e/=2,t/=2,i>>>=1;return(e+i)/t},h,"global"in c?c.global:this==math)};function a(e,t){for(var n,r=e+"",o=0;o<r.length;)t[i&o]=i&(n^=19*t[i&o])+r.charCodeAt(o++);return l(t)}function l(e){return String.fromCharCode.apply(0,e)}if(a(math[rngname](),pool),module&&module.exports){module.exports=s;try{t=require("crypto")}catch(e){}}else define&&define.amd&&define(function(){return s});Math.totalDice=((e=1,t=6)=>{let n=0;for(let r=0;r<e;r++)n+=Math.random(1,t);return n}),Math.generateSeed=(()=>{let e=encodeID(Math.random()*(1e3*Math.random())*1e3);return Math.seedrandom(e),e})})();function isInt(e){var t;return!isNaN(e)&&(0|(t=parseFloat(e)))===t}function isNum(e){return!isNaN(e)}function isString(e){return"string"==typeof e}function isArray(e){return e instanceof Array}function isDefined(e){return void 0!==e}function isObj(e,t){return e.constructor.name==t}function isObject(e){return"object"==typeof e&&e!==n}function isDOM(e,t){return null==t?null!=e.tagName:e.tagName=t}function isBool(e){}function isDOMObj(e,t){return isDefined(e.DOM)&&(isDOM(e.DOM)||isDOMObj(e.DOM))&&(null==t||e.constructor.name==t)}function isFunc(e){return"function"==typeof e}function hasKey(e,t){return e.hasOwnProperty(t)}function setCSSVar(e,t,n){return"root"==e?e=document.documentElement.style:getComputedStyle(e).style,e.setProperty("--"+t,n),n}function getCSSVar(e,t){return"root"==e?document.documentElement.style.getPropertyValue("--"+t):getComputedStyle(e).style.getProperty("--"+t)}function getByClass(e){return document.getElementsByClassName(e)}function getByID(e){return document.getElementById(e)}function getE(e){return e.target||e.srcElement}function forIn(e,t){for(let n in e)t(n,e[n])}function addClass(e){ArgToArr(arguments).map(e=>{classes[e.name]=e})}function setCaret(e,t){e.setSelectionRange(e,t)}function getCaret(e){return e.selectionStart}function clearInnerHTML(e){for(;e.hasChildNodes();)e.removeChild(e.firstChild)}function strip(e){var t=document.createElement("DIV");return t.innerHTML=e,t.textContent||t.innerText||""}function hide(e){return DOMElem(e).style.visibility="hidden",e}function show(e){return DOMElem(e).style.visibility="initial",e}function isHidden(e){return"hidden"==DOMElem(e).style.visibility}function isDisabled(e){return 1==DOMElem(e).disabled}function disable(e){return DOMElem(e).disabled=!0,e}function enable(e){return DOMElem(e).disabled=!1,e}function hardHide(e){return DOMElem(e).style.display="none",e}function hardShow(e){return DOMElem(e).style.display="block",e}function isHardHidden(e){return"none"==DOMElem(e).style.display}function DOMElem(e){for(;isDOMObj(e);)e=e.DOM;return e}function AEF(e,t=content){var n=e;if(t instanceof DOMObj)t.appendChild(e.DOM);else if(isDefined(e.DOM))for(;null!=e.DOM;)e=e.DOM;return t.insertBefore(e,t.firstChild),"appended"in n&&n.appended(),n}function AE(e,t=content){var n=e;if(t instanceof DOMObj)t.appendChild(e.DOM);else if(isDefined(e.DOM))for(;null!=e.DOM;)e=e.DOM;return t.appendChild(e),"appended"in n&&n.appended(),n}function ACE(e=content){var t=ArgToArr(arguments);t.shift();var n=CE(...t);return AE(n,e),n}function CE(){var e,t,n=ArgToArr(arguments);if(t=cElement.hasOwnProperty(n[0])?cElement[n[0]]:[n[0],"generic"],e=document.createElement(t[0]),-1!=["svg","polygon"].indexOf(t[0])&&(e=document.createElementNS("http://www.w3.org/2000/svg",t[0])),"generic"==t[1])t=cElement.generic;else{if("func"==t[1])return cElement[n[0]][2](...n);if("domobj"==t[0])return new t[1](...n.shift())}for(let r=1;r<t.length;r++)if("set"==t[r])e[t[++r]]=t[++r];else if(null==n[r]);else if("content"==t[r]){if(null!=n[r])if(n[r]instanceof Array)for(let t=0;t<n[r].length;t++)"string"==typeof n[r][t]&&(n[r][t]=document.createTextNode(n[r][t])),AE(n[r][t],e);else e.innerText=n[r]}else"keySet"==t[r]?forIn(n[r],(t,n)=>{e.setAttribute(t,n)}):"rt"==t[r]?e.appendChild(CE("rt",n[r])):"points"==t[r]?e.setAttribute(t[r],n[r]):-1!=["onclick"].indexOf(t[r])?e.addEventListener("click",n[r]):-1!=["innerText"].indexOf(t[r])?e[t[r]]=n[r]:null!=n[r]&&e.setAttribute(t[r],n[r]);return e}function addCE(){let e=ArgsToArr(arguments);cElement[e.pop()]=e}random=((e=1,t=0)=>Math.floor(Math.random()*(e-t)+t));const cElement={a:["a","href","content","id","class","onclick"],ado:["audio","id","controls","src","onload","set","autoplay","false"],artcl:["article","generic"],br:["br"],btn:["input","value","id","class","onclick","set","type","button"],cnt:["content","generic"],cvs:["canvas","id","class","onclick","left","top","width","height"],date:["datepicker","set","type","grid"],div:["div","generic"],dls:["datalist","generic"],frm:["form","content","id","action"],hr:["hr"],iframe:["iframe","src","id","class","width","height"],preload:["link","href","as","set","preload"],img:["img","id","src","alt","class","onclick","keySet"],ipt:["input","value","name","class","type","keySet"],lbl:["label","innerText","htmlFor"],li:["li","generic"],line:["line","x1","x2","y1","y2","id","class","onclick","set","style","stroke:rgb(255,0,0);stroke-width:2"],ol:["ol","generic"],opt:["option","innerText","name","value","keySet"],p:["p","generic"],pbr:["div","set","class","pageBreak"],pdf:["embed","src","id","class","set","alt","pdf","set","pluginspage","http://www.adobe.com/products/acrobat/readstep2.html"],pre:["pre","generic"],pgn:["polygon","points","class"],rdo:["input","content","name","id","class","onclick","set","type","radio"],rt:["rt","content"],ruby:["ruby","content","rt","id","class","onclick"],stn:["section","generic"],slt:["select","name","content","value","keySet"],spn:["span","generic"],table:["table","generic"],tbx:["input","value","id","class","placeholder","onClick","keySet","set","type","textbox"],txtArea:["textarea","content","name","class","placeholder","cols","rows","wrap"],td:["td","generic"],tr:["tr","generic"],txtarea:["textarea","innerText","name","class","onclick","cols","rows"],ul:["ul","generic"],vid:["vid","src","id","class","onload","type","width","height"],dropdown:["select","func",(e,t,r,o,i,s,a={},l={})=>{let c=CE("slt",t,r.map(e=>CE("opt",e[1],t,e[0])),n,a);return c.selectedIndex=i,o!=n&&c.addEventListener("change",e=>{let t=(e=getE(e)).selectedIndex;e=e.options[t],o(e.value,e.text,t)}),c}],favico:["favicon","func",(e,t,n=document.getElementsByTagName("script")[0])=>{let r=CE("link");return r.setAttribute("rel","shortcut icon"),r.setAttribute("type","image/x-icon"),r.setAttribute("title","favIcon"),r.setAttribute("href",t),n.parentNode.insertBefore(r,n),r}],popup:["popup","func",(e,t,n,r=1250,o=200,i=250,s=400)=>{var a=linkTo(n,t,"screenX="+r,"screenY="+o,"width="+i,"height="+s);a.resizeTo(i,s),a.moveTo(r,o)}],ico:["icon","func",(e,t)=>CE("spn",null,null,"ico-"+t)],plx:["img","func",(e,t,n=500,r,o,i,s)=>{let a=CE("div",r,o,i,s);return a.classList.add("parallax"),a.style="background-image: url("+t+");--height:"+n+"px;",a}],fld:["field","func",(e,t,n,r,o,i=!1,...s)=>{let a=i?CE(o,...s):CE("ipt","",n,null,null!=o?o:"text");return CE("lgnd",t,[a],r,e=>{a.focus()})}],css:["css","func",(e,t,n=document.getElementsByTagName("script")[0])=>{var r=document.createElement("style");return null!=t&&(r.innerText=t.replace(/[\t\n\r]/gm,"")),n.parentNode.insertBefore(r,n),r}],image:["image","func",(e,t,n,r,o)=>{var i=new Image;return i.src=t,null!=o&&(i.onload=o),null!=n&&(i.height=n),null!=r&&(i.width=r),i}],lgnd:["legend","func",(e,t,n,r,o)=>CE("fieldset",[CE("legend",t),...n],null,r,o)],style:["style","func",(e,t,n)=>{var r=document.createElement("link");null!=n&&(r.onload=n),r.type="text/css",r.rel="stylesheet",r.href=t,document.getElementsByTagName("head")[0].appendChild(r)}],script:["script","func",(e,t,n,r,o=!1,i)=>{var s=document.createElement("script");if(null!=r&&(s.onload=r),null!=n&&(s.innerText=n),null!=t&&(s.src=t),s.language="javascript",s.type="text/javascript",null!=i){i=i.split(",");for(let e=0;e<i.length;e++)s[i[e]]=!0}if(o){var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(s,a)}else document.head.appendChild(s)}],txt:[null,"func",(e,t)=>document.createTextNode(t)],meta:["meta","func",(e,t,n,r)=>{var o=document.createElement("meta");null!=r&&(o.onload=r),o.name=t,o.content=n,document.getElementsByTagName("head")[0].appendChild(tag)}],jp:["japaneseText","func",(e,t,n=!1)=>{let r=isArray(t)?t.map(e=>isString(e)?"\n"===e?br():CE("spn",e):isArray(e)?CE("ruby",...e):e):t;return(r=CE("div",r,null,n?"vertical":null)).lang="jp",r}],generic:["","content","id","class","onclick","keySet"]};function br(e=content){return ACE(e,"br")}function CEHelp(e){null==e?forIn(cElement,(e,t)=>{console.log(e,t.join(","))}):console.log(cElement[e])}function firstCharToUpper(e){return e.replace(/^\w/,e=>e.toUpperCase())}function firstCharToLower(e){return e.replace(/^\w/,e=>e.toLowerCase())}function spacesBeforeCaps(e){return e.replace(/([A-Z])/g," $1").trim()}function strFormat(e){var t=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,(e,n)=>t[n])}function copyTextToClipboard(e){var t=document.createElement("textarea");return t.value=e,t.setAttribute("readonly",""),t.style={position:"absolute",left:"-9999px"},document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),e}function encodeID(e){if(null==e||"number"!=typeof e)throw new Error("ID needs to be a number");e=parseInt(e+1e11);var t="",n=dict.length;for(let r=Math.floor(Math.log(e)/Math.log(n));r>=0;r--)t+=dict.substr(Math.floor(e/Math.pow(n,r))%n,1);return t.split("").reverse().join("")}function decodeID(e){if(null==e||"string"!=typeof e)throw new Error("Encoded ID needs to be a string.");e=e.split("").reverse().join("");var t=0;for(let n=0;n<=e.length-1;n++)t+=dict.indexOf(e.substr(n,1))*Math.pow(dict.length,e.length-1-n);return t-1e11}function ArgToArr(e){return Array.prototype.slice.call(e)}function arraySplit(e,t){return[e.slice(0,t),e.slice(t)]}function cloneArr(e){return e.slice(0)}function removeDuplicates(e){return Array.from(new Set(e))}function arrayDiff(e){let t=[];for(let n in this)e.indexOf(this[n])>-1&&t.push(this[n]);return t}function flatten(e){return e.reduce((e,t)=>e.concat(Array.isArray(t)?flatten(t):t),[])}function deleteArrElem(e,t){e.splice(t,1)}function split(e,t=0){var n;if((!isDefined(e)||""!=e)&&isDefined(e)){e=e.split(SPLIT.SET[t++]);for(let r=0;r<e.length;r++)n=t,-1==e[r].indexOf(SPLIT.SET[n])&&(n=checkForSplit(e[r],n)),n<SPLIT.SET.length&&(e[r]=split(e[r],n));return e}}function checkForSplit(e,t){for(;t<SPLIT.SET.length&&-1==e.indexOf(SPLIT.SET[t]);t++);return t}function collapse(e,t=SPLIT.OBJECT){return e.join(SPLIT.SET[t])}function splitHelp(e){null==e?forIn(SPLIT,(e,t)=>{log.arg("SPLIT.SET[SPLIT["+e+"]]",t)}):console.log(SPLIT[e])}String.toCamelCaps=(e=>e.replace(/^\w/,e=>e.toLowerCase()).replace(/\s/g,"")),String.toNormal=(e=>e.replace(/^\w/,e=>e.toUpperCase()).replace(/([A-Z])/g," $1").trim()),String.prototype.replaceChar=function(e,t){return this.substr(0,t)+e+this.substr(t+e.length)},Array.generate=((e,t)=>[...Array(e).keys()].map(t)),Array.remove=function(e,t,n){var r=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,r)},Array.shuffle=(e=>{for(var t,n,r=e.length;0!==r;)n=Math.floor(Math.random()*r),t=e[r-=1],e[r]=e[n],e[n]=t;return e});var SPLIT={SET:["~&","~`","~!","~@","~$","~%","~^"],META:0,OBJECT:1,FIELD:2,ARRAY:3,SUBARRAY:4,SUB2ARRAY:5,SUB3ARRAY:6},dict={};function linkTo(e,t){if(null!=t)return"tab"==t&&(t="_blank"),window.open(...arguments);window.location=e}function ajax(e,t,n,r="application/x-www-form-urlencoded"){var o,i,s=log.caller(1);try{o=new XMLHttpRequest}catch(e){try{o=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{o=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){return alert("Your browser broke!"),!1}}}if(o.onreadystatechange=(()=>{var r=o.responseText+"";4==o.readyState&&log.response(s,e,t,r||"No response",null);var i=7==o.responseText.charCodeAt(0);if(i&&(r=r.substring(1)),r=split(r),i){if("array"!=typeof(i="array"==typeof r[0][0]?r[0]:[r[0]])[0][0][0])log.CODE[i[0][0][0]](i[0][1]);else for(let e=0;e<i[0].length;e++)log.arg("messages[0][index][0]",i[0][e][0]),log.CODE[i[0][e][0]](i[0][e][1]);r.shift()}null!=n&&4==o.readyState&&n(r[0])}),o.open("POST",baseURL+"core/db/"+e+".php",!0),o.setRequestHeader("charset","utf-8"),"application/x-www-form-urlencoded"==r){o.setRequestHeader("Content-type",r),i="";for(let e=0;e<t.length-1;e++)i+=t[e++]+"="+encodeURIComponent(t[e])+"&";i=i.slice(0,-1)}else{i=new FormData;for(let e=0;e<t.length-1;e++){var a=t[e++],l=t[e];i.append(a,l)}}o.send(i)}class SimpleLoader extends Obj{constructor(e,t){super("finishedLoading",e,"items",t||0)}addItem(){this.items++}addItems(e=0){this.items+=e}removeItem(){this.items--,this.checkLoader()}checkLoader(){0!=this.items?this.load():null!=this.finishedLoading&&this.finishedLoading()}load(){0==this.items&&this.finishedLoading()}}onLoad(()=>{device=new Device,content=(content=document.getElementsByTagName("main")).length>0?content[0]:ACE(document.body,"cnt"),log.header()});
const pageListener={};chrome.runtime.onMessage.addListener((e,r,s)=>{console.log(e);hasKey(pageListener,e.rc)?pageListener[e.rc](e,r,s):console.log("There is no ",e.rc)});
class Extension{static sendToBG(c,m,r=n,e={}){e.rc=c;e.content=m;chrome.runtime.sendMessage(e,r)}}
//chrome.runtime.getBackgroundPage(bg=>console=bg.console);

class LocalDB extends DOMObj{
	constructor(db){super("db",db);}
	generate(){
		this.dbNameDOM=ACE(this.DOM,"div",this.db);
		this.content=ACE(this.DOM,"div");
		this.tables=CE("optgroup");
		this.tables.label="Tables";
		this.tablesList=ACE(this.content,"fld","Table List","tableList","tableList","slt",t,n,[CE("opt","Select A Table"),this.tables]);//name,id,className,iptType,notInput=false
		ACE(this.content,"div","Add Table",n,n,e=>this.addTable());
		ACE(this.content,"div","Delete Table",n,n,e=>this.deleteTable());
		this.tablesList.children[1].children[0].disabled=true;
		this.tablesList.children[1].addEventListener("change",e=>{this.tableDOM.fetchTableData(getE(e).options[getE(e).selectedIndex].value)});
		this.tableDOM=new TableDOM();
		AE(this.tableDOM,this.content);
		pageListener.setDB=e=>this.set(e.content);
		Extension.sendToBG("fetchDB",this.db);
	}
	set(tables){
		this.dbNameDOM.innerText=this.db;
		this.tables.innerText="";
		for(let key in tables){
			if(!key.endsWith("Tags")){
				ACE(this.tables,"opt",key,key)
			}
		}
		console.log("tables",tables);
	}
	clearTableList(){
		
	}
	addTable(){
		hardHide(this.content);
		AE(new TableStructure(this.shareVars("content","tables")),this.DOM);
	}
	deleteTable(){
		let dropdown=this.tablesList.children[1];
		if(dropdown.selectedIndex>0){
			let tableName=dropdown.options[dropdown.selectedIndex].value;
			if(confirm(`Are you sure you want to delete the table ${tableName}?`)){
				Extension.sendToBG("deleteTable",tableName);
				dropdown.options[dropdown.selectedIndex].remove();
				dropdown.selectedIndex=0;
				this.tableDOM.clear();
			}
		}
	}
}


class TableStructure extends DOMObj{
	constructor(vars){super("sharedVars",vars);}
	generate(){
		this.tableName=ACE(this.DOM,"tbx",n,n,n,"Table Name");
		this.fields=ACE(this.DOM,"div");
		this.addField();
		ACE(this.DOM,"btn","Add Field",n,n,e=>this.addField());
		this.includeTags=ACE(this.DOM,"fld","Include Tags",n,n,"checkbox").children[1];
		ACE(this.DOM,"btn","Cancel",n,n,e=>this.remove());
		ACE(this.DOM,"btn","Submit",n,n,e=>this.submit());
	}
	addField(){
		ACE(this.fields,"div",[CE("tbx",n,n,n,"Field Name"),CE("slt",n,[
			CE("opt","INT",n,TableStructure.INT),
			CE("opt","NUMBER",n,TableStructure.NUM),
			CE("opt","STRING",n,TableStructure.STR),
			CE("opt","BOOLEAN",n,TableStructure.BOOL),
			CE("opt","ARRAY",n,TableStructure.ARR),
			CE("opt","OBJECT",n,TableStructure.OBJ),
			CE("opt","DATE",n,TableStructure.DATE)
		]),CE("div","+",null,"addButton active small",e=>getE(e).parentNode.remove())]);
	}
	remove(){
		console.log(this.content);
		this.DOM.remove();
		hardShow(this.content);
	}
	submit(){
		//let fields=[...this.fields.children].map(e=>[e.children[0].value,e.children[1].value]);
		let fields={};
		[...this.fields.children].map(e=>fields[e.children[0].value]=e.children[1].value);
		Extension.sendToBG("addTable",n,n,{name:this.tableName.value,tags:this.includeTags.checked,fields:fields});
		ACE(this.tables,"opt",this.tableName.value,this.tableName.value);
		this.remove();
	}
}
TableStructure.INT=0;
TableStructure.NUM=1;
TableStructure.STR=2;
TableStructure.BOOL=3;
TableStructure.ARR=4;
TableStructure.OBJ=5;
TableStructure.DATE=6;

class TableDOM extends DOMObj{
	constructor(){super("editing",n);}
	generate(){
		this.tableName=ACE(this.DOM,"fld","Table Name","tableName","div");
		this.fieldNames=CE("thead");
		this.tableData=CE("tbody");
		this.fields=ACE(this.DOM,"fld","Table List","tableList",n,"table",t,[this.fieldNames,this.tableData])
		this.addButton=ACE(this.DOM,"div","+",null,"addButton",e=>this.addEntry());

		document.body.addEventListener("click",e=>{
			console.log("run second");
			if(this.editing!=n&&getE(e)!==this.editing.DOM.children[0]&&getE(e)!==this.editing.DOM.children[1]){
				this.editing.setUneditable();
			}
			
		});
	}
	clear(){
		this.tableName.children[1].value="";
		this.fieldNames.innerText="";
		this.tableData.innerText="";
	}
	fetchTableData(tableName){
		Extension.sendToBG("fetchTable",tableName,e=>this.set(e));
	}
	set({name,tableData,data}){
		this.clear();
		if(!isDefined(tableData)){console.error("The table "+name+" does not exist.");return;}
		console.log(...arguments)
		this.tableName.children[1].value=name;
		this.clearFields();
		this.fieldNames.innerText="";
		ACE(this.fieldNames,"td","id");
		for(let key in tableData.fields){
			ACE(this.fieldNames,"td",key);
		}
		//Set the rows data
		for(let i in data){
			let row=ACE(this.tableData,"tr");
			ACE(row,"td",data[i].id);
			for(let key in tableData.fields){
				ACE(row,"td",[new EditableDiv(data[i].id,key,data[i][key],this.shareVars("editing","setData"))]);
				//field=>ACE(row,"td",item[key]);
			}
		};
		if(hasKey(tableData,"tags")){
			ACE(this.fieldNames,"td","tags");
			for(let i in data){
				let row=this.tableData.children[i];
				ACE(row,"td",[new HashTag(name,i,t)]);
			}
		}
	}
	setData(id,name,changed){
		console.log({setDataID:id});
		let args={};
		args[name]=changed;
		console.trace("TableDOM.setData");
		console.log(this);
		if(id!==""){
			Extension.sendToBG("editEntry",{id:id,tableName:this.tableName.children[1].value,change:args});
		}else{
			//id=0;
			//this.tableData.children[this.tableData.children.length-1].children[0].innerText=id;
			Extension.sendToBG("addEntry",{tableName:this.tableName.children[1].value,data:args},id=>{
				let row=this.tableData.children[this.tableData.children.length-1].children;
				row[0].innerText=id;
				if([...this.fieldNames.children].map(e=>e.innerText).indexOf("tags")!=-1){
					let cell=row[row.length-1];
					cell.innerText="";
					AE(new HashTag(this.tableName.children[1].value,id,t),cell);
				}
			});
		}
	}
	clearFields(){}
	addField(){
		
	}
	addEntry(){
		/*if(this.sessionForm.classList.contains("hidden")){
			this.addButton.classList.add("active");
		}else{
			this.addButton.classList.remove("active");
		}*/
		//Check if there is an already opened new entry
		if(this.tableData.children.length>0&&this.tableData.children[this.tableData.children.length-1].children[0].innerText==""){return;}
		let row=ACE(this.tableData,"tr",[...this.fieldNames.children].map(e=>CE("td",[new EditableDiv("",e.innerText,n,this.shareVars("editing","setData"))])));
		console.log(this.fieldNames);
	}
}

class EditableDiv extends DOMObj{
	constructor(id,name,text,vars){super("id",id,"name",name,"text",text||"\xa0","sharedVars",vars);}
	generate(){
		this.text=ACE(this.DOM,"div",this.text);
		this.edit=hardHide(ACE(this.DOM,"tbx"));
	}
	setUneditable(){
		if(this.text.innerText!=this.edit.value){
			this.setData(this.id,this.name,this.edit.value);
			this.text.innerText=this.edit.value;
		}
		hardHide(this.edit);
		hardShow(this.text);
		this.editing=n;
	}
	setEditable(){
		if(this.editing!=n){this.editing.setUneditable();}
		if(isHardHidden(this.edit)){//If it is editing
			this.edit.value=this.text.innerText;
			hardHide(this.text);
			hardShow(this.edit);
			this.editing=this;
			this.edit.focus();
		}
	}
	onClick(){
		this.setEditable();
	}
}

class Entry extends DOMObj{
	constructor(tableName,id){super("tableName",tableName,"id",id);}
	generate(){
		Extension.sendToBG("fetchTableFields",this.tableName,e=>setUpTable(e));
	}
}

//=============================================[ HashTags ]

/*TODO([
	["Delete Tags From Database","HashTag","dbtagDelete"],
	["Convert a string into a set of tags in InputLine.fromString(string)","HashTag","StringToTagSet"],
	["Fix Click To Focus","HashTag","FixTagFocus"],
	["Save button on edit mode/edit button on save mode","HashTag","TagsSaveEditButton"],
	["Select Multiple Tags to narrow down results","HashTag","SelectMultipleTags"],
	["Clicking a tag does a tag search","HashTag","TagSearch"],
	["Moving to the next box via right should go to","HashTag","MoveTagRight"],
	["Make tags visual where tags with more entries are visually bigger","HashTag","word cloud"],
	["CANTDO: DataList right button select","HashTag","RightButtonOnDataList"]
]);*/


class InputWord extends DOMObj{//,keyword,"keyword",keyword
	constructor(submitTags,pos,placeholder,options,editable){super("pos",pos,"placeholder",placeholder,"options",options,"canEdit",editable,"submitTags",submitTags);}
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
		//this.DOM.input.className="tag";
		//this.DOM.replaceDOM(CE("spn","#"+this.text,null,"word"));
	}
	open(){
		if(this.text.indexOf("#")==0){this.text=this.text.substring(1);}
		this.innerText=this.text;
		this.DOM.input.placeholder="#";
		this.DOM.input.readOnly=false;this.DOM.input.hidden=false;
		//this.DOM.input.className="";
		this.DOM.input.focus();
		//console.log("YOLO");
		//this.DOM.replaceDOM(new SuggestionBox(null,this.placeholder,(typeof this.options === "string"?this.options:null),null,this.options,this.text));
	}
	blur(e){
		console.log("onBlur");
		//console.log(this.parentNode.children);
		if(this.parentNode.children.length>1){
			this.close();
			if(this.text==""){this.DOM.input.hidden=true;}
		}
		this.submitTags();
	}
	get closed(){
		return this.DOM.input.readOnly;
	}
}

class InputLine extends DOMObj{
	constructor(submitTags,existing,baseList,className,editable){super("submitTags",submitTags,"existing",existing,"baseList",baseList,"tempClassName",className,"editable",editable||true);}
	generate(){
		this.DOM.className=this.className;
		delete this.tempClassName;
		this.words=[];
		for(var index=0;index<this.existing.length;index++){
			this.words[index]=AE(new InputWord(this.submitTags,this.children.length,"#",this.baseList,true),this);
			this.words[index].innerText=this.existing[index];
			this.words[index].close();
		}
		this.current=this.existing.length;
		this.words.push(AE(new InputWord(this.submitTags,this.children.length,"#",this.baseList,true),this));
		this.currentWord.DOM.input.focus();
	}
	keyDown(e){
		//console.log(e.keyCode);
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
		console.log("mouseDown target is",e.target);
		if(e.target.name.length<4){return;}
		var clickIndex=e.target.name.substring(4);
		console.log(this);
		if(!this.editable){return;}
		//console.log("Mouse Down",this.current,clickIndex);
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
		//console.log("addWord",this.caretWasAt,text.length);
		if(this.caretWasAt!=text.length&&text.length>0){
			//console.log("SpaceInsert",text);
			this.currentWord.innerText=text.substring(0,this.caretWasAt+(keyCode==KEY.SPACE?0:1));
			text=text.substring(this.caretWasAt+(keyCode==KEY.SPACE?0:1));
		}else{text="";}
		
		var word=new InputWord(this.submitTags,this.children.length,"#",this.baseList,true);
		word.insertAfter(this.children[this.current]);
		//console.log("splice",this.current);
		//console.log(this.current);
		this.current++;
		this.words.splice(this.current, 0, word);
		word.DOM.input.focus();
		word.innerText=text;
		//this.words.push(word);
		setCaret(word.DOM.input,0);
		return word;
	}
	closeWord(){
		//console.log("closeWord");
		if(this.current>this.words.length-1){this.current--;}
		this.currentWord.close();
		//this.currentWord.innerText=this.currentWord.innerText;
	}
	openWord(){
		//console.log("openWord");
		//console.log("open",this.current);
		this.currentWord.open();
	}
	nextWord(){
		//console.log("nextWord");
		//Only go to the next word if the current word isn't the last word and blank
		if(this.current==this.wordCount-1&&this.currentWord.innerText==""){return;}
		this.closeWord();
		if(this.current>this.wordCount-2){this.addWord();}
		else{
			console.log("hello nurse");
			this.current++;
			this.openWord();
			setCaret(this.currentWord.DOM.input,0);
		}
		//console.log("current",this.current);
	}
	removeWord(){
		console.log("RemoveWord",this.current);
			//console.log("WORDSWORDS",this.words[this.current-1].innerText,this.currentWord.innerText)
		var text=this.currentWord.innerText;
		this.currentWord.text="";
		this.currentWord.innerText="";
		this.words.splice(this.current,1);
		this.current--;
		this.currentWord.text=this.currentWord.text+text;
		console.log(this.current,this.currentWord)
	}
	//get words(){return this.children;}
	get caret(){
		var location=0;
		for(var index=0;index<this.current;index++){
			location+=this.currentWord.length;
		}
	}
	get currentWord(){
		console.log(this.current);
		return this.words[this.current];
	}
	get wordCount(){
		return this.words.length;
	}
	prevWord(){
		console.log("prevWord");
		this.closeWord();
		if(this.current>0){
			this.current--;
			this.openWord();
			//this.currentWord.DOM.input.focus();
		}
		//else{this.openWord();}
	}
	getAutoCompleteList(pos,listOfLists){
		return null;
	}
	setEditable(editable){
		console.log("AJSDASD","ASDDSA");
		if(editable&&!this.editable){
			this.text=this.innerHTML;
			this.openWord();
			//this.parent.insertBefore(CE("line"),this.DOM);
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
			strings.push(this.words[index].innerText);
		}
		return collapse(strings,level);
	}
}

class HashTag extends DOMObj{
	constructor(type,id,editing,editButton,commitButton){super("type",type,"id",id,"editing",(editing!=null?editing:false),"editButton",editButton,"commitButton",commitButton);}
	generate(){
		this.fetch();
	}
	setUpDOM(){
		this.inputLine=new InputLine(e=>this.submit(),this.tags,HashTag.TAGS);
		AE(this.inputLine,this);
	}
	fetch(){//String tag returns string[][]
		//ajax("tags/get",["CAT1",this.type,"id",this.id],((response)=>{}).bind(this));
		Extension.sendToBG("getTag",n,tags=>{
			console.log(...tags);
			tags=tags.map(tag=>HashTag.TAGS[tag.tag].name);
			//Each is a tagName
			this.tags=[];
			for(var index=0;index<tags.length;index++){
				this.tags.push(tags[index]);
			}
			console.log(this.tags)
			this.setUpDOM();
		},{tableName:this.type,id:this.id});
	}
	get tagSet(){
		//join tags with # delimiters
		var tags="";
		for(var index=0;index<this.inputLine.words.length;index++){
			tags+=this.inputLine.words[index].text;
		}
		return tags==""||tags.charAt(0)!="#"?tags.substring(1):tags;
	}
	get tagIndicies(){
		let indicies=[...new Set(this.inputLine.words.map(word=>{
			word=(word.text[0]=="#"?word.text.slice(1):word.text).toUpperCase();
			if(word==""){return "";}
			console.log(word);
			for(let i=0;i<HashTag.TAGS.length;i++){
				if(HashTag.TAGS[i].name==word){
					console.log(HashTag.TAGS[i]);
					return HashTag.TAGS[i].id;
				}
			}
			HashTag.TAGS.push({id:HashTag.TAGS[HashTag.TAGS.length-1].id+ +1,name:word});
			return word;
		}).filter(e=>e!==""))]
		console.log(indicies);
		return indicies;
	}
	addTags(){//int objID, String objTable, String tags
		//ajax("tags/set",["CAT1",this.type,"id",this.id,"tags",this.tagSet],((response)=>{console.log(response);}));
		Extension.sendToBG("setTag",n,e=>console.log(e),{tableName:this.type,id:this.id,tags:this.tagSet});
	}
	set readOnly(bool){
		this.editing=!bool;
		if(this.inputLine!=null){this.inputLine.setEditable(!bool);}
	}
	submit(){
		this.inputLine.currentWord.close();
		//ajax("tags/set",["CAT1",this.type,"id",this.id,"tags",this.tagSet],(response)=>{console.log(response);});
		Extension.sendToBG("setTag",n,e=>console.log(e),{tableName:this.type,id:this.id,tags:this.tagIndicies});
	}
}
//ajax("fetch",["CAT1","TAGS","toFetch","id,name"],(response)=>{});
Extension.sendToBG("fetchTable","tags",tags=>{
	tags=tags.data;
	//Each is a set of [tagID,tagName]
	console.log(tags);
	HashTag.TAGS=[];
	for(let index in tags){
		HashTag.TAGS[index]=tags[index];
	}
	
	
	//AE(new CategoryTags("gameStore"));
});

run["hashtagViewer"]=()=>{AE(new HashTagViewer("TEST"));};
class HashTagViewer extends DOMObj{
	constructor(type){super("type",type);}
	makeDOM(){
		this.selectorBox=ACE(this.DOM,"div",null,null,"hashtagSelectorBox");
		this.selectedTags=ACE(this.DOM,"div",null,null,"hashtagSelectedTags")
		this.display=ACE(this.DOM,"div",null,null,"hashtagSelectorBox")
	}
	addTags(){
		//Goto the database and fetch the tags
		//ajax("",[],((response)=>{}).bind(this));
		Extension.sendToBG("",n,e=>{},{});
	}
}
//=============================================[ Suggestion Box ]

function SetCSSRule(element,value) {
    var strCSS = document.all?'rules':'cssRules';
	document.styleSheets[0][strCSS][0].style[element] = value;
}


//TODO:SetList/RemoveList Functions(to save up space on multi suggestion Box Lines)
run["suggestionBox"]=()=>{
	ACE(document.body,"txt","Selecting from an array of objects [{id:*,name:\"*\"}]");br();
	new SuggestionBox("country","Select Your Country",null,"http://randomcode.run/images/countries/{0}.png",countries);br();
	ACE(document.body,"txt","Constructing list from a db table");br();
	new SuggestionBox("province","Select Province","name","http://randomcode.run/images/japan/Provinces/flags/{0}.png","PROV");
};

onLoad(()=>{
	//SetCSSRule("datalist","overflow-x: hidden; overflow: scroll;");
	//tAdd("NoOpt","Sorry, no options detected.","すみません、オプション有りない。");
	//tAdd("LoadingOpt","Loading options...","オプション中ロードする。。。");
	//tAdd("NoLoadOpt","Couldn't load options.","オプションがロードできない。");
});
class SuggestionBox extends DOMObj{
	constructor(id,placeholder,nameField,imgDir,options,text){console.trace(options);super("ID",id,"placeholder",placeholder||"","nameField",nameField,"imgDir",(imgDir!=null?imgDir:""),"options",(options!=null?options.slice():[]),"text",text);}
	generate(){
		//console.log("ASD",this.options,this.nameField);
		this.DOM=CE("spn");
		this.input=ACE(this.DOM,"ipt",this.text,this.ID,"dbinput","text",{"placeholder":this.placeholder,"list":this.ID+"Data"});
		//console.log("the options are",this.options);
		this.datalist=ACE(this.DOM,'dls',null,this.ID+"Data");
			this.input.placeholder=this.placeholder;
		this.setOptions(this.options);
		//console.log("data");
		//this.input.focus();
		
	}
	setOptions(options){
		this.datalist.innerHTML="";
		this.options=options;
		//console.log("this.options is",this.options);
		//Set up the options
		if(this.options instanceof Array){
			if(this.options.length>0&&isArray(this.options[0])){
				for(var index=0;index<this.options.length;index++){
					var id=this.options[index][0];
					this.options[index]=ACE(this.datalist,"opt",this.options[index][1],id);
					this.options[index].style.backgroundImage="url(\""+strFormat(this.imgDir,id)+"\")";
				}
			}else{
				for(var index=0;index<this.options.length;index++){
					var id=this.options[index].id;
					this.options[index]=ACE(this.datalist,"opt",this.options[index].name,this.options[index].id);
					this.options[index].style.backgroundImage="url(\""+strFormat(this.imgDir,id)+"\")";
			}
			
		}
		}else if(this.options!=null&&this.nameField!=null){this.fetch();return;}
		else{console.log(tGet("NoOpt"));return;}//if(!this.remove()){this.DOM=null;}
		
		//console.log("options become",this.options);
		//this.datalist=ACE(this.DOM,'dls',this.options,this.ID+"Data");
	}
	fetch(){
		this.input.placeholder=tGet("LoadingOpt");
		ajax("fetch",["CAT1",this.options,"toFetch","id,"+this.nameField],((response)=>{
			this.options=[];
			if(response[0]==-1){// An error occured :(
				this.input.placeholder=tGet("NoLoadOpt");
				return;
			}
			for(var index=0;index<response.length;index++){
				//consoleArray(response[index]);
				this.options.push(ACE(this.datalist,"opt",response[index][1],response[index][0]));
			}
			
			//this.options.push(CE("opt","",-1));
			//this.datalist=ACE(this.DOM,'dls',this.options,this.ID+"Data");
			//this.input.placeholder=this.placeholder;
			if(this.Value!=null){this.value=this.Value;}
			//console.log("Data",this.datalist,this);
		}).bind(this));
	}
	set innerText(text){
		this.input.value=text;
	}
	get innerText(){
		return this.input.value;
	}
	set value(key){
		this.Value=key;
		if(this.datalist!=null){
		console.log(this.datalist,key);
		if(this.datalist.children.length>=key-1&&key>0){
			this.input.value=this.datalist.children[key-1].value;
		}}
	}
	get value(){return this.datalist.children.indexOf(this.input.value)+1;}
	get name(){return this.ID;}
	set readOnly(bool){this.input.readOnly=bool}
	get readOnly(){return this.input.readOnly;}
}
CE("css",`datalist{overflow-x: hidden; overflow: scroll;}`)
var countries=[
	{id:0,name:"Afghanistan"},
	{id:1,name:"Aland"},
	{id:2,name:"Albania"},
	{id:3,name:"Algeria"},
	{id:4,name:"American Samoa"},
	{id:5,name:"Andorra"},
	{id:6,name:"Angola"},
	{id:7,name:"Anguilla"},
	{id:8,name:"Antarctica"},
	{id:9,name:"Anigua and Barbuda"},
	{id:10,name:"Argentina"},
	{id:11,name:"Armenia"},
	{id:12,name:"Aruba"},
	{id:13,name:"Australia"},
	{id:14,name:"Austria"},
	{id:15,name:"Azerbaijan"},
	{id:16,name:"Bahamas"},
	{id:17,name:"Bahrain"},
	{id:18,name:"Bangladesh"},
	{id:19,name:"Barbados"},
	{id:20,name:"Belarus"},
	{id:21,name:"Belguim"},
	{id:22,name:"Belize"},
	{id:23,name:"Benin"},
	{id:24,name:"Bermuda"},
	{id:25,name:"Bhutan"},
	{id:26,name:"BIOT"},
	{id:27,name:"Bolivia"},
	{id:28,name:"Bosnia"},
	{id:29,name:"Botswana"},
	{id:30,name:"Bouvet Island"},
	{id:31,name:"Brazil"},
	{id:32,name:"British Antarctic Territory"},
	{id:33,name:"British Virgin Island"},
	{id:34,name:"Brunei"},
	{id:35,name:"Bulgaria"},
	{id:36,name:"Burkina Faso"},
	{id:37,name:"Burma"},
	{id:38,name:"Burundi"},
	{id:39,name:"Cambodia"},
	{id:40,name:"Caneroon"},
	{id:41,name:"Canada"},
	{id:42,name:"Cape Verde"},
	{id:43,name:"Cayman Islands"},
	{id:44,name:"Central African Republic"},
	{id:45,name:"Chad"},
	{id:46,name:"Chile"},
	{id:47,name:"China"},
	{id:48,name:"Christmas Island"},
	{id:49,name:"Cocos Islands"},
	{id:50,name:"Colombia"},
	{id:51,name:"Comoros"},
	{id:52,name:"Congo"},
	{id:53,name:"Congo Kinshasa"},
	{id:54,name:"Cook Islands"},
	{id:55,name:"Costa Rica"},
	{id:56,name:"Croatia"},
	{id:57,name:"Cuba"},
	{id:58,name:"Cyprus"},
	{id:59,name:"Czech Republic"},
	{id:60,name:"Denmark"},
	{id:61,name:"Djibouti"},
	{id:62,name:"Dominica"},
	{id:63,name:"Dominican Republic"},
	{id:64,name:"East Timor"},
	{id:65,name:"Ecuador"},
	{id:66,name:"Egypt"},
	{id:67,name:"El Salvador"},
	{id:68,name:"England"},
	{id:69,name:"Equatorial Guinea"},
	{id:70,name:"Eritrea"},
	{id:71,name:"Estonia"},
	{id:72,name:"Ethiopia"},
	{id:73,name:"European Union"},
	{id:74,name:"Ex-Yugoslavia"},
	{id:75,name:"Falkland Islands"},
	{id:76,name:"Faroe Islands"},
	{id:77,name:"Fiji"},
	{id:78,name:"Finland"},
	{id:79,name:"France"},
	{id:80,name:"French Polynesia"},
	{id:81,name:"French Southern Territories"},
	{id:82,name:"Gabon"},
	{id:83,name:"Gambia"},
	{id:84,name:"Georgia"},
	{id:85,name:"Germany"},
	{id:86,name:"Ghana"},
	{id:87,name:"Gibraltar"},
	{id:88,name:"Greece"},
	{id:89,name:"Greenland"},
	{id:90,name:"Grenada"},
	{id:91,name:"Guadeloupe"},
	{id:92,name:"Guam"},
	{id:93,name:"Guatemala"},
	{id:94,name:"Guernsey"},
	{id:95,name:"Guinea Bissau"},
	{id:96,name:"Guinea"},
	{id:97,name:"Guyana"},
	{id:98,name:"Hati"},
	{id:99,name:"Holy see"},
	{id:100,name:"Honduras"},
	{id:101,name:"Hong Kong"},
	{id:102,name:"Hungary"},
	{id:103,name:"Iceland"},
	{id:104,name:"India"},
	{id:105,name:"Indonedia"},
	{id:106,name:"Iran"},
	{id:107,name:"Iraq"},
	{id:108,name:"Ireland"},
	{id:109,name:"Isle of Man"},
	{id:110,name:"Israel"},
	{id:111,name:"Italy"},
	{id:112,name:"Ivory Coast"},
	{id:113,name:"Jamaica"},
	{id:114,name:"Jan Mayen"},
	{id:115,name:"Japan"},
	{id:116,name:"Jarvis Island"},
	{id:117,name:"Jersey"},
	{id:118,name:"Jordan"},
	{id:119,name:"Kazakhstan"},
	{id:120,name:"Kenya"},
	{id:121,name:"Kirbati"},
	{id:122,name:"Korea"},
	{id:123,name:"Kuwait"},
	{id:124,name:"Kyrgyzstan"},
	{id:125,name:"Laos"},
	{id:126,name:"Latvia"},
	{id:127,name:"Lebanon"},
	{id:128,name:"Lesotho"},
	{id:129,name:"Liberia"},
	{id:130,name:"Libya"},
	{id:131,name:"Liechtenstein"},
	{id:132,name:"Lithuania"},
	{id:133,name:"Luxembourg"},
	{id:134,name:"Macau"},
	{id:135,name:"Macefonia"},
	{id:136,name:"Madagascar"},
	{id:137,name:"Malawi"},
	{id:138,name:"Malaysia"},
	{id:139,name:"Maldives"},
	{id:140,name:"Mali"},
	{id:141,name:"Malta"},
	{id:142,name:"Marshall Islands"},
	{id:143,name:"Martinique"},
	{id:144,name:"Mauritania"},
	{id:145,name:"Mauritius"},
	{id:146,name:"Mayotte"},
	{id:147,name:"Mexico"},
	{id:148,name:"Micronesia"},
	{id:149,name:"Moldova"},
	{id:150,name:"Monaco"},
	{id:151,name:"Mongolia"},
	{id:152,name:"Montenegro"},
	{id:153,name:"Monterrat"},
	{id:154,name:"Morocco"},
	{id:155,name:"Mozambique"},
	{id:156,name:"Myanmar"},
	{id:157,name:"Nambia"},
	{id:158,name:"Nauru"},
	{id:159,name:"Nepal"},
	{id:160,name:"Netherlands Antilles"},
	{id:161,name:"Netherlands"},
	{id:162,name:"New Caledonia"},
	{id:163,name:"New Zealand"},
	{id:164,name:"Nicaragua"},
	{id:165,name:"Niger"},
	{id:166,name:"Nigeria"},
	{id:167,name:"Niue"},
	{id:168,name:"Norfolk"},
	{id:169,name:"Nothern Ireland"},
	{id:170,name:"Nother Mariana Islands"},
	{id:171,name:"North Korea"},
	{id:172,name:"Norway"},
	{id:173,name:"Oman"},
	{id:174,name:"Pakistan"},
	{id:175,name:"Palau"},
	{id:176,name:"Palestine"},
	{id:177,name:"Panama"},
	{id:178,name:"Papua New Guinea"},
	{id:179,name:"Paraguay"},
	{id:180,name:"Peru"},
	{id:181,name:"Philippines"},
	{id:182,name:"Pitcairn"},
	{id:183,name:"Poland"},
	{id:184,name:"Portugal"},
	{id:185,name:"Puerto Rico"},
	{id:186,name:"Quatar"},
	{id:187,name:"Reunion"},
	{id:188,name:"Romania"},
	{id:189,name:"Russia"},
	{id:190,name:"Rowanda"},
	{id:191,name:"Saint Pierre and Miquelon"},
	{id:192,name:"Saint Vincent and the Grenadines"},
	{id:193,name:"Saint Barthelemy"},
	{id:194,name:"Saint Helena Dependencies"},
	{id:195,name:"Saint Helena"},
	{id:196,name:"Saint Kitts and Nevis"},
	{id:197,name:"Saint Lucia"},
	{id:198,name:"Saint Martinique"},
	{id:199,name:"Samoa"},
	{id:200,name:"Sam Marino"},
	{id:201,name:"Sao Tome and Principe"},
	{id:202,name:"Saudi Arabia"},
	{id:203,name:"Scotland"},
	{id:204,name:"Senegal"},
	{id:205,name:"Serbia"},
	{id:206,name:"Seychelles"},
	{id:207,name:"Sierra Leone"},
	{id:208,name:"Singapore"},
	{id:209,name:"Slovakia"},
	{id:210,name:"Slovenia"},
	{id:211,name:"SMOM"},
	{id:212,name:"Solomon Islands"},
	{id:213,name:"Somalia"},
	{id:214,name:"South Africa"},
	{id:215,name:"South Georgia"},
	{id:216,name:"Spain"},
	{id:217,name:"SPM"},
	{id:218,name:"Sri Lanka"},
	{id:219,name:"Sudan"},
	{id:220,name:"Suriname"},
	{id:221,name:"Svalbard"},
	{id:222,name:"SVG"},
	{id:223,name:"Sqaziland"},
	{id:224,name:"Sweden"},
	{id:225,name:"Sqitzerland"},
	{id:226,name:"Syria"},
	{id:227,name:"Taiwan"},
	{id:228,name:"Tajikistan"},
	{id:229,name:"Tanzania"},
	{id:230,name:"Thailand"},
	{id:231,name:"Timor"},
	{id:232,name:"Tago"},
	{id:233,name:"Tokelau"},
	{id:234,name:"Tonga"},
	{id:235,name:"Trinidad and Tobago"},
	{id:236,name:"Tunisia"},
	{id:237,name:"Turkey"},
	{id:238,name:"Turkmenistan"},
	{id:239,name:"Turks and Caicos Islands"},
	{id:240,name:"Tuvalu"},
	{id:241,name:"Uganda"},
	{id:242,name:"Ukraine"},
	{id:243,name:"United Arab Emirates"},
	{id:244,name:"United Kingdom"},
	{id:245,name:"United States"},
	{id:246,name:"Uruguay"},
	{id:247,name:"Uzbekistan"},
	{id:248,name:"Vanuatu"},
	{id:249,name:"Vatican"},
	{id:250,name:"Venezuela"},
	{id:251,name:"Vietnam"},
	{id:252,name:"Virgin Islands"},
	{id:253,name:"Wales"},
	{id:254,name:"Wallis and Futuna"},
	{id:255,name:"Western Sahara"},
	{id:256,name:"Yemen"},
	{id:257,name:"Zambia"},
	{id:258,name:"Zimbabwe"}];
	
//=============================================[ SearchBox ]
//Try to implement Icon on SearchBox	https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_form_icon
class SearchBox extends DOMObj{
	constructor(tableName,resultsPerPage){super("tableName",tableName,"resultsPerPage",resultsPerPage||10);}
	generate(){
		Extension.sendToBG("fetchTableData",this.tableName,e=>{
			console.log(e)
			this.searchFields=e.searchFields;
			this.tableFields=Object.keys(e.fields);
		});
		this.searchBox=CE("tbx",n,n,"input-container","Search");
		ACE(this.DOM,"fld","Search","searchBox","searchBox","div",t,[CE("i",n,n,"ico-search"),this.searchBox],n,"input-container");
		ACE(this.DOM,"i",n,n,"ico-search");
		this.searchBox.addEventListener("keyup",e=>this.search(e));
		this.fieldNames=CE("tr");
		this.results=CE("tbody");
		this.resultsDOM=hardHide(ACE(this.DOM,"div",[CE("fld","Results","results","results","table",t,[CE("thead",[this.fieldNames]),this.results])]));
	}
	search(e){
		console.log(this.searchBox,this.searchBox.value);
		if(e.keyCode==KEY.ENTER){
			Extension.sendToBG("search",n,e=>this.recieveSearchResults(e),{tableName:this.tableName,fields:this.searchFields,term:this.searchBox.value});
		}
	}
	recieveSearchResults(results){
		console.log("results",results,this.tableFields,results[0]);
		this.fieldNames.innerText="";
		this.results.innerText="";
		this.tableFields.map(e=>CE("td",e));
		results.map(result=>ACE(this.results,"tr",this.tableFields.map(field=>CE("td",hasKey(result,field)?result[field]:""))));
		hardShow(this.resultsDOM);
	}
}

//============================================[ CatTags ]
class CategoryTags extends DOMObj{
	constructor(tableName,vars,list){super("tableName",tableName,"sharedVars",vars||[],"currentTags",list||[]);}
	generate(){
		this.contains=ACE(this.DOM,"fld","Contains Tags","containsTags","containsTags","div",t).children[1];
		this.categories=ACE(this.DOM,"ul",n,n,"categories");
		if(!isDefined(this.itemDisplay)){this.itemDisplay=ACE(this.DOM,"fld","Items","items","items","div",t).children[1];}
		this.tags=this.currentTags;
		//this.populateList(this.list);
	}
	addTag(tag){
		console.log(tag);
		//if(tag){return;}
		let tags=this.tags;
		if(!tags.includes(tag)){tags.push(tag);}
		this.tags=tags;
	}
	removeTag(tag){
		let tags=this.tags,
				tagIndex=tags.indexOf(tag);
		console.log(tag);
		if(tagIndex!=-1){
			tags.splice(tagIndex,1);
		}
		this.tags=tags;
	}
	get tags(){
		return this.currentTags;
	}
	set tags(tags){
		this.currentTags=tags;
		this.contains.innerText="";
		tags.map((tag,id)=>
		ACE(this.contains,"div",[
			CE("spn",HashTag.TAGS[tag].name),
			CE("div","+",HashTag.TAGS[tag].id,"addButton active small",e=>this.removeTag(getE(e).id))
		],id));
		this.narrowDownTags(tags);
	}
	narrowDownTags(tags){
		console.log("narrowDownTags",{tags});
		//this.addTag(tag);
		Extension.sendToBG("topTags",n,tag=>{
			console.log({tag});
			let items=[];
			tag.map(t=>t[1].map(i=>{if(!items.includes(i.item))items.push(i.item)}));
			console.log(tag.map(t=>t[1].map(i=>i.item)));
			Extension.sendToBG("getTagsForItems",n,i=>this.displayItems(i),
				{tableName:this.tableName,items:items,includesTags:[...tags]})
			
			//console.table(tags);
			//Sort tags
			
			
			//Tally item tags
			
		},{tableName:this.tableName,list:this.currentTags});
		
	}
	displayItems(items){
		let tags=items.shift();
		items=items[0];
		console.log("displayItems",{tags},items);
		this.categories.innerText="";
		tags.map(t=>{//map(tag=>tag.filter(t=>!this.currentTags.includes(t[0])).
			ACE(this.categories,"li",HashTag.TAGS[t[0]].name+" ("+t[1].length+")",t[0],n,e=>this.addTag(getE(e).id));
			return t[1].map(t=>t.item);
		});//);
		this.itemDisplay.innerText="";
		items.map(e=>ACE(this.itemDisplay,"div",e[1],e[0]));
		console.log(this.itemDisplay);
	}
}
onLoad(e=>{
	AE(new LocalDB("test"))
	AE(new SearchBox("gameStore"));
	/*	var hashtag=AE(new HashTag("word",1,false));
	ACE(content,"btn","Cancel",null,null,(e)=>{hashtag.readOnly=true;});
	ACE(content,"btn","Submit",null,null,hashtag.submit.bind(hashtag));*/
});

	//let obj={a:1,b:2,c:3}
	//(({a,b,c})=>`${a}+${b}+${c}=${a+b+c}`)(obj)