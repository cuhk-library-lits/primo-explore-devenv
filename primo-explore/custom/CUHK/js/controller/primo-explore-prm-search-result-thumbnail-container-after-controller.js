/**
 * Browzine Integration from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js
 */

// Add Journal Cover Images from BrowZine
app.controller('prmSearchResultThumbnailContainerAfterController', ['BrowzineIntegrationService', function (BrowzineIntegrationService) {
    var ctrl = this;
    
    var newThumbnail = '';
    // checking for item property as this seems to impact virtual shelf browse (for reasons as yet unknown)
    if (ctrl.parentCtrl.item && ctrl.parentCtrl.item.pnx.addata.issn) {
        var issn = ctrl.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
        if (issn) {
            BrowzineIntegrationService.getJournalThumbnail(issn)
                .then(function (response) {
                    if (response.data.data["0"] && response.data.data["0"].browzineEnabled) {
                        newThumbnail = response.data.data["0"].coverImageUrl;;
                    }
                })
                .catch(function (response) {
                    console.error(response);
                });
        }
    }
    ctrl.$doCheck = function (changes) {
        if (ctrl.parentCtrl.selectedThumbnailLink) {
            if (newThumbnail != '') {
                ctrl.parentCtrl.selectedThumbnailLink.linkURL = newThumbnail;
            }
        }
    };
}]);

app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmSearchResultThumbnailContainerAfterController'
});
