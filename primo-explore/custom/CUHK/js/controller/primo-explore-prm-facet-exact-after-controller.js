app.controller('prmFacetExactAfterController', ['FacetCountLimitService', function (FacetCountLimitService) {
    var ctrl = this;
    var facetLimitCount = FacetCountLimitService.facetLimitCount;

    ctrl.facetLimitCount = facetLimitCount;
    ctrl.showFacetLimitCount = false;
    
    var facetGroup = ctrl.parentCtrl.facetGroup;
    if (facetGroup && facetGroup.values && facetGroup.values.length > facetLimitCount) {
        facetGroup.values.splice(facetLimitCount, facetGroup.values.length - facetLimitCount);
        ctrl.showFacetLimitCount = true;
    }
}]);

app.component('prmFacetExactAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmFacetExactAfterController',
    template: `
        <div class="facet-limit-label" ng-if="$ctrl.showFacetLimitCount">(Top {{$ctrl.facetLimitCount}})</div>
        `
});