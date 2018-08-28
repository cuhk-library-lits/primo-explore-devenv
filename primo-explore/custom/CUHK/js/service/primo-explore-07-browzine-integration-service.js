/**
 * BrowZine - Primo Integration
 */

function BrowzineIntegrationService($q, PrimoTranslationsService) {
    this.initBrowzine = function () {
        var browzineAPI = PrimoTranslationsService.getPrimoLabel("nui.custom.browzine.api").then(function (value) {
            window.browzine.api = value;
        });
        var browzineAPIKey = PrimoTranslationsService.getPrimoLabel("nui.custom.browzine.apiKey").then(function (value) {
            window.browzine.apiKey = value;
        });
        var browzineJournalWebLinkText = PrimoTranslationsService.getPrimoLabel("nui.custom.browzine.primo-journal-browzine-web-link-text").then(function (value) {
            window.browzine.primoJournalBrowZineWebLinkText = value;
        });
        var browzineArticleWebLinkText = PrimoTranslationsService.getPrimoLabel("nui.custom.browzine.primo-article-browzine-web-link-text").then(function (value) {
            window.browzine.primoArticleBrowZineWebLinkText = value;
        });
        var browzinePDFDownloadEnabled = PrimoTranslationsService.getPrimoLabel("nui.custom.browzine.primo-article-pdf-download-link-enabled").then(function (value) {
            window.browzine.primoArticlePDFDownloadLinkEnabled = (value == "Y");
        });
        var browzinePDFDownloadLinkText = PrimoTranslationsService.getPrimoLabel("nui.custom.browzine.primo-article-pdf-download-link-text").then(function (value) {
            window.browzine.primoArticlePDFDownloadLinkText = value;
        });

        return $q.all([browzineAPI, browzineAPIKey, browzineJournalWebLinkText, browzineArticleWebLinkText, browzinePDFDownloadEnabled, browzinePDFDownloadLinkText]).then(function() {
            
        });
    }
}

app.service('BrowzineIntegrationService', ['$q', 'PrimoTranslationsService', BrowzineIntegrationService]);
