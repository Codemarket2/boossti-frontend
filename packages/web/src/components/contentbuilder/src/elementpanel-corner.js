import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementCornerStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementCorner');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top: 13px;font-weight: bold;width:100%;">${util.out('Corners')}</div>

            <div class="is-settings clearfix" style="width:100%;margin-bottom:9px;">
                <div>${util.out('Border Radius')}:</div>
                <div>
                    <input type="text" id="inpElmBorderRadius" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div style="margin-top: 25px;font-weight: bold;width:100%;">${util.out('Individual Corners')}</div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Top Left')}:</div>
                <div>
                    <input type="text" id="inpElmBorderTopLeftRadius" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Top Right')}:</div>
                <div>
                    <input type="text" id="inpElmBorderTopRightRadius" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Bottom Left')}:</div>
                <div>
                    <input type="text" id="inpElmBorderBottomLeftRadius" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Bottom Right')}:</div>
                <div>
                    <input type="text" id="inpElmBorderBottomRightRadius" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);

        const inpElmBorderRadius = panelStuff.querySelector('#inpElmBorderRadius');
        inpElmBorderRadius.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderRadius.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBorderRadius').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.borderRadius = val + 'px';
            } else {
                elm.style.borderRadius = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        const inpElmBorderTopLeftRadius = panelStuff.querySelector('#inpElmBorderTopLeftRadius');
        inpElmBorderTopLeftRadius.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderTopLeftRadius.addEventListener('keyup', () => {
            
            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBorderTopLeftRadius').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.borderTopLeftRadius = val + 'px';
            } else {
                elm.style.borderTopLeftRadius = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        const inpElmBorderTopRightRadius = panelStuff.querySelector('#inpElmBorderTopRightRadius');
        inpElmBorderTopRightRadius.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderTopRightRadius.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBorderTopRightRadius').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.borderTopRightRadius = val + 'px';
            } else {
                elm.style.borderTopRightRadius = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmBorderBottomLeftRadius = panelStuff.querySelector('#inpElmBorderBottomLeftRadius');
        inpElmBorderBottomLeftRadius.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderBottomLeftRadius.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBorderBottomLeftRadius').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.borderBottomLeftRadius = val + 'px';
            } else {
                elm.style.borderBottomLeftRadius = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmBorderBottomRightRadius = panelStuff.querySelector('#inpElmBorderBottomRightRadius');
        inpElmBorderBottomRightRadius.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderBottomRightRadius.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBorderBottomRightRadius').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.borderBottomRightRadius = val + 'px';
            } else {
                elm.style.borderBottomRightRadius = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

    }

    readElementStyles(elm) {

        let panelStuff = this.panelStuff;
        
        const inpElmBorderRadius = panelStuff.querySelector('#inpElmBorderRadius');
        inpElmBorderRadius.value = '';
        let s = elm.style.borderRadius;
        let nBorderRadius = parseInt(s);
        if(!isNaN(nBorderRadius)) {        
            inpElmBorderRadius.value = nBorderRadius;
        }   

        const inpElmBorderTopLeftRadius = panelStuff.querySelector('#inpElmBorderTopLeftRadius');
        inpElmBorderTopLeftRadius.value = '';
        s = elm.style.borderTopLeftRadius;
        let nBorderTopLeftRadius = parseInt(s);
        if(!isNaN(nBorderTopLeftRadius)) {        
            inpElmBorderTopLeftRadius.value = nBorderTopLeftRadius;
        }

        const inpElmBorderTopRightRadius = panelStuff.querySelector('#inpElmBorderTopRightRadius');
        inpElmBorderTopRightRadius.value = '';
        s = elm.style.borderTopRightRadius;
        let nBorderTopRightRadius = parseInt(s);
        if(!isNaN(nBorderTopRightRadius)) {        
            inpElmBorderTopRightRadius.value = nBorderTopRightRadius;
        }

        const inpElmBorderBottomLeftRadius = panelStuff.querySelector('#inpElmBorderBottomLeftRadius');
        inpElmBorderBottomLeftRadius.value = '';
        s = elm.style.borderBottomLeftRadius;
        let nBorderBottomLeftRadius = parseInt(s);
        if(!isNaN(nBorderBottomLeftRadius)) {        
            inpElmBorderBottomLeftRadius.value = nBorderBottomLeftRadius;
        }

        const inpElmBorderBottomRightRadius = panelStuff.querySelector('#inpElmBorderBottomRightRadius');
        inpElmBorderBottomRightRadius.value = '';
        s = elm.style.borderBottomRightRadius;
        let nBorderBottomRightRadius = parseInt(s);
        if(!isNaN(nBorderBottomRightRadius)) {        
            inpElmBorderBottomRightRadius.value = nBorderBottomRightRadius;
        }

    }
}

export default ElementCornerStyles;