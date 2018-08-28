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
