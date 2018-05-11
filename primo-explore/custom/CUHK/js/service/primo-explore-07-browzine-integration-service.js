/**
 * Browzine Integration
 * Adapted from https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js
 */
var browzine = {
    api: "https://api.thirdiron.com/public/v1/libraries/946",
    apiKey: "5c204fa3-5823-4264-9faa-e3fb48881571",
};

function BrowzineIntegrationService($http, $location) {
    var lang = $location.search().lang;

    this.bookIconLink = "https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png";

    this.httpGet = function(endPoint) {
        if (endPoint) {
            return $http.get(endPoint);
        }
    }
}

BrowzineIntegrationService.prototype.getArticleData = function (doi) {
    var endPoint = browzine.api + "/articles/doi/" + doi + "?include=journal" + "&access_token=" + browzine.apiKey;
    return this.httpGet(endPoint);
}

BrowzineIntegrationService.prototype.getJournalData = function (issn) {
    var endPoint = browzine.api + "/search?issns=" + issn + "&access_token=" + browzine.apiKey;
    return this.httpGet(endPoint);
}

BrowzineIntegrationService.prototype.getJournalThumbnail = function (issn) {
    var endPoint = browzine.api + "/search?issns=" + issn + "&access_token=" + browzine.apiKey;
    return this.httpGet(endPoint);
}

app.service('BrowzineIntegrationService', ['$http', '$location', BrowzineIntegrationService]);
