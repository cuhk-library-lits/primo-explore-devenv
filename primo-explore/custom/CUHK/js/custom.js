(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']).constant('IS_PRODUCTION', window.location.hostname == 'julac.hosted.exlibrisgroup.com' ? true : false);

var browzine = {
    api: "https://api.thirdiron.com/public/v1/libraries/946",
    apiKey: "5c204fa3-5823-4264-9faa-e3fb48881571",
    primoJournalBrowZineWebLinkText: "View Journal Contents",
    primoArticleBrowZineWebLinkText: "View Issue Contents"
};

angular.module('viewCustom').constant("api", browzine.api).constant("apiKey", browzine.apiKey);

// Copied from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js

// Add Article In Context & BrowZine Links
app.controller('prmSearchResultAvailabilityLineAfterController', function ($scope, $http, api, apiKey) {
    var vm = this;
    $scope.primoJournalBrowZineWebLinkText = browzine.primoJournalBrowZineWebLinkText || "View Journal Contents";
    $scope.primoArticleBrowZineWebLinkText = browzine.primoArticleBrowZineWebLinkText || "View Issue Contents";
    $scope.book_icon = "https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png";
    if (vm.parentCtrl.result.pnx.addata.doi && vm.parentCtrl.result.pnx.display.type[0] == 'article') {
        vm.doi = vm.parentCtrl.result.pnx.addata.doi[0] || '';
        var endpoint = api + "/articles/doi/" + vm.doi + "?include=journal" + "&access_token=" + apiKey;
        $http.get(endpoint).then(function (response) {
            $scope.article = response.data;
        }, function (error) {
            console.log(error);
        });
    }
    if (vm.parentCtrl.result.pnx.addata.issn && vm.parentCtrl.result.pnx.display.type[0] == 'journal') {
        vm.issn = vm.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
        var endpoint = api + "/search?issns=" + vm.issn + "&access_token=" + apiKey;
        $http.get(endpoint).then(function (response) {
            $scope.journal = response.data;
        }, function (error) {
            console.log(error);
        });
    }
});

// Below is where you can customize the wording that is displayed (as well as the hover over text) for the BrowZine links.
// St Olaf has chosen "View Journal Contents" for the "Journal Availability Link" but other great options include things such as "View Journal" or "View this Journal"
// St Olaf is using "View Issue Contents" for the "Article in Context" link but another great option is "View Complete Issue" or "View Article in Context".
// St Olaf also has added a hover over link that says "Via BrowZine" to emphasize the interaction being used.

app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: '<div ng-if="article.data.browzineWebLink"><a href="{{ article.data.browzineWebLink }}" target="_blank" title="Via BrowZine"><img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon"> {{primoArticleBrowZineWebLinkText}} <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link"><svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg></md-icon></a></div><div ng-if="journal.data[0].browzineWebLink"><a href="{{ journal.data[0].browzineWebLink }}" target="_blank" title="Via BrowZine"><img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon"> {{primoJournalBrowZineWebLinkText}} <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link"><svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg></md-icon></a></div>'
});

// Add Journal Cover Images from BrowZine
app.controller('prmSearchResultThumbnailContainerAfterController', function ($scope, $http, api, apiKey) {
    var vm = this;
    var newThumbnail = '';
    // checking for item property as this seems to impact virtual shelf browse (for reasons as yet unknown)
    if (vm.parentCtrl.item && vm.parentCtrl.item.pnx.addata.issn) {
        vm.issn = vm.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
        var endpoint = api + "/search?issns=" + vm.issn + "&access_token=" + apiKey;
        $http.get(endpoint).then(function (response) {
            if (response.data.data["0"] && response.data.data["0"].browzineEnabled) {
                newThumbnail = response.data.data["0"].coverImageUrl;
            }
        }, function (error) {
            console.log(error); //
        });
    }
    vm.$doCheck = function (changes) {
        if (vm.parentCtrl.selectedThumbnailLink) {
            if (newThumbnail != '') {
                vm.parentCtrl.selectedThumbnailLink.linkURL = newThumbnail;
            }
        }
    };
});

app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmSearchResultThumbnailContainerAfterController'
});

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
    template: '<span style="display:none; text-align:center;color:red;background: yellow;">CUHK Login will be under maintenance from Saturday, 30 Sep 7pm to Sunday, 1 Oct 10am. During this period "My Library Record", online renewal and requests will be unavailable.</span>' + '<span style="display:block; text-align:right;"><a href="https://julac.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,{{$ctrl.getSearchText()}}&tab=hkall_tab&search_scope=hkall&sortby=rank&vid=CUHK" target="_blank">Search HKALL </a></span>'
});

//////////////////////////////////////////////////
//
// clickable banner with link map
//
//////////////////////////////////////////////////
app.controller('prmLogoAfterController', ['$location', function ($location) {
    this.hostName = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    this.lang = $location.search().lang;
    this.iconLink = this.parentCtrl.iconLink;
    this.cuhkLink = "http://www.cuhk.edu.hk/";
    this.cuhkLibraryLink = "http://www.lib.cuhk.edu.hk/en";
    switch (this.lang) {
        case "zh_TW":
            this.cuhkLink = "http://www.cuhk.edu.hk/chinese/index.html";
            this.cuhkLibraryLink = "http://www.lib.cuhk.edu.hk/tc";
            break;
        case "zh_CN":
            this.cuhkLink = "http://translate.itsc.cuhk.edu.hk/uniTS/www.cuhk.edu.hk/chinese/index.html";
            this.cuhkLibraryLink = "http://www.lib.cuhk.edu.hk/sc";
            break;
    }
}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: '\n        <div class="product-logo product-logo-local" id="banner" tabindex="0"  role="banner">\n            <a href="http://librarysearch.lib.cuhk.edu.hk">\n                <img class="logo-image" alt="{{::(&apos;nui.header.LogoAlt&apos; | translate)}}" ng-src="{{$ctrl.iconLink}}" usemap="#LogoMap"/>\n                <map name="LogoMap" id="LogoMap">\n                    <area shape="rect" coords="4,14,36,44" ng-href="{{$ctrl.cuhkLink}}" target="_new" />\n                    <area shape="rect" coords="36,14,70,44" ng-href="{{$ctrl.cuhkLibraryLink}}" target="_new" />\n                    <area shape="rect" coords="70,0,240,60" ng-href="{{$ctrl.hostName}}/primo-explore/search?vid=CUHK&tab=default_tab&lang={{$ctrl.lang}}&sortby=rank" />\n                </map>\n            </a>\n        </div>\n        <div ng-if="!IS_PRODUCTION" class="sandbox-label">Sandbox</div>\n        '
});

//////////////////////////////////////////////////
//
// re-order full display sections
//
//////////////////////////////////////////////////
app.component('prmFullViewAfter', {
    bindings: {
        parentCtrl: '<'
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
        var tagsSection = sections.filter(function (s) {
            return s.serviceName === 'tags';
        });
        var actionSection = sections.filter(function (s) {
            return s.serviceName === 'action_list';
        });
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
        parentCtrl: '<'
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

    template: '<div class="send-actions-content-item-local" layout="row">' + '    <md-content layout-wrap layout-padding layout-fill>' + '        <div layout="column">' + '            <div class="form-focus" layout="row" layout-padding>' + '                <div layout-margin layout-fill class="word-break-all"><span id="{{::(\'permalink\'+ $ctrl.parentCtrl.getRecordId())}}" layout-fill>{{$ctrl.getCUHKPermalink()}}</span></div>' + '            </div>' + '            <div layout="row" layout-align="center center">' + '                <prm-copy-clipboard-btn (click)="$ctrl.parentCtrl.selectText();" [text]="$ctrl.getCUHKPermalink()" action="permalink"></prm-copy-clipboard-btn>' + '            </div>' + '        </div>' + '    </md-content>' + '</div>'

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
        parentCtrl: '<'
    },
    controller: ['prmViewOnlineAfterCtrl', function ($scope, $http) {
        $http.get("").then(function (response) {
            $scope.sfx_content = response.data;
        });
    }]
    //        template: '<span style="display:block; text-align:right;">View Online testing </span>'
});

//////////////////////////////////////////////////
//
// Google Analtytics
//
//////////////////////////////////////////////////
app.component('prmExploreMainAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: ['googleAnalytics', function (googleAnalytics) {
        var ctrl = this;
        ctrl.$onInit = function () {
            googleAnalytics();
        };
    }]
    //        template: '<span style="display:block; text-align:right;">This is footer!</span>'+
    //'<script async src="https://www.google-analytics.com/analytics.js"></script>'+
    //'<script async src="custom/CUHK/js/autotrack.js"></script>'

});

app.component('prmSearchResultListAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: ['googleAnalytics', function (googleAnalytics) {
        var ctrl = this;
        ctrl.$onInit = function () {
            googleAnalytics();
        };
    }]
    //        template: '<span style="display:block; text-align:right;">facet end</span>'
});

app.factory('googleAnalytics', function () {
    return function () {
        return true;
    };
});
})();