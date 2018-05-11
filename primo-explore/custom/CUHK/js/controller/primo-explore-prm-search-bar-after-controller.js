app.controller('prmSearchBarAfterController', ['SearchScopeLinkService', function (SearchScopeLinkService) {
    var ctrl = this;

    ctrl.getAltSearchScopeLink = function () {
        var searchText = ctrl.parentCtrl.mainSearchField;
        return SearchScopeLinkService.getSearchScopeLink(searchText, SearchScopeLinkService.displayHkallScope());
    }

    ctrl.getAltSearchScopeCssClass = function () {
        if (SearchScopeLinkService.displayHkallScope())
            return "search-bar-hkall";
        return "search-bar-cuhk-library-search";
    }

    ctrl.displayHkallScope = function () {
        return SearchScopeLinkService.displayHkallScope();
    }
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchBarAfterController',
    template: `
        <div class="search-bar-scope-link" ng-class="$ctrl.getAltSearchScopeCssClass()">
            <a ng-href="{{ $ctrl.getAltSearchScopeLink() }}" target="_blank">
                <span ng-if="$ctrl.displayHkallScope()">
                    <span translate="nui.custom.search-in-hkall">
                        Search in HKALL
                    </span>
                </span>
                <span ng-if="$ctrl.displayHkallScope()==false">
                    <span translate="nui.custom.search-in-cuhk">
                        Search in CUHK
                    </span>
                </span>
                <md-icon md-svg-icon="primo-ui:open-in-new" alt="" class="md-primoExplore-theme" aria-hidden="true">
                    <svg id="open-in-new_cache269" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                    </svg>
                </md-icon>
            </a>
        </div>
    `
});