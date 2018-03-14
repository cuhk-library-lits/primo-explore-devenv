var app = angular.module('viewCustom', ['angularLoad']).constant('_', window._);
app.constant('IS_PRODUCTION', window.location.hostname == 'julac.hosted.exlibrisgroup.com' ? true : false);
app.value('nextPageCtrl', { lastY: 0, busy: false});
