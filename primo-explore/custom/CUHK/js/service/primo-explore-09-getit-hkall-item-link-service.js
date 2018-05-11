function HKALLItemLinkService($location, $http, $q) {
    this.enabled = true;

    this.pnxSearchReq = {
        url: "/primo_library/libweb/webservices/rest/primo-explore/v1/pnxs",
        method: 'GET',
        params: {
            inst: "CUHK_ALMA",
            vid: "CUHK",
            scope: "HKALL_PTP2",
            tab: "hkall_tab",
            sortby: "rank",
            offset: 0
        }
    };

    this.skipForHkallTab = function () {
        var currentTab = $location.search().tab;
        return (currentTab == "hkall_tab");
    }
    
    this.pnxSearch = function () {
        return $http(this.pnxSearchReq);
    }

    this.getAlmaIdSubfield = function (almaId, subfield) {
        var subfields = almaId.split("$$");
        if (subfields && subfields.length > 0) {
            for (var i = 0; i < subfields.length; i++) {
                if (subfields[i].startsWith(subfield))
                    return subfields[i].substring(1);
            }
        }
        return null;
    }

    this.generateHkallUrlPromise = function(docId) {
        var hkallUrl = "";
        if (docId && docId.length > 0) {
            var lang = $location.search().lang;
            hkallUrl = "/primo-explore/fulldisplay?" +
                        "docid=" + docId +
                        "&context=P2P&vid=CUHK&search_scope=HKALL_PTP2&adaptor=HKALL_PTP2&tab=hkall_tab" +
                        "&lang=" + lang;
        }
        return $q.when(hkallUrl);
    }
}

HKALLItemLinkService.prototype.getHkallUrl = function (itemPnx) {
    if (this.skipForHkallTab())
        return;

    var almaIds = itemPnx.control.almaid;
    if (almaIds && almaIds.length > 0) {
        for (var i=0; i<almaIds.length; i++) {
            // Only handle first AlmaID starts with "852JULAC_CUHK:"
            var reqAlmaId = almaIds[i];

            if (reqAlmaId.indexOf("$$V") >= 0)
                reqAlmaId = this.getAlmaIdSubfield(reqAlmaId, "V");

            if (reqAlmaId.indexOf("852JULAC_CUHK:") < 0)
               continue;
            
            this.pnxSearchReq.params.q = "any,contains," + reqAlmaId;

            var getAlmaIdSubfield = this.getAlmaIdSubfield;
            var generateHkallUrlPromise = this.generateHkallUrlPromise;
            return this.pnxSearch().then(function (response) {
                var docs = response.data.docs;
        
                if (!docs || docs.length <= 0 || !docs[0].pnx.control.recordid || docs[0].pnx.control.recordid.length <= 0)
                    return;

                var recordId = docs[0].pnx.control.recordid[0];
                if (recordId.length <= 0)
                    return;

                if (!recordId.startsWith("TN_dedupmrg")) {
                    return generateHkallUrlPromise(recordId);
                }

                var almaIds = docs[0].pnx.control.almaid;
                if (almaIds && almaIds.length > 0) {
                    for (var i=0; almaIds && i<almaIds.length; i++) {
                        var almaId = almaIds[i];
                        if (almaId.indexOf("$$V") >= 0 && almaId.indexOf("$$O") >=0) {
                            var almaIdV = getAlmaIdSubfield(almaId, "V");
                            if (almaIdV && almaIdV == reqAlmaId) {
                                return generateHkallUrlPromise(getAlmaIdSubfield(almaId, "O"));
                            }
                        }
                    }
                }
            });
            break;
        }
    }
}

app.service('HKALLItemLinkService', ['$location', '$http', '$q', HKALLItemLinkService]);
