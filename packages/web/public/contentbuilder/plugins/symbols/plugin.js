/*
    Insert HTML Symbols Plugin
*/

(function () {

    var html = '<div class="is-modal is-side' + (_cb.settings.sidePanel == 'right' ? '' : ' fromleft') + ' viewsymbols" style="width:280px;z-index:10004;">' +
                    '<button title="' + _cb.out('Close') + '" class="is-side-close" style="z-index:1;width:25px;height:25px;position:absolute;top:10px;right:13px;box-sizing:border-box;padding:0;line-height:25px;font-size: 12px;text-align:center;cursor:pointer;background:transparent"><svg class="is-icon-flex" style="width:25px;height:25px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                    
                    '' +
                    '<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;border: none;"></iframe>' +
                    '' +
                '</div>';

    _cb.addHtml(html);

    var button = '<button class="insertsymbol-button" title="Symbol" style="font-size:14px;vertical-align:bottom;">' +
                    '&#8486;' +
                '</button>';

    _cb.addButton('symbols', button, '.insertsymbol-button', function () {

        var modal = document.querySelector('.is-side.viewsymbols');
        _cb.showSidePanel(modal);
        var btnClose = modal.querySelector('.is-side-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideSidePanel(modal);
        });

        var scriptPath = _cb.getScriptPath();
        modal.querySelector('iframe').src = scriptPath + 'plugins/symbols/symbols.html';


    });
    
    _cb.addButton2('symbols', button, '.insertsymbol-button', function () {

        var modal = document.querySelector('.is-side.viewsymbols');
        _cb.showSidePanel(modal);
        var btnClose = modal.querySelector('.is-side-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideSidePanel(modal);
        });

        var scriptPath = _cb.getScriptPath();
        modal.querySelector('iframe').src = scriptPath + 'plugins/symbols/symbols.html';


    });

})();