app.controller('prmFacetExactAfterController', ['FacetCountLimitService', function (FacetCountLimitService) {
    var ctrl = this;
    var facetLimitCount = FacetCountLimitService.facetLimitCount;

    ctrl.facetLimitCount = facetLimitCount;
    
    var facetGroup = ctrl.parentCtrl.facetGroup;
    if (facetGroup && facetGroup.values && facetGroup.values.length > facetLimitCount) {
        facetGroup.values.splice(facetLimitCount, facetGroup.values.length - facetLimitCount);
    }
}]);

app.component('prmFacetExactAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmFacetExactAfterController'
});