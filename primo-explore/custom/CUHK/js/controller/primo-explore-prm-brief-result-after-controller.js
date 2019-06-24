app.controller("prmBriefResultAfterController", [ "$scope", "$compile", "$element", "$timeout", "$location", "BriefResultTitleStatementService", function($scope, $compile, $element, $timeout, $location, BriefResultTitleStatementService) {
    var ctrl = this;

    var displayTemplate = `
        <h3 class="item-title">{{$ctrl.statementOfResponsibility}}</h3>
    `;
    ctrl.statementOfResponsibility = BriefResultTitleStatementService.preferredStatementOfResponsibility(ctrl.parentCtrl.item.pnx);

    var compiledNode = $compile(displayTemplate)($scope);

    var titleLines = $element[0].parentElement.querySelectorAll(".item-title");
    if (titleLines && titleLines.length > 0) {
      var lastTitleLine = angular.element(titleLines[titleLines.length - 1]);
      lastTitleLine.after(compiledNode);
    }

    // Disable title link in Full Display
    $timeout(function() {
      if ("/fulldisplay" == $location.path()) {
        var titleLinks = $element[0].parentElement.querySelectorAll(".item-title a");
        titleLinks.forEach( (link) => {
          angular.element(link).attr("draggable", "false");
        });
      }
    }, 0);
}]);

app.component("prmBriefResultAfter", {
    bindings: { parentCtrl: "<" },
    controller: "prmBriefResultAfterController"
});
