import { Dom, Util } from './util.js';
import ElementBoxStyles from './elementpanel-box.js';
import ElementSpacingStyles from './elementpanel-spacing.js';
import ElementBorderStyles from './elementpanel-border.js';
import ElementTextStyles from './elementpanel-text.js';
import ElementCornerStyles from './elementpanel-corner.js';
import ElementShadowStyles from './elementpanel-shadow.js';
import ElementDisplayStyles from './elementpanel-display.js';
import ElementPositionStyles from './elementpanel-position.js';
import ElementEffectStyles from './elementpanel-effect.js';
import ElementAttributeStyles from './elementpanel-attribute.js';
import ElementAnimationStyles from './elementpanel-animation.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();
let arrElms = [];

class ElementPanel {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let panel = builderStuff.querySelector('.elementstyles');
        if(!panel){
            let html = `
            <div class="is-side${(this.builder.opts.sidePanel === 'right' ? '' : ' fromleft')} elementstyles">
                    <div class="elm-list" style="z-index:1;width:100%;height:100px;position:absolute;top:0px;left:0px;box-sizing:border-box;display:flex;align-items:center;flex-wrap: wrap;padding:10px 23px 10px 18px;border-bottom:#e8e8e8 1px solid;font-size:9px;"></div>
                    
                    <button title="${util.out('Close')}" class="is-side-close" style="z-index:1;width:25px;height:25px;position:absolute;top:10px;right:13px;box-sizing:border-box;padding:0;line-height:25px;font-size: 12px;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="width:25px;height:25px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
                    
                    <div style="position: absolute;bottom:7px;right:7px;width:40px;height:25px;z-index:1;display:flex">
                        <button title="${util.out('css')}" class="elm-editstyle classic" style="width: 40px;height: 25px;font-family: sans-serif;font-size: 10px;padding: 0px;font-weight: bold;">${util.out('css')}</button>
                    </div>
                        
                    <div style="width:100%;height:100%;overflow-y:auto;overflow-x:hidden;position:absolute;top:0px;left:0px;box-sizing:border-box;border-top:100px solid transparent;padding:0px;">
                            
                        <div class="is-tabs clearfix" data-group="element" style="padding-right:0;padding-bottom:0;">
                            <a title="${util.out('Box')}" id="tabElementBox" href="" data-content="divElementBox" class="active">${util.out('Box')}</a>
                            <a title="${util.out('Spacing')}" id="tabElementSpacing" href="" data-content="divElementSpacing">${util.out('Spacing')}</a>
                            <a title="${util.out('Border')}" id="tabElementBorder" href="" data-content="divElementBorder">${util.out('Border')}</a>
                            <a title="${util.out('Text')}" id="tabElementText" href="" data-content="divElementText">${util.out('Text')}</a>
                            <a title="${util.out('More')}" id="tabElementMore" data-menu="divElementMore" href=""><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-more"></use></svg></a>
                        </div>
                        
                        <div id="divElementMore" class="is-tabs-more" data-group="element">
                            <a title="${util.out('Corners')}" id="tabElementCorner" href="" data-content="divElementCorner">${util.out('Corners')}</a>
                            <a title="${util.out('Shadow')}" id="tabElementShadow" href="" data-content="divElementShadow">${util.out('Shadow')}</a>
                            <a title="${util.out('Display')}" id="tabElementDisplay" href="" data-content="divElementDisplay">${util.out('Display')}</a>
                            <a title="${util.out('Position')}" id="tabElementPosition" href="" data-content="divElementPosition">${util.out('Position')}</a>
                            <a title="${util.out('Effects')}" id="tabElementEffect" href="" data-content="divElementEffect">${util.out('Effects')}</a>
                            <a title="${util.out('Attributes')}" id="tabElementAttribute" href="" data-content="divElementAttribute">${util.out('Attributes')}</a>
                            ${(this.builder.opts.elementAnimate===true ? `<a title="${util.out('Animation')}" id="tabElementAnimation" href="" data-content="divElementAnimation">${util.out('Animation')}</a>` : '')}
                        </div>

                        <div id="divElementBox" class="is-tab-content" data-group="element" style="display:flex;flex-flow:wrap;padding:12px 17px;">
                        </div>

                        <div id="divElementSpacing" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>

                        <div id="divElementBorder" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>

                        <div id="divElementText" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>

                        <div id="divElementCorner" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>

                        <div id="divElementShadow" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>
                        
                        <div id="divElementDisplay" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>
                        
                        <div id="divElementPosition" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>
                        
                        <div id="divElementEffect" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>
                        
                        <div id="divElementAttribute" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>
                        
                        <div id="divElementAnimation" class="is-tab-content" data-group="element" style="display:none;flex-flow:wrap;padding:12px 17px;">
                        </div>

                    </div>
            </div>              
            `;

            dom.appendHtml(builderStuff, html);

            this.elementStyleEditor = new ElementStyleEditor(builder);

            panel = builderStuff.querySelector('.elementstyles');

            let btn = panel.querySelector('.is-side-close');
            dom.addEventListener(btn, 'click', () => {
                this.hidePanel();
            });

            btn = panel.querySelector('.elm-editstyle');
            dom.addEventListener(btn, 'click', () => {
                this.elementStyleEditor.toggleStyleEditor();
            });

        }
        this.panel = panel;

        const elementBoxStyles = new ElementBoxStyles(builder);
        this.elementBoxStyles = elementBoxStyles;

        const elementSpacingStyles = new ElementSpacingStyles(builder);
        this.elementSpacingStyles = elementSpacingStyles;

        const elementBorderStyles = new ElementBorderStyles(builder);
        this.elementBorderStyles = elementBorderStyles;

        const elementTextStyles = new ElementTextStyles(builder);
        this.elementTextStyles = elementTextStyles;

        const elementCornerStyles = new ElementCornerStyles(builder);
        this.elementCornerStyles = elementCornerStyles;

        const elementShadowStyles = new ElementShadowStyles(builder);
        this.elementShadowStyles = elementShadowStyles;

        const elementDisplayStyles = new ElementDisplayStyles(builder);
        this.elementDisplayStyles = elementDisplayStyles;

        const elementPositionStyles = new ElementPositionStyles(builder);
        this.elementPositionStyles = elementPositionStyles;

        const elementEffectStyles = new ElementEffectStyles(builder);
        this.elementEffectStyles = elementEffectStyles;

        const elementAttributeStyles = new ElementAttributeStyles(builder);
        this.elementAttributeStyles = elementAttributeStyles;

        const elementAnimationStyles = new ElementAnimationStyles(builder);
        this.elementAnimationStyles = elementAnimationStyles;

    }

    click() {

        if(dom.hasClass(this.panel, 'active') ||
            dom.hasClass(this.elementStyleEditor.modalStyles, 'active')) {
            
            this.inspect(this.builder.inspectedElement);
        }

    }

    inspect(elm) {

        this.elementBoxStyles.readElementStyles(elm);
        this.elementSpacingStyles.readElementStyles(elm);
        this.elementBorderStyles.readElementStyles(elm);
        this.elementTextStyles.readElementStyles(elm);
        this.elementCornerStyles.readElementStyles(elm);
        this.elementShadowStyles.readElementStyles(elm);
        this.elementDisplayStyles.readElementStyles(elm);
        this.elementPositionStyles.readElementStyles(elm);
        this.elementEffectStyles.readElementStyles(elm);
        this.elementAttributeStyles.readElementStyles(elm);
        this.elementAnimationStyles.readElementStyles(elm);

        let panel = this.panel;

        let elms = document.querySelectorAll('[data-saveforundo]');
        Array.prototype.forEach.call(elms, (elm) => {
            elm.removeAttribute('data-saveforundo');
        });
        elm.setAttribute('data-saveforundo', '');

        elms = document.querySelectorAll('.elm-inspected');
        Array.prototype.forEach.call(elms, (elm) => {
            dom.removeClass(elm, 'elm-inspected');
        });
        setTimeout(()=>{
            dom.addClass(elm, 'elm-inspected');
        },10);

        panel.querySelector('.elm-list').innerHTML = '';

        let element = elm;
        let i = 0;
        arrElms = [];
        while (!dom.hasClass(element, 'is-builder')) {
            
            arrElms.push(element);

            if(!element) { // This should not happen. But on quick user click (ex. undo then redo quickly), an element can lost, so checking is needed
                break;
            }
            if(!element.tagName) {
                break;
            }

            var tagName = element.tagName.toLowerCase();

            var a = dom.createElement('a');
            a.setAttribute('data-index', i);
            i++;
            a.setAttribute('href', '#');
            a.innerHTML = tagName;
            
            if(panel.querySelector('.elm-list').innerHTML===''){
                dom.addClass(a, 'active');
                panel.querySelector('.elm-list').insertAdjacentHTML('afterbegin', a.outerHTML);

            } else {
                panel.querySelector('.elm-list').insertAdjacentHTML('afterbegin', '&nbsp;>&nbsp; ');
                panel.querySelector('.elm-list').insertAdjacentHTML('afterbegin', a.outerHTML);
            }

            element = element.parentNode;

        }

        const links = panel.querySelectorAll('.elm-list a');
        Array.prototype.forEach.call(links, (link) => {

            dom.addEventListener(link, 'click', (e) => {
    
                let index = link.getAttribute('data-index');

                this.builder.inspectedElement = arrElms[index];

                this.inspect(arrElms[index]);

                if(!document.querySelector('.elm-inspected.elm-active')) { // hide element tool if inspected element is not active element
                    this.builderStuff.querySelector('.is-element-tool').style.display = 'none';
                }

                e.preventDefault();
                e.stopImmediatePropagation(); // a must
    
            });

        });

        this.elementStyleEditor.refresh();
        
    }

    showPanel() {

        var panel = this.builderStuff.querySelector('.is-side.elementstyles');

        let panels = this.builderStuff.querySelectorAll('.is-side');
        Array.prototype.forEach.call(panels, (panel) => {
            dom.removeClass(panel, 'active');
        });
        dom.addClass(panel, 'active');

        this.inspect(this.builder.inspectedElement);
        
    }

    hidePanel() {

        var panel = this.builderStuff.querySelector('.is-side.elementstyles');

        dom.removeClass(panel, 'active');

        let elms = document.querySelectorAll('[data-saveforundo]');
        Array.prototype.forEach.call(elms, (elm) => {
            elm.removeAttribute('data-saveforundo');
        });

        elms = document.querySelectorAll('.elm-inspected');
        Array.prototype.forEach.call(elms, (elm) => {
            dom.removeClass(elm, 'elm-inspected');
        });
        
    }
}

export default ElementPanel;