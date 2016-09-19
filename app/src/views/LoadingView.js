/**
 * Map view
 * @author agimenez
 */

/**
 * @class view.LoadingView
 */
define(["dojo/_base/declare",
        "dojo/dom",
        "dojo/dom-style"], function(declare, dom, domStyle){
    const LoadingView = declare(null, {
        overlayNode: null,
        constructor: function(srcNodeRef){
            // save a reference to the overlay
            this.overlayNode = dom.byId(srcNodeRef);
        },
        // called to hide the loading overlay
        endLoading: function(){
            domStyle.set(this.overlayNode, 'display', 'none');
        }
    });
    return LoadingView;
});