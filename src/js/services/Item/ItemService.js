/**
 * Handles all Item operations
 */

var ItemService = (function () {

    return {

        AnyItemExists: function () {
            var promise = $.ajax({
                url: document.location.origin + "/admin/itemExists",
                type: 'GET'
            });

            return promise
        },
        add: function (item) {
            
        },

        remove: function (itemId) {
          
        },

       
    }
})();