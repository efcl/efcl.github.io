var blog = {};
blog = (function () {
    "use strict";
    function getIndexFile(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/index.json", true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    var json = JSON.parse(xhr.responseText);
                    callback(null, json);
                } catch (error) {
                    callback(error);
                }
            } else {
                callback(new Error(xhr.statusText))
            }
        };
        xhr.onerror = function (error) {
            callback(new Error(xhr.statusText));
        };
        xhr.send(null);
    }

    function findWithTags(tags, callback) {
        getIndexFile(function (error, tagObjectList) {
            if (error) {
                return callback(error);
            }
            // tagsを含んでいるかどうか
            var matchTagObjects = tagObjectList.filter(function (object) {
                return tags.some(function (searchTag) {
                    var regExp = new RegExp(searchTag, "i");
                    var tagSearchResult = object.tags.some(function (targetTag) {
                        return regExp.test(targetTag);
                    });
                    var titleSearchResult = regExp.test(object.title);
                    return titleSearchResult || tagSearchResult;
                });
            });
            callback(null, matchTagObjects);
        });
    }

    function buildPostList(postObjects) {
        var ulTag = document.createElement("ul");
        for (var i = 0; i < postObjects.length; i++) {
            var postObject = postObjects[i];
            var liTag = document.createElement("li");
            var aTag = document.createElement("a");
            aTag.href = postObject.url;
            aTag.textContent = postObject.title;
            liTag.appendChild(aTag);
            ulTag.appendChild(liTag);
        }
        return ulTag;
    }

    return {
        findWithTags: findWithTags,
        buildPostList: buildPostList
    };
})();