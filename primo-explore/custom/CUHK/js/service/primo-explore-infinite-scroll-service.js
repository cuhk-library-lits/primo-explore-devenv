function InfiniteScrollService($document, SandboxLabelService) {
    var docRoot = $document[0];
    var loadMoreButtonSelector = "div .results-container .md-button.button-confirm:last-child";
    
    this.docRootElement = function () {
        return angular.element(docRoot);
    }

    this.getLoadMoreButtonY = function() {
        var viewPortHeight = (window.innerHeight || docRoot.documentElement.clientHeight);
        var loadMoreButton = angular.element(docRoot.querySelector(loadMoreButtonSelector))[0];
        if (loadMoreButton)
            return loadMoreButton.getBoundingClientRect().bottom - viewPortHeight + 50;
        return null;
    };

    this.clickLoadMoreButton = function() {
        angular.element(docRoot.querySelector(loadMoreButtonSelector)).triggerHandler('click');
    }
}

InfiniteScrollService.prototype.enable = function () {
    var getLoadMoreButtonY = this.getLoadMoreButtonY;
    var clickLoadMoreButton = this.clickLoadMoreButton;

    var scrollYLimit = 0;
    var busy = false;

    var debounce;
    this.docRootElement().bind('scroll', function () {
        var loadMoreButtonY = getLoadMoreButtonY();
        if (!loadMoreButtonY)
            return;

        if (loadMoreButtonY >= 0)
            scrollYLimit = window.pageYOffset;

        if (loadMoreButtonY <= 0)
            window.scrollTo(0, scrollYLimit);

        clearTimeout(debounce);
        debounce = setTimeout(function () {
            if (busy) {
                if (loadMoreButtonY > 10)
                    busy = false;
            }
            else {
                if (loadMoreButtonY <= 10) {
                    busy = true;
                    clickLoadMoreButton();
                }
            }
        }, 100);
    });
}

app.service('InfiniteScrollService', ['$document', InfiniteScrollService]);