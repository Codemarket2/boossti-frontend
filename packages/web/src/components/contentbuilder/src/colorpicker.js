/*
LATER:
- hex 3 digit gak bisa
- Preferences: color swatch: 10, gradient row/col
- if(transp*1===1)
*/
// import RangeSlider from './rangeslider/range-slider.js'; //https://github.com/Stryzhevskyi/rangeSlider
import Draggable from './draggable.js';
import Modal from './modal.js';
import RangeSlider from 'rangeslider-pure';

class ColorPicker {
    constructor(opts = {}) {

        let defaults = {
            
            onPick: function(){},
            color: '',
            colors: ['#ff9f01', '#f57c00', '#e64918', '#d32f2f', '#5d4038', '#37474f', '#353535',
                '#fbc02c', '#b0b42a', '#689f39', '#c21f5b', '#7b21a2', '#522da8', '#616161',
                '#01b8c9', '#009688', '#388d3c', '#0388d0', '#1465c0', '#2f3f9e', '#9e9e9e'],
            renderOn: '',

            animateModal: false,
            elementToAnimate: '',
            stuffPlacement: '#_cbhtml',

            lang: [],

        };

        this.opts = Object.assign(this, defaults, opts);

        this.id = makeid();
        
        let builderStuff = document.querySelector(this.opts.stuffPlacement);
        if(!builderStuff) {
            builderStuff = document.createElement('div');
            builderStuff.id = '_cbhtml';
            builderStuff.className = 'is-ui';
            document.body.appendChild(builderStuff);
        }
        this.builderStuff = builderStuff;

        // Stuff placement for this (single) instance
        const objStuff = document.createElement('div');
        objStuff.id = this.id;
        builderStuff.appendChild(objStuff);
        this.objStuff = objStuff;

        const modal = new Modal({
            animateModal: this.opts.animateModal,
            elementToAnimate: this.opts.elementToAnimate,
            stuffPlacement: this.opts.stuffPlacement,
        });
        this.modal = modal;

        let html_colors = '';
        if(this.opts.colors.length>0) {
            html_colors += '<div class="color-default clearfix">';
            for (var i = 0; i < this.opts.colors.length; i++) {
                if (this.opts.colors[i] === '#ffffff') {
                    html_colors += '<button title="' + this.opts.colors[i] + '" data-color="' + this.opts.colors[i] + '" style="background:' + this.opts.colors[i] + ';outline:rgba(222,222,222,0.75) 1px solid"></button>';
                } else {
                    html_colors += '<button title="' + this.opts.colors[i] + '" data-color="' + this.opts.colors[i] + '" style="background:' + this.opts.colors[i] + ';"></button>';
                }
            }
            html_colors += '</div>';
        }

        let html_opacbg = '';
        for (i = 0; i < 106; i++) {
            if (i%2 === 0) {
                html_opacbg += '<div style="background:#eee;width:7px;height:7px"></div>';
            } else {
                html_opacbg += '<div style="background:#fff;width:7px;height:7px"></div>';
            }
        }
        let html_previewbg = '';
        for (i = 0; i < 25; i++) {
            if (i%2 === 0) {
                html_previewbg += '<div style="background:#eee;width:7px;height:7px"></div>';
            } else {
                html_previewbg += '<div style="background:#fff;width:7px;height:7px"></div>';
            }
        }

        let html = `<div class="pickcolor" style="width:269px;padding:12px;box-sizing:border-box;">
            ${html_colors}
            <div class="color-gradient clearfix"></div>

            <div class="div-color-opacity" style="height: 10px; margin: 12px 0px 17px;position:relative;">
                <div style="position:absolute;top:0;left:0;width:100%;height:23px;display:flex;flex-direction:column;flex-flow:wrap">
                    ${html_opacbg}
                </div>
                <input class="color-opacity" type="range" />
            </div>
            <div class="clearfix" style="margin:25px 0 3px;">
                <button title="${this.out('B')}" data-color="#000000" style="background:#111111;color:#f3f3f3;border:transparent 1px solid;width:35px;height:35px;line-height:35px;font-size:10px;border-right:none;">${this.out('B')}</button>
                <button title="${this.out('W')}" data-color="#ffffff" style="background:#ffffff;width:35px;height:35px;line-height:35px;font-size:10px;">${this.out('W')}</button>
                <button title="${this.out('Clear')}" data-color="" class="clear" style="width:140px;height:35px;line-height:35px;border-right:none;">${this.out('Clear')}</button>
                <button title="${this.out('More')}" class="input-hsl" style="background:#ffffff;width:35px;height:35px;line-height:35px;font-size:10px;"><svg class="is-icon-flex" style="fill: rgba(0, 0, 0, 0.45);width:13px;height:13px;"><use xlink:href="#ion-more"></use></svg></button>
            </div>
            <div style="display:flex">
                <div style="border: rgba(231, 231, 231, 0.87) 1px solid;flex-grow: 0;flex-shrink: 0;flex-basis: 37px;height:35px;box-sizing:border-box;margin-top:8px;position:relative;">
                    <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;flex-flow:wrap;overflow:hidden;">
                        ${html_previewbg}
                    </div>
                    <button class="is-color-preview" style="position:absolute;top:0;left:0;width:100%;height:100%;transition:none;"></button>
                </div>
                <input class="input-text" type="text" style="width:209px;height:35px;margin-top:8px;font-size:13px;"/>
                <button title="${this.out('Apply')}" class="input-ok" style="height:35px;margin-top:8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);"><use xlink:href="#icon-ok"></use></svg></use></svg></svg></button>
            </div>
        </div>`;

        let html_modal = `<div class="is-modal pickcolor" style="background: rgba(255,255,255,0.001);">
            <div style="max-width:271px;padding:0;">
                <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;height:11px;width: 100%;background: transparent;"></div>
                <div style="padding:12px 12px 12px">

                    ${html_colors}
                    <div class="color-gradient clearfix"></div>
        
                    <div class="div-color-opacity" style="height: 10px; margin: 12px 0px 17px;position:relative;">
                        <div style="position:absolute;top:0;left:0;width:100%;height:23px;display:flex;flex-direction:column;flex-flow:wrap">
                            ${html_opacbg}
                        </div>
                        <input class="color-opacity" type="range" />
                    </div>
                    <div class="clearfix" style="margin:25px 0 3px;">
                        <button title="${this.out('B')}" data-color="#000000" style="background:#111111;color:#f3f3f3;border:transparent 1px solid;width:35px;height:35px;line-height:35px;font-size:10px;border-right:none;">${this.out('B')}</button>
                        <button title="${this.out('W')}" data-color="#ffffff" style="background:#ffffff;width:35px;height:35px;line-height:35px;font-size:10px;">${this.out('W')}</button>
                        <button title="${this.out('Clear')}" data-color="" class="clear" style="width:140px;height:35px;line-height:35px;border-right:none;">${this.out('Clear')}</button>
                        <button title="${this.out('More')}" class="input-hsl" style="background:#ffffff;width:35px;height:35px;line-height:35px;font-size:10px;"><svg class="is-icon-flex" style="fill: rgba(0, 0, 0, 0.45);width:13px;height:13px;"><use xlink:href="#ion-more"></use></svg></button>
                    </div>
                    <div style="display:flex">
                        <div style="border: rgba(231, 231, 231, 0.87) 1px solid;flex-grow: 0;flex-shrink: 0;flex-basis: 37px;height:35px;box-sizing:border-box;margin-top:8px;position:relative;">
                            <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;flex-flow:wrap;overflow:hidden;">
                                ${html_previewbg}
                            </div>
                            <button class="is-color-preview" style="position:absolute;top:0;left:0;width:100%;height:100%;transition:none;"></button>
                        </div>
                        <input class="input-text" type="text" style="width:209px;height:35px;margin-top:8px;font-size:13px;"/>
                        <button title="${this.out('Apply')}" class="input-ok" style="height:35px;margin-top:8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);"><use xlink:href="#icon-ok"></use></svg></use></svg></svg></button>
                    </div>
                    
                </div>
            </div>
        </div>`;
        
        let html_more = `<div class="is-modal pickcolormore" style="background: rgba(255,255,255,0.001);">
            <div style="max-width:341px;padding:0;/*transform:translate3d(323px, 0px, 0px)*/">
                <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;height:11px;width: 100%;background: transparent;"></div>
                <div style="padding:12px 12px 12px">
                    
                    <div class="color-swatch clearfix"></div>
                    
                    <div class="div-color-hue" style="height: 23px;margin: 10px 0 0;">
                        <input class="color-hue" type="range" />
                    </div>

                </div>
            </div>
        </div>`;

        let pickcolor;
        if(this.opts.renderOn!=='') {
            pickcolor = document.querySelector(this.opts.renderOn);
            pickcolor.insertAdjacentHTML('beforeend', html);
        } else {
            objStuff.insertAdjacentHTML('beforeend', html_modal);
            pickcolor = objStuff.querySelector('.is-modal.pickcolor');
        }
        objStuff.insertAdjacentHTML('beforeend', html_more);
    
        const pickcolormore = objStuff.querySelector('.is-modal.pickcolormore');
        this.pickcolor = pickcolor;
        this.pickcolormore = pickcolormore;

        new Draggable({selector: '#' + this.id + ' .is-draggable'});

        let tmp = document.createElement('div');
        tmp.style.backgroundColor = this.opts.color; //hex will be converted to rgb
        let s = tmp.style.backgroundColor; //rgb
        
        let rgb;
        if(s!==''){
            rgb = RGBvalues.color(s);
            this.baseRGB = rgb;
        }

        let colorswatch = pickcolormore.querySelector('.color-swatch');
        let colorgradient = pickcolor.querySelector('.color-gradient');
        let opacValue;
        if(rgb){
            let hueValue;
            if(s!==''){
                hueValue = rgbToHue(rgb.r,rgb.g,rgb.b); 
            } else {
                hueValue = 0;
            }
            opacValue = 1;
            hslSwatch(colorswatch, hueValue, opacValue);

            let hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
            colorSwatch(colorgradient, hueValue, hsl[1]);
        } else {
            let hueValue;
            hueValue = 0;
            opacValue = 1;
            hslSwatch(colorswatch, hueValue, opacValue);

            let hsl = rgbToHsl(255, 255, 255);
            colorSwatch(colorgradient, hueValue, hsl[1]);

        }

        let elm = pickcolor.querySelector('.input-hsl');
        this.addEventListener(elm, 'click', () => {

            this.modal.show(pickcolormore, false, null, false);

        });        

        var colorHue = pickcolormore.querySelector('.color-hue');
        new RangeSlider(colorHue, {
            min: 0,
            max: 360,
            step: 1,
            value: 0,
            onSlide:  (position, value) => {
                let hue = value * 361;
                hslSwatch(colorswatch, hue, 1);
            }
        });

        let hueswatch = document.createElement('div');

        //hueswatch.style = 'display:flex;position:absolute;top:0;left:0;'; //not working in IE11
        hueswatch.style.display = 'flex';
        hueswatch.style.position = 'absolute';
        hueswatch.style.top = 0;
        hueswatch.style.left = 0;
        
        let hslacolors = generateHslaColors(45, 100, 1.0, 315);
        for (i = 0;i<hslacolors.length-1;i++) {
            let item = document.createElement('div');
            item.style.backgroundColor = hslacolors[i];
            item.style.width = '1px';
            item.style.height = '23px';
            hueswatch.appendChild(item);
        }
        pickcolormore.querySelector('.div-color-hue .rangeSlider').appendChild(hueswatch);

        var colorOpacity = pickcolor.querySelector('.color-opacity');
        let colorOpacitySlider = new RangeSlider(colorOpacity, {
            min: 0,
            max: 1,
            step: 0.01,
            onSlide:  (position, value) => {

                let rgb = this.baseRGB;
                if(rgb) {
                    let val;
                    if(value===1) {
                        val = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                    } else {
                        val = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + value + ')';
                    }
    
                    let inputPreview = pickcolor.querySelector('.is-color-preview');
                    inputPreview.style.backgroundColor = val;

                    let inputColor = pickcolor.querySelector('.input-text');
                    inputColor.value = val;
    
                    // Out
                    this.opts.onPick(val);
                }

            },
            onSlideEnd: () => {
                this.builderStuff.setAttribute('preventDevault', 1); // see: rte.js & util.js => builderStuff.getAttribute('preventDevault'). 
                // This prevent unwanted click (that clear controls & selection) while sliding is still in use.
            }
        });
        this.colorOpacitySlider = colorOpacitySlider;

        if(rgb) if(rgb.a) {
            colorOpacity.value = rgb.a;
        } else {
            colorOpacity.value = 1;
        }
        colorOpacitySlider._update();

        // Preview
        let transp = colorOpacity.value;
        let val = '';
        let bgImage = '';
        if(rgb) {
            if(transp*1===1){
                val = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            } else {
                val = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + transp + ')';
            }
            bgImage = 'linear-gradient(90deg, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0), rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',1))';
        }
        pickcolor.querySelector('.div-color-opacity .rangeSlider').style.backgroundImage = bgImage;

        //initial preview
        let inputPreview = pickcolor.querySelector('.is-color-preview');
        inputPreview.style.background = 'none';
        if(val!=='') inputPreview.style.backgroundColor = val; 

        let inputColor = pickcolor.querySelector('.input-text');
        inputColor.value = val;

        let userAgentString = navigator.userAgent; 
        let firefoxAgent = userAgentString.indexOf('Firefox') > -1; 
        if(!firefoxAgent) {
            this.addEventListener(inputColor, 'keydown', (e) => {
                if (e.which === 13 || e.keyCode === 13 || e.key === 'Enter') {
                    this.setColor(e.target.value);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        }

        let inputOk = pickcolor.querySelector('.input-ok');
        this.addEventListener(inputOk, 'click', () => {
            this.setColor(inputColor.value);
        });

        let elms = pickcolor.querySelectorAll('[data-color]');
        Array.prototype.forEach.call(elms, (elm) => {
            this.addEventListener(elm, 'click', (e) => {

                let elm = e.target;
                let base = elm.getAttribute('data-color');

                let rgb = hexToRgb(base);
                this.baseRGB = rgb;

                if(!this.parentsHasClass(elm,'color-gradient') && base!==''){
                    if((rgb.r === rgb.g) && (rgb.g === rgb.b)) {
                        graySwatch(colorgradient);
                    } else {
                        let hue = rgbToHue(rgb.r,rgb.g,rgb.b);
                        hslSwatch(colorswatch, hue, 1);

                        let colorgradient = pickcolor.querySelector('.color-gradient');
                        let hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
                        colorSwatch(colorgradient, hue, hsl[1]);

                    }
                }

                // Preview
                let transp = colorOpacity.value;
                let val = '';
                let bgImage = '';
                if(rgb) {
                    if(transp*1===1){
                        val = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                    } else {
                        val = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + transp + ')';
                    }
                    bgImage = 'linear-gradient(90deg, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0), rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',1))';
                }
                pickcolor.querySelector('.div-color-opacity .rangeSlider').style.backgroundImage = bgImage;

                let inputPreview = pickcolor.querySelector('.is-color-preview');
                inputPreview.style.backgroundColor = val;

                let inputColor = pickcolor.querySelector('.input-text');
                inputColor.value = val;
                
                // Out
                this.opts.onPick(val);
                
            });
        });

        elms = pickcolormore.querySelectorAll('[data-color]');
        Array.prototype.forEach.call(elms, (elm) => {
            this.addEventListener(elm, 'click', () => {

                let base = elm.getAttribute('data-color');

                let rgb = hexToRgb(base);
                this.baseRGB = rgb;

                let hue = rgbToHue(rgb.r,rgb.g,rgb.b);
                let hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
                colorSwatch(colorgradient, hue, hsl[1]);

                // Preview
                let transp = colorOpacity.value;
                let val = '';
                let bgImage = '';
                if(rgb) {
                    if(transp*1===1){
                        val = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                    } else {
                        val = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + transp + ')';
                    }
                    bgImage = 'linear-gradient(90deg, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0), rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',1))';
                }
                pickcolor.querySelector('.div-color-opacity .rangeSlider').style.backgroundImage = bgImage;

                let inputPreview = pickcolor.querySelector('.is-color-preview');
                inputPreview.style.backgroundColor = val;

                let inputColor = pickcolor.querySelector('.input-text');
                inputColor.value = val;                

                // Out
                this.opts.onPick(val);
            });
        });

    } //constructor

    out(s) {
        if(this.opts.lang){
            let val = this.opts.lang[s];
            if(val) return val;
            else {
                return s;
            }
        } else {
            return s;
        }
    }

    open(onPick, color) {
        if(onPick) {
            this.opts.onPick = onPick;
        }
        if(color) {
            this.opts.color = color;
            this.setColor(color);
        }

        this.modal.show(this.pickcolor, false, null, false);
    }

    setColor(color) {
        let pickcolor = this.pickcolor;
        let pickcolormore  = this.pickcolormore;
        
        var colorOpacity = pickcolor.querySelector('.color-opacity');
        let colorgradient = pickcolor.querySelector('.color-gradient');

        let base = color;
        let rgb;
        if(base.indexOf('rgb')!==-1) { //rgb
            rgb = RGBvalues.color(base);
        }
        if(base.indexOf('#')!==-1) { //hex
            rgb = hexToRgb(base);
        }
        if(!rgb) {

            graySwatch(colorgradient);

            colorOpacity.value = 1;
            this.colorOpacitySlider._update();
            pickcolor.querySelector('.div-color-opacity .rangeSlider').style.backgroundImage = '';

            let inputPreview = pickcolor.querySelector('.is-color-preview');
            inputPreview.style.background = 'none';

            let inputColor = pickcolor.querySelector('.input-text');
            inputColor.value = '';

            return;

        }
        this.baseRGB = rgb;

        if((rgb.r === rgb.g) && (rgb.g === rgb.b)) {
            graySwatch(colorgradient);
        } else {
            let colorswatch = pickcolormore.querySelector('.color-swatch');
            let hue = rgbToHue(rgb.r,rgb.g,rgb.b);
            hslSwatch(colorswatch, hue, 1);

            let hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
            colorSwatch(colorgradient, hue, hsl[1]);
        }

        if(rgb.a || rgb.a === 0) {
            colorOpacity.value = rgb.a;
        } else {
            colorOpacity.value = 1;
        }
        this.colorOpacitySlider._update();

        // Preview
        let transp = colorOpacity.value;
        let val = '';
        let bgImage = '';
        if(rgb) {
            if(transp*1===1){
                val = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            } else {
                val = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + transp + ')';
            }
            bgImage = 'linear-gradient(90deg, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0), rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',1))';
        }
        pickcolor.querySelector('.div-color-opacity .rangeSlider').style.backgroundImage = bgImage;

        let inputPreview = pickcolor.querySelector('.is-color-preview');
        inputPreview.style.backgroundColor = val;

        let inputColor = pickcolor.querySelector('.input-text');
        inputColor.value = val;

        // Out
        this.opts.onPick(val);
    }

    addEventListener(parent, type, listener) {
        parent.addEventListener(type, listener);
    }

    parentsHasClass(element, classname) {
        while (element) {
            if(element.tagName === 'BODY' || element.tagName === 'HTML') return false;
            if(!element.classList) return false;
            if (element.classList.contains(classname)) {
                return true;
            }
            element = element.parentNode;
        }
    }

}

// source: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
function makeid() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 2; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    let text2 = '';
    let possible2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
        text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));

    return text + text2;
}

// source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    if(hex==='') return null;

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// https://stackoverflow.com/questions/3080421/javascript-color-gradient
function hex (c) {
    var s = '0123456789abcdef';
    var i = parseInt (c);
    if (i === 0 || isNaN (c))
        return '00';
    i = Math.round (Math.min (Math.max (0, i), 255));
    return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

function rgbToHex (rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

function generateHslaColors (saturation, lightness, alpha, amount) {
    let colors = [];
    let huedelta = Math.trunc(360 / amount);
  
    for (let i = 0; i < amount; i++) {
        let hue = i * huedelta;

        colors.push(`hsla(${hue},${lightness}%,${saturation}%,${alpha})`);
    }
    return colors;
}

// https://css-tricks.com/hsl-hsla-is-great-for-programmatic-color-control/
// https://codepen.io/chriscoyier/pen/YvPLRg
function hslSwatch(elm, hue) {
    let x, y;
    let len = 10;
    let step = 2*(100/len) - (100/len);
    let adj = step/2;
    
    if(elm.innerHTML==='') {
        
        for (x=0;x<len;++x) {

            let tr = document.createElement('div');
            tr.style.width = '100%';
            tr.id = 'row-' + x;
            elm.appendChild(tr);
                    
            for (y=0; y<len; ++y) {
                
                let sat = (x*(100/(len-1)))+adj;
                let light = (y*(100/len))+adj;

                //Rounded values
                if(light>50 && light <=55) light = 50;
                if(sat>100) sat=100;
                //if(x===0)sat=0;

                let rgb = hslToRgb(hue, sat, light);

                let hex = '#' + rgbToHex(rgb);

                let td = document.createElement('div');
                td.title = hex;
                td.style.background = hex;
                td.setAttribute('data-color', hex);

                let row = elm.querySelector('#row-' + x);
                row.appendChild(td);

            }

        }  

    } else {

        for (x=0;x<len;++x) { 

            let tr = elm.childNodes[x];
            
            for (y=0; y<len; ++y) {

                let td = tr.childNodes[y];

                let sat = (x*(100/(len-1)))+adj; //adj makes 0 (dark) to 9 become 0.x (not too dark) to 9.x (close to 10 / white)
                let light = (y*(100/len))+adj;

                //Rounded values
                if(light>50 && light <=55) light = 50;
                if(sat>100) sat=100;
                //if(x===0)sat=0;

                let rgb = hslToRgb(hue, sat, light);

                let hex = '#' + rgbToHex(rgb);

                td.title = hex;
                td.style.background = hex;
                td.setAttribute('data-color', hex);

            }

        }

    } 
        
}


function colorSwatch(elm, hue, sat) {
    let x, y;
    let rownum = 5;
    let colnum = 7;
    let step = 2*(100/colnum) - (100/colnum);
    //let adj = step/2;

    if(elm.innerHTML==='') {
        
        for (x=0;x<rownum;++x) {

            let tr = document.createElement('div');
            tr.style.width = '100%';
            tr.id = 'row-' + x;
            elm.appendChild(tr);
              
            for (y=0; y<colnum; ++y) {

                let z = (x-rownum)*(-1) - 1; //convert 0 to 11 become 11 to 0
                
                let light = (y*(100/colnum));
                light = light + (z*(step/rownum));

                //Rounded values
                if(y===0)light = (y*(100/colnum));

                let rgb = hslToRgb(hue, sat, light);
                let hex = '#' + rgbToHex(rgb);

                let td = document.createElement('div');
                td.title = hex;
                td.style.background = hex;
                td.setAttribute('data-color', hex);

                let row = elm.querySelector('#row-' + x);
                row.appendChild(td);

            }

        }

    } else {
        let tr, td;

        for (x=0;x<rownum;++x) {

            tr = elm.childNodes[x];
            
            for (y=0; y<colnum; ++y) {

                td = tr.childNodes[y];

                let z = (x-rownum)*(-1) - 1; //convert 0 to 11 become 11 to 0
                
                let light = (y*(100/colnum));
                light = light + (z*(step/rownum));

                //Rounded values
                if(x===colnum-1 && y===0) {
                    light = 0;
                }

                let rgb = hslToRgb(hue, sat, light);
                let hex = '#' + rgbToHex(rgb);

                td.title = hex;
                td.style.background = hex;
                td.setAttribute('data-color', hex);
                
            }

        }

    }
        
}

function graySwatch(elm) {
    
    let x, y;
    let rownum = 5;
    let colnum = 7;
    let step = 2*(100/colnum) - (100/colnum);

    if(elm.innerHTML==='') {
        
        for (x=0;x<rownum;++x) {

            let tr = document.createElement('div');
            tr.style.width = '100%';
            tr.id = 'row-' + x;
            elm.appendChild(tr);
                    
            for (y=0; y<colnum; ++y) {

                let z = (x-rownum)*(-1) - 1; //convert 0 to 11 become 11 to 0
                
                let light = (y*(100/colnum));
                light = light + (z*(step/rownum));

                if(y===0)light = (y*(100/colnum));

                let rgb = hslToRgb(0, 0, light);
                let hex = '#' + rgbToHex(rgb);

                let td = document.createElement('div');
                td.title = hex;
                td.style.background = hex;
                td.setAttribute('data-color', hex);

                let row = elm.querySelector('#row-' + x);
                row.appendChild(td);

            }

        }

    } else {
        let tr, td;

        for (x=0;x<rownum;++x) {

            tr = elm.childNodes[x];
            
            for (y=0; y<colnum; ++y) {

                td = tr.childNodes[y];

                let z = (x-rownum)*(-1) - 1; //convert 0 to 11 become 11 to 0
                
                let light = (y*(100/colnum));
                light = light + (z*(step/rownum));

                if(x===colnum-1 && y===0) {
                    light = 0;
                }

                let rgb = hslToRgb(0, 0, light);
                let hex = '#' + rgbToHex(rgb);

                td.title = hex;
                td.style.background = hex;
                td.setAttribute('data-color', hex);
                
            }

        }

    }
        
}

function hueToRgb(m1, m2, h) {
    if( h < 0 ) h = h + 1;
    else if( h > 1 ) h = h - 1;

    if( h*6 < 1 ) return m1+(m2-m1)*h*6;
    else if( h*2 < 1 ) return m2;
    else if( h*3 < 2 ) return m1+(m2-m1)*(2/3-h)*6;
    else return m1;
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var m2 = (l <= 0.5) ? l*(s+1) : l+s-(l*s), m1 = l*2-m2, r = parseInt(hueToRgb(m1, m2, h+1/3)*255), g = parseInt(hueToRgb(m1, m2, h)*255), b = parseInt(hueToRgb(m1, m2, h-1/3)*255);
    return [r, g, b];
}

// https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
function rgbToHue(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var c   = max - min;
    var hue;
    var segment;
    var shift;
    if (c === 0) {
        hue = 0;
    } else {
        switch(max) {
        case r:
            segment = (g - b) / c;
            shift   = 0 / 60;       // R° / (360° / hex sides)
            if (segment < 0) {          // hue > 180, full rotation
                shift = 360 / 60;           // R° / (360° / hex sides)
            }
            hue = segment + shift;
            break;
        case g:
            segment = (b - r) / c;
            shift   = 120 / 60;     // G° / (360° / hex sides)
            hue = segment + shift;
            break;
        case b:
            segment = (r - g) / c;
            shift   = 240 / 60;     // B° / (360° / hex sides)
            hue = segment + shift;
            break;
        default: 
            break;
        }
    }
    return hue * 60; // hue is in [0,6], scale it up
}

// https://stackoverflow.com/questions/10970958/get-a-color-component-from-an-rgb-string-in-javascript
var RGBvalues = (function() {

    var _hex2dec = function(v) {
        return parseInt(v, 16);
    };

    var _splitHEX = function(hex) {
        var c;
        if (hex.length === 4) {
            c = (hex.replace('#','')).split('');
            return {
                r: _hex2dec((c[0] + c[0])),
                g: _hex2dec((c[1] + c[1])),
                b: _hex2dec((c[2] + c[2]))
            };
        } else {
            return {
                r: _hex2dec(hex.slice(1,3)),
                g: _hex2dec(hex.slice(3,5)),
                b: _hex2dec(hex.slice(5))
            };
        }
    };

    var _splitRGB = function(rgb) {
        var c = (rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')'))).split(',');
        var flag = false, obj;
        c = c.map(function(n,i) {
            // return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n);
            if(i !== 3) {
                return parseInt(n, 10);
            } else {
                flag = true;
                return parseFloat(n);
            }
        });
        obj = {
            r: c[0],
            g: c[1],
            b: c[2]
        };
        if (flag) obj.a = c[3];
        return obj;
    };

    var color = function(col) {
        var slc = col.slice(0,1);
        if (slc === '#') {
            return _splitHEX(col);
        } else if (slc.toLowerCase() === 'r') {
            return _splitRGB(col);
        } else {
            console.log('!Ooops! RGBvalues.color('+col+') : HEX, RGB, or RGBa strings only');
        }
    };

    return {
        color: color
    };
}());

// https://codepen.io/pankajparashar/pen/oFzIg
function rgbToHsl(r, g, b){
    //r /= 255, g /= 255, b /= 255;
    r = r/255;
    g = g/255;
    b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) { h = s = 0; } 
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
        }
        
        h /= 6;
    }
    
    return [(h*100+0.5)|0, ((s*100+0.5)|0), ((l*100+0.5)|0)];
}

export default ColorPicker;