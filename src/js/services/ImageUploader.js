/**
 * Image uploader service
 */
var ImageUploader = (function () {
    return {
        upload: function (url, formData, isLoadingEvent) {
            return {
                post: $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,

                    //handle uploading...
                    xhr: function () {
                        var myXhr = $.ajaxSettings.xhr();

                        //check if upload property exists
                        if (myXhr.upload) {

                            //handle upload event
                            isLoadingEvent;

                            //$('.upload').html('uploading .....')

                        }
                        return myXhr;
                    }
                })
            }
        }
    }
})();

