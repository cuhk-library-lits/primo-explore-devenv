app.controller('prmAdvancedSearchAfterController', ['SearchScopeService', function (SearchScopeService) {
    var ctrl = this;
    var _primoChangeSearchFieldsHandler = ctrl.parentCtrl.changeSearchFields;
    
    ctrl.parentCtrl.changeSearchFields = function() {
        var selectedTab = ctrl.parentCtrl.selectedSearchTab;
        SearchScopeService.refreshScope(selectedTab);
        
        // Call Primo original handler
        _primoChangeSearchFieldsHandler.apply(this);
    }
}]);

app.component('prmAdvancedSearchAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAdvancedSearchAfterController'
});