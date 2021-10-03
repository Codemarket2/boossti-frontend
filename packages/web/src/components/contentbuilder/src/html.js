import { Util, Dom } from './util.js';

const dom = new Dom();
let hash = {};

export class HtmlUtil {

    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);

        const builderstuff = util.builderStuff();
        let viewhtml = builderstuff.querySelector('.viewhtml');
        if(!viewhtml) {
            /*
            Note:
            - viewhtml => non syntax-highlighted. Click enlarge will open viewhtmllarger (syntax-highlighted). No enlarge toggle.
            - viewhtmlformatted => syntax-highlighted. Click enlarge, just make it full-screen.

            - viewhtmlnormal => for general purposes (can be used outside). Syntax-highlighted. Click enlarge, just make it full-screen.
            */
            const html = `<div class="is-modal viewhtml">
                <div style="width:80%;max-width:1200px;height:80%;padding:0;box-sizing:border-box;position:relative;">
                    <textarea class="tabSupport" style="width:100%;height:100%;border:none;border-bottom:60px solid transparent;margin:0;box-sizing:border-box;"></textarea>
                    <button title="${util.out('Enlarge')}" class="input-html-larger" style="width:35px;height:35px;position:absolute;right:20px;top:0;background:#fff;"><svg class="is-icon-flex" style="width:19px;height:19px;fill:rgb(170, 170, 170);"><use xlink:href="#ion-arrow-expand"></use></svg></button>
                    <div class="is-modal-footer" style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div>
            
            <div class="is-modal viewhtmlformatted">
                <div style="width:80%;max-width:1200px;height:80%;padding:0;box-sizing:border-box;position:relative;overflow:hidden;">
                    <iframe id="ifrHtmlFormatted" style="width:100%;height:100%;border:none;margin:0;box-sizing:border-box;" src="about:blank"></iframe>
                    <textarea style="position:absolute;display:none;"></textarea>
                    <button title=" out('Enlarge') + '" class="input-html-larger" style="width:35px;height:35px;position:absolute;right:20px;top:0;background:#fff;"><svg class="is-icon-flex" style="width:19px;height:19px;fill:rgb(170, 170, 170);"><use xlink:href="#ion-arrow-expand"></use></svg></button>
                    <div class="is-modal-footer" style="display:none">
                        <button class="input-cancel classic-secondary">Cancel</button>
                        <button class="input-ok classic-primary">Ok</button>
                    </div>
                </div>
            </div>

            <div class="is-modal viewhtmllarger" style="align-items:flex-end;z-index:10005;">
                <div style="width:100%;height:100%;border:none;padding:0;">
                    <iframe id="ifrHtml" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>
                </div>
            </div>

            <div class="is-modal viewhtmlnormal"">
                <div style="width:80%;max-width:1200px;height:80%;padding:0;box-sizing:border-box;position:relative;overflow:hidden;">
                    <button title="${util.out('Enlarge')}" class="input-html-larger" style="width:35px;height:35px;position:absolute;right:20px;top:0;background:#fff;"><svg class="is-icon-flex" style="width:19px;height:19px;fill:rgb(170, 170, 170);"><use xlink:href="#ion-arrow-expand"></use></svg></button>
                    <iframe id="ifrHtml" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>
                </div>
            </div>
            
            `;

            dom.appendHtml(builderstuff, html);
            viewhtml = builderstuff.querySelector('.viewhtml');
            let viewhtmlformatted = builderstuff.querySelector('.viewhtmlformatted');
            let viewhtmlnormal = builderstuff.querySelector('.viewhtmlnormal');

            let elm = viewhtml.querySelector('.input-html-larger');
            dom.addEventListener(elm, 'click', () => {

                let textarea = viewhtml.querySelector('textarea');
                // Used  by html dialog (syntaxhighlighting)
                // let elms = document.querySelectorAll('[data-source-active]');
                // Array.prototype.forEach.call(elms, (elm) => {
                //     elm.removeAttribute('data-source-active');
                //     elm.removeAttribute('data-source-ok');
                //     elm.removeAttribute('data-source-cancel');
                // });
                textarea.setAttribute('data-source-active','1');
                textarea.setAttribute('data-source-ok','.viewhtml .input-ok');
                textarea.setAttribute('data-source-cancel','.viewhtml .input-cancel');

                this.viewHtmlLarger();

            });

            elm = viewhtmlformatted.querySelector('.input-html-larger');
            dom.addEventListener(elm, 'click', () => {

                if(dom.hasClass(viewhtmlformatted, 'is-modal-full')) {
                    dom.removeClass(viewhtmlformatted, 'is-modal-full');
                } else {
                    dom.addClass(viewhtmlformatted, 'is-modal-full');
                }

            });

            elm = viewhtmlnormal.querySelector('.input-html-larger');
            dom.addEventListener(elm, 'click', () => {
                
                if(dom.hasClass(viewhtmlnormal, 'is-modal-full')) {
                    dom.removeClass(viewhtmlnormal, 'is-modal-full');
                } else {
                    dom.addClass(viewhtmlnormal, 'is-modal-full');
                }

            });
            
        }

    }

    viewHtmlNormal() {

        const util = new Util(this.builder);

        const builderstuff = util.builderStuff();
        const viewhtmlnormal = builderstuff.querySelector('.viewhtmlnormal');

        let iframe = viewhtmlnormal.querySelector('iframe');
        iframe.outerHTML = '<iframe id="ifrHtml" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>'; //clear
        var doc = viewhtmlnormal.querySelector('iframe').contentWindow.document;
        doc.open();
        doc.write(this.getIframeHtml()); // use the same html as viewhtmllarger
        doc.close();

        util.showModal(viewhtmlnormal, true, null, false);

    }

    viewHtmlLarger() {

        const util = new Util(this.builder);

        const builderstuff = util.builderStuff();
        const viewhtmllarger = builderstuff.querySelector('.viewhtmllarger');

        let iframe = viewhtmllarger.querySelector('iframe');
        iframe.outerHTML = '<iframe id="ifrHtml" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>'; //clear
        var doc = viewhtmllarger.querySelector('iframe').contentWindow.document;
        doc.open();
        doc.write(this.getIframeHtml());
        doc.close();

        util.showModal(viewhtmllarger, true, null, false);
    }

    view(mode, area) {

        const util = new Util(this.builder);

        const builderstuff = util.builderStuff();

        let viewhtml;

        if(this.builder.opts.htmlSyntaxHighlighting) {
            viewhtml = builderstuff.querySelector('.viewhtmlformatted');
        } else {
            viewhtml = builderstuff.querySelector('.viewhtml');
        }

        viewhtml.querySelector('.is-modal-footer').innerHTML = `<button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
            <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>`;
        
        util.showModal(viewhtml, true);

        if(mode==='cell') { // old: 3550

            const cell = util.cellSelected();
            if(!cell) return;

            let textarea = viewhtml.querySelector('textarea');
            textarea.value = this.readHtml(cell, true); // for view=true

        }

        if(mode==='row') { // old: 15534

            const cell = util.cellSelected();
            if(!cell) return;
            const row = cell.parentNode;

            let textarea = viewhtml.querySelector('textarea');
            textarea.value = this.readHtml(row, true); // for view=true

            //Change to row selection
            dom.removeClass(row, 'row-outline'); 

            //Hide Column tool
            let columnTool = builderstuff.querySelector('.is-column-tool');
            dom.removeClass(columnTool, 'active');
        }

        if(mode==='full') { // 

            if(area){
                //return area
            } else {
    
                const builders = document.querySelectorAll(this.builder.opts.container);
                if(builders.length > 1) {
                    const cell = util.cellSelected();
                    if(!cell) {
                        // Return first instance
                        area = builders[0];
                    } else {
                        // Return active instance
                        area = cell.parentNode.parentNode;
                    }
                } else {
                    // Single instance
                    area = builders[0];
                }

                if(this.builder.opts.page!=='') {
                    const wrapper = document.querySelector(this.builder.opts.page);
                    if(wrapper) {
                        //return wrapper
                        area = wrapper;
                    } 
                }

            }

            let textarea = viewhtml.querySelector('textarea');
            textarea.value = this.readHtml(area, true); // for view=true

        }

        let elm = viewhtml.querySelector('.input-ok');
        dom.addEventListener(elm, 'click', () => {
            
            this.builder.uo.saveForUndo();

            let textarea = viewhtml.querySelector('textarea');
            var html = textarea.value;

            html = this.fromViewToActual(html); 

            if(mode==='cell') {

                const cell = util.cellSelected();
                cell.innerHTML = html;
                    
                this.builder.applyBehavior();
                    
                //Trigger Change event
                this.builder.opts.onChange();
                        
                //Trigger Render event
                this.builder.opts.onRender();

            }

            if(mode==='row') { 

                const cell = util.cellSelected();
                const row = cell.parentNode;
                row.innerHTML = html;

                this.builder.applyBehavior();
                    
                //Trigger Change event
                this.builder.opts.onChange();
                        
                //Trigger Render event
                this.builder.opts.onRender();
                        
            }

            if(mode==='full') { 

                // area.innerHTML = html;
                area.innerHTML = '';
                // Use createContextualFragment() to make embedded script executable
                // https://ghinda.net/article/script-tags/
                var range = document.createRange();
                range.setStart(area, 0);
                area.appendChild(
                    range.createContextualFragment(html) 
                );

                this.builder.applyBehavior();
                    
                //Trigger Change event
                this.builder.opts.onChange();
                        
                //Trigger Render event
                this.builder.opts.onRender();

                util.clearActiveCell();

            }
            
            util.clearControls(); // NEW

            util.hideModal(viewhtml);
        });

        elm = viewhtml.querySelector('.input-cancel');
        dom.addEventListener(elm, 'click', () => {

            util.hideModal(viewhtml);

        });

        if(this.builder.opts.htmlSyntaxHighlighting) {
            let textarea = viewhtml.querySelector('textarea');
            // Used  by html dialog (syntaxhighlighting)
            // let elms = document.querySelectorAll('[data-source-active]');
            // Array.prototype.forEach.call(elms, (elm) => {
            //     elm.removeAttribute('data-source-active');
            //     elm.removeAttribute('data-source-ok');
            //     elm.removeAttribute('data-source-cancel');
            // });
            textarea.setAttribute('data-source-active','1');
            textarea.setAttribute('data-source-ok','.viewhtmlformatted .input-ok');
            textarea.setAttribute('data-source-cancel','.viewhtmlformatted .input-cancel');
    
            let iframe = viewhtml.querySelector('iframe');
            iframe.outerHTML = '<iframe id="ifrHtmlFormatted" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>'; //clear
            var doc = viewhtml.querySelector('iframe').contentWindow.document;
            doc.open();
            doc.write(this.getIframeHtml());
            doc.close();
        } 

        //Hide popup
        let columnMore = builderstuff.querySelector('.is-pop.columnmore');
        columnMore.style.display = '';
        let rowMore = builderstuff.querySelector('.is-pop.rowmore');
        rowMore.style.display = '';
        
    }

    fromViewToActual(html) {
        for (var key in hash) {
            html = html.replace(key, hash[key]);
        }
        return html;
    }

    readHtml(content, view, multiple) { //view = true (hide internal attributes). view = false (actual html)

        //Make absolute
        if(this.builder.opts.absolutePath) {
            let links = content.querySelectorAll('a');
            Array.prototype.forEach.call(links, (link) => {
                let href = link.href;
                link.setAttribute('href', href);
            });
            let imgs = content.querySelectorAll('img');
            Array.prototype.forEach.call(imgs, (img) => {
                let src = img.src;
                img.setAttribute('src', src);
            });
        }
        
        const util = new Util(this.builder);
    
        //Prepare temporary helpers: #tmp_content & #tmp_buildercontent
        const builderstuff = util.builderStuff();
        let elm = builderstuff.querySelector('#tmp_content');
        if(elm) builderstuff.removeChild(elm);
        elm = builderstuff.querySelector('#tmp_buildercontent');
        if(elm) builderstuff.removeChild(elm);
        let html = `<div id="tmp_content" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>
            <div id="tmp_buildercontent" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>`;
        dom.appendHtml(builderstuff, html);

        let tmp = builderstuff.querySelector('#tmp_content');
        tmp.innerHTML = content.innerHTML;

        //Find subblocks (previously is-builder) in custom code blocks and save them to data-html-1, data-html-2, and so on.
        let blocks = tmp.querySelectorAll('[data-html]');
        Array.prototype.forEach.call(blocks, (block) => {

            // NEW
            let index = 1; 
            let subblocks = block.querySelectorAll('[data-subblock]'); 
            Array.prototype.forEach.call(subblocks, (subblock) => {

                let html = subblock.innerHTML;
            
                block.setAttribute('data-html-' + index, encodeURIComponent(html));
        
                index++;
            });

            /* OLD
            let index = 1;
            //let _builders = block.querySelectorAll('.is-builder');
            Array.prototype.forEach.call(_builders, (_builder) => {
                // let builderhtml = _builder.innerHTML;

                //if(dom.parentsHasClass(_builder, 'slick-cloned')) return; // direct LATER

                //Cleaning
                _builder.style.transform = '';
                _builder.style.WebkitTransform= '';
                _builder.style.MozTransform= '';
                _builder.removeAttribute('data-sort');
                dom.removeClass(_builder, 'builder-active');

                _builder.removeAttribute('hidesnippetaddtool');
                _builder.removeAttribute('gray');
                _builder.removeAttribute('rowoutline');
                _builder.removeAttribute('grayoutline');
                _builder.removeAttribute('hideoutline');
                _builder.removeAttribute('leftrowtool');
                _builder.removeAttribute('minimal');
                _builder.removeAttribute('clean');
                _builder.removeAttribute('grideditor');
                _builder.removeAttribute('gridoutline');

                _builder.removeAttribute('gridoutline'); // old
                _builder.removeAttribute('draggridoutline'); // old
                _builder.removeAttribute('between-blocks-left'); // old
                _builder.removeAttribute('between-blocks-center'); // old  
                _builder.removeAttribute('hideelementhighlight'); 

                let builderhtml = _builder.innerHTML;
                let tmpbuilder = builderstuff.querySelector('#tmp_buildercontent');
                tmpbuilder.innerHTML = builderhtml;

                let elms = tmp.querySelectorAll('.sortable-chosen');
                dom.removeClasses(elms, 'sortable-chosen');
                elms = tmp.querySelectorAll('.sortable-ghost');
                dom.removeClasses(elms, 'sortable-ghost');
                elms = tmpbuilder.querySelectorAll('.elm-active');
                dom.removeClasses(elms, 'elm-active');
                elms = tmpbuilder.querySelectorAll('.elm-inspected');
                dom.removeClasses(elms, 'elm-inspected');
                elms = tmpbuilder.querySelectorAll('.cell-active');
                dom.removeClasses(elms, 'cell-active');
                elms = tmpbuilder.querySelectorAll('.row-active');
                dom.removeClasses(elms, 'row-active');
                elms = tmpbuilder.querySelectorAll('.row-outline');
                dom.removeClasses(elms, 'row-outline');
                //elms = tmpbuilder.querySelectorAll('.is-builder');
                //dom.removeClasses(elms, 'is-builder');
                elms = tmpbuilder.querySelectorAll('.row-outline');
                dom.removeClasses(elms, 'row-outline');
                elms = tmpbuilder.querySelectorAll('[data-click]');
                dom.removeAttributes(elms, 'data-click');
                elms = tmpbuilder.querySelectorAll('[contenteditable]');
                dom.removeAttributes(elms, 'contenteditable');
                elms = tmpbuilder.querySelectorAll('[data-module-active]');
                dom.removeAttributes(elms, 'data-module-active');

                dom.removeElements( tmpbuilder.querySelectorAll('.is-row-tool') );
                dom.removeElements( tmpbuilder.querySelectorAll('.is-rowadd-tool') );
                dom.removeElements( tmpbuilder.querySelectorAll('.ovl') );
                dom.removeElements( tmpbuilder.querySelectorAll('.irow-add-initial') );

                // LATER: rewrite in javascript
                //$builder.find('*[class=""]').removeAttr('class');
                //$builder.find('*[style=""]').removeAttr('style'); 

                elms = tmpbuilder.querySelectorAll('[data-keep]');
                dom.removeAttributes(elms, 'data-keep');

                builderhtml = tmpbuilder.innerHTML.trim();
                builderhtml = builderhtml.replace(/<font/g, '<span').replace(/<\/font/g, '</span');
            
                block.setAttribute('data-html-' + index, encodeURIComponent(builderhtml));
        
                index++;
            });
            */

        });

        //Render custom code blocks (including any editable areas within)
        blocks = tmp.querySelectorAll('[data-html]');
        Array.prototype.forEach.call(blocks, (block) => {
            let blockhtml = decodeURIComponent(block.getAttribute('data-html'));
            blockhtml = blockhtml.replace(/{id}/g, util.makeId());

            /* OLD
            for(var i=1;i<=20;i++){ 
                blockhtml = blockhtml.replace('[%HTML'+i+'%]', (block.getAttribute('data-html-'+i) === undefined ? '' : decodeURIComponent(block.getAttribute('data-html-'+i))));//render editable area
            }
            block.innerHTML = blockhtml; //embedded script is not (and should not) executed here
            */

            // NEW
            block.innerHTML = blockhtml; //embedded script is not (and should not) executed here  
            let subblocks = block.querySelectorAll('[data-subblock]');
            var i = 1;
            Array.prototype.forEach.call(subblocks, (subblock) => {
                subblock.innerHTML = (block.getAttribute('data-html-'+i) === undefined ? '' : decodeURIComponent(block.getAttribute('data-html-'+i)));
                i++;
            });

        });

        //For Viewing, hide data-html, data-html-1.., data-settings
        if(view){
            hash = {};
            blocks = tmp.querySelectorAll('[data-html]');
            Array.prototype.forEach.call(blocks, (block) => {

                let uniqueID = util.makeId();
                hash[uniqueID] = block.getAttribute('data-html');
                block.setAttribute('data-html', uniqueID);        

                for(let i=1;i<=20;i++){
                    if(block.getAttribute('data-html-'+i) !== undefined){
                        uniqueID = util.makeId();
                        hash[uniqueID] = block.getAttribute('data-html-'+i);
                        block.getAttribute('data-html-'+i, uniqueID);
                    }            
                }

                if(block.getAttribute('data-settings') !== undefined){
                    uniqueID = util.makeId();
                    hash[uniqueID] = block.getAttribute('data-settings');
                    block.getAttribute('data-settings', uniqueID);
                }
            });
        } else {
            //console.log('for view: false')
        }

        //Cleaning
        let _builders = tmp.querySelectorAll('.is-builder');
        Array.prototype.forEach.call(_builders, (_builder) => {
            _builder.style.transform = '';
            _builder.style.WebkitTransform= '';
            _builder.style.MozTransform= '';
            _builder.removeAttribute('data-sort');
            dom.removeClass(_builder, 'builder-active');
        });
        let elms = tmp.querySelectorAll('.sortable-chosen');
        dom.removeClasses(elms, 'sortable-chosen');
        elms = tmp.querySelectorAll('.sortable-ghost');
        dom.removeClasses(elms, 'sortable-ghost');
        elms = tmp.querySelectorAll('.elm-active');
        dom.removeClasses(elms, 'elm-active');
        elms = tmp.querySelectorAll('.elm-inspected');
        dom.removeClasses(elms, 'elm-inspected');
        elms = tmp.querySelectorAll('.cell-active');
        dom.removeClasses(elms, 'cell-active');
        elms = tmp.querySelectorAll('.row-active');
        dom.removeClasses(elms, 'row-active');
        elms = tmp.querySelectorAll('.row-outline');
        dom.removeClasses(elms, 'row-outline');
        elms = tmp.querySelectorAll('.is-builder');
        dom.removeClasses(elms, 'is-builder');
        elms = tmp.querySelectorAll('.row-outline');
        dom.removeClasses(elms, 'row-outline');
        elms = tmp.querySelectorAll('[data-click]');
        dom.removeAttributes(elms, 'data-click');
        elms = tmp.querySelectorAll('[contenteditable]');
        dom.removeAttributes(elms, 'contenteditable');
        elms = tmp.querySelectorAll('[draggridoutline]');
        dom.removeAttributes(elms, 'draggridoutline');
        elms = tmp.querySelectorAll('[between-blocks-left]');
        dom.removeAttributes(elms, 'between-blocks-left');
        elms = tmp.querySelectorAll('[between-blocks-center]');
        dom.removeAttributes(elms, 'between-blocks-center');
        elms = tmp.querySelectorAll('[hideelementhighlight]');
        dom.removeAttributes(elms, 'hideelementhighlight');
        elms = tmp.querySelectorAll('[data-module-active]');
        dom.removeAttributes(elms, 'data-module-active');

        elms = tmp.querySelectorAll('[hidesnippetaddtool]');
        dom.removeAttributes(elms, 'hidesnippetaddtool');
        elms = tmp.querySelectorAll('[gray]');
        dom.removeAttributes(elms, 'gray');
        elms = tmp.querySelectorAll('[rowoutline]');
        dom.removeAttributes(elms, 'rowoutline');
        elms = tmp.querySelectorAll('[grayoutline]');
        dom.removeAttributes(elms, 'grayoutline');
        elms = tmp.querySelectorAll('[hideoutline]');
        dom.removeAttributes(elms, 'hideoutline');
        elms = tmp.querySelectorAll('[leftrowtool]');
        dom.removeAttributes(elms, 'leftrowtool');
        elms = tmp.querySelectorAll('[minimal]');
        dom.removeAttributes(elms, 'minimal');
        elms = tmp.querySelectorAll('[clean]');
        dom.removeAttributes(elms, 'clean');
        elms = tmp.querySelectorAll('[grideditor]');
        dom.removeAttributes(elms, 'grideditor');
        elms = tmp.querySelectorAll('[gridoutline]');
        dom.removeAttributes(elms, 'gridoutline');

        dom.removeElements( tmp.querySelectorAll('.is-row-tool') );
        dom.removeElements( tmp.querySelectorAll('.is-rowadd-tool') );
        dom.removeElements( tmp.querySelectorAll('.ovl') );
        dom.removeElements( tmp.querySelectorAll('.row-add-initial') );

        //Extra cleaning
        elms = tmp.querySelectorAll('.aos-init');
        dom.removeClasses(elms, 'aos-init');
        elms = tmp.querySelectorAll('.aos-animate');
        dom.removeClasses(elms, 'aos-animate');
        elms = tmp.querySelectorAll('.skrollable');
        dom.removeClasses(elms, 'skrollable');
        elms = tmp.querySelectorAll('.skrollable-after');
        dom.removeClasses(elms, 'skrollable-after');
        elms = tmp.querySelectorAll('.skrollable-before');
        dom.removeClasses(elms, 'skrollable-before');
        elms = tmp.querySelectorAll('.skrollable-between');
        dom.removeClasses(elms, 'skrollable-between');

        let emptyclasses = tmp.querySelectorAll('[class=""]');
        Array.prototype.forEach.call(emptyclasses, (emptyclass) => {
            emptyclass.removeAttribute('class');
        });
        let emptystyles = tmp.querySelectorAll('[style=""]');
        Array.prototype.forEach.call(emptystyles, (emptystyle) => {
            emptystyle.removeAttribute('style');
        });

        elms = tmp.querySelectorAll('[data-keep]');
        dom.removeAttributes(elms, 'data-keep');

        //Cleanup button <span contenteditable="false"><a contenteditable="true">button</a></span>
        let links = tmp.querySelectorAll('a');
        Array.prototype.forEach.call(links, (link) => {
            if(link.style.display === 'inline-block'){
                if(link.parentNode.childElementCount === 1 && link.parentNode.tagName.toLowerCase() === 'span') {
                    link.parentNode.outerHTML = link.parentNode.innerHTML;
                }
            }
        });

        html = '';
        if(multiple){

            //ContentBox

            // Remove dummy DIV after last section
            let elms = tmp.querySelectorAll('.is-dummy');
            dom.removeElements(elms);

            elms= tmp.querySelectorAll('.is-animated');
            Array.prototype.forEach.call(elms, (elm) => {
                dom.removeClass(elm, 'animated');
                dom.removeClass(elm, 'pulse');
                dom.removeClass(elm, 'bounceIn');
                dom.removeClass(elm, 'fadeIn');
                dom.removeClass(elm, 'fadeOut'); //new
                dom.removeClass(elm, 'fadeInDown');
                dom.removeClass(elm, 'fadeInLeft');
                dom.removeClass(elm, 'fadeInRight');
                dom.removeClass(elm, 'fadeInUp');
                dom.removeClass(elm, 'flipInX');
                dom.removeClass(elm, 'flipInY');
                dom.removeClass(elm, 'slideInUp');
                dom.removeClass(elm, 'slideInDown');
                dom.removeClass(elm, 'slideInLeft');
                dom.removeClass(elm, 'slideInRight');
                dom.removeClass(elm, 'zoomIn');

                elm.style.animationDelay = '';
            });

            //Cleanup utils
            elms = tmp.querySelectorAll('.is-appeared');
            Array.prototype.forEach.call(elms, (elm) => {
                dom.removeClass(elm, 'is-appeared');
            });
            elms = tmp.querySelectorAll('.box-active');
            Array.prototype.forEach.call(elms, (elm) => {
                dom.removeClass(elm, 'box-active');
            });
            elms = tmp.querySelectorAll('.section-active');
            Array.prototype.forEach.call(elms, (elm) => {
                dom.removeClass(elm, 'section-active');
            });
            elms = tmp.querySelectorAll('.is-section-tool');
            dom.removeElements(elms);

            var html_content = '';
            var html_footer = '';
            var html_others = '';

            // Apply behavior on each row
            const sections = dom.elementChildren(tmp);
            sections.forEach((section) => {

                let currentSection = section;
                if(dom.hasClass(currentSection, 'is-section')) {
                    var secclass = ''; 
                    // var secstyle = '';
                    if (currentSection.getAttribute('class')) secclass = ' class="' + currentSection.getAttribute('class') + '"';
                    // if (currentSection.getAttribute('style')) secstyle = ' style="' + currentSection.getAttribute('style') + '"';

                    var copySection = currentSection.cloneNode(true);

                    var htmlSection = copySection.outerHTML;

                    html += htmlSection;

                    //content & footer
                    if (secclass.indexOf('is-static') === -1) {
                        html_content += htmlSection + '\n\n';
                    } else {
                        html_footer += htmlSection + '\n\n';
                    }
                } else {

                    copySection = currentSection.cloneNode(true);

                    htmlSection = copySection.outerHTML;

                    html += htmlSection;

                    //others
                    html_others += htmlSection;
                }
            });

            if (html_footer !== '') html_footer = '<!---FOOTER--->\n' + html_footer;
            if (html_others !== '') html_others = '<!---OTHERS--->\n' + html_others;

            let contentbox = document.querySelector('[data-contentbox');
            let disableStaticSection = false;
            if(contentbox) {
                disableStaticSection = contentbox.settings.disableStaticSection;
            }
            if (!disableStaticSection) {
                html = html_content + html_footer + html_others;
            }
                
        } else {

            html = tmp.innerHTML.trim();
            html = html.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

        }
    
        elm = builderstuff.querySelector('#tmp_content');
        if(elm) builderstuff.removeChild(elm);
        elm = builderstuff.querySelector('#tmp_buildercontent');
        if(elm) builderstuff.removeChild(elm);

        return html;
    }

    getIframeHtml() {

        return `
        <!DOCTYPE HTML>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Fonts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">  
            <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" rel="stylesheet" type="text/css" />
        
            <style>
                html, body {height:100%}
                body {margin:0;overflow:hidden;}
                
                button {
                    width: 51px;
                    height: 45px;
                    line-height:1;
                    display: inline-block;
                    box-sizing:border-box;
                    margin: 0;
                    padding: 0;
                    cursor: pointer;
                    background-color:#fff;  
                    color: #4a4a4a; 
                    border: 1px solid transparent;
                    font-family: sans-serif;
                    letter-spacing: 1px;
                    font-size:12px;
                    font-weight:normal;
                    text-transform:uppercase;
                    text-align:center;  
                    position:relative;
                    border-radius: 0;
                    transition: all ease 0.3s;    
                    user-select: none;
                    -moz-user-select: none;
                    -khtml-user-select: none;
                    -webkit-user-select: none;
                    -o-user-select: none;              
                    }
                button.classic-primary {display:inline-block;width:auto;height:50px;padding-left:30px;padding-right:30px;min-width:135px;background: #f7f7f7;}
                button.classic-secondary {display:inline-block;width:auto;height:50px;padding-left:30px;padding-right:30px;background:transparent;}
                button.classic-primary:hover {background: #fafafa;}
                button:focus {outline:none;}
                textarea {font-family: courier;font-size: 17px;line-height: 2;letter-spacing: 1px;padding:8px 16px;box-sizing:border-box;border:1px solid rgb(199, 199, 199);}
                textarea:focus {outline:none}  
                
                #code {display:none;}
                .CodeMirror {
                    font-family: courier;
                    font-size: 15px;
                    line-height:1.9;
                    width:100%;height:100%;
                }
            </style>
        </head>
        <body>
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-bottom:50px solid transparent;box-sizing: border-box;">
            <textarea id="code"></textarea> 
        </div>
        <div style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">
            <button title="Cancel" class="input-cancel classic-secondary">Cancel</button>
            <button title="Ok" class="input-ok classic-primary">Ok</button>
        </div>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/xml/xml.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/javascript/javascript.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/css/css.js" type="text/javascript"></script>
        <script type="text/javascript">
        
            var source = parent.document.querySelector('textarea[data-source-active]');
            var selectorOk = source.getAttribute('data-source-ok');
            var selectorCancel = source.getAttribute('data-source-cancel');
        
            var html = source.value;
            var myTextArea = document.querySelector('#code');
            myTextArea.value = html;
        
            var htmlEditor = CodeMirror.fromTextArea(myTextArea, {
                value: html,
                mode: "text/html",
                lineWrapping: true,
                lineNumbers: true,
                tabMode: "indent"
            });
            htmlEditor.on("change", function (cm, change) {
                myTextArea.value = cm.getValue();
            });
        
            let elm = document.querySelector('.input-ok');
            elm.addEventListener('click', function(e){
        
                myTextArea.value = htmlEditor.getValue();
        
                var html = myTextArea.value;
                source.value = html;

                source.removeAttribute('data-source-active');
                source.removeAttribute('data-source-ok');
                source.removeAttribute('data-source-cancel');
        
                var modal = parent.document.querySelector('.viewhtmllarger');
                if(modal.className.indexOf('active')!==-1) {
                    modal.className = modal.className.replace('active', '');
                } else {
                    modal = parent.document.querySelector('.viewhtmlformatted');
                    modal.className = modal.className.replace('active', '');
                }
        
                modal = parent.document.querySelector('.viewhtmlnormal');
                if(modal.className.indexOf('active')!==-1) {
                    modal.className = modal.className.replace('active', '');
                }

                parent.document.querySelector(selectorOk).click();
            });
        
            elm = document.querySelector('.input-cancel');
            elm.addEventListener('click', function(e){
                source.removeAttribute('data-source-active');
                source.removeAttribute('data-source-ok');
                source.removeAttribute('data-source-cancel');
        
                var modal = parent.document.querySelector('.viewhtmllarger');
                if(modal.className.indexOf('active')!==-1) {
                    modal.className = modal.className.replace('active', '');
                } else {
                    modal = parent.document.querySelector('.viewhtmlformatted');
                    modal.className = modal.className.replace('active', '');
                }
        
                modal = parent.document.querySelector('.viewhtmlnormal');
                if(modal.className.indexOf('active')!==-1) {
                    modal.className = modal.className.replace('active', '');
                }

                parent.document.querySelector(selectorCancel).click();
            });
        
        </script>
        
        </body>
        </html>
        
        `;

    }

}

export default HtmlUtil;