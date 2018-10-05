/**
 * Switch logo for HKALL tab
 */
app.controller('prmTabsAndScopesSelectorAfterController', ['$scope', function ($scope) {
    var vm = this;
    vm.$doCheck = function () {
        try {
            var selectedTab = vm.parentCtrl.selectedTab;

            if (selectedTab == "hkall_tab") {
                document.getElementById("local-banner-cuhk").style = 'display: none; !important';
                document.getElementById("local-banner-hkall").style = 'display: inline-block; !important';
                document.getElementsByTagName("prm-topbar")[0].getElementsByClassName("top-nav-bar")[0].style = 'background-color: #3B76A7;';
                //document.getElementsByTagName("prm-topbar")[0].getElementsByClassName("top-nav-bar")[0].style = 'background-image: url("custom/CUHK/img/hkall-bg.png");';
            } else {
                document.getElementById("local-banner-cuhk").style = 'display: inline-block; !important';
                document.getElementById("local-banner-hkall").style = 'display: none; !important';
                document.getElementsByTagName("prm-topbar")[0].getElementsByClassName("top-nav-bar")[0].style = 'background-color: #6D1B6D;';
            }

        } catch (err) {
            console.error('prmTabsAndScopesSelectorAfterController: ' + err.message);
        }
    }
}]);

app.component('prmTabsAndScopesSelectorAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmTabsAndScopesSelectorAfterController'
});