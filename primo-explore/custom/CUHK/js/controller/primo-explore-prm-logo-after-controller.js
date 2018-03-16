app.controller('prmLogoAfterController', ['CUHKLibraryLogoService', function (CUHKLibraryLogoService) {
    var ctrl = this;
    ctrl.iconLink = ctrl.parentCtrl.iconLink;
    ctrl.hostName = CUHKLibraryLogoService.hostname;
    ctrl.lang = CUHKLibraryLogoService.lang;
    ctrl.cuhkLink = CUHKLibraryLogoService.cuhkLink;
    ctrl.cuhkLibraryLink = CUHKLibraryLogoService.cuhkLibraryLink;
}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: `
        <div class="product-logo-local" id="banner" tabindex="0"  role="banner">
            <img class="logo-image" alt="{{::(&apos;nui.header.LogoAlt&apos; | translate)}}" ng-src="{{ $ctrl.iconLink }}" usemap="#LogoMap"/>
            <map name="LogoMap" id="LogoMap">
                <area shape="rect" coords="0,0,60,60" ng-href="{{ $ctrl.cuhkLink }}" target="_new" />
                <area shape="rect" coords="60,0,106,60" ng-href="{{ $ctrl.cuhkLibraryLink }}" target="_new" />
                <area shape="rect" coords="106,0,200,60" ng-href="{{ $ctrl.hostName }}/primo-explore/search?vid=CUHK&tab=default_tab&lang={{$ctrl.lang}}&sortby=rank" />
            </map>
        </div>
        `
});