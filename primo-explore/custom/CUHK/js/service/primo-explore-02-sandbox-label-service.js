var PRODUCTION_HOST_NAME = "julac.hosted.exlibrisgroup.com";

function SandboxLabelService($location) {
    this.showSandboxLabel = PRODUCTION_HOST_NAME != $location.host();
}

app.service('SandboxLabelService', ['$location', SandboxLabelService]);