app.controller('prmExploreMainAfterController', ['$scope', 'IS_PRODUCTION', 'nextPageCtrl', function ($scope, IS_PRODUCTION, nextPageCtrl) {
    // Sandbox Label
    $scope.IS_PRODUCTION = IS_PRODUCTION;
    if (!IS_PRODUCTION) {
        angular.element(document).find('body').addClass("body-margin");
    }

    var scrollSnapFacet;
    var scrollLimitY;
    angular.element(document).bind('scroll', function () {
        var scrollSnapY = IS_PRODUCTION ? 195 : 215;

        // Scroll snap for sticky facet
        clearTimeout(scrollSnapFacet);
        scrollSnapFacet = setTimeout(function () {
            if (window.pageYOffset > (scrollSnapY - 100) && window.pageYOffset < (scrollSnapY + 100))
                window.scrollTo(0, scrollSnapY);
        }, 100);
        

        // Infinite Scroll
        var loadMoreButton = angular.element(document.querySelector('div .results-container .md-button.button-confirm:last-child'))[0];
        if (!loadMoreButton)
            return;
        
        var viewPortHeight = (window.innerHeight || document.documentElement.clientHeight);
        var buttonBottomY = loadMoreButton.getBoundingClientRect().bottom - viewPortHeight + 80;
        if (buttonBottomY >= 0)
            nextPageCtrl.scrollYLimit = window.pageYOffset;

        if (buttonBottomY <= 0)
            window.scrollTo(0, nextPageCtrl.scrollYLimit);

        clearTimeout(scrollLimitY);
        scrollLimitY = setTimeout(function() {
            if (nextPageCtrl.debounce)
            {
                if (buttonBottomY > 10)
                    nextPageCtrl.debounce = false;
            }
            else
            {
                if (buttonBottomY <= 10)
                {
                    nextPageCtrl.debounce = true;
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
