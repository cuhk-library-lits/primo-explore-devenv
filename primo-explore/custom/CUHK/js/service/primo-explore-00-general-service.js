/**
 * Primo label translations
 */


function PrimoTranslationsService($resource, $q, $location) {

    var primoTranslations= $resource('/primo_library/libweb/webservices/rest/v1/translations/CUHK?lang=:lang',
        { lang: '@lang' },
        { query: { method: 'GET', cache: true} }
    );

    var getTranslations = function(language) {
        return primoTranslations.get({ lang: language });
    }

    this.getPrimoLabel = function(key) {
        var language = $location.search().lang;
        return $q(function (resolve, reject) {
            getTranslations(language).$promise.then(function (translations) {
                if (key in translations) {
                    resolve(translations[key]);
                } else {
                    reject("Key " + key + " not found.");
                }

            });
        });
    }
    
}

app.service('PrimoTranslationsService', ['$resource', '$q', '$location', PrimoTranslationsService]);
