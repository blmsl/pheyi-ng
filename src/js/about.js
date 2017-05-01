

$(function () {

    $('#book-form').submit(function (e) {
        e.preventDefault();

        var _data = new FormData($('#book-form')[0]);
        
        ImageUploader.upload(
            '../Home/create', _data, $('.upload').html('uploading .....')

        ).post.done(function () {
            $('.upload').html('save');
            alert('upload complete');
        }).error(function (error) {
            console.log(error);
        })

    })


})