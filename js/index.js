$(function () {
    $.ajax({
        url:'getToken',
        success:function (data) {
            console.log(data);
        }
    })

    var extraData = {
        token: ''
    };
    var $item_wrapper = $('#uploaded-item-wrapper');
    new Clipboard('.file_link');
    $('.upload-area').dmUploader({
        url: 'http://upload.qiniu.com',
        method: 'POST',
        extraData: extraData,
        onInit: function () {
        },
        onNewFile: function (id, file) {
            uploadData.key = 'sgy' + '/' + Xinchao.File.getHashName(file.name, 20);
        },
        onBeforeUpload: function () {
        },
        allowedTypes: '*',
        onUploadProgress: function (id, percent) {
        },
        onUploadSuccess: function (uploadId, data) {
            var file_name_original = data['filename'];
            var file_name = data['filename'];
            if (file_name.length > 13) {
                file_name = file_name_original.substr(0, 5) + '...' + file_name_original.substr(-5)
            }
            var html = $item_wrapper.find('.file_name').attr('title', file_name_original).text(file_name)
                .end().find('.file_size').text((data['filesize'] / 1024 / 1024).toFixed(2) + 'M')
                .end().find('.file_message').text('success')
                .end().find('.file_link').attr('data-clipboard-text', 'https://res.psy-1.com/' + data['key'])
                .end().html();
            $('.uploaded-list').prepend(html)
        },
        onFileTypeError: function (file) {
            alert('类型错误');
        },
        onFileSizeError: function (file) {
            alert('文件尺寸错误');
        },
        onUploadError: function (id, message) {
            alert('文件上传出错');
        },
        onFilesMaxError: function (file) {
            alert('文件数量超过限制');
        }
    });
    $('.uploaded-list').on('click', '.file_link', function () {
        var $this = $(this), className = 'hint--top hint-always';
        $this.addClass(className)
        setTimeout(function () {
            $this.removeClass(className)
        }, 1000)
    });

    function getHashName(fileName, hashLength) {
        "use strict";
        var fileInfo = fileName.split('.'), len = hashLength || 10;
        var str = '';
        for (var i = 0; i < fileInfo.length - 1; i++) {
            str += fileInfo[i] + '.'
        }
        str = str.slice(0, -1);
        return str + '-' + Xinchao.Tool.strGetUniq(len) + '.' + fileInfo[fileInfo.length - 1];
    };
})