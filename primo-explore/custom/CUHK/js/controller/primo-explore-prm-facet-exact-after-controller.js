app.controller('prmFacetExactAfterController', ['FacetCountLimitService', function (FacetCountLimitService) {
    var ctrl = this;
    var facetLimitCount = FacetCountLimitService.facetLimitCount;
    var facetLimitLabel = FacetCountLimitService.facetLimitLabel;

    ctrl.facetLimitCount = facetLimitCount;
    ctrl.facetLimitLabel = facetLimitLabel;
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
        <span class="facet-limit-label" ng-if="$ctrl.showFacetLimitCount">{{$ctrl.facetLimitLabel}}</span>
        `
});