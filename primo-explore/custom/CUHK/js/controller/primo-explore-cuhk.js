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
/*
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

*/