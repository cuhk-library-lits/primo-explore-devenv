function SearchScopeLinkService($location) {

    this.getSearchScopeLink = function (searchText, displayHkallScope) {
        if (!searchText || searchText.length <= 0)
            searchText = "";
        var query = "any,contains," + searchText;
        var vid = $location.search().vid;
        var sortby = $location.search().sortby;
        var lang = $location.search().lang;
        var tab = "default_tab";
        var search_scope = "All";

        if (displayHkallScope) {
            var tab = "hkall_tab";
            var search_scope = "hkall";
        }

        return  "/primo-explore/search?" +
            "query=" + query +
            "&vid=" + vid +
            "&tab=" + tab +
            "&search_scope=" + search_scope +
            "&sortby=" + sortby +
            "&lang=" + lang;
    }

    this.displayHkallScope = function () {
        return !($location.search().tab == "hkall_tab");
    }
}

app.service('SearchScopeLinkService', ['$location', SearchScopeLinkService]);