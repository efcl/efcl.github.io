(function () {
    "use strict";
    function renderResult(postObjects) {
        var tagIndex = document.getElementById("js-related-articles");
        var ulTag = blog.buildPostList(postObjects);
        tagIndex.appendChild(ulTag);
    }

    function renderEmpty() {
        var tagIndex = document.getElementById("js-related-articles");
        tagIndex.appendChild(document.createTextNode("関連記事はありませんでした"));
    }

    function startSearch() {
        var jsTag = document.getElementById("js-post-tags");
        var postUrl = document.getElementById("js-post-url").dataset["postUrl"];
        var tags = JSON.parse(jsTag.dataset["postTags"]);
        if (tags.length === 0) {
            return renderEmpty();
        }
        blog.findWithTags(tags, function (error, postObjects) {
            if (error) {
                return console.error(error);
            }
            var filerByRelated = postObjects.filter(function (object) {
                return object.url !== postUrl;
            });
            // 最大でも5つ
            renderResult(filerByRelated.slice(0, 5));
        });
    }

    startSearch();
})();