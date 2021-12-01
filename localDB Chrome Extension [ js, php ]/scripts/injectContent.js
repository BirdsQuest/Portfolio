//From page
window.addEventListener("message",e=>{e.data.rc&&chrome.runtime.sendMessage(e.data)},!1);
//From extension
chrome.runtime.onMessage.addListener((e)=>{e.from="extension";postMessage(e)});