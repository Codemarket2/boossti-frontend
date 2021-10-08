/*
    Word Count Plugin
*/

(function () {

    var html = '<div class="is-modal wordcount" style="z-index:10005">' +
                    '<div style="max-width:300px;height:200px;padding:0;">' +
                        '<div class="is-modal-bar is-draggable" style="height:32px;line-height:32px;">' + 
                            _cb.out('Word Count') +
                            '<div class="is-modal-close">&#10005;</div>' +
                        '</div>' +
                        '<div style="padding:19px 20px 0;">' +
                            '<div style="line-height:1"><span id="spanWords" style="font-size:60px;font-weight:700;color:#333"></span> &nbsp;<span style="letter-spacing: 1px;color: #333;font-size:15px;">' + _cb.out('words') + '</span></div>' +
                            '<div style="padding:8px 0 0 5px;letter-spacing: 1px;color: #333;font-size:15px;">' +
                                _cb.out('Characters') + ': <span id="spanChars"></span><br>' +
                                _cb.out('Characters (no spaces)') + ': <span id="spanCharsNoSpaces"></span>' +
                            '</div>' +
                            '<div id="tmp_wordcount" style="width:1px;height:1px;visibility:hidden;""></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<svg width="0" height="0" style="display:none;">' +
                    '<defs>' +
                        '<symbol viewBox="0 0 512 512" id="ion-information"><path d="M288 448V192h-96v16h32v240h-32v16h128v-16zM255.8 144.5c26.6 0 48.2-21.6 48.2-48.2s-21.6-48.2-48.2-48.2-48.2 21.6-48.2 48.2 21.6 48.2 48.2 48.2z"></path></symbol>' +
                    '</defs>' +
                '</svg>';

    _cb.addHtml(html);

    var css = '' +
            '' +
        '';

    _cb.addCss(css);

    var button = '<button class="wordcount-button" title="Word Count" style="font-size:15px;vertical-align:bottom;">' +
                    '<svg class="is-icon-flex" style="margin-top:-1px"><use xlink:href="#ion-information"></use></svg>' +
                '</button>';

    _cb.addButton('wordcount', button, '.wordcount-button', function () {

        showWordCount();

    });
    _cb.addButton2('wordcount', button, '.wordcount-button', function () {

        showWordCount();

    });

    function showWordCount() {
        var modal = document.querySelector(".is-modal.wordcount");
        _cb.showModal(modal, true);


        modal.querySelector('#tmp_wordcount').innerHTML = _cb.html();
        var txt = modal.querySelector('#tmp_wordcount').textContent;
        modal.querySelector('#tmp_wordcount').innerHTML = '';
        // https://stackoverflow.com/questions/9864644/jquery-character-and-word-count
        var chars = txt.length;
        var charsnospaces = txt.replace(/\s/g, "").length;
        var words = txt.replace(/[^\w ]/g, "").split(/\s+/).length;

        modal.querySelector('#spanWords').innerText = words;
        modal.querySelector('#spanChars').innerText = chars;
        modal.querySelector('#spanCharsNoSpaces').innerText = charsnospaces;
        
        var btnClose = modal.querySelector('.is-modal-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideModal(modal);
        });
    }

})();
