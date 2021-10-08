import { Util, Dom } from './util.js';
import Grid from './grid.js';
import HtmlUtil from './html.js';

const dom = new Dom();

export class RowTool{

    constructor(builder) {
        this.builder = builder;

        this.grid = new Grid(builder);

        const util = new Util(this.builder);

        const htmlutil = new HtmlUtil(builder);

        const builderstuff = util.builderStuff();

        let rowMore = builderstuff.querySelector('.rowmore');
        let htmlbutton = '';
        if(builder.opts.rowHtmlEditor) htmlbutton = `<button type="button" title="${util.out('HTML')}" class="row-html">
                <span><svg class="is-icon-flex" style="margin-right:-3px;width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></span>${util.out('HTML')}
            </button>`;
        if(!rowMore){
            let html = `<div class="is-pop rowmore" style="z-index:10002;">
                <div style="display:flex;flex-flow:wrap;padding-top:3px;">
                    <button type="button" title="${util.out('Move Up')}" class="row-up"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></span>${util.out('Move Up')}</button>
                    <button type="button" title="${util.out('Move Down')}" class="row-down"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></span>${util.out('Move Down')}</button>
                    <button type="button" title="${util.out('Duplicate')}" class="row-duplicate"><span><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></span>${util.out('Duplicate')}</button>
                    ${htmlbutton}
                </div>
            </div>`;
            dom.appendHtml(builderstuff, html);
            rowMore = builderstuff.querySelector('.rowmore');

            let elm = rowMore.querySelector('.row-up');
            if(elm) dom.addEventListener(elm, 'click', () => {
    
                this.grid.moveRowUp();
                
                util.clearControls();
                
            });
    
            elm = rowMore.querySelector('.row-down');
            if(elm) dom.addEventListener(elm, 'click', () => {
    
                this.grid.moveRowDown();
                
                util.clearControls();

            });
    
            elm = rowMore.querySelector('.row-duplicate');
            if(elm) dom.addEventListener(elm, 'click', () => {
    
                this.grid.duplicateRow();
                this.rowMore.style.display = '';
                
                util.clearControls();

            });
    
    
            elm = rowMore.querySelector('.row-html');
            if(elm) dom.addEventListener(elm, 'click', () => {
    
                const cell = util.cellSelected();
                if(!cell) return;
                
                htmlutil.view('row');
                
            });
        }
        this.rowMore = rowMore;

        // Click anywhere will hide Column tool
        document.addEventListener('mousedown', (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement;  

            if(rowMore.style.display === 'flex'){
                let a = dom.parentsHasClass(target, 'rowmore');
                let b = dom.parentsHasClass(target, 'row-more');
                if(a||b) {
                    return;
                }
                else {
                    rowMore.style.display = '';
                }
            }
        });
        
    }

    render(row) {

        const util = new Util(this.builder);

        const builderstuff = util.builderStuff();
        let rowMore = this.rowMore;

        let rowtool = row.querySelector('.is-row-tool');
        if(!rowtool){

            let html = `<div class="is-tool is-row-tool">
                <div title="Move" class="row-handle" style="width:100%;cursor:move;text-align:center;"><svg class="is-icon-flex"><use xlink:href="#ion-move"></use></svg></div>
                <button type="button" title="${util.out('More')}" class="row-more"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                <button type="button" title="${util.out('Grid Editor')}" class="row-grideditor"><svg class="is-icon-flex"><use xlink:href="#ion-grid"></use></svg></button>
                <button type="button" title="${util.out('Delete')}" class="row-remove"><svg class="is-icon-flex"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
            </div>`;

            dom.appendHtml(row, html);
            rowtool = row.querySelector('.is-row-tool');

            // Prepare for tooltip
            let elms = rowtool.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));

                this.builder.tooltip.set(elm,5,3);
            });
    
            let elm = rowtool.querySelector('.row-grideditor');
            if(elm) dom.addEventListener(elm, 'click', () => {
                
                const grideditor = builderstuff.querySelector('.grideditor');
                if(dom.hasClass(grideditor, 'active')) {
                    dom.removeClass(grideditor, 'active');

                    const builders = document.querySelectorAll(this.builder.opts.container);
                    Array.prototype.forEach.call(builders, (builder) => {
                        builder.removeAttribute('grideditor');
                    });
                } else {
                    dom.addClass(grideditor, 'active');

                    const builders = document.querySelectorAll(this.builder.opts.container);
                    Array.prototype.forEach.call(builders, (builder) => {
                        builder.setAttribute('grideditor','');
                    });
                }
        
            });

            elm = rowtool.querySelector('.row-more');
            if(elm) dom.addEventListener(elm, 'click', () => {
                
                let cell = util.cellSelected();
                if(!cell) return;
                let row = cell.parentNode;  

                //Change to row selection
                dom.removeClass(row, 'row-outline'); 

                //Hide Column tool
                let columnTool = builderstuff.querySelector('.is-column-tool');
                dom.removeClass(columnTool, 'active');

                const elm = rowtool.querySelector('.row-more');
                const top = elm.getBoundingClientRect().top + window.pageYOffset;
                const left = elm.getBoundingClientRect().left + window.pageXOffset;
                rowMore.style.display = 'flex';
                //const w = rowMore.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
                //const h = rowMore.offsetHeight;
                rowMore.style.top = (top - 8) + 'px';

                dom.removeClass(rowMore,'arrow-bottom');
                dom.removeClass(rowMore,'arrow-left');
                dom.removeClass(rowMore,'arrow-right');
                dom.removeClass(rowMore,'center');
                dom.removeClass(rowMore,'right');
                dom.removeClass(rowMore,'left');

                if(this.builder.opts.rowTool === 'right') {
                    
                    rowMore.style.left = (left - rowMore.offsetWidth - 10) + 'px';

                    dom.addClass(rowMore,'arrow-right');
                    dom.addClass(rowMore,'left');

                } else {

                    rowMore.style.left = (left + 35) + 'px';

                    dom.addClass(rowMore,'arrow-left');
                    dom.addClass(rowMore,'left');

                }

                let btnRowHtml = rowMore.querySelector('.row-html');
                let btnRowDuplicate = rowMore.querySelector('.row-duplicate');
                if(cell.getAttribute('data-html')) {
                    if(btnRowHtml) btnRowHtml.style.display = 'none';
                    if(btnRowDuplicate) btnRowDuplicate.style.display = 'none';
                } else {
                    if(btnRowHtml) btnRowHtml.style.display = '';
                    if(btnRowDuplicate) btnRowDuplicate.style.display = '';
                }
        
            });

            elm = rowtool.querySelector('.row-remove');
            if(elm) dom.addEventListener(elm, 'click', () => {

                this.grid.removeRow();
                
                util.clearControls();
                
            });

        }
    }
}

export default RowTool;