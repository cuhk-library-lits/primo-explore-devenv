var FACET_LIMIT_COUNT = 20;

function FacetCountLimitService($document) {
    this.facetLimitCount = FACET_LIMIT_COUNT
}

app.service('FacetCountLimitService', ['$document', FacetCountLimitService]);