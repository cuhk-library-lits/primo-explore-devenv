var app = angular.module('viewCustom', ['angularLoad']).constant('IS_PRODUCTION', window.location.hostname == 'julac.hosted.exlibrisgroup.com' ? true : false).value('nextPageCtrl', { lastY: 0});
