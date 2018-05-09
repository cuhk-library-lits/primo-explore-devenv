var FACET_LIMIT_COUNT = 20;

function FacetCountLimitService($document, $location) {
    this.facetLimitCount = FACET_LIMIT_COUNT;
    this.lang = $location.search().lang;
    this.facetLimitLabel = "* Only top " + FACET_LIMIT_COUNT + " entries are displayed";
    switch (this.lang) {
        case "zh_TW":
            this.facetLimitLabel = "* 只顯示首" + FACET_LIMIT_COUNT + "項";
            break;
        case "zh_CN":
            this.facetLimitLabel = "* 只显示首" + FACET_LIMIT_COUNT + "项";
            break;
    }
}

app.service('FacetCountLimitService', ['$document', '$location', FacetCountLimitService]);