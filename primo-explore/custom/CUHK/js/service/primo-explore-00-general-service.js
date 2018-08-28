/**
 * Primo label translations
 */
/**
 * Add ngResource module dependency
 */
var angularResourceScript = document.createElement("script");
angularResourceScript.src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-resource.js";
document.head.appendChild(angularResourceScript);

angularResourceScript.onload = function () {
    var app = angular.module('viewCustom');
    app.requires.push('ngResource');
};


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
