import { Dom, Util } from './util.js';

const dom = new Dom();

class Spacer {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let spacerTool = builderStuff.querySelector('.is-spacer-tool');
        if(!spacerTool){
            let html = `
            <div id="divSpacerTool" class="is-tool is-spacer-tool">
                <button title="${util.out('Decrease')}" data-value="-"><svg class="is-icon-flex"><use xlink:href="#ion-ios-minus-empty"></use></svg></button>
                <button title="${util.out('Increase')}" data-value="+" style="border-left: none;"><svg class="is-icon-flex"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>
            </div>
            `;

            dom.appendHtml(builderStuff, html);

            spacerTool = builderStuff.querySelector('.is-spacer-tool');


            const btns = spacerTool.querySelectorAll('button');
            Array.prototype.forEach.call(btns, (btn) => {

                dom.addEventListener(btn, 'click', () => { 

                    this.builder.uo.saveForUndo();

                    const command = btn.getAttribute('data-value');

                    let spacer = this.builder.activeSpacer;
                    
                    if(command==='-') {
                        if (dom.hasClass(spacer, 'height-300')) { dom.removeClass(spacer, 'height-300'); dom.addClass(spacer, 'height-280'); }
                        else if (dom.hasClass(spacer, 'height-280')) { dom.removeClass(spacer, 'height-280'); dom.addClass(spacer, 'height-260'); }
                        else if (dom.hasClass(spacer, 'height-260')) { dom.removeClass(spacer, 'height-260'); dom.addClass(spacer, 'height-240'); }
                        else if (dom.hasClass(spacer, 'height-240')) { dom.removeClass(spacer, 'height-240'); dom.addClass(spacer, 'height-220'); }
                        else if (dom.hasClass(spacer, 'height-220')) { dom.removeClass(spacer, 'height-220'); dom.addClass(spacer, 'height-200'); }
                        else if (dom.hasClass(spacer, 'height-200')) { dom.removeClass(spacer, 'height-200'); dom.addClass(spacer, 'height-180'); }
                        else if (dom.hasClass(spacer, 'height-180')) { dom.removeClass(spacer, 'height-180'); dom.addClass(spacer, 'height-160'); }
                        else if (dom.hasClass(spacer, 'height-160')) { dom.removeClass(spacer, 'height-160'); dom.addClass(spacer, 'height-140'); }
                        else if (dom.hasClass(spacer, 'height-140')) { dom.removeClass(spacer, 'height-140'); dom.addClass(spacer, 'height-120'); }
                        else if (dom.hasClass(spacer, 'height-120')) { dom.removeClass(spacer, 'height-120'); dom.addClass(spacer, 'height-100'); }
                        else if (dom.hasClass(spacer, 'height-100')) { dom.removeClass(spacer, 'height-100'); dom.addClass(spacer, 'height-80'); }
                        else if (dom.hasClass(spacer, 'height-80')) { dom.removeClass(spacer, 'height-80'); dom.addClass(spacer, 'height-60'); }
                        else if (dom.hasClass(spacer, 'height-60')) { dom.removeClass(spacer, 'height-60'); dom.addClass(spacer, 'height-40'); }
                        else if (dom.hasClass(spacer, 'height-40')) { dom.removeClass(spacer, 'height-40'); dom.addClass(spacer, 'height-20'); }
                        // else { }
                    } else {
                        if (dom.hasClass(spacer, 'height-20')) { dom.removeClass(spacer, 'height-20'); dom.addClass(spacer, 'height-40'); }
                        else if (dom.hasClass(spacer, 'height-40')) { dom.removeClass(spacer, 'height-40'); dom.addClass(spacer, 'height-60'); }
                        else if (dom.hasClass(spacer, 'height-60')) { dom.removeClass(spacer, 'height-60'); dom.addClass(spacer, 'height-80'); }
                        else if (dom.hasClass(spacer, 'height-80')) { dom.removeClass(spacer, 'height-80'); dom.addClass(spacer, 'height-100'); }
                        else if (dom.hasClass(spacer, 'height-100')) { dom.removeClass(spacer, 'height-100'); dom.addClass(spacer, 'height-120'); }
                        else if (dom.hasClass(spacer, 'height-120')) { dom.removeClass(spacer, 'height-120'); dom.addClass(spacer, 'height-140'); }
                        else if (dom.hasClass(spacer, 'height-140')) { dom.removeClass(spacer, 'height-140'); dom.addClass(spacer, 'height-160'); }
                        else if (dom.hasClass(spacer, 'height-160')) { dom.removeClass(spacer, 'height-160'); dom.addClass(spacer, 'height-180'); }
                        else if (dom.hasClass(spacer, 'height-180')) { dom.removeClass(spacer, 'height-180'); dom.addClass(spacer, 'height-200'); }
                        else if (dom.hasClass(spacer, 'height-200')) { dom.removeClass(spacer, 'height-200'); dom.addClass(spacer, 'height-220'); }
                        else if (dom.hasClass(spacer, 'height-220')) { dom.removeClass(spacer, 'height-220'); dom.addClass(spacer, 'height-240'); }
                        else if (dom.hasClass(spacer, 'height-240')) { dom.removeClass(spacer, 'height-240'); dom.addClass(spacer, 'height-260'); }
                        else if (dom.hasClass(spacer, 'height-260')) { dom.removeClass(spacer, 'height-260'); dom.addClass(spacer, 'height-280'); }
                        else if (dom.hasClass(spacer, 'height-280')) { dom.removeClass(spacer, 'height-280'); dom.addClass(spacer, 'height-300'); }
                        // else { }
                    }

                    this.showTool(spacer);

                    //Trigger Change event
                    this.builder.opts.onChange();
            
                    //Trigger Render event
                    this.builder.opts.onRender();

                });

            });


        }
        this.spacerTool = spacerTool;

    }

    click(e) {

        const elm = e.target;

        if(dom.hasClass(elm, 'spacer')) {
            this.builder.activeSpacer = elm;

            this.showTool(elm);
        } else {
            this.hideTool();
        }

    }

    showTool(elm) {

        const top = elm.getBoundingClientRect().top + window.pageYOffset;
        const left = elm.getBoundingClientRect().left;
        this.spacerTool.style.display = 'flex';
        const w = this.spacerTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        const h = this.spacerTool.offsetHeight;
        this.spacerTool.style.top = (top + (elm.offsetHeight - h)/2)  + 'px';
        this.spacerTool.style.left = (left + (elm.offsetWidth - w)/2) + 'px';

    }

    hideTool() {

        this.spacerTool.style.display = '';

    }

}

export default Spacer;