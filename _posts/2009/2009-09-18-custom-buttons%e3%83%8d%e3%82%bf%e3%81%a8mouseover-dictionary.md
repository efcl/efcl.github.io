---
title: Custom ButtonsネタとMouseover Dictionary
author: azu
layout: post
permalink: /2009/0918/res1323/
SBM_count:
  - '00000<>1355425126<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 300927602
categories:
  - アドオン
tags:
  - javascript
  - アドオン
  - 検索
  - 辞書
---
[Mouseover Dictionary][1]というローカルの辞書をマウスオーバーで検索できるアドオンが便利そうなので導入してみたら、  
毎回メニューからサイドバーを表示しないといけないのが面倒なので、Custom Buttonsでそれ用のボタンを作った。

*   [<img class="alignnone size-full wp-image-1324" title="19unei315" src="http://efcl.infol/wp-content/uploads/2009/09/19unei315.png" alt="19unei315" width="26" height="24" />][2] クリックでインストール

もうひとつ、サイドバーで特定のURLを開くボタンを作成するときに、 すでにサイドバーを開いていたらサイドバーをトグルしないで、そのままサイドバーのURLを変えるようにするには

<pre class="brush:javascript;">var title = "タイトルとなる文字列";
var uri = "http://";
var sidebarTitle = document.getElementById("sidebar-title").value;
var sidebarBox = document.getElementById("sidebar-box");
if (title == sidebarTitle) {
	toggleSidebar();
} else {
	openWebPanel(title, uri);  
}
</pre>

という感じにすればいい。

以前作ったtwicliなら下のような感じになる。

*   [<img class="alignnone" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///9ZZP////9MWf///2ZwdvuBivnv7/9wdvuBivlZZP+4vP////9ZZP+/wq3//2ZTpML6AAAAEHRSTlMA///////u/+7dIv8iVczu0KWLVAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEGSURBVBiVY2AAglOrVq06wAABJxMFBQVnQni8yYZAjuEsMOeqYSCQIyjxACQRHF0N4gjGATlHhTepC4M4ogcYeJKBnNBQIEd4AgNv9O4ipfLyjcKGgjEMvEFKIFDY91hQEsbZPP+HoBgDr9juIvVtGcZPvhmLMvAKGyepC5u9++L3biIDr6BgklKz3RcXF5eHEE6yxBMXl3+hUI6gnYvLY6BpgsJJSpsNQ4AcOQaeYOEgpermFL8vzgkMDBMFpYF2yj3se3iBgeGEoOB2pc2ChoKWB8Aci20gV89hYOCZDHSvMZAtCZTgFc2cCvSOsMQckEdzD/DMbBXtvAMOAqAsz6pXZ0BMAK1WT1eD5lhsAAAAAElFTkSuQmCC" alt="" width="24" height="24" />][3]

 [1]: http://maru.bonyari.jp/mouseoverdictionary/
 [2]: custombutton://%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Ccustombutton%20xmlns%3Acb%3D%22http%3A//custombuttons2.com/%22%3E%0A%20%20%3CCb2Ver%3E3.0.1%3C/Cb2Ver%3E%0A%20%20%3Cname%3EMouseover%20Dictionary%3C/name%3E%0A%20%20%3Cimage%3E%3C%21%5BCDATA%5Bdata%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAExUlEQVRIic3U22+TdRzH8d0qUQ5bT+uBHco26ApsOIxIIgScKBo5RBJW59Z1o+3z9Hnap6et7Uq7dWMi7NR2tDK7DtjK0/XwtE+3cTBzMBhecKMxRu+80RuuDNHEefPxSsWQgQgkvv+BV77ffH+/oqL/Wx5OdHz4Sv2R54p0p8R7eual94YXlD9eWji467kg9gvVXg8vXQlckeH0NTlCC9W/js3utj0zgJpSvmxN1sZs/Fo4eAm8vAQ+Xgb/nBSBOQm8SdWY/WLjmqdCnJNb91nTJd9R+fWgOCksXAmYnBBmrgTmbDGYzEuwZzfAzdZ/44juOfDEQOfl2l22lCJFZcS/G3MlMPJrQebXgeQEIDgB9Fwx9JwA5qwYVL4YdF4IW7YKLnZLkJlRbXgs0Hxm6xp3qi5oS8l/o/PFMPLF0OfFIDgxyKwQxqwQRFoAOiOEoyCHk6+GhVeCnq2EpVAJS0EJJqP6+mSy7ugjIcvYG14LVwnzrAh0Rg5TRgIDtw5kpgSmjASmjAhOTo5evhL9hU1gOAVoXgk7XwtfRg1nTg1rQQ0HVwdHum7JfrFOpxuSPTzhyIRW75poAJ0vA1kQwZgtgT4tBJESwJmTwsPJ0M2XwztfBSZXDiK7EX2FTYgv7kBsaSfcGQUc2RpYstthnVHBxm4GOa38yTTYcJ7u37f3LygU85cGIpoVZqIGJCfDiXwpOjICUDNCeHNlcM5IQKVEMKTFIHJSnLtei+SdBkzeUmNgvgyxJTXGvlCDSSlhmdkGmt0OKl6OoU/f/CF+QUf8Y6qTAxafL3gIjng9iMtKGLMymFgBzNNCGJNCUEkRevIViFzfishNNcJXKhCdr0B8cRtGC3Vwp1UwZ6pgY6vhGq3CeF89CqEP07NjxMMP3B+wsuHxVng+2wlDYiOItAgkKwCRLIUhJYKnUIbg5yr08hUIz29G4vZr8GWVoBNKkGwVzPEq9A3UInHqABbONuP6WV17wX/ixYcgu92+JuCzLEZi7XCdV8EwXQoiqwDFimDIiGBMiUFPlWJwtgan5lSwJstAXZaBTJSCCZdjZOB1XB3S4NZQM64Ot4AbYhpXvcDOzs61gR7LUmiiHdbodnRMymHKKkAmhKASIpgSctDT5bBeksJ+QQJTXIreYRXYwYO4GWrHQrAN18aawI00o9tyLEVo31/9bxwY6Frv77HcDcU1cES3QBtTwMZWgJ6SgJyWwDQtRUdCBMe4ElNnD+DGSAuWQ1rcGWnFYqgF475DoLVvr1DGpkGzWfvqqlBRUVGR3++U+f26b89PtsIarEVzRAGSrYB1SgbrhAwjwXpcHT2G5bARS+EO3Ix8hNzgcfSQb4Fsee82w5heeSTwYL3erh0BL/HzeEwDQ7gGH4QF8Ia2YGboHdwIteLLUAeWo81YCLch6j4Cun3/fdqhczIM88K/Rv6ezL/n9Enj/UjsKJr6ZQj278adczosn2vBrYgOqf4meA3vgtIf5zu9jPqJgQc7E+je7/VofzE4GsB+shd3xzWYG9bgY+YwqLajX3U7iNWv64mxvr7DRv2hlSFbI6KeI7BqG+/ZyRbXf1rT4/L73cfods33FmNb0GMl5M8c+DOXy1Xsdto7vV1dO54b8rT9AVVaq00C7MLAAAAAAElFTkSuQmCC%5D%5D%3E%3C/image%3E%0A%20%20%3Cmode%3E0%3C/mode%3E%0A%20%20%3Ccode%3E%3C%21%5BCDATA%5BtoggleSidebar%28%27viewMouseoverDictionary%27%29%3B%0A%5D%5D%3E%3C/code%3E%0A%20%20%3Cinitcode%3E%3C%21%5BCDATA%5B/*Initialization%20Code*/%5D%5D%3E%3C/initcode%3E%0A%20%20%3Caccelkey%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/accelkey%3E%0A%20%20%3Chelp%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/help%3E%0A%3C/custombutton%3E
 [3]: custombutton://%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Ccustombutton%20xmlns%3Acb%3D%22http%3A//custombuttons2.com/%22%3E%0A%20%20%3CCb2Ver%3E3.0.1%3C/Cb2Ver%3E%0A%20%20%3Cname%3Etwicli%3C/name%3E%0A%20%20%3Cimage%3E%3C%21%5BCDATA%5Bdata%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///9ZZP////9MWf///2ZwdvuBivnv7/9wdvuBivlZZP+4vP////9ZZP+/wq3//2ZTpML6AAAAEHRSTlMA///////u/+7dIv8iVczu0KWLVAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEGSURBVBiVY2AAglOrVq06wAABJxMFBQVnQni8yYZAjuEsMOeqYSCQIyjxACQRHF0N4gjGATlHhTepC4M4ogcYeJKBnNBQIEd4AgNv9O4ipfLyjcKGgjEMvEFKIFDY91hQEsbZPP+HoBgDr9juIvVtGcZPvhmLMvAKGyepC5u9++L3biIDr6BgklKz3RcXF5eHEE6yxBMXl3+hUI6gnYvLY6BpgsJJSpsNQ4AcOQaeYOEgpermFL8vzgkMDBMFpYF2yj3se3iBgeGEoOB2pc2ChoKWB8Aci20gV89hYOCZDHSvMZAtCZTgFc2cCvSOsMQckEdzD/DMbBXtvAMOAqAsz6pXZ0BMAK1WT1eD5lhsAAAAAElFTkSuQmCC%5D%5D%3E%3C/image%3E%0A%20%20%3Cmode%3E0%3C/mode%3E%0A%20%20%3Ccode%3E%3C%21%5BCDATA%5Bvar%20title%20%3D%20%22twicli%22%3B%0Avar%20uri%20%3D%20%22http%3A//www.geocities.jp/twicli/twicli.html%22%3B%0Avar%20sidebarTitle%20%3D%20document.getElementById%28%22sidebar-title%22%29.value%3B%0Avar%20sidebarBox%20%3D%20document.getElementById%28%22sidebar-box%22%29%3B%0Aif%20%28title%20%3D%3D%20sidebarTitle%29%20%7B%0A%09toggleSidebar%28%29%3B%0A%7D%20else%20%7B%0A%09openWebPanel%28title%2C%20uri%29%3B%20%20%0A%7D%0A%5D%5D%3E%3C/code%3E%0A%20%20%3Cinitcode%3E%3C%21%5BCDATA%5B/*Initialization%20Code*/%5D%5D%3E%3C/initcode%3E%0A%20%20%3Caccelkey%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/accelkey%3E%0A%20%20%3Chelp%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/help%3E%0A%3C/custombutton%3E