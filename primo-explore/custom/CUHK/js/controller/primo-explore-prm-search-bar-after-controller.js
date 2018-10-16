app.controller('prmSearchBarAfterController', ['SearchScopeService', function (SearchScopeService) {
    var ctrl = this;

    ctrl.parentCtrl.showTabsAndScopes = true; // Show tabs and scopes dropdowns

    var _primoSwitchAdvancedSearchHandler = ctrl.parentCtrl.switchAdvancedSearch;
    ctrl.parentCtrl.switchAdvancedSearch = function () {
        ctrl.parentCtrl.selectedTab = SearchScopeService.getCurrentTab();
        SearchScopeService.refreshScope(ctrl.parentCtrl.selectedTab);
        if (SearchScopeService.currentScopeIsCUHK() && ctrl.parentCtrl.scopeField == SearchScopeService.HKALL_DEFAULT_SCOPE_VALUE)
            ctrl.parentCtrl.scopeField = SearchScopeService.CUHK_DEFAULT_SCOPE_VALUE;
        else if (!SearchScopeService.currentScopeIsCUHK() && ctrl.parentCtrl.scopeField != SearchScopeService.HKALL_DEFAULT_SCOPE_VALUE)
            ctrl.parentCtrl.scopeField = SearchScopeService.HKALL_DEFAULT_SCOPE_VALUE
        
        // Call Primo original handler
        _primoSwitchAdvancedSearchHandler.apply(this);

    }

    ctrl.getAltSearchScopeLink = function () {
        var searchText = ctrl.parentCtrl.mainSearchField;
        return SearchScopeService.getSearchScopeLink(searchText, SearchScopeService.currentScopeIsCUHK());
    }

    ctrl.getAltSearchScopeCssClass = function () {
        if (SearchScopeService.currentScopeIsCUHK())
            return "search-bar-hkall";
        return "search-bar-cuhk-library-search";
    }

    ctrl.displayHkallScopeLink = function () {
        return SearchScopeService.currentScopeIsCUHK();
    }
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchBarAfterController',
    template: `
        <div class="search-bar-scope-link" ng-class="$ctrl.getAltSearchScopeCssClass()">
            <a ng-href="{{ $ctrl.getAltSearchScopeLink() }}" target="_blank">
                <span ng-if="$ctrl.displayHkallScopeLink()">
                    <span translate="nui.custom.search-in-hkall">
                        Search in HKALL
                    </span>
                </span>
                <span ng-if="$ctrl.displayHkallScopeLink()==false">
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