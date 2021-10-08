import { Util, Dom } from './util.js';
import renderQuickAdd from './quickadd.js';
import Grid from './grid.js';
import HtmlUtil from './html.js';
import Draggable from './draggable.js';

const dom = new Dom();

const renderGridEditor = (builder) => {

    const util = new Util(builder);
    const grid = new Grid(builder);
    const htmlutil = new HtmlUtil(builder);

    let rowhtmlbutton = '';
    if(builder.opts.rowHtmlEditor) rowhtmlbutton = `<button title="${util.out('HTML')}" class="row-html">
            <svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-right"></use></svg>
        </button>`;

    let colhtmlbutton = '';
    if(builder.opts.columnHtmlEditor) colhtmlbutton = `<button title="${util.out('HTML')}" class="cell-html">
            <svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-right"></use></svg>
        </button>`;
        
    const html = `<div class="is-modal grideditor" style="z-index:10002;">
        <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:1.5;height:20px;border:none;">
            <div class="is-modal-close" style="z-index:1;width:20px;height:20px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:20px;font-size:10px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>
        </div>
        <div style="padding:30px 0 5px 18px;font-size:10px;color:#333;text-transform:uppercase;letter-spacing:1px;">${util.out('Row')}</div>
        <div style="display:flex;flex-flow:wrap;">
            <button title="${util.out('Add')}" class="row-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:19px;height:19px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>
            <button title="${util.out('Duplicate')}" class="row-duplicate" style="display: block;"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>
            <button title="${util.out('Move Up')}" class="row-up" style="display: block;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>
            <button title="${util.out('Move Down')}" class="row-down" style="display: block;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>
            ${rowhtmlbutton}
            <button title="${util.out('Delete')}" class="row-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
        </div>
        <div style="padding:8px 0 5px 18px;font-size:11px;color:#333;text-transform:uppercase;letter-spacing:1px;">${util.out('Column')}</div>
        <div style="display:flex;flex-flow:wrap;">
            <button title="${util.out('Add')}" class="cell-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:19px;height:19px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>
            <button title="${util.out('Duplicate')}" class="cell-duplicate"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>
            <button title="${util.out('Move Up')}" class="cell-up"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>
            <button title="${util.out('Move Down')}" class="cell-down"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>
            <button title="${util.out('Move Left')}" class="cell-prev"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-left"></use></svg></button>
            <button title="${util.out('Move Right')}" class="cell-next"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-right"></use></svg></button>
            <button title="${util.out('Increase')}" class="cell-increase"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#icon-increase"></use></svg></button>
            <button title="${util.out('Decrease')}" class="cell-decrease"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#icon-decrease"></use></svg></button>
            ${colhtmlbutton}
            <button title="${util.out('Delete')}" class="cell-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
            <div class="is-separator">
                <button title="${util.out('Outline')}" class="grid-outline"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-ios-grid-view-outline"></use></svg></button>
                <!--<button title="${util.out('Element Tool')}" class="cell-elmtool"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:12px;height:12px;"><use xlink:href="#ion-ios-gear"></use></svg></button>-->
            </div>
        </div>
    </div>`;

    //LATER:
    //<button title="${util.out('Element Tool')}" class="cell-elmtool"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:12px;height:12px;"><use xlink:href="#ion-ios-gear"></use></svg></button>

    const builderstuff = util.builderStuff();
    dom.appendHtml(builderstuff, html);

    new Draggable({selector: '.is-draggable'});

    const grideditor = document.querySelector('.grideditor');

    document.addEventListener('click', (e) => {
        e = e || window.event;
        var target = e.target || e.srcElement;  
            
        if(dom.hasClass(grideditor, 'active')) {
            let a = dom.parentsHasClass(target, 'is-builder');
            let b = dom.parentsHasClass(target, 'grideditor');
            let c = dom.parentsHasClass(target, 'is-modal');
            let d = dom.parentsHasClass(target, 'is-pop');
            let f = dom.parentsHasClass(target, 'rte-grideditor') || dom.hasClass(target, 'rte-grideditor');
            if(a||b||c||d||f) {
                grideditor.style.display = '';
                return;
            }
            else {
                grideditor.style.display = 'none';
            }

        }
    }, false);


    let elm = grideditor.querySelector('.is-modal-close');
    dom.addEventListener(elm, 'click', () => {
        dom.removeClass(grideditor, 'active');

        const builders = document.querySelectorAll(builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            builder.removeAttribute('grideditor');
        });
    });

    elm = grideditor.querySelector('.grid-outline');
    dom.addEventListener(elm, 'click', () => {
        const builders = document.querySelectorAll(builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(builder.hasAttribute('gridoutline')) {
                builder.removeAttribute('gridoutline');
            } else {
                builder.setAttribute('gridoutline','');
            }
        });
    });

    const quickadd = renderQuickAdd(builder);

    // CELL
    elm = grideditor.querySelector('.cell-add');
    dom.addEventListener(elm, 'click', () => {

        let tabs = quickadd.querySelector('.is-pop-tabs');
        tabs.style.display = 'flex';

        const elm = grideditor.querySelector('.cell-add');
        const top = elm.getBoundingClientRect().top + window.pageYOffset;
        const left = elm.getBoundingClientRect().left + window.pageXOffset;
        quickadd.style.display = 'flex';
        const w = quickadd.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        //const h = quickadd.offsetHeight;
        quickadd.style.top = (top) + 'px';
        quickadd.style.left = (left - w - 8) + 'px';

        dom.removeClass(quickadd,'arrow-bottom');
        dom.removeClass(quickadd,'arrow-left');
        dom.removeClass(quickadd,'arrow-top');
        dom.removeClass(quickadd,'center');
        dom.removeClass(quickadd,'left');
        dom.addClass(quickadd,'arrow-right');
        dom.addClass(quickadd,'right');

        let val = quickadd.querySelector('.active').getAttribute('data-value');
        if(val==='left') {
            quickadd.setAttribute('data-mode', 'cell-left');
        } else {
            quickadd.setAttribute('data-mode', 'cell-right');
        }
    });

    elm = grideditor.querySelector('.cell-prev');
    dom.addEventListener(elm, 'click', () => {

        grid.moveColumnPrevious();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-next');
    dom.addEventListener(elm, 'click', () => {

        grid.moveColumnNext();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-increase');
    dom.addEventListener(elm, 'click', () => {

        grid.increaseColumn();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-decrease');
    dom.addEventListener(elm, 'click', () => {

        grid.decreaseColumn();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-up');
    dom.addEventListener(elm, 'click', () => {

        grid.moveColumnUp();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-down');
    dom.addEventListener(elm, 'click', () => {

        grid.moveColumnDown();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-duplicate');
    dom.addEventListener(elm, 'click', () => {

        grid.duplicateColumn();
        
        util.clearControls();
        
    });

    elm = grideditor.querySelector('.cell-remove');
    dom.addEventListener(elm, 'click', () => {

        grid.removeColumn();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.cell-html');
    if(elm) dom.addEventListener(elm, 'click', () => {
        const cell = util.cellSelected();
        if(!cell) return;
        
        htmlutil.view('cell');
    });

    // ROW

    elm = grideditor.querySelector('.row-add');
    dom.addEventListener(elm, 'click', () => {

        let tabs = quickadd.querySelector('.is-pop-tabs');
        tabs.style.display = 'none';

        const elm = grideditor.querySelector('.row-add');
        const top = elm.getBoundingClientRect().top + window.pageYOffset;
        const left = elm.getBoundingClientRect().left + window.pageXOffset;
        quickadd.style.display = 'flex';
        const w = quickadd.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        //const h = quickadd.offsetHeight;
        quickadd.style.top = (top) + 'px';
        quickadd.style.left = (left - w - 8) + 'px';

        dom.removeClass(quickadd,'arrow-bottom');
        dom.removeClass(quickadd,'arrow-left');
        dom.removeClass(quickadd,'arrow-top');
        dom.removeClass(quickadd,'center');
        dom.removeClass(quickadd,'left');
        dom.addClass(quickadd,'arrow-right');
        dom.addClass(quickadd,'right');

        quickadd.setAttribute('data-mode', 'row');
    });


    elm = grideditor.querySelector('.row-up');
    dom.addEventListener(elm, 'click', () => {

        grid.moveRowUp();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.row-down');
    dom.addEventListener(elm, 'click', () => {

        grid.moveRowDown();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.row-duplicate');
    dom.addEventListener(elm, 'click', () => {

        grid.duplicateRow();
        
        util.clearControls();

    });

    elm = grideditor.querySelector('.row-remove');
    dom.addEventListener(elm, 'click', () => {

        grid.removeRow();
        
        util.clearControls();
        
    });

    elm = grideditor.querySelector('.row-html');
    if(elm) dom.addEventListener(elm, 'click', () => {
        const cell = util.cellSelected();
        if(!cell) return;
        
        htmlutil.view('row');
    });

};

export default renderGridEditor;