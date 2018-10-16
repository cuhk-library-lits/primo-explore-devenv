function CUHKLibraryLogoService($location, SearchScopeService) {
    this.hostName;
    this.lang;
    this.cuhkLink;
    this.cuhkLibraryLink;
    this.cuhkLibrarySearchLink;
    this.hkallLink;

    this.refreshLinks = () => {
        this.hostName = $location.protocol() + "://" + $location.host() + ":" + $location.port();
        this.lang = $location.search().lang;
        this.cuhkLink = "http://www.cuhk.edu.hk/";
        this.cuhkLibraryLink = "http://www.lib.cuhk.edu.hk/en";
        switch (this.lang) {
            case "zh_TW":
                this.cuhkLink = "http://www.cuhk.edu.hk/chinese/index.html";
                this.cuhkLibraryLink = "http://www.lib.cuhk.edu.hk/tc";
                break;
            case "zh_CN":
                this.cuhkLink = "http://translate.itsc.cuhk.edu.hk/uniTS/www.cuhk.edu.hk/chinese/index.html";
                this.cuhkLibraryLink = "http://www.lib.cuhk.edu.hk/sc";
                break;
        }
        this.cuhkLibrarySearchLink = this.hostName + "/primo-explore/search?vid=CUHK&tab=default_tab&lang=" + this.lang + "&sortby=rank";
        this.hkallLink = this.hostName + "/primo-explore/search?vid=HKALL&sortby=rank&lang=en_US";
    }

    this.showCUHKBranding = () => SearchScopeService.currentScopeIsCUHK();

    this.showHKALLBranding = () => !SearchScopeService.currentScopeIsCUHK();
}

app.service('CUHKLibraryLogoService', ['$location', 'SearchScopeService', CUHKLibraryLogoService]);