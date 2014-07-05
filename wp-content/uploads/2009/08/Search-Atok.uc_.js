// ==UserScript==
// @name        Search Atok
// @include     main
// @compatibility Firefox 2.0 3.0
// @Last Change:  2009-03-11
// ==/UserScript==

/*
 * The Original Code written by zeniko
 * http://forums.mozillazine.org/viewtopic.php?t=397735
 */

/* Require
 * http://firefox.geckodev.org/index.php?cmd=read&page=userChrome.js
 * http://sites.google.com/site/jsmatome/atok/option/tool
 * 適当な名前でchromeフォルダに保存(LaunchAtok.uc.jsなど)
 * サブスクリプトローダーで呼び出す。
 * 使い方
 * 文字列を選択して右クリックからGetTextOperaLClick.exeを呼び出す。
 * テキストエリアでも使えると思う
 */
var GetTextOperaLClickPath = "D:\\Software\\GetTextOperaLClick\\GetTextOperaLClick.exe";//GetTextOperaLClick.exeのパス ディレクトリは\\で書く

var LaunchAtok = {

  init: function()
  {
    this.mItem = document.createElement("menuitem");
    
    document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function() {
      LaunchAtok.onPopupShowing(this);
    }, false);
  },

  onPopupShowing: function(aPopup)
  {
    if (aPopup.id != "contentAreaContextMenu") return;
    aPopup.insertBefore(this.mItem, document.getElementById("context-sep-" + ((gContextMenu.onLink)?"open":"stop")));

    this.mItem.setAttribute("oncommand", "LaunchAtok.launch();");
    this.mItem.setAttribute("label", !this.isJa() ? "Search in ATOK" : "ATOK\u3067\u691c\u7d22");
    
    this.mItem.hidden = !gContextMenu.onLink && gContextMenu.onImage;
    //this.mItem.setAttribute("disabled", this.mItem.hidden || !this.isSupported((gContextMenu.onLink)?gContextMenu.linkURI:gBrowser.currentURI));
  },
  _getFocusedWindow: function(){ //現在のウインドウを得る
      var focusedWindow = document.commandDispatcher.focusedWindow;
      if (!focusedWindow || focusedWindow == window)
          return window._content;
      else
          return focusedWindow;
  },

  _getselection: function() {  //選択されている文字列を得る
      var targetWindow = this._getFocusedWindow();
      var sel = Components.lookupMethod(targetWindow, 'getSelection').call(targetWindow);
      // for textfields
      if (sel && !sel.toString()) {
        var node = document.commandDispatcher.focusedElement;
        if (node &&
            (node.type == "text" || node.type == "textarea") &&
            'selectionStart' in node &&
            node.selectionStart != node.selectionEnd) {
            var offsetStart = Math.min(node.selectionStart, node.selectionEnd);
            var offsetEnd   = Math.max(node.selectionStart, node.selectionEnd);
            return node.value.substr(offsetStart, offsetEnd-offsetStart);
        }
      }
      return sel ? sel.toString().replace(/\s/g,' ').replace(/^[\ ]+|[\ ]+$/g,'').replace(/[\ ]+/g,' ') : "";
  },

  launch: function()
  {

    var atok = Components.classes["@mozilla.org/file/local;1"]
                           .createInstance(Components.interfaces.nsILocalFile);
    //var win = document.commandDispatcher.focusedWindow;
    var sel = this._getselection();
    var UI = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].
          createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
    //キャラクタコード変換
    var platform = window.navigator.platform.toLowerCase();
    if(platform.indexOf('win')>-1){
      UI.charset = "Shift_JIS";
      sel = UI.ConvertFromUnicode(sel);
    }else{
      UI.charset = "UTF-8";
      sel = UI.ConvertFromUnicode(sel);
    }
    atok.initWithPath(GetTextOperaLClickPath);
    var ss;
    if ('nsIShellService_MOZILLA_1_8_BRANCH' in Components.interfaces) {
      // Firefox 2
      ss = Components.classes["@mozilla.org/browser/shell-service;1"]
                     .getService(Components.interfaces.nsIShellService_MOZILLA_1_8_BRANCH);
    } else {
      // Firefox 3
      ss = Components.classes["@mozilla.org/browser/shell-service;1"]
                     .getService(Components.interfaces.nsIShellService);
    }
    ss.openApplicationWithURI(atok, sel);
  },

  
  isJa: function()
  {
    var prefBranch = Components.classes["@mozilla.org/preferences-service;1"]
                           .getService(Components.interfaces.nsIPrefBranch);
    return prefBranch.getCharPref("general.useragent.locale").indexOf("ja") > -1;
  }
};

LaunchAtok.init();
