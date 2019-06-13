window.browzine = {};

app.controller('prmSearchResultAvailabilityLineAfterController', ['$scope', '$element', 'BrowzineIntegrationService', 'ArchivesSpaceIntegrationService', function ($scope, $element, BrowzineIntegrationService, ArchivesSpaceIntegrationService) {
    var ctrl = this;

    // Browzine
    BrowzineIntegrationService.initBrowzine().then(function() {
        browzine.script = document.createElement("script");
        browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
        document.head.appendChild(browzine.script);

        browzine.script.onload = function() {
            window.browzine.primo.searchResult($scope)
        };
    });

    // ArchivesSpace
    var pCtrl = ctrl.parentCtrl;
    ctrl.isFromArchivesSpace = ArchivesSpaceIntegrationService.isFromArchivesSpace(pCtrl.result.pnx);
    if (ctrl.isFromArchivesSpace) {
        ArchivesSpaceIntegrationService.hideDefaultAvailability($element);
        ctrl.handleAvailability = () => {
            var index = null
            if ($scope && $scope.$parent && $scope.$parent.$parent && $scope.$parent.$parent.$ctrl && $scope.$parent.$parent.$ctrl.index) {
                index = $scope.$parent.$parent.$ctrl.index;
            }
            ArchivesSpaceIntegrationService.handleAvailability(index, pCtrl);
        };

        ctrl.availableLocation = ArchivesSpaceIntegrationService.availableLocation;

        ctrl.placeHolders = { idx_0: ``, idx_1: `<span class="best-location-library-code locations-link">` + ctrl.availableLocation + `</span>`, idx_2: `` };
    }
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: `
        <div class="custom-availability-label" ng-if="$ctrl.isFromArchivesSpace">
            <prm-icon availability-type icon-type="svg" svg-icon-set="primo-ui" icon-definition="link">
                <md-icon md-svg-icon="primo-ui:link" alt="" class="md-primoExplore-theme" aria-hidden="true">
                    <svg id="link_cache262" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24" y="528" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"></path>
                    </svg>
                </md-icon>
            </prm-icon>
            <button class="neutralized-button arrow-link-button md-button md-primoExplore-theme md-ink-ripple" ng-click="$ctrl.handleAvailability();$event.preventDefault();">
                <span class="arrow-link-button button-content">
                    <span class="availability-status available_in_institution"
                    translate="delivery.code.available_in_institution"
                    translate-values="$ctrl.placeHolders" 
                    translate-compile="">
                        Available at 
                        <span class="best-location-library-code locations-link">
                            {{$ctrl.availableLocation}}
                        </span>
                    </span>
                </span>
                <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
                    <md-icon md-svg-icon="primo-ui:chevron-right" alt="" class="md-primoExplore-theme" aria-hidden="true">
                        <svg id="chevron-right" width="100%" height="100%" viewBox="0 0 24 24" y="384" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                        </svg>
                    </md-icon>
                </prm-icon>
            </button>
        </div>
        `
});
