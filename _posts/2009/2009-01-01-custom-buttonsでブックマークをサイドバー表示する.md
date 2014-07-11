---
title: Custom Buttonsでブックマークをサイドバー表示する
author: azu
layout: post
permalink: /2009/0101/res413/
SBM_count:
  - '00002<>1355446579<>1<>0<>0<>1<>0'
dsq_thread_id:
  - 300927970
categories:
  - Firefox
tags:
  - Firefox
  - アドオン
---
<span style="text-decoration: line-through;"><a href="http://www.geocities.jp/twicli/">twicli</a></span>[http://twicli.neocat.jp/index.html][1]をサイドバーで使いたかったので、Custom Buttonsにしてみた。  
ブックマークのサイドバーで読み込むのと同じような感じのボタンが作れます。

<pre class="brush:javascript;">var title = ”twicli”;
var url = "http://twicli.neocat.jp/index.html";
var sidebarBox = document.getElementById(&amp;quot;sidebar-box&amp;quot;);
if (sidebarBox.hidden) {
openWebPanel(title, url);
} else {
toggleSidebar();
}
</pre>

[<img style="margin: 0 6px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///9ZZP////9MWf///2ZwdvuBivnv7/9wdvuBivlZZP+4vP////9ZZP+/wq3//2ZTpML6AAAAEHRSTlMA///////u/+7dIv8iVczu0KWLVAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEGSURBVBiVY2AAglOrVq06wAABJxMFBQVnQni8yYZAjuEsMOeqYSCQIyjxACQRHF0N4gjGATlHhTepC4M4ogcYeJKBnNBQIEd4AgNv9O4ipfLyjcKGgjEMvEFKIFDY91hQEsbZPP+HoBgDr9juIvVtGcZPvhmLMvAKGyepC5u9++L3biIDr6BgklKz3RcXF5eHEE6yxBMXl3+hUI6gnYvLY6BpgsJJSpsNQ4AcOQaeYOEgpermFL8vzgkMDBMFpYF2yj3se3iBgeGEoOB2pc2ChoKWB8Aci20gV89hYOCZDHSvMZAtCZTgFc2cCvSOsMQckEdzD/DMbBXtvAMOAqAsz6pXZ0BMAK1WT1eD5lhsAAAAAElFTkSuQmCC" border="0" alt="twicli" />twicli][2]←完成品

他のサイトにするにはtitleとurlを変えるだけ。

**twicli**
:   [http://twicli.neocat.jp/index.html][1]

 [1]: http://twicli.neocat.jp/index.html "twicli"
 [2]: custombutton://%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Ccustombutton%20xmlns%3Acb%3D%22http%3A//custombuttons2.com/%22%3E%0A%20%20%3CCb2Ver%3E3.1.0%3C/Cb2Ver%3E%0A%20%20%3Cname%3Etwicli%3C/name%3E%0A%20%20%3Cimage%3E%3C%21%5BCDATA%5Bdata%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///9ZZP////9MWf///2ZwdvuBivnv7/9wdvuBivlZZP+4vP////9ZZP+/wq3//2ZTpML6AAAAEHRSTlMA///////u/+7dIv8iVczu0KWLVAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEGSURBVBiVY2AAglOrVq06wAABJxMFBQVnQni8yYZAjuEsMOeqYSCQIyjxACQRHF0N4gjGATlHhTepC4M4ogcYeJKBnNBQIEd4AgNv9O4ipfLyjcKGgjEMvEFKIFDY91hQEsbZPP+HoBgDr9juIvVtGcZPvhmLMvAKGyepC5u9++L3biIDr6BgklKz3RcXF5eHEE6yxBMXl3+hUI6gnYvLY6BpgsJJSpsNQ4AcOQaeYOEgpermFL8vzgkMDBMFpYF2yj3se3iBgeGEoOB2pc2ChoKWB8Aci20gV89hYOCZDHSvMZAtCZTgFc2cCvSOsMQckEdzD/DMbBXtvAMOAqAsz6pXZ0BMAK1WT1eD5lhsAAAAAElFTkSuQmCC%5D%5D%3E%3C/image%3E%0A%20%20%3Cmode%3E0%3C/mode%3E%0A%20%20%3Ccode%3E%3C%21%5BCDATA%5Bvar%20title%20%3D%20%22twicli%22%3B%0A//%20http%3A//www.geocities.jp/twicli/twicli.html%0Avar%20uri%20%3D%20%22http%3A//twicli.neocat.jp/twicli.html%22%3B%0Avar%20sidebarTitle%20%3D%20document.getElementById%28%22sidebar-title%22%29.value%3B%0Avar%20sidebarBox%20%3D%20document.getElementById%28%22sidebar-box%22%29%3B%0Aif%20%28title%20%3D%3D%20sidebarTitle%29%20%7B%0A%09toggleSidebar%28%29%3B%0A%7D%20else%20%7B%0A%09openWebPanel%28title%2C%20uri%29%3B%20%20%0A%7D%5D%5D%3E%3C/code%3E%0A%20%20%3Cinitcode%3E%3C%21%5BCDATA%5B/*Initialization%20Code*/%5D%5D%3E%3C/initcode%3E%0A%20%20%3Caccelkey%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/accelkey%3E%0A%20%20%3Chelp%3E%3C%21%5BCDATA%5B%5D%5D%3E%3C/help%3E%0A%3C/custombutton%3E "twicli"