/**
 * Note: Inherit from Central package
 */

app.component("prmFullViewServiceContainerAfter", {
  bindings: { parentCtrl: "<" },
  template: `
    <julac-add-hkall-info-to-openurl parent-ctrl="$ctrl.parentCtrl"></julac-add-hkall-info-to-openurl>
    `
});
