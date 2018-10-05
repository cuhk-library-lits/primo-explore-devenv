app.controller('prmExploreMainAfterController', ['$document', 'SandboxLabelService', 'ScrollSnapService', 
    function ($document, SandboxLabelService, ScrollSnapService) {    
        var ctrl = this;

        ctrl.showSandboxLabel = SandboxLabelService.showSandboxLabel;
        if (ctrl.showSandboxLabel) {
            angular.element($document[0]).find('body').addClass("body-margin");
        }
        
        ScrollSnapService.init();
    }
]);

app.component('prmExploreMainAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmExploreMainAfterController',
    template: `
        <div ng-if="$ctrl.showSandboxLabel" class="sandbox-label">Sandbox</div>
        `
});
