/**
 * Add ngResource module dependency
 */
var angularResourceScript = document.createElement("script");
angularResourceScript.src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-resource.js";
document.head.appendChild(angularResourceScript);


var app = angular.module('viewCustom', ['angularLoad', 'ngResource']).constant('_', window._);