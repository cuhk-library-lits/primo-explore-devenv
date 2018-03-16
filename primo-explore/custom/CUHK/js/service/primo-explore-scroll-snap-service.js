function ScrollSnapService($document, SandboxLabelService) {
    var sandboxLabelVisible = SandboxLabelService.showSandboxLabel;
    var docRoot = $document[0];

    this.docRootElement = function() {
        return angular.element(docRoot);
    }

    this.getCurrentScrollSnapY = function () {
        var searchBarElement = docRoot.querySelector('prm-search-bar .advanced-search-backdrop');
        var alertBarElement = docRoot.querySelector('prm-alert-bar div');

        var searchBarHeight = searchBarElement ? searchBarElement.offsetHeight : 0;
        var alertBarHeight = alertBarElement ? alertBarElement.offsetHeight : 0;

        return alertBarHeight + searchBarHeight + (sandboxLabelVisible ? 80 : 60);
    };
}

ScrollSnapService.prototype.enable = function () {
    var getCurrentScrollSnapY = this.getCurrentScrollSnapY;
    var debounce;
    this.docRootElement().bind('scroll', function () {
        var scrollSnapY = getCurrentScrollSnapY();
        clearTimeout(debounce);
        debounce = setTimeout(function () {
            if (window.pageYOffset > (scrollSnapY - 20) && window.pageYOffset < (scrollSnapY + 100))
                window.scrollTo(0, scrollSnapY);
        }, 200);
    });
}

app.service('ScrollSnapService', ['$document', 'SandboxLabelService', ScrollSnapService]);