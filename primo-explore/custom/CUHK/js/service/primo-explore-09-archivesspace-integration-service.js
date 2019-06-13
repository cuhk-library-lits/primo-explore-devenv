var CUHK_ARCHIVESSPACE_SOURCE = "CUHK_ArchivesSpace";
var ARCHIVESSPACE_AVAILABLE_LOCATION = "University Library UL Special Collections";

function ArchivesSpaceIntegrationService($location) {
  this.availableLocation = ARCHIVESSPACE_AVAILABLE_LOCATION;
}

ArchivesSpaceIntegrationService.prototype.isFromArchivesSpace = pnx => {
  return (
    pnx.display &&
    pnx.display.source &&
    pnx.display.source.length > 0 &&
    pnx.display.source[0] === CUHK_ARCHIVESSPACE_SOURCE
  );
};

ArchivesSpaceIntegrationService.prototype.handleAvailability = (index, pCtrl) => {
  if (pCtrl.availabilityLinksUrl().length > 0 && pCtrl.availabilityLinksUrl()[0].length > 0) {
    window.open(pCtrl.availabilityLinksUrl()[0], "_blank");
  } else if (index != null) {
    pCtrl.triggerFullViewOpenGetIt1(index);
  }
};

ArchivesSpaceIntegrationService.prototype.hideDefaultAvailability = element => {
  angular.element(element).ready(function() {
    if (element && element.parent() && element.parent().length > 0) {
      var defaultAvailabilityRow = element.parent()[0];
      if (defaultAvailabilityRow && defaultAvailabilityRow.getElementsByClassName("layout-row").length > 0) {
        var hideAvailability = angular.element(defaultAvailabilityRow.getElementsByClassName("layout-row")[0]);
        hideAvailability.addClass("hide-default-availability");
      }
    }
  });
};

app.service("ArchivesSpaceIntegrationService", [
  "$location",
  ArchivesSpaceIntegrationService
]);
