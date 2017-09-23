[![Almin.js](https://almin.github.io/media/logo/logo.png)](https://github.com/almin/almin)

[Almin](https://github.com/almin/almin "Almin") is a State management library like Redux/Flux. But Almin aim to help Client-side DDD/CQRS.

This architecture is also known as [Layered Architecture](https://www.safaribooksonline.com/library/view/software-architecture-patterns/9781491971437/ch01.html "Layered Architecture").

![Architecture](https://almin.js.org/docs/resources/almin-architecture.png)

We have released [Almin 0.14.0](https://github.com/almin/almin/releases/tag/almin%400.14.0 "almin@0.14.0") that support to measure performance profile based on `performance.mark`.
You can profiling UseCase execute, StoreGroup write/read, Store update using the browser developer tool timeline.

TK: image
[![DevTool timeline](http://efcl.info/wp-content/uploads/2017/09/20-1505888631.png)](https://github.com/almin/almin/releases/tag/almin%400.14.0)

`performance.mark` is defined [User Timing Level 2](https://w3c.github.io/user-timing/ "User Timing Level 2") as W3C standard API.
It means that almin work with other library like React and Vue on performance profile.

## Usage

If you have not heard of almin, please see [Introduction · Almin.js](https://almin.js.org/ "Introduction · Almin.js")

You can turn on performance profile by `performanceProfile` option.

```js
const appContext = new Context({
    dispatcher: new Dispatcher(),
    store: yourStoreGroup,
    options: {
        strict: true,
        performanceProfile: true // <= here
    }
});
```

### Steps

1. Turn on `performanceProfile` option
2. Load your app
3. Open the browser DevTools "Performance" tab and press **Record**
    - For more details, See [Chrome's Timeline Tool document](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool) and [MSEdge's F12 devtools guide](https://docs.microsoft.com/en-us/microsoft-edge/f12-devtools-guide/performance "F12 devtools guide - Performance - Microsoft Edge Development | Microsoft Docs")
4. Stop recording
5. Almin events will be grouped under the **User Timing** label

Actually, you can see performance profile with Chrome DevTool timeline.

<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/almin?src=hash">#almin</a> + <a href="https://twitter.com/hashtag/react?src=hash">#react</a> easy to profile web app with devTool&#39;s timeline.<a href="https://t.co/HLndVyS4hI">https://t.co/HLndVyS4hI</a> <a href="https://t.co/d7l2c2pP1K">pic.twitter.com/d7l2c2pP1K</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/909418278153478144">September 17, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

This video show Almin + React on timeline.
React has [?react_perf](https://facebook.github.io/react/docs/optimizing-performance.html "?react_perf") options that does profiling performance.


That example code is following.

- [almin/examples/shopping-cart at master · almin/almin](https://github.com/almin/almin/tree/master/examples/shopping-cart "almin/examples/shopping-cart at master · almin/almin")

## Vue + Almin

Vue also support [`performance` option](https://vuejs.org/v2/api/#performance) based on `performance.mark`.

I've created a example project that use Almin + Vue.

- [azu/vue-almin-counter-example: Vue + Almin counter example](https://github.com/azu/vue-almin-counter-example "azu/vue-almin-counter-example: Vue + Almin counter example")

![Vue + Almin](https://cdn.rawgit.com/azu/vue-almin-counter-example/master/img/performance-timeline.gif)

- Vue's profile show view metrics(`render` and `patch`)
- Almin's profile show UseCase execute, StoreGroup write/read, Store update time

The collection of metrics is writtend in following document.

[![Metrics](http://efcl.info/wp-content/uploads/2017/09/20-1505887064.png)](https://almin.js.org/docs/tips/performance-profile.html)

- [Performance profile · Almin.js](https://almin.js.org/docs/tips/performance-profile.html "Performance profile · Almin.js")

This project is migrated from Vue + Vuex to Vue + Almin.
The diff is following.

- [Almin + Vue performance profile by azu · Pull Request #1 · azu/vue-almin-counter-example](https://github.com/azu/vue-almin-counter-example/pull/1 "Almin + Vue performance profile by azu · Pull Request #1 · azu/vue-almin-counter-example")

## Conclusion

Almin can measure performance profile with browser DevTools.

- [Chrome's Timeline Tool document](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
- [MSEdge's F12 devtools guide](https://docs.microsoft.com/en-us/microsoft-edge/f12-devtools-guide/performance "F12 devtools guide - Performance - Microsoft Edge Development | Microsoft Docs")

This performance profile also work with the other library like React, or Vue.

You can find bottleneck using these metrics.

For more details, See followoing documents.

- [Performance profile · Almin.js](https://almin.js.org/docs/tips/performance-profile.html "Performance profile · Almin.js")
- [LifeCycle of UseCase · Almin.js](https://almin.js.org/docs/tips/usecase-lifecycle.html "LifeCycle of UseCase · Almin.js")

