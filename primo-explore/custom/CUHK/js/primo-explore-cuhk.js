app.controller('prmSearchBarAfterController', [function () {
    var vm = this;
    vm.getSearchText = getSearchText;
    vm.getSearchText2 = getSearchText2;

    function getSearchText() {
        return vm.parentCtrl.mainSearchField;
    }

    function getSearchText2() {
        return vm.parentCtrl.searchService.searchFieldsService._mainSearch;
    }

    function getSortBy() {
        return vm.parentCtrl.sortbyField;
    }
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchBarAfterController',
    template: '<span style="display:none; text-align:center;color:red;background: yellow;">CUHK Login will be under maintenance from Saturday, 30 Sep 7pm to Sunday, 1 Oct 10am. During this period "My Library Record", online renewal and requests will be unavailable.</span>' +
    '<span style="display:block; text-align:right;"><a href="https://julac.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,{{$ctrl.getSearchText()}}&tab=hkall_tab&search_scope=hkall&sortby=rank&vid=CUHK" target="_blank">Search HKALL </a></span>'
});

//////////////////////////////////////////////////
//
// clickable banner with link map
//
//////////////////////////////////////////////////
app.controller('prmLogoAfterController', [function () {
    var vm = this;
    vm.getIconLink = getIconLink;
    function getIconLink() {
        return vm.parentCtrl.iconLink;
    }
}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: '<div class="product-logo product-logo-local" id="banner" tabindex="0"  role="banner">' +
    '<a href="http://librarysearch.lib.cuhk.edu.hk"><img class="logo-image" alt="{{::(&apos;nui.header.LogoAlt&apos; | translate)}}" ng-src="{{$ctrl.getIconLink()}}" usemap="#LogoMap"/>' +
    '<map name="LogoMap" id="LogoMap">' +
    '<area shape="rect" coords="4,14,36,44" href="http://www.cuhk.edu.hk/" target="_new" />' +
    '<area shape="rect" coords="36,14,70,44" href="http://www.lib.cuhk.edu.hk/en" target="_new" />' +
    '<area shape="rect" coords="70,0,240,60" href="https://julac.hosted.exlibrisgroup.com/primo-explore/search?vid=CUHK&tab=default_tab&lang=en_US&sortby=rank" />' +
    '</map>' +
    '</a></div>'
});

//////////////////////////////////////////////////
//
// re-order full display sections
//
//////////////////////////////////////////////////
app.component('prmFullViewAfter', {
    bindings: {
        parentCtrl: '<',
    },
    controller: ['sectionOrdering', function (sectionOrdering) {
        var ctrl = this;
        ctrl.$onInit = function () {
            sectionOrdering(ctrl.parentCtrl.services);
        };
    }]
});

app.factory('sectionOrdering', function () {
    return function (sections) {
        if (!sections) return false;

        var numSections = sections.length;
        if (!(numSections > 0)) return false;


        // Move the 'details' section
        //            var detailsSection = sections.filter(function(s) {return s.serviceName === 'details';} );
        //            if(detailsSection.length >= 1 ) {
        //                sections.splice(sections.indexOf(detailsSection[0]), 1); //remove
        //                sections.splice(1, 0, detailsSection[0]); //add to the end
        //            }


        // Move the 'links' section
        //            var linksSection = sections.filter(function(s) {return s.serviceName === 'links';} );
        //            if(linksSection.length >= 1 ) {
        //                sections.splice(sections.indexOf(linksSection[0]), 1); //remove
        //                sections.splice(1, 0, linksSection[0]); //add to the end
        //            }


        // Move the 'action_list' section to before 'tags' section
        var tagsSection = sections.filter(function (s) { return s.serviceName === 'tags'; });
        var actionSection = sections.filter(function (s) { return s.serviceName === 'action_list'; });
        if (actionSection.length >= 1) {
            sections.splice(sections.indexOf(actionSection[0]), 1); //remove
            sections.splice(sections.indexOf(tagsSection[0]), 0, actionSection[0]); //take Tags Section's position
        }

        // Remove the 'virtualBrowse' section
        //            var linksSection = sections.filter(function(s) {return s.serviceName === 'virtualBrowse';} );
        //            if(linksSection.length >= 1 ) {
        //                sections.splice(sections.indexOf(linksSection[0]), 1); //remove
        //            }

        //for($i=0;$i<=sections.length;$i++){
        //  if(sections[$i].serviceName === 'action_list'){
        //alert($i + " -- " + sections[$i].serviceName);
        //alert($i + " -- " + sections[$i].innerHTML);
        //  }
        //}
        return true;
    };
});

//////////////////////////////////////////////////
//
// permalink
//
//////////////////////////////////////////////////
app.component('prmPermalinkAfter', {
    bindings: {
        parentCtrl: '<',
    },
    controller: ['shortenPermalink', function (shortenPermalink) {
        var vm = this;
        //            ctrl.parentCtrl.permalink = "abc123";
        vm.permalink = "def456";
        vm.getCUHKPermalink = getCUHKPermalink;


        vm.$onInit = function () {
            vm.parentCtrl.permalink = "HELLO onInit";
            //                ctrl.parentCtrl.permalink = "HELLO onInit 2";
            //                ctrl.permalink = "HELLO onInit local";
            shortenPermalink(vm.parentCtrl.permalink);
        };
        vm.parentCtrl.permalink = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

        function getCUHKPermalink() {
            return "http://librarysearch.lib.cuhk.edu.hk/record/" + vm.parentCtrl.getRecordId();
        }
    }],
    //        template: '<span style="display:block; text-align:right;">Permalink template | 1. {{$ctrl.parentCtrl.permalink}} | 2. {{$ctrl.permalink}} | 3. {{$ctrl.parentCtrl.getRecordId()}} </span>'

    template: '<div class="send-actions-content-item-local" layout="row">' +
    '    <md-content layout-wrap layout-padding layout-fill>' +
    '        <div layout="column">' +
    '            <div class="form-focus" layout="row" layout-padding>' +
    '                <div layout-margin layout-fill class="word-break-all"><span id="{{::(\'permalink\'+ $ctrl.parentCtrl.getRecordId())}}" layout-fill>{{$ctrl.getCUHKPermalink()}}</span></div>' +
    '            </div>' +
    '            <div layout="row" layout-align="center center">' +
    '                <prm-copy-clipboard-btn (click)="$ctrl.parentCtrl.selectText();" [text]="$ctrl.getCUHKPermalink()" action="permalink"></prm-copy-clipboard-btn>' +
    '            </div>' +
    '        </div>' +
    '    </md-content>' +
    '</div>'

});

app.factory('shortenPermalink', function () {
    return function (permalink) {
        //            if(!permalink) return false;
        //for($i=0;$i<=actions.length;$i++){
        //alert("permalink testing");
        //alert(permalink);
        //}
        return true;
    };
});

//////////////////////////////////////////////////
//
// View Online
//
//////////////////////////////////////////////////
app.component('prmViewOnlineAfter', {
    bindings: {
        parentCtrl: '<',
    },
    controller: ['prmViewOnlineAfterCtrl', function ($scope, $http) {
        $http.get("").then(function (response) {
            $scope.sfx_content = response.data;
        });

    }],
    //        template: '<span style="display:block; text-align:right;">View Online testing </span>'
});

//////////////////////////////////////////////////
//
// Google Analtytics
//
//////////////////////////////////////////////////
app.component('prmExploreMainAfter', {
    bindings: {
        parentCtrl: '<',
    },
    controller: ['googleAnalytics', function (googleAnalytics) {
        var ctrl = this;
        ctrl.$onInit = function () {
            googleAnalytics();
        };
    }],
    //        template: '<span style="display:block; text-align:right;">This is footer!</span>'+
    //'<script async src="https://www.google-analytics.com/analytics.js"></script>'+
    //'<script async src="custom/CUHK/js/autotrack.js"></script>'

});

app.component('prmSearchResultListAfter', {
    bindings: {
        parentCtrl: '<',
    },
    controller: ['googleAnalytics', function (googleAnalytics) {
        var ctrl = this;
        ctrl.$onInit = function () {
            googleAnalytics();
        };
    }],
    //        template: '<span style="display:block; text-align:right;">facet end</span>'
});

app.factory('googleAnalytics', function () {
    return function () {
        return true;
    };
});

