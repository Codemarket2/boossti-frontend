import { Dom, Util } from './util.js';

const dom = new Dom();

class ElementAnimationStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let panelStuff = builderStuff.querySelector('#divElementAnimation');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top:13px;font-weight:bold;">${util.out('Animate')}</div>

            <div class="is-settings clearfix" style="width:100%;">
                <div style="display:flex">
                    <select id="selElmAnim">
                        <option value=""></option>
                        <option value="fade">fade</option>
                        <option value="fade-up">fade-up</option>
                        <option value="fade-down">fade-down</option>
                        <option value="fade-left">fade-left</option>
                        <option value="fade-right">fade-right</option>
                        <option value="fade-up-right">fade-up-right</option>
                        <option value="fade-up-left">fade-up-left</option>
                        <option value="fade-down-right">fade-down-right</option>
                        <option value="fade-down-left">fade-down-left</option>
                        <option value="flip-up">flip-up</option>
                        <option value="flip-down">flip-down</option>
                        <option value="flip-left">flip-left</option>
                        <option value="flip-right">flip-right</option>
                        <option value="slide-up">slide-up</option>
                        <option value="slide-down">slide-down</option>
                        <option value="slide-left">slide-left</option>
                        <option value="slide-right">slide-right</option>
                        <option value="zoom-in">zoom-in</option>
                        <option value="zoom-in-up">zoom-in-up</option>
                        <option value="zoom-in-down">zoom-in-down</option>
                        <option value="zoom-in-left">zoom-in-left</option>
                        <option value="zoom-in-right">zoom-in-right</option>
                        <option value="zoom-out">zoom-out</option>
                        <option value="zoom-out-up">zoom-out-up</option>
                        <option value="zoom-out-down">zoom-out-down</option>
                        <option value="zoom-out-left">zoom-out-left</option>
                        <option value="zoom-out-right">zoom-out-right</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div> ${util.out('Delay')}:</div>
                <div>
                    <select id="selElmAnimDelay">
                        <option value=""></option>
                        <option value="0">0</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                        <option value="1000">1000</option>
                        <option value="1100">1100</option>
                        <option value="1200">1200</option>
                        <option value="1300">1300</option>
                        <option value="1400">1400</option>
                        <option value="1500">1500</option>
                        <option value="1600">1600</option>
                        <option value="1700">1700</option>
                        <option value="1800">1800</option>
                        <option value="1900">1900</option>
                        <option value="2000">2000</option>
                        <option value="2100">2100</option>
                        <option value="2200">2200</option>
                        <option value="2300">2300</option>
                        <option value="2400">2400</option>
                        <option value="2500">2500</option>
                        <option value="2600">2600</option>
                        <option value="2700">2700</option>
                        <option value="2800">2800</option>
                        <option value="2900">2900</option>
                        <option value="3000">3000</option>
                    </select> &nbsp;ms
                </div>
            </div>

            <div class="is-settings clearfix" style="width:110px;">
                <div> ${util.out('Duration')}:</div>
                <div>
                    <select id="selElmAnimDuration">
                        <option value=""></option>
                        <option value="0">0</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                        <option value="1000">1000</option>
                        <option value="1100">1100</option>
                        <option value="1200">1200</option>
                        <option value="1300">1300</option>
                        <option value="1400">1400</option>
                        <option value="1500">1500</option>
                        <option value="1600">1600</option>
                        <option value="1700">1700</option>
                        <option value="1800">1800</option>
                        <option value="1900">1900</option>
                        <option value="2000">2000</option>
                        <option value="2100">2100</option>
                        <option value="2200">2200</option>
                        <option value="2300">2300</option>
                        <option value="2400">2400</option>
                        <option value="2500">2500</option>
                        <option value="2600">2600</option>
                        <option value="2700">2700</option>
                        <option value="2800">2800</option>
                        <option value="2900">2900</option>
                        <option value="3000">3000</option>
                    </select> &nbsp;ms
                </div>
            </div>

            <div class="is-settings clearfix" style="width:100%;">
                <div style="margin-top:15px">
                    <label for="chkAnimateOnce"><input type="checkbox" id="chkAnimateOnce" value=""> ${util.out('Animate Once')} </label>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:100%;">
                <div style="display:flex">
                    <button title="${util.out('Test')}" id="btnPreviewAnim" class="classic" value=""> ${util.out('TEST')} </button>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);

                      
        let inp = panelStuff.querySelector('#selElmAnim');
        inp.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#selElmAnim').value;

            if(val===''){
                elm.removeAttribute('data-aos');
            } else {
                elm.setAttribute('data-aos', val);

                panelStuff.querySelector('#btnPreviewAnim').click();
            }
        
            //Trigger Change event
            this.builder.opts.onChange();

        });
           
        
        inp = panelStuff.querySelector('#selElmAnimDelay');
        inp.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#selElmAnimDelay').value;

            if(val===''){
                elm.removeAttribute('data-aos-delay');
            } else {
                elm.setAttribute('data-aos-delay',val);
            }
        
            //Trigger Change event
            this.builder.opts.onChange();

        });
                        

        inp = panelStuff.querySelector('#selElmAnimDuration');
        inp.addEventListener('change', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#selElmAnimDuration').value;

            if(val===''){
                elm.removeAttribute('data-aos-duration');
            } else {
                elm.setAttribute('data-aos-duration',val);
            }
        
            //Trigger Change event
            this.builder.opts.onChange();

        });


        let btn = panelStuff.querySelector('#chkAnimateOnce');
        btn.addEventListener('click', () => {
            
            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;
     
            if(panelStuff.querySelector('#chkAnimateOnce').checked){
                elm.setAttribute('data-aos-once', 'true');
            } else {
                elm.removeAttribute('data-aos-once');
            }
        
            //Trigger Change event
            this.builder.opts.onChange();

        });

        btn = panelStuff.querySelector('#btnPreviewAnim');
        btn.addEventListener('click', () => {
   
            let elm = this.builder.inspectedElement;

            let animduration = elm.getAttribute('data-aos-duration');
            elm.removeAttribute('data-aos-duration'); //can cause preview problem

            elm.style.visibility = 'hidden';                               
            if(window.AOS) window.AOS.init({
                duration: 1
            });
            dom.removeClass(elm, 'aos-init');
            dom.removeClass(elm, 'aos-animate');  
            
            setTimeout(function () {
                elm.style.visibility = '';             
                if(window.AOS) window.AOS.init({
                    duration: 1200
                });

                if(animduration){
                    elm.setAttribute('data-aos-duration', animduration);
                }

            },10);
        
        });

    }

    readElementStyles(elm) {
                    
        this.panelStuff.querySelector('#selElmAnimDelay').value = '';
        let animname = elm.getAttribute('data-aos-delay');
        this.panelStuff.querySelector('#selElmAnimDelay').value = animname;

        this.panelStuff.querySelector('#selElmAnimDuration').value = '';
        animname = elm.getAttribute('data-aos-duration');
        this.panelStuff.querySelector('#selElmAnimDuration').value = animname;

        this.panelStuff.querySelector('#chkAnimateOnce').checked = false;
        let animateonce = elm.getAttribute('data-aos-once');
        if(animateonce) {
            if(animateonce==='true'){
                this.panelStuff.querySelector('#chkAnimateOnce').checked = true;
            } 
        }

        this.panelStuff.querySelector('#selElmAnim').value = '';
        animname = elm.getAttribute('data-aos');
        this.panelStuff.querySelector('#selElmAnim').value = animname;

    }
}

export default ElementAnimationStyles;