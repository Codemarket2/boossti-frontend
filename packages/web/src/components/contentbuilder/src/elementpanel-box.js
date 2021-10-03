import { Dom, Util } from './util.js';
import GradientPicker from './gradientpicker.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementBoxStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementBox');
        this.panelStuff = panelStuff;
        
        const html = `
                <div class="is-settings clearfix">
                    <div class="is-label">${util.out('Background Color')}:</div>
                    <div>
                        <button title="${util.out('Background Color')}" class="input-elm-bgcolor is-btn-color"></button>
                        <button title="${util.out('Gradient')}" class="input-elm-gradient" data-value="+"> ${util.out('Gradient')} </button>
                    </div>
                </div>

                <div style="margin-top: 25px;font-weight:bold;width:100%;">${util.out('Dimension')}</div>
                
                <div class="is-settings clearfix" style="width:110px">
                    <div>${util.out('Width')}:</div>
                    <div style="display:flex">
                        <input type="text" id="inpElmWidth" value="" style="width:45px"/>
                        <select id="inpElmWidthUnit"">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                </div>
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Height')}:</div>
                    <div style="display:flex">
                        <input type="text" id="inpElmHeight" value="" style="width:45px"/>
                        <select id="inpElmHeightUnit"">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                </div>
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Max Width')}:</div>
                    <div style="display:flex">
                        <input type="text" id="inpElmMaxWidth" value="" style="width:45px"/>
                        <select id="inpElmMaxWidthUnit"">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                </div>
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Max Height')}:</div>
                    <div style="display:flex">
                        <input type="text" id="inpElmMaxHeight" value="" style="width:45px"/>
                        <select id="inpElmMaxHeightUnit"">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                </div>
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Min Width')}:</div>
                    <div style="display:flex">
                        <input type="text" id="inpElmMinWidth" value="" style="width:45px"/>
                        <select id="inpElmMinWidthUnit"">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                </div>
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Min Height')}:</div>
                    <div style="display:flex">
                        <input type="text" id="inpElmMinHeight" value="" style="width:45px"/>
                        <select id="inpElmMinHeightUnit"">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                </div>
                
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Overflow x')}:</div>
                    <div>
                        <select id="inpElmOverflowX"">
                            <option value=""></option>
                            <option value="auto">Auto</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>
                </div>
                <div class="is-settings clearfix" style="width:110px;">
                    <div>${util.out('Overflow y')}:</div>
                    <div>
                        <select id="inpElmOverflowY"">
                            <option value=""></option>
                            <option value="auto">Auto</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>
                </div>
        `;
        dom.appendHtml(panelStuff, html);

        // Background color
        let btnElmBgColor = panelStuff.querySelector('.input-elm-bgcolor');
        btnElmBgColor.addEventListener('click', (e) => {

            this.builder.uo.saveForUndo(true); // checkLater = true

            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.backgroundColor = color;
                
                elm.style.backgroundColor = color; // preview

                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, panelStuff.querySelector('.input-elm-bgcolor').style.backgroundColor);
        });

        // Background gradient
        const gradientPicker = new GradientPicker({
            colors: this.builder.colors,
            gradientcolors: this.builder.opts.gradientcolors,
            lang: this.builder.opts.lang
        });
        
        let btnElmGradient = panelStuff.querySelector('.input-elm-gradient');
        btnElmGradient.addEventListener('click', () => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true

            gradientPicker.open(this.builder.inspectedElement, ()=>{

                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, (isChanged) => {
                if(isChanged) {
                    
                    elementStyleEditor.refresh();

                } 
            });
        });

        // Others
        let inpElmMaxWidth = panelStuff.querySelector('#inpElmMaxWidth');
        inpElmMaxWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmMaxWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMaxWidth').value;
            let unit = panelStuff.querySelector('#inpElmMaxWidthUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.maxWidth = val + unit;
            } else {
                elm.style.maxWidth = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMaxWidthUnit = panelStuff.querySelector('#inpElmMaxWidthUnit');
        inpElmMaxWidthUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMaxWidth').value;
            let unit = panelStuff.querySelector('#inpElmMaxWidthUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.maxWidth = val + unit;
            } else {
                elm.style.maxWidth = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMaxHeight = panelStuff.querySelector('#inpElmMaxHeight');
        inpElmMaxHeight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmMaxHeight.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMaxHeight').value;
            let unit = panelStuff.querySelector('#inpElmMaxHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.maxHeight = val + unit;
            } else {
                elm.style.maxHeight = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMaxHeightUnit = panelStuff.querySelector('#inpElmMaxHeightUnit');
        inpElmMaxHeightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMaxHeight').value;
            let unit = panelStuff.querySelector('#inpElmMaxHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.maxHeight = val + unit;
            } else {
                elm.style.maxHeight = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMinWidth = panelStuff.querySelector('#inpElmMinWidth');
        inpElmMinWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmMinWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMinWidth').value;
            let unit = panelStuff.querySelector('#inpElmMinWidthUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.minWidth = val + unit;
            } else {
                elm.style.minWidth = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMinWidthUnit = panelStuff.querySelector('#inpElmMinWidthUnit');
        inpElmMinWidthUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMinWidth').value;
            let unit = panelStuff.querySelector('#inpElmMinWidthUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.minWidth = val + unit;
            } else {
                elm.style.minWidth = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMinHeight = panelStuff.querySelector('#inpElmMinHeight');
        inpElmMinHeight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmMinHeight.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMinHeight').value;
            let unit = panelStuff.querySelector('#inpElmMinHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.minHeight = val + unit;
            } else {
                elm.style.minHeight = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMinHeightUnit = panelStuff.querySelector('#inpElmMinHeightUnit');
        inpElmMinHeightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmMinHeight').value;
            let unit = panelStuff.querySelector('#inpElmMinHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.minHeight = val + unit;
            } else {
                elm.style.minHeight = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmWidth = panelStuff.querySelector('#inpElmWidth');
        inpElmWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmWidth').value;
            let unit = panelStuff.querySelector('#inpElmWidthUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.width = val + unit;
            } else {
                elm.style.width = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmWidthUnit = panelStuff.querySelector('#inpElmWidthUnit');
        inpElmWidthUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmWidth').value;
            let unit = panelStuff.querySelector('#inpElmWidthUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.width = val + unit;
            } else {
                elm.style.width = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmHeight = panelStuff.querySelector('#inpElmHeight');
        inpElmHeight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmHeight.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmHeight').value;
            let unit = panelStuff.querySelector('#inpElmHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.height = val + unit;
            } else {
                elm.style.height = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmHeightUnit = panelStuff.querySelector('#inpElmHeightUnit');
        inpElmHeightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmHeight').value;
            let unit = panelStuff.querySelector('#inpElmHeightUnit').value;
            
            if(!isNaN(val) && val!==''){
                elm.style.height = val + unit;
            } else {
                elm.style.height = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmOverflowX = panelStuff.querySelector('#inpElmOverflowX');
        inpElmOverflowX.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmOverflowX').value;
            
            elm.style.overflowX = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
                   
        let inpElmOverflowY = panelStuff.querySelector('#inpElmOverflowY');
        inpElmOverflowY.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmOverflowY').value;
            
            elm.style.overflowY = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

    }

    readElementStyles(elm) {

        let panelStuff = this.panelStuff;

        // Background color
        let s = elm.style.backgroundColor;
        let btn = panelStuff.querySelector('.input-elm-bgcolor');  
        if(s) btn.style.backgroundColor = s;
        else btn.style.backgroundColor = 'transparent';                 
                                
        // Max Width
        const inpElmMaxWidth = panelStuff.querySelector('#inpElmMaxWidth');
        const inpElmMaxWidthUnit = panelStuff.querySelector('#inpElmMaxWidthUnit');
        inpElmMaxWidth.value = '';
        inpElmMaxWidthUnit.value = 'px';
        s = elm.style.maxWidth;
        let nMaxWidth = parseInt(s);
        if(!isNaN(nMaxWidth)) {
            if(s.indexOf('%')!==-1) inpElmMaxWidthUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMaxWidthUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMaxWidthUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMaxWidthUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMaxWidthUnit.value = 'em';            
            inpElmMaxWidth.value = nMaxWidth;
        }        

        // Max Height
        const inpElmMaxHeight = panelStuff.querySelector('#inpElmMaxHeight');
        const inpElmMaxHeightUnit = panelStuff.querySelector('#inpElmMaxHeightUnit');
        inpElmMaxHeight.value = '';
        inpElmMaxHeightUnit.value = 'px';
        s = elm.style.maxHeight;
        let nMaxHeight = parseInt(s);
        if(!isNaN(nMaxHeight)) {
            if(s.indexOf('%')!==-1) inpElmMaxHeightUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMaxHeightUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMaxHeightUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMaxHeightUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMaxHeightUnit.value = 'em';            
            inpElmMaxHeight.value = nMaxHeight;
        }

        // Min Width
        const inpElmMinWidth = panelStuff.querySelector('#inpElmMinWidth');
        const inpElmMinWidthUnit = panelStuff.querySelector('#inpElmMinWidthUnit');
        inpElmMinWidth.value = '';
        inpElmMinWidthUnit.value = 'px';
        s = elm.style.minWidth;
        let nMinWidth = parseInt(s);
        if(!isNaN(nMinWidth)) {
            if(s.indexOf('%')!==-1) inpElmMinWidthUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMinWidthUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMinWidthUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMinWidthUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMinWidthUnit.value = 'em';            
            inpElmMinWidth.value = nMinWidth;
        }

        // Min Height
        const inpElmMinHeight = panelStuff.querySelector('#inpElmMinHeight');
        const inpElmMinHeightUnit = panelStuff.querySelector('#inpElmMinHeightUnit');
        inpElmMinHeight.value = '';
        inpElmMinHeightUnit.value = 'px';
        s = elm.style.minHeight;
        let nMinHeight = parseInt(s);
        if(!isNaN(nMinHeight)) {
            if(s.indexOf('%')!==-1) inpElmMinHeightUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMinHeightUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMinHeightUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMinHeightUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMinHeightUnit.value = 'em';            
            inpElmMinHeight.value = nMinHeight;
        }

        // Width
        const inpElmWidth = panelStuff.querySelector('#inpElmWidth');
        const inpElmWidthUnit = panelStuff.querySelector('#inpElmWidthUnit');
        inpElmWidth.value = '';
        inpElmWidthUnit.value = 'px';
        s = elm.style.width;
        let nWidth = parseInt(s);
        if(!isNaN(nWidth)) {
            if(s.indexOf('%')!==-1) inpElmWidthUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmWidthUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmWidthUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmWidthUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmWidthUnit.value = 'em';            
            inpElmWidth.value = nWidth;
        }

        // Height
        const inpElmHeight = panelStuff.querySelector('#inpElmHeight');
        const inpElmHeightUnit = panelStuff.querySelector('#inpElmHeightUnit');
        inpElmHeight.value = '';
        inpElmHeightUnit.value = 'px';
        s = elm.style.height;
        let nHeight = parseInt(s);
        if(!isNaN(nHeight)) {
            if(s.indexOf('%')!==-1) inpElmHeightUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmHeightUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmHeightUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmHeightUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmHeightUnit.value = 'em';            
            inpElmHeight.value = nHeight;
        }
        
        // Overflow X
        const inpElmOverflowX = panelStuff.querySelector('#inpElmOverflowX');
        s = elm.style.overflowX;
        inpElmOverflowX.value = s;

        // Overflow Y
        const inpElmOverflowY = panelStuff.querySelector('#inpElmOverflowY');
        s = elm.style.overflowY;
        inpElmOverflowY.value = s;

    }
}

export default ElementBoxStyles;