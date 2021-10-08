import { Dom, Util } from './util.js';
import HtmlUtil from './html.js';

const dom = new Dom();

class Code {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const htmlUtil = new HtmlUtil(builder); 
        this.htmlUtil = htmlUtil;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let codeTool = builderStuff.querySelector('.is-code-tool');
        let codeModal;
        if(!codeTool){
            let html = `
            <div class="is-tool is-code-tool">
                <button title="${util.out('Settings')}" data-title="${util.out('Settings')}" style="width:40px;height:40px;background:none;"><svg class="is-icon-flex"><use xlink:href="#ion-ios-gear"></use></svg></button>
            </div>
            
            <div class="is-modal customcode">
                <div style="max-width:900px;height:570px;padding:0;box-sizing:border-box;position:relative;">
                    <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;">${util.out('Custom Code (Javascript Allowed)')}</div>
                    <textarea class="input-customcode" type="text" style="background: #fff;position: absolute;top: 0;left: 0;width:100%;height:100%;border:none;border-bottom:60px solid transparent;border-top:40px solid transparent;box-sizing:border-box;"></textarea>
                    <div style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div> 
            `;
            // <input id="hidContentModuleCode" type="hidden" />
            // <input id="hidContentModuleSettings" type="hidden" />

            dom.appendHtml(builderStuff, html);

            codeTool = builderStuff.querySelector('.is-code-tool');
            codeModal = builderStuff.querySelector('.is-modal.customcode');


            let btn = codeTool.querySelector('button');
            dom.addEventListener(btn, 'click', () => { 

                let codeblock = this.builder.activeCodeBlock;

                // var html = plugin.readCustomCodeBlock($block);

                // Find editable areas (is-builder) in custom code blocks and save them to data-html-1, data-html-2, and so on.
                let tmpbuilder = this.builderStuff.querySelector('#tmp_buildercontent'); 
                if(tmpbuilder) tmpbuilder.parentNode.removeChild(tmpbuilder);
                dom.appendHtml(this.builderStuff, '<div id="tmp_buildercontent" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>');
                tmpbuilder = this.builderStuff.querySelector('#tmp_buildercontent'); 

                var index = 1;
                const builders = codeblock.querySelectorAll('is-builder');
                Array.prototype.forEach.call(builders, (builder) => {

                    // if(dom.parentsHasClass(builder,'slick-cloned')) return;
                    
                    //Cleaning ( builder cleaning commented because its content that's matter => will be saved. See below.. )
                    // builder.style.transform = '';
                    // builder.style.WebkitTransform= '';
                    // builder.style.MozTransform= '';
                    // builder.removeAttribute('data-sort');

                    // builder.removeAttribute('hidesnippetaddtool');
                    // builder.removeAttribute('gray');
                    // builder.removeAttribute('rowoutline');
                    // builder.removeAttribute('grayoutline');
                    // builder.removeAttribute('hideoutline');
                    // builder.removeAttribute('leftrowtool');
                    // builder.removeAttribute('minimal');
                    // builder.removeAttribute('clean');
                    // builder.removeAttribute('grideditor');
                    // builder.removeAttribute('gridoutline');
    
                    // builder.removeAttribute('gridoutline'); // old
                    // builder.removeAttribute('draggridoutline'); // old
                    // builder.removeAttribute('between-blocks-left'); // old
                    // builder.removeAttribute('between-blocks-center'); // old  
                    // builder.removeAttribute('hideelementhighlight'); 
                    
                    let builderhtml = builder.innerHTML;
                    tmpbuilder = this.builderStuff.querySelector('#tmp_buildercontent');
                    tmpbuilder.innerHTML = builderhtml;
    
                    let elms = tmpbuilder.querySelectorAll('.elm-active');
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
                    dom.removeElements( tmpbuilder.querySelectorAll('.row-add-initial') );
                   
                    elms = tmpbuilder.querySelectorAll('[data-keep]');
                    dom.removeAttributes(elms, 'data-keep');

                    builderhtml = tmpbuilder.innerHTML.trim();
                    builderhtml = builderhtml.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

                    codeblock.setAttribute('data-html-' + index, encodeURIComponent(builderhtml));
                    index++;
                });
                
                let html = decodeURIComponent(codeblock.getAttribute('data-html'));

                html = html.replace(/{id}/g, this.util.makeId());
        
                tmpbuilder.parentNode.removeChild(tmpbuilder);

                // this.util.showModal(codeModal, true);
                // codeModal.querySelector('.input-customcode').value = html;
                // codeModal.querySelector('.input-customcode').focus(); 


                // Use existing modal

                let viewhtml;

                if(this.builder.opts.htmlSyntaxHighlighting) {
                    viewhtml = this.builderStuff.querySelector('.viewhtmlformatted');
                } else {
                    viewhtml = this.builderStuff.querySelector('.viewhtml');
                }

                viewhtml.querySelector('.is-modal-footer').innerHTML = `<button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                    <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>`;
                
                util.showModal(viewhtml, true);

                let textarea = viewhtml.querySelector('textarea');
                textarea.value = html;

                let elm = viewhtml.querySelector('.input-ok');
                dom.addEventListener(elm, 'click', () => {

                    //Save for Undo
                    this.builder.uo.saveForUndo();

                    let textarea = viewhtml.querySelector('textarea');
                    var html = textarea.value;

                    //this.builder.renderCustomCodeBlock($block, html);
                    codeblock.setAttribute('data-html',encodeURIComponent(html)); // => important
                    html = html.replace(/{id}/g, this.util.makeId());
                    for(var i=1;i<=20;i++){
                        html = html.replace('[%HTML'+i+'%]', (codeblock.getAttribute('data-html-'+i) === undefined ? '' : decodeURIComponent(codeblock.getAttribute('data-html-'+i))));//render editable area
                    }

                    //codeblock.innerHTML = html;
                    codeblock.innerHTML = '';
                    // Use createContextualFragment() to make embedded script executable
                    // https://ghinda.net/article/script-tags/
                    var range = document.createRange();
                    range.setStart(codeblock, 0);
                    codeblock.appendChild(
                        range.createContextualFragment(html) 
                    );

                    this.builder.applyBehavior();

                    //Trigger Change event
                    this.builder.opts.onChange();

                    //Trigger Render event
                    this.builder.opts.onRender();

                    util.hideModal(viewhtml);

                    util.hideControls();

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
                    doc.write(this.htmlUtil.getIframeHtml());
                    doc.close();
                } 

            });

            let btnCancel = codeModal.querySelector('.input-cancel');
            dom.addEventListener(btnCancel, 'click', () => { 

                this.util.hideModal(codeModal);

            });

        }
        this.codeTool = codeTool;
        this.codeModal = codeModal;

    }

    click(col) {
        
        let customcode = false;
        if (col.hasAttribute('data-html') && !col.hasAttribute('data-module')) { // Column contains custom code.
            customcode = true;
        }

        if (customcode) {

            this.builder.activeCodeBlock = col;

            let elm = col;

            this.codeTool.style.display = 'flex';
            let _toolwidth = this.codeTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        
            let w = elm.offsetWidth;
            let top = elm.getBoundingClientRect().top + window.pageYOffset;
            let left = elm.getBoundingClientRect().left - 2;
            left = left + (w - _toolwidth);
                                            
            //Adjust left in case an element is outside the screen
            const _screenwidth = window.innerWidth;
            if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;

            this.codeTool.style.top = top + 'px';
            this.codeTool.style.left = left + 'px';
        } else {

            this.builder.activeCodeBlock = null;

            this.codeTool.style.display = '';

        }
        
    }
}

export default Code;