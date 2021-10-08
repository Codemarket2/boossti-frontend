/*
    Search & Replace Plugin
*/

(function () {
    var js1 = 'https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-core.min.js';
    var js2 = 'https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-textrange.min.js'

    // _cb.getScript(js1);
    // _cb.getScript(js2);
    _cb.getScripts([js1,js2]); //Get js1 first, then after loaded, get js2

    var html = '<div class="is-modal searchreplace">' +
                    '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:32px;height:32px;">' + _cb.out('Search & Replace') +
                        '<div class="is-modal-close" style="z-index:1;width:32px;height:32px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:32px;font-size: 12px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>' +
                    '</div>' +
                    '<iframe style="position: absolute;top: 0;left: 0;width:100%;height:100%;border:none;border-top:32px solid transparent;margin:0;box-sizing:border-box;" src="about:blank"></iframe>' +
                '</div>' +
                '<svg width="0" height="0" style="position:absolute;display:none;">' +
                    '<defs>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-search-strong"><path d="M344.5 298c15-23.6 23.8-51.6 23.8-81.7 0-84.1-68.1-152.3-152.1-152.3C132.1 64 64 132.2 64 216.3c0 84.1 68.1 152.3 152.1 152.3 30.5 0 58.9-9 82.7-24.4l6.9-4.8L414.3 448l33.7-34.3-108.5-108.6 5-7.1zm-43.1-166.8c22.7 22.7 35.2 52.9 35.2 85s-12.5 62.3-35.2 85c-22.7 22.7-52.9 35.2-85 35.2s-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-85s12.5-62.3 35.2-85c22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2z"></path></symbol>' +
                    '</defs>' +
                '</svg>';

    _cb.addHtml(html);

    var button = '<button class="searchreplace-button" title="Search & Replace" style="font-size:15px;vertical-align:bottom;">' +
                    '<svg class="is-icon-flex" style="width:17px;height:17px;"><use xlink:href="#ion-ios-search-strong"></use></svg>' +
                '</button>';

    _cb.addButton('searchreplace', button, '.searchreplace-button', function () {

        
        var modal = document.querySelector(".is-modal.searchreplace");
        modal.className = modal.className + ' active';

        var btnClose = modal.querySelector('.is-modal-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideModal(modal);
        });

        var scriptPath = _cb.getScriptPath();
        modal.querySelector('iframe').src = scriptPath + 'plugins/searchreplace/searchreplace.html';

        // var wraper = _cb.getScope();
        // $wraper.focusEnd();

    });
    
  _cb.addButton2('searchreplace', button, '.searchreplace-button', function () {

        var modal = document.querySelector(".is-modal.searchreplace");
        modal.className = modal.className + ' active';

        var btnClose = modal.querySelector('.is-modal-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideModal(modal);
        });

        var scriptPath = _cb.getScriptPath();
        modal.querySelector('iframe').src = scriptPath + 'plugins/searchreplace/searchreplace.html';

        // var wraper = _cb.getScope();
        // $wraper.focusEnd();

    });

})();

// https://stackoverflow.com/questions/32192664/how-to-select-a-given-string-repeatedly-within-the-text-of-a-contenteditable-ele
function findOne(target, caseSensitive, within, startNode, startPos) {
    if (rangy.supported) {
        var range = rangy.createRange();
        var searchScopeRange = rangy.createRange();

        searchScopeRange.selectNodeContents(within);

        if (startNode != null && startPos != null) {
            searchScopeRange.setStart(startNode, startPos);
        }

        var options = {
            caseSensitive: caseSensitive,
            wholeWordsOnly: true,
            withinRange: searchScopeRange
        };

        if (target !== "") {
            range.findText(target, options);

            selectRange(range.startContainer, range.endContainer, range.startOffset, range.endOffset);
            
            var text = getSelected(parent);
            if (text != '') {
                return true;
            } else {
                return false;
            }
        }
    }

    function selectRange(startNode, endNode, startPos, endPos) {
        var range = document.createRange()
        range.setStart(startNode, startPos);
        range.setEnd(endNode, endPos);

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    function getSelected(window) {
        if (window.getSelection) { return window.getSelection(); }
        else if (document.getSelection) { return document.getSelection(); }
        else {
            var selection = document.selection && document.selection.createRange();
            if (selection.text) { return selection.text; }
            return false;
        }
        return false;
    }

}

// https://stackoverflow.com/questions/1181700/set-cursor-position-on-contenteditable-div/3323835
// $.fn.focusEnd = function () {
//     $(this).focus();
//     var tmp = $('<span />').appendTo($(this)),
//         node = tmp.get(0),
//         range = null,
//         sel = null;

//     if (document.selection) {
//         range = document.body.createTextRange();
//         range.moveToElementText(node);
//         range.select();
//     } else if (window.getSelection) {
//         range = document.createRange();
//         range.selectNode(node);
//         sel = window.getSelection();
//         sel.removeAllRanges();
//         sel.addRange(range);
//     }
//     tmp.remove();
//     return this;
// }