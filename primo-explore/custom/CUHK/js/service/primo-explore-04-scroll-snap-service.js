var FACET_STUCK_Y = 24;
var SCROLL_SNAP_MARGIN = 50;
var SCROLL_SNAP_EFF_SCREEN_WIDTH = 960;

function ScrollSnapService($document, $window) {
    var docRoot = $document[0];

    this.docRootElement = function() {
        return angular.element(docRoot);
    }

    this.getScrollSnapY = function() {
        var facetDiv = docRoot.querySelector('.sidebar .primo-scrollbar');
        if (facetDiv) {
            var facetDivY = facetDiv.getBoundingClientRect().top;
            if (facetDivY > 0 && Math.abs(facetDivY - FACET_STUCK_Y) <= SCROLL_SNAP_MARGIN) {
                return $window.pageYOffset + facetDivY - FACET_STUCK_Y;
            }
        }
        return $window.pageYOffset;
    };

    this.effective = function() {
        return $window.matchMedia('(min-width: ' + SCROLL_SNAP_EFF_SCREEN_WIDTH + 'px)').matches;
    }
}

ScrollSnapService.prototype.init = function () {
    var getScrollSnapY = this.getScrollSnapY;
    var effective = this.effective;
    var debounce;
    this.docRootElement().bind('scroll', function () {
        if (effective()) {
            var scrollSnapY = getScrollSnapY();
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                window.scrollTo(0, Math.ceil(scrollSnapY));
            }, 100);
        }
    });
}

app.service('ScrollSnapService', ['$document', '$window', ScrollSnapService]);