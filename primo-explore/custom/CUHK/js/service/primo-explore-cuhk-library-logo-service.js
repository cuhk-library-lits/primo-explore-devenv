function CUHKLibraryLogoService($location) {
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
}

app.service('CUHKLibraryLogoService', ['$location', CUHKLibraryLogoService]);