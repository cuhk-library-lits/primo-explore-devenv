app.component('prmFullViewServiceContainerAfter', {
    bindings: { parentCtrl: '<' },
    template: `
        <julac-view-it-from-other-inst parent-ctrl="$ctrl.parentCtrl"></julac-view-it-from-other-inst>
    `
});
