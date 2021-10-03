import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementEffectStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementEffect');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top:13px;font-weight:bold;">${util.out('Effects')}</div>

            <div class="is-settings clearfix" style="width:100%;">
                <div>${util.out('Opacity')}:</div>
                <div style="display:flex">
                    <input type="text" id="inpElmOpacity" value="" style="width:45px"/>
                </div>
            </div>

            <div style="margin-top:25px;font-weight:bold;width:100%;">${util.out('Filters')}</div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Blur')}:</div>
                <div>
                    <input type="text" id="inpElmBlur" value="" style="width:45px"/> &nbsp;px
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Brightness')}:</div>
                <div>
                    <input type="text" id="inpElmBrightness" value="" style="width:45px"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Contrast')}:</div>
                <div>
                    <input type="text" id="inpElmContrast" value="" style="width:45px"/> &nbsp;%
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Grayscale')}:</div>
                <div>
                    <input type="text" id="inpElmGrayscale" value="" style="width:45px"/> &nbsp;%
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Hue Rotate')}:</div>
                <div>
                    <input type="text" id="inpElmHueRotate" value="" style="width:45px"/> &nbsp;<span style="font-size:12px">deg</span>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Invert')}:</div>
                <div>
                    <input type="text" id="inpElmInvert" value="" style="width:45px"/> &nbsp;%
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Saturate')}:</div>
                <div>
                    <input type="text" id="inpElmSaturate" value="" style="width:45px"/>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div>${util.out('Sepia')}:</div>
                <div>
                    <input type="text" id="inpElmSepia" value="" style="width:45px"/> &nbsp;%
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);


        const inpElmOpacity = panelStuff.querySelector('#inpElmOpacity');
        inpElmOpacity.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmOpacity.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmOpacity').value;
            
            elm.style.opacity = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        let i;

        const inpElmBlur = panelStuff.querySelector('#inpElmBlur');
        inpElmBlur.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBlur.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBlur').value;
            
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('blur')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'blur('+ val + 'px)';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' blur('+ val + 'px)';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }
            
            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmBrightness = panelStuff.querySelector('#inpElmBrightness');
        inpElmBrightness.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmBrightness.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmBrightness').value;
            
                                    
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('brightness')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'brightness('+ val + ')';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' brightness('+ val + ')';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }

            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });


        const inpElmContrast = panelStuff.querySelector('#inpElmContrast');
        inpElmContrast.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmContrast.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmContrast').value;
            
                              
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');
            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('contrast')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'contrast('+ val + '%)';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' contrast('+ val + '%)';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }

            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmGrayscale = panelStuff.querySelector('#inpElmGrayscale');
        inpElmGrayscale.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmGrayscale.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmGrayscale').value;
            
                
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('grayscale')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'grayscale('+ val + '%)';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' grayscale('+ val + '%)';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }
            
            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmHueRotate = panelStuff.querySelector('#inpElmHueRotate');
        inpElmHueRotate.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmHueRotate.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmHueRotate').value;
                  
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('hue-rotate')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'hue-rotate('+ val + 'deg)';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' hue-rotate('+ val + 'deg)';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }
            
            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmInvert = panelStuff.querySelector('#inpElmInvert');
        inpElmInvert.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmInvert.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmInvert').value;
            
                       
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('invert')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'invert('+ val + '%)';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' invert('+ val + '%)';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }
            
            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmSaturate = panelStuff.querySelector('#inpElmSaturate');
        inpElmSaturate.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmSaturate.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmSaturate').value;
            
                            
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('saturate')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'saturate('+ val + ')';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' saturate('+ val + ')';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }
           
            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmSepia = panelStuff.querySelector('#inpElmSepia');
        inpElmSepia.addEventListener('click', () => {

            this.builder.uo.saveForUndo();

        });
        inpElmSepia.addEventListener('keyup', () => {

            let elm = this.builder.inspectedElement;
            let val = panelStuff.querySelector('#inpElmSepia').value;
                            
            let sFilter = elm.style.filter;
            sFilter = sFilter.replace('none','');
            let arr = sFilter.split(' ');

            let exist=false;
            for(i=0;i<arr.length;i++){
                let s = arr[i];
                if(s.indexOf('sepia')!==-1){
                    if(!isNaN(val) && val!==''){
                        arr[i] = 'sepia('+ val + '%)';
                    } else {
                        arr[i] = '';
                    }
                    exist=true;
                }
            }
            if(!exist){
                sFilter = sFilter + ' sepia('+ val + '%)';
            } else {
                sFilter = '';
                for(i=0;i<arr.length;i++){
                    sFilter+= ' ' + arr[i];
                }
            }
            
            if (sFilter.trim() === '') {
                elm.style.filter = 'none';
            } else {
                elm.style.filter = sFilter;
            }

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });


    }

    readElementStyles(elm) {

        let panelStuff = this.panelStuff;
        
        const inpElmOpacity = panelStuff.querySelector('#inpElmOpacity');
        inpElmOpacity.value = '';
        let s = elm.style.opacity;
        if(s) inpElmOpacity.value = s;

        //filter
        let sFilter = elm.style.filter; // brightness(2) blur(1px) contrast(100%)'

        let arr = sFilter.split(' ');

        const inpElmBlur = panelStuff.querySelector('#inpElmBlur');
        inpElmBlur.value = '';
        const inpElmBrightness = panelStuff.querySelector('#inpElmBrightness');
        inpElmBrightness.value = '';
        const inpElmGrayscale = panelStuff.querySelector('#inpElmGrayscale');
        inpElmGrayscale.value = '';
        const inpElmContrast = panelStuff.querySelector('#inpElmContrast');
        inpElmContrast.value = '';
        const inpElmHueRotate = panelStuff.querySelector('#inpElmHueRotate');
        inpElmHueRotate.value = '';
        const inpElmInvert = panelStuff.querySelector('#inpElmInvert');
        inpElmInvert.value = '';
        const inpElmSaturate = panelStuff.querySelector('#inpElmSaturate');
        inpElmSaturate.value = '';
        const inpElmSepia = panelStuff.querySelector('#inpElmSepia');
        inpElmSepia.value = '';

        let val;
        for(let i=0;i<arr.length;i++){

            s = arr[i];

            if(s.indexOf('blur')!==-1){
                //blur exists
                val = s.replace('blur(','').replace(')','');
                val = parseInt(val);
                inpElmBlur.value = val;
            }

            if(s.indexOf('brightness')!==-1){
                //brightness exists
                val = s.replace('brightness(','').replace(')','');
                val = parseInt(val);
                inpElmBrightness.value = val;
            }

            if(s.indexOf('grayscale')!==-1){
                //grayscale exists
                val = s.replace('grayscale(','').replace(')','');
                val = parseInt(val);
                inpElmGrayscale.value = val;
            }

            if(s.indexOf('contrast')!==-1){
                //contrast exists
                val = s.replace('contrast(','').replace(')','');
                val = parseInt(val);
                inpElmContrast.value = val;
            }

            if(s.indexOf('hue-rotate')!==-1){
                //hue-rotate exists
                val = s.replace('hue-rotate(','').replace(')','');
                val = parseInt(val);
                inpElmHueRotate.value = val;
            }

            if(s.indexOf('invert')!==-1){
                //invert exists
                val = s.replace('invert(','').replace(')','');
                val = parseInt(val);
                inpElmInvert.value = val;
            }

            if(s.indexOf('saturate')!==-1){
                //saturate exists
                val = s.replace('saturate(','').replace(')','');
                val = parseInt(val);
                inpElmSaturate.value = val;
            }

            if(s.indexOf('sepia')!==-1){
                //sepia exists
                val = s.replace('sepia(','').replace(')','');
                val = parseInt(val);
                inpElmSepia.value = val;
            }

        }

    }
}

export default ElementEffectStyles;