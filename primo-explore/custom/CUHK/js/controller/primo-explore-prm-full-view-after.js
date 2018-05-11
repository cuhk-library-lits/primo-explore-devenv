app.controller('prmHkallItemLinkController', ['HKALLItemLinkService', function (HKALLItemLinkService) {
    var ctrl = this;
    if (!HKALLItemLinkService.enabled)
        return;

    ctrl.display = false;
    var itemPnx = ctrl.parentCtrl.parentCtrl.item.pnx;
    if (itemPnx) {
        HKALLItemLinkService.getHkallUrl(itemPnx).then(function(hkallUrl) {
            if (hkallUrl && hkallUrl.length > 0) {
                ctrl.hkallurl = hkallUrl;
                ctrl.display = true;
            }
        });
    }

    ctrl.isDisplay = function () {
        return ctrl.display;
    }
    ctrl.getHkallUrl = function () {
        return ctrl.hkallurl;
    }
}]);

app.component('prmHkallItemLink', {
    bindings: { parentCtrl: '<' },
    controller: 'prmHkallItemLinkController',
    template: `
        <div class="hkallLink" ng-if="$ctrl.isDisplay()">
            <span>
                <a target="_blank" ng-href="{{$ctrl.getHkallUrl()}}">
                    <span translate="nui.custom.view-item-in-hkall">View item in HKALL</span>
                    <md-icon md-svg-icon="primo-ui:open-in-new" alt="" class="md-primoExplore-theme" aria-hidden="true">
                        <svg id="open-in-new_cache269" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                        </svg>
                    </md-icon>
                </a>
            </span>
        </div>
    `
});

/**
 * Insert templates to corresponding positions
 */
app.controller('prmFullViewAfterController', ['$scope', 'FullViewService', function ($scope, FullViewService) {
    // Reorder Sections
    var ctrl = this;
    ctrl.$onInit = function () {
        FullViewService.reorderSections(ctrl.parentCtrl.services);
    };
    // Insert templates into sections
    FullViewService.templateBefore($scope,
        `<prm-hkall-item-link parent-ctrl="$ctrl"></prm-hkall-item-link>`,
        ".full-view-section-content prm-alma-mashup iframe.mashup-iframe[src*='svc_dat=getit']"
    );
}]);

app.component('prmFullViewAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmFullViewAfterController'
});
