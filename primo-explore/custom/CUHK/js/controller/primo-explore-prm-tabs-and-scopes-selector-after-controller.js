app.controller('prmTabsAndScopesSelectorAfterController', ['SearchScopeService', function (SearchScopeService) {
    var vm = this;

    var _primoTabChangeHandler = vm.parentCtrl.onTabChange;
    vm.parentCtrl.onTabChange = function() {
        var selectedTab = vm.parentCtrl.selectedTab;
        SearchScopeService.refreshScope(selectedTab);

        // Call Primo original handler
        _primoTabChangeHandler.apply(this);
    }
}]);

app.component('prmTabsAndScopesSelectorAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmTabsAndScopesSelectorAfterController'
});