app.controller('prmLogoAfterController', ['$location', function ($location) {
    this.hostName = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    this.lang = $location.search().lang;
    this.iconLink = this.parentCtrl.iconLink;
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
}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: `
        <div class="product-logo-local" id="banner" tabindex="0"  role="banner">
            <img class="logo-image" alt="{{::(&apos;nui.header.LogoAlt&apos; | translate)}}" ng-src="{{$ctrl.iconLink}}" usemap="#LogoMap"/>
            <map name="LogoMap" id="LogoMap">
                <area shape="rect" coords="0,0,60,60" ng-href="{{$ctrl.cuhkLink}}" target="_new" />
                <area shape="rect" coords="60,0,106,60" ng-href="{{$ctrl.cuhkLibraryLink}}" target="_new" />
                <area shape="rect" coords="106,0,200,60" ng-href="{{$ctrl.hostName}}/primo-explore/search?vid=CUHK&tab=default_tab&lang={{$ctrl.lang}}&sortby=rank" />
            </map>
        </div>
        `
});