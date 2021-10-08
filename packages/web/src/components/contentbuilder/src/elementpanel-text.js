import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementTextStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementText');
        this.panelStuff = panelStuff;
        
        const html = `
            <div class="is-settings clearfix" style="width:115px;">
                <div>Text Color:</div>
                <div>
                    <button title="${util.out('Text Color')}" class="input-elm-color is-btn-color"></button>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Font Size')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmFontSize" value="" style="width:45px"/>
                    <select id="inpElmFontSizeUnit">
                        <option value=""></option>
                        <option value="px">px</option>
                        <option value="pt">pt</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Text Align')}:</div>
                <div>
                    <select id="inpElmTextAlign">
                        <option value=""></option>
                        <option value="left">${util.out('Left')}</option>
                        <option value="center">${util.out('Center')}</option>
                        <option value="right">${util.out('Right')}</option>
                        <option value="justify">${util.out('Full')}</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Line Height')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmLineHeight" value="" style="width:45px"/>
                    <select id="inpElmLineHeightUnit">
                        <option value=""></option>
                        <option value="px">px</option>
                        <option value="pt">pt</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Font Weight')}:</div>
                <div>
                    <select id="inpElmFontWeight">
                        <option value=""></option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                        <option value="bold">${util.out('Bold')}</option>
                        <option value="normal">${util.out('Normal')}</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Font Style')}:</div>
                <div>
                    <select id="inpElmFontStyle">
                        <option value=""></option>
                        <option value="italic">${util.out('Italic')}</option>
                        <option value="normal">${util.out('Normal')}</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Text Transform')}:</div>
                <div>
                    <select id="inpElmTextTransform">
                        <option value=""></option>
                        <option value="uppercase">${util.out('Uppercase')}</option>
                        <option value="lowercase">${util.out('Lowercase')}</option>
                        <option value="capitalize">${util.out('Capitalize')}</option>
                        <option value="none">${util.out('None')}</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Text Decoration')}:</div>
                <div>
                    <select id="inpElmTextDecoration">
                        <option value=""></option>
                        <option value="underline">${util.out('Underline')}</option>
                        <option value="line-through">${util.out('Line Through')}</option>
                        <option value="overline">${util.out('Overline')}</option>
                        <option value="none">${util.out('None')}</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Letter Spacing')}:</div>
                <div>
                    <input type="text" id="inpElmLetterSpacing" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div class="is-settings clearfix" style="width:115px;">
                <div>${util.out('Word Spacing')}:</div>
                <div>
                    <input type="text" id="inpElmWordSpacing" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div class="is-settings clearfix" style="width:100%;">
                <div>${util.out('Font Family')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmFontFamily" value="" style="width:100%"/>
                    <button title="${util.out('Select Font')}" class="input-elm-fontfamily" style="border-left: none;width:45px;padding:0;"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);

        const htmlmodal = `
            <div class="is-modal pickfontfamily">
                <div style="max-width:303px;padding:0;box-sizing:border-box;position:relative;">
                    <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;"> ${util.out('Font')} </div>
                    <div class="clearfix" style="margin-top:28px;padding:0px;height:300px;position:relative;">
                        <iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;border: none;"></iframe>
                    </div>
                </div>
            </div>
        `;
        dom.appendHtml(builderStuff, htmlmodal);
        const fontModal = builderStuff.querySelector('.is-modal.pickfontfamily');

        // Text color
        let btnElmTextColor = panelStuff.querySelector('.input-elm-color');
        btnElmTextColor.addEventListener('click', (e) => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true

            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.color = color;
                
                elm.style.backgroundColor = color; // preview

                elementStyleEditor.refresh();

                //Trigger Change event
                this.builder.opts.onChange();
                
            }, btnElmTextColor.style.backgroundColor);
        });

        /*
            Text Style
            by Tinara
        */

        let inpElmTextAlign = panelStuff.querySelector('#inpElmTextAlign');
        inpElmTextAlign.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmTextAlign').value;
            elm.style.textAlign = val;

            elementStyleEditor.refresh();

            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmFontWeight = panelStuff.querySelector('#inpElmFontWeight');
        inpElmFontWeight.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmFontWeight').value;
            elm.style.fontWeight = val;

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmFontStyle = panelStuff.querySelector('#inpElmFontStyle');
        inpElmFontStyle.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmFontStyle').value;
            elm.style.fontStyle = val;

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmTextTransform = panelStuff.querySelector('#inpElmTextTransform');
        inpElmTextTransform.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmTextTransform').value;
            elm.style.textTransform = val;

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmTextDecoration = panelStuff.querySelector('#inpElmTextDecoration');
        inpElmTextDecoration.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmTextDecoration').value;
            elm.style.textDecoration = val;

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmFontSize = panelStuff.querySelector('#inpElmFontSize');
        inpElmFontSize.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmFontSize.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmFontSize').value;
            let unit = panelStuff.querySelector('#inpElmFontSizeUnit').value;
            if(unit==='') {
                panelStuff.querySelector('#inpElmFontSizeUnit').value = 'px';
                unit = 'px';
            }
            
            if(!isNaN(val) && val!==''){
                elm.style.fontSize = val + unit;
            } else {
                elm.style.fontSize = '';
            }

            // Get current class size & remove all class size from the element
            const arrSizes = this.builder.opts.fontSizeClassValues;
            for(var i=0;i<=arrSizes.length-1;i++){
                if (dom.hasClass(elm, 'size-'+arrSizes[i])) {
                    dom.removeClass(elm, 'size-'+arrSizes[i]);
                }
            }

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmFontSizeUnit = panelStuff.querySelector('#inpElmFontSizeUnit');
        inpElmFontSizeUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmFontSize').value;
            let unit = panelStuff.querySelector('#inpElmFontSizeUnit').value;

            if(!isNaN(val) && val!==''){
                elm.style.fontSize = val + unit;
            } else {
                elm.style.fontSize = '';
            }

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmLineHeight = panelStuff.querySelector('#inpElmLineHeight');
        inpElmLineHeight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmLineHeight.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmLineHeight').value;
            let unit = panelStuff.querySelector('#inpElmLineHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.lineHeight = val + unit;
            } else {
                elm.style.lineHeight = '';
            }   

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmLineHeightUnit = panelStuff.querySelector('#inpElmLineHeightUnit');
        inpElmLineHeightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let unit = panelStuff.querySelector('#inpElmLineHeightUnit').value;
            let val = panelStuff.querySelector('#inpElmLineHeight').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.lineHeight = val + unit;
            } else {
                elm.style.lineHeight = '';
            }

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmLetterSpacing = panelStuff.querySelector('#inpElmLetterSpacing');
        inpElmLetterSpacing.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmLetterSpacing.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmLetterSpacing').value;

            if(!isNaN(val) && val!==''){
                elm.style.letterSpacing = val + 'px';
            } else {
                elm.style.letterSpacing = '';
            }

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmWordSpacing = panelStuff.querySelector('#inpElmWordSpacing');
        inpElmWordSpacing.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmWordSpacing.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmWordSpacing').value;

            if(!isNaN(val) && val!==''){
                elm.style.wordSpacing = val + 'px';
            } else {
                elm.style.wordSpacing = '';
            }

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        // Font Family
        let inpElmFontFamily = panelStuff.querySelector('#inpElmFontFamily');
        inpElmFontFamily.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmFontFamily.addEventListener('keyup', () => {

            let val = panelStuff.querySelector('#inpElmFontFamily').value;
            this.builder.inspectedElement.style.fontFamily = val;

            elementStyleEditor.refresh();
            
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let iframe = fontModal.querySelector('iframe');
        var doc = iframe.contentWindow.document;
        doc.open();
        if(!this.builder.opts.emailMode) {
            doc.write(this.util.getFontFamilyHTML());
        } else {
            doc.write(this.util.getFontFamilyEmail());
        }
        doc.close();

        let btn = panelStuff.querySelector('.input-elm-fontfamily');
        btn.addEventListener('click', () => {

            let elm = this.builder.inspectedElement;

            //show modal        
            this.util.showModal(fontModal);

            //Get active font
            var s = elm.style.fontFamily;
            const iframe = fontModal.querySelector('iframe');
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            if(s!=='') {

                let fontname = s.split(',')[0];
                fontname = fontname.replace('"','').replace('"','');
                fontname = fontname.toLowerCase().trim();

                if(iframeDocument) {
                    [].forEach.call(iframeDocument.querySelectorAll('#divFontList > div'),function(e){
                        var f = e.getAttribute('data-font-family');
                        f = f.split(',')[0];
                        f = f.trim().toLowerCase();
                        
                        if(f===fontname && f!=='') {
                            dom.addClass(e,'on');
                        } else {
                            dom.removeClass(e,'on');
                        }
                        
                    });

                    //Select active font
                    let area = iframeDocument.querySelector('#divFontList');
                    var target = area.querySelector('.on');
                    if(target) area.scrollTop = area.scrollTop + target.getBoundingClientRect().top;
                }

            } else {

                if(iframeDocument) {
                    [].forEach.call(iframeDocument.querySelectorAll('#divFontList > div'),function(e){
                        
                        dom.removeClass(e,'on');
                        
                    });
                }
                
            }

        });

    }

    readElementStyles(elm) {

        this.panelStuff.querySelector('.input-elm-color').style.backgroundColor = elm.style.color;
                  
        /*
            Text Style
            by Tinara
        */

        this.panelStuff.querySelector('#inpElmTextAlign').value = '';
        var sTextAlign = elm.style.textAlign;
        this.panelStuff.querySelector('#inpElmTextAlign').value = sTextAlign;

        this.panelStuff.querySelector('#inpElmFontSize').value = '';
        var nFontSize = parseInt(elm.style.fontSize);
        if(!isNaN(nFontSize)) {
            this.panelStuff.querySelector('#inpElmFontSize').value = nFontSize;
        }

        let sFontSizeUnit;
        this.panelStuff.querySelector('#inpElmFontSizeUnit').value = 'px';
        var s = elm.style.fontSize;
        if(s.indexOf('px')!==-1){
            sFontSizeUnit ='px';
        }
        if(s.indexOf('pt')!==-1){
            sFontSizeUnit ='pt';
        }
        if(s.indexOf('em')!==-1){
            sFontSizeUnit ='em';
        }
        if(s.indexOf('vw')!==-1){
            sFontSizeUnit ='vw';
        }
        if(s.indexOf('vh')!==-1){
            sFontSizeUnit ='vh';
        }
        if(s.indexOf('%')!==-1){
            sFontSizeUnit ='%';
        }
        this.panelStuff.querySelector('#inpElmFontSizeUnit').value = sFontSizeUnit;

        this.panelStuff.querySelector('#inpElmFontWeight').value = '';
        var sFontWeight = elm.style.fontWeight;
        this.panelStuff.querySelector('#inpElmFontWeight').value = sFontWeight;
        
        this.panelStuff.querySelector('#inpElmFontStyle').value = '';
        var sFontStyle = elm.style.fontStyle;
        this.panelStuff.querySelector('#inpElmFontStyle').value = sFontStyle;

        this.panelStuff.querySelector('#inpElmTextTransform').value = '';
        var sTextTransform = elm.style.textTransform;
        this.panelStuff.querySelector('#inpElmTextTransform').value = sTextTransform;

        this.panelStuff.querySelector('#inpElmTextDecoration').value = '';
        var sTextDecoration = elm.style.textDecoration;
        this.panelStuff.querySelector('#inpElmTextDecoration').value = sTextDecoration;

        this.panelStuff.querySelector('#inpElmLineHeight').value = '';
        if(!isNaN(elm.style.lineHeight)) {
            this.panelStuff.querySelector('#inpElmLineHeight').value = elm.style.lineHeight;
        } else {
            var nLineHeight = parseInt(elm.style.lineHeight);
            if(!isNaN(nLineHeight)) {
                this.panelStuff.querySelector('#inpElmLineHeight').value = nLineHeight;
            }
        }

        let sLineHeightUnit;
        this.panelStuff.querySelector('#inpElmLineHeightUnit').value = '';
        s = elm.style.lineHeight;
        if(s.indexOf('px')!==-1){
            sLineHeightUnit ='px';
        }
        if(s.indexOf('pt')!==-1){
            sLineHeightUnit ='pt';
        }
        this.panelStuff.querySelector('#inpElmLineHeightUnit').value = sLineHeightUnit;

        this.panelStuff.querySelector('#inpElmLetterSpacing').value = '';
        var nLetterSpacing = parseInt(elm.style.letterSpacing);
        if(!isNaN(nLetterSpacing)) {
            this.panelStuff.querySelector('#inpElmLetterSpacing').value = nLetterSpacing;
        }

        this.panelStuff.querySelector('#inpElmWordSpacing').value = '';
        var nWordSpacing = parseInt(elm.style.wordSpacing);
        if(!isNaN(nWordSpacing)) {
            this.panelStuff.querySelector('#inpElmWordSpacing').value = nWordSpacing;
        }
 
        this.panelStuff.querySelector('#inpElmFontFamily').value = '';
        var sFontFamily = elm.style.fontFamily;
        if(sFontFamily!=='') {
            this.panelStuff.querySelector('#inpElmFontFamily').value = sFontFamily;
        }

    }

}

export default ElementTextStyles;