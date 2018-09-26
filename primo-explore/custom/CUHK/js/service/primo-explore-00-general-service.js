/**
 * Primo label translations
 */

function PrimoTranslationsService($http, $cacheFactory, $q, $location) {
    var reqConfig = {
        method: 'get',
        url: '/primo_library/libweb/webservices/rest/v1/translations/CUHK',
        params: {lang: 'en_US'},
        cache: true
    }
    
    var getTranslations = function(language) {
        reqConfig.params.lang = language;
        return $http(reqConfig)
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

function PrimoConfigService(PrimoTranslationsService) {
    this.isEnabled = function(key) {
        return $q(function (resolve, reject) {
            PrimoTranslationsService.getPrimoLabel(key).then(function success(value) {
                resolve(value == "Y");
            }, function error(value) {
                reject("Failed to determine whether config is enabled: " + key);
            });
        });
    }
}

app.service('PrimoTranslationsService', ['$http', '$cacheFactory', '$q', '$location', PrimoTranslationsService]);
app.service('PrimoConfigService', ['PrimoTranslationsService', PrimoConfigService]);