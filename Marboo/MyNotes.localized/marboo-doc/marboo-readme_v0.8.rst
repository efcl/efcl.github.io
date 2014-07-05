=============================
Marboo用户手册(|version|)
=============================

.. contents:: 目录

.. |date| date:: 2012-12-27
.. title:: 欢迎使用Marboo
.. author: amoblin <amoblin@gmail.com>
.. publish:: NO
.. |version| replace:: v0.8

欢迎使用Marboo
=================

.. 自0.4.1版起，MarkBook改名为Marboo，同时更换了全新的界面。看着还可以吧？
.. 自0.8版起，简化了映射规则，从而使写扩展变简单！

欢迎您使用Marboo，目前版本为 |version|

查看新增了什么功能：http://marboo.biz/release-notes/

Marboo是什么？
===============

Marboo能做什么？

* 用喜欢的编辑器和格式来记笔记
* 管理代码，转换代码，执行代码
* 通过扩展管理各种文件，比如zip文件等

Marboo的目标：

* 自由的写作
* 方便的分享
* 专业的发布

Marboo原名叫MarkBook，初衷是用来管理置标语言文档及其相关资源的。

但随着MarkBook的迅速发展，MarkBook不是仅能够管理置标语言，而是管理所有的程序语言。

所以从0.4.1版开始，MarkBook改名为Marboo。

Marboo通过用户定义的转换规则，对源文件进行一系列转换，将最终结果呈献给用户显示。当源
文件内容发生变化时，实时更新最终结果。

通过定义不同的转换规则，实现不同的功能。比如，

针对记笔记、写博客这个功能，可能的需求有：

- 我要写markdown文件，转换为HTML来显示；
- 我要写reStructuredText文件，转换为HTML来显示
- 我要写Org-mode文件，实时显示HTML。

用转换规则来描述：

- 对于markdown文件，用md2html处理，然后输出；
- 对于reStructuredText文件，用rst2html处理，然后输出；
- 对于Org-mode文件，用org2html.el处理，然后输出；

针对代码之间的转化功能，可能的需求有：

- 我喜欢写coffee script，但希望实时看到生成的javascript的效果；
- 我喜欢写Jade，希望实时看到生成的HTML的效果；
- 我喜欢用Stylus，希望实时看到生成的css内容

用转换规则来描述：

- 对于coffee script文件，先转换为javascript，然后语法高亮，最后输出。
- 对于jade文件，先转为HTML文件，然后语法高亮，最后输出。
- 对于stylus文件，先生成css，然后语法高亮，然后输出；

比如，一个python脚本，内容如下：

.. code-block:: python

    #!/usr/bin/python
    # -*- coding:utf-8 -*-
    import sys
    print "你好"
    print '<a href="http://marboo.biz">marboo主页</a>'

可能的转换有：

* 直接语法高亮输出(内容见上)
* 执行该脚本，将输出结果语法高亮显示
* 执行该脚本，将输出的HTML直接显示

使用语法高亮显示的内容如下：

.. code-block:: html

    你好
    <a href="http://marboo.biz">marboo主页</a>

而作为HTML内容来显示的话，是这样的：

你好 marboo主页_

.. _marboo主页: http://marboo.biz

这里有上述示例的演示视频：http://v.youku.com/v_show/id_XNTExMjk0MTg0.html


从上面可以看出，文件就像水一样，流经各个处理管道，进行各种转换，最终显示给用户。

下面说说Marboo的核心模型。

核心模型
========

管道
*****

用过Linux的小伙伴应该不陌生，文件名或内容作为输入，被特定的命令处理，通过管道传递给
下一个命令。通过命令的组合实现所需的功能。管道的优势在于功能模块化，需要时像搭积木一样
组装即可。

Marboo把文件的处理也用管道模型。源文件经过一系列处理转换，最终生成HTML，显示给用户。

先定义转换脚本的内容，然后定义转换规则，即对符合条件的文件执行转换脚本。

要达到此目的，需要做到2点：转换模块、组装序列。

转换集
********

这是一个树状结构，顶部是mime类型，然后细化为具体的文件类型，每个节点都有转换模块，
底层的可以使用父节点的转换模块。

文件mime类型目前支持：text和image。

text的转换模块有：语法高亮。

image的转换模块有：用HTML来显示。

text下细分为：

md文件：md2html
rst文件：rst2html
等等。

组装序列
********

对满足条件的文件，从该文件的转换集中选择一个进行转换，输出另一种格式的文件，可以重复
循环下去，这些转换组成的就是转换序列。


处理过程
========

配置文件是 `rules.json`

自动初始化内容
***************

在 media/starts 目录下，定义了各种文件类型的初始化模板，在创建该类型文件的时候，会复制一份，
并且自动添加上标题名(从文件名取)，创建时间。

自定义处理过程
****************

配置文件中的`convert`键来定义当前的转换序列。

自定义输出样式
***************

转换序列中最后一个转换一般都是包装模板处理。模板文件一般存放在views下。

Pygmentize支持
***************

对文本文件而言，语法高亮是最漂亮的外衣。Marboo对所有文本文件提供了Pygmentize语法
高亮支持。

简单的对应关系
**************

内置markdown等置标语言支持
***************************

Marboo首先是一个个人笔记管理应用，所以内置Markdown和reStructuredText的支持。

md格式
-------

初始化文件（内容在/media/starts/default.md）：

.. code-block:: markdown

    # %@
    <!-- 
        modify /media/starts/default.md to change the init content of *.md files.
    -->

    %@

其中有两个参数，用 %@ 表示。

* 第１个代表文件名
* 第２个代表创建时间

转换脚本： Marboo内置的markdown脚本(perl脚本)。

输出模板：/media/templates/marboo.template.html

输出模板参数统一只有一个，内容就是转化脚本的输出内容。

rst格式
----------

初始化文件（内容在/media/file_init/default.init.rst）：

参数是4个：

* 第１个代表文件名
* 第２个代表创建时间

转换脚本： Marboo内置的rst2html.py。

输出模板：无。（rst比较特殊，直接输出全部html）

.. code-block:: rst

    %@
    %@
    %@

    .. modify /media/file_init/default.init.rst to change the init content of *.rst files.
    .. Author: your_name 
    .. title:: this is the real title in Jekyll.
    .. |date| date:: %@
    .. publish:: NO

一共4个参数。

* 第2个参数是笔记名
* 第1个和第3个是根据笔记名计算出来的 ‘=’ (RST语法要求)
* 第4个参数是当前日期，主要用于生成jekyll格式的文件名。

html格式
-----------

初始化文件（内容在/media/file_init/default.init.html）：

看初始化文件会发现，默认html使用了 `twitter bootstrap`_ 框架。

参数有3个：

* 第1个是笔记名(title标签用)
* 第2个是创建时间
* 第3个还是笔记名(h1标签用)。

转换脚本：使用系统cat命令，原样输出。

输出模板：html.template.html，只有１行：

.. code-block:: html

    %@

其他格式支持
**************

除了markdown，rst，html以外，还支持如下格式：

CSS
-----

使用 sc模板_ ，语法高亮

JavaScript
-----------

 (使用 sc模板_ ，语法高亮)

image图片
---------

PNG, JPG, GIF等图片格式。


SHELL脚本
----------

可以用来执行 git操作之类的。

python脚本
-----------

系统自带的 浏览图片_ 插件。

C
---

其他Pygments支持的程序文件
---------------------------

默认语法高亮显示。

通过扩展支持任意格式文本
-------------------------

通过 `增加笔记格式`_ 可以支持任意一种语言(不仅仅是置标语言)，包括但不限于：

* AsciiDoc
* Wiki
* TextTile
* Ruby
* Erlang

此外，还通过管理CSS和图片来实现Theme样式。

.. _`twitter bootstrap`: http://twitter.github.com/bootstrap/

简洁的用户界面
***************
  
通过像类似Sparrow/Reeder/Evernote的三栏式界面来管理组织文件，实时反馈文件的变化。

.. 自动发布Jekyll/Octopress博客到GitHub/FarBox等。

创作理念
=========

* KISS

    KISS: Keep It Small and Simple

    Marboo只负责显示最终效果，其他的功能像编辑，生成HTML等都可以通过配置来调用程序完成，甚至像增加文件夹这样的操作都是调用Finder来实现的。

* 内容和排版分离

  markdown等适合写内容，css适合排版。下面是一个markdown文件

.. code-block:: markdown

    # 一颗开花的树
    ## 席慕容

    如何让你遇见我  
    在我最美丽的时刻 为这  
    我已在佛前 求了五百年  
    求佛让我们结一段尘缘  

    佛于是把我化作一棵树  
    长在你必经的路旁  
    阳光下慎重地开满了花  
    朵朵都是我前世的盼望  

    当你走近 请你细听  
    那颤抖的叶是我等待的热情  
    而当你终于无视地走过  
    在你身后落了一地的  

    朋友啊 那不是花瓣  
    那是我凋零的心  

最终的展示效果如下：

.. image:: /media/images/marboo/marboo-poem.png

关于Marboo的创作理念，还可以看我的 `这篇文章`__

__ http://amoblin.marboo.biz/2012/12/25/MarkBook-release.html

使用Marboo
=============

首先看一下Gallery上的各种创意用法吧：`Marboo Gallery`_

.. _`Marboo Gallery`: http://marboo.biz/gallery/

笔记管理
**********

新建笔记
---------

.. role:: kbd

键入 :kbd:`Control + N` 或点击窗口上方标题栏中的图标 |new| 来新建一个笔记，新建时需要指定笔记类型（自定义类型见 管理代码_ ）。

.. |new| image:: /media/images/marboo/marboo-icon-new.png
    :width: 25
    :height: 25

注意如果稍后要通过jekyll发布的话，输入的笔记名称最好不要有中文。

因为输入的名字会生成文件名，jekyll对中文文件名的支持不太好。

编辑笔记
--------

双击中栏笔记缩略图，会启动关联的外部编辑器(参见 设置默认编辑器_ )来编辑笔记。保存修改后，Marboo会同步更新内容。

下面是c代码样例：

.. code-block:: c

    #include <stdio.h>

    int main() {
        char* a[3];
        int i;
        a[0] = "你好";
        a[1] = "hello";
        a[2] = "world!";

        printf("a's address is: %p\n", a);
        for(i=0; i<3; i++) {
            printf("%p: %s\n", a[i], a[i]);
        }
    }

预览笔记
---------

右栏实时更新生成的HTML页面，若要同时浏览多个页面，点击 |open| 来用默认浏览器打开当前页面。

.. |open| image:: /media/images/marboo/marboo-icon-open.png
    :width: 25
    :height: 25

删除笔记
---------

点击窗口上方标题栏中的图标 |delete| 或者右键调出菜单选择"删除"来删除笔记。

或者键入 **Delete** 来删除笔记。

.. |delete| image:: /media/images/marboo/marboo-icon-delete.png
    :width: 25
    :height: 25

刷新笔记缩略图
---------------

有时中栏缩略图可能显示为空白，或者是旧主题，这时可以右键点击缩略图，选 “刷新”。

增加笔记本
-----------

双击左栏目录，会在Finder中显示该目录，然后创建文件夹即可。

自动化操作
------------

从Marboo 0.4开始，增加了一个按钮 |make| ,点击它会递归向上查找Makefile或Rakefile文件，然后执行。

.. |make| image:: /media/images/marboo/marboo-icon-make.png
    :width: 25
    :height: 25

Marboo自带了两个自动化操作的Makefile文件。

一个在本目录下，是用来更新本手册的。

另一个在media/test下，是用来做自动化测试的。

Marboo Shell
-------------

从Marboo 0.6开始，在窗口右下角增加了Marboo Shell，这里你可以输入命令，就像你在Terminal中的操作一样。

新建笔记的话， 命令行里输入：

.. code-block:: console

    $ touch first-note.md

新建笔记时Marboo已经初始化了一些内容（其中有文件名和创建时间）：

.. code-block:: console

    $ cat first-note.md
    # first-note
    <!--
        modify /media/file_init/default.init.md to change the init content of *.md files.
    -->

    2013-03-01 13:23:36
    
修改笔记:

.. code-block:: console

    $ open first-note.md

删除笔记：

.. code-block:: console

    $ rm -f first-note.md

所有的操作Marboo在界面上都会有反馈。

最后看一下Marboo Shell记录的操作历史：

.. image:: /media/images/marboo/marboo-terminal-demo.png
    :width: 800

Marboo偏好设置
******************

设置默认编辑器
---------------

点击 |config| 或 键入[ **Command + ,** ] 来打开偏好设置，选择喜欢的编辑器即可。

.. |config| image:: /media/images/marboo/marboo-icon-preferences.png
    :width: 25
    :height: 25

修改主题
----------

点击 |theme| 来打开关联的css文件，通过修改css内容来控制所有笔记的外观。

.. |theme| image:: /media/images/marboo/marboo-icon-theme.png
    :width: 25
    :height: 25

图片管理
********

添加图片
---------

写MarkDown或RST的同学是不是觉得载入图片的语法太麻烦了？使用Marboo，一切就这么简单：

#. 点击 |import-images| 来选择添加图片
#. 在编辑器中粘贴系统剪切板内容

.. |import-images| image:: /media/images/marboo/marboo-icon-import-images.png
    :width: 25
    :height: 25

也可以这样：

#. 双击左栏media文件夹下的bg-images或images目录，复制文件进去
#. 在中栏找到图片，右键选择"复制该文件路径"
#. 粘贴到css或markdown文件中即可

浏览图片
---------

Marboo 0.5版开始，内置了浏览图片的python脚本。

Marboo目录树中任意包含图片的目录，Marboo会生成一个[dir_name].gallery.py的脚本。

[dir_name].gallery.py脚本的标题为"[dir_name] gallery"，内容为该目录的所有图片。

若要自定义浏览图片的样式，参见 修改输出模板_

**使用模板**
***************

Marboo自带了如下一些模板：

sc模板
------

sc模板是输出源代码(source code)的。因为默认的rst，md，html，Marboo是输出生成的HTML页面的。

当我们需要像看python代码一样看md文件时，就可以用sc模板。

在markdown文件中使用sc模板后，输出的不是生成的HTML页面，而是markdown源文件的高亮显示。

run模板
---------

init模板
---------

template模板
-------------

alert模板
-----------

html.py模板
------------

txt.py模板
----------

gallery.py模板
---------------

用在 图片画廊展示_

poem模板
---------

在markdown文件中使用poem模板后，会使用pome模板定义的样式来显示生成的HTML页面。

Evernote相关
****************

导入Evernote笔记
------------------

支持将Evernote笔记导出的HTML导入Marboo。

#. Evernote菜单中选择 文件->导出所有笔记，保存格式为HTML
#. File -> Import Notes...，选中从Evernote中导出的文件夹，点击 open 导入

如果要导入的文件比较多可能需要等待一些时间。

图片画廊展示
**************

Marboo从0.4.1版开始增加了本地图片的画廊展示。Marboo下包含图片文件夹，会生成一个[folder name].gallery.py 的文件。

从而将文件夹下的图片在一个WEB页面上展示出来。当然，可以通过css来个性化定制。

Jekyll/Octopress相关
*********************

导入jekyll/Octopress博客
-------------------------

File -> Import Notes...，选择jekyll或Octopress博客的_posts目录，即可将该目录下的博客文章导入到Marboo中。

发布到jekyll/Octopress博客
---------------------------

由于amoblin主要使用rst来写文档，对rst比较熟悉，而md就不太熟悉，所以目前此功能仅支持rst格式。后续会加入md支持。

如果在文件名为my-first-blog.rst的笔记中定义了如下内容：

.. code-block:: rst

    .. |date| date:: 2012-08-31
    .. title:: 博客标题
    .. publish:: YES

就会在 **~/.marboo/source/blogs/my_blog** 目录下创建 2012-08-31-my-first-blog.rst的博客文件，publish为NO时删除上述文件。

本文rst源文件第10行正是定义publish之处，现在值为NO，你可以试着修改为YES，保存，然后点blogs/my_blog看看，是不是出现了？

jekyll/Octorpress用户可以把自己的_posts目录软链到上述目录。

具体例子可以看我的文章：`使用MarkBook发布博客到Jekyll`__

__ http://amoblin.marboo.biz/2012/12/26/markbook-to-jekyll.html

一键发布博客
--------------

(在Dock中打开Marboo调用Jekyll会存在问题，在终端中找到Marboo.app/Contents/MacOS/Marboo来启动的话可以调用Jekyll命令。新版本会修复。)

把jekyll生成html的命令和git推送的命令都写到Makefile或Rakefile里，放在博客目录下，这样发布博客是不是很方便了呢？

用Marboo发布博客，就这么简单，详情点击 这里_

.. _这里: http://amoblin.puti.biz/2013/01/24/markbook-to-farbox.html

发布到FarBox
-------------

http://amoblin.puti.biz/2013/01/24/markbook-to-farbox.html

读书
******

Pro Git
---------

Git学习的经典著作Pro Git托管在GitHub上，以Creative Commons Attribution-Non Commercial-Share Alike 3.0 license发布。

amoblin整理了Pro Git的源文件，发布在GitHub上。

.. code-block:: console

    $ git clone git@github.com:amoblin/progit-for-markbook.git ~/.marboo/source/progit-for-markbook

写WEB页面
**********

Marboo的 主页_ 就是借助它实现的，有图为证：

.. image:: /media/images/marboo/markbook-self-generate.png
    :height: 600

.. _主页: http://marboo.biz/

管理代码
*********

新建笔记，笔记标题输入程序名，比如hello.py，笔记类型选择最下面的“自定义”，这样生成的文件就不会再添加额外的后缀名了。

粘贴代码进去，保存，Marboo会高亮显示代码。

如果显示内容为：Unknown type of file: [filename]。那么说明Marboo不能识别文件的MIME类型。

这时候可以通过 增加笔记格式_ 来扩展。

Marboo目录组织
=================

Marboo的根目录默认为 `~/.Marboo`

根目录下的目录/文件都会被Marboo管理，在左栏和中栏显示。

根目录下的任何改变都会被Marboo捕获，从而更新右栏用户界面。

media目录
*********

source目录下默认有一个名为media的目录，Marboo的核心文件都放在这里。

.. code-block:: console

    $ ls media
    bin        css        file_init images     templates

* bin           转化脚本
* css           存放主题样式表
* file_init     存放初始化文件模板
* images        存放笔记文档中的图片
* templates     生成html后外嵌HTML模板
* core.marboo.json  核心配置文件

其中 bin/mkldir 是用来创建本地化目录的脚本，上面的MyNotes.localized正是用此创建。(参看 Mac下创建本地化目录_)

.. _Mac下创建本地化目录: http://amoblin.marboo.biz/2013/01/10/create-localized-directory-on-os-x.html

Marboo进阶
=============

Marboo通过CSS来控制笔记的显示效果。

可以配置不同内容的CSS来生成不同的显示版式。相同显示版式的笔记使用相同的二级后缀名，比如

* 我的日记.diary.md     版式为diary的markdown格式笔记
* 志摩的诗.poem.md    版式为poem的markdown格式笔记

这样虽然同为markdown文件，使用同一个HTML生成器，但是可以在初始化和最终生成HTML的时候，采取不同的行为。

修改初始化文件内容
*******************

在 新建笔记_ 时，输入笔记名，点击 ‘创建’ 后会生成一个笔记，打开笔记会发现里面已经有内容了，这些内容就是从 media/file_init 目录下的文件初始化而来的。

该目录结构如下：

.. code-block:: console

    $ ls file_init
    default.init.html default.init.md   default.init.rst  poem.init.md

默认版式的笔记会使用名为default的同格式文件来初始化，而特定版式的笔记会使用对应版式名的同格式文件来初始化。

比如新建一个笔记名为 new.peom 的MarkDown格式笔记，会使用 poem.init.md文件来初始化内容。

通过在此目录添加文件"版式名.init.格式名"来增加版式。

增加笔记格式
***************

对Marboo没有内置的格式，可以在 media/bin 下编写shell脚本来增加支持。

Marboo内置对markdown、rst的支持，但如果该目录下也有对应的HTML生成器，会优先使用该生成器来生成。

比如下面的markdown.sh脚本，在生成的html末尾加上了一行文字：

.. code-block:: console

    #!/bin/sh
    echo "`/usr/local/bin/markdown $1` <br/> generated by markdown.sh"

这样，后缀为markdown的文件，生成的html页面下面都会有这一行文字。

也可以用二级版式来对特定版式的笔记做特定转化。

脚本输入输入接口规范
---------------------

输入：1个参数，为源文件路径
输出：到标准输出，为HTML内容

Marboo通过管道获取脚本的输出来做进一步加工，所以请确保脚本一定要输出内容。

修改输出模板
*************

在 media/templates 下保存文件输出模板。

通过标准markdown生成的html文件是只有内容的，并没有html的外部框架，所以通过模板进行包装，从而能够应用css主题。

默认有下面3个模板文件：

* md.template.html
    \*.md 笔记的输出模板
* poem.md.template.html
    \*.peom.md 笔记的输出模板
* marboo.template.html
    默认的输出模板

Marboo插件
===========

在Marboo 0.6中，media下的目录结果做了一些变化：

* file_types改为file_init
* bin下的sh脚本增加了convert二级后缀

Marboo 0.6开始，可以方便地制作自己的插件，也可以方便地安装下载的插件。

制作插件
**********

新建一个类型为mbe.json的文件。作为例子，我新建一个my-extension.mbe.json

Marboo内置mbe模板，所以我们可以看到文件内容如下：

.. code-block:: json

    {
        "name": "my-extension.mbe",
        "description": "",
        "create date": "2013-03-02 15:34:36",
        "author": "amoblin <amoblin@gmail.com>",
        "files": [
            "/media/bin/SUBTYPE.TYPE.sh",
            "/media/file_init/SUBTYPE.init.TYPE",
            "/media/templates/SUBTYPE.TYPE.template.html"
        ],
        "comment": [
            "This file is created from ~/.marboo/source/media/bin/mbe.init.json",
            "本文件由 ~/.marboo/source/media/bin/mbe.init.json 复制而来"
        ]
    }

修改files对应的数组内容，改为你的插件的文件列表。

保存即可，如果文件都存在的话，会出现一个my-extension.zip文件，这个就是你的插件了。

安装插件
***********

下载上述zip格式的插件以后，放置到~/.marboo/source下任意目录，增加二级模板名install即可。

比如my-extension.zip，将其改名为my-extension.install.zip。

这时Marboo会安装该插件，安装完毕文件会改回原名。

.. 创建模板
.. **********

.. 如何创建自己的模板呢？下面以poem模板为例，讲解如何创建自己的模板。

.. 寻找漂亮的页面
.. ---------------

.. 如果你精通WEB设计，那么自己设计一个模板是很轻松的。可以跳过这一步。

.. 如果你像我一样，对WEB设计一窍不通，请往下看。

.. 当你在浏览网页时，时不时会发现一些站点的页面设计特别漂亮，忍不住想

.. 分离出文件
.. -----------

更新
=====

更新本手册
**********

Marboo在发布新版软件前会先更新用户手册，所以如果你想第一时间知道Marboo的动态的话，

可以去 github上的marboo-doc项目_ ，点watch，这样有新的版本发布，你就会收到邮件啦。

.. _github上的marboo-doc项目: https://github.com/marboo/marboo-doc

更新本软件
***********

菜单项：Marboo -> Check for updates..

或者至 Marboo的首页 http://marboo.biz

本地化支持
***********

Marboo目前支持简体中文和英文。

TODO
====

HTML转Markdown
****************

这样导入的Evernote笔记就可以编辑了。

更多的版式
************

谢谢你有耐心看到这里，说明我写的还不是太枯燥啊。amoblin刚接触WEB，不太熟悉。

如果你有漂亮的CSS版式模板，用来实现特定的排版，比如中文竖排，日记，画廊（现在的比较丑）等，同时又愿意给大家分享的话，

请联系 amoblin@gmail.com ，在下一版本里amoblin会添加进来。
