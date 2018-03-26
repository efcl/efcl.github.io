// ==UserScript==
// @name        LDR UnreadCounter
// @namespace      https://efcl.info/
// @description    LDRの未読数をステータスバーに表示
// @include     main
// @compatibility Firefox 2.0 3.*
// @Last Change:  2009/10/08
// ==/UserScript==
(function(){
const userName = ""; // ユーザー名
const reMinute = 30; // 何分毎に更新する
function makeStatus(unread_count){
	var canvas = window.content.document.createElement('canvas');
  var unread = unread_count;
  canvas.width = 24;
  canvas.height = 16;
  with(canvas.getContext('2d')) {
    clearRect(0, 0, 24, 16);
    mozTextStyle = 24 + (unread.toString().length) * -3 + "px sans-serif";
    textAlign = "center";
    textBaseline = "middle";
    translate(0, 14);
    mozDrawText(unread);
  }
  var isAppend = document.getElementById('op_status') || false;
  if(!isAppend){
		var statusbarpanel = document.createElement('statusbarpanel');
		statusbarpanel.setAttribute('id', 'op_status');
		statusbarpanel.setAttribute('class', 'statusbarpanel-iconic');
		statusbarpanel.setAttribute('src', canvas.toDataURL());
		statusbarpanel.setAttribute('tooltiptext', unread);
		statusbarpanel.setAttribute('style', 'padding: 0px 2px;');
		statusbarpanel.addEventListener("click" , function(){
			gBrowser.selectedTab = gBrowser.addTab("http://reader.livedoor.com/reader/");
		}, false);
		var prb = document.getElementById('page-report-button');
		prb.parentNode.insertBefore(statusbarpanel, prb.nextSibling);
	}else{
		isAppend.setAttribute('tooltiptext', unread);
		isAppend.setAttribute('src', canvas.toDataURL());
	}
}
function getLDRCount(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://rpc.reader.livedoor.com/notify?user="+userName, false);
	xhr.send(null);
	if(xhr.status == 200) {
		var res = xhr.responseText;
		var m = res.split("|")[1];
		makeStatus(m);
	}
}
getLDRCount();
if(!timerID)
	var timerID = setInterval(getLDRCount , reMinute*10000);

})();
