import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementShadowStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementShadow');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top:13px;font-weight:bold;width:100%;">${util.out('Shadow')}</div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('x Offset')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmBoxShadowX" value="" style="width:45px"/>
                    <select id="inpElmBoxShadowXUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('y Offset')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmBoxShadowY" value="" style="width:45px"/>
                    <select id="inpElmBoxShadowYUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Blur')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmBoxShadowBlur" value="" style="width:45px"/>
                    <select id="inpElmBoxShadowBlurUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Spread')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmBoxShadowSpread" value="" style="width:45px"/>
                    <select id="inpElmBoxShadowSpreadUnit">
                        <option value="px">px</option>
                        <option value="em">em</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:100%;">
                <div>${util.out('Shadow Color')}:</div>
                <div>
                <button title="${util.out('Shadow Color')}" class="input-elm-shadowcolor is-btn-color"></button>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:100%;">
                <div>${util.out('Outer/Inner Shadow')}:</div>
                <div>
                    <select id="inpElmBoxShadowInset">
                        <option value="">Outset</option>
                        <option value="inset">Inset</option>
                    </select>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);

        // Shadow color
        let btnElmShadowColor = panelStuff.querySelector('.input-elm-shadowcolor');
        btnElmShadowColor.addEventListener('click', () => {

            this.builder.uo.saveForUndo(true); // checkLater = true
            
            this.builder.colorPicker.open((color)=>{
                
                btnElmShadowColor.style.backgroundColor = color; // preview

                this.updateShadow(this.builder.inspectedElement);

                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();

            }, btnElmShadowColor.style.backgroundColor);
        });


        let inps = panelStuff.querySelectorAll('#inpElmBoxShadowX,#inpElmBoxShadowY,#inpElmBoxShadowBlur,#inpElmBoxShadowSpread');
        Array.prototype.forEach.call(inps, (inp) => {

            inp.addEventListener('click', () => {

                this.builder.uo.saveForUndo();
    
            });
            inp.addEventListener('keyup', () => {
    
                let elm = this.builder.inspectedElement;
      
                this.updateShadow(elm);

                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();
    
            });

        });

        inps = panelStuff.querySelectorAll('#inpElmBoxShadowXUnit,#inpElmBoxShadowYUnit,#inpElmBoxShadowBlurUnit,#inpElmBoxShadowSpreadUnit');
        Array.prototype.forEach.call(inps, (inp) => {

            inp.addEventListener('change', () => {
    
                this.builder.uo.saveForUndo();
    
                let elm = this.builder.inspectedElement;
      
                this.updateShadow(elm);

                elementStyleEditor.refresh();
        
                //Trigger Change event
                this.builder.opts.onChange();
    
            });

        });
          
        const inpElmBoxShadowInset = panelStuff.querySelector('#inpElmBoxShadowInset');
        inpElmBoxShadowInset.addEventListener('change', () => {
    
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
  
            this.updateShadow(elm);

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

    }

    updateShadow(elm) {
        
        let panelStuff = this.panelStuff;

        var shadowColor = panelStuff.querySelector('.input-elm-shadowcolor').style.backgroundColor; 
        var shadowInset = panelStuff.querySelector('#inpElmBoxShadowInset').value;

        var val = panelStuff.querySelector('#inpElmBoxShadowX').value;
        var unit = panelStuff.querySelector('#inpElmBoxShadowXUnit').value;
        var offX = '';
        if(!isNaN(val) && val!=='') {
            offX = val + unit;
        }

        val = panelStuff.querySelector('#inpElmBoxShadowY').value;
        unit = panelStuff.querySelector('#inpElmBoxShadowYUnit').value;
        var offY = '';
        if(!isNaN(val) && val!=='') {
            offY = val + unit;
        } 
        val = panelStuff.querySelector('#inpElmBoxShadowBlur').value;
        unit = panelStuff.querySelector('#inpElmBoxShadowBlurUnit').value;
        var blur = '';
        if(!isNaN(val) && val!=='') {
            blur = val + unit;
        } 
        val = panelStuff.querySelector('#inpElmBoxShadowSpread').value;
        unit = panelStuff.querySelector('#inpElmBoxShadowSpreadUnit').value;
        var spread = '';
        if(!isNaN(val) && val!=='') {
            spread = val + unit;
        } 

        elm.style.boxShadow = (offX + ' ' + offY + ' ' + blur + ' ' + spread + ' ' + shadowColor + ' ' + shadowInset).trim();

    }

    readElementStyles(elm) {
        
        let panelStuff = this.panelStuff;

        let color, n;
                                
        let sBoxShadow = elm.style.boxShadow;
        let inps = panelStuff.querySelectorAll('#inpElmBoxShadowX,#inpElmBoxShadowY,#inpElmBoxShadowBlur,#inpElmBoxShadowSpread');
        Array.prototype.forEach.call(inps, (inp) => {
            inp.value = '';
        });
        inps = panelStuff.querySelectorAll('#inpElmBoxShadowXUnit,#inpElmBoxShadowYUnit,#inpElmBoxShadowBlurUnit,#inpElmBoxShadowSpreadUnit');
        Array.prototype.forEach.call(inps, (inp) => {
            inp.value = 'px';
        });

        panelStuff.querySelector('#inpElmBoxShadowInset').value = '';
        if(sBoxShadow.indexOf('inset')!==-1){ 
            panelStuff.querySelector('#inpElmBoxShadowInset').value = 'inset';
            sBoxShadow=sBoxShadow.replace('inset','');
        }
        
        if(sBoxShadow!==''){
            if(sBoxShadow.indexOf('rgb')!==-1){ //always get rgb value, not hex
                color = sBoxShadow.substr(sBoxShadow.indexOf('rgb'));
                color = color.substr(0,color.indexOf(')')+1);      
                
                panelStuff.querySelector('.input-elm-shadowcolor').style.backgroundColor = color;  
                
                n = sBoxShadow.split('rgb')[1].indexOf(')');
                sBoxShadow = sBoxShadow.split('rgb')[0] + sBoxShadow.split('rgb')[1].substr(n+2);
            }
            if(sBoxShadow.indexOf('#')!==-1){ //never executed
                color = sBoxShadow.substr(sBoxShadow.indexOf('#'));
                color = color.substr(0,color.indexOf(' '));

                panelStuff.querySelector('.input-elm-shadowcolor').style.backgroundColor = color;  
                
                n = sBoxShadow.split('#')[1].indexOf(' ');
                sBoxShadow = sBoxShadow.split('#')[0] + sBoxShadow.split('#')[1].substr(n+2);
            }
            let array= sBoxShadow.split(' ');
            let length = array.length;
            n=1;
            for (let i=0; i<length; i++) {
                if(n===1){
                    panelStuff.querySelector('#inpElmBoxShadowX').value = parseInt(array[i]);
                    if(array[i].indexOf('px')!==-1){
                        panelStuff.querySelector('#inpElmBoxShadowXUnit').value = 'px';
                    } else if (array[i].indexOf('em')!==-1) {
                        panelStuff.querySelector('#inpElmBoxShadowXUnit').value = 'em';
                    } else {
                        panelStuff.querySelector('#inpElmBoxShadowX').value = '';
                    }
                }
                if(n===2){
                    panelStuff.querySelector('#inpElmBoxShadowY').value = parseInt(array[i]);
                    if(array[i].indexOf('px')!==-1){
                        panelStuff.querySelector('#inpElmBoxShadowYUnit').value = 'px';
                    } else if (array[i].indexOf('em')!==-1) {
                        panelStuff.querySelector('#inpElmBoxShadowYUnit').value = 'em';
                    } else {
                        panelStuff.querySelector('#inpElmBoxShadowY').value = '';
                    }
                }
                if(n===3){
                    panelStuff.querySelector('#inpElmBoxShadowBlur').value = parseInt(array[i]);
                    if(array[i].indexOf('px')!==-1){
                        panelStuff.querySelector('#inpElmBoxShadowBlurUnit').value = 'px';
                    } else if (array[i].indexOf('em')!==-1) {
                        panelStuff.querySelector('#inpElmBoxShadowBlurUnit').value = 'em';
                    } else {
                        panelStuff.querySelector('#inpElmBoxShadowBlur').value = '';
                    }
                }
                if(n===4){
                    panelStuff.querySelector('#inpElmBoxShadowSpread').value = parseInt(array[i]);
                    if(array[i].indexOf('px')!==-1){
                        panelStuff.querySelector('#inpElmBoxShadowSpreadUnit').value = 'px';
                    } else if (array[i].indexOf('em')!==-1) {
                        panelStuff.querySelector('#inpElmBoxShadowSpreadUnit').value = 'em';
                    } else {
                        panelStuff.querySelector('#inpElmBoxShadowSpread').value = '';
                    }
                }
                n++;
            }  
        }

    }
}

export default ElementShadowStyles;