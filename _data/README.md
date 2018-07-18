# イベントの追加方法

```js
var slide = document.querySelector(`a[href^="http://azu.github.io/slide/"]`);
var slideTitle = slide.title || slide.textContent;
var slideURL = slide.href;
var postDate = document.querySelector(".post-date").textContent;
var reportURL = location.href;
copy(`
- date: ${postDate.replace(/[年月]/g, "-").replace("日", "")}
  title: "${slideTitle}"
  URL: ${slideURL}
  report_URL: ${reportURL}
  event_title: "X"
`)
```

このスクリプトをブログページで実行し、[azu_events.yml](./azu_events.yml)に追加する。
