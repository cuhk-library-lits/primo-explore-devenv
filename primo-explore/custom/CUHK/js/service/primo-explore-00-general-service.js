/**
 * Primo label translations
 */

function PrimoTranslationsService($http, $cacheFactory, $q, $location) {
    var config = {
        method: 'get',
        url: '/primo_library/libweb/webservices/rest/v1/translations/CUHK',
        params: {lang: 'en_US'},
        cache: true
    }
    
    var getTranslations = function(language) {
        config.params.lang = language;
        return $http(config)
    }

    this.getPrimoLabel = function(key) {
        var language = $location.search().lang;
        return $q(function (resolve, reject) {
            getTranslations(language).then(function success(response) {
                var translations = response.data;
                if (key in translations) {
                    resolve(translations[key]);
                } else {
                    reject("Key " + key + " not found.");
                }
            }, function error(response) {
                console.error(response);
                reject("Failed to get translation labels for view! View: CUHK");
            });
        });
    }
    
}

app.service('PrimoTranslationsService', ['$http', '$cacheFactory', '$q', '$location', PrimoTranslationsService]);
