app.controller('prmHkallItemLinkController', ['HKALLItemLinkService', function (HKALLItemLinkService) {
    var ctrl = this;
    if (!HKALLItemLinkService.enabled)
        return;

    ctrl.display = false;
    ctrl.hkallurl = null;

    var itemPnx = ctrl.parentCtrl.parentCtrl.item.pnx;
    if (itemPnx) {
        HKALLItemLinkService.getHkallUrl(itemPnx).catch(function() {
            return;
        }).then(function(hkallUrl) {
            if (hkallUrl && hkallUrl.length > 0) {
                ctrl.display = true;
                ctrl.hkallurl = hkallUrl;
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

app.controller('prmHkallItemInstLinkController', ['$window', 'HKALLItemInstLinkService', function ($window, HKALLItemInstLinkService) {
    var ctrl = this;
    if (!HKALLItemInstLinkService.enabled)
        return;

    ctrl.display = false;
    ctrl.instHkallItemUrls = null;

    console.log(ctrl.parentCtrl.parentCtrl.item);
    var itemPnx = ctrl.parentCtrl.parentCtrl.item.pnx;
    if (itemPnx) {
        var instHkallItemUrls = HKALLItemInstLinkService.getHkallInstItemUrls(itemPnx);
        if (instHkallItemUrls && Object.keys(instHkallItemUrls).length > 0) {
            ctrl.display = true;
            ctrl.instHkallItemUrls = instHkallItemUrls;
            console.log(instHkallItemUrls);
        }
    }

    ctrl.isDisplay = function () {
        return ctrl.display;
    }
    ctrl.getInstList = function () {
        return Object.keys(instHkallItemUrls);
    }
    ctrl.openHkallInstItemUrl = function (instCode) {
        $window.open(ctrl.instHkallItemUrls[instCode]);
    }
}]);

app.component('prmHkallItemInstLink', {
    bindings: { parentCtrl: '<' },
    controller: 'prmHkallItemInstLinkController',
    template: `
        <div class="inst-hkall-link" ng-if="$ctrl.isDisplay()">
            <h3 class="medium-uppercase-bold">
                <span>Availability at other HKALL institutions</span>
            </h3>
            <md-list role="list" class="md-primoExplore-theme">
                <md-list-item class="md-2-line separate-list-items narrow-list-item _md" ng-repeat="instCode in $ctrl.getInstList()" role="listitem">
                    <button class="neutralized-button layout-full-width layout-display-flex md-button md-primoExplore-theme md-ink-ripple" type="button" (click)="$ctrl.openHkallInstItemUrl(instCode)">
                        <div layout="row" flex="100" layout-align="space-between center" class="layout-align-space-between-center layout-row flex-100">
                            <div class="md-list-item-text">
                                <h3 translate="{{instCode}}">{{instCode}}</h3>
                                <p>
                                    <span class="availability-status available" translate="fulldisplay.availabilty.available">
                                        Available
                                    </span>
                                </p>
                            </div>
                            <prm-icon icon-type="svg" svg-icon-set="hardware" icon-definition="ic_keyboard_arrow_right_24px">
                                <md-icon md-svg-icon="hardware:ic_keyboard_arrow_right_24px" alt="" class="md-primoExplore-theme" aria-hidden="true">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" id="ic_keyboard_arrow_right_24px" y="312" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
                                    </svg>
                                </md-icon>
                                <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
                            </prm-icon>
                        </div>
                        <div class="md-ripple-container" style=""></div>
                    </button>
                </md-list-item>
            </md-list>
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

    FullViewService.templateAfter($scope,
        `<prm-hkall-item-inst-link parent-ctrl="$ctrl"></prm-hkall-item-inst-link>`,
        ".full-view-section-content prm-alma-mashup iframe.mashup-iframe[src*='svc_dat=viewit']"
    );
}]);

app.component('prmFullViewAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmFullViewAfterController'
});
