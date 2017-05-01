/**
 * handles all category operations
 */
var status;

var CartegoryService = (function () {


    return {

        AnyGroupExists: function () {

            var promise = $.ajax({
                url: document.location.origin + "/admin/groupExists",
                type: 'GET'
            });

            return promise

        },

    }

})();
