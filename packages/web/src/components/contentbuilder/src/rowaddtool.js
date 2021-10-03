import { Util, Dom } from './util.js';
import renderQuickAdd from './quickadd.js';

const dom = new Dom();

export class RowAddTool{

    constructor(builder) {
        this.builder = builder;
    }

    render(row) {

        const util = new Util(this.builder);

        const quickadd = renderQuickAdd(this.builder);

        let rowaddtool = row.querySelector('.is-rowadd-tool');
        if(!rowaddtool){
            const html = `<div class="is-rowadd-tool" style="height:0">
                <button type="button" title="${util.out('Add')}" title="${util.out('Add')}" style="outline:none;line-height:1;margin:0;padding:0;cursor:pointer;background-color:rgba(255,255,255,0.9);"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:17px;height:17px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>
            </div>`;
            dom.appendHtml(row, html);
            rowaddtool = row.querySelector('.is-rowadd-tool');

            // Prepare for tooltip
            let elms = rowaddtool.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));

                this.builder.tooltip.set(elm,5,3);
            });

        }

        let elm = rowaddtool.querySelector('button');
        dom.addEventListener(elm, 'click', () => {

            let tabs = quickadd.querySelector('.is-pop-tabs');
            tabs.style.display = 'none';

            const viewportHeight = window.innerHeight;
            const top = elm.getBoundingClientRect().top;
            const left = elm.getBoundingClientRect().left;
            quickadd.style.display = 'flex';
            const w = quickadd.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = quickadd.offsetHeight;

            if(viewportHeight - top > h) {
                quickadd.style.top = (top + window.pageYOffset) + 27 + 'px';
                quickadd.style.left = (left -  w/2 + 7) + 'px';
                dom.removeClass(quickadd, 'arrow-bottom');
                dom.removeClass(quickadd, 'arrow-right');
                dom.removeClass(quickadd, 'arrow-left');
                dom.removeClass(quickadd, 'center');
                dom.addClass(quickadd, 'arrow-top');
                dom.addClass(quickadd, 'center');
            } else {
                quickadd.style.top = (top + window.pageYOffset - h - 8) + 'px';
                quickadd.style.left = (left -  w/2 + 7) + 'px';
                dom.removeClass(quickadd, 'arrow-top');
                dom.removeClass(quickadd, 'arrow-right');
                dom.removeClass(quickadd, 'arrow-left');
                dom.removeClass(quickadd, 'center');
                dom.addClass(quickadd, 'arrow-bottom');
                dom.addClass(quickadd, 'center');
            }
    
            quickadd.setAttribute('data-mode', 'row');
            return false;
        });

    }

}

export default RowAddTool;