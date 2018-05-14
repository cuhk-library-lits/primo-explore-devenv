var SCROLL_SNAP_MARGIN = 30;
var SCROLL_SNAP_EFF_SCREEN_WIDTH = 960;

function ScrollSnapService($document, $window) {
    var facetDiv = null;

    this.findFacetDiv = function () {
        if (facetDiv == null)
            facetDiv = $document[0].querySelector('.sidebar .primo-scrollbar');
    }

    this.docRootElement = function() {
        return angular.element($document[0]);
    }

    this.getScrollSnapY = function() {
        var scrollSnapY = $window.pageYOffset;
        if (!facetDiv)
            return scrollSnapY;

        var stickyOffset = facetDiv.attributes['offset'].value;
        if (!stickyOffset)
            return scrollSnapY;

        var facetDivY = facetDiv.getBoundingClientRect().top;
        if (facetDivY > stickyOffset && (facetDivY - stickyOffset) <= SCROLL_SNAP_MARGIN) {
            var offset = Math.ceil(facetDivY - stickyOffset);
            scrollSnapY = scrollSnapY + offset + 3;
        }
        return scrollSnapY;
    };

    this.effective = function() {
        return $window.matchMedia('(min-width: ' + SCROLL_SNAP_EFF_SCREEN_WIDTH + 'px)').matches;
    }
}

ScrollSnapService.prototype.init = function () {
    var effective = this.effective;
    var findFacetDiv = this.findFacetDiv;
    var getScrollSnapY = this.getScrollSnapY;
    var fineTune = this.fineTune;
    var debounce;
    this.docRootElement().bind('scroll', function (e) {
        if (effective()) {
            findFacetDiv();
            var scrollSnapY = getScrollSnapY();
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                e.preventDefault();
                e.stopPropagation();                
                window.scrollTo(0, scrollSnapY);
                return false;
            }, 100);
        }
    });
}

app.service('ScrollSnapService', ['$document', '$window', ScrollSnapService]);