import { Util, Dom } from './util.js';
import renderQuickAdd from './quickadd.js';
import Grid from './grid.js';
import HtmlUtil from './html.js';

const dom = new Dom();

export class ColumnTool{

    constructor(builder) {
        this.builder = builder;

        this.grid = new Grid(builder);

        const util = new Util(builder);

        const builderstuff = util.builderStuff();

        let columnTool = builderstuff.querySelector('.is-column-tool');
        let columnMore;
        let htmlbutton = '';
        if(builder.opts.columnHtmlEditor) htmlbutton = `<button type="button" title="${util.out('HTML')}" class="cell-html">
                <span><svg class="is-icon-flex" style="margin-right:-3px;width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></span>${util.out('HTML')}
            </button>`;
        if(!columnTool){
            let html = `<div class="is-tool is-column-tool">
                <button type="button" title="${util.out('Add')}" class="cell-add"><svg class="is-icon-flex"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>
                <button type="button" title="${util.out('More')}" class="cell-more"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                <button type="button" title="${util.out('Delete')}" class="cell-remove"><svg class="is-icon-flex" style="margin-left:-1px"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
            </div>
            
            <div class="is-pop columnmore">
                <div style="display:flex;flex-flow:wrap;padding-top:3px;">
                    <button type="button" title="${util.out('Move Left')}" class="cell-prev"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-left"></use></svg></span>${util.out('Move Left')}</button>
                    <button type="button" title="${util.out('Move Right')}" class="cell-next"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-right"></use></svg></span>${util.out('Move Right')}</button>
                    <button type="button" title="${util.out('Move Up')}" class="cell-up"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></span>${util.out('Move Up')}</button>
                    <button type="button" title="${util.out('Move Down')}" class="cell-down"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></span>${util.out('Move Down')}</button>
                    <button type="button" title="${util.out('Increase')}" class="cell-increase"><span><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#icon-increase"></use></svg></span>${util.out('Increase')}</button>
                    <button type="button" title="${util.out('Decrease')}" class="cell-decrease"><span><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#icon-decrease"></use></svg></span>${util.out('Decrease')}</button>
                    <button type="button" title="${util.out('Duplicate')}" class="cell-duplicate"><span><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></span>${util.out('Duplicate')}</button>
                    ${htmlbutton}
                </div>
            </div>
            `;

            dom.appendHtml(builderstuff, html);
            columnTool = builderstuff.querySelector('.is-column-tool');
            columnMore = builderstuff.querySelector('.columnmore');

            const quickadd = renderQuickAdd(builder);

            // Prepare for tooltip
            let elms = columnTool.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            // elms = columnMore.querySelectorAll('[title]');
            // Array.prototype.forEach.call(elms, (elm) => {
            //     elm.setAttribute('data-title',elm.getAttribute('title'));
            // });

            // Add column
            let elm = columnTool.querySelector('.cell-add');
            dom.addEventListener(elm, 'click', () => {

                let cell = util.cellSelected();
                if(!cell) return; 

                let tabs = quickadd.querySelector('.is-pop-tabs');
                tabs.style.display = 'flex';

                const elm = columnTool.querySelector('.cell-add');
                const top = elm.getBoundingClientRect().top + window.pageYOffset;
                const left = elm.getBoundingClientRect().left + window.pageXOffset;
                quickadd.style.display = 'flex';
                //const w = quickadd.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
                //const h = quickadd.offsetHeight;
                quickadd.style.top = (top + 35) + 'px';
                quickadd.style.left = (left) + 'px';

                dom.removeClass(quickadd,'arrow-bottom');
                dom.removeClass(quickadd,'arrow-left');
                dom.removeClass(quickadd,'arrow-right');
                dom.removeClass(quickadd,'center');
                dom.removeClass(quickadd,'right');
                dom.addClass(quickadd,'arrow-top');
                dom.addClass(quickadd,'left');

                let val = quickadd.querySelector('.active').getAttribute('data-value');
                if(val==='left') {
                    quickadd.setAttribute('data-mode', 'cell-left');
                } else {
                    quickadd.setAttribute('data-mode', 'cell-right');
                }
            });

            // More
            elm = columnTool.querySelector('.cell-more');
            dom.addEventListener(elm, 'click', () => {

                let cell = util.cellSelected();
                if(!cell) return;

                const elm = columnTool.querySelector('.cell-more');
                const top = elm.getBoundingClientRect().top + window.pageYOffset;
                const left = elm.getBoundingClientRect().left + window.pageXOffset;
                columnMore.style.display = 'flex';
                //const w = columnMore.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
                //const h = columnMore.offsetHeight;
                columnMore.style.top = (top + 35) + 'px';
                columnMore.style.left = (left - 7) + 'px';

                dom.removeClass(columnMore,'arrow-bottom');
                dom.removeClass(columnMore,'arrow-left');
                dom.removeClass(columnMore,'arrow-right');
                dom.removeClass(columnMore,'center');
                dom.removeClass(columnMore,'right');
                dom.addClass(columnMore,'arrow-top');
                dom.addClass(columnMore,'left');
            });

            // Delete column
            elm = columnTool.querySelector('.cell-remove');
            dom.addEventListener(elm, 'click', () => {

                this.grid.removeColumn();
                
                util.clearControls();

            });

            // Move Previous
            elm = columnMore.querySelector('.cell-prev');
            dom.addEventListener(elm, 'click', () => {

                this.grid.moveColumnPrevious();
                
                util.clearControls();

            });

            // Move Next
            elm = columnMore.querySelector('.cell-next');
            dom.addEventListener(elm, 'click', () => {
                
                this.grid.moveColumnNext();
                
                util.clearControls();
                
            });

            // Move Up
            elm = columnMore.querySelector('.cell-up');
            dom.addEventListener(elm, 'click', () => {

                this.grid.moveColumnUp();
                
                util.clearControls();

            });

            // Move Down
            elm = columnMore.querySelector('.cell-down');
            dom.addEventListener(elm, 'click', () => {
                
                this.grid.moveColumnDown();
                
                util.clearControls();
   
            });

            // Increase
            elm = columnMore.querySelector('.cell-increase');
            dom.addEventListener(elm, 'click', () => {
                
                this.grid.increaseColumn();
                
                util.clearControls();
   
            });

            // Decrease
            elm = columnMore.querySelector('.cell-decrease');
            dom.addEventListener(elm, 'click', () => {
                
                this.grid.decreaseColumn();
                
                util.clearControls();
   
            });

            // Duplicate
            elm = columnMore.querySelector('.cell-duplicate');
            dom.addEventListener(elm, 'click', () => {
                
                this.grid.duplicateColumn();
                this.columnMore.style.display = '';
                
                util.clearControls();
                
            });

            // View HTML
            elm = columnMore.querySelector('.cell-html');
            if(elm) dom.addEventListener(elm, 'click', () => {

                let cell = util.cellSelected();
                if(!cell) return;
                
                const htmlutil = new HtmlUtil(this.builder);
                htmlutil.view('cell');
   
            });

            document.addEventListener('mousedown', (e) => {
                e = e || window.event;
                var target = e.target || e.srcElement;  

                if(columnMore.style.display==='flex') {
                    let a = dom.parentsHasClass(target, 'columnmore');
                    let b = dom.parentsHasClass(target, 'cell-more');
                    if(a||b) {
                        return;
                    }
                    else {
                        columnMore.style.display = '';
                    }
                }

            });

        }
        
        this.columnTool = columnTool;
        this.columnMore = columnMore;
        
    }

    click(col) {

        dom.addClass(this.columnTool, 'active');
        this.columnTool.style.top = (col.getBoundingClientRect().top - 29 + window.pageYOffset) + 'px';
        this.columnTool.style.left = (col.getBoundingClientRect().left - 1) + 'px';

        let nogrid = dom.parentsHasAttribute(col, 'nogrid');
        if(nogrid) {
            this.columnMore.querySelector('.cell-prev').style.display = 'none';
            this.columnMore.querySelector('.cell-next').style.display = 'none';
            this.columnMore.querySelector('.cell-up').style.display = 'none';
            this.columnMore.querySelector('.cell-down').style.display = 'none';
            this.columnMore.querySelector('.cell-increase').style.display = 'none';
            this.columnMore.querySelector('.cell-decrease').style.display = 'none';
            this.columnMore.querySelector('.cell-duplicate').style.display = 'none';

            let btnColHtml = this.columnMore.querySelector('.cell-html');
            if(btnColHtml) btnColHtml.style.display = '';

            this.columnTool.querySelector('.cell-add').style.display = 'none';
            this.columnTool.querySelector('.cell-remove').style.display = 'none';

            if(col.getAttribute('data-html')) {
                this.columnMore.querySelector('.cell-html').style.display = 'none';
                this.columnTool.querySelector('.cell-more').style.display = 'none';
            }
        } else {
            this.columnMore.querySelector('.cell-prev').style.display = '';
            this.columnMore.querySelector('.cell-next').style.display = '';
            this.columnMore.querySelector('.cell-up').style.display = '';
            this.columnMore.querySelector('.cell-down').style.display = '';
            this.columnMore.querySelector('.cell-increase').style.display = '';
            this.columnMore.querySelector('.cell-decrease').style.display = '';
            this.columnMore.querySelector('.cell-duplicate').style.display = '';

            let btnColHtml = this.columnMore.querySelector('.cell-html');
            if(btnColHtml) btnColHtml.style.display = '';

            this.columnTool.querySelector('.cell-add').style.display = '';
            this.columnTool.querySelector('.cell-remove').style.display = '';

            let row = col.parentNode;
            if (row.childElementCount - 2 === 1) {//-2 => minus is-row-tool & is-rowadd-tool
                this.columnMore.querySelector('.cell-prev').style.display = 'none';
                this.columnMore.querySelector('.cell-next').style.display = 'none';
                this.columnMore.querySelector('.cell-increase').style.display = 'none';
                this.columnMore.querySelector('.cell-decrease').style.display = 'none';
            } else {
                this.columnMore.querySelector('.cell-prev').style.display = '';
                this.columnMore.querySelector('.cell-next').style.display = '';
                this.columnMore.querySelector('.cell-increase').style.display = '';
                this.columnMore.querySelector('.cell-decrease').style.display = '';
            }
    
            // let btnColHtml = this.columnMore.querySelector('.cell-html');
            let btnColDuplicate = this.columnMore.querySelector('.cell-duplicate');
            if(col.getAttribute('data-html')) {
                if(btnColHtml) btnColHtml.style.display = 'none';
                if(btnColDuplicate) btnColDuplicate.style.display = 'none';
            } else {
                if(btnColHtml) btnColHtml.style.display = '';
                if(btnColDuplicate) btnColDuplicate.style.display = '';
            }

            //data-protected
            if(row.hasAttribute('data-protected')){
                row.querySelector('.is-row-tool').style.display = 'none';

                this.columnTool.style.display = 'none'; // if row protected, then all column protected
            } else {
                if(row.querySelectorAll('[data-protected]').length>0){
                    row.querySelector('.is-row-tool').style.display = 'none';
                } else {
                    row.querySelector('.is-row-tool').style.display = '';
                }

                this.columnTool.style.display = '';
                //check columnTool buttons if need to show or hide
                let _protected = dom.parentsHasAttribute(col, 'data-protected');
                if(_protected){
                    this.columnTool.querySelector('.cell-remove').style.display = 'none';
                    this.columnTool.querySelector('.cell-more').style.display = 'none';
                } else {
                    this.columnTool.querySelector('.cell-remove').style.display = '';
                    this.columnTool.querySelector('.cell-more').style.display = '';
                }
            }

        }

    }

    refreshColumnTool(cell) {
        this.grid.refreshColumnTool(cell);
    }

    showColumnTool(cell) {
        this.grid.showColumnTool(cell);
    }

    hideColumnTool() {
        this.grid.hideColumnTool();
    }

}

export default ColumnTool;