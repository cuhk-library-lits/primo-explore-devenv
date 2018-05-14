function HKALLItemInstLinkService($location, $http, $q, HKALLItemLinkService) {
    this.enabled = true;

    this.instViewMap = {
        '852JULAC_HKU': { vid: "HKU", tab: "hkall", enabled: true },
        '852JULAC_CUHK': { vid: "CUHK", tab: "hkall_tab", enabled: false },
        '852JULAC_HKUST': { vid: "HKUST", tab: "default_tab", enabled: true },
        '852JULAC_HKPU': { vid: "HKPU", tab: "default_tab", enabled: true },
        '852JULAC_HKBU': { vid: "HKBU", tab: "hkall", enabled: true },
        '852JULAC_CUH': { vid: "CUH", tab: "default_tab", enabled: true },
        '852JULAC_EDUHK': { vid: "EDUHK", tab: "default_tab", enabled: true },
        '852JULAC_LUN': { vid: "LUN", tab: "hkall", enabled: true },
        '852JULAC_NETWORK': { vid: "HKALL", tab: "default_tab", enabled: false },
    };

    this.getAlmaIdSubfield = HKALLItemLinkService.getAlmaIdSubfield;
    this.skipForHkallTab = HKALLItemLinkService.skipForHkallTab;

    this.generateInstHkallItemUrl = function (vid, tab, docId) {
        var instHkallItemUrl = {};

        if (vid && vid.length > 0 && docId && docId.length > 0) {
            instHkallItemUrl.vid = vid;
            instHkallItemUrl.url = "/primo-explore/fulldisplay?" +
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
        var instHkallItemUrls = new Array();
        for (var i = 0; i < almaIds.length; i++) {
            var almaId = almaIds[i];
            var instCodeIdStr = this.getAlmaIdSubfield(almaId, "V");
            var instCode = null;
            if (instCodeIdStr) {
                var instCodeToken = instCodeIdStr.match(/852[^:]*/g);
                if (instCodeToken.length > 0)
                    instCode = instCodeToken[0];
            }

            var docid = this.getAlmaIdSubfield(almaId, "O");
            if (instCode && this.instViewMap[instCode] && this.instViewMap[instCode].enabled) {
                var vid = this.instViewMap[instCode].vid;
                var tab = this.instViewMap[instCode].tab;

                instHkallItemUrls.push(this.generateInstHkallItemUrl(vid, tab, docid));
            }
        }
        return instHkallItemUrls;
    }
    return null;
}

app.service('HKALLItemInstLinkService', ['$location', '$http', '$q', 'HKALLItemLinkService', HKALLItemInstLinkService]);
