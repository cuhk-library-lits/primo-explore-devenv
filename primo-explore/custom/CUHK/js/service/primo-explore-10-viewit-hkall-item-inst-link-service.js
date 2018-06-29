function HKALLItemInstLinkService($location, $http, $q, HKALLItemLinkService) {
    this.enabled = false;

    this.instViewMap = {
        '852JULAC_HKU':     { inst: "HKU_ALMA", vid: "HKU", tab: "hkall", enabled: true },
        '852JULAC_CUHK':    { inst: "CUHK_ALMA", vid: "CUHK", tab: "hkall_tab", enabled: false },
        '852JULAC_HKUST':   { inst: "HKUST_ALMA", vid: "HKUST", tab: "default_tab", enabled: true },
        '852JULAC_HKPU':    { inst: "HKPU_ALMA", vid: "HKPU", tab: "default_tab", enabled: true },
        '852JULAC_HKBU':    { inst: "HKBU_ALMA", vid: "HKBU", tab: "hkall", enabled: true },
        '852JULAC_CUH':     { inst: "CUH_ALMA", vid: "CUH", tab: "default_tab", enabled: true },
        '852JULAC_EDUHK':   { inst: "EDUHK_ALMA", vid: "EDUHK", tab: "default_tab", enabled: true },
        '852JULAC_LUN':     { inst: "LUN_ALMA", vid: "LUN", tab: "hkall", enabled: true },
        '852JULAC_NETWORK': { inst: "JULAC_NETWORK", vid: "HKALL", tab: "default_tab", enabled: false },
    };

    this.getAlmaIdSubfield = HKALLItemLinkService.getAlmaIdSubfield;
    this.skipForHkallTab = HKALLItemLinkService.skipForHkallTab;

    this.generateInstHkallItemUrl = function (vid, tab, docId) {
        var instHkallItemUrl = null;

        if (vid && vid.length > 0 && docId && docId.length > 0) {
            instHkallItemUrl = "/primo-explore/fulldisplay?" +
                                     "docid=" + docId +
                                     "&vid=" + vid +
                                     "&tab=" + tab +
                                     "&context=P2P&search_scope=HKALL_PTP2&adaptor=HKALL_PTP2";
        }
        return instHkallItemUrl;
    }
}

HKALLItemInstLinkService.prototype.getHkallInstItemUrls = function (itemPnx) {
    // Only display for HKALL tab
    if (!this.skipForHkallTab())
        return null;

    var almaIds = itemPnx.control.almaid;
    if (almaIds && almaIds.length > 0) {
        var instHkallItemUrls = {};
        for (var i = 0; i < almaIds.length; i++) {
            var almaId = almaIds[i];

            var instCode = null;
            var docid = null;
            if (almaId.indexOf("$$V") >= 0) {
                var instCodeIdStr = this.getAlmaIdSubfield(almaId, "V");
                if (instCodeIdStr) {
                    var instCodeToken = instCodeIdStr.match(/852[^:]*/g);
                    if (instCodeToken.length > 0)
                        instCode = instCodeToken[0];
                }
                docid = this.getAlmaIdSubfield(almaId, "O");
                
            } else {
                var instCodeIdStr = almaId;
                if (instCodeIdStr) {
                    var instCodeToken = instCodeIdStr.match(/852[^:]*/g);
                    if (instCodeToken.length > 0)
                        instCode = instCodeToken[0];
                }

                var docid = itemPnx.control.recordid;
            }
            if (instCode && this.instViewMap[instCode] && this.instViewMap[instCode].enabled) {
                var inst = this.instViewMap[instCode].inst;
                var vid = this.instViewMap[instCode].vid;
                var tab = this.instViewMap[instCode].tab;

                instHkallItemUrls[inst] = this.generateInstHkallItemUrl(vid, tab, docid);
            }
            
        }
        return instHkallItemUrls;
    }
    return null;
}

app.service('HKALLItemInstLinkService', ['$location', '$http', '$q', 'HKALLItemLinkService', HKALLItemInstLinkService]);
