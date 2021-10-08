import { Dom, Util } from './util.js';

const dom = new Dom();

class ELementStyleEditor{
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let modalStyles = builderStuff.querySelector('.editstyles');
        if(!modalStyles){
            let html = `
            <div class="is-modal editstyles">
                <div class="is-modal-bar is-draggable" style="">
                    <div class="is-modal-close" style="z-index:1;width:20px;height:20px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:20px;font-size:10px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>
                </div>
                <div style="padding:12px">
                    <div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">
                        <div>${util.out('Style')}:</div>
                        <div>
                            <textarea id="inpElmInlineStyle" style="width:100%;height:256px;margin:0px;border:none;background:#f3f3f3;font-size: 14px;line-height: 1.5;letter-spacing: 0;"></textarea>
                        </div>
                    </div>
                    <div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">
                        <div>${util.out('Class')}:</div>
                        <div>
                            <input type="text" id="inpElmClassName" value="" style="width:100%;padding-left: 16px;font-family: courier;font-size: 17px;line-height: 2;letter-spacing: 1px;border:none;background:#f3f3f3;"/>
                        </div>
                    </div>
                </div>
            </div>           
            `;

            dom.appendHtml(builderStuff, html);

            modalStyles = builderStuff.querySelector('.editstyles');

            let btn = modalStyles.querySelector('.is-modal-close');
            dom.addEventListener(btn, 'click', () => {
                dom.removeClass(modalStyles, 'active');

                var panel = this.builderStuff.querySelector('.is-side.elementstyles'); // if all close
                if(!dom.hasClass(panel, 'active')) {
                    let elms = document.querySelectorAll('[data-saveforundo]');
                    Array.prototype.forEach.call(elms, (elm) => {
                        elm.removeAttribute('data-saveforundo');
                    });
                    elms = document.querySelectorAll('.elm-inspected');
                    Array.prototype.forEach.call(elms, (elm) => {
                        dom.removeClass(elm, 'elm-inspected');
                    });
                }

            });

            let inp = modalStyles.querySelector('#inpElmClassName');
            inp.addEventListener('keyup', () => {
                let elm = this.builder.inspectedElement;
                let val = modalStyles.querySelector('#inpElmClassName').value;

                //builder classes
                let bElmActive = false;
                if(dom.hasClass(elm,'elm-active')){
                    bElmActive = true;
                }
                let bCellActive = false;
                if(dom.hasClass(elm,'elm-active')){
                    bCellActive = true;
                }
                let bRowActive = false;
                if(dom.hasClass(elm,'row-active')){
                    bRowActive = true;
                }

                elm.setAttribute('class', val); //update

                //builder classes
                if(bElmActive) dom.addClass(elm, 'elm-active');
                if(bCellActive) dom.addClass(elm, 'cell-active');
                if(bRowActive) dom.addClass(elm, 'row-active');

                dom.addClass(elm,'elm-inspected');
        
                //Trigger Change event
                this.builder.opts.onChange();
            });

            inp = modalStyles.querySelector('#inpElmInlineStyle');
            inp.addEventListener('keyup', () => {
                this.builder.inspectedElement.style.cssText = modalStyles.querySelector('#inpElmInlineStyle').value;
        
                //Trigger Change event
                this.builder.opts.onChange();
            });

        }
        this.modalStyles = modalStyles;

    }

    toggleStyleEditor() {

        if(!dom.hasClass(this.modalStyles,'active')){
            dom.addClass(this.modalStyles, 'active');
        } else {
            dom.removeClass(this.modalStyles, 'active');
        }
    }

    refresh() {
        this.modalStyles.querySelector('#inpElmInlineStyle').value = this.builder.inspectedElement.style.cssText;

        let s = this.builder.inspectedElement.getAttribute('class');
        if(s) {
            s = s.replace('elm-active', '');
            s = s.replace('cell-active', '');
            s = s.replace('row-active', '');
            s = s.replace('elm-inspected', '');
            s = s.replace('  ', ' ').trim();
        }
        this.modalStyles.querySelector('#inpElmClassName').value = s;
    }

}

export default ELementStyleEditor;