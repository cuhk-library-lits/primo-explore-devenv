/**
 * Browzine Integration from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js
 * 
 * Below is where you can customize the wording that is displayed (as well as the hover over text) for the BrowZine links.
 * St Olaf has chosen "View Journal Contents" for the "Journal Availability Link" but other great options include things such as "View Journal" or "View this Journal"
 * St Olaf is using "View Issue Contents" for the "Article in Context" link but another great option is "View Complete Issue" or "View Article in Context".
 * St Olaf also has added a hover over link that says "Via BrowZine" to emphasize the interaction being used.
 */

// Add Article In Context & BrowZine Links
app.controller('prmSearchResultAvailabilityLineAfterController', ['BrowzineIntegrationService', function (BrowzineIntegrationService) {
    var ctrl = this;
    ctrl.primoJournalBrowZineWebLinkText = BrowzineIntegrationService.primoJournalBrowZineWebLinkText;
    ctrl.primoArticleBrowZineWebLinkText = BrowzineIntegrationService.primoArticleBrowZineWebLinkText;
    ctrl.bookIconLink = BrowzineIntegrationService.bookIconLink;
    if (ctrl.parentCtrl.result.pnx.addata.doi && ctrl.parentCtrl.result.pnx.display.type[0] == 'article') {
        var doi = ctrl.parentCtrl.result.pnx.addata.doi[0] || '';
        if (doi) {
            BrowzineIntegrationService.getArticleData(doi)
                .then(function (response) {
                    ctrl.article = response.data;
                })
                .catch(function (response) {
                    console.error(response);
                });
        }
    }
    if (ctrl.parentCtrl.result.pnx.addata.issn && ctrl.parentCtrl.result.pnx.display.type[0] == 'journal') {
        var issn = ctrl.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
        if (issn) {
            BrowzineIntegrationService.getJournalData(issn)
                .then(function (response) {
                    ctrl.journal = response.data;
                })
                .catch(function (response) {
                    console.error(response);
                });
        }
    }
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: `
        <div ng-if="$ctrl.article.data.browzineWebLink">
            <a href="{{ $ctrl.article.data.browzineWebLink }}" target="_blank" title="Via BrowZine">
                <img src="{{ $ctrl.bookIconLink }}" class="browzine-icon">
                <span class="browzine-link-label">{{ $ctrl.primoArticleBrowZineWebLinkText }}</span>
                <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link">
                    <svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg>
                </md-icon>
            </a>
        </div>
        <div ng-if="$ctrl.journal.data[0].browzineWebLink">
            <a href="{{ $ctrl.journal.data[0].browzineWebLink }}" target="_blank" title="Via BrowZine">
                <img src="{{ $ctrl.bookIconLink }}" class="browzine-icon">
                <span class="browzine-link-label">{{ $ctrl.primoJournalBrowZineWebLinkText }}</span>
                <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link">
                    <svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg>
                </md-icon>
            </a>
        </div>
    `
});