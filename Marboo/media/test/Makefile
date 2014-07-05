
default: base pygmentize misc sc poem html5
	echo "Done!" > "测 试".count.md
	#make clean

base:
	# 基本测试
	touch "测 试".md; sleep 1;
	echo "你 好" >> "测 试".md; sleep 1
	touch "测 试".rst; sleep 1;
	echo "你 好" >> "测 试".rst; sleep 1
	touch "测 试".html; sleep 1;
	echo 你好 >> "测 试".html; sleep 1

html5:
	# coffee
	touch "测 试".coffee; sleep 1;
	echo "require 'fs'" >> "测 试".coffee; sleep 1
	# jade
	touch "测 试".jade; sleep 1
	echo "doctype html" >> "测 试".jade; sleep 1
	echo "h1 成功" >> "测 试".jade; sleep 1

pygmentize:
	# pygmentize测试
	echo "import sys\nprint \"你好\"" > "测 试".py
	echo "#include <stdio.h>\nint main() {\npirntf(\"你好\\\\n\");\nreturn 0;\n}" > "测 试".c
	echo "var x='marboo';" > "测 试".js
	echo "f(1) -> 1;\nf(N)->N*f(N-1).\n" > "测 试".erl

sc:
	# sc模板测试
	touch 测试.sc.md; sleep 1;
	mv 测试{.sc,}.md; sleep 1; mv 测试{,.sc}.md
	touch 测试.sc.rst; sleep 1;
	mv 测试{.sc,}.rst; sleep 1
	touch 测试.sc.html; sleep 1;
	mv 测试{.sc,}.html; sleep 1

poem:
	# poem模板测试
	touch 测试.poem.md; sleep 1;

misc:
	# 其他类型测试
	touch CNAME; sleep 1; echo marboo.biz > CNAME; sleep 1
	touch domains.config; sleep 1; echo whoomin.marboo.biz > domains.config

jekyll:
	# DO NOT support yet.
	#jekyll . /tmp/marboo.biz

clean:
	rm -f "测 试".*
	rm -f 测试.*
	rm -f CNAME domains.config
