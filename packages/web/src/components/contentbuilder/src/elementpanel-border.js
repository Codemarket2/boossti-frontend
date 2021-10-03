import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementBorderStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementBorder');
        this.panelStuff = panelStuff;
        
        const html = `
                <div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">${util.out('Border')}</div>
                
                <div class="is-settings clearfix">
                    <div style="display:flex;">
                        <input type="text" id="inpElmBorderWidth" value="" style="width:45px"/>
                        <select id="inpElmBorderWidthUnit" style="margin-right:15px;">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="none">none</option>
                        </select>
                        <select id="inpElmBorderStyle" style="margin-right:15px;">
                            <option value=""></option>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                        <button title="${util.out('Border Color')}" class="input-elm-bordercolor is-btn-color"></button>                             
                    </div>
                </div>
                
                <div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">${util.out('Individual Sides')}</div>
                
                <div class="is-settings clearfix">
                    <div>${util.out('Border Top')}:</div>
                    <div style="display:flex;">
                        <input type="text" id="inpElmBorderTopWidth" value="" style="width:45px"/>
                        <select id="inpElmBorderTopWidthUnit" style="margin-right:15px;">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="none">none</option>
                        </select>
                        <select id="inpElmBorderTopStyle" style="margin-right:15px;">
                            <option value=""></option>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                        <button title="${util.out('Border Top Color')}" class="input-elm-bordertopcolor is-btn-color"></button>
                    </div>
                </div>
                
                <div class="is-settings clearfix">
                    <div>${util.out('Border Bottom')}:</div>
                    <div style="display:flex;">
                        <input type="text" id="inpElmBorderBottomWidth" value="" style="width:45px"/>
                        <select id="inpElmBorderBottomWidthUnit" style="margin-right:15px;">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="none">none</option>
                        </select>
                        <select id="inpElmBorderBottomStyle" style="margin-right:15px;">
                            <option value=""></option>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                        <button title="${util.out('Border Bottom Color')}" class="input-elm-borderbottomcolor is-btn-color"></button>
                    </div>
                </div>
                
                <div class="is-settings clearfix">
                    <div>${util.out('Border Left')}:</div>
                    <div style="display:flex;">
                        <input type="text" id="inpElmBorderLeftWidth" value="" style="width:45px"/>
                        <select id="inpElmBorderLeftWidthUnit" style="margin-right:15px;">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="none">none</option>
                        </select>
                        <select id="inpElmBorderLeftStyle" style="margin-right:15px;">
                            <option value=""></option>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                        <button title="${util.out('Border Left Color')}" class="input-elm-borderleftcolor is-btn-color"></button>
                    </div>
                </div>
                
                <div class="is-settings clearfix">
                    <div>${util.out('Border Right')}:</div>
                    <div style="display:flex;">
                        <input type="text" id="inpElmBorderRightWidth" value="" style="width:45px"/>
                        <select id="inpElmBorderRightWidthUnit" style="margin-right:15px;">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="none">none</option>
                        </select>
                        <select id="inpElmBorderRightStyle" style="margin-right:15px;">
                            <option value=""></option>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                        <button title="${util.out('Border Right Color')}" class="input-elm-borderrightcolor is-btn-color"></button> 
                    </div>
                </div>                
        `;
        dom.appendHtml(panelStuff, html);

        // Border color
        let btnElmBorderColor = panelStuff.querySelector('.input-elm-bordercolor');
        btnElmBorderColor.addEventListener('click', (e) => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true
            
            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.borderColor = color;
                
                elm.style.backgroundColor = color; // preview

                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, btnElmBorderColor.style.backgroundColor);
        });

        // Border top color
        let btnElmBorderTopColor = panelStuff.querySelector('.input-elm-bordertopcolor');
        btnElmBorderTopColor.addEventListener('click', (e) => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true
            
            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.borderTopColor = color;
                
                elm.style.backgroundColor = color; // preview
                
                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, btnElmBorderTopColor.style.backgroundColor);
        });

        // Border bottom color
        let btnElmBorderBottomColor = panelStuff.querySelector('.input-elm-borderbottomcolor');
        btnElmBorderBottomColor.addEventListener('click', (e) => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true
            
            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.borderBottomColor = color;
                
                elm.style.backgroundColor = color; // preview
                
                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, btnElmBorderBottomColor.style.backgroundColor);
        });

        // Border left color
        let btnElmBorderLeftColor = panelStuff.querySelector('.input-elm-borderleftcolor');
        btnElmBorderLeftColor.addEventListener('click', (e) => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true
            
            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.borderLeftColor = color;
                
                elm.style.backgroundColor = color; // preview
                
                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, btnElmBorderLeftColor.style.backgroundColor);
        });

        // Border right color
        let btnElmBorderRightColor = panelStuff.querySelector('.input-elm-borderrightcolor');
        btnElmBorderRightColor.addEventListener('click', (e) => {
            
            this.builder.uo.saveForUndo(true); // checkLater = true

            let elm = e.target;
            this.builder.colorPicker.open((color)=>{
                
                this.builder.inspectedElement.style.borderRightColor = color;
                
                elm.style.backgroundColor = color; // preview
                
                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, btnElmBorderRightColor.style.backgroundColor);
        });

        // Border width
        let inpElmBorderWidth = panelStuff.querySelector('#inpElmBorderWidth');
        inpElmBorderWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderWidth').value;

            if(!isNaN(val) && val!==''){
                elm.style.borderStyle = 'solid';//refresh
                elm.style.borderWidth = val + panelStuff.querySelector('#inpElmBorderWidthUnit').value;
                elm.style.borderStyle = panelStuff.querySelector('#inpElmBorderStyle').value;
            } else {
                elm.style.borderStyle = 'solid';//refresh
                elm.style.borderWidth = '';
                elm.style.borderStyle = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border width unit
        let inpElmBorderWidthUnit = panelStuff.querySelector('#inpElmBorderWidthUnit');
        inpElmBorderWidthUnit.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var unit = panelStuff.querySelector('#inpElmBorderWidthUnit').value;

            if(unit === 'none'){
                elm.style.border = 'none';
                elm.style.borderWidth = '';
                elm.style.borderStyle = '';
            } else {
                elm.style.borderWidth = panelStuff.querySelector('#inpElmBorderWidth').value + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border style
        let inpElmBorderStyle = panelStuff.querySelector('#inpElmBorderStyle');
        inpElmBorderStyle.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderStyle').value;
                
            elm.style.borderStyle = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border top width
        let inpElmBorderTopWidth = panelStuff.querySelector('#inpElmBorderTopWidth');
        inpElmBorderTopWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderTopWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderTopWidth').value;

            if(!isNaN(val) && val!==''){
                elm.style.borderTopStyle = 'solid';//refresh
                elm.style.borderTopWidth = val + panelStuff.querySelector('#inpElmBorderTopWidthUnit').value;
                elm.style.borderTopStyle = panelStuff.querySelector('#inpElmBorderTopStyle').value;
            } else {
                elm.style.borderTopStyle = 'solid';//refresh
                elm.style.borderTopWidth = '';
                elm.style.borderTopStyle = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border top width unit
        let inpElmBorderTopWidthUnit = panelStuff.querySelector('#inpElmBorderTopWidthUnit');
        inpElmBorderTopWidthUnit.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var unit = panelStuff.querySelector('#inpElmBorderTopWidthUnit').value;

            if(unit === 'none'){
                elm.style.borderTop = 'none';
                elm.style.borderTopWidth = '';
                elm.style.borderTopStyle = '';

                this.panelStuff.querySelector('#inpElmBorderTopWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderTopStyle').value = '';
            } else {
                elm.style.borderTopWidth = panelStuff.querySelector('#inpElmBorderTopWidth').value + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border top style
        let inpElmBorderTopStyle = panelStuff.querySelector('#inpElmBorderTopStyle');
        inpElmBorderTopStyle.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderTopStyle').value;
                
            elm.style.borderTopStyle = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border bottom width
        let inpElmBorderBottomWidth = panelStuff.querySelector('#inpElmBorderBottomWidth');
        inpElmBorderBottomWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderBottomWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderBottomWidth').value;

            if(!isNaN(val) && val!==''){
                elm.style.borderBottomStyle = 'solid';//refresh
                elm.style.borderBottomWidth = val + panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value;
                elm.style.borderBottomStyle = panelStuff.querySelector('#inpElmBorderBottomStyle').value;
            } else {
                elm.style.borderBottomStyle = 'solid';//refresh
                elm.style.borderBottomWidth = '';
                elm.style.borderBottomStyle = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        // Border bottom width unit
        let inpElmBorderBottomWidthUnit = panelStuff.querySelector('#inpElmBorderBottomWidthUnit');
        inpElmBorderBottomWidthUnit.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var unit = panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value;

            if(unit === 'none'){
                elm.style.borderBottom = 'none';
                elm.style.borderBottomWidth = '';
                elm.style.borderBottomStyle = '';

                this.panelStuff.querySelector('#inpElmBorderBottomWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderBottomStyle').value = '';
            } else {
                elm.style.borderBottomWidth = panelStuff.querySelector('#inpElmBorderBottomWidth').value + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border bottom style
        let inpElmBorderBottomStyle = panelStuff.querySelector('#inpElmBorderBottomStyle');
        inpElmBorderBottomStyle.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderBottomStyle').value;
                
            elm.style.borderBottomStyle = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border left width
        let inpElmBorderLeftWidth = panelStuff.querySelector('#inpElmBorderLeftWidth');
        inpElmBorderLeftWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderLeftWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderLeftWidth').value;

            if(!isNaN(val) && val!==''){
                elm.style.borderLeftStyle = 'solid';//refresh
                elm.style.borderLeftWidth = val + panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value;
                elm.style.borderLeftStyle = panelStuff.querySelector('#inpElmBorderLeftStyle').value;
            } else {
                elm.style.borderLeftStyle = 'solid';//refresh
                elm.style.borderLeftWidth = '';
                elm.style.borderLeftStyle = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border left width unit
        let inpElmBorderLeftWidthUnit = panelStuff.querySelector('#inpElmBorderLeftWidthUnit');
        inpElmBorderLeftWidthUnit.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var unit = panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value;

            if(unit === 'none'){
                elm.style.borderLeft = 'none';
                elm.style.borderLeftWidth = '';
                elm.style.borderLeftStyle = '';

                this.panelStuff.querySelector('#inpElmBorderLeftWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderLeftStyle').value = '';
            } else {
                elm.style.borderLeftWidth = panelStuff.querySelector('#inpElmBorderLeftWidth').value + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border left style
        let inpElmBorderLeftStyle = panelStuff.querySelector('#inpElmBorderLeftStyle');
        inpElmBorderLeftStyle.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderLeftStyle').value;
                
            elm.style.borderLeftStyle = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border right width
        let inpElmBorderRightWidth = panelStuff.querySelector('#inpElmBorderRightWidth');
        inpElmBorderRightWidth.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBorderRightWidth.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderRightWidth').value;

            if(!isNaN(val) && val!==''){
                elm.style.borderRightStyle = 'solid';//refresh
                elm.style.borderRightWidth = val + panelStuff.querySelector('#inpElmBorderRightWidthUnit').value;
                elm.style.borderRightStyle = panelStuff.querySelector('#inpElmBorderRightStyle').value;
            } else {
                elm.style.borderRightStyle = 'solid';//refresh
                elm.style.borderRightWidth = '';
                elm.style.borderRightStyle = '';
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        // Border right width unit
        let inpElmBorderRightWidthUnit = panelStuff.querySelector('#inpElmBorderRightWidthUnit');
        inpElmBorderRightWidthUnit.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var unit = panelStuff.querySelector('#inpElmBorderRightWidthUnit').value;

            if(unit === 'none'){
                elm.style.borderRight = 'none';
                elm.style.borderRightWidth = '';
                elm.style.borderRightStyle = '';

                this.panelStuff.querySelector('#inpElmBorderRightWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderRightStyle').value = '';
            } else {
                elm.style.borderRightWidth = panelStuff.querySelector('#inpElmBorderRightWidth').value + unit;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        // Border right style
        let inpElmBorderRightStyle = panelStuff.querySelector('#inpElmBorderRightStyle');
        inpElmBorderRightStyle.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
            var val = panelStuff.querySelector('#inpElmBorderRightStyle').value;
                
            elm.style.borderRightStyle = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

    }

    readElementStyles(elm) {
        
        this.panelStuff.querySelector('.input-elm-bordercolor').style.backgroundColor = elm.style.borderColor;
        this.panelStuff.querySelector('.input-elm-bordertopcolor').style.backgroundColor = elm.style.borderTopColor;
        this.panelStuff.querySelector('.input-elm-borderbottomcolor').style.backgroundColor = elm.style.borderBottomColor;
        this.panelStuff.querySelector('.input-elm-borderleftcolor').style.backgroundColor = elm.style.borderLeftColor;
        this.panelStuff.querySelector('.input-elm-borderrightcolor').style.backgroundColor = elm.style.borderRightColor;

        this.panelStuff.querySelector('#inpElmBorderWidth').value = '';
        this.panelStuff.querySelector('#inpElmBorderWidthUnit').value = '';
        this.panelStuff.querySelector('#inpElmBorderStyle').value = '';
        var s = elm.style.borderWidth;
        var nBorderWidth = parseInt(s);
        if(!isNaN(nBorderWidth)) {
            if(s.indexOf('px')!==-1){
                this.panelStuff.querySelector('#inpElmBorderWidthUnit').value = 'px';
            }
            if(s.indexOf('vw')!==-1){
                this.panelStuff.querySelector('#inpElmBorderWidthUnit').value = 'vw';
            }
            if(s.indexOf('vh')!==-1){
                this.panelStuff.querySelector('#inpElmBorderWidthUnit').value = 'vh';
            }
            if(s.indexOf('em')!==-1){
                this.panelStuff.querySelector('#inpElmBorderWidthUnit').value = 'em';
            }

            this.panelStuff.querySelector('#inpElmBorderWidth').value = nBorderWidth;

            s = elm.style.borderStyle;
            if(s.indexOf('solid')!==-1){
                this.panelStuff.querySelector('#inpElmBorderStyle').value = 'solid';
            }
            if(s.indexOf('dashed')!==-1){
                this.panelStuff.querySelector('#inpElmBorderStyle').value = 'dashed';
            }
            if(s.indexOf('dotted')!==-1){
                this.panelStuff.querySelector('#inpElmBorderStyle').value = 'dotted';
            }
        } else {
            s = elm.style.border;
            if(s.indexOf('none')!==-1){
                this.panelStuff.querySelector('#inpElmBorderWidthUnit').value = 'none';
                this.panelStuff.querySelector('#inpElmBorderWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderStyle').value = '';
            }
        }

        this.panelStuff.querySelector('#inpElmBorderTopWidth').value = '';
        this.panelStuff.querySelector('#inpElmBorderTopWidthUnit').value = '';
        this.panelStuff.querySelector('#inpElmBorderTopStyle').value = '';
        s = elm.style.borderTopWidth;
        var nBorderTopWidth = parseInt(s);
        if(!isNaN(nBorderTopWidth)) {
            if(s.indexOf('px')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopWidthUnit').value = 'px';
            }
            if(s.indexOf('vw')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopWidthUnit').value = 'vw';
            }
            if(s.indexOf('vh')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopWidthUnit').value = 'vh';
            }
            if(s.indexOf('em')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopWidthUnit').value = 'em';
            }

            this.panelStuff.querySelector('#inpElmBorderTopWidth').value = nBorderTopWidth;

            if(s.indexOf('solid')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopStyle').value = 'solid';
            }
            if(s.indexOf('dashed')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopStyle').value = 'dashed';
            }
            if(s.indexOf('dotted')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopStyle').value = 'dotted';
            }
        } else {
            s = elm.style.borderTop;
            if(s.indexOf('none')!==-1){
                this.panelStuff.querySelector('#inpElmBorderTopWidthUnit').value = 'none';
                this.panelStuff.querySelector('#inpElmBorderTopWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderTopStyle').value = '';
            }
        }

        this.panelStuff.querySelector('#inpElmBorderBottomWidth').value = '';
        this.panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value = '';
        this.panelStuff.querySelector('#inpElmBorderBottomStyle').value = '';
        s = elm.style.borderBottomWidth;
        var nBorderBottomWidth = parseInt(s);
        if(!isNaN(nBorderBottomWidth)) {
            if(s.indexOf('px')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value = 'px';
            }
            if(s.indexOf('vw')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value = 'vw';
            }
            if(s.indexOf('vh')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value = 'vh';
            }
            if(s.indexOf('em')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value = 'em';
            }

            this.panelStuff.querySelector('#inpElmBorderBottomWidth').value = nBorderBottomWidth;

            if(s.indexOf('solid')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomStyle').value = 'solid';
            }
            if(s.indexOf('dashed')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomStyle').value = 'dashed';
            }
            if(s.indexOf('dotted')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomStyle').value = 'dotted';
            }
        } else {
            s = elm.style.borderBottom;
            if(s.indexOf('none')!==-1){
                this.panelStuff.querySelector('#inpElmBorderBottomWidthUnit').value = 'none';
                this.panelStuff.querySelector('#inpElmBorderBottomWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderBottomStyle').value = '';
            }
        }

        this.panelStuff.querySelector('#inpElmBorderLeftWidth').value = '';
        this.panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value = '';
        this.panelStuff.querySelector('#inpElmBorderLeftStyle').value = '';
        s = elm.style.borderLeftWidth;
        var nBorderLeftWidth = parseInt(s);
        if(!isNaN(nBorderLeftWidth)) {
            if(s.indexOf('px')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value = 'px';
            }
            if(s.indexOf('vw')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value = 'vw';
            }
            if(s.indexOf('vh')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value = 'vh';
            }
            if(s.indexOf('em')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value = 'em';
            }

            this.panelStuff.querySelector('#inpElmBorderLeftWidth').value = nBorderLeftWidth;

            if(s.indexOf('solid')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftStyle').value = 'solid';
            }
            if(s.indexOf('dashed')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftStyle').value = 'dashed';
            }
            if(s.indexOf('dotted')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftStyle').value = 'dotted';
            }
        } else {
            s = elm.style.borderLeft;
            if(s.indexOf('none')!==-1){
                this.panelStuff.querySelector('#inpElmBorderLeftWidthUnit').value = 'none';
                this.panelStuff.querySelector('#inpElmBorderLeftWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderLeftStyle').value = '';
            }
        }

        this.panelStuff.querySelector('#inpElmBorderRightWidth').value = '';
        this.panelStuff.querySelector('#inpElmBorderRightWidthUnit').value = '';
        this.panelStuff.querySelector('#inpElmBorderRightStyle').value = '';
        s = elm.style.borderRightWidth;
        var nBorderRightWidth = parseInt(s);
        if(!isNaN(nBorderRightWidth)) {
            if(s.indexOf('px')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightWidthUnit').value = 'px';
            }
            if(s.indexOf('vw')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightWidthUnit').value = 'vw';
            }
            if(s.indexOf('vh')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightWidthUnit').value = 'vh';
            }
            if(s.indexOf('em')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightWidthUnit').value = 'em';
            }

            this.panelStuff.querySelector('#inpElmBorderRightWidth').value = nBorderRightWidth;

            if(s.indexOf('solid')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightStyle').value = 'solid';
            }
            if(s.indexOf('dashed')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightStyle').value = 'dashed';
            }
            if(s.indexOf('dotted')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightStyle').value = 'dotted';
            }
        } else {
            s = elm.style.borderRight;
            if(s.indexOf('none')!==-1){
                this.panelStuff.querySelector('#inpElmBorderRightWidthUnit').value = 'none';
                this.panelStuff.querySelector('#inpElmBorderRightWidth').value = '';
                this.panelStuff.querySelector('#inpElmBorderRightStyle').value = '';
            }
        }
        
    }
}

export default ElementBorderStyles;