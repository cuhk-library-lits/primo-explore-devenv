app.controller('prmExploreMainAfterController', ['$scope', '$timeout', 'IS_PRODUCTION', 'nextPageCtrl', function ($scope, $timeout, IS_PRODUCTION, nextPageCtrl) {
    // Sandbox Label
    $scope.IS_PRODUCTION = IS_PRODUCTION;
    if (!IS_PRODUCTION) {
        angular.element(document).find('body').addClass("body-margin");
    }

    // Infinite Scroll
    angular.element(document).bind('scroll', function () {
        $scope.lastY = nextPageCtrl.lastY;
        var lastItem = angular.element(document.querySelector('div.results-container .last-item'))[0];
        if (!lastItem)
            return;
        var lastItemY = lastItem.offsetTop;

        if ($scope.lastY < lastItemY && window.pageYOffset > lastItemY + 600 - window.innerHeight)
        {
            $scope.lastY = nextPageCtrl.lastY = lastItemY;
            angular.element(document.querySelector('div.results-container button.button-confirm:last-child')).triggerHandler('click');
        }
    });
}]);

app.component('prmExploreMainAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmExploreMainAfterController',
    template: `
        <div ng-if="!IS_PRODUCTION" class="sandbox-label">Sandbox</div>
        `
});
