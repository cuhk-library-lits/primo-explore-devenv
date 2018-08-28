/**
 * BrowZine - Primo Integration
 */
window.browzine = {};

app.controller('prmSearchResultAvailabilityLineAfterController', ['$scope', 'BrowzineIntegrationService', function ($scope, BrowzineIntegrationService) {
    BrowzineIntegrationService.initBrowzine().then(function() {
        browzine.script = document.createElement("script");
        browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
        document.head.appendChild(browzine.script);

        browzine.script.onload = function() {
            window.browzine.primo.searchResult($scope)
        };
    })
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
});
