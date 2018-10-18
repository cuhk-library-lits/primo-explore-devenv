app.controller('prmServiceLinksAfterController', ['PrimoTranslationsService', function (PrimoTranslationsService) {
    var ctrl = this;
    if (ctrl.parentCtrl.getLinks()) {
        var links = ctrl.parentCtrl.getLinks();
        for (var i=0; i<links.length; i++) {
            
            // Add recordId to HKALL link
            if (links[i].displayLabel && links[i].displayLabel.includes("$$Ehkall_search")) {
                var hkallLink = links[i];
                var recordId = (ctrl.parentCtrl.item.pnx.control.recordid + "").replace("CUHK_IZ", "");
                PrimoTranslationsService.getPrimoLabel("fulldisplay.hkall_search").then(function (value) {
                    var label = value;
                    if (recordId.length > 0)
                        label += " (" + recordId + ")";
                    hkallLink.displayLabel = label;
                });
            }
        }
    }
}]);

app.component('prmServiceLinksAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmServiceLinksAfterController'
});
