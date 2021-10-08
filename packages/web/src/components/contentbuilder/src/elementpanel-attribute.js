import { Dom, Util } from './util.js';

const dom = new Dom();

class ElementAttributeStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let panelStuff = builderStuff.querySelector('#divElementAttribute');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top:13px;font-weight:bold;width:100%;">${util.out('Attributes')}</div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="width:100%">${util.out('Names')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmAttr1" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="width:100%">${util.out('Values')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmAttrVal1" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttr2" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttrVal2" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttr3" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttrVal3" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttr4" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttrVal4" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttr5" value="" style="width:90%"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;float:left;">
                <div style="display:flex">
                    <input type="text" id="inpElmAttrVal5" value="" style="width:90%"/>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);

        let inps = panelStuff.querySelectorAll('#inpElmAttr1,#inpElmAttr2,#inpElmAttr3,#inpElmAttr4,#inpElmAttr5,#inpElmAttrVal1,#inpElmAttrVal2,#inpElmAttrVal3,#inpElmAttrVal4,#inpElmAttrVal5');
        Array.prototype.forEach.call(inps, (inp) => {

            inp.addEventListener('click', () => {

                this.builder.uo.saveForUndo();
    
            });
            inp.addEventListener('keyup', () => {
    
                let elm = this.builder.inspectedElement;
      
                this.updateAttributes(elm);
        
                //Trigger Change event
                this.builder.opts.onChange();
    
            });

        });

    }

    updateAttributes(elm) {

        // Remove all attributes
        let attrs = {};

        Array.prototype.forEach.call(elm.attributes, (attribute) => {
            attrs[attribute.name] = attribute.value;
        });

        for (let k in attrs){
            if(Object.prototype.hasOwnProperty.call(attrs, k)){
                if(k!=='id' && k!=='style' && k!=='class' && k!=='href' && k!=='src' && k!=='contenteditable' && k!=='data-filename'){
                    elm.removeAttribute(k);
                }
            }
        }

        // Update
        const panelStuff = this.panelStuff;

        let attrname, val;
        attrname = panelStuff.querySelector('#inpElmAttr1').value;
        val = panelStuff.querySelector('#inpElmAttrVal1').value;
        if(attrname!=='') elm.setAttribute(attrname, val);

        attrname = panelStuff.querySelector('#inpElmAttr2').value;
        val = panelStuff.querySelector('#inpElmAttrVal2').value;
        if(attrname!=='') elm.setAttribute(attrname, val);

        attrname = panelStuff.querySelector('#inpElmAttr3').value;
        val = panelStuff.querySelector('#inpElmAttrVal3').value;
        if(attrname!=='') elm.setAttribute(attrname, val);

        attrname = panelStuff.querySelector('#inpElmAttr4').value;
        val = panelStuff.querySelector('#inpElmAttrVal4').value;
        if(attrname!=='') elm.setAttribute(attrname, val);

        attrname = panelStuff.querySelector('#inpElmAttr5').value;
        val = panelStuff.querySelector('#inpElmAttrVal5').value;
        if(attrname!=='') elm.setAttribute(attrname, val);
    }

    readElementStyles(elm) {
        const panelStuff = this.panelStuff;
                                        
        let inps = panelStuff.querySelectorAll('#inpElmAttr1,#inpElmAttr2,#inpElmAttr3,#inpElmAttr4,#inpElmAttr5,#inpElmAttrVal1,#inpElmAttrVal2,#inpElmAttrVal3,#inpElmAttrVal4,#inpElmAttrVal5');
        Array.prototype.forEach.call(inps, (inp) => {
            inp.value = '';
        });

        var indx = 1;
        Array.prototype.forEach.call(elm.attributes, (attribute) => {
            
            if(attribute.name!=='id' && attribute.name!=='style' && attribute.name!=='class' && attribute.name!=='href' && attribute.name!=='src' && attribute.name!=='contenteditable' && attribute.name!=='data-filename' && attribute.name!=='data-saveforundo'){
                panelStuff.querySelector('#inpElmAttr' + indx).value = attribute.name;
                panelStuff.querySelector('#inpElmAttrVal' + indx).value = attribute.value; 
                indx = indx + 1;
            }
            
        });
    }
}

export default ElementAttributeStyles;