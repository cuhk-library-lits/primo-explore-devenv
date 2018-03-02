app.controller('prmExploreMainAfterController', ['$scope', 'IS_PRODUCTION', function ($scope, IS_PRODUCTION) {
    $scope.IS_PRODUCTION = IS_PRODUCTION;
    if (!IS_PRODUCTION) {
        angular.element(document).find('body').addClass("body-margin");
    }
}]);

app.component('prmExploreMainAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmExploreMainAfterController',
    template: `
        <div ng-if="!IS_PRODUCTION" class="sandbox-label">Sandbox</div>
        `
});
