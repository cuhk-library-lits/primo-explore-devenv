app.controller('prmExploreMainAfterController', ['$document', 'SandboxLabelService', 'ScrollSnapService', 'InfiniteScrollService', 
    function ($document, SandboxLabelService, ScrollSnapService, InfiniteScrollService) {    
        var ctrl = this;

        ctrl.showSandboxLabel = SandboxLabelService.showSandboxLabel;
        if (ctrl.showSandboxLabel) {
            angular.element($document[0]).find('body').addClass("body-margin");
        }
        
        ScrollSnapService.enable();
        InfiniteScrollService.enable();
    }
]);

app.component('prmExploreMainAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmExploreMainAfterController',
    template: `
        <div ng-if="$ctrl.showSandboxLabel" class="sandbox-label">Sandbox</div>
        `
});
