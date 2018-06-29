(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

//        var app = angular.module('centralCustom', ['angularLoad']);

    /****************************************************************************************************/


alert("CUHK Library testing 00");



})




//////////////////////////////////////////////////
//
// search HKALL
//
//////////////////////////////////////////////////

var app = angular.module('viewCustom', ['angularLoad']);


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
 
app.component('prmSearchBarAfter',{
  bindings: {parentCtrl: '<'},
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
 
app.component('prmLogoAfter',{
  bindings: {parentCtrl: '<'},
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
        controller: ['sectionOrdering', function(sectionOrdering) {
            var ctrl = this;
            ctrl.$onInit = function () {
                sectionOrdering(ctrl.parentCtrl.services);
            };
        }]
});


app.factory('sectionOrdering', function() {
        return function (sections) {
            if(!sections) return false;
 
            var numSections = sections.length;
            if(!(numSections > 0)) return false;
 
 
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
            var tagsSection = sections.filter(function(s) {return s.serviceName === 'tags';} );
            var actionSection = sections.filter(function(s) {return s.serviceName === 'action_list';} );
            if(actionSection.length >= 1 ) {
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
        controller: ['shortenPermalink', function(shortenPermalink) {
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


app.factory('shortenPermalink', function() {
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
        controller: ['prmViewOnlineAfterCtrl', function($scope, $http) {
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
        controller: ['googleAnalytics', function(googleAnalytics) {
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
        controller: ['googleAnalytics', function(googleAnalytics) {
            var ctrl = this;
            ctrl.$onInit = function () {    
                googleAnalytics();
            };
        }],
//        template: '<span style="display:block; text-align:right;">facet end</span>'

});

app.factory('googleAnalytics', function() {
        return function () {

// alert("footer for GA");
 
            return true;
        };
});


var FACET_LIMIT_COUNT = 20;

function FacetCountLimitService($document) {
    this.facetLimitCount = FACET_LIMIT_COUNT;
}

app.service('FacetCountLimitService', ['$document', FacetCountLimitService]);


app.controller('prmFacetExactAfterController', ['FacetCountLimitService', function (FacetCountLimitService) {
    var ctrl = this;
    var facetLimitCount = FacetCountLimitService.facetLimitCount;

    ctrl.facetLimitCount = facetLimitCount;
    ctrl.showFacetLimitCount = false;

    var facetGroup = ctrl.parentCtrl.facetGroup;
    if (facetGroup && facetGroup.values && facetGroup.values.length > facetLimitCount) {
        facetGroup.values.splice(facetLimitCount, facetGroup.values.length - facetLimitCount);
        ctrl.showFacetLimitCount = true;
    }
}]);

app.component('prmFacetExactAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmFacetExactAfterController',
    template: `
        <span class="facet-limit-label" ng-if="$ctrl.showFacetLimitCount">
            <span translate="nui.custom.facet-limit-label-prefix">* Only top </span>
            {{$ctrl.facetLimitCount}}
            <span translate="nui.custom.facet-limit-label-suffix"> entries are displayed</span>
        </span>
    `
});

/**
 * Browzine Integration
 * Adapted from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js
 */
var browzine = {
    api: "https://api.thirdiron.com/public/v1/libraries/946",
    apiKey: "5c204fa3-5823-4264-9faa-e3fb48881571",
};

function BrowzineIntegrationService($http, $location) {
    var lang = $location.search().lang;

    this.bookIconLink = "https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png";

    this.httpGet = function (endPoint) {
        if (endPoint) {
            return $http.get(endPoint);
        }
    }
}

BrowzineIntegrationService.prototype.getArticleData = function (doi) {
    var endPoint = browzine.api + "/articles/doi/" + doi + "?include=journal" + "&access_token=" + browzine.apiKey;
    return this.httpGet(endPoint);
}

BrowzineIntegrationService.prototype.getJournalData = function (issn) {
    var endPoint = browzine.api + "/search?issns=" + issn + "&access_token=" + browzine.apiKey;
    return this.httpGet(endPoint);
}

BrowzineIntegrationService.prototype.getJournalThumbnail = function (issn) {
    var endPoint = browzine.api + "/search?issns=" + issn + "&access_token=" + browzine.apiKey;
    return this.httpGet(endPoint);
}

app.service('BrowzineIntegrationService', ['$http', '$location', BrowzineIntegrationService]);

/**
 * Browzine Integration from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js
 * 
 * Below is where you can customize the wording that is displayed (as well as the hover over text) for the BrowZine links.
 * St Olaf has chosen "View Journal Contents" for the "Journal Availability Link" but other great options include things such as "View Journal" or "View this Journal"
 * St Olaf is using "View Issue Contents" for the "Article in Context" link but another great option is "View Complete Issue" or "View Article in Context".
 * St Olaf also has added a hover over link that says "Via BrowZine" to emphasize the interaction being used.
 */

// Add Article In Context & BrowZine Links
app.controller('prmSearchResultAvailabilityLineAfterController', ['BrowzineIntegrationService', function (BrowzineIntegrationService) {
    var ctrl = this;
    ctrl.bookIconLink = BrowzineIntegrationService.bookIconLink;
    if (ctrl.parentCtrl.result.pnx.addata.doi && ctrl.parentCtrl.result.pnx.display.type[0] == 'article') {
        var doi = ctrl.parentCtrl.result.pnx.addata.doi[0] || '';
        if (doi) {
            BrowzineIntegrationService.getArticleData(doi)
                .then(function (response) {
                    ctrl.article = response.data;
                })
                .catch(function (response) {
                    console.error(response);
                });
        }
    }
    if (ctrl.parentCtrl.result.pnx.addata.issn && ctrl.parentCtrl.result.pnx.display.type[0] == 'journal') {
        var issn = ctrl.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
        if (issn) {
            BrowzineIntegrationService.getJournalData(issn)
                .then(function (response) {
                    ctrl.journal = response.data;
                })
                .catch(function (response) {
                    console.error(response);
                });
        }
    }
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: `
        <div ng-if="$ctrl.article.data.browzineWebLink">
            <a href="{{ $ctrl.article.data.browzineWebLink }}" target="_blank" title="Via BrowZine">
                <img src="{{ $ctrl.bookIconLink }}" class="browzine-icon">
                <span class="browzine-link-label" translate="nui.custom.article-browzine-web-link">
                    Available at BrowZine
                </span>
                <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link">
                    <svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg>
                </md-icon>
            </a>
        </div>
        <div ng-if="$ctrl.journal.data[0].browzineWebLink">
            <a href="{{ $ctrl.journal.data[0].browzineWebLink }}" target="_blank" title="Via BrowZine">
                <img src="{{ $ctrl.bookIconLink }}" class="browzine-icon">
                <span class="browzine-link-label" translate="nui.custom.journal-browzine-web-link">
                    Journal Available at BrowZine
                </span>
                <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link">
                    <svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg>
                </md-icon>
            </a>
        </div>
    `
});

/**
 * Browzine Integration from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js
 */

// Add Journal Cover Images from BrowZine
app.controller('prmSearchResultThumbnailContainerAfterController', ['BrowzineIntegrationService', function (BrowzineIntegrationService) {
    var ctrl = this;

    var newThumbnail = '';
    // checking for item property as this seems to impact virtual shelf browse (for reasons as yet unknown)
    if (ctrl.parentCtrl.item && ctrl.parentCtrl.item.pnx.addata.issn) {
        var issn = ctrl.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
        if (issn) {
            BrowzineIntegrationService.getJournalThumbnail(issn)
                .then(function (response) {
                    if (response.data.data["0"] && response.data.data["0"].browzineEnabled) {
                        newThumbnail = response.data.data["0"].coverImageUrl;;
                    }
                })
                .catch(function (response) {
                    console.error(response);
                });
        }
    }
    ctrl.$doCheck = function (changes) {
        if (ctrl.parentCtrl.selectedThumbnailLink) {
            if (newThumbnail != '') {
                ctrl.parentCtrl.selectedThumbnailLink.linkURL = newThumbnail;
            }
        }
    };
}]);

app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmSearchResultThumbnailContainerAfterController'
});
