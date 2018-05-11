var SCROLL_LIMIT_EFF_SCREEN_WIDTH = 960;
var SCROLL_LIMIT_MARGIN = 50;

function InfiniteScrollService($document, $window) {
    var docRoot = $document[0];
    var loadMoreButtonSelector = "div .results-container .md-button.button-confirm:last-child";
    var bottomFixedToolbarSelector = "prm-search .bottom-fixed-toolbar";
    var lastScrollLimit = 0;
    
    this.docRootElement = function () {
        return angular.element(docRoot);
    }

    this.getLoadMoreButtonY = function() {
        var viewPortHeight = ($window.innerHeight || docRoot.documentElement.clientHeight);
        var loadMoreButton = angular.element(docRoot.querySelector(loadMoreButtonSelector))[0];
        var bottomFixedToolbar = angular.element(docRoot.querySelector(bottomFixedToolbarSelector))[0];
        if (loadMoreButton) {
            var loadMoreButtonBottom = loadMoreButton.getBoundingClientRect().bottom - viewPortHeight + 60;
            if (bottomFixedToolbar)
                loadMoreButtonBottom + viewPortHeight - bottomFixedToolbar.getBoundingClientRect().top
            return loadMoreButtonBottom;
        }
            
        return null;
    };

    this.clickLoadMoreButton = function() {
        angular.element(docRoot.querySelector(loadMoreButtonSelector)).triggerHandler('click');
    }
    
    this.getScrollLimit = function (loadMoreButtonY) {
        var newScrollLimit = loadMoreButtonY + $window.pageYOffset;
        if (newScrollLimit < lastScrollLimit) {
            newScrollLimit = lastScrollLimit;
        }
        lastScrollLimit = newScrollLimit;
        return newScrollLimit;
    }
}

InfiniteScrollService.prototype.init = function () {
    var getLoadMoreButtonY = this.getLoadMoreButtonY;
    var clickLoadMoreButton = this.clickLoadMoreButton;
    var hideLoadMoreButton = this.hideLoadMoreButton;
    var getScrollLimit = this.getScrollLimit;

    var loadingMoreScrollLimit = 0;
    
    this.docRootElement().bind('scroll', function (e) {
        var loadMoreButtonY = getLoadMoreButtonY();
        if (!loadMoreButtonY)
            return;
        
        var scrollLimit = getScrollLimit(loadMoreButtonY);

        if (loadMoreButtonY <= SCROLL_LIMIT_MARGIN) {
            if (loadingMoreScrollLimit < scrollLimit) {
                loadingMoreScrollLimit = scrollLimit;
                clickLoadMoreButton();
            }
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo(0, scrollLimit);
            return false;
        }
    });
}

app.service('InfiniteScrollService', ['$document', '$window', InfiniteScrollService]);