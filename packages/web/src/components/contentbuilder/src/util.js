export class Util{

    constructor(builder) {
        this.builder = builder;
    }

    cellSelected() {
        return document.querySelector('.cell-active');
    }

    builderStuff() {
        return document.querySelector('#_cbhtml');
    }

    cellNext(cell) {
        const dom = new Dom();
        let c = cell.nextElementSibling;
        if(c) {
            if(!dom.hasClass(c,'is-row-tool') && !dom.hasClass(c,'is-rowadd-tool')) {
                return c;
            } else {
                return null;
            }
        }
        return null;
    }

    out(s) {
        if(this.builder){
            let val = this.builder.opts.lang[s];
            if(val) return val;
            else {
                if(this.builder.checkLang) console.log(s);
                return s;
            }
        } else {
            return s;
        }
    }

    confirm(message, callback) {

        const dom = new Dom();
        let html = `<div class="is-modal is-confirm">
            <div style="max-width:526px;text-align:center;">
                <p>${message}</p>
                <button title="${this.out('Delete')}" class="input-ok classic">${this.out('Delete')}</button>
            </div>
        </div>`;

        const builderStuff = this.builderStuff();
        let confirmmodal = builderStuff.querySelector('.is-confirm');
        if(!confirmmodal) {
            dom.appendHtml(builderStuff, html);
            confirmmodal = builderStuff.querySelector('.is-confirm');
        }

        this.showModal(confirmmodal, false, () => {

            //this function runs when overlay is clicked. Remove modal.
            confirmmodal.parentNode.removeChild(confirmmodal);

            //do task
            callback(false);

        }, true);

        let buttonok = confirmmodal.querySelector('.is-confirm .input-ok');
        dom.addEventListener(buttonok, 'click', () => {

            this.hideModal(confirmmodal);
            confirmmodal.parentNode.removeChild(confirmmodal); //remove modal

            //do task
            callback(true);
        });
    }

    /*
    Note:
    - if overlayStay = false, cancelCallback will be called if overlay is clicked.
    - hideModal will remove the modal element, so calling show modal multiple times won't attach multiple events (safe).
    */
    showModal(modal, overlayStay, cancelCallback, animated) {
        const dom = new Dom();
        dom.addClass(modal, 'active');

        let animate = false;
        if(this.builder) {
            if(this.builder.opts.animateModal) {
                animate = true;
                if(!animated){ // if not set or false
                    animate=false; // overide   
                } 
            }
        } else {
            if(animated){ // if set true
                animate=true; // overide
            }
        }

        if(animate) {
            if(this.builder){
                const buildercontainers = document.querySelectorAll(this.builder.opts.container);
                Array.prototype.forEach.call(buildercontainers, (buildercontainer) => {
                    buildercontainer.style.transform = 'scale(0.98)';
                    buildercontainer.style.WebkitTransform= 'scale(0.98)';
                    buildercontainer.style.MozTransform= 'scale(0.98)';
                });
            }
        }

        if(!modal.querySelector('.is-modal-overlay')) {

            let html;
            if(overlayStay){
                html = '<div class="is-modal-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.3);z-index:-1;"></div>';
            } else {
                html = '<div class="is-modal-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.000001);z-index:-1;"></div>';
            }

            modal.insertAdjacentHTML('afterbegin', html);

            if(!overlayStay) {
                let overlay = modal.querySelector('.is-modal-overlay');
                dom.addEventListener(overlay, 'click', () => {

                    //cancelCallback
                    if (cancelCallback) cancelCallback();

                    this.hideModal(modal);
                });
            }
        }
    }

    hideModal(modal) {
        if(this.builder){
            const buildercontainers = document.querySelectorAll(this.builder.opts.container);
            Array.prototype.forEach.call(buildercontainers, (buildercontainer) => {
                buildercontainer.style.transform = '';
                buildercontainer.style.WebkitTransform= '';
                buildercontainer.style.MozTransform= '';
            });
        }

        const dom = new Dom();
        dom.removeClass(modal, 'active');
    }

    fixLayout(row) {
        const dom = new Dom();

        const cellCount = row.childElementCount - 2; //minus is-row-tool & is-rowadd-tool
    
        const rowClass = this.builder.opts.row; 
        const colClass = this.builder.opts.cols; 
        const colEqual = this.builder.opts.colequal;
    
        if(colEqual.length>0) {
    
            const cols = dom.elementChildren(row);
            cols.forEach((col) => {
    
                if(dom.hasClass(col,'is-row-tool') || dom.hasClass(col,'is-rowadd-tool')) return;
    
                for(let i=0;i<=colClass.length-1;i++){
                    dom.removeClass(col, colClass[i]);
                }
    
                for(let i=0;i<=colEqual.length-1;i++){
                    if(colEqual[i].length === cellCount){
                        dom.addClass(col, colEqual[i][0]);
                        break;
                    }
                }
    
                if(cellCount === 1){
                    dom.addClass(col, colClass[colClass.length-1]);
                }
    
            });
    
            return;
        }
    
        //others (12 columns grid)
        if(rowClass!=='' && colClass.length>0){
            let n=0;
    
            const cols = dom.elementChildren(row);
            cols.forEach((col) => {
    
                if(dom.hasClass(col,'is-row-tool') || dom.hasClass(col,'is-rowadd-tool')) return;
    
                n++;
                for(var i=0;i<=colClass.length-1;i++){
                    dom.removeClass(col, colClass[i]);
                }
    
                if (cellCount === 1) dom.addClass(col, colClass[11]);
                if (cellCount === 2) dom.addClass(col, colClass[5]);
                if (cellCount === 3) dom.addClass(col, colClass[3]);
                if (cellCount === 4) dom.addClass(col, colClass[2]);
                if (cellCount === 5) { // 2, 2, 2, 2, 4
                    if(n === 5)  dom.addClass(col, colClass[3]);
                    else dom.addClass(col, colClass[1]);
                }
                if (cellCount === 6) dom.addClass(col, colClass[1]); // 2, 2, 2, 2, 2, 2


                if (cellCount === 7) { // 2, 2, 2, 2, 2, 1, 1
                    if(n >= 6)  dom.addClass(col, colClass[0]);
                    else dom.addClass(col, colClass[1]);                    
                }
                if (cellCount === 8) { // 2, 2, 2, 2, 1, 1, 1, 1
                    if(n >= 5)  dom.addClass(col, colClass[0]);
                    else dom.addClass(col, colClass[1]);                    
                }
                if (cellCount === 9) { // 2, 2, 2, 1, 1, 1, 1, 1, 1
                    if(n >= 4)  dom.addClass(col, colClass[0]);
                    else dom.addClass(col, colClass[1]);                    
                }
                if (cellCount === 10) { // 2, 2, 1, 1, 1, 1, 1, 1, 1, 1
                    if(n >= 3)  dom.addClass(col, colClass[0]);
                    else dom.addClass(col, colClass[1]);                    
                }
                if (cellCount === 11) { // 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    if(n >= 2)  dom.addClass(col, colClass[0]);
                    else dom.addClass(col, colClass[1]);                    
                }
                if (cellCount === 12) dom.addClass(col, colClass[0]); // 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

            });
    
        }
    
    }

    addContent(html, mode, attr) {
        const dom = new Dom();
        
        if(this.builder.opts.onAdd){
            html = this.builder.opts.onAdd(html);
        }

        const cell = this.cellSelected();
        let row;
        if(!cell) {
            // If no active cell, check if it is from .row-add-initial (empty info)
            row = document.querySelector('.row-active');
            if(!row) return;
            else {
                // Empty content will always use 'row' mode to insert block.
                mode='row';
            }
        } else {
            row = cell.parentNode;
        }

        if(mode === 'cell' || mode === 'cell-left' || mode === 'cell-right') {

            let maxCols = 4;
            if(this.builder.maxColumns) {
                maxCols = this.builder.maxColumns;
            }
            //Limit up to 4 cells in a row
            if(row.childElementCount>= maxCols + 2){ //+2 => includes is-row-tool & is-rowadd-tool
                alert(this.out('You have reached the maximum number of columns'));
                return false;
            }

            this.builder.uo.saveForUndo();

            let cellElement;

            if(this.builder.opts.row === '') {
                
                // TODO: Test using in old Insite
                let s = this.builder.opts.cellFormat;
                let pos = s.indexOf('</');
                html = s.substring(0, pos) + html + s.substring(pos);

                cellElement = this.createElementFromHTML(html);

            } else {

                cellElement = cell.cloneNode(true);

                // Cleanup from module related clone
                cellElement.removeAttribute('data-noedit');
                cellElement.removeAttribute('data-protected');
                cellElement.removeAttribute('data-module');
                cellElement.removeAttribute('data-module-desc');
                cellElement.removeAttribute('data-dialog-width');                
                cellElement.removeAttribute('data-html');
                cellElement.removeAttribute('data-settings');
                for(let i=1; i<=20; i++) {
                    cellElement.removeAttribute('data-html-' + i);
                }
                cellElement.removeAttribute('data-noedit');

                dom.removeClass(cellElement, 'cell-active');
                cellElement.removeAttribute('data-click');
    
                if(attr) {
                    cellElement.setAttribute(attr,'');
                }

                cellElement.innerHTML = html;

            }

            row.insertBefore(cellElement, cell);
            if(mode==='cell' || mode === 'cell-right'){
                dom.moveAfter(cellElement, cell);
            }

            this.builder.applyBehavior();

            this.fixLayout(row);

            cellElement.click(); //change active block to the newly created

        }

        if(mode === 'row') {

            this.builder.uo.saveForUndo();

            let rowElement, cellElement;

            if(this.builder.opts.row === '') {
                rowElement = this.htmlToElement(this.builder.opts.rowFormat);

                let s = this.builder.opts.cellFormat;
                let pos = s.indexOf('</');
                html = s.substring(0, pos) + html + s.substring(pos);

                // go to last deeper level
                let targetrow = dom.elementChildren(rowElement);
                while( targetrow.length>0 ) {
                    targetrow = targetrow[0];
                    if(dom.elementChildren(targetrow).length>0) {
                        targetrow = dom.elementChildren(targetrow);
                    } else {
                        break;
                    }
                }
                targetrow.innerHTML = html;

                cellElement = targetrow.firstChild;
                if(attr) {
                    cellElement.setAttribute(attr,'');
                }

            } else {

                cellElement = dom.createElement('div');

                dom.addClass(cellElement, this.builder.opts.cols[this.builder.opts.cols.length-1]);
                cellElement.innerHTML = html;
    
                if(attr) {
                    cellElement.setAttribute(attr,'');
                }
                
                rowElement = dom.createElement('div');
                dom.addClass(rowElement, this.builder.opts.row);
                dom.appendChild(rowElement,cellElement);
    
            }

            row.parentNode.insertBefore(rowElement, row);
            dom.moveAfter(rowElement, row);

            this.builder.applyBehavior();

            cellElement.click(); //change active block to the newly created

        }

        if(mode === 'elm') {

            let elm = this.builder.activeElement; // See elementtool.js line 195-196. // document.querySelector('.elm-active');
            if(!elm) return;

            this.builder.uo.saveForUndo();

            let element = elm;
            // while(!dom.hasClass(element.parentNode, 'cell-active')) {
            //     element = element.parentNode;
            // }
            element.insertAdjacentHTML('afterend', html);
    
            this.builder.applyBehavior();

            let newelement = element.nextElementSibling;

            if(newelement.tagName.toLowerCase()==='img') {
                var timeoutId;
                clearTimeout(timeoutId);
                timeoutId = setTimeout( ()=>{
                    if(newelement.complete){
                        newelement.click();
                        //console.log(2);
                    }                    
                }, 200);
            } else {
                newelement.click();
            }


            // LATER: auto scroll

            // LATER: If image, then it needs time to load (resulting incorrect position), so hide element tool. 

        }

        // Call onChange
        this.builder.opts.onChange();
        
    }

    // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    addSnippet(html, bSnippet, noedit) { 

        this.builder.uo.saveForUndo();
        
        const dom = new Dom();
        let rowElement;
        let bAddLast = false;
        let cell;
        let cellElement;
        let columnTool;

        const builderStuff = this.builderStuff();
        let quickadd = builderStuff.querySelector('.quickadd');
        const mode = quickadd.getAttribute('data-mode');
        
        if (bSnippet && (mode === 'cell' || mode === 'cell-left' || mode === 'cell-right')) {
            
            if(noedit) {
                this.addContent(html, mode, 'data-noedit');
            } else {
                this.addContent(html, mode);
            }
            return;

        } else if(bSnippet && mode === 'row') {

            /*
            Buttons, line, social, video, map (Grid layout not included).
            Can be inserted after current row, cell, element, or last row.
            */

            // NEW: See contentbuilder.js line 328
            // OLD: See contentbuilder-jquery.js addSnippet() line 16529
             
            // Just snippet (without row/column grid), ex. buttons, line, social, video, map.
            // Can be inserted after current row, column (cell), element, or last row.

            // html = `<div class="${this.builder.opts.row}"><div class="${this.builder.opts.cols[this.builder.opts.cols.length-1]}"${(noedit? ' data-noedit': '')}>${html}</div></div>`;
            // OR like addContent() in util.js line 245)

            cellElement = document.createElement('div');
            cellElement.className = this.builder.opts.cols[this.builder.opts.cols.length-1];
            cellElement.innerHTML = html;
            if(noedit) {
                cellElement.setAttribute('data-noedit','');
            }
            
            rowElement = document.createElement('div');
            rowElement.className = this.builder.opts.row;
            rowElement.appendChild(cellElement);
            
            // Add after selected row
            cell = this.builder.cellSelected();
            let row;
            if(cell) {
                row = cell.parentNode;
            } else {
                // If no active cell, check if it is from .row-add-initial (empty info)
                row = document.querySelector('.row-active');
                if(!row) {
                    bAddLast = true;
                }
            }
            // Add after last row
            if(bAddLast) {
                const nodes = document.querySelectorAll('.is-builder');
                const last = nodes[nodes.length- 1];
                const rows = dom.elementChildren(last);
                const lastrow = rows[rows.length- 1];
                row = lastrow;
            }

            row.parentNode.insertBefore(rowElement, row);
            dom.moveAfter(rowElement, row);

            this.builder.applyBehavior();

            cellElement.click(); //change active block to the newly created

            // Change to row selection
            rowElement.className = rowElement.className.replace('row-outline', '');
            // columnTool = parent.document.querySelector('.is-column-tool');
            columnTool = document.querySelector('.is-column-tool');
            columnTool.className = columnTool.className.replace('active', '');
            
        } else if(bSnippet) {

            if(noedit) {
                this.addContent(html, mode, 'data-noedit');
            } else {
                this.addContent(html, mode);
            }
            return;

        } else {
            
            /*
            Complete with grid layout. Also may containes custom script(data-html)
            Can be inserted after current row or last row.
            */

            // NEW: See contentbuilder.js line 341 AND contentbuilder-jquery.js (addContentMore) line 11526
            // OLD: See contentbuilder-jquery.js (addContentMore) line 11526

            // Snippet is wrapped in row/colum (may contain custom code or has [data-html] attribute)
            // Can only be inserted after current row or last row (not on column or element).

            var snippet = document.createElement('div');
            snippet.innerHTML = html;
            var blocks = snippet.querySelectorAll('[data-html]');
            Array.prototype.forEach.call(blocks, (block) => {

                // Render custom code block
                html = decodeURIComponent(block.getAttribute('data-html'));
                html = html.replace(/{id}/g, this.makeId());
                for(var i=1;i<=20;i++){
                    html = html.replace('[%HTML'+i+'%]', (block.getAttribute('data-html-'+i) === undefined ? '' : decodeURIComponent(block.getAttribute('data-html-'+i))));//render editable area
                }
                block.innerHTML = html;

            });

            //html = snippet.innerHTML; 
            
            // Add after selected row
            cell = this.builder.activeCol;
            let row;
            if(cell) {
                row = cell.parentNode; // in email mode, cell active is also under row active (incorrect, but cell active is not needed in email mode. So this line works!)
            } else {
                // If no active cell, check if it is from .row-add-initial (empty info)
                row = document.querySelector('.row-active');
                if(!row) {
                    bAddLast = true;
                }
            }
            // Add after last row
            if(bAddLast) {
                const nodes = document.querySelectorAll('.is-builder');
                const last = nodes[nodes.length- 1];
                const rows = dom.elementChildren(last);
                const lastrow = rows[rows.length- 1];
                row = lastrow;
            }

            // Use createContextualFragment() to make embedded script executable
            // https://ghinda.net/article/script-tags/
            var range = document.createRange();
            row.parentNode.insertBefore(range.createContextualFragment(snippet.innerHTML) , row.nextSibling);
            rowElement = snippet.childNodes[0];

            // Auto scroll
            const y = row.getBoundingClientRect().top +  row.offsetHeight + window.pageYOffset - 120;
            window.scroll({
                top: y,
                behavior: 'smooth'
            });
            // window.scrollTo(0, y);

            rowElement = row.nextElementSibling; // a must. Must be before applyBehavior() to prevent element delete during fixLayout

            this.builder.applyBehavior(); // checkEmpty & onRender called here

            cellElement = rowElement.childNodes[0];
            cellElement.click(); //change active block to the newly created

            // Change to row selection
            rowElement.className = rowElement.className.replace('row-outline', '');
            // columnTool = parent.document.querySelector('.is-column-tool');
            columnTool = document.querySelector('.is-column-tool');
            columnTool.className = columnTool.className.replace('active', '');

        }

        // Call onChange
        this.builder.opts.onChange();

    }

    clearActiveCell() {
        
        // this.builder.lastActiveCol = this.cellSelected(); // get active cell before cleared (will be used by snippets dialog)
                
        const builderStuff = this.builderStuff();
        if(!builderStuff) return; // in case the builder is destroyed

        if(builderStuff.getAttribute('preventDevault')) {
            setTimeout(()=>{
                builderStuff.removeAttribute('preventDevault');
            },30);
            return;
        }
        
        const dom = new Dom();
        
        let divs = document.getElementsByClassName('cell-active');
        while (divs.length) divs[0].classList.remove('cell-active');

        divs = document.getElementsByClassName('row-outline');
        while (divs.length) divs[0].classList.remove('row-outline');

        divs = document.getElementsByClassName('row-active');
        while (divs.length) divs[0].classList.remove('row-active');

        divs = document.getElementsByClassName('builder-active');
        while (divs.length) divs[0].classList.remove('builder-active');

        let columnTool = builderStuff.querySelector('.is-column-tool');
        dom.removeClass(columnTool,'active');
        let elmTool = builderStuff.querySelector('.is-element-tool');
        elmTool.style.display = '';

        this.builder.activeCol = null;
    }

    clearAfterUndoRedo() {
        const dom = new Dom();

        const builderStuff = this.builderStuff();
        let tools = builderStuff.querySelectorAll('.is-tool');
        Array.prototype.forEach.call(tools, (tool) => {
            tool.style.display = '';
        });
        this.builder.moveable.updateRect();
        document.querySelector('.moveable-control-box').style.display = 'none';

        this.builder.activeSpacer = null; 
        this.builder.activeCodeBlock = null;
        this.builder.activeLink = null;
        this.builder.activeIframe = null;
        this.builder.activeTd = null;
        this.builder.activeTable = null;
        this.builder.activeModule = null;

        const icons = document.querySelectorAll('.icon-active');
        Array.prototype.forEach.call(icons, (icon) => {
            dom.removeClass(icon, 'icon-active');
        });
        this.builder.activeIcon = null;

        // RTE
        let rteTool = builderStuff.querySelector('.is-rte-tool');
        // rteTool.style.display = 'none';
        let rteButtons = rteTool.querySelectorAll('button');
        Array.prototype.forEach.call(rteButtons, (rteButton) => {
            dom.removeClass(rteButton, 'on');
        });
        
        let elementRteTool = builderStuff.querySelector('.is-elementrte-tool');
        // rteTool.style.display = 'none';
        rteButtons = elementRteTool.querySelectorAll('button');
        Array.prototype.forEach.call(rteButtons, (rteButton) => {
            dom.removeClass(rteButton, 'on');
        });

        let pops = builderStuff.querySelectorAll('.is-pop');
        Array.prototype.forEach.call(pops, (pop) => {
            pop.style.display = '';
        });
    }

    hideControls() {
        
        const builderStuff = this.builderStuff();
        let tools = builderStuff.querySelectorAll('.is-tool');
        Array.prototype.forEach.call(tools, (tool) => {
            tool.style.display = '';
        });
        this.builder.moveable.updateRect();
        document.querySelector('.moveable-control-box').style.display = 'none';

    }

    clearControls() {
        const dom = new Dom();
        
        const builderStuff = this.builderStuff();
        if(!builderStuff) return; // in case the builder is destroyed

        if(builderStuff.getAttribute('preventDevault')) {
            setTimeout(()=>{
                builderStuff.removeAttribute('preventDevault');
            },30);
            return;
        }

        let tools = builderStuff.querySelectorAll('.is-tool');
        Array.prototype.forEach.call(tools, (tool) => {
            tool.style.display = '';
        });
        this.builder.moveable.updateRect();
        document.querySelector('.moveable-control-box').style.display = 'none';
        
        this.builder.activeSpacer = null; 
        this.builder.activeCodeBlock = null;
        this.builder.activeLink = null;
        this.builder.activeIframe = null;
        this.builder.activeTd = null;
        this.builder.activeTable = null;
        this.builder.activeModule = null;
        this.builder.activeImage = null;

        const icons = document.querySelectorAll('.icon-active');
        Array.prototype.forEach.call(icons, (icon) => {
            dom.removeClass(icon, 'icon-active');
        });
        this.builder.activeIcon = null;

        // show iframe overlay to make it clickable
        let ovls = document.querySelectorAll('.ovl');
        Array.prototype.forEach.call(ovls, (ovl) => {
            ovl.style.display = 'block';
        });

        // Element Panel & Snippets sidebar
        var panels = builderStuff.querySelectorAll('.is-side.elementstyles');
        Array.prototype.forEach.call(panels, (panel) => {
            dom.removeClass(panel, 'active');
        });

        // Element Panel things
        let elms = document.querySelectorAll('[data-saveforundo]');
        Array.prototype.forEach.call(elms, (elm) => {
            elm.removeAttribute('data-saveforundo');
        });

        elms = document.querySelectorAll('.elm-inspected');
        Array.prototype.forEach.call(elms, (elm) => {
            dom.removeClass(elm, 'elm-inspected');
        });

        // RTE
        let rtetool = builderStuff.querySelector('.is-rte-tool');
        if(rtetool) rtetool.style.display = 'none';
        let elementRtetool = builderStuff.querySelector('.is-elementrte-tool');
        if(elementRtetool) elementRtetool.style.display = 'none';

        // Element
        elms = document.querySelectorAll('.elm-active');
        Array.prototype.forEach.call(elms, (elm) => {
            dom.removeClass(elm, 'elm-active');
        });

        // let rtepops = builderStuff.querySelectorAll('.is-rte-pop');
        // Array.prototype.forEach.call(rtepops, (rtepop) => {
        //     rtepop.style.display = '';
        //     dom.removeClass(rtepop,'active');
        //     dom.addClass(rtepop, 'deactive');
        // });

        // let pops = builderStuff.querySelectorAll('.is-pop');
        // Array.prototype.forEach.call(pops, (pop) => {
        //     pop.style.display = '';
        // });

    }

    // source: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    makeId() {
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

    // source: http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element 
    saveSelection() {
        if (window.getSelection) {
            let sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                let ranges = [];
                for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                    ranges.push(sel.getRangeAt(i));
                }

                this.builder.selection = ranges;
                
                return ranges;
            }
        } else if (document.selection && document.selection.createRange) {

            this.builder.selection = document.selection.createRange();

            return document.selection.createRange();
        }
        
        this.builder.selection = null;

        return null;
    }

    restoreSelection() {
        let savedSel = this.builder.selection;
        if (savedSel) {
            if (window.getSelection) {
                let sel = window.getSelection();
                // sel.removeAllRanges();
                if (document.body.createTextRange) { // All IE but Edge
                    var range = document.body.createTextRange();
                    range.collapse();
                    range.select();
                } else if (window.getSelection) {
                    if (window.getSelection().empty) {
                        window.getSelection().empty();
                    } else if (window.getSelection().removeAllRanges) {
                        window.getSelection().removeAllRanges();
                    }
                } else if (document.selection) {
                    document.selection.empty();
                }

                for (var i = 0, len = savedSel.length; i < len; ++i) {
                    sel.addRange(savedSel[i]);
                }
            } else if (document.selection && savedSel.select) {
                savedSel.select();
            }
        }
    }
    
    // Clean Word. Source: 
    // http://patisserie.keensoftware.com/en/pages/remove-word-formatting-from-rich-text-editor-with-javascript
    // http://community.sitepoint.com/t/strip-unwanted-formatting-from-pasted-content/16848/3
    // http://www.1stclassmedia.co.uk/developers/clean-ms-word-formatting.php
    cleanHTML(input, cleanstyle) {
        
        let stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
        let output = input.replace(stringStripper, ' ');
        
        let commentSripper = new RegExp('<!--(.*?)-->', 'g');
        output = output.replace(commentSripper, '');

        let tagStripper;
        if(cleanstyle){
            tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
        } else {
            tagStripper = new RegExp('<(/)*(meta|link|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
        }
        output = output.replace(tagStripper, '');

        let badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];

        for (let i = 0; i < badTags.length; i++) {
            tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
            output = output.replace(tagStripper, '');
        }
      
        let badAttributes;
        if(cleanstyle){
            badAttributes = ['style', 'start'];
        } else {
            badAttributes = ['start'];
        }
        for (let i = 0; i < badAttributes.length; i++) {
            let attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
            output = output.replace(attributeStripper, '');
        }
        
        // https://gist.github.com/sbrin/6801034
        //output = output.replace(/<!--[\s\S]+?-->/gi, ''); //done (see above)
        //output = output.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, '');
        output = output.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s/>]))[^>]*>/gi, '');
        output = output.replace(/<(\/?)s>/gi, '<$1strike>');
        output = output.replace(/&nbsp;/gi, ' ');
        //output = output.replace(/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function(str, spaces) {
        //    return (spaces.length > 0) ? spaces.replace(/./, " ").slice(Math.floor(spaces.length/2)).split("").join("\u00a0") : '';
        //});

        //clean copied elm-active background-color (LATER: improve)
        output = output.replace(/background-color: rgba\(200, 200, 201, 0.11\);/gi, '');
        output = output.replace(/background-color: rgba\(200, 200, 201, 0.11\)/gi, '');

        return output;
    }

    checkEmpty() {

        const dom = new Dom();

        // Get all builder areas
        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {

            const rows = dom.elementChildren(builder);
            let empty = true;
            rows.forEach((row) => {

                if(dom.hasClass(row,'row-add-initial')) return;
                if(dom.hasClass(row,'dummy-space')) return;

                empty = false;
            });

            if(empty) {
                let emptyinfo = builder.querySelector('.row-add-initial');
                if(!emptyinfo) {
                    builder.innerHTML = `<button type="button" class="row-add-initial">${this.out('Empty')}<br><span>${this.out('+ Click to add content')}</span></div>`;
                    emptyinfo = builder.querySelector('.row-add-initial');
                }
                emptyinfo.addEventListener('click', ()=>{

                    this.clearActiveCell();

                    dom.addClass(emptyinfo,'row-active'); // Needed for addContent(). Directly apply class in Util is fine.

                    const builderStuff = this.builderStuff();
                    let quickadd = builderStuff.querySelector('.quickadd'); // see quickadd.js. Directly select by class in Util is fine.

                    let tabs = quickadd.querySelector('.is-pop-tabs');
                    tabs.style.display = 'none';
                    
                    const viewportHeight = window.innerHeight;
                    let top = emptyinfo.getBoundingClientRect().top;
                    const left = emptyinfo.getBoundingClientRect().left + emptyinfo.offsetWidth/2 - 11;
                    quickadd.style.display = 'flex';
                    const w = quickadd.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
                    const h = quickadd.offsetHeight;
        
                    if(viewportHeight - top > h) {
                        top = top + emptyinfo.offsetHeight - 19;
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

                });
            } else {
                let emptyinfo = builder.querySelector('.row-add-initial');
                if(emptyinfo) emptyinfo.parentNode.removeChild(emptyinfo);
            }

        });

    }

    clearPreferences() {
        localStorage.removeItem('_buildermode'); //builderMode
        localStorage.removeItem('_editingtoolbar'); //toolbar
        localStorage.removeItem('_editingtoolbardisplay'); //toolbarDisplay
        localStorage.removeItem('_hidecelltool'); //columnTool
        localStorage.removeItem('_rowtool'); //rowTool
        localStorage.removeItem('_hideelementtool'); //elementTool
        localStorage.removeItem('_hidesnippetaddtool'); //snippetAddTool
        localStorage.removeItem('_outlinemode'); //outlineMode
        localStorage.removeItem('_hiderowcoloutline'); //rowcolOutline
        localStorage.removeItem('_outlinestyle'); //outlineStyle
        localStorage.removeItem('_hideelementhighlight'); //elementHighlight
        localStorage.removeItem('_opensnippets'); //snippetOpen
        localStorage.removeItem('_toolstyle'); //toolStyle
        localStorage.removeItem('_snippetssidebardisplay'); //snippetsSidebarDisplay

        localStorage.removeItem('_pasteresult'); //DON'T HAVE PROP

        //NOT USED
        localStorage.removeItem('_scrollableeditor'); 
        localStorage.removeItem('_animatedsorting');
        localStorage.removeItem('_addbuttonplace');
        localStorage.removeItem('_hiderowtool');
        localStorage.removeItem('_dragwithouthandle');
        localStorage.removeItem('_advancedhtmleditor');
        localStorage.removeItem('_hidecolhtmleditor');
        localStorage.removeItem('_hiderowhtmleditor');
    }

    // source: http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div */
    pasteHtmlAtCaret(html, selectPastedContent) {

        this.restoreSelection();

        var sel, range;

        if (window.getSelection) {

            if(!this.builder.activeCol) return;

            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {

                range = sel.getRangeAt(0);
                range.deleteContents();

                var el = document.createElement('div');
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);

                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    } else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    if(!this.builder.isTouchSupport) sel.addRange(range);
                }
            }
        } else if ( (sel = document.selection) && sel.type !== 'Control') {
        
            if(!this.builder.activeCol) return;
            
            var originalRange = sel.createRange();
            originalRange.collapse(true);
            sel.createRange().pasteHTML(html);
            if (selectPastedContent) {
                range = sel.createRange();
                range.setEndPoint('StartToStart', originalRange);
                if(!this.builder.isTouchSupport) range.select();
            }
        }
    }

    refreshModule() {
        let module = this.builder.activeModule;
        if(!module) return;

        let index = 1;
        let subblocks = module.querySelectorAll('[data-subblock]'); 
        Array.prototype.forEach.call(subblocks, (subblock) => {
        
            let builderhtml = subblock.innerHTML;

            module.setAttribute('data-html-' + index, encodeURIComponent(builderhtml));
            index++;
        });
        
        let html = decodeURIComponent(module.getAttribute('data-html')); 
        html = html.replace(/{id}/g, this.makeId());

        module.innerHTML = '';

        var range = document.createRange(); 
        range.setStart(module, 0);
        module.appendChild(
            range.createContextualFragment(html) 
        );

        subblocks = module.querySelectorAll('[data-subblock]'); 
        var i = 1;
        Array.prototype.forEach.call(subblocks, (subblock) => {
            if(module.getAttribute('data-html-'+i)) {
                subblock.innerHTML = decodeURIComponent(module.getAttribute('data-html-'+i));
            }
            i++;
        });

    }

    isTouchSupport() {
        if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            return true;
        }else {
            return false;
        }
    }

    // source: https://stackoverflow.com/questions/4617638/detect-ipad-users-using-jquery
    // isAppleMobile() {
    //     if (navigator && navigator.userAgent && navigator.userAgent !== null) {
    //         var strUserAgent = navigator.userAgent.toLowerCase();
    //         var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
    //         if (arrMatches !== null) return true;
    //     }
    //     return false;
    // }

    // https://stackoverflow.com/questions/31757852/how-can-i-detect-internet-explorer-ie-and-microsoft-edge-using-javascript
    detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
    
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
    
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        
        return false;
    }

    // Source: https://css-tricks.com/snippets/javascript/lighten-darken-color/
    LightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        //return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
        return (usePound ? '#' : '') + String('000000' + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
    }


    getFontFamilyHTML() {
        // let path = this.builder.scriptPath + 'fonts/';
        let path = this.builder.fontAssetPath;
        
        const html = `
        <!DOCTYPE HTML>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Fonts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">  
            <style>
                html, body {height:100%}
                body {overflow:hidden;margin:0;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size:100%; 
                    line-height:1.7;
                }
                #divFontList {margin:0;padding:9px 11px 9px 9px;height:100%;overflow-y:scroll !important;box-sizing:border-box;}
                #divFontList > div {width:100%;cursor:pointer;overflow:hidden;text-align:center;position:relative;}
                #divFontList > div img {margin:7px 5px 0px 5px;max-width: 230px;max-height: 27px;}
                #divFontList > div.on div {
                    background:rgba(0,0,0,0.03);;  
                }
                #divFontList > div div {position:absolute;top:0;left:0;width:100%;height:100%;}
                #divFontList > div:hover div {background:rgba(0,0,0,0.03);}
            </style>
        </head>
        <body>

        <div id="divFontList">
        <div data-provider="" data-font-family="" style="font-size:12px;padding:10px 7px;box-sizing:border-box;"><div></div>None</div>
        <div data-provider="" data-font-family="Arial, sans-serif"><div></div><img src="${path}arial.png"></div>
        <div data-provider="" data-font-family="courier"><div></div><img src="${path}courier.png"></div>
        <div data-provider="" data-font-family="Georgia, serif"><div></div><img src="${path}georgia.png"></div>
        <!--<div data-provider="" data-font-family="Helvetica Neue, Helvetica, Arial, sans-serif"><div></div><img src="${path}helvetica_neue.png"></div>-->
        <div data-provider="" data-font-family="monospace"><div></div><img src="${path}monospace.png"></div>
        <div data-provider="" data-font-family="sans-serif"><div></div><img src="${path}sans_serif.png"></div>
        <div data-provider="" data-font-family="serif"><div></div><img src="${path}serif.png"></div>
        <div data-provider="google" data-font-family="Abel, sans-serif"><div></div><img src="${path}abel.png"></div>
        <div data-provider="google" data-font-family="Abril Fatface"><div></div><img src="${path}abril_fatface.png"></div>
        <div data-provider="google" data-font-family="Advent Pro, sans-serif" data-font-style="300"><div></div><img src="${path}advent_pro.png"></div>
        <div data-provider="google" data-font-family="Aladin, cursive"><div></div><img src="${path}aladin.png"></div>
        <div data-provider="google" data-font-family="Alegreya, serif" data-font-style="400,400i,500,500i,700,700i,800,800i,900,900i"><div></div><img src="${path}alegreya.png"></div>
        <div data-provider="google" data-font-family="Alegreya Sans SC, sans-serif" data-font-style="300,700"><div></div><img src="${path}alegreya_sans_sc.png"></div>
        <div data-provider="google" data-font-family="Alegreya SC, serif" data-font-style="400,400i,500,500i,700,700i,800,800i,900,900i"><div></div><img src="${path}alegreya_sc.png"></div>
        <div data-provider="google" data-font-family="Alice, serif"><div></div><img src="${path}alice.png"></div>
        <div data-provider="google" data-font-family="Allerta Stencil, sans-serif"><div></div><img src="${path}allerta_stencil.png"></div>
        <div data-provider="google" data-font-family="Allura, cursive"><div></div><img src="${path}allura.png"></div>
        <div data-provider="google" data-font-family="Almendra Display, cursive"><div></div><img src="${path}almendra_display.png"></div>
        <div data-provider="google" data-font-family="Amatic SC, cursive" data-font-style="400,700"><div></div><img src="${path}amatic_sc.png"></div>
        <div data-provider="google" data-font-family="Andika, sans-serif"><div></div><img src="${path}andika.png"></div>
        <div data-provider="google" data-font-family="Anonymous Pro, monospace" data-font-style="400,400i,700,700i"><div></div><img src="${path}anonymous_pro.png"></div>
        <div data-provider="google" data-font-family="Architects Daughter, cursive"><div></div><img src="${path}architects_daughter.png"></div>
        <div data-provider="google" data-font-family="Arimo, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}arimo.png"></div>
        <div data-provider="google" data-font-family="Arsenal, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}arsenal.png"></div>
        <div data-provider="google" data-font-family="Assistant" data-font-style="300,700"><div></div><img src="${path}assistant.png"></div>
        <div data-provider="google" data-font-family="Aubrey, cursive"><div></div><img src="${path}aubrey.png"></div>
        <div data-provider="google" data-font-family="Anton, sans-serif"><div></div><img src="${path}anton.png"></div>
        <div data-provider="google" data-font-family="Archivo Narrow, sans-serif"><div></div><img src="${path}archivo_narrow.jpg"></div>
        <div data-provider="google" data-font-family="Bad Script, cursive"><div></div><img src="${path}bad_script.jpg"></div>
        <div data-provider="google" data-font-family="BenchNine, sans-serif"><div></div><img src="${path}benchNine.jpg"></div>
        <div data-provider="google" data-font-family="Bevan, cursive"><div></div><img src="${path}bevan.png"></div>
        <div data-provider="google" data-font-family="Bigelow Rules, cursive"><div></div><img src="${path}bigelow_rules.png"></div>
        <div data-provider="google" data-font-family="Bilbo, cursive"><div></div><img src="${path}bilbo.jpg"></div>
        <div data-provider="google" data-font-family="Bonbon, cursive"><div></div><img src="${path}bonbon.jpg"></div>
        <div data-provider="google" data-font-family="Bowlby One SC, cursive"><div></div><img src="${path}bowlby_one_sc.jpg"></div>
        <div data-provider="google" data-font-family="Cabin Condensed, sans-serif"><div></div><img src="${path}cabin_condensed.jpg"></div>
        <div data-provider="google" data-font-family="Carrois Gothic SC, sans-serif"><div></div><img src="${path}carrois_gothic_sc.jpg"></div>
        <div data-provider="google" data-font-family="Caveat, cursive" data-font-style="400,700"><div></div><img src="${path}caveat.png"></div>
        <div data-provider="google" data-font-family="Chewy, cursive"><div></div><img src="${path}chewy.png"></div>
        <div data-provider="google" data-font-family="Cinzel, serif"><div></div><img src="${path}cinzel.jpg"></div>
        <div data-provider="google" data-font-family="Comfortaa, cursive" data-font-style="300"><div></div><img src="${path}comfortaa.jpg"></div>
        <div data-provider="google" data-font-family="Concert One, cursive"><div></div><img src="${path}concert_one.jpg"></div>
        <div data-provider="google" data-font-family="Cormorant, serif" data-font-style="300,300i,600,600i,700,700i"><div></div><img src="${path}cormorant.png"></div>
        <div data-provider="google" data-font-family="Cormorant Garamond, serif" data-font-style="300,300i,600,600i,700,700i"><div></div><img src="${path}cormorant_garamond.png"></div>
        <div data-provider="google" data-font-family="Cormorant Infant, serif" data-font-style="300,300i,600,600i,700,700i"><div></div><img src="${path}cormorant_infant.png"></div>
        <div data-provider="google" data-font-family="Cormorant SC, serif" data-font-style="300,600,700"><div></div><img src="${path}cormorant_sc.png"></div>
        <div data-provider="google" data-font-family="Cormorant Unicase, serif" data-font-style="300,600,700"><div></div><img src="${path}cormorant_unicase.png"></div>
        <div data-provider="google" data-font-family="Cousine" data-font-style="400,700"><div></div><img src="${path}cousine.png"></div>
        <div data-provider="google" data-font-family="Crafty Girls, cursive"><div></div><img src="${path}crafty_girls.png"></div>
        <div data-provider="google" data-font-family="Cuprum, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}cuprum.png"></div>
        <div data-provider="google" data-font-family="Cutive Mono, monospace"><div></div><img src="${path}cutive_mono.png"></div>
        <div data-provider="google" data-font-family="Devonshire, cursive"><div></div><img src="${path}devonshire.jpg"></div>
        <div data-provider="google" data-font-family="Didact Gothic, sans-serif"><div></div><img src="${path}didact_gothic.jpg"></div>
        <div data-provider="google" data-font-family="Diplomata SC, cursive"><div></div><img src="${path}diplomata_sc.jpg"></div>
        <div data-provider="google" data-font-family="Dosis, sans-serif" data-font-style="200"><div></div><img src="${path}dosis.jpg"></div>
        <div data-provider="google" data-font-family="EB Garamond, serif" data-font-style="400,400i,600,600i,700,700i,800,800i"><div></div><img src="${path}eb_garamond.png"></div>
        <div data-provider="google" data-font-family="El Messiri, sans-serif" data-font-style="400,600,700"><div></div><img src="${path}el_messiri.png"></div>
        <div data-provider="google" data-font-family="Elsie, cursive" data-font-style="400,900"><div></div><img src="${path}elsie.png"></div>
        <div data-provider="google" data-font-family="Encode Sans, sans-serif" data-font-style="300,700"><div></div><img src="${path}encode_sans.png"></div>
        <div data-provider="google" data-font-family="Exo, sans-serif" data-font-style="100"><div></div><img src="${path}exo.jpg"></div>
        <div data-provider="google" data-font-family="'Exo 2', sans-serif" data-font-style="200,200i,600,600i,700,700i,800,800i,900,900i" data-font-display="swap"><div></div><img src="${path}exo_2.png"></div>
        <div data-provider="google" data-font-family="Felipa, cursive"><div></div><img src="${path}felipa.jpg"></div>
        <div data-provider="google" data-font-family="Fira Code, monospace" data-font-style="300,500,600,700"><div></div><img src="${path}fira_code.png"></div>
        <div data-provider="google" data-font-family="Fira Mono, monospace" data-font-style="400,500,700"><div></div><img src="${path}fira_mono.png"></div>
        <div data-provider="google" data-font-family="Fira Sans, sans-serif" data-font-style="200,200i,500,500i,700,700i,800,800i,900,900i"><div></div><img src="${path}fira_sans.png"></div>
        <div data-provider="google" data-font-family="Fira Sans Condensed, sans-serif" data-font-style="200,200i,500,500i,700,700i,800,800i,900,900i"><div></div><img src="${path}fira_sans_condensed.png"></div>
        <div data-provider="google" data-font-family="Fira Sans Extra Condensed, sans-serif" data-font-style="200,200i,500,500i,700,700i,800,800i,900,900i"><div></div><img src="${path}fira_sans_extra_condensed.png"></div>
        <div data-provider="google" data-font-family="Fjalla One, sans-serif"><div></div><img src="${path}fjalla_one.png"></div>
        <div data-provider="google" data-font-family="Forum, cursive"><div></div><img src="${path}forum.png"></div>
        <div data-provider="google" data-font-family="Frank Ruhl Libre" data-font-style="300,700"><div></div><img src="${path}frank_ruhl_libre.png"></div>
        <div data-provider="google" data-font-family="Fredericka the Great, cursive"><div></div><img src="${path}fredericka_the_great.jpg"></div>
        <div data-provider="google" data-font-family="Gabriela, serif"><div></div><img src="${path}gabriela.png"></div>
        <div data-provider="google" data-font-family="Gilda Display, serif"><div></div><img src="${path}gilda_display.jpg"></div>
        <div data-provider="google" data-font-family="Give You Glory, cursive"><div></div><img src="${path}give_you_glory.jpg"></div>
        <div data-provider="google" data-font-family="Gruppo, cursive"><div></div><img src="${path}gruppo.png"></div>
        <div data-provider="google" data-font-family="Handlee, cursive"><div></div><img src="${path}handlee.jpg"></div>
        <div data-provider="google" data-font-family="Happy Monkey, cursive"><div></div><img src="${path}happy_monkey.jpg"></div>
        <div data-provider="google" data-font-family="Hind" data-font-style="300,700"><div></div><img src="${path}hind.png"></div>
        <div data-provider="google" data-font-family="IBM Plex Mono, monospace" data-font-style="300,300i,500,500i,600,600i,700,700i"><div></div><img src="${path}ibm_plex_mono.png"></div>
        <div data-provider="google" data-font-family="IBM Plex Sans, sans-serif" data-font-style="300,300i,500,500i,600,600i,700,700i"><div></div><img src="${path}ibm_plex_sans.png"></div>
        <div data-provider="google" data-font-family="IBM Plex Serif, serif" data-font-style="300,300i,500,500i,600,600i,700,700i"><div></div><img src="${path}ibm_plex_serif.png"></div>
        <div data-provider="google" data-font-family="Iceland, cursive"><div></div><img src="${path}iceland.png"></div>
        <div data-provider="google" data-font-family="Inconsolata, monospace" data-font-style="400,700"><div></div><img src="${path}inconsolata.png"></div>
        <div data-provider="google" data-font-family="Josefin Sans, sans-serif" data-font-style="300,700"><div></div><img src="${path}josefin_sans.jpg"></div>
        <div data-provider="google" data-font-family="Istok Web, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}istok_web.png"></div>
        <div data-provider="google" data-font-family="Julee, cursive"><div></div><img src="${path}julee.png"></div>
        <div data-provider="google" data-font-family="Julius Sans One, sans-serif"><div></div><img src="${path}julius_sans_one.jpg"></div>
        <div data-provider="google" data-font-family="Junge, serif"><div></div><img src="${path}junge.jpg"></div>
        <div data-provider="google" data-font-family="Jura, sans-serif" data-font-style="300,600,700"><div></div><img src="${path}jura.png"></div>
        <div data-provider="google" data-font-family="Just Me Again Down Here, cursive"><div></div><img src="${path}just_me_again_down_here.png"></div>
        <div data-provider="google" data-font-family="Kaushan Script, cursive"><div></div><img src="${path}kaushan_script.png"></div>
        <div data-provider="google" data-font-family="Kelly Slab, cursive"><div></div><img src="${path}kelly_slab.png"></div>
        <div data-provider="google" data-font-family="Kite One, sans-serif"><div></div><img src="${path}kite_one.jpg"></div>
        <div data-provider="google" data-font-family="Kosugi, sans-serif"><div></div><img src="${path}kosugi.png"></div>
        <div data-provider="google" data-font-family="Kosugi Maru, sans-serif"><div></div><img src="${path}kosugi_maru.png"></div>
        <div data-provider="google" data-font-family="Kurale, serif"><div></div><img src="${path}kurale.png"></div>
        <div data-provider="google" data-font-family="Lato, sans-serif" data-font-style="300,700"><div></div><img src="${path}lato.png"></div>
        <div data-provider="google" data-font-family="Ledger, serif" data-font-style="300,700" data-font-display="swap"><div></div><img src="${path}ledger.png"></div>
        <div data-provider="google" data-font-family="Lekton, sans-serif" data-font-style="400,700"><div></div><img src="${path}lekton.png"></div>
        <div data-provider="google" data-font-family="Life Savers, cursive"><div></div><img src="${path}life_savers.jpg"></div>
        <div data-provider="google" data-font-family="Literata, serif" data-font-style="400,400i,600,600i,700,700i"><div></div><img src="${path}literata.png"></div>
        <div data-provider="google" data-font-family="Lobster, cursive"><div></div><img src="${path}lobster.png"></div>
        <div data-provider="google" data-font-family="Lobster Two, cursive"><div></div><img src="${path}lobster_two.jpg"></div>
        <div data-provider="google" data-font-family="Londrina Shadow, cursive"><div></div><img src="${path}londrina_shadow.jpg"></div>
        <div data-provider="google" data-font-family="Lora, serif" data-font-style="400,700"><div></div><img src="${path}lora.png"></div>
        <div data-provider="google" data-font-family="Lovers Quarrel, cursive"><div></div><img src="${path}lovers_quarrel.jpg"></div>
        <div data-provider="google" data-font-family="'M PLUS 1p', sans-serif" data-font-style="300,500,700,800,900" data-font-display="swap"><div></div><img src="${path}m_plus_1p.png"></div>
        <div data-provider="google" data-font-family="'M PLUS Rounded 1c', sans-serif" data-font-style="300,500,700,800,900" data-font-display="swap"><div></div><img src="${path}m_plus_rounded_1c.png"></div>
        <div data-provider="google" data-font-family="Macondo, cursive"><div></div><img src="${path}macondo.png"></div>
        <div data-provider="google" data-font-family="Marcellus SC, serif"><div></div><img src="${path}marcellus_sc.jpg"></div>
        <div data-provider="google" data-font-family="Marck Script, cursive"><div></div><img src="${path}marck_script.png"></div>
        <div data-provider="google" data-font-family="Martel, serif" data-font-style="300,700"><div></div><img src="${path}martel.png"></div>
        <div data-provider="google" data-font-family="Maven Pro, sans-serif"><div></div><img src="${path}maven_pro.png"></div>
        <div data-provider="google" data-font-family="Merriweather, serif" data-font-style="300,700"><div></div><img src="${path}merriweather.png"></div>
        <div data-provider="google" data-font-family="Merriweather Sans" data-font-style="300,700"><div></div><img src="${path}merriweather_sans.png"></div>
        <div data-provider="google" data-font-family="Mogra, cursive"><div></div><img src="${path}mogra.png"></div>
        <div data-provider="google" data-font-family="Monoton, cursive"><div></div><img src="${path}monoton.png"></div>
        <div data-provider="google" data-font-family="Montez, cursive"><div></div><img src="${path}montez.png"></div>
        <div data-provider="google" data-font-family="Montserrat, sans-serif" data-font-style="300,400,700"><div></div><img src="${path}montserrat.png"></div>
        <div data-provider="google" data-font-family="Montserrat Alternates, sans-serif" data-font-style="300,300i,500,500i,700,700i,800,800i,900,900i"><div></div><img src="${path}montserrat_alternates.png"></div>
        <div data-provider="google" data-font-family="Montserrat Subrayada, sans-serif"><div></div><img src="${path}montserrat_subrayada.jpg"></div>
        <div data-provider="google" data-font-family="Muli, sans-serif" data-font-style="300,700"><div></div><img src="${path}muli.png"></div>
        <div data-provider="google" data-font-family="Neucha, cursive"><div></div><img src="${path}neucha.png"></div>
        <div data-provider="google" data-font-family="Neuton, serif" data-font-style="200,700"><div></div><img src="${path}neuton.png"></div>
        <div data-provider="google" data-font-family="Nixie One, cursive"><div></div><img src="${path}nixie_one.png"></div>
        <div data-provider="google" data-font-family="Nothing You Could Do, cursive"><div></div><img src="${path}nothing_you_could_do.jpg"></div>
        <div data-provider="google" data-font-family="Noto Sans, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}noto_sans.png"></div>
        <div data-provider="google" data-font-family="Noto Sans SC, sans-serif" data-font-style="300,500,700,900"><div></div><img src="${path}noto_sans_sc.png"></div>
        <div data-provider="google" data-font-family="Noto Serif, serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}noto_serif.png"></div>
        <div data-provider="google" data-font-family="Noto Serif TC, serif" data-font-style="300,600,700,900"><div></div><img src="${path}noto_serif_tc.png"></div>
        <div data-provider="google" data-font-family="Nunito, sans-serif" data-font-style="200,200i,600,600i,700,700i,800,800i,900,900i"><div></div><img src="${path}nunito.png"></div>
        <div data-provider="google" data-font-family="Old Standard TT, serif" data-font-style="400,400i,700"><div></div><img src="${path}old_standard_tt.png"></div>
        <div data-provider="google" data-font-family="Open Sans, sans-serif" data-font-style="300,400,600,800"><div></div><img src="${path}open_sans.jpg"></div>
        <div data-provider="google" data-font-family="Open Sans Condensed, sans-serif" data-font-style="300,300i,700"><div></div><img src="${path}open_sans_condensed.png"></div>
        <div data-provider="google" data-font-family="Oranienbaum, serif"><div></div><img src="${path}oranienbaum.jpg"></div>
        <div data-provider="google" data-font-family="Oswald, sans-serif" data-font-style="300,400,700"><div></div><img src="${path}oswald.png"></div>
        <div data-provider="google" data-font-family="Oxygen, sans-serif" data-font-style="300,700"><div></div><img src="${path}oxygen.png"></div>
        <div data-provider="google" data-font-family="Pacifico, cursive"><div></div><img src="${path}pacifico.png"></div>
        <div data-provider="google" data-font-family="Pangolin, cursive"><div></div><img src="${path}pangolin.png"></div>
        <div data-provider="google" data-font-family="Passion One, cursive"><div></div><img src="${path}passion_one.jpg"></div>
        <div data-provider="google" data-font-family="Pathway Gothic One, sans-serif"><div></div><img src="${path}pathway_gothic_one.png"></div>
        <div data-provider="google" data-font-family="Pattaya, sans-serif"><div></div><img src="${path}pattaya.png"></div>
        <div data-provider="google" data-font-family="Petit Formal Script, cursive"><div></div><img src="${path}petit_formal_script.png"></div>
        <div data-provider="google" data-font-family="Philosopher, sans-serif"><div></div><img src="${path}philosopher.jpg"></div>
        <div data-provider="google" data-font-family="Play, sans-serif" data-font-style="400,700"><div></div><img src="${path}play.png"></div>
        <div data-provider="google" data-font-family="Playfair Display, serif" data-font-style="400,400i,700,700i,900,900i"><div></div><img src="${path}playfair_display.png"></div>
        <div data-provider="google" data-font-family="Playfair Display SC, serif" data-font-style="400,400i,700,700i,900,900i"><div></div><img src="${path}playfair_display_sc.png"></div>
        <div data-provider="google" data-font-family="Podkova, serif" data-font-style="400,600,700,800"><div></div><img src="${path}podkova.png"></div>
        <div data-provider="google" data-font-family="Poiret One, cursive"><div></div><img src="${path}poiret_one.jpg"></div>
        <div data-provider="google" data-font-family="Pompiere, cursive"><div></div><img src="${path}pompiere.png"></div>
        <div data-provider="google" data-font-family="Poppins, sans-serif" data-font-style="400,600"><div></div><img src="${path}poppins.png"></div>
        <div data-provider="google" data-font-family="Prata, serif"><div></div><img src="${path}prata.png"></div>
        <div data-provider="google" data-font-family="'Press Start 2P', cursive" data-font-display="swap"><div></div><img src="${path}press_start_2p.png"></div>
        <div data-provider="google" data-font-family="Prosto One, cursive"><div></div><img src="${path}prosto_one.png"></div>
        <div data-provider="google" data-font-family="PT Mono, monospace"><div></div><img src="${path}pt_mono.png"></div>
        <div data-provider="google" data-font-family="PT Sans, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}pt_sans.png"></div>
        <div data-provider="google" data-font-family="PT Sans Caption, sans-serif" data-font-style="400,700"><div></div><img src="${path}pt_sans_caption.png"></div>
        <div data-provider="google" data-font-family="PT Sans Narrow, sans-serif" data-font-style="400,700"><div></div><img src="${path}pt_sans_narrow.png"></div>
        <div data-provider="google" data-font-family="PT Serif, serif" data-font-style="400,700"><div></div><img src="${path}pt_serif.png"></div>
        <div data-provider="google" data-font-family="PT Serif Caption, serif" data-font-style="400,700"><div></div><img src="${path}pt_serif_caption.png"></div>
        <div data-provider="google" data-font-family="Quattrocento Sans, sans-serif"><div></div><img src="${path}quattrocento_sans.jpg"></div>
        <div data-provider="google" data-font-family="Quattrocento, serif"><div></div><img src="${path}quattrocento.jpg"></div>
        <div data-provider="google" data-font-family="Quicksand, sans-serif"><div></div><img src="${path}quicksand.jpg"></div>
        <div data-provider="google" data-font-family="Qwigley, cursive"><div></div><img src="${path}qwigley.jpg"></div>
        <div data-provider="google" data-font-family="Raleway, sans-serif" data-font-style="100"><div></div><img src="${path}raleway.png"></div>
        <div data-provider="google" data-font-family="Raleway Dots, sans-serif"><div></div><img src="${path}raleway_dots.png"></div>
        <div data-provider="google" data-font-family="Redressed, cursive"><div></div><img src="${path}redressed.jpg"></div>
        <div data-provider="google" data-font-family="Ribeye Marrow, cursive"><div></div><img src="${path}ribeye_marrow.png"></div>
        <div data-provider="google" data-font-family="Righteous, cursive"><div></div><img src="${path}righteous.png"></div>
        <div data-provider="google" data-font-family="Roboto, sans-serif" data-font-style="300"><div></div><img src="${path}roboto.jpg"></div>
        <div data-provider="google" data-font-family="Roboto Condensed, sans-serif" data-font-style="300,300i,700,700i"><div></div><img src="${path}roboto_condensed.png"></div>
        <div data-provider="google" data-font-family="Roboto Mono, monospace" data-font-style="300,700"><div></div><img src="${path}roboto_mono.png"></div>
        <div data-provider="google" data-font-family="Roboto Slab, serif" data-font-style="200,600,700,800,900"><div></div><img src="${path}roboto_slab.png"></div>
        <div data-provider="google" data-font-family="Rochester, cursive"><div></div><img src="${path}rochester.png"></div>
        <div data-provider="google" data-font-family="Rouge Script, cursive"><div></div><img src="${path}rouge_script.png"></div>
        <div data-provider="google" data-font-family="Rubik, sans-serif" data-font-style="300,300i,500,500i,700,700i,900,900i"><div></div><img src="${path}rubik.png"></div>
        <div data-provider="google" data-font-family="Rubik Mono One, sans-serif"><div></div><img src="${path}rubik_mono_one.png"></div>
        <div data-provider="google" data-font-family="Ruslan Display, cursive"><div></div><img src="${path}ruslan_display.png"></div>
        <div data-provider="google" data-font-family="Russo One, sans-serif"><div></div><img src="${path}russo_one.png"></div>
        <div data-provider="google" data-font-family="Sacramento, cursive"><div></div><img src="${path}sacramento.jpg"></div>
        <div data-provider="google" data-font-family="Sanchez, serif"><div></div><img src="${path}sanchez.jpg"></div>
        <div data-provider="google" data-font-family="Satisfy, cursive"><div></div><img src="${path}satisfy.jpg"></div>
        <div data-provider="google" data-font-family="Sawarabi Gothic, sans-serif"><div></div><img src="${path}sawarabi_gothic.png"></div>
        <div data-provider="google" data-font-family="Scada, sans-serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}scada.png"></div>
        <div data-provider="google" data-font-family="Seaweed Script, cursive"><div></div><img src="${path}seaweed_script.jpg"></div>
        <div data-provider="google" data-font-family="Seymour One, sans-serif"><div></div><img src="${path}seymour_one.jpg"></div>
        <div data-provider="google" data-font-family="Shadows Into Light Two, cursive"><div></div><img src="${path}shadows_into_light_two.jpg"></div>
        <div data-provider="google" data-font-family="Six Caps, sans-serif"><div></div><img src="${path}six_caps.png"></div>
        <div data-provider="google" data-font-family="Snowburst One, cursive"><div></div><img src="${path}snowburst_one.jpg"></div>
        <div data-provider="google" data-font-family="Source Code Pro, monospace" data-font-style="300,700"><div></div><img src="${path}source_code_pro.png"></div>
        <div data-provider="google" data-font-family="Source Sans Pro, sans-serif" data-font-style="200"><div></div><img src="${path}source_sans_pro.jpg"></div>
        <div data-provider="google" data-font-family="Special Elite, cursive"><div></div><img src="${path}special_elite.jpg"></div>
        <div data-provider="google" data-font-family="Spectral, serif" data-font-style="200,200i,600,600i,700,700i,800,800i"><div></div><img src="${path}spectral.png"></div>
        <div data-provider="google" data-font-family="Spectral SC, serif" data-font-style="300,300i,600,600i,700,700i,800,800i"><div></div><img src="${path}spectral_sc.png"></div>
        <div data-provider="google" data-font-family="Squada One, cursive"><div></div><img src="${path}squada_one.jpg"></div>
        <div data-provider="google" data-font-family="Stalinist One, cursive"><div></div><img src="${path}stalinist_one.png"></div>
        <div data-provider="google" data-font-family="Stint Ultra Expanded, cursive"><div></div><img src="${path}stint_ultra_expanded.jpg"></div>
        <div data-provider="google" data-font-family="Syncopate, sans-serif"><div></div><img src="${path}syncopate.png"></div>
        <div data-provider="google" data-font-family="Tangerine, cursive"><div></div><img src="${path}tangerine.png"></div>
        <div data-provider="google" data-font-family="Tenor Sans, sans-serif"><div></div><img src="${path}tenor_sans.png"></div>
        <div data-provider="google" data-font-family="Tinos, serif" data-font-style="400,400i,700,700i"><div></div><img src="${path}tinos.png"></div>
        <div data-provider="google" data-font-family="Ubuntu, sans-serif" data-font-style="300,300i,500,500i,700,700i"><div></div><img src="${path}ubuntu.png"></div>
        <div data-provider="google" data-font-family="Ubuntu Condensed, sans-serif"><div></div><img src="${path}ubuntu_condensed.png"></div>
        <div data-provider="google" data-font-family="Ubuntu Mono, monospace" data-font-style="400,700"><div></div><img src="${path}ubuntu_mono.png"></div>
        <div data-provider="google" data-font-family="Underdog, cursive"><div></div><img src="${path}underdog.png"></div>
        <div data-provider="google" data-font-family="UnifrakturMaguntia, cursive"><div></div><img src="${path}unifrakturmaguntia.png"></div>
        <div data-provider="google" data-font-family="Vast Shadow, cursive"><div></div><img src="${path}vast_shadow.png"></div>
        <div data-provider="google" data-font-family="Viga, sans-serif"><div></div><img src="${path}viga.jpg"></div>
        <div data-provider="google" data-font-family="Vollkorn, serif" data-font-style="400,400i,600,600i,700,700i,900,900i"><div></div><img src="${path}vollkorn.png"></div>
        <div data-provider="google" data-font-family="Vollkorn SC, serif" data-font-style="400,600,700,900"><div></div><img src="${path}vollkorn_sc.png"></div>
        <div data-provider="google" data-font-family="Voltaire, sans-serif"><div></div><img src="${path}voltaire.jpg"></div>
        <div data-provider="google" data-font-family="Wire One, sans-serif"><div></div><img src="${path}wire_one.png"></div>
        <div data-provider="google" data-font-family="Yanone Kaffeesatz, sans-serif" data-font-style="300,700"><div></div><img src="${path}yanone_kaffeesatz.png"></div>
        <div data-provider="google" data-font-family="Yeseva One, cursive"><div></div><img src="${path}yeseva_one.png"></div>
        </div>

        <script type="text/javascript">
            var elms = document.querySelectorAll('#divFontList > div');
            for(var i=0;i<elms.length;i++) {
                elms[i].addEventListener('click', function(e){

                    var elm = e.target.parentNode;
                    var on = false;
                    if(elm.className) {
                        if(elm.className.indexOf('on')!==-1) {
                            on = true;
                        }
                    }
                    if(on) {
                        parent._cb.clearFont();
                    } else {
                        var provider = elm.getAttribute('data-provider');
                        var fontfamily = elm.getAttribute('data-font-family');
                        var fontstyle = elm.getAttribute('data-font-style');
                        var fontdisplay = elm.getAttribute('data-font-display');
                        //parent._cb.applyFont(fontfamily, fontstyle, provider);
                        parent._cb.setFont(fontfamily, fontstyle, fontdisplay, provider);
                    }

                });
            }

        </script>
        
        </body>
        </html>
                
        
        `;
        return html;
    }


    getFontFamilyEmail() {
        // let path = this.builder.scriptPath + 'fonts/';
        let path = this.builder.fontAssetPath;
        
        const html = `
        <!DOCTYPE HTML>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Fonts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">  
            <style>
                html, body {height:100%}
                body {overflow:hidden;margin:0;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size:100%; 
                    line-height:1.7;
                }
                #divFontList {margin:0;padding:9px 11px 9px 9px;height:100%;overflow-y:scroll !important;box-sizing:border-box;}
                #divFontList > div {width:100%;cursor:pointer;overflow:hidden;text-align:center;position:relative;}
                #divFontList > div img {margin:7px 5px 0px 5px;max-width: 230px;max-height: 27px;}
                #divFontList > div.on div {
                    background:rgba(0,0,0,0.03);;  
                }
                #divFontList > div div {position:absolute;top:0;left:0;width:100%;height:100%;}
                #divFontList > div:hover div {background:rgba(0,0,0,0.03);}
            </style>
        </head>
        <body>

        <div id="divFontList">
        <div data-provider="" data-font-family="" style="font-size:12px;padding:10px 7px;box-sizing:border-box;"><div></div>None</div>
        <div data-provider="" data-font-family="Arial, sans-serif"><div></div><img src="${path}arial.png"></div>
        <div data-provider="" data-font-family="courier"><div></div><img src="${path}courier.png"></div>
        <div data-provider="" data-font-family="Georgia, serif"><div></div><img src="${path}georgia.png"></div>
        <!--<div data-provider="" data-font-family="Helvetica Neue, Helvetica, Arial, sans-serif"><div></div><img src="${path}helvetica_neue.png"></div>-->
        <div data-provider="" data-font-family="monospace"><div></div><img src="${path}monospace.png"></div>
        <div data-provider="" data-font-family="sans-serif"><div></div><img src="${path}sans_serif.png"></div>
        <div data-provider="" data-font-family="serif"><div></div><img src="${path}serif.png"></div>
        </div>

        <script type="text/javascript">
            var elms = document.querySelectorAll('#divFontList > div');
            for(var i=0;i<elms.length;i++) {
                elms[i].addEventListener('click', function(e){

                    var elm = e.target.parentNode;
                    var on = false;
                    if(elm.className) {
                        if(elm.className.indexOf('on')!==-1) {
                            on = true;
                        }
                    }
                    if(on) {
                        parent._cb.clearFont();
                    } else {
                        var provider = elm.getAttribute('data-provider');
                        var fontfamily = elm.getAttribute('data-font-family');
                        var fontstyle = elm.getAttribute('data-font-style');
                        var fontdisplay = elm.getAttribute('data-font-display');
                        //parent._cb.applyFont(fontfamily, fontstyle, provider);
                        parent._cb.setFont(fontfamily, fontstyle, fontdisplay, provider);
                    }

                });
            }

        </script>
        
        </body>
        </html>
                
        
        `;
        return html;
    }

}

export class Dom {

    createElement(tag){
        return document.createElement(tag);
    }

    appendChild(parent, child) {
        if(parent) parent.appendChild(child);
    }

    appendHtml(parent, html) {
        if(parent) parent.insertAdjacentHTML('beforeend', html);
    }

    addEventListener(parent, type, listener) {
        if(parent) parent.addEventListener(type, listener);
    }

    addClass(element, classname) {
        if(!element) return;
        if(this.hasClass(element,classname)) return;
        if(element.classList.length===0) element.className = classname;
        else element.className = element.className + ' ' + classname;
        element.className = element.className.replace(/  +/g, ' ');
        //else element.classList.add(classname); //error if there is -
    }

    removeClass(element, classname) {
        if(!element) return;
        if(element.classList.length>0) {
            // element.className = element.className.replace(new RegExp('\\b'+ classname+'\\b', 'g'), '');
            // element.className = element.className.replace(/  +/g, ' ');
            
            let i, j, imax, jmax;
            let classesToDel = classname.split(' ');
            for (i=0, imax=classesToDel.length; i<imax; ++i) {
                if (!classesToDel[i]) continue;
                let classtoDel = classesToDel[i];

                // https://jsperf.com/removeclass-methods 
                let sClassName = ''; 
                let currentClasses = element.className.split(' ');
                for (j=0, jmax=currentClasses.length; j<jmax; ++j) {
                    if (!currentClasses[j]) continue;
                    if (currentClasses[j]!==classtoDel) sClassName += currentClasses[j] + ' ';
                }
                element.className = sClassName.trim();
            }

            if(element.className==='') element.removeAttribute('class');
   
        }
    }

    // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
    // addClass(element, classname) {
    //     console.log(element.classList)
    //     if (element.classList) element.classList.add(classname);
    //     else if (!this.hasClass(element, classname)) element.className += ' ' + classname;
    // }
    // removeClass(element, classname) {
    //     if (element.classList) element.classList.remove(classname);
    //     else element.className = element.className.replace(new RegExp('\\b'+ classname+'\\b', 'g'), '');
    // }
    hasClass(element, classname) {
        if(!element) return false;
        try{
            let s = element.getAttribute('class');
            return new RegExp('\\b'+ classname+'\\b').test(s);
        } catch(e) {
            // Do Nothing
            // console.log(element);
        }
        //return element.classList ? element.classList.contains(classname) : new RegExp('\\b'+ classname+'\\b').test(element.className);
    }

    moveAfter(element, targetElement) {
        targetElement.parentNode.insertBefore(element, targetElement);
        targetElement.parentNode.insertBefore(targetElement, targetElement.previousElementSibling);
    }

    // https://stackoverflow.com/questions/10381296/best-way-to-get-child-nodes
    elementChildren(element) {
        const childNodes = element.childNodes;
        let children = [];
        let i = childNodes.length;
        while (i--) {
            if (childNodes[i].nodeType === 1 /*&& childNodes[i].tagName === 'DIV'*/) {
                children.unshift(childNodes[i]);
            }
        }
        return children;
    }

    parentsHasClass(element, classname) {
        while (element) {
            // if(classname==='is-side') console.log(element.nodeName); // NOTE: click on svg can still returns undefined in IE11
            if(!element.tagName) return false;
            if(element.tagName === 'BODY' || element.tagName === 'HTML') return false;
            // if(!element.classList) {
            //     console.log('no classList');
            //     return false;
            // }
            if(this.hasClass(element, classname)) {
                return true;
            }
            // TODO: if(element.nodeName.toLowerCase() === 'svg') console.log(element);
            element = element.parentNode;
        }
    }

    parentsHasId(element, id) {
        while (element) {
            if(!element.tagName) return false;
            if(element.tagName === 'BODY' || element.tagName === 'HTML') return false;
            if (element.id===id) {
                return true;
            }
            element = element.parentNode;
        }
    }

    parentsHasTag(element, tagname) {
        while (element) {
            if(!element.tagName) return false;
            if(element.tagName === 'BODY' || element.tagName === 'HTML') return false;
            if (element.tagName.toLowerCase()===tagname.toLowerCase()) {
                return true;
            }
            element = element.parentNode;
        }
    }

    parentsHasAttribute(element, attrname) {
        while (element) {
            if(!element.tagName) return false;
            if(element.tagName === 'BODY' || element.tagName === 'HTML') return false;
            try{
                if (element.hasAttribute(attrname)) { // error on svg element
                    return true;
                }
            } catch(e){
                // Do Nothing
                // console.log(element);
                // return false;
            }
            element = element.parentNode;
        }
    }

    parentsHasElement(element, tagname) {
        while (element) {
            if(!element.tagName) return false;
            if(element.tagName === 'BODY' || element.tagName === 'HTML') return false;

            element = element.parentNode;

            if(!element) return false;
            if(!element.tagName) return false;

            if (element.tagName.toLowerCase() === tagname) {
                return true;
            }
        }
    }

    removeClasses(elms, classname) {
        for (let i = 0; i < elms.length; i++) {
            elms[i].classList.remove(classname);
        }
    }

    removeAttributes(elms, attrname) {
        for (let i = 0; i < elms.length; i++) {
            elms[i].removeAttribute(attrname);
        }
    }
    
    removeElements(elms) {
        Array.prototype.forEach.call(elms, (el) => {
            el.parentNode.removeChild(el);
        });
    }

    // source: https://stackoverflow.com/questions/2871081/jquery-setting-cursor-position-in-contenteditable-div
    moveCursorToElement(element){
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.collapse(false);
            range.select();
        }   
    }

    // source: https://stackoverflow.com/questions/6139107/programmatically-select-text-in-a-contenteditable-html-element
    selectElementContents(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // Get selected text
    getSelected() {
        if (window.getSelection) {
            return window.getSelection().toString();
        }
        else if (document.getSelection) {
            return document.getSelection().toString();
        }
        else {
            var selection = document.selection && document.selection.createRange();
            if (selection.text) {
                return selection.text;
            }
            return false;
        }
    }
    
    checkEditable(){
        try{
            var el;
            var curr;
            if (window.getSelection) {
                curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                if(curr.nodeType===3) {  //ini text node
                    el = curr.parentNode;
                } else {
                    el = curr;
                }
            }
            else if (document.selection) {
                curr = document.selection.createRange();
                el = document.selection.createRange().parentElement();
            }
            if(this.parentsHasAttribute(el, 'contenteditable')) return true;
            else return false;
        } catch(e){
            return false;
        }
    }

    textSelection() {
        try {
            var elm;
            var curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
            //console.log(curr.nodeType)
            if (curr.nodeType === 3) {  // text node
                elm = curr.parentNode;
                if(this.parentsHasClass(elm, 'is-builder')) {
                    return elm;
                }
                else {
                    return false;  
                } 
            } else {
                elm = curr;
                var nodeName = elm.nodeName.toLowerCase();
                if(nodeName === 'i' && elm.innerHTML === '') { //icon
                    if(this.parentsHasClass(elm, 'is-builder')) {
                        return elm;
                    }
                }
                
                // Check if a block (because when placing cursor using arrow keys on empty block, nodeType=1 not 3)
                if(nodeName === 'p' || nodeName === 'h1' || nodeName === 'h2'
                || nodeName === 'h3' || nodeName === 'h4' || nodeName === 'h5'
                || nodeName === 'h6' || nodeName === 'li' || nodeName === 'pre'
                || nodeName === 'blockquote') {
                    return elm;
                }
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    getStyle(element, property) {
        return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
    }

    /** added by Jack */
    doFunction(elm, fn, incChilds) {
        fn(elm);
        if(incChilds) {
            let elmns = Array.prototype.slice.call(elm.getElementsByTagName('*'));
            for(var i=0; i<elmns.length; i++) {
                fn(elmns[i]);
            }    
        }
    }
    // ---

}

