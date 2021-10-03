import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementPositionStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementPosition');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top:13px;font-weight:bold;width:100%;">${util.out('Position')}</div>

            <div class="is-settings clearfix" style="width:100%;">
                <div style="display:flex">
                    <select id="inpElmPosition">
                        <option value=""></option>
                        <option value="relative">Relative</option>
                        <option value="absolute">Absolute</option>
                        <option value="fixed">Fixed</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Top')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmTop" value="" style="width:45px"/>
                    <select id="inpElmTopUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Left')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmLeft" value="" style="width:45px"/>
                    <select id="inpElmLeftUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Bottom')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmBottom" value="" style="width:45px"/>
                    <select id="inpElmBottomUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Right')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmRight" value="" style="width:45px"/>
                    <select id="inpElmRightUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                    </select>
                </div>
            </div>

            <div style="margin-top: 25px;font-weight: bold;width:100%;">${util.out('Float')}</div>

            <div class="is-settings clearfix" style="width:100%;">
                <div style="display:flex">
                    <select id="inpElmFloat">
                        <option value=""></option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);


        const inpElmPosition = panelStuff.querySelector('#inpElmPosition');
        inpElmPosition.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmPosition').value;
            
            elm.style.position = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        
        const inpElmFloat = panelStuff.querySelector('#inpElmFloat');
        inpElmFloat.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmFloat').value;
            
            elm.style.float = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmTop = panelStuff.querySelector('#inpElmTop');
        inpElmTop.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        const inpElmTopUnit = panelStuff.querySelector('#inpElmTopUnit');
        inpElmTop.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;

            let val = inpElmTop.value;
            let unit = inpElmTopUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.top = val + unit;
            } else {
                elm.style.top = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmTopUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = inpElmTop.value;
            let unit = inpElmTopUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.top = val + unit;
            } else {
                elm.style.top = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmBottom = panelStuff.querySelector('#inpElmBottom');
        inpElmBottom.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        const inpElmBottomUnit = panelStuff.querySelector('#inpElmBottomUnit');
        inpElmBottom.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;

            let val = inpElmBottom.value;
            let unit = inpElmBottomUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.bottom = val + unit;
            } else {
                elm.style.bottom = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmBottomUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = inpElmBottom.value;
            let unit = inpElmBottomUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.bottom = val + unit;
            } else {
                elm.style.bottom = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmLeft = panelStuff.querySelector('#inpElmLeft');
        inpElmLeft.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        const inpElmLeftUnit = panelStuff.querySelector('#inpElmLeftUnit');
        inpElmLeft.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;

            let val = inpElmLeft.value;
            let unit = inpElmLeftUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.left = val + unit;
            } else {
                elm.style.left = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmLeftUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = inpElmLeft.value;
            let unit = inpElmLeftUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.left = val + unit;
            } else {
                elm.style.left = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmRight = panelStuff.querySelector('#inpElmRight');
        inpElmRight.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        const inpElmRightUnit = panelStuff.querySelector('#inpElmRightUnit');
        inpElmRight.addEventListener('keyup', () => {
            
            let elm = this.builder.inspectedElement;

            let val = inpElmRight.value;
            let unit = inpElmRightUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.right = val + unit;
            } else {
                elm.style.right = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });
        inpElmRightUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = inpElmRight.value;
            let unit = inpElmRightUnit.value;
            
            if(!isNaN(val) && val!==''){
                elm.style.right = val + unit;
            } else {
                elm.style.right = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

    }

    readElementStyles(elm) {

        let panelStuff = this.panelStuff;

        
        const inpElmPosition = panelStuff.querySelector('#inpElmPosition');
        inpElmPosition.value = '';
        let s = elm.style.position;
        inpElmPosition.value = s;
                                
        const inpElmFloat = panelStuff.querySelector('#inpElmFloat');
        inpElmFloat.value = '';
        s = elm.style.float;
        inpElmFloat.value = s;
    
        const inpElmTop = panelStuff.querySelector('#inpElmTop');
        const inpElmTopUnit = panelStuff.querySelector('#inpElmTopUnit');
        inpElmTop.value = '';
        inpElmTopUnit.value = 'px';
        s = elm.style.top;
        let nTop = parseInt(s);
        if(!isNaN(nTop)) {
            if(s.indexOf('%')!==-1) inpElmTopUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmTopUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmTopUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmTopUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmTopUnit.value = 'em';            
            inpElmTop.value = nTop;
        }
    
        const inpElmBottom = panelStuff.querySelector('#inpElmBottom');
        const inpElmBottomUnit = panelStuff.querySelector('#inpElmBottomUnit');
        inpElmBottom.value = '';
        inpElmBottomUnit.value = 'px';
        s = elm.style.bottom;
        let nBottom = parseInt(s);
        if(!isNaN(nBottom)) {
            if(s.indexOf('%')!==-1) inpElmBottomUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmBottomUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmBottomUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmBottomUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmBottomUnit.value = 'em';            
            inpElmBottom.value = nBottom;
        } 
        
        const inpElmLeft = panelStuff.querySelector('#inpElmLeft');
        const inpElmLeftUnit = panelStuff.querySelector('#inpElmLeftUnit');
        inpElmLeft.value = '';
        inpElmLeftUnit.value = 'px';
        s = elm.style.left;
        let nLeft = parseInt(s);
        if(!isNaN(nLeft)) {
            if(s.indexOf('%')!==-1) inpElmLeftUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmLeftUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmLeftUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmLeftUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmLeftUnit.value = 'em';            
            inpElmLeft.value = nLeft;
        } 
        
        const inpElmRight = panelStuff.querySelector('#inpElmRight');
        const inpElmRightUnit = panelStuff.querySelector('#inpElmRightUnit');
        inpElmRight.value = '';
        inpElmRightUnit.value = 'px';
        s = elm.style.right;
        let nRight = parseInt(s);
        if(!isNaN(nRight)) {
            if(s.indexOf('%')!==-1) inpElmRightUnit.value = '%';            
            if(s.indexOf('px')!==-1) inpElmRightUnit.value = 'px';            
            if(s.indexOf('vw')!==-1) inpElmRightUnit.value = 'vw';            
            if(s.indexOf('vh')!==-1) inpElmRightUnit.value = 'vh';            
            if(s.indexOf('em')!==-1) inpElmRightUnit.value = 'em';            
            inpElmRight.value = nRight;
        }

    }
}

export default ElementPositionStyles;