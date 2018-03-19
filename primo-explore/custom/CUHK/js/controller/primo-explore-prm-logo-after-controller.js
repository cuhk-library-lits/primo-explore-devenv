app.controller('prmLogoAfterController', ['CUHKLibraryLogoService', function (CUHKLibraryLogoService) {
    var ctrl = this;
    CUHKLibraryLogoService.refreshLinks();
    ctrl.cuhkLink = CUHKLibraryLogoService.cuhkLink;
    ctrl.cuhkLibraryLink = CUHKLibraryLogoService.cuhkLibraryLink;
    ctrl.cuhkLibrarySearchLink = CUHKLibraryLogoService.cuhkLibrarySearchLink;
}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: `
        <div class="product-logo-local" id="banner" tabindex="0"  role="banner">
            <a ng-href="{{ $ctrl.cuhkLink }}" target="_new">
                <img class="logo-image" alt="CUHK Logo" ng-src="custom/CUHK/img/cuhk.png" src="custom/CUHK/img/cuhk.png">
            </a>
            <a ng-href="{{ $ctrl.cuhkLibraryLink }}" target="_new">
                <img class="logo-image condensed" alt="CUHK Library Logo" ng-src="custom/CUHK/img/cuhk_library.png" src="custom/CUHK/img/cuhk_library.png">
            </a>
            <a ng-href="{{ $ctrl.cuhkLibrarySearchLink }}">
                <div class="logo-text">
                    <span>Library</span>
                    <span><strong>Search</strong></span>
                </div>
            </a>
        </div>
        `
});