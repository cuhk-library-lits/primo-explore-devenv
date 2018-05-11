var TEMPLATE_ACTION_KEY = "action";
var TEMPLATE_ACTION_BEFORE = "before";
var TEMPLATE_ACTION_PREPEND = "prepend";
var TEMPLATE_ACTION_APPEND = "append";
var TEMPLATE_ACTION_AFTER = "after";

function FullViewService($compile, $timeout) {
    this.addTemplate = function (scope, template, querySelector, action) {
        var param = {};
        param[TEMPLATE_ACTION_KEY] = action;
        $timeout(function () {
            var elem = angular.element(document.querySelector(querySelector));
            var compiledNode = $compile(template)(scope);
            switch (param[TEMPLATE_ACTION_KEY]) {
                case TEMPLATE_ACTION_BEFORE:
                    elem.after(compiledNode);
                    compiledNode.after(elem);
                    break;
                case TEMPLATE_ACTION_PREPEND:
                    elem.prepend(compiledNode);
                    break;
                case TEMPLATE_ACTION_APPEND:
                    elem.append(compiledNode);
                    break;
                case TEMPLATE_ACTION_AFTER:
                    elem.after(compiledNode);
                    break;
            }
        }, 0, param);
    };
}

FullViewService.prototype.templateBefore = function (scope, template, querySelector) {
    this.addTemplate(scope, template, querySelector, TEMPLATE_ACTION_BEFORE);
}

FullViewService.prototype.templateAppend = function (scope, template, querySelector) {
    this.addTemplate(scope, template, querySelector, TEMPLATE_ACTION_APPEND);
}

FullViewService.prototype.templatePrepend = function (scope, template, querySelector) {
    this.addTemplate(scope, template, querySelector, TEMPLATE_ACTION_PREPEND);
}

FullViewService.prototype.templateAfter = function (scope, template, querySelector) {
    this.addTemplate(scope, template, querySelector, TEMPLATE_ACTION_AFTER);
}

FullViewService.prototype.reorderSections = function (sections) {
    if (!sections) return false;

    var numSections = sections.length;
    if (!(numSections > 0)) return false;


    // Move the 'details' section
    //            var detailsSection = sections.filter(function(s) {return s.serviceName === 'details';} );
    //            if(detailsSection.length >= 1 ) {
    //                sections.splice(sections.indexOf(detailsSection[0]), 1); //remove
    //                sections.splice(1, 0, detailsSection[0]); //add to the end
    //            }


    // Move the 'links' section
    //            var linksSection = sections.filter(function(s) {return s.serviceName === 'links';} );
    //            if(linksSection.length >= 1 ) {
    //                sections.splice(sections.indexOf(linksSection[0]), 1); //remove
    //                sections.splice(1, 0, linksSection[0]); //add to the end
    //            }


    // Move the 'action_list' section to before 'tags' section
    // Comment: No use?
    var tagsSection = sections.filter(function (s) { return s.serviceName === 'tags'; });
    var actionSection = sections.filter(function (s) { return s.serviceName === 'action_list'; });
    if (actionSection.length >= 1) {
        sections.splice(sections.indexOf(actionSection[0]), 1); //remove
        sections.splice(sections.indexOf(tagsSection[0]), 0, actionSection[0]); //take Tags Section's position
    }

    // Remove the 'virtualBrowse' section
    //            var linksSection = sections.filter(function(s) {return s.serviceName === 'virtualBrowse';} );
    //            if(linksSection.length >= 1 ) {
    //                sections.splice(sections.indexOf(linksSection[0]), 1); //remove
    //            }

    //for($i=0;$i<=sections.length;$i++){
    //  if(sections[$i].serviceName === 'action_list'){
    //alert($i + " -- " + sections[$i].serviceName);
    //alert($i + " -- " + sections[$i].innerHTML);
    //  }
    //}
};

app.service('FullViewService', ['$compile', '$timeout', FullViewService]);
