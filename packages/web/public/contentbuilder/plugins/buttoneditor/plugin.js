/*
    Button Editor Plugin
*/

(function () {
    var html = '<div class="is-modal buttoneditor">' +
                    '<div style="width:505px;height:620px;background:#fff;position: relative;display: flex;flex-direction: column;align-items: center;padding: 0px;background:#f8f8f8;">' +
                        '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:32px;height:32px;background:#f9f9f9;">' + _cb.out('Button Editor') +
                            '<div class="is-modal-close" style="z-index:1;width:32px;height:32px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:32px;font-size: 12px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>' +
                        '</div>' +
                        '<iframe data-width="1440" style="width:100%;height:100%;max-width:1440px;border:none;border-top:32px solid transparent;margin:0;box-sizing:border-box;background:#fff;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>';

    _cb.addHtml(html);

    var html_button = '<button title="' + _cb.out('Edit Button') + '" data-title="' + _cb.out('Edit Button') + '" class="button-edit" style="display:none;"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-android-create"></use></svg></button>';
    var linkTool = document.querySelector('#divLinkTool');

    linkTool.insertAdjacentHTML('afterBegin', html_button); //add button to existing #divLinkTool
    
    var buttonEdit = linkTool.querySelector('.button-edit');

    //Extend onContentClick
    var oldget = _cb.opts.onContentClick;
    _cb.opts.onContentClick = function (e) {

        let elm = e.target;

        var ret = oldget.apply(this, arguments);
        var elmDisplay = getStyle(elm, 'display');
        if((elm.tagName.toLowerCase() === 'a' && elmDisplay === 'inline-block')) {


            buttonEdit.style.display = 'block';


        } else {

            buttonEdit.style.display = 'none';

        }

        return ret;
    };

    buttonEdit.addEventListener('click', function(){
                
        var modal = document.querySelector('.is-modal.buttoneditor');
        _cb.showModal(modal);

        _cb.saveForUndo(true); // checkLater = true

        var btnClose = modal.querySelector('.is-modal-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideModal(modal);
        });

        var scriptPath = _cb.getScriptPath();
        modal.querySelector('iframe').src = scriptPath + 'plugins/buttoneditor/buttoneditor.html';

    });

    var getStyle = function(element, property) {
        return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
    }

})();

