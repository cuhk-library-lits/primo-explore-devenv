app.component('prmFullViewServiceContainerAfter', {
    bindings: { parentCtrl: '<' },
    template: `
        <julac-link-to-hkall parent-ctrl="$ctrl.parentCtrl"></julac-link-to-hkall>
        <julac-view-it-from-other-inst parent-ctrl="$ctrl.parentCtrl"></julac-view-it-from-other-inst>
    `
});
