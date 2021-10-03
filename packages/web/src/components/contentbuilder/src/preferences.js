import { Util, Dom } from './util.js';

const dom = new Dom();

export class Preferences{
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);

        const builderstuff = util.builderStuff();

        let config = builderstuff.querySelector('.viewconfig');
        if(!config){
            let html = `<div class="is-modal viewconfig">
                <div style="width:100%;max-width:700px;padding:5px 12px 12px 20px">
                    <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;height:32px;line-height:32px;width:100%;background: transparent;">${util.out('Preferences')}</div>
                
                    <div style="display:flex;flex-wrap:wrap;width:100%;padding-top:32px;">
                        <div style="width:50%">
                            <label id="divBuilderMode" style="display:block;margin-top:14px;margin-bottom:5px;">
                                ${util.out('Builder Mode')}:&nbsp;
                                <select class="select-buildermode">
                                    <option value="">${util.out('Default')}</option>
                                    <option value="minimal">${util.out('Minimal')}</option>
                                    <option value="clean">${util.out('Clean')}</option>
                                </select>
                            </label>
                            
                            <label id="divOutlineMode" style="display:block;margin-top:14px;margin-bottom:5px;">
                                ${util.out('Outline Mode')}:&nbsp;
                                <select class="select-outlinemode">
                                    <option value="">${util.out('Row & column')}</option>
                                    <option value="row">${util.out('Row only')}</option>
                                </select>
                            </label>

                            <label style="display:block;margin-top:14px;margin-bottom:5px;">
                                ${util.out('Outline Style')}:&nbsp;
                                <select class="select-outlinestyle">
                                    <option value="">${util.out('Colored')}</option>
                                    <option value="grayoutline">${util.out('Gray')}</option>
                                </select>
                            </label>
                            
                            <label style="display:block;margin-top:14px;margin-bottom:10px;">
                                <input class="input-hiderowcoloutline" type="checkbox" /> ${util.out('Hide Outline')}&nbsp;
                            </label>  

                            <label id="divHideCellTool" style="display:block;margin-top:14px;margin-bottom:10px;">
                                <input class="input-hidecelltool" type="checkbox" />  ${util.out('Hide Column Tool')}&nbsp;
                            </label>

                            <label style="display:block;margin-top:5px;margin-bottom:5px;">
                                ${util.out('Row Tool Position')}:&nbsp;
                                <select class="select-rowtool">
                                    <option value="right">${util.out('Right')}</option>
                                    <option value="left">${util.out('Left')}</option>
                                </select>
                            </label>   

                            <label style="display:block;margin-top:5px;margin-bottom:5px;">
                                ${util.out('Tool Style')}:&nbsp;
                                <select class="select-toolstyle">
                                    <option value="">${util.out('Colored')}</option>
                                    <option value="gray">${util.out('Gray')}</option>
                                </select>
                            </label>  

                        </div>
                        <div style="width:50%">

                            <label style="display:block;margin-top:14px;margin-bottom:10px;">
                                <input class="input-hidesnippetaddtool" type="checkbox" />  ${util.out('Hide Snippet (+) Tool')}&nbsp;
                            </label>

                            <label style="display:block;margin-top:14px;margin-bottom:10px;">
                                <input class="input-hideelementtool" type="checkbox" /> ${util.out('Hide element tool')}&nbsp;
                            </label>  

                            <label style="display:block;margin-top:14px;margin-bottom:10px;">
                                <input class="input-hideelementhighlight" type="checkbox" /> ${util.out('Hide element highlight')}&nbsp;
                            </label>  

                            <label class="option-opensnippets" style="display:block;margin-top:14px;margin-bottom:10px;">
                                <input class="input-opensnippets" type="checkbox" />  ${util.out('Open snippets sidebar on start')}&nbsp;
                            </label>

                            <label style="display:block;margin-top:14px;margin-bottom:5px;">
                               ${util.out('Snippets sidebar visibility')}:&nbsp;
                                <select class="select-snippetssidebardisplay">
                                    <option value="auto">${util.out('Auto')}</option>
                                    <option value="always">${util.out('Always Visible')}</option>
                                </select>
                            </label>

                            <label style="display:block;margin-top:5px;margin-bottom:5px;">
                                ${util.out('Paste result')}:&nbsp;
                                <select class="select-pasteresult">
                                    <option value="html-without-styles">${util.out('HTML (without styles)')}</option>
                                    <option value="html">${util.out('HTML (with styles)')}</option>
                                    <option value="text">${util.out('Text only')}</option>
                                </select>
                            </label>  

                            <label style="display:none;margin-top:14px;margin-bottom:5px;">
                               ${util.out('Toolbar visibility')}:&nbsp;
                                <select class="select-editingtoolbardisplay">
                                    <option value="auto">${util.out('Auto')}</option>
                                    <option value="always">${util.out('Always Visible')}</option>
                                </select>
                            </label>

                            <label style="${(this.builder.isTouchSupport?'display:none;' : 'display:block;')}margin-top:5px;margin-bottom:5px;">
                               ${util.out('Toolbar position')}:&nbsp;
                                <select class="select-editingtoolbar">
                                    <option value="top">${util.out('Top')}</option>
                                    <option value="left">${util.out('Left')}</option>
                                    <option value="right">${util.out('Right')}</option>
                                </select>
                            </label> 

                        </div>
                    </div>
                    <div style="text-align:right;margin-top:30px">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div>`;

            dom.appendHtml(builderstuff, html);
            config = builderstuff.querySelector('.viewconfig');

            if(!(builder.opts.snippetList ==='#divSnippetList' && builder.opts.snippetJSON.snippets.length > 0)) {
                config.querySelector('.option-opensnippets').style.display = 'none';
            }

            let elm = config.querySelector('.input-cancel');
            dom.addEventListener(elm, 'click', () => {
    
                util.hideModal(config);

            });

            elm = config.querySelector('.input-ok');
            dom.addEventListener(elm, 'click', () => {

                this.update();

                util.hideModal(config);

            });

            // On first load, apply preferences (check if there are stored values)
            if (localStorage.getItem('_hiderowcoloutline') !== null) {
                if(localStorage.getItem('_hiderowcoloutline')==='1') {
                    this.builder.opts.rowcolOutline = false;
                } else {
                    this.builder.opts.rowcolOutline = true;                    
                }
            } 
            this.setOutline(!this.builder.opts.rowcolOutline);

            if (localStorage.getItem('_outlinemode') !== null) {
                this.builder.opts.outlineMode = localStorage.getItem('_outlinemode');
            } 
            this.setOutlineMode(this.builder.opts.outlineMode);

            if (localStorage.getItem('_outlinestyle') !== null) {
                this.builder.opts.outlineStyle = localStorage.getItem('_outlinestyle');
            } 
            this.setOutlineStyle(this.builder.opts.outlineStyle);
            
            if (localStorage.getItem('_pasteresult') !== null) {
                this.builder.opts.paste = localStorage.getItem('_pasteresult');
            } 
            
            if (localStorage.getItem('_hidecelltool') !== null) {
                if(localStorage.getItem('_hidecelltool')==='1') {
                    this.builder.opts.columnTool = false;
                } else {
                    this.builder.opts.columnTool = true;
                }
            }
            this.setColumnTool(!this.builder.opts.columnTool);
            
            if (localStorage.getItem('_hidesnippetaddtool') !== null) {
                if(localStorage.getItem('_hidesnippetaddtool')==='1') {
                    this.builder.opts.snippetAddTool = false;
                } else {
                    this.builder.opts.snippetAddTool = true;
                }
            }
            this.setSnippetAddTool(!this.builder.opts.snippetAddTool);

            if (localStorage.getItem('_hideelementtool') !== null) {
                if(localStorage.getItem('_hideelementtool')==='1') {
                    this.builder.opts.elementTool = false;
                } else {
                    this.builder.opts.elementTool = true;
                }
            }
            this.setElementTool(!this.builder.opts.elementTool);
            
            if (localStorage.getItem('_hideelementhighlight') !== null) {
                if(localStorage.getItem('_hideelementhighlight')==='1') {
                    this.builder.opts.elementHighlight = false;
                } else {
                    this.builder.opts.elementHighlight = true;
                }
            }
            this.setElementHighlight(!this.builder.opts.elementHighlight);

            if (localStorage.getItem('_opensnippets') !== null) {
                if(localStorage.getItem('_opensnippets')==='1'){
                    this.builder.opts.snippetOpen = true;
                } else {
                    this.builder.opts.snippetOpen = false;
                }
            }

            if (localStorage.getItem('_buildermode') !== null) {
                this.builder.opts.builderMode = localStorage.getItem('_buildermode');
            } 
            this.setBuilderMode(this.builder.opts.builderMode);

            if (localStorage.getItem('_rowtool') !== null) {
                this.builder.opts.rowTool = localStorage.getItem('_rowtool');
            } 
            this.setRowToolPosition(this.builder.opts.rowTool);

            if (localStorage.getItem('_toolstyle') !== null) {
                this.builder.opts.toolStyle = localStorage.getItem('_toolstyle');
            } 
            this.setToolStyle(this.builder.opts.toolStyle);

            // Always Auto
            // if (localStorage.getItem('_editingtoolbardisplay') !== null) {
            //     this.builder.opts.toolbarDisplay = localStorage.getItem('_editingtoolbardisplay');
            // }
            this.builder.opts.toolbarDisplay = 'auto';
            // this.setToolbarDisplay(this.builder.opts.toolbarDisplay);

            if (localStorage.getItem('_snippetssidebardisplay') !== null) {
                this.builder.opts.snippetsSidebarDisplay = localStorage.getItem('_snippetssidebardisplay');
            }
                
            if (localStorage.getItem('_editingtoolbar') != null) {
                this.builder.opts.toolbar = localStorage.getItem('_editingtoolbar');
            }
            this.setToolbar(this.builder.opts.toolbar);

            // Email Mode
            if (this.builder.opts.emailMode) {
                this.builder.opts.outlineMode = 'row';
                this.builder.opts.columnTool = false;
                this.builder.opts.builderMode = '';
                if (localStorage.getItem('_outlinemode') != null) {
                    localStorage.setItem('_outlinemode', 'row');
                } 
                if (localStorage.getItem('_hidecelltool') !== null) {
                    localStorage.setItem('_hidecelltool', '1');
                }
                if (localStorage.getItem('_buildermode') !== null) {
                    localStorage.setItem('_buildermode', '');
                }
                this.setColumnTool(true);
                this.setBuilderMode('');
                this.setEmailMode();
                builderstuff.querySelector('#divHideCellTool').style.display = 'none';
                builderstuff.querySelector('#divOutlineMode').style.display = 'none';
                builderstuff.querySelector('#divBuilderMode').style.display = 'none';
            }

        }
        this.config = config;

    }

    view() {
        const util = new Util(this.builder);

        let modal = this.config;
        util.showModal(modal, false, null, false);

        // Display values
        if(this.builder.opts.rowcolOutline ){
            modal.querySelector('.input-hiderowcoloutline').checked = false;
        } else {
            modal.querySelector('.input-hiderowcoloutline').checked = true;
        }
        if(this.builder.opts.columnTool ){
            modal.querySelector('.input-hidecelltool').checked = false;
        } else {
            modal.querySelector('.input-hidecelltool').checked = true;
        }
        if(this.builder.opts.snippetAddTool ){
            modal.querySelector('.input-hidesnippetaddtool').checked = false;
        } else {
            modal.querySelector('.input-hidesnippetaddtool').checked = true;
        }
        if(this.builder.opts.elementTool ){
            modal.querySelector('.input-hideelementtool').checked = false;
        } else {
            modal.querySelector('.input-hideelementtool').checked = true;
        }
        if(this.builder.opts.elementHighlight ){
            modal.querySelector('.input-hideelementhighlight').checked = false;
        } else {
            modal.querySelector('.input-hideelementhighlight').checked = true;
        }
        if(this.builder.opts.snippetOpen ){
            modal.querySelector('.input-opensnippets').checked = true;
        } else {
            modal.querySelector('.input-opensnippets').checked = false;
        }
        this.config.querySelector('.select-buildermode').value = this.builder.opts.builderMode;
        this.config.querySelector('.select-rowtool').value = this.builder.opts.rowTool;
        this.config.querySelector('.select-outlinemode').value = this.builder.opts.outlineMode;
        this.config.querySelector('.select-outlinestyle').value = this.builder.opts.outlineStyle;
        this.config.querySelector('.select-toolstyle').value = this.builder.opts.toolStyle;
        this.config.querySelector('.select-pasteresult').value = this.builder.opts.paste;
        this.config.querySelector('.select-editingtoolbardisplay').value = this.builder.opts.toolbarDisplay;
        this.config.querySelector('.select-editingtoolbar').value = this.builder.opts.toolbar;
        this.config.querySelector('.select-snippetssidebardisplay').value = this.builder.opts.snippetsSidebarDisplay;
        
    }

    update() {

        // Update values
        let hideoutline = this.config.querySelector('.input-hiderowcoloutline').checked;
        if(hideoutline) {
            this.builder.opts.rowcolOutline = false;
            localStorage.setItem('_hiderowcoloutline', '1');
        } else {
            this.builder.opts.rowcolOutline = true;
            localStorage.setItem('_hiderowcoloutline', '0');
        }
        this.setOutline(hideoutline);

        let hidecolumntool = this.config.querySelector('.input-hidecelltool').checked;
        if(hidecolumntool) {
            this.builder.opts.columnTool = false;
            localStorage.setItem('_hidecelltool', '1');
            this.setColumnTool(true);
        } else {
            this.builder.opts.columnTool = true;
            localStorage.setItem('_hidecelltool', '0');
            this.setColumnTool(false);
        }

        let hidesnippetaddtool = this.config.querySelector('.input-hidesnippetaddtool').checked;
        if(hidesnippetaddtool) {
            this.builder.opts.snippetAddTool = false;
            localStorage.setItem('_hidesnippetaddtool', '1');
            this.setSnippetAddTool(true);
        } else {
            this.builder.opts.snippetAddTool = true;
            localStorage.setItem('_hidesnippetaddtool', '0');
            this.setSnippetAddTool(false);
        }

        let hideelementtool = this.config.querySelector('.input-hideelementtool').checked;
        if(hideelementtool) {
            this.builder.opts.elementTool = false;
            localStorage.setItem('_hideelementtool', '1');
            this.setElementTool(true);
        } else {
            this.builder.opts.elementTool = true;
            localStorage.setItem('_hideelementtool', '0');
            this.setElementTool(false);
        }

        let hideelementhighlight = this.config.querySelector('.input-hideelementhighlight').checked;
        if(hideelementhighlight) {
            this.builder.opts.elementHighlight = false;
            localStorage.setItem('_hideelementhighlight', '1');
            this.setElementHighlight(true);
        } else {
            this.builder.opts.elementHighlight = true;
            localStorage.setItem('_hideelementhighlight', '0');
            this.setElementHighlight(false);
        }

        let snippetopen = this.config.querySelector('.input-opensnippets').checked;
        if(snippetopen) {
            this.builder.opts.snippetOpen = true;
            localStorage.setItem('_opensnippets', '1');
        } else {
            this.builder.opts.snippetOpen = false;
            localStorage.setItem('_opensnippets', '0');
        }

        let builderMode = this.config.querySelector('.select-buildermode').value;
        this.builder.opts.builderMode = builderMode;
        localStorage.setItem('_buildermode', builderMode);
        this.setBuilderMode(builderMode);

        let rowTool = this.config.querySelector('.select-rowtool').value;
        this.builder.opts.rowTool = rowTool;
        localStorage.setItem('_rowtool', rowTool);
        this.setRowToolPosition(rowTool);

        let outlineMode = this.config.querySelector('.select-outlinemode').value;
        this.builder.opts.outlineMode = outlineMode;
        localStorage.setItem('_outlinemode', outlineMode);
        this.setOutlineMode(outlineMode);

        let outlineStyle = this.config.querySelector('.select-outlinestyle').value;
        this.builder.opts.outlineStyle = outlineStyle;
        localStorage.setItem('_outlinestyle', outlineStyle);
        this.setOutlineStyle(outlineStyle);

        let toolStyle = this.config.querySelector('.select-toolstyle').value;
        this.builder.opts.toolStyle = toolStyle;
        localStorage.setItem('_toolstyle', toolStyle);
        this.setToolStyle(toolStyle);

        let pasteResult = this.config.querySelector('.select-pasteresult').value;
        this.builder.opts.paste = pasteResult;
        localStorage.setItem('_pasteresult', pasteResult);

        // let toolbarDisplay = this.config.querySelector('.select-editingtoolbardisplay').value;
        // this.builder.opts.toolbarDisplay = toolbarDisplay;
        // localStorage.setItem('_editingtoolbardisplay', toolbarDisplay);
        // this.setToolbarDisplay(toolbarDisplay);

        let snippetsSidebarDisplay = this.config.querySelector('.select-snippetssidebardisplay').value;
        this.builder.opts.snippetsSidebarDisplay = snippetsSidebarDisplay;
        localStorage.setItem('_snippetssidebardisplay', snippetsSidebarDisplay);
        
        let toolbar = this.config.querySelector('.select-editingtoolbar').value;
        this.builder.opts.toolbar = toolbar;
        localStorage.setItem('_editingtoolbar', toolbar);
        this.setToolbar(toolbar);

    }

    setToolbar(toolbar) {
        let builderstuff = document.querySelector('#_cbhtml');
        if(toolbar==='top'){

            builderstuff.removeAttribute('toolbarleft','');
            builderstuff.removeAttribute('toolbarright','');

        } else if(toolbar==='left'){

            builderstuff.setAttribute('toolbarleft','');
            builderstuff.removeAttribute('toolbarright','');

        } else if(toolbar==='right'){

            builderstuff.setAttribute('toolbarright','');
            builderstuff.removeAttribute('toolbarleft','');

        }

        // this.positionToolbar();
        const rteTool = builderstuff.querySelector('.is-rte-tool');
        const rteMoreOptions = builderstuff.querySelector('.rte-more-options');
        const elementRteMoreOptions = builderstuff.querySelector('.elementrte-more-options');
        if(rteTool) this.builder.rte.positionToolbar();
        if(rteMoreOptions) {
            dom.removeClass(rteMoreOptions,'active');
            dom.addClass(rteMoreOptions, 'deactive');
            dom.removeClass(elementRteMoreOptions,'active');
            dom.addClass(elementRteMoreOptions, 'deactive');
        }

    }

    setEmailMode() {
        let builderstuff = document.querySelector('#_cbhtml');
        builderstuff.setAttribute('emailmode','');
    }

    /*
    positionToolbar() { // direct
        let builderstuff = document.querySelector('#_cbhtml');
        const rteTool = builderstuff.querySelector('.is-rte-tool');
        const rteMoreOptions = builderstuff.querySelector('.rte-more-options');
        if(rteTool){ // check in case rte stuff hasn't rendered yet

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if(this.builder.opts.toolbar === 'left' || this.builder.opts.toolbar === 'right') {
    
                let h = rteTool.offsetHeight;
    
                let top = (viewportHeight/2) - (h/2);
    
                rteTool.style.left = '';
                rteTool.style.top = top + 'px';
                
            } else {
    
                let w = rteTool.offsetWidth;
        
                let left = (viewportWidth/2) - (w/2);
        
                rteTool.style.top = '';
                rteTool.style.left = left + 'px';
    
            }
        }
        if(rteMoreOptions) {
            //rteMoreOptions.style.display = '';
            dom.removeClass(rteMoreOptions,'active');
            dom.addClass(rteMoreOptions, 'deactive');
        }
    }

    setToolbarDisplay(toolbardisplay) {
        let builderstuff = document.querySelector('#_cbhtml');
        if(toolbardisplay==='auto'){

            builderstuff.removeAttribute('toolbarstay','');

            // direct
            const rteTool = builderstuff.querySelector('.is-rte-tool');
            if(rteTool) { // check in case rte stuff hasn't rendered yet
                rteTool.style.display = '';
            }

        } else {

            builderstuff.setAttribute('toolbarstay','');

            // direct
            const viewportWidth = window.innerWidth;
            const rteTool = builderstuff.querySelector('.is-rte-tool');
            if(rteTool) { // check in case rte stuff hasn't rendered yet
                let w = rteTool.offsetWidth;
                let left = (viewportWidth/2) - (w/2);
                rteTool.style.left = left + 'px';
            }

        }
    }
    */

    setElementTool(hideelementtool) {
        let builderstuff = document.querySelector('#_cbhtml');
        if(hideelementtool){
            builderstuff.setAttribute('hideelementtool','');
        } else {
            builderstuff.removeAttribute('hideelementtool','');
        }
    }

    setElementHighlight(hideelementhighlight) {
        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(hideelementhighlight){
                builder.setAttribute('hideelementhighlight','');
            } else {
                builder.removeAttribute('hideelementhighlight','');
            } 
        });
    }

    setOutlineStyle(outlineStyle) {

        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(outlineStyle==='grayoutline'){
                builder.setAttribute('grayoutline','');
            } else {
                builder.removeAttribute('grayoutline');
            } 
        });

    }

    setColumnTool(hidecolumntool) {
        let builderstuff = document.querySelector('#_cbhtml');
        if(hidecolumntool){
            builderstuff.setAttribute('hidecolumntool','');
        } else {
            builderstuff.removeAttribute('hidecolumntool','');
        } 
    }

    setSnippetAddTool(hidesnippetaddtool) {
        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(hidesnippetaddtool){
                builder.setAttribute('hidesnippetaddtool','');
            } else {
                builder.removeAttribute('hidesnippetaddtool','');
            } 
        });
    }

    setToolStyle(toolStyle) {
        let builderstuff = document.querySelector('#_cbhtml');
        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(toolStyle==='gray'){
                builder.setAttribute('gray','');
                builderstuff.setAttribute('gray','');
            } else {
                builder.removeAttribute('gray');
                builderstuff.removeAttribute('gray','');
            } 
        });
    }

    setOutlineMode(outlineMode) {

        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(outlineMode==='row'){
                builder.setAttribute('rowoutline','');
            } else {
                builder.removeAttribute('rowoutline');
            } 
        });
    }

    setOutline(hideoutline) {

        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(hideoutline){
                builder.setAttribute('hideoutline','');
            } else {
                builder.removeAttribute('hideoutline');
            } 
        });
    }

    setRowToolPosition(rowTool) {
      
        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(rowTool==='right'){
                builder.removeAttribute('leftrowtool');
            } else {
                builder.setAttribute('leftrowtool','');
            } 
        });
    }

    setBuilderMode(builderMode) {

        let builderstuff = document.querySelector('#_cbhtml');
        const builders = document.querySelectorAll(this.builder.opts.container);
        Array.prototype.forEach.call(builders, (builder) => {
            if(builderMode===''){
                builder.removeAttribute('minimal');
                builder.removeAttribute('clean');

                builderstuff.removeAttribute('minimal');
                builderstuff.removeAttribute('clean');
            } else if(builderMode==='minimal'){
                builder.setAttribute('minimal','');
                builder.removeAttribute('clean');

                builderstuff.setAttribute('minimal','');
                builderstuff.removeAttribute('clean');
            } else if(builderMode==='clean'){
                builder.setAttribute('clean','');
                builder.removeAttribute('minimal');

                builderstuff.setAttribute('clean','');
                builderstuff.removeAttribute('minimal');
            }
        });        
    }

} 

export default Preferences;