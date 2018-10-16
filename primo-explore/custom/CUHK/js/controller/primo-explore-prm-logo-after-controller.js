app.controller('prmLogoAfterController', ['CUHKLibraryLogoService', function (CUHKLibraryLogoService) {
    var ctrl = this;
    CUHKLibraryLogoService.refreshLinks();
    ctrl.showCUHKBranding = () => {
        this.updateBannerStyle();
        return CUHKLibraryLogoService.showCUHKBranding();
    }
    ctrl.showHKALLBranding = () => CUHKLibraryLogoService.showHKALLBranding();
    ctrl.cuhkLink = () => CUHKLibraryLogoService.cuhkLink;
    ctrl.cuhkLibraryLink = () => CUHKLibraryLogoService.cuhkLibraryLink;
    ctrl.cuhkLibrarySearchLink = () => CUHKLibraryLogoService.cuhkLibrarySearchLink;
    ctrl.hkallLink = () => CUHKLibraryLogoService.hkallLink;

    this.updateBannerStyle = function() {
        if (CUHKLibraryLogoService.showHKALLBranding())
            angular.element(document.querySelector('prm-topbar .top-nav-bar')).addClass("hkall");
        else
            angular.element(document.querySelector('prm-topbar .top-nav-bar')).removeClass("hkall");
    }
}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    bindToController: true,
    template: `
        <div class="product-logo-local" role="banner" ng-if="$ctrl.showCUHKBranding()">
            <a ng-href="{{ $ctrl.cuhkLink() }}" target="_new">
                <img class="logo-image" alt="CUHK Logo" ng-src="custom/CUHK/img/cuhk.png" src="custom/CUHK/img/cuhk.png">
            </a>
            <a ng-href="{{ $ctrl.cuhkLibraryLink() }}" target="_new">
                <img class="logo-image condensed" alt="CUHK Library Logo" ng-src="custom/CUHK/img/cuhk_library.png" src="custom/CUHK/img/cuhk_library.png">
            </a>
            <a ng-href="{{ $ctrl.cuhkLibrarySearchLink() }}">
                <div class="logo-text">
                    <span>Library</span>
                    <span><strong>Search</strong></span>
                </div>
            </a>
        </div>
        <div class="product-logo-local" role="banner" ng-if="$ctrl.showHKALLBranding()">
            <a ng-href="{{ $ctrl.hkallLink() }}" target="_new">
                <img class="logo-image hkall-logo" alt="HKALL Logo" ng-src="custom/CUHK/img/hkall-logo.png" src="custom/CUHK/img/hkall-logo.png">
            </a>
        </div>
        `
});