import Draggable from './draggable.js';
import Modal from './modal.js';
import ColorPicker from './colorpicker.js';

class GradientPicker {
    constructor(opts = {}) {

        let defaults = {
            
            colors: ['#ff9f01', '#f57c00', '#e64918', '#d32f2f', '#5d4038', '#37474f', '#353535',
                '#fbc02c', '#b0b42a', '#689f39', '#c21f5b', '#7b21a2', '#522da8', '#616161',
                '#01b8c9', '#009688', '#388d3c', '#0388d0', '#1465c0', '#2f3f9e', '#9e9e9e'],
            gradientcolors: [
                ['linear-gradient(0deg, rgb(255, 57, 25), rgb(249, 168, 37))'],
                ['linear-gradient(0deg, rgb(255, 57, 25), rgb(255, 104, 15))'],
                ['linear-gradient(0deg, #FF5722, #FF9800)'],
                ['linear-gradient(0deg, #613ca2, rgb(110, 123, 217))'],
                ['linear-gradient(0deg, rgb(65, 70, 206), rgb(236, 78, 130))'],
                ['linear-gradient(0deg, rgb(0, 150, 102), rgb(90, 103, 197))'],
                ['linear-gradient(30deg, rgb(249, 119, 148), rgb(98, 58, 162))'],
                ['linear-gradient(0deg, rgb(223, 70, 137), rgb(90, 103, 197))'],
                ['linear-gradient(0deg, rgb(40, 53, 147), rgb(90, 103, 197))'],
                ['linear-gradient(0deg, rgb(21, 101, 192), rgb(52, 169, 239))'],
                ['linear-gradient(0deg, rgb(32, 149, 219), rgb(139, 109, 230))'],
                ['linear-gradient(0deg, rgb(90, 103, 197), rgb(0, 184, 201))'],
                ['linear-gradient(0deg, rgb(0, 184, 201), rgb(253, 187, 45))'],
                ['linear-gradient(0deg, rgb(255, 208, 100), rgb(239, 98, 159))'],
                ['linear-gradient(0deg, rgb(0, 214, 223), rgb(130, 162, 253))'],
                ['linear-gradient(0deg, rgb(50, 234, 251), rgb(248, 247, 126))'],
                ['linear-gradient(0deg, rgb(141, 221, 255), rgb(255, 227, 255))'],
                ['linear-gradient(0deg, rgb(255, 170, 170), rgb(255, 255, 200))'],
                ['linear-gradient(0deg, rgb(239, 239, 239), rgb(252, 252, 252))']
            ], 

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

        let html_gradcolors = '';
        for (var i = 0; i < this.opts.gradientcolors.length; i++) {
            html_gradcolors += `<button data-elmgradient="${this.opts.gradientcolors[i][0]}" data-textcolor="${(this.opts.gradientcolors[i][1]?this.opts.gradientcolors[i][1]:'')}" style="background-image:${this.opts.gradientcolors[i][0]};width:35px;height:35px;border:none;"></button>`;
        }

        let html = `
            <div class="is-modal pickgradientcolor">
            <div style="max-width:201px;padding:0;">
                <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;height:11px;width: 100%;background: transparent;"></div>
                <div style="padding:12px 12px 12px">
                    <div class="div-gradients" style="display: flex;flex-flow: wrap;margin-bottom:10px;">
                        ${html_gradcolors}
                        <button class="input-gradient-clear" title="${this.out('Clear')}" data-value="" style="width:35px;height:35px;border:rgba(0,0,0,0.09) 1px solid;border-left: none;border-top: none;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
                    </div>
                    <div class="is-settings" style="margin-bottom:0">
                        <div class="is-label" style="margin-top:0">${this.out('Custom')}:</div>
                        <div class="div-custom-gradients clearfix" style="height:auto;display: flex;flex-flow: wrap;"></div>
                        <div>
                            <button title="${this.out('Select Color')}" class="input-gradient-color1 is-btn-color" data-value="dark" style="border-right:none"></button>
                            <button title="${this.out('Select Color')}" class="input-gradient-color2 is-btn-color" data-value="dark"></button>
                            <input type="text" class="input-gradient-deg" value="0" style="width:60px;height:35px;margin-left:7px;margin-right:5px;font-size:14px;"/> deg
                        </div>
                    </div>
                    <div class="is-settings clearfix" style="margin-bottom:0">
                        <button title="${this.out('Add')}" class="input-gradient-save" style="width:100%;border:none;"> ${this.out('Add')} </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        objStuff.insertAdjacentHTML('beforeend', html);
    
        const pickGradient = objStuff.querySelector('.is-modal.pickgradientcolor');
        this.pickGradient = pickGradient;

        new Draggable({selector: '#' + this.id + ' .is-draggable'});

        const colorPicker = new ColorPicker({
            colors: this.opts.colors,
            animateModal: this.opts.animateModal,
            elementToAnimate: this.opts.container,
            lang: this.opts.lang
        });

        let btnColor1 = objStuff.querySelector('.input-gradient-color1');
        btnColor1.addEventListener('click', () => {
            colorPicker.open((color)=>{

                // set element style
                let color1 = color;
                let color2 = objStuff.querySelector('.input-gradient-color2').style.backgroundColor;
                let deg = objStuff.querySelector('.input-gradient-deg').value;

                if(color2 === '') color2 = '#ffffff';

                let css = `linear-gradient(${deg}deg, ${color1}, ${color2})`;

                this.targetElement.style.backgroundImage = css;

                if(this.opts.onChange) this.opts.onChange(css);

                // update preview
                btnColor1.style.backgroundColor = color;

            }, btnColor1.style.backgroundColor);
        });

        let btnColor2 = objStuff.querySelector('.input-gradient-color2');
        btnColor2.addEventListener('click', () => {
            colorPicker.open((color)=>{

                // set element style
                let color1 = objStuff.querySelector('.input-gradient-color1').style.backgroundColor;
                let color2 = color;
                let deg = objStuff.querySelector('.input-gradient-deg').value;

                if(color1 === '') color1 = '#ffffff';

                let css = `linear-gradient(${deg}deg, ${color1}, ${color2})`;

                this.targetElement.style.backgroundImage = css;

                if(this.opts.onChange) this.opts.onChange(css);

                // update preview
                btnColor2.style.backgroundColor = color;

            }, btnColor2.style.backgroundColor);
        });

        // Apply default gradient
        let btns = objStuff.querySelectorAll('.div-gradients [data-elmgradient]');
        Array.prototype.forEach.call(btns, (btn) => {
            let grad = btn.getAttribute('data-elmgradient');
            let textcolor = btn.getAttribute('data-textcolor');
            btn.addEventListener('click', () => {

                this.targetElement.style.backgroundImage = grad;

                if(this.opts.onChange) this.opts.onChange(grad, textcolor);

                // Read gradient
                const s = this.targetElement.style.backgroundImage;
                if(s.indexOf('linear-gradient')!==-1){
                    const result = getGradient(s);
                    if(result !== null) {
                        try{
                            let color1 = result.colorStopList[0].color;
                            let color2 = result.colorStopList[1].color;
                            let line = result.line;
                
                            this.objStuff.querySelector('.input-gradient-color1').style.backgroundColor = color1;
                            this.objStuff.querySelector('.input-gradient-color2').style.backgroundColor = color2;
                
                            if(line.indexOf('deg')!==-1){
                                this.objStuff.querySelector('.input-gradient-deg').value = line.replace('deg','');
                            }
                        } catch(e) {
                            // Do Nothing
                        }
                    }
                }

                let btns = objStuff.querySelectorAll('.div-gradients [data-elmgradient]');
                Array.prototype.forEach.call(btns, (btn) => {
                    this.removeClass(btn, 'active');
                });
                this.addClass(btn, 'active');

            });
        });

        let btnClear = objStuff.querySelector('.input-gradient-clear');
        btnClear.addEventListener('click', () => {

            this.targetElement.style.backgroundImage = '';

            if(this.opts.onChange) this.opts.onChange('');

            this.objStuff.querySelector('.input-gradient-color1').style.backgroundColor = '';
            this.objStuff.querySelector('.input-gradient-color2').style.backgroundColor = '';
            this.objStuff.querySelector('.input-gradient-deg').value = '0';

        });

        let inputDeg = objStuff.querySelector('.input-gradient-deg');
        inputDeg.addEventListener('keyup', () => {

            // set element style
            let color1 = objStuff.querySelector('.input-gradient-color1').style.backgroundColor;
            let color2 = objStuff.querySelector('.input-gradient-color2').style.backgroundColor;
            let deg = inputDeg.value;

            if(color1 === '') color1 = '#ffffff';
            if(color2 === '') color2 = '#ffffff';

            let css = `linear-gradient(${deg}deg, ${color1}, ${color2})`;

            this.targetElement.style.backgroundImage = css;

            if(this.opts.onChange) this.opts.onChange(css);

        });

        let btnSave = objStuff.querySelector('.input-gradient-save');
        btnSave.addEventListener('click', () => {

            let color1 = objStuff.querySelector('.input-gradient-color1').style.backgroundColor;
            let color2 = objStuff.querySelector('.input-gradient-color2').style.backgroundColor;
            let deg = inputDeg.value;

            if(color1 === '') color1 = '#ffffff';
            if(color2 === '') color2 = '#ffffff';

            let css = `linear-gradient(${deg}deg, ${color1}, ${color2})`;

            // Save
            let customgradcolors = [];
            if (localStorage.getItem('_customgradcolors') !== null) {
                customgradcolors = JSON.parse(localStorage.getItem('_customgradcolors'));
            }
            customgradcolors.push(css); 
            localStorage.setItem('_customgradcolors', JSON.stringify(customgradcolors));

            // Render custom gradients
            if (localStorage.getItem('_customgradcolors') !== null) {
                let customgradcolors = JSON.parse(localStorage.getItem('_customgradcolors'));
        
                let html_gradcolors = '';
                for (var i = 0; i < customgradcolors.length; i++) {
                    html_gradcolors += `<button class="is-elmgrad-item" data-elmgradient="${customgradcolors[i]}" style="background-image:${customgradcolors[i]};width:35px;height:35px;padding:0;border:none;"><div class="is-elmgrad-remove"><svg class="is-icon-flex" style="fill:rgba(255, 255, 255, 1);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div></button>`;
                }
                this.objStuff.querySelector('.div-custom-gradients').innerHTML = html_gradcolors;
            }

            // Apply custom gradient
            let btns = this.objStuff.querySelectorAll('.div-custom-gradients [data-elmgradient]');
            Array.prototype.forEach.call(btns, (btn) => {
                let grad = btn.getAttribute('data-elmgradient');
                btn.addEventListener('click', () => {

                    this.targetElement.style.backgroundImage = grad;

                    if(this.opts.onChange) this.opts.onChange(grad);

                    // Read gradient
                    const s = this.targetElement.style.backgroundImage;
                    if(s.indexOf('linear-gradient')!==-1){
                        const result = getGradient(s);
                        if(result !== null) {
                            try{
                                let color1 = result.colorStopList[0].color;
                                let color2 = result.colorStopList[1].color;
                                let line = result.line;
                    
                                this.objStuff.querySelector('.input-gradient-color1').style.backgroundColor = color1;
                                this.objStuff.querySelector('.input-gradient-color2').style.backgroundColor = color2;
                    
                                if(line.indexOf('deg')!==-1){
                                    this.objStuff.querySelector('.input-gradient-deg').value = line.replace('deg','');
                                }
                            } catch(e) {
                                // Do Nothing
                            }
                        }
                    }

                    let btns = objStuff.querySelectorAll('.div-custom-gradients [data-elmgradient]');
                    Array.prototype.forEach.call(btns, (btn) => {
                        this.removeClass(btn, 'active');
                    });
                    this.addClass(btn, 'active');

                });
            });

            // Delete custom gradient
            let btnsRemoveGrad = this.objStuff.querySelectorAll('.div-custom-gradients .is-elmgrad-remove');
            Array.prototype.forEach.call(btnsRemoveGrad, (btnRemoveGrad) => {

                btnRemoveGrad.addEventListener('click', () => {

                    //Custom grad colors
                    let customgradcolors = [];
                    if (localStorage.getItem('_customgradcolors') !== null) {
                        customgradcolors = JSON.parse(localStorage.getItem('_customgradcolors'));
                    }

                    var css = btnRemoveGrad.parentNode.getAttribute('data-elmgradient');
                    for (var i = 0; i < customgradcolors.length; i++) {
                        if(customgradcolors[i]===css){
                            customgradcolors.splice(i, 1);
                        }
                    }

                    localStorage.setItem('_customgradcolors', JSON.stringify(customgradcolors));

                    btnRemoveGrad.parentNode.parentNode.removeChild(btnRemoveGrad.parentNode);
                
                    return false;

                });

            });

        });

    }

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

    open(elm, onChange, onFinish) {

        this.opts.onChange = onChange;
        this.opts.onFinish = onFinish;

        this.targetElement = elm;

        // Read gradient
        this.objStuff.querySelector('.input-gradient-color1').style.backgroundColor = '';
        this.objStuff.querySelector('.input-gradient-color2').style.backgroundColor = '';
        this.objStuff.querySelector('.input-gradient-deg').value = '0';

        const s = elm.style.backgroundImage;
        if(s.indexOf('linear-gradient')!==-1){
            const result = getGradient(s);
            if(result !== null) {
                try{
                    let color1 = result.colorStopList[0].color;
                    let color2 = result.colorStopList[1].color;
                    let line = result.line;
        
                    this.objStuff.querySelector('.input-gradient-color1').style.backgroundColor = color1;
                    this.objStuff.querySelector('.input-gradient-color2').style.backgroundColor = color2;
        
                    if(line.indexOf('deg')!==-1){
                        this.objStuff.querySelector('.input-gradient-deg').value = line.replace('deg','');
                    }
                } catch(e) {
                    // Do Nothing
                }
            }
        }

        // Save original style
        this.original = s;

        // Render custom gradients
        let customgradcolors = [];
        if (localStorage.getItem('_customgradcolors') !== null) {
            customgradcolors = JSON.parse(localStorage.getItem('_customgradcolors'));
    
            let html_gradcolors = '';
            for (var i = 0; i < customgradcolors.length; i++) {
                html_gradcolors += `<button class="is-elmgrad-item" data-elmgradient="${customgradcolors[i]}" style="background-image:${customgradcolors[i]};width:35px;height:35px;padding:0;border:none;"><div class="is-elmgrad-remove"><svg class="is-icon-flex" style="fill:rgba(255, 255, 255, 1);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div></button>`;
            }
            this.objStuff.querySelector('.div-custom-gradients').innerHTML = html_gradcolors;
        }

        // Apply custom gradient
        let btns = this.objStuff.querySelectorAll('.div-custom-gradients [data-elmgradient]');
        Array.prototype.forEach.call(btns, (btn) => {
            let grad = btn.getAttribute('data-elmgradient');
            btn.addEventListener('click', () => {

                this.targetElement.style.backgroundImage = grad;

                if(this.opts.onChange) this.opts.onChange(grad);

                // Read gradient
                const s = this.targetElement.style.backgroundImage;
                if(s.indexOf('linear-gradient')!==-1){
                    const result = getGradient(s);
                    if(result !== null) {
                        try{
                            let color1 = result.colorStopList[0].color;
                            let color2 = result.colorStopList[1].color;
                            let line = result.line;
                
                            this.objStuff.querySelector('.input-gradient-color1').style.backgroundColor = color1;
                            this.objStuff.querySelector('.input-gradient-color2').style.backgroundColor = color2;
                
                            if(line.indexOf('deg')!==-1){
                                this.objStuff.querySelector('.input-gradient-deg').value = line.replace('deg','');
                            }
                        } catch(e) {
                            // Do Nothing
                        }
                    }
                }

                let btns = this.objStuff.querySelectorAll('.div-custom-gradients [data-elmgradient]');
                Array.prototype.forEach.call(btns, (btn) => {
                    this.removeClass(btn, 'active');
                });
                this.addClass(btn, 'active');

            });
        });

        // Delete custom gradient
        let btnsRemoveGrad = this.objStuff.querySelectorAll('.div-custom-gradients .is-elmgrad-remove');
        Array.prototype.forEach.call(btnsRemoveGrad, (btnRemoveGrad) => {

            btnRemoveGrad.addEventListener('click', () => {

                //Custom grad colors
                let customgradcolors = [];
                if (localStorage.getItem('_customgradcolors') !== null) {
                    customgradcolors = JSON.parse(localStorage.getItem('_customgradcolors'));
                }

                var css = btnRemoveGrad.parentNode.getAttribute('data-elmgradient');
                for (var i = 0; i < customgradcolors.length; i++) {
                    if(customgradcolors[i]===css){
                        customgradcolors.splice(i, 1);
                    }
                }

                localStorage.setItem('_customgradcolors', JSON.stringify(customgradcolors));

                btnRemoveGrad.parentNode.parentNode.removeChild(btnRemoveGrad.parentNode);
            
                return false;

            });

        });

        this.modal.show(this.pickGradient, false, ()=>{

            if(this.original === this.targetElement.style.backgroundImage) {
                // no change
                if(this.opts.onFinish) {
                    this.opts.onFinish(false);
                }
            } else {
                // changed
                if(this.opts.onFinish) {
                    this.opts.onFinish(true);
                }
            }

        }, false);
    }

    addClass(element, classname) {
        if(!element) return;
        if(this.hasClass(element,classname)) return;
        if(element.classList.length===0) element.className = classname;
        else element.className = element.className + ' ' + classname;
        //else element.classList.add(classname); //error if there is -
    }

    removeClass(element, classname) {
        if(!element) return;
        if(element.classList.length>0) {
            element.className = element.className.replace(classname, '');
        }
    }

    hasClass(element, classname) {
        if(!element) return false;
        return element.classList ? element.classList.contains(classname) : new RegExp('\\b'+ classname+'\\b').test(element.className);
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

// source: https://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex 
function getGradient(input) {
    var result,
        regExpLib = generateRegExp(),
        //rGradientEnclosedInBrackets = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/,// Captures inside brackets - max one additional inner set.
        rGradientEnclosedInBrackets = /.*gradient\s*\(((?:\([^)]*\)|[^)(]*)*)\)/, // Oct 29, 2019
        match = rGradientEnclosedInBrackets.exec(input);

    if (match !== null) {
        // Get the parameters for the gradient
        result = parseGradient(regExpLib, match[1]);
        if (result.original.trim() !== match[1].trim()) {
            // Did not match the input exactly - possible parsing error.
            result.parseWarning = true;
        }
    } else {
        result = 'Failed to find gradient';
    }

    return result;
}

var combineRegExp = function (regexpList, flags) {
    var i,
        source = '';
    for (i = 0; i < regexpList.length; i++) {
        if (typeof regexpList[i] === 'string') {
            source += regexpList[i];
        } else {
            source += regexpList[i].source;
        }
    }
    return new RegExp(source, flags);
};
var generateRegExp = function () {
    // Note any variables with "Capture" in name include capturing bracket set(s).
    var searchFlags = 'gi', // ignore case for angles, "rgb" etc
        rAngle = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/, // Angle +ive, -ive and angle types
        rSideCornerCapture = /to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?))/, // optional 2nd part
        rComma = /\s*,\s*/, // Allow space around comma.
        //rColorHex = /\#(?:[a-f0-9]{6}|[a-f0-9]{3})/, // 3 or 6 character form
        rColorHex = /#(?:[a-f0-9]{6}|[a-f0-9]{3})/, // 3 or 6 character form // Oct 29, 2019
        rDigits3 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)/,// "(1, 2, 3)"
        rDigits4 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*,\s*\d*\.?\d+\)/,// "(1, 2, 3, 4)"
        rValue = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/,// ".9", "-5px", "100%".
        rKeyword = /[_a-z-][_a-z0-9-]*/,// "red", "transparent", "border-collapse".
        rColor = combineRegExp([
            '(?:', rColorHex, '|', '(?:rgb|hsl)', rDigits3, '|', '(?:rgba|hsla)', rDigits4, '|', rKeyword, ')'
        ], ''),
        rColorStop = combineRegExp([rColor, '(?:\\s+', rValue, '(?:\\s+', rValue, ')?)?'], ''),// Single Color Stop, optional %, optional length.
        rColorStopList = combineRegExp(['(?:', rColorStop, rComma, ')*', rColorStop], ''),// List of color stops min 1.
        rLineCapture = combineRegExp(['(?:(', rAngle, ')|', rSideCornerCapture, ')'], ''),// Angle or SideCorner
        rGradientSearch = combineRegExp([
            '(?:(', rLineCapture, ')', rComma, ')?(', rColorStopList, ')'
        ], searchFlags),// Capture 1:"line", 2:"angle" (optional), 3:"side corner" (optional) and 4:"stop list".
        rColorStopSearch = combineRegExp([
            '\\s*(', rColor, ')', '(?:\\s+', '(', rValue, '))?', '(?:', rComma, '\\s*)?'
        ], searchFlags);// Capture 1:"color" and 2:"position" (optional).

    return {
        gradientSearch: rGradientSearch,
        colorStopSearch: rColorStopSearch
    };
};
var parseGradient = function (regExpLib, input) {
    var result,
        matchGradient,
        matchColorStop,
        stopResult;

    // reset search position, because we reuse regex.
    regExpLib.gradientSearch.lastIndex = 0;

    matchGradient = regExpLib.gradientSearch.exec(input);
    if (matchGradient !== null) {
        result = {
            original: matchGradient[0],
            colorStopList: []
        };

        // // Line (Angle or Side-Corner).
        // if (!!matchGradient[1]) {
        //     result.line = matchGradient[1];
        // }
        // // Angle or undefined if side-corner.
        // if (!!matchGradient[2]) {
        //     result.angle = matchGradient[2];
        // }
        // // Side-corner or undefined if angle.
        // if (!!matchGradient[3]) {
        //     result.sideCorner = matchGradient[3];
        // }

        // Oct 29, 2019
        // Line (Angle or Side-Corner).
        if (matchGradient[1]) {
            result.line = matchGradient[1];
        }
        // Angle or undefined if side-corner.
        if (matchGradient[2]) {
            result.angle = matchGradient[2];
        }
        // Side-corner or undefined if angle.
        if (matchGradient[3]) {
            result.sideCorner = matchGradient[3];
        }


        // reset search position, because we reuse regex.
        regExpLib.colorStopSearch.lastIndex = 0;

        // Loop though all the color-stops.
        matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
        while (matchColorStop !== null) {

            stopResult = {
                color: matchColorStop[1]
            };

            // // Position (optional).
            // if (!!matchColorStop[2]) {
            //     stopResult.position = matchColorStop[2];
            // }

            // Oct 29, 2019
            // Position (optional).
            if (matchColorStop[2]) {
                stopResult.position = matchColorStop[2];
            }

            result.colorStopList.push(stopResult);

            // Continue searching from previous position.
            matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
        }
    }

    // Can be undefined if match not found.
    return result;
};

export default GradientPicker;