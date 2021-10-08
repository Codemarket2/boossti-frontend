import { Dom, Util } from './util.js';

const dom = new Dom();

class Module {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let moduleTool = builderStuff.querySelector('.is-module-tool');
        let moduleModal;
        if(!moduleTool){
            let html = `
            <div class="is-tool is-module-tool">
                <button title="${util.out('Settings')}" data-title="${util.out('Settings')}" style="width:40px;height:40px;background:none;"><svg class="is-icon-flex"><use xlink:href="#ion-ios-gear"></use></svg></button>
            </div>

            <input id="hidContentModuleCode" type="hidden" />
            <input id="hidContentModuleSettings" type="hidden" />
            
            <div class="is-modal custommodule">
                <div style="max-width:900px;height:570px;padding:0;box-sizing:border-box;position:relative;">
                    <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;">${util.out('Module Settings')}</div>
                    <iframe style="position: absolute;top: 0;left: 0;width:100%;height:100%;border:none;border-bottom:60px solid transparent;border-top:40px solid transparent;margin:0;box-sizing:border-box;" src="about:blank"></iframe>
                    <div style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div> 
            `;

            dom.appendHtml(builderStuff, html);

            moduleTool = builderStuff.querySelector('.is-module-tool');
            moduleModal = builderStuff.querySelector('.is-modal.custommodule');

            let btn = moduleTool.querySelector('button');
            dom.addEventListener(btn, 'click', () => { // old: 10100

                let module = this.builder.activeModule;

                //-------- Set a flag to indicate active module -----------
                dom.removeAttributes(document.querySelectorAll('[data-module-active]'), 'data-module-active');
                module.setAttribute('data-module-active', '1');
                //-------- /Set a flag to indicate active module -----------

                //show modal
                var modulename = module.getAttribute('data-module');

                var moduleDesc = module.getAttribute('data-module-desc');
                if (moduleDesc) {
                    moduleModal.querySelector('.is-modal-bar').innerHTML = moduleDesc;
                } else {
                    moduleModal.querySelector('.is-modal-bar').innerHTML = this.util.out('Module Settings');
                }

                var w = module.getAttribute('data-dialog-width');
                if (!w || w === '') {
                    w = '900px';
                }

                var h = module.getAttribute('data-dialog-height');
                if (!h || h === '') {
                    h = '570px';
                }

                moduleModal.querySelector('div').style.maxWidth = w;
                moduleModal.querySelector('div').style.height = h;

                // OLD
                // Find subblocks (previously is-builder) in custom code blocks and save them to data-html-1, data-html-2, and so on.
                // let tmpbuilder = this.builderStuff.querySelector('#tmp_buildercontent'); 
                // if(tmpbuilder) tmpbuilder.parentNode.removeChild(tmpbuilder);
                // dom.appendHtml(this.builderStuff, '<div id="tmp_buildercontent" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>');
                // tmpbuilder = this.builderStuff.querySelector('#tmp_buildercontent'); 

                // NEW
                var index = 1;
                const builders = module.querySelectorAll('[data-subblock]'); 
                Array.prototype.forEach.call(builders, (builder) => {
                
                    let builderhtml = builder.innerHTML;

                    module.setAttribute('data-html-' + index, encodeURIComponent(builderhtml));
                    index++;
                });

                /* OLD
                var index = 1;
                const builders = module.querySelectorAll('is-builder'); // OLD
                Array.prototype.forEach.call(builders, (builder) => {

                    //if(dom.parentsHasClass(builder,'slick-cloned')) return; // direct (LATER)
                    
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
                    dom.removeElements( tmpbuilder.querySelectorAll('.irow-add-initial') );
                   
                    elms = tmpbuilder.querySelectorAll('[data-keep]');
                    dom.removeAttributes(elms, 'data-keep');

                    builderhtml = tmpbuilder.innerHTML.trim();
                    builderhtml = builderhtml.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

                    module.setAttribute('data-html-' + index, encodeURIComponent(builderhtml));
                    index++;
                });
                */
                
                this.util.showModal(moduleModal, true);

                var d = new Date();
                moduleModal.querySelector('iframe').src = this.builder.opts.modulePath + modulename + '.html?' + d.getTime(); //always refreshed

            });

            let btnOk = moduleModal.querySelector('.input-ok');
            dom.addEventListener(btnOk, 'click', () => { 

                //Save for Undo
                this.builder.uo.saveForUndo();

                let module = this.builder.activeModule;

                //Save Html (original)
                module.setAttribute('data-html', encodeURIComponent(this.builderStuff.querySelector('#hidContentModuleCode').value));

                //Save Settings (original)
                module.setAttribute('data-settings', encodeURIComponent(this.builderStuff.querySelector('#hidContentModuleSettings').value));

                //Render (programmatically)
                //$block.html(jQuery('#hidContentModuleCode').val());
                //plugin.renderCustomCodeBlock($block, jQuery('#hidContentModuleCode').val());
                let html = this.builderStuff.querySelector('#hidContentModuleCode').value; 
                html = html.replace(/{id}/g, this.util.makeId());

                /* OLD
                for(var i=1;i<=20;i++){ // OLD
                    html = html.replace('[%HTML'+i+'%]', (module.getAttribute('data-html-'+i) === undefined ? '' : decodeURIComponent(module.getAttribute('data-html-'+i))));//render editable area
                }

                module.innerHTML = html;
                */

                // NEW
                module.innerHTML = '';
                // Use createContextualFragment() to make embedded script executable
                // https://ghinda.net/article/script-tags/
                var range = document.createRange(); 
                range.setStart(module, 0);
                module.appendChild(
                    range.createContextualFragment(html) 
                );
                let subblocks = module.querySelectorAll('[data-subblock]'); 
                var i = 1;
                Array.prototype.forEach.call(subblocks, (subblock) => {
                    if(module.getAttribute('data-html-'+i)) {
                        subblock.innerHTML = decodeURIComponent(module.getAttribute('data-html-'+i));
                    }
                    i++;
                });


                this.builder.applyBehavior();

                //Trigger Change event
                this.builder.opts.onChange();

                //Trigger Render event
                this.builder.opts.onRender();

                this.util.hideModal(moduleModal);

                this.util.hideControls();
            });

            let btnCancel = moduleModal.querySelector('.input-cancel');
            dom.addEventListener(btnCancel, 'click', () => { 

                this.util.hideModal(moduleModal);

            });

        }
        this.moduleTool = moduleTool;
        this.moduleModal = moduleModal;

    }

    click(col) {

        let custommodule = false;
        if (col.hasAttribute('data-module')) { // Column contains custom module.
            custommodule = true;
        }

        if (custommodule) {

            this.builder.activeModule = col;

            let elm = col;

            this.moduleTool.style.display = 'flex';
            let _toolwidth = this.moduleTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        
            let w = elm.offsetWidth;
            let top = elm.getBoundingClientRect().top + window.pageYOffset;
            let left = elm.getBoundingClientRect().left - 2;
            left = left + (w - _toolwidth);
                                            
            //Adjust left in case an element is outside the screen
            const _screenwidth = window.innerWidth;
            if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;

            this.moduleTool.style.top = top + 'px';
            this.moduleTool.style.left = left + 'px';
        } else {

            this.builder.activeModule = null;

            this.moduleTool.style.display = '';

        }
 
    }

}

export default Module;