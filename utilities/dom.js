// utilities/dom.js
if (window.jQuery && !window.jQuery.uniqueSort) {
    window.jQuery.uniqueSort = window.jQuery.unique;
}

if ($.cssNumber) $.cssNumber.gridColumnStart = true; 


window.dom = {
    create(className, appendTo, options = {}) {
        // 1. Create the element normally
        const $div = $("<div>").addClass(className);

        if (options.html) $div.html(options.html);
        if (options.id)   $div.attr('id', options.id);
        
        // 2. THE VANILLA FIX: Use raw setAttribute for styles
        // This prevents jQuery from adding "px" to the grid-column-start
        if (options.style) {
            $div[0].setAttribute('style', options.style); 
        }
        
        if (options.data) {
            Object.entries(options.data).forEach(([key, val]) => {
                $div.attr(`data-${key}`, val);
            });
        }

        return $div.appendTo(appendTo);
    }
};


// Also attach to window for fallback (optional)
// window.dom = dom;
