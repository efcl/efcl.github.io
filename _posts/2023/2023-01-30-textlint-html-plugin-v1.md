---
title: "textlint-plugin-html v1をリリースした"
author: azu
layout: post
date : 2023-01-30T11:15
category: textlint
tags:
    - textlint
    - JavaScript
    - Node.js

---

textlintでHTMLファイルを扱う[textlint-plugin-html](https://github.com/textlint/textlint-plugin-html) v1をリリースしました！

- [Release v1.0.0 · textlint/textlint-plugin-html](https://github.com/textlint/textlint-plugin-html/releases/tag/v1.0.0)

自分が使うプロジェクトを持ってないのでずっと放置していましたが、[textlint v13.0.0](https://textlint.github.io/blog/2023/01/27/textlint-13.html)のリリースに合わせて全部書き直しました。

- [textlint v13.0.0 - ESMで書かれたルールを扱えるように](https://efcl.info/2023/01/27/textlint-v13/)

## 🔥 Breaking Changes

- [textlint v13.0.0](https://textlint.github.io/blog/2023/01/27/textlint-13.html)以降が必要になりました
  - Pure ESMで書かれたプラグインなので、ESMで書かれたプラグインを扱えるtextlint v13.0.0以降が必要になります
- Node.js 16.6.0以降が必要になりました
- TypeScriptに書き直しました

## 🆕　Features

- HTMLのパーサに[rehype](https://github.com/rehypejs/rehype#readme)を使うようになりました
  - rehypeは[parse5](https://www.npmjs.com/package/parse5)を使ってるので、[parse5](https://www.npmjs.com/package/parse5)を直接でもよかったかもしれません
- `<h1>` ... `<h6>`の `levels` プロパティをサポートしました。
- `<ul>` と `<ol>` をサポートしました。
- `<img />`の `alt` と `title` をサポートしました。
- `<a>`の `title` をサポートしました。

この辺のNodeのプロパティは、[textlint v13.0.0](https://textlint.github.io/blog/2023/01/27/textlint-13.html)でちゃんと定義するようにしたので、既存のルールとの互換性が上がっていると思います。

- [TxtAST Interface · textlint](https://textlint.github.io/docs/txtnode.html)

## 🐛　Bug Fixes

多くのルールは`Html`ノードをLint対象から外しています。
今までのHTMLプラグインでは `<html>` タグを `Html` Nodeに変換してしまっていたため、`<html>`以下のNodeがLint対象から外れてしまう問題が起きていました。

- [Rename "html" to "DocumentHtml" mapping · Issue #19 · textlint/textlint-plugin-html](https://github.com/textlint/textlint-plugin-html/issues/19)
- [HTML プラグインと併用すると検出されない場合がある · Issue #4 · textlint-ja/textlint-rule-no-synonyms](https://github.com/textlint-ja/textlint-rule-no-synonyms/issues/4)

そのため、[TxtAST Interface · textlint](https://textlint.github.io/docs/txtnode.html)で定義されているHTMLタグ(`<p>`は`TxtParagraphNode`など)はマッピングしますが、それ以外(`<html>`や`<meta>`など)はそのままのタグ名がNodeの`type`となるようにしました。
多くのルールでは、TxtASTに入ってないNode typeは無視するようになっていたり、`<p><span>xxx</span></p>`のように`TxtParagraphNode`の下に、未定義のspan nodeがある場合は、ルールの実装で無視するようにしています。

ただ、ルールの実装によっては`<span>`文字列として扱ってしまう問題が起きることもあります。
次のIssueは、Paragraphの中身をただのテキストとして扱ってしまうことで、`<span>xxxx</span>`をただの文字字列としてLintしてしまう問題です。

- [Multilayered inline elements becomes "text" · Issue #15 · textlint/textlint-plugin-html](https://github.com/textlint/textlint-plugin-html/issues/15)
- [textlint-rule-max-appearence-count-of-words/max-appearence-count-of-words.js at master · KeitaMoromizato/textlint-rule-max-appearence-count-of-words · GitHub](https://github.com/KeitaMoromizato/textlint-rule-max-appearence-count-of-words/blob/master/src/max-appearence-count-of-words.js)

これを回避するには、[textlint-util-to-string](https://github.com/textlint/textlint-util-to-string)を使うと良いと思います。
[textlint-util-to-string](https://github.com/textlint/textlint-util-to-string)は、Nodeから可視要素のテキストを取り出すためのユーティリティです。
そのため、`<p><span>xxx</span></p>`というNodeの場合は、`xxx`のみを取り出せます(取り出した文字列から元のNodeの位置も取得できます)。

## Testings

HTMLプラグインの開発をしやすくするために、スナップショットテストの仕組みを作り直しました。

たとえば、次のようなHTMLをHTMLプラグインのパーサでパースします。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div>
    <p>
        TODO: This is TODO
    </p>
</div>
</body>
</html>
```

そうすると、次のようなAST(JSON)になります。
しかし、このASTはでかいので目視でチェックするスナップショットとは相性が悪いこともあります。

<details>
<summary>AST(JSON)</summary>


```json
{
    "type": "Document",
    "children": [
        {
            "type": "doctype",
            "position": {
                "start": {
                    "line": 1,
                    "column": 1,
                    "offset": 0
                },
                "end": {
                    "line": 1,
                    "column": 16,
                    "offset": 15
                }
            },
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            },
            "range": [
                0,
                15
            ],
            "raw": "<!DOCTYPE html>"
        },
        {
            "type": "html",
            "tagName": "html",
            "properties": {
                "lang": "en"
            },
            "children": [
                {
                    "type": "head",
                    "tagName": "head",
                    "properties": {},
                    "children": [
                        {
                            "type": "Str",
                            "value": "\n    ",
                            "position": {
                                "start": {
                                    "line": 3,
                                    "column": 7,
                                    "offset": 39
                                },
                                "end": {
                                    "line": 4,
                                    "column": 5,
                                    "offset": 44
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 6
                                },
                                "end": {
                                    "line": 4,
                                    "column": 4
                                }
                            },
                            "range": [
                                39,
                                44
                            ],
                            "raw": "\n    "
                        },
                        {
                            "type": "meta",
                            "tagName": "meta",
                            "properties": {
                                "charSet": "UTF-8"
                            },
                            "children": [],
                            "position": {
                                "start": {
                                    "line": 4,
                                    "column": 5,
                                    "offset": 44
                                },
                                "end": {
                                    "line": 4,
                                    "column": 27,
                                    "offset": 66
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 4
                                },
                                "end": {
                                    "line": 4,
                                    "column": 26
                                }
                            },
                            "range": [
                                44,
                                66
                            ],
                            "raw": "<meta charset=\"UTF-8\">"
                        },
                        {
                            "type": "Str",
                            "value": "\n    ",
                            "position": {
                                "start": {
                                    "line": 4,
                                    "column": 27,
                                    "offset": 66
                                },
                                "end": {
                                    "line": 5,
                                    "column": 5,
                                    "offset": 71
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 26
                                },
                                "end": {
                                    "line": 5,
                                    "column": 4
                                }
                            },
                            "range": [
                                66,
                                71
                            ],
                            "raw": "\n    "
                        },
                        {
                            "type": "title",
                            "tagName": "title",
                            "properties": {},
                            "children": [
                                {
                                    "type": "Str",
                                    "value": "Title",
                                    "position": {
                                        "start": {
                                            "line": 5,
                                            "column": 12,
                                            "offset": 78
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 17,
                                            "offset": 83
                                        }
                                    },
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 16
                                        }
                                    },
                                    "range": [
                                        78,
                                        83
                                    ],
                                    "raw": "Title"
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 5,
                                    "column": 5,
                                    "offset": 71
                                },
                                "end": {
                                    "line": 5,
                                    "column": 25,
                                    "offset": 91
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 5,
                                    "column": 4
                                },
                                "end": {
                                    "line": 5,
                                    "column": 24
                                }
                            },
                            "range": [
                                71,
                                91
                            ],
                            "raw": "<title>Title</title>"
                        },
                        {
                            "type": "Str",
                            "value": "\n",
                            "position": {
                                "start": {
                                    "line": 5,
                                    "column": 25,
                                    "offset": 91
                                },
                                "end": {
                                    "line": 6,
                                    "column": 1,
                                    "offset": 92
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 5,
                                    "column": 24
                                },
                                "end": {
                                    "line": 6,
                                    "column": 0
                                }
                            },
                            "range": [
                                91,
                                92
                            ],
                            "raw": "\n"
                        }
                    ],
                    "position": {
                        "start": {
                            "line": 3,
                            "column": 1,
                            "offset": 33
                        },
                        "end": {
                            "line": 6,
                            "column": 8,
                            "offset": 99
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 0
                        },
                        "end": {
                            "line": 6,
                            "column": 7
                        }
                    },
                    "range": [
                        33,
                        99
                    ],
                    "raw": "<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n</head>"
                },
                {
                    "type": "Str",
                    "value": "\n",
                    "position": {
                        "start": {
                            "line": 6,
                            "column": 8,
                            "offset": 99
                        },
                        "end": {
                            "line": 7,
                            "column": 1,
                            "offset": 100
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 6,
                            "column": 7
                        },
                        "end": {
                            "line": 7,
                            "column": 0
                        }
                    },
                    "range": [
                        99,
                        100
                    ],
                    "raw": "\n"
                },
                {
                    "type": "body",
                    "tagName": "body",
                    "properties": {},
                    "children": [
                        {
                            "type": "Str",
                            "value": "\n",
                            "position": {
                                "start": {
                                    "line": 7,
                                    "column": 7,
                                    "offset": 106
                                },
                                "end": {
                                    "line": 8,
                                    "column": 1,
                                    "offset": 107
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 7,
                                    "column": 6
                                },
                                "end": {
                                    "line": 8,
                                    "column": 0
                                }
                            },
                            "range": [
                                106,
                                107
                            ],
                            "raw": "\n"
                        },
                        {
                            "type": "div",
                            "tagName": "div",
                            "properties": {},
                            "children": [
                                {
                                    "type": "Str",
                                    "value": "\n    ",
                                    "position": {
                                        "start": {
                                            "line": 8,
                                            "column": 6,
                                            "offset": 112
                                        },
                                        "end": {
                                            "line": 9,
                                            "column": 5,
                                            "offset": 117
                                        }
                                    },
                                    "loc": {
                                        "start": {
                                            "line": 8,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 9,
                                            "column": 4
                                        }
                                    },
                                    "range": [
                                        112,
                                        117
                                    ],
                                    "raw": "\n    "
                                },
                                {
                                    "type": "Paragraph",
                                    "tagName": "p",
                                    "properties": {},
                                    "children": [
                                        {
                                            "type": "Str",
                                            "value": "\n        TODO: This is TODO\n    ",
                                            "position": {
                                                "start": {
                                                    "line": 9,
                                                    "column": 8,
                                                    "offset": 120
                                                },
                                                "end": {
                                                    "line": 11,
                                                    "column": 5,
                                                    "offset": 152
                                                }
                                            },
                                            "loc": {
                                                "start": {
                                                    "line": 9,
                                                    "column": 7
                                                },
                                                "end": {
                                                    "line": 11,
                                                    "column": 4
                                                }
                                            },
                                            "range": [
                                                120,
                                                152
                                            ],
                                            "raw": "\n        TODO: This is TODO\n    "
                                        }
                                    ],
                                    "position": {
                                        "start": {
                                            "line": 9,
                                            "column": 5,
                                            "offset": 117
                                        },
                                        "end": {
                                            "line": 11,
                                            "column": 9,
                                            "offset": 156
                                        }
                                    },
                                    "loc": {
                                        "start": {
                                            "line": 9,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 11,
                                            "column": 8
                                        }
                                    },
                                    "range": [
                                        117,
                                        156
                                    ],
                                    "raw": "<p>\n        TODO: This is TODO\n    </p>"
                                },
                                {
                                    "type": "Str",
                                    "value": "\n",
                                    "position": {
                                        "start": {
                                            "line": 11,
                                            "column": 9,
                                            "offset": 156
                                        },
                                        "end": {
                                            "line": 12,
                                            "column": 1,
                                            "offset": 157
                                        }
                                    },
                                    "loc": {
                                        "start": {
                                            "line": 11,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 12,
                                            "column": 0
                                        }
                                    },
                                    "range": [
                                        156,
                                        157
                                    ],
                                    "raw": "\n"
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 8,
                                    "column": 1,
                                    "offset": 107
                                },
                                "end": {
                                    "line": 12,
                                    "column": 7,
                                    "offset": 163
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 8,
                                    "column": 0
                                },
                                "end": {
                                    "line": 12,
                                    "column": 6
                                }
                            },
                            "range": [
                                107,
                                163
                            ],
                            "raw": "<div>\n    <p>\n        TODO: This is TODO\n    </p>\n</div>"
                        },
                        {
                            "type": "Str",
                            "value": "\n\n",
                            "position": {
                                "start": {
                                    "line": 12,
                                    "column": 7,
                                    "offset": 163
                                },
                                "end": {
                                    "line": 14,
                                    "column": 1,
                                    "offset": 172
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 12,
                                    "column": 6
                                },
                                "end": {
                                    "line": 14,
                                    "column": 0
                                }
                            },
                            "range": [
                                163,
                                172
                            ],
                            "raw": "\n</body>\n"
                        }
                    ],
                    "position": {
                        "start": {
                            "line": 7,
                            "column": 1,
                            "offset": 100
                        },
                        "end": {
                            "line": 14,
                            "column": 8,
                            "offset": 179
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 7,
                            "column": 0
                        },
                        "end": {
                            "line": 14,
                            "column": 7
                        }
                    },
                    "range": [
                        100,
                        179
                    ],
                    "raw": "<body>\n<div>\n    <p>\n        TODO: This is TODO\n    </p>\n</div>\n</body>\n</html>"
                }
            ],
            "position": {
                "start": {
                    "line": 2,
                    "column": 1,
                    "offset": 16
                },
                "end": {
                    "line": 14,
                    "column": 8,
                    "offset": 179
                }
            },
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 14,
                    "column": 7
                }
            },
            "range": [
                16,
                179
            ],
            "raw": "<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n</head>\n<body>\n<div>\n    <p>\n        TODO: This is TODO\n    </p>\n</div>\n</body>\n</html>"
        }
    ],
    "data": {
        "quirksMode": false
    },
    "position": {
        "start": {
            "line": 1,
            "column": 1,
            "offset": 0
        },
        "end": {
            "line": 14,
            "column": 8,
            "offset": 179
        }
    },
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 14,
            "column": 7
        }
    },
    "range": [
        0,
        179
    ],
    "raw": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n</head>\n<body>\n<div>\n    <p>\n        TODO: This is TODO\n    </p>\n</div>\n</body>\n</html>"
}
```

</details>

そのため、JSONの構造だけをdumpするツリーダンプもスナップショットテストに追加しました。

```
Document(root)
  doctype(doctype)
  html(element)
    head(element)
      Str(text)
      meta(element)
      Str(text)
      title(element)
        Str(text)
      Str(text)
    Str(text)
    body(element)
      Str(text)
      div(element)
        Str(text)
        Paragraph(element)
          Str(text)
        Str(text)
      Str(text)
```

これで構造的なものは目視でチェックしやすくなりました。
スナップショットテストなので、テストはHTMLを追加してコマンド叩くだけ追加できます。

## メンテナーを募集しています

前から言っていますが、自分はHTMLをLintする実際のプロジェクトを持ってないので、細かいところがメンテナンスできません。
そのため、HTMLプラグインを実際に使ってるメンテナーを募集しています。

- [Looking for new maintainer · Issue #21 · textlint/textlint-plugin-html](https://github.com/textlint/textlint-plugin-html/issues/21)

今 `example/` に実際のルールとHTMLを使ってサンプルを置いていますが、これは自動テストにはなってません。
Lintエラーも含めた結果をスナップショットテストにすれば、textlintの[Integration test](https://github.com/textlint/textlint/tree/master/test/integration-test)と同じように自動テストを許可できます。

- [Make example test to snapshot testing · Issue #24 · textlint/textlint-plugin-html](https://github.com/textlint/textlint-plugin-html/issues/24)

その他には、[textlint AST explorer](https://textlint.github.io/astexplorer/)というASTを見るツールがあるのですが、まだHTMLのアップデートに対応してません。

- [textlint/astexplorer: A web tool to explore the AST generated by various parsers.](https://github.com/textlint/astexplorer)

あと、[textlint v13.0.0](https://textlint.github.io/blog/2023/01/27/textlint-13.html)で`TxtTableNode`などのテーブルタグも定義したので、これのHTMLプラグイン対応はまだやってません。
この辺に興味ある人やHTMLプラグインを使ってる人は、ぜひメンテナーになってください。

🎁 textlintプラグインのメンテナーになると、1Passwordが無料で使えるようになります。

- [1Password for Open Source Projectsの申請をした | Web Scratch](https://efcl.info/2022/09/23/1password-teams-open-source/)