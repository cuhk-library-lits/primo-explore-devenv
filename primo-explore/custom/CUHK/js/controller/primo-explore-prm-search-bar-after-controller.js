app.controller('prmSearchBarAfterController', ['$location', function ($location) {
    var ctrl = this;
    ctrl.getSearchText = getSearchText;
    ctrl.getSearchText2 = getSearchText2;

    function getSearchText() {
        return ctrl.parentCtrl.mainSearchField;
    }

    function getSearchText2() {
        return ctrl.parentCtrl.searchService.searchFieldsService._mainSearch;
    }

    function getSortBy() {
        return ctrl.parentCtrl.sortbyField;
    }

    ctrl.display = function () {
        var currentTab = $location.search().tab;
        return (currentTab != "hkall_tab");
    }
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchBarAfterController',
    template: `
        <div class="search-bar-hkall" ng-if="$ctrl.display()">
            <a href="/primo-explore/search?query=any,contains,{{$ctrl.getSearchText()}}&tab=hkall_tab&search_scope=hkall&sortby=rank&vid=CUHK" target="_blank">
                Search in HKALL
                <md-icon md-svg-icon="primo-ui:open-in-new" alt="" class="md-primoExplore-theme" aria-hidden="true">
                    <svg id="open-in-new_cache269" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                    </svg>
                </md-icon>
            </a>
        </div>
        <div class="search-bar-hkall-hidden" ng-if="$ctrl.display()==false">
        </div>
    `
});