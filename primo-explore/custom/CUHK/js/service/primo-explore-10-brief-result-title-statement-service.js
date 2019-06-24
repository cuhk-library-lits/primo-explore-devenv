function BriefResultTitleStatementService (PnxSubfieldService) {
    this.isDedupRecord = recordid => {
      return recordid && recordid.startsWith("dedupmrg");
    };

    this.preferredStatementOfResponsibility = pnx => {
        var lds09Mappings = {};
        if (pnx && pnx.display && pnx.display.lds09) {
          var lds09Values = pnx.display.lds09;
          if (lds09Values && lds09Values.length > 0) {
            lds09Values.forEach(lds09 => {
              lds09Mappings[PnxSubfieldService.getSubfieldValue(lds09, "O")] = PnxSubfieldService.getSubfieldValue(lds09, "V");
            });
          }
        }
        
        if (lds09Mappings && pnx && pnx.search && pnx.search.recordid && pnx.search.recordid.length > 0) {
            var preferredRecordId = pnx.search.recordid[0].trim();
            if (lds09Mappings.hasOwnProperty(preferredRecordId)) {
                return lds09Mappings[preferredRecordId];
            }
        }

        return null;
    };
}

app.service('BriefResultTitleStatementService', [ 'PnxSubfieldService', BriefResultTitleStatementService ]);
