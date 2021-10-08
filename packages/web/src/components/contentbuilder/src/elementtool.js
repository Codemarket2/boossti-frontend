import { Util, Dom } from './util.js';
import renderQuickAdd from './quickadd.js';
import ElementPanel from './elementpanel.js';

const dom = new Dom();

export class ElementTool{

    constructor(builder) {

        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const elementPanel = new ElementPanel(builder);
        this.elementPanel = elementPanel;

        const builderstuff = util.builderStuff();

        let elementTool = builderstuff.querySelector('.is-element-tool');
        let elementMore;
        if(!elementTool){
            let html = `<div class="is-tool is-element-tool">
                <button type="button" title="${util.out('Add')}" class="elm-add"><svg class="is-icon-flex"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>
                <button type="button" title="${util.out('More')}" class="elm-more"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                <button type="button" title="${util.out('Delete')}" class="elm-remove"><svg class="is-icon-flex" style="margin-left:-1px"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
                <button type="button" title="${util.out('Settings')}" class="elm-settings"><svg class="is-icon-flex"><use xlink:href="#ion-ios-gear"></use></svg></button>
            </div>
            <div class="is-pop elmmore" style="z-index:10002;">
                <div style="display:flex;flex-flow:wrap;">
                    <button type="button" title="${util.out('Move Up')}" class="elm-up"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></span>${util.out('Move Up')}</button>
                    <button type="button" title="${util.out('Move Down')}" class="elm-down"><span><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></span>${util.out('Move Down')}</button>
                    <button type="button" title="${util.out('Duplicate')}" class="elm-duplicate"><span><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></span>${util.out('Duplicate')}</button>
                    ${(this.builder.opts.elementEditor? `
                    <button type="button" title="${util.out('Settings')}" class="elm-settings"><span><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-ios-gear"></use></svg></span>${util.out('Settings')}</button>
                    `:'')} 
                </div>
            </div>
            `;

            dom.appendHtml(builderstuff, html);
            elementTool = builderstuff.querySelector('.is-element-tool');
            elementMore = builderstuff.querySelector('.elmmore');

            // Prepare for tooltip
            let elms = elementTool.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });

        }
        this.elementTool = elementTool;
        this.elementMore = elementMore;

        const quickadd = renderQuickAdd(builder);

        // Add element
        const elmAdd = elementTool.querySelector('.elm-add');
        dom.addEventListener(elmAdd, 'click', () => {

            let tabs = quickadd.querySelector('.is-pop-tabs');
            tabs.style.display = 'none';

            const viewportHeight = window.innerHeight;
            const top = elmAdd.getBoundingClientRect().top;
            const left = elmAdd.getBoundingClientRect().left;
            quickadd.style.display = 'flex';
            const w = quickadd.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = quickadd.offsetHeight;

            if(viewportHeight - top > h) {
                quickadd.style.top = (top + window.pageYOffset) + 27 + 'px';
                quickadd.style.left = (left -  w/2 + 10) + 'px';
                dom.removeClass(quickadd, 'arrow-bottom');
                dom.removeClass(quickadd, 'arrow-right');
                dom.removeClass(quickadd, 'arrow-left');
                dom.removeClass(quickadd, 'center');
                dom.addClass(quickadd, 'arrow-top');
                dom.addClass(quickadd, 'center');
            } else {
                quickadd.style.top = (top + window.pageYOffset - h - 8) + 'px';
                quickadd.style.left = (left -  w/2 + 10) + 'px';
                dom.removeClass(quickadd, 'arrow-top');
                dom.removeClass(quickadd, 'arrow-right');
                dom.removeClass(quickadd, 'arrow-left');
                dom.removeClass(quickadd, 'center');
                dom.addClass(quickadd, 'arrow-bottom');
                dom.addClass(quickadd, 'center');
            }
    
            quickadd.setAttribute('data-mode', 'elm');
            return false;

        });

        const elmRemove = elementTool.querySelector('.elm-remove');
        dom.addEventListener(elmRemove, 'click', () => {

            util.confirm(util.out('Are you sure you want to delete this element?'), (ok) => {

                if(ok) {
                    
                    this.builder.uo.saveForUndo(); 

                    let elm = this.builder.activeElement;

                    if(dom.hasClass(elm.parentNode, 'cell-active') || elm.parentNode.hasAttribute('data-subblock')) {
                        // Level 1
                        elm.parentNode.removeChild(elm);
                    } else {
                        // Deeper
                        if(elm.parentNode.childElementCount > 1) {
                            elm.parentNode.removeChild(elm);
                        } else {
                            let element = elm;
                            if(!dom.parentsHasAttribute(element, 'data-subblock')) {
                                
                                while(!dom.hasClass(element.parentNode, 'cell-active') && elm.parentNode.childElementCount === 1) {
                                    element = element.parentNode;
                                }

                            } else {

                                while(!element.parentNode.hasAttribute('data-subblock') && elm.parentNode.childElementCount === 1) {
                                    element = element.parentNode;
                                }

                            }
                            element.parentNode.removeChild(element);
                        }
                    }

                    this.elementTool.style.display = 'none';

                    let cell = this.builder.activeCol;
                    if(cell){
                        let row = cell.parentNode;

                        if(cell.childElementCount === 0 && row.childElementCount === 3) {

                            row.parentNode.removeChild(row);

                            let columnTool = builderstuff.querySelector('.is-column-tool'); // quick access
                            dom.removeClass(columnTool, 'active');

                            util.checkEmpty();

                        } else if(cell.childElementCount === 0 ) {
                            
                            row.removeChild(cell);
    
                            util.fixLayout(row, builder);

                            let columnTool = builderstuff.querySelector('.is-column-tool'); // // quick access
                            dom.removeClass(columnTool, 'active');

                        }

                    }

                    // Add spacer to empty subblock
                    const subblocks = document.querySelectorAll('.is-subblock');
                    Array.prototype.forEach.call(subblocks, (subblock) => {

                        const rows = dom.elementChildren(subblock);
                        let empty = true;
                        rows.forEach(() => {
                            empty = false;
                        });

                        if(empty) {                            
                            subblock.innerHTML = '<div class="spacer height-40" contentEditable="false"></div>';
                        }
                    });

                    util.clearControls();

                    //Trigger Change event
                    this.builder.opts.onChange();
                    
                } 
    
            });

        });

        const elmMore = elementTool.querySelector('.elm-more');
        dom.addEventListener(elmMore, 'click', () => {
            
            const viewportHeight = window.innerHeight;
            const top = elmMore.getBoundingClientRect().top;
            const left = elmMore.getBoundingClientRect().left;
            elementMore.style.display = 'flex';
            const w = elementMore.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = elementMore.offsetHeight;

            if(viewportHeight - top > h) {
                elementMore.style.top = (top + window.pageYOffset) + 27 + 'px';
                elementMore.style.left = (left -  w/2 + 10) + 'px';
                dom.removeClass(elementMore, 'arrow-bottom');
                dom.removeClass(elementMore, 'arrow-right');
                dom.removeClass(elementMore, 'arrow-left');
                dom.removeClass(elementMore, 'center');
                dom.addClass(elementMore, 'arrow-top');
                dom.addClass(elementMore, 'center');
            } else {
                elementMore.style.top = (top + window.pageYOffset - h - 8) + 'px';
                elementMore.style.left = (left -  w/2 + 10) + 'px';
                dom.removeClass(elementMore, 'arrow-top');
                dom.removeClass(elementMore, 'arrow-right');
                dom.removeClass(elementMore, 'arrow-left');
                dom.removeClass(elementMore, 'center');
                dom.addClass(elementMore, 'arrow-bottom');
                dom.addClass(elementMore, 'center');
            }
            
        });

        const elmUp = elementMore.querySelector('.elm-up');
        dom.addEventListener(elmUp, 'click', () => {


            let elm = this.builder.activeElement;
            if(elm.previousElementSibling) {

                this.builder.uo.saveForUndo(); 

                elm.parentNode.insertBefore(elm, elm.previousElementSibling);

                elm.click();
                this.position(elm);

                //Trigger Change event
                this.builder.opts.onChange();
                
            } else {
                // Try move the parent
                let element = elm;
                while(!dom.hasClass(element.parentNode, 'cell-active') && !element.parentNode.hasAttribute('data-subblock')) {
                    element = element.parentNode;
                }
                if(element.previousElementSibling && element!==elm) {

                    this.builder.uo.saveForUndo(); 

                    element.parentNode.insertBefore(element, element.previousElementSibling);

                    elm.click();
                    this.position(elm);

                    //Trigger Change event
                    this.builder.opts.onChange();
                }
            }
            elm.click();
            elementTool.querySelector('.elm-more').click();

        });

        const elmDown = elementMore.querySelector('.elm-down');
        dom.addEventListener(elmDown, 'click', () => {

            let elm = this.builder.activeElement;
            if(elm.nextElementSibling) {

                this.builder.uo.saveForUndo(); 

                elm.parentNode.insertBefore(elm.nextElementSibling, elm);

                elm.click();
                this.position(elm);

                //Trigger Change event
                this.builder.opts.onChange();
                
            } else {
                // Try move the parent
                let element = elm;
                while(!dom.hasClass(element.parentNode, 'cell-active') && !element.parentNode.hasAttribute('data-subblock')) {
                    element = element.parentNode;
                }
                if(element.nextElementSibling && element!==elm) {

                    this.builder.uo.saveForUndo(); 

                    element.parentNode.insertBefore(element.nextElementSibling, element);

                    elm.click();
                    this.position(elm);

                    //Trigger Change event
                    this.builder.opts.onChange();
                }
            }

        });

        const elmDuplicate = elementMore.querySelector('.elm-duplicate');
        dom.addEventListener(elmDuplicate, 'click', () => {
            
            this.builder.uo.saveForUndo(); 

            let elm = this.builder.activeElement;

            //Clone row & cleanup attached tool & event
            const newelm = elm.cloneNode(true);
            dom.moveAfter(newelm, elm);  

            setTimeout(()=>{
                newelm.click();
                this.position(newelm);
    
                this.builder.applyBehavior();

                //Trigger Change event
                this.builder.opts.onChange();

            }, 100); //Timeout needed by Safari
            
        });

        const elmSettings = elementTool.querySelector('.elm-settings');
        if(elmSettings) dom.addEventListener(elmSettings, 'click', () => {

            elementMore.style.display = '';

            this.elementPanel.showPanel();

        });

        const elmSettings2 = elementMore.querySelector('.elm-settings');
        if(elmSettings2) dom.addEventListener(elmSettings2, 'click', () => {

            elementMore.style.display = '';

            this.elementPanel.showPanel();

        });

        document.addEventListener('mousedown', (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement;  

            if(elementMore.style.display === 'flex') {
                let a = dom.parentsHasClass(target, 'elmmore');
                let b = dom.parentsHasClass(target, 'elm-more');
                if(a||b) {
                    return;
                }
                else {
                    elementMore.style.display = '';
                }
            }
        });

    }

    hide() {

        this.elementTool.style.display = '';
        let elms = document.querySelectorAll('.elm-active');
        Array.prototype.forEach.call(elms, (elm) => {
            dom.removeClass(elm, 'elm-active');
        });

    }

    position() {

        let elementTool = this.elementTool;
        let elementMore = this.elementMore;

        dom.addClass(elementMore, 'transition1');

        let elmMore = elementTool.querySelector('.elm-more');

        const viewportHeight = window.innerHeight;
        const top = elmMore.getBoundingClientRect().top;
        const left = elmMore.getBoundingClientRect().left;
        elementMore.style.display = 'flex';
        const w = elementMore.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        const h = elementMore.offsetHeight;

        if(viewportHeight - top > h) {
            elementMore.style.top = (top + window.pageYOffset) + 27 + 'px';
            elementMore.style.left = (left -  w/2 + 10) + 'px';
            dom.removeClass(elementMore, 'arrow-bottom');
            dom.removeClass(elementMore, 'arrow-right');
            dom.removeClass(elementMore, 'arrow-left');
            dom.removeClass(elementMore, 'center');
            dom.addClass(elementMore, 'arrow-top');
            dom.addClass(elementMore, 'center');
        } else {
            elementMore.style.top = (top + window.pageYOffset - h - 8) + 'px';
            elementMore.style.left = (left -  w/2 + 10) + 'px';
            dom.removeClass(elementMore, 'arrow-top');
            dom.removeClass(elementMore, 'arrow-right');
            dom.removeClass(elementMore, 'arrow-left');
            dom.removeClass(elementMore, 'center');
            dom.addClass(elementMore, 'arrow-bottom');
            dom.addClass(elementMore, 'center');
        }

        setTimeout(()=>{
            dom.removeClass(elementMore, 'transition1');
        }, 300);
    }

    click(col, e) { // old: 12808
        const elm = e.target;
        let elementTool = this.elementTool;

        elementTool.style.display = 'none';
        let elms = document.querySelectorAll('.elm-active');
        Array.prototype.forEach.call(elms, (elm) => {
            dom.removeClass(elm, 'elm-active');
        });

        let activeElement = null;

        let noedit = false;
        if (col.hasAttribute('data-noedit')) { // Column is not (text) editable.
            noedit = true;
        }

        let _protected = false;
        if (col.hasAttribute('data-protected')) { // Column is not (text) editable and also: cannot be deleted, moved or duplicated.
            _protected = true;
        }

        let customcode = false;
        if (col.hasAttribute('data-html')) { // Column contains custom code.
            customcode = true;
        }

        let subblock = false;
        //if(dom.parentsHasAttribute(elm, 'data-subblock')) {
        if(dom.parentsHasClass(elm, 'is-subblock')) {
            subblock = true;
        }
        
        if ((customcode || noedit || _protected) && !subblock) {

            // Do Nothing

        } else {

            const tagName = elm.tagName.toLowerCase();
            // LATER: label, code, figcaption ?
            if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6' || tagName === 'p' || tagName === 'pre' || tagName === 'blockquote' || tagName === 'li' || tagName === 'img' || tagName === 'iframe') {
                                            
                activeElement = elm; //set active element

                if(tagName === 'img') {
                    if(dom.hasClass(elm.parentNode, 'img-circular')) {
                        activeElement = elm.parentNode;
                    }
                }
            } else {
                
                /*
                <div class="cell-active">

                    ..level 0
                    <p>
                        ..level 1
                        <b>..deeper level..</b>
                    </p>

                    <div class="display">
                        ..level 1
                        <h1>..<b>..deeper level..</b>..</h1>
                        <p>..<b>..deeper level..</b>..</p>
                    </div>
                </div>                            
                */
                if (dom.hasClass(elm, 'cell-active') || elm.hasAttribute('data-subblock')) {

                    // Level 0
                    // Do Nothing

                } else if(dom.hasClass(elm, 'cell-active') || elm.parentNode.hasAttribute('data-subblock')){

                    // Level 1
                    activeElement = elm;

                } else {

                    // Deeper level
                    let element = elm;
                    while (element.tagName!=='BODY'  && element.tagName !== 'HTML') {
                        let s = element.tagName.toLowerCase();
                        
                        if (s === 'h1' || s === 'h2' || s === 'h3' || s === 'h4' || s === 'h5' || s === 'h6' || s === 'p' || s === 'pre' || s === 'blockquote' || s === 'li' || s === 'img' || s === 'iframe') {
                           
                            activeElement = element; //set active element
                            break;

                        } else {

                            if(dom.hasClass(element.parentNode, 'cell-active') || element.parentNode.hasAttribute('data-subblock')) {
                                activeElement = element; //set active element
                                break;
                            }

                        }

                        element = element.parentNode;
                    }

                }

            }
            
        }

        if(activeElement) { 
            let elm = activeElement;
            const top = elm.getBoundingClientRect().top + window.pageYOffset;
            const left = elm.getBoundingClientRect().left + window.pageXOffset;
            const w = elm.offsetWidth;
            const h = elm.offsetHeight;
            elementTool.style.display = 'flex';
            elementTool.style.top = (top + h) + 'px';
            elementTool.style.left = (left + w - elementTool.offsetWidth) + 'px';

            const viewportWidth = window.innerWidth;
            if((left + w)>viewportWidth) {
                elementTool.style.left = (viewportWidth - elementTool.offsetWidth) + 'px';
            }

            dom.addClass(elm, 'elm-active');
        }

        this.builder.activeElement = activeElement;

        this.builder.inspectedElement = e.target;
      
        this.elementPanel.click(e);
    }

    refresh() {
        if(this.builder.activeElement) { 

            let elementTool = this.elementTool;
            elementTool.style.display = '';
            setTimeout(()=>{

                let elm = this.builder.activeElement;
                const top = elm.getBoundingClientRect().top + window.pageYOffset;
                const left = elm.getBoundingClientRect().left + window.pageXOffset;
                const w = elm.offsetWidth;
                const h = elm.offsetHeight;
                elementTool.style.display = 'flex';
                elementTool.style.top = (top + h) + 'px';
                elementTool.style.left = (left + w - elementTool.offsetWidth) + 'px';

                const viewportWidth = window.innerWidth;
                if((left + w)>viewportWidth) {
                    elementTool.style.left = (viewportWidth - elementTool.offsetWidth) + 'px';
                }
    
            }, 300);

        }
    }

    repositionElementTool() { // = refresh(), but without delay
        if(this.builder.activeElement) { 
            try{ // use try to prevent unspecified error in IE

                let elementTool = this.elementTool;
    
                let elm = this.builder.activeElement;
                const top = elm.getBoundingClientRect().top + window.pageYOffset;
                const left = elm.getBoundingClientRect().left + window.pageXOffset;
                const w = elm.offsetWidth;
                const h = elm.offsetHeight;
                elementTool.style.display = 'flex';
                elementTool.style.top = (top + h) + 'px';
                elementTool.style.left = (left + w - elementTool.offsetWidth) + 'px';
    
                const viewportWidth = window.innerWidth;
                if((left + w)>viewportWidth) {
                    elementTool.style.left = (viewportWidth - elementTool.offsetWidth) + 'px';
                }

            } catch(e) {
                // Do Nothing
            }

        }
    }

}

export default ElementTool;