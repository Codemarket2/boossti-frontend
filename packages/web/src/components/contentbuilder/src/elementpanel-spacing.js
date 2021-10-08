import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementSpacingStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementSpacing');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top: 13px;font-weight: bold;width:100%">${util.out('Padding')}</div>
            
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Top')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmPaddingTop" value="" style="width:45px"/>
                    <select id="inpElmPaddingTopUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Bottom')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmPaddingBottom" value="" style="width:45px"/>
                    <select id="inpElmPaddingBottomUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Left')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmPaddingLeft" value="" style="width:45px"/>
                    <select id="inpElmPaddingLeftUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Right')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmPaddingRight" value="" style="width:45px"/>
                    <select id="inpElmPaddingRightUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>
            
            <div style="margin-top: 25px;font-weight: bold;width:100%">${util.out('Margin')}</div>
            
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Top')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmMarginTop" value="" style="width:45px"/>
                    <select id="inpElmMarginTopUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                        <option value="auto">auto</option>
                    </select>
                </div>
            </div>
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Bottom')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmMarginBottom" value="" style="width:45px"/>
                    <select id="inpElmMarginBottomUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                        <option value="auto">auto</option>
                    </select>
                </div>
            </div>
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Left')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmMarginLeft" value="" style="width:45px"/>
                    <select id="inpElmMarginLeftUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                        <option value="auto">auto</option>
                    </select>
                </div>
            </div>
            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Right')}:</div>
                <div style="display:flex;">
                    <input type="text" id="inpElmMarginRight" value="" style="width:45px"/>
                    <select id="inpElmMarginRightUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                        <option value="auto">auto</option>
                    </select>
                </div>
            </div>
            
            <div style="margin-top: 25px;font-weight: bold;width:100%">${util.out('Responsive Positioning')}:</div>
            
            <div class="is-settings clearfix" style="width:100%;">
                <div>
                    <label for="chkResetMarginLeft" style="letter-spacing: 0.5px;"><input type="checkbox" id="chkResetMarginLeft" value="" /> ${util.out('Reset margin left on small screen')} </label>
                </div>
            </div>
            <div class="is-settings clearfix" style="margin-top:0;width:100%;">
                <div>
                    <label for="chkResetMarginRight" style="letter-spacing: 0.5px;"><input type="checkbox" id="chkResetMarginRight" value="" /> ${util.out('Reset margin right on small screen')} </label>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);

        // Margin
        let inpElmMarginLeft = panelStuff.querySelector('#inpElmMarginLeft');
        inpElmMarginLeft.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmMarginLeftUnit = panelStuff.querySelector('#inpElmMarginLeftUnit');
        inpElmMarginLeft.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginLeft.value;
            let unit = inpElmMarginLeftUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.marginLeft = val + unit;
            } else {
                elm.style.marginLeft = '';
            }

            if(unit==='auto') {
                elm.style.marginLeft = 'auto';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmMarginLeftUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginLeft.value;
            let unit = inpElmMarginLeftUnit.value;
            
            if(unit==='auto') {
                elm.style.marginLeft = 'auto';
                inpElmMarginLeft.value = '';
            } else {
                elm.style.marginLeft = val + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMarginRight = panelStuff.querySelector('#inpElmMarginRight');
        inpElmMarginRight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmMarginRightUnit = panelStuff.querySelector('#inpElmMarginRightUnit');
        inpElmMarginRight.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginRight.value;
            let unit = inpElmMarginRightUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.marginRight = val + unit;
            } else {
                elm.style.marginRight = '';
            }

            if(unit==='auto') {
                elm.style.marginRight = 'auto';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmMarginRightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginRight.value;
            let unit = inpElmMarginRightUnit.value;
            
            if(unit==='auto') {
                elm.style.marginRight = 'auto';
                inpElmMarginRight.value = '';
            } else {
                elm.style.marginRight = val + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmMarginTop = panelStuff.querySelector('#inpElmMarginTop');
        inpElmMarginTop.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmMarginTopUnit = panelStuff.querySelector('#inpElmMarginTopUnit');
        inpElmMarginTop.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginTop.value;
            let unit = inpElmMarginTopUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.marginTop = val + unit;
            } else {
                elm.style.marginTop = '';
            }

            if(unit==='auto') {
                elm.style.marginTop = 'auto';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmMarginTopUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginTop.value;
            let unit = inpElmMarginTopUnit.value;
            
            if(unit==='auto') {
                elm.style.marginTop = 'auto';
                inpElmMarginTop.value = '';
            } else {
                elm.style.marginTop = val + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let inpElmMarginBottom = panelStuff.querySelector('#inpElmMarginBottom');
        inpElmMarginBottom.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmMarginBottomUnit = panelStuff.querySelector('#inpElmMarginBottomUnit');
        inpElmMarginBottom.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginBottom.value;
            let unit = inpElmMarginBottomUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.marginBottom = val + unit;
            } else {
                elm.style.marginBottom = '';
            }

            if(unit==='auto') {
                elm.style.marginBottom = 'auto';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmMarginBottomUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmMarginBottom.value;
            let unit = inpElmMarginBottomUnit.value;
            
            if(unit==='auto') {
                elm.style.marginBottom = 'auto';
                inpElmMarginBottom.value = '';
            } else {
                elm.style.marginBottom = val + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        // Padding
        let inpElmPaddingLeft = panelStuff.querySelector('#inpElmPaddingLeft');
        inpElmPaddingLeft.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmPaddingLeftUnit = panelStuff.querySelector('#inpElmPaddingLeftUnit');
        inpElmPaddingLeft.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingLeft.value;
            let unit = inpElmPaddingLeftUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingLeft = val + unit;
            } else {
                elm.style.paddingLeft = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmPaddingLeftUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingLeft.value;
            let unit = inpElmPaddingLeftUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingLeft = val + unit;
            } else {
                elm.style.paddingLeft = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmPaddingRight = panelStuff.querySelector('#inpElmPaddingRight');
        inpElmPaddingRight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmPaddingRightUnit = panelStuff.querySelector('#inpElmPaddingRightUnit');
        inpElmPaddingRight.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingRight.value;
            let unit = inpElmPaddingRightUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingRight = val + unit;
            } else {
                elm.style.paddingRight = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmPaddingRightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingRight.value;
            let unit = inpElmPaddingRightUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingRight = val + unit;
            } else {
                elm.style.paddingRight = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmPaddingTop = panelStuff.querySelector('#inpElmPaddingTop');
        inpElmPaddingTop.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmPaddingTopUnit = panelStuff.querySelector('#inpElmPaddingTopUnit');
        inpElmPaddingTop.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingTop.value;
            let unit = inpElmPaddingTopUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingTop = val + unit;
            } else {
                elm.style.paddingTop = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmPaddingTopUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingTop.value;
            let unit = inpElmPaddingTopUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingTop = val + unit;
            } else {
                elm.style.paddingTop = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        let inpElmPaddingBottom = panelStuff.querySelector('#inpElmPaddingBottom');
        inpElmPaddingBottom.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        let inpElmPaddingBottomUnit = panelStuff.querySelector('#inpElmPaddingBottomUnit');
        inpElmPaddingBottom.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingBottom.value;
            let unit = inpElmPaddingBottomUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingBottom = val + unit;
            } else {
                elm.style.paddingBottom = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmPaddingBottomUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            let val = inpElmPaddingBottom.value;
            let unit = inpElmPaddingBottomUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.paddingBottom = val + unit;
            } else {
                elm.style.paddingBottom = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        // Responsive positioning
        let chkResetMarginLeft = panelStuff.querySelector('#chkResetMarginLeft');
        chkResetMarginLeft.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            if(chkResetMarginLeft.checked) {
                dom.addClass(elm, 'margin-left-1024-reset');
            } else {
                dom.removeClass(elm, 'margin-left-1024-reset');
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let chkResetMarginRight = panelStuff.querySelector('#chkResetMarginRight');
        chkResetMarginRight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            if(chkResetMarginRight.checked) {
                dom.addClass(elm, 'margin-right-1024-reset');
            } else {
                dom.removeClass(elm, 'margin-right-1024-reset');
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

    }

    readElementStyles(elm) {

        let panelStuff = this.panelStuff;
        let s;
        
        // Margin
        const inpElmMarginTop = panelStuff.querySelector('#inpElmMarginTop');
        const inpElmMarginTopUnit = panelStuff.querySelector('#inpElmMarginTopUnit');
        inpElmMarginTop.value = '';
        inpElmMarginTopUnit.value = 'px';
        s = elm.style.marginTop;
        let nMarginTop = parseInt(s);
        if(!isNaN(nMarginTop)) {
            if(s.indexOf('%')!==-1) inpElmMarginTopUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMarginTopUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMarginTopUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMarginTopUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMarginTopUnit.value = 'em';            
            inpElmMarginTop.value = nMarginTop;
        } else {
            if(s) if(s.indexOf('auto')!==-1) {
                inpElmMarginTopUnit.value = 'auto'; 
                inpElmMarginTop.value = '';
            }  
        } 

        const inpElmMarginBottom = panelStuff.querySelector('#inpElmMarginBottom');
        const inpElmMarginBottomUnit = panelStuff.querySelector('#inpElmMarginBottomUnit');
        inpElmMarginBottom.value = '';
        inpElmMarginBottomUnit.value = 'px';
        s = elm.style.marginBottom;
        let nMarginBottom = parseInt(s);
        if(!isNaN(nMarginBottom)) {
            if(s.indexOf('%')!==-1) inpElmMarginBottomUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMarginBottomUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMarginBottomUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMarginBottomUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMarginBottomUnit.value = 'em';            
            inpElmMarginBottom.value = nMarginBottom;
        } else {
            if(s) if(s.indexOf('auto')!==-1) {
                inpElmMarginBottomUnit.value = 'auto'; 
                inpElmMarginBottom.value = '';
            }  
        } 

        const inpElmMarginLeft = panelStuff.querySelector('#inpElmMarginLeft');
        const inpElmMarginLeftUnit = panelStuff.querySelector('#inpElmMarginLeftUnit');
        inpElmMarginLeft.value = '';
        inpElmMarginLeftUnit.value = 'px';
        s = elm.style.marginLeft;
        let nMarginLeft = parseInt(s);
        if(!isNaN(nMarginLeft)) {
            if(s.indexOf('%')!==-1) inpElmMarginLeftUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMarginLeftUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMarginLeftUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMarginLeftUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMarginLeftUnit.value = 'em';            
            inpElmMarginLeft.value = nMarginLeft;
        } else {
            if(s) if(s.indexOf('auto')!==-1) {
                inpElmMarginLeftUnit.value = 'auto'; 
                inpElmMarginLeft.value = '';
            }  
        }

        const inpElmMarginRight = panelStuff.querySelector('#inpElmMarginRight');
        const inpElmMarginRightUnit = panelStuff.querySelector('#inpElmMarginRightUnit');
        inpElmMarginRight.value = '';
        inpElmMarginRightUnit.value = 'px';
        s = elm.style.marginRight;
        let nMarginRight = parseInt(s);
        if(!isNaN(nMarginRight)) {
            if(s.indexOf('%')!==-1) inpElmMarginRightUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmMarginRightUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmMarginRightUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmMarginRightUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmMarginRightUnit.value = 'em';            
            inpElmMarginRight.value = nMarginRight;
        } else {
            if(s) if(s.indexOf('auto')!==-1) {
                inpElmMarginRightUnit.value = 'auto'; 
                inpElmMarginRight.value = '';
            }  
        } 

        // Padding
        const inpElmPaddingTop = panelStuff.querySelector('#inpElmPaddingTop');
        const inpElmPaddingTopUnit = panelStuff.querySelector('#inpElmPaddingTopUnit');
        inpElmPaddingTop.value = '';
        inpElmPaddingTopUnit.value = 'px';
        s = elm.style.paddingTop;
        let nPaddingTop = parseInt(s);
        if(!isNaN(nPaddingTop)) {
            if(s.indexOf('%')!==-1) inpElmPaddingTopUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmPaddingTopUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmPaddingTopUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmPaddingTopUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmPaddingTopUnit.value = 'em';            
            inpElmPaddingTop.value = nPaddingTop;
        }    

        const inpElmPaddingBottom = panelStuff.querySelector('#inpElmPaddingBottom');
        const inpElmPaddingBottomUnit = panelStuff.querySelector('#inpElmPaddingBottomUnit');
        inpElmPaddingBottom.value = '';
        inpElmPaddingBottomUnit.value = 'px';
        s = elm.style.paddingBottom;
        let nPaddingBottom = parseInt(s);
        if(!isNaN(nPaddingBottom)) {
            if(s.indexOf('%')!==-1) inpElmPaddingBottomUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmPaddingBottomUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmPaddingBottomUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmPaddingBottomUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmPaddingBottomUnit.value = 'em';            
            inpElmPaddingBottom.value = nPaddingBottom;
        }    

        const inpElmPaddingLeft = panelStuff.querySelector('#inpElmPaddingLeft');
        const inpElmPaddingLeftUnit = panelStuff.querySelector('#inpElmPaddingLeftUnit');
        inpElmPaddingLeft.value = '';
        inpElmPaddingLeftUnit.value = 'px';
        s = elm.style.paddingLeft;
        let nPaddingLeft = parseInt(s);
        if(!isNaN(nPaddingLeft)) {
            if(s.indexOf('%')!==-1) inpElmPaddingLeftUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmPaddingLeftUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmPaddingLeftUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmPaddingLeftUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmPaddingLeftUnit.value = 'em';            
            inpElmPaddingLeft.value = nPaddingLeft;
        }    
        
        const inpElmPaddingRight = panelStuff.querySelector('#inpElmPaddingRight');
        const inpElmPaddingRightUnit = panelStuff.querySelector('#inpElmPaddingRightUnit');
        inpElmPaddingRight.value = '';
        inpElmPaddingRightUnit.value = 'px';
        s = elm.style.paddingRight;
        let nPaddingRight = parseInt(s);
        if(!isNaN(nPaddingRight)) {
            if(s.indexOf('%')!==-1) inpElmPaddingRightUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmPaddingRightUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmPaddingRightUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmPaddingRightUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmPaddingRightUnit.value = 'em';            
            inpElmPaddingRight.value = nPaddingRight;
        }    

        // Responsive Positioning
        if(dom.hasClass(elm, 'margin-left-1024-reset')){
            panelStuff.querySelector('#chkResetMarginLeft').checked = true;
        } else {
            panelStuff.querySelector('#chkResetMarginLeft').checked = false;
        }

        if(dom.hasClass(elm, 'margin-right-1024-reset')){
            panelStuff.querySelector('#chkResetMarginRight').checked = true;
        } else {                        
            panelStuff.querySelector('#chkResetMarginRight').checked = false;
        }

    }
}

export default ElementSpacingStyles;