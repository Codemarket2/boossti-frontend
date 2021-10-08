import { Dom, Util } from './util.js';

const dom = new Dom();

class Iframe {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let iframeTool = builderStuff.querySelector('.is-iframe-tool');
        let iframeModal;
        if(!iframeTool){
            let html = `
            <div class="is-tool is-iframe-tool">
                <button title="${util.out('Settings')}" data-title="${util.out('Settings')}" style="width:40px;height:40px;background:none;"><svg class="is-icon-flex"><use xlink:href="#ion-ios-gear"></use></svg></button>
            </div>
            
            <div class="is-modal iframelink">
                <div style="max-width:550px;">
                    <input class="input-src" type="text" placeholder="Source" style="width:100%;margin-bottom:12px;"/>
                    <textarea class="input-embedcode" type="text" placeholder="Embed Code" style="width:100%;height:300px;margin-bottom:12px;display:none;"></textarea>
                    <div style="text-align:right">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div>
            
            `;

            dom.appendHtml(builderStuff, html);

            iframeTool = builderStuff.querySelector('.is-iframe-tool');
            iframeModal = builderStuff.querySelector('.is-modal.iframelink');


            let btn = iframeTool.querySelector('button');
            dom.addEventListener(btn, 'click', () => { 

                let iframe = this.builder.activeIframe;

                //get values                    
                var src = iframe.src;
                var embeddedYoutubeRegex = /^.*\/\/www.youtube.com\/embed\//;
                var embeddedVimeoRegex = /^.*\/\/player.vimeo.com\/video\//;

                iframeModal.querySelector('.input-src').value = '';
                iframeModal.querySelector('.input-embedcode').value = '';

                if (embeddedYoutubeRegex.exec(src) != null || embeddedVimeoRegex.exec(src) != null) {

                    iframeModal.querySelector('.input-embedcode').style.display = 'none';
                    iframeModal.querySelector('.input-src').style.display = 'block';
                    iframeModal.querySelector('.input-src').value = src;
                    iframeModal.querySelector('.input-src').focus();

                } else {

                    iframeModal.querySelector('.input-src').style.display = 'none';
                    iframeModal.querySelector('.input-embedcode').style.display = 'block';
                    iframeModal.querySelector('.input-embedcode').value = iframe.outerHTML;

                }

                this.util.showModal(iframeModal, true);

            });


            let btnOk = iframeModal.querySelector('.input-ok');
            dom.addEventListener(btnOk, 'click', () => { 
                
                this.builder.uo.saveForUndo();

                let iframe = this.builder.activeIframe;
                let iframeParent = iframe.parentNode;
                
                this.builder.uo.saveForUndo();

                if(iframeModal.querySelector('.input-src').value !== '') {

                    var src = iframeModal.querySelector('.input-src').value;

                    var youRegex = /^http[s]?:\/\/(((www.youtube.com\/watch\?(feature=player_detailpage&)?)v=)|(youtu.be\/))([^#&?]*)/;
                    var vimeoRegex = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/)|(video\/))?([0-9]+)\/?/;
                    var youRegexMatches = youRegex.exec(src);
                    var vimeoRegexMatches = vimeoRegex.exec(src);
                    if ((youRegexMatches !== null || vimeoRegexMatches !== null) && src.indexOf('player.vimeo.com')===-1 && src.indexOf('youtube.com/embed/')===-1) {
                        if (youRegexMatches != null && youRegexMatches.length >= 7) {
                            var youMatch = youRegexMatches[6];
                            src = '//www.youtube.com/embed/' + youMatch + '?rel=0';
                        }
                        if (vimeoRegexMatches != null && vimeoRegexMatches.length >= 7) {
                            var vimeoMatch = vimeoRegexMatches[6];
                            src = '//player.vimeo.com/video/' + vimeoMatch;
                        }
                        iframe.src = src;
                    } else {
                        iframe.src = src;
                    }

                    //Trigger Change event
                    this.builder.opts.onChange();

                } else {

                    var embedcode = iframeModal.querySelector('.input-embedcode').value;

                    if (embedcode !== '') {
                        iframe.outerHTML = embedcode;
                    }

                    this.builder.activeIframe = iframeParent.querySelector('iframe');

                    this.builder.applyBehavior();

                    //Trigger Change event
                    this.builder.opts.onChange();

                }

                this.util.hideModal(iframeModal);

            });

            let btnCancel = iframeModal.querySelector('.input-cancel');
            dom.addEventListener(btnCancel, 'click', () => { 

                this.util.hideModal(iframeModal);

            });

        }
        this.iframeTool = iframeTool;
        this.iframeModal = iframeModal;

    }

    click(e) {

        if (dom.hasClass(e.target,'ovl')) {//iframe overlay

            e.target.style.display = 'none';

            this.builder.activeIframe = e.target.parentNode.querySelector('iframe');

            let elm = this.builder.activeIframe;

            this.iframeTool.style.display = 'flex';
            let _toolwidth = this.iframeTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        
            let w = elm.offsetWidth;
            let top = elm.getBoundingClientRect().top + window.pageYOffset;
            let left = elm.getBoundingClientRect().left - 2;
            left = left + (w - _toolwidth);
                                            
            //Adjust left in case an element is outside the screen
            const _screenwidth = window.innerWidth;
            if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;

            this.iframeTool.style.top = top + 'px';
            this.iframeTool.style.left = left + 'px';
            

        } else {
            
            let ovls = document.querySelectorAll('.ovl');
            Array.prototype.forEach.call(ovls, (ovl) => {
                ovl.style.display = 'block';
            });

            this.builder.activeIframe = null;

            this.iframeTool.style.display = '';

        } 

    }
}

export default Iframe;