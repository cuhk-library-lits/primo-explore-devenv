var SCROLL_LIMIT_EFF_SCREEN_WIDTH = 960;

function InfiniteScrollService($document, $window) {
    var docRoot = $document[0];
    var loadMoreButtonSelector = "div .results-container .md-button.button-confirm:last-child";
    var bottomFixedToolbarSelector = "prm-search .bottom-fixed-toolbar";
    var scrollYLimit = null;
    
    this.docRootElement = function () {
        return angular.element(docRoot);
    }

    this.getLoadMoreButtonY = function() {
        var viewPortHeight = ($window.innerHeight || docRoot.documentElement.clientHeight);
        var loadMoreButton = angular.element(docRoot.querySelector(loadMoreButtonSelector))[0];
        var bottomFixedToolbar = angular.element(docRoot.querySelector(bottomFixedToolbarSelector))[0];
        if (loadMoreButton) {
            var loadMoreButtonBottom = loadMoreButton.getBoundingClientRect().bottom - viewPortHeight + 80;
            if (bottomFixedToolbar)
                loadMoreButtonBottom + viewPortHeight - bottomFixedToolbar.getBoundingClientRect().top
            return loadMoreButtonBottom;
        }
            
        return null;
    };

    this.clickLoadMoreButton = function() {
        angular.element(docRoot.querySelector(loadMoreButtonSelector)).triggerHandler('click');
    }

    this.limitScroll = function (loadMoreButtonY) {
        if (loadMoreButtonY >= 0)
            scrollYLimit = $window.pageYOffset;
        else {
            if (scrollYLimit)
                $window.scrollTo(0, scrollYLimit);
        }
    }
}

InfiniteScrollService.prototype.init = function () {
    var getLoadMoreButtonY = this.getLoadMoreButtonY;
    var clickLoadMoreButton = this.clickLoadMoreButton;
    var limitScroll = this.limitScroll;

    var scrollYLimit = null;
    var busy = false;

    var debounce;
    this.docRootElement().bind('scroll', function () {
        var loadMoreButtonY = getLoadMoreButtonY();
        if (!loadMoreButtonY)
            return;

        limitScroll(loadMoreButtonY);

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

app.service('InfiniteScrollService', ['$document', '$window', InfiniteScrollService]);