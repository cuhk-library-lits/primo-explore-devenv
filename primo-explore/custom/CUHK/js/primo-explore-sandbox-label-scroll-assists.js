app.controller('prmExploreMainAfterController', ['$scope', 'IS_PRODUCTION', 'nextPageCtrl', function ($scope, IS_PRODUCTION, nextPageCtrl) {
    // Sandbox Label
    $scope.IS_PRODUCTION = IS_PRODUCTION;
    if (!IS_PRODUCTION) {
        angular.element(document).find('body').addClass("body-margin");
    }

    var debounce;
    angular.element(document).bind('scroll', function () {
        var scrollSnapY = IS_PRODUCTION ? 195 : 215;

        clearTimeout(debounce);
        debounce = setTimeout(function() {
            // Scroll snap for sticky facet
            if (window.pageYOffset > (scrollSnapY - 100) && window.pageYOffset < (scrollSnapY + 100))
                window.scrollTo(0, scrollSnapY);

            // Infinite Scroll
            var lastItem = angular.element(document.querySelector('div .results-container .last-item'))[0];
            if (!lastItem)
                return;
            
            var lastItemY = lastItem.offsetTop;
            if (nextPageCtrl.busy)
            {
                if (nextPageCtrl.lastY < lastItemY)
                    nextPageCtrl.busy = false;
            }
            else
            {
                if (nextPageCtrl.lastY >= lastItemY)
                    nextPageCtrl.lastY = 0;
                if (nextPageCtrl.lastY < lastItemY && window.pageYOffset > lastItemY + 600 - window.innerHeight)
                {
                    nextPageCtrl.busy = true;
                    nextPageCtrl.lastY = lastItemY;
                    angular.element(document.querySelector('div .results-container .md-button.button-confirm:last-child')).triggerHandler('click');
                }
            }
        }, 100);
    });
}]);

app.component('prmExploreMainAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmExploreMainAfterController',
    template: `
        <div ng-if="!IS_PRODUCTION" class="sandbox-label">Sandbox</div>
        `
});
