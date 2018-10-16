function SearchScopeService($location) {
    this.CUHK_TAB_VALUE = "default_tab";
    this.CUHK_DEFAULT_SCOPE_VALUE = "All";
    this.HKALL_TAB_VALUE = "hkall_tab";
    this.HKALL_DEFAULT_SCOPE_VALUE = "HKALL_PTP2";

    this.enabledPaths = ["/search", "/fulldisplay"];
    this.currentTab;

    this.getCurrentTab = () => {
        if (!this.currentTab)
            this.currentTab = $location.search().tab || this.CUHK_TAB_VALUE;
        if (!this.enabledPaths.includes($location.path()))
            this.currentTab = this.CUHK_TAB_VALUE;
        return this.currentTab;
    }

    this.refreshScope = (selectedScope) => {
        if (selectedScope)
            this.currentTab = selectedScope;
    }

    this.currentScopeIsCUHK = () => {
        return (this.getCurrentTab() === this.CUHK_TAB_VALUE);
    }

    this.getSearchScopeLink = (searchText, scopeIsCUHK) => {
        var query = "";
        if (searchText && searchText.length > 0)
            query = "any,contains," + searchText;
        var vid = $location.search().vid;
        var sortby = $location.search().sortby;
        var lang = $location.search().lang;
        var tab = this.CUHK_TAB_VALUE;
        var search_scope = this.CUHK_DEFAULT_SCOPE_VALUE;

        if (scopeIsCUHK) {
            var tab = this.HKALL_TAB_VALUE;
            var search_scope = this.HKALL_DEFAULT_SCOPE_VALUE;
        }

        return  "/primo-explore/search?" + 
            ((query.length > 0) ? ("query=" + query) : "") +
            "&vid=" + vid +
            "&tab=" + tab +
            "&search_scope=" + search_scope +
            "&sortby=" + sortby +
            "&lang=" + lang;
    }
}

app.service('SearchScopeService', ['$location', SearchScopeService]);