(function () {
    "use strict";
    function renderResult(postObjects) {
        var tagIndex = document.getElementById("js-tag-index");
        var ulTag = blog.buildPostList(postObjects);
        tagIndex.innerHTML = "";
        tagIndex.appendChild(ulTag);
    }

    var searchBox = document.getElementById("search-box-query");

    function inputFormFromQuery(query) {
        searchBox.value = query;
    }

    function startSearch() {
        var query = decodeURIComponent(location.search.split("=")[1]);
        searchBox.addEventListener("submit", function (event) {
            event.preventDefault();
        });
        if (!query) {
            return;
        }
        inputFormFromQuery(query);
        blog.findWithTags([query], function (error, postObjects) {
            if (error) {
                return console.error(error);
            }
            renderResult(postObjects);
        });
    }

    startSearch();
})();