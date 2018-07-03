app.controller('prmPersonalInfoAfterController', ['$document', function ($document) {
    /**
     * Hide notification letters opt-out checkboxes
     * By overriding "showActionSection" function of "prm-personal-info" element
     */
    var elem = angular.element(document.querySelector("prm-personal-info"));
    var ctrl = elem.controller("prmPersonalInfo");
    ctrl.showActionSection = function(){return false;};
}]);

app.component('prmPersonalInfoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmPersonalInfoAfterController'
});
