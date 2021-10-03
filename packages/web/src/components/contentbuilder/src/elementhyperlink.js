import { Util, Dom } from './util.js';
const dom = new Dom();

class Hyperlink{

    constructor(builder) {

        this.builder = builder;

        const util = new Util(builder);

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let linkTool = builderStuff.querySelector('#divLinkTool');
        if(!linkTool){
            let html = `<div id="divLinkTool" class="is-tool">
                <button title="${util.out('Link')}" data-title="${util.out('Link')}" class="link-edit"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-link"></use></svg></button>
                <button title="${util.out('Duplicate')}" data-title="${util.out('Duplicate')}" class="link-duplicate"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>
                <button title="${util.out('Delete')}" data-title="${util.out('Delete')}" class="link-remove"><svg class="is-icon-flex" style="width:22px;height:22px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
            </div>
            <div class="is-modal createlink">
                <div style="max-width:526px;">                    
                    <div class="link-src">
                        <input class="input-url" type="text" placeholder="Url"/>
                        <button title="${util.out('Select')}" class="input-select"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                    </div>
                    <label style="display:inline-block;margin-top:14px;margin-bottom:10px;float:left;">
                        <input class="input-newwindow" type="checkbox" />  ${util.out('Open New Window')}&nbsp;
                    </label>
                    <input class="input-text" type="text" placeholder="${util.out('Text')}" style="width:100%;"/>
                    <input class="input-title" type="text" placeholder="${util.out('Title')}" style="width:100%;border-top: none;margin-bottom:12px;"/>
                    <div style="text-align:right">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div>
            
            <div class="is-modal fileselect">
                <div style="max-width:800px;height:80%;padding:0;">
                    <iframe style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>
                </div>
            </div>
            `;

            dom.appendHtml(builderStuff, html);

            linkTool = builderStuff.querySelector('#divLinkTool');

            let linkEdit = linkTool.querySelector('.link-edit');
            dom.addEventListener(linkEdit, 'click', () => { // old: 10853

                this.editLink();

            });


            let linkDuplicate = linkTool.querySelector('.link-duplicate');
            dom.addEventListener(linkDuplicate, 'click', () => { 

                if(this.builder.activeLink) {

                    this.builder.uo.saveForUndo();

                    if(this.builder.opts.emailMode){
                        var element = this.builder.activeLink;
                        while(element.tagName.toLowerCase() !== 'table' && !dom.hasClass(element, 'button')) {
                            element = element.parentNode;
                        }
                        element = element.parentNode;
                        let activeLinkTD = element;
                        const newlinkTD = activeLinkTD.cloneNode(true);

                        // if there is active icon class, do not copy the class
                        let iconActive = newlinkTD.querySelector('.icon-active');
                        if(iconActive) dom.removeClass(iconActive, 'icon-active');

                        newlinkTD.style.paddingRight = '15px';
                        activeLinkTD.parentNode.insertBefore(newlinkTD, activeLinkTD);
                        this.showTool(this.builder.activeLink);

                    } else {

                        const newlink = this.builder.activeLink.cloneNode(true);

                        // if there is active icon class, do not copy the class
                        let iconActive = newlink.querySelector('.icon-active');
                        if(iconActive) dom.removeClass(iconActive, 'icon-active');
    
                        this.builder.activeLink.parentNode.insertBefore(newlink, this.builder.activeLink);
                        this.showTool(this.builder.activeLink);

                    }

                }

            });

            let linkRemove = linkTool.querySelector('.link-remove');
            dom.addEventListener(linkRemove, 'click', () => { 
                
                this.builder.uo.saveForUndo();


                if(this.builder.opts.emailMode){
                    var element = this.builder.activeLink;
                    while(element.tagName.toLowerCase() !== 'table' && !dom.hasClass(element, 'button')) {
                        element = element.parentNode;
                    }
                    element = element.parentNode;
                    let activeLinkTD = element;

                    if(activeLinkTD) activeLinkTD.parentNode.removeChild(activeLinkTD);
                    linkTool.style.display = '';

                } else {

                    if(this.builder.activeLink) this.builder.activeLink.parentNode.removeChild(this.builder.activeLink);
                    linkTool.style.display = '';

                }

                // if there is active icon, set null.
                let iconActive = this.builder.activeLink.querySelector('.icon-active');
                if(iconActive) this.builder.activeIcon = null;

            });

            let modal = this.builderStuff.querySelector('.is-modal.createlink');
            let inputOk = modal.querySelector('.input-ok');
            dom.addEventListener(inputOk, 'click', () => {
                
                this.builder.uo.saveForUndo();
    
                let link = this.builder.activeLink;
                if(link) {
                    // Edit Existing Link
    
                    let url = modal.querySelector('.input-url').value;
                    let title = modal.querySelector('.input-title').value;
                    let linktext = modal.querySelector('.input-text').value;
    
                    if (linktext === '') linktext = url;
    
                    if (url !== '') {
                        link.setAttribute('href', url);
    
                        if (modal.querySelector('.input-newwindow').checked) {
                            link.setAttribute('target', '_blank');
                        } else {
                            link.removeAttribute('target');
                        }

                        if(this.builder.activeIcon) { // Icon is selected

                        } else {
                            link.innerHTML = linktext;
                        }
    
                        link.setAttribute('title', title);
                    } else {
                        var el = link;
                        dom.selectElementContents(el);
                        document.execCommand('unlink', false, null);
                    }
    
                    //Trigger Change event
                    this.builder.opts.onChange();
    
                } else {
                    // Create New Link
    
                    util.restoreSelection();                
    
                    let url = modal.querySelector('.input-url').value;
                    let title = modal.querySelector('.input-title').value;
                    let linktext = modal.querySelector('.input-text').value;
    
                    if (linktext === '') linktext = url;
    
                    if (url !== '') {
    
                        this.builder.uo.saveForUndo();
    
                        let activeLink;
                        if(this.builder.activeIcon) { // Icon is selected

                            let iconhtml = this.builder.activeIcon.outerHTML;
                            this.builder.activeIcon.outerHTML = `<a class="__dummy" href="${url}">${iconhtml}</a>`;
                            activeLink = document.querySelector('.__dummy');
                            dom.removeClass(activeLink,'__dummy');

                            if (modal.querySelector('.input-newwindow').checked) {
                                activeLink.setAttribute('target', '_blank');
                            } else {
                                activeLink.removeAttribute('target');
                            }
    
                            activeLink.setAttribute('title', title);

                            this.builder.activeIcon = activeLink.childNodes[0];

                            if(!util.appleMobile) dom.selectElementContents(this.builder.activeIcon); 

                        } else {
                            // if(this.builder.isIE) {
                            //     util.hideModal(modal);
                            //     return;
                            // }
                            document.execCommand('createLink', false, 'http://dummy');
                            let activeLink = document.querySelector('a[href="http://dummy"]');
                            activeLink.setAttribute('href', url);

                            activeLink.innerHTML = linktext;

                            if (modal.querySelector('.input-newwindow').checked) {
                                activeLink.setAttribute('target', '_blank');
                            } else {
                                activeLink.removeAttribute('target');
                            }
    
                            activeLink.setAttribute('title', title);
        
                            if(!util.appleMobile) dom.selectElementContents(activeLink); 
                        }
                        
                    } 
                    
                    //save selection
                    util.saveSelection();
    
                    //Trigger Change event
                    this.builder.opts.onChange();
            
                    //Trigger Render event
                    this.builder.opts.onRender();
    
                }
    
                util.hideModal(modal);
    
            });
    
            let inputCancel = modal.querySelector('.input-cancel');
            dom.addEventListener(inputCancel, 'click', () => {
    
                util.hideModal(modal);
                if(!util.appleMobile) util.restoreSelection();
    
            });

        }
        this.linkTool = linkTool;

    }

    click(col, e) {

        let customcode = false;
        if (col.hasAttribute('data-html')) { // Column contains custom code.
            customcode = true;
        }

        const elm = e.target;

        this.builder.activeLink = null;
        if((elm.tagName.toLowerCase() === 'a' || dom.parentsHasTag(elm, 'a')) && !customcode) {
            
            if(elm.childNodes.length> 0) { // Sometimes happens when click a link icon, but not exactly on the icon <i>, but the link <a>
                if(elm.childNodes[0].tagName) if(elm.childNodes[0].tagName.toLowerCase() === 'i' && elm.childNodes.length === 1 && elm.childNodes[0].innerHTML === '') {
                    
                    const icons = document.querySelectorAll('.icon-active');
                    Array.prototype.forEach.call(icons, (icon) => {
                        dom.removeClass(icon, 'icon-active');
                    });
                    dom.addClass(elm.childNodes[0], 'icon-active');
        
                    dom.selectElementContents(elm.childNodes[0]);
        
                    this.builder.activeIcon = elm.childNodes[0];
                }
            }

            if(elm.tagName.toLowerCase() === 'img') {
                return;
            }

            let link;
            if(elm.tagName.toLowerCase() === 'a') {
                link = elm;
            } else {
                let element = elm;
                while (element.tagName.toLowerCase()!=='a') {
                    element = element.parentNode;
                }
                link = element;
            }
            this.builder.activeLink = link;

            this.showTool(link);

            e.preventDefault();

        } else {

            this.hideTool();

        }
    }

    showTool(link) {

        // Link tool
        const linkTool = this.linkTool;

        let linkDisplay = dom.getStyle(link, 'display');
        if(linkDisplay==='inline-block'){
            linkTool.querySelector('.link-duplicate').style.display = 'block';
            linkTool.querySelector('.link-remove').style.display = 'block';
        } else {
            if(this.builder.activeIcon) {
                linkTool.querySelector('.link-duplicate').style.display = 'block';
                linkTool.querySelector('.link-remove').style.display = 'block';
            } else {
                linkTool.querySelector('.link-duplicate').style.display = 'none';
                linkTool.querySelector('.link-remove').style.display = 'none';
            }
        }

        const top = link.getBoundingClientRect().top;
        const left = link.getBoundingClientRect().left;
        linkTool.style.display = 'flex';
        const w = linkTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        const h = linkTool.offsetHeight;
        linkTool.style.top = (top - h + window.pageYOffset - 3)  + 'px';
        linkTool.style.left = (left +  link.offsetWidth - w) + 'px';

    }

    hideTool() {

        this.linkTool.style.display = '';

    }

    createLink() {
        const util = new Util(this.builder);
        
        let link;
        if(this.builder.activeLink) {

            link = this.builder.activeLink;

        } else {

            //Adjust selection: If cursor is on existing link, set active link (select the link if it is not icon)
            let elm;
            try{
                let curr;
                if (window.getSelection) {
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if (curr.nodeType === 3) {  //text node
                        elm = curr.parentNode;
                    } else {
                        elm = curr;
                    }
                }
                else if (document.selection) {
                    curr = document.selection.createRange();
                    elm = document.selection.createRange().parentElement();
                }
            } catch(e) {return;}

            if (elm.nodeName.toLowerCase() === 'a') {
                link = elm;
            } else {
                let element = elm;
                while (element.nodeName.toLowerCase()!=='a') {
                    if(element.tagName === 'BODY' || element.tagName === 'HTML') break;
                    if(element.parentNode) element = element.parentNode;
                }
                if (element.nodeName.toLowerCase() === 'a') {
                    link = element;
                }
            }

            if(link) {
                this.builder.activeLink = link;
    
                if(elm.nodeName.toLowerCase() === 'i' && elm.innerHTML === '') {
                    // Icon is selected
                    // console.log('icon is selected')
                } else {
                    dom.selectElementContents(this.builder.activeLink);
                    util.saveSelection();
                }
            }
            
        }


        var text = dom.getSelected();

        let modal = this.builderStuff.querySelector('.is-modal.createlink');

        if(this.builder.opts.onFileSelectClick || this.builder.opts.fileselect !== ''){

            modal.querySelector('.input-select').style.display = 'block';
            modal.querySelector('.input-url').style.width = '444px';

            let inputSelect = modal.querySelector('.input-select');
            dom.addEventListener(inputSelect, 'click', (e) => {

                if(this.builder.opts.onFileSelectClick){
                    this.builder.opts.onFileSelectClick({targetInput: modal.querySelector('.input-url'), theTrigger: modal.querySelector('.input-select')});
                } else {
                    let modalFileSelect = this.builderStuff.querySelector('.is-modal.fileselect');
                    if(modalFileSelect.querySelector('iframe').src === 'about:blank') {
                        modalFileSelect.querySelector('iframe').src = this.builder.opts.fileselect;
                    }
                    util.showModal(modalFileSelect, false, null, false);
                }
                e.preventDefault();
                e.stopImmediatePropagation();

            });

        } else {

            modal.querySelector('.input-select').style.display = 'none';
            modal.querySelector('.input-url').style.width = '100%';

        }

        modal.querySelector('.input-url').value = '';
        modal.querySelector('.input-newwindow').checked = false;
        modal.querySelector('.input-title').value = '';
        modal.querySelector('.input-text').value = '';

        if (link) {

            modal.querySelector('.input-url').value = link.href;
            modal.querySelector('.input-title').value = link.title;
            modal.querySelector('.input-text').value = link.innerHTML;

            if(link.target==='_blank') {
                modal.querySelector('.input-newwindow').checked = true;
            } else {
                modal.querySelector('.input-newwindow').checked = false;
            }

        } else {
            modal.querySelector('.input-text').value = text;
        }

        // Show modal
        util.showModal(modal, true, () => {
            if(!util.appleMobile) util.restoreSelection();
        }, true);

        modal.querySelector('.input-url').focus();

    }

    editLink() {
        const util = new Util(this.builder);

        let link = this.builder.activeLink;

        let modal = this.builderStuff.querySelector('.is-modal.createlink');

        if(this.builder.opts.onFileSelectClick || this.builder.opts.fileselect !== ''){

            modal.querySelector('.input-select').style.display = 'block';
            modal.querySelector('.input-url').style.width = '444px';

            let inputSelect = modal.querySelector('.input-select');
            dom.addEventListener(inputSelect, 'click', () => {

                if(this.builder.opts.onFileSelectClick) {
                    this.builder.opts.onFileSelectClick({targetInput: modal.querySelector('.input-url'), theTrigger: modal.querySelector('.input-select')});
                } else {
                    let modalFileSelect = this.builderStuff.querySelector('.is-modal.fileselect');
                    if(modalFileSelect.querySelector('iframe').src === 'about:blank') {
                        modalFileSelect.querySelector('iframe').src = this.builder.opts.fileselect;
                    }
                    util.showModal(modalFileSelect, false, null, false);
                }

            });

        } else {

            modal.querySelector('.input-select').style.display = 'none';
            modal.querySelector('.input-url').style.width = '100%';

        }

        // Get values
        let url = link.getAttribute('href');
        let target = link.getAttribute('target');
        let title = link.getAttribute('title');
        let linktext = link.innerHTML;
        modal.querySelector('.input-url').value = url;
        if (target === '_blank') {
            modal.querySelector('.input-newwindow').checked = true;
        } else {
            modal.querySelector('.input-newwindow').checked = false;
        }
        modal.querySelector('.input-title').value = title;
        modal.querySelector('.input-text').value = linktext;

        // Show modal
        util.showModal(modal, true, null, true);

        modal.querySelector('.input-url').focus();
        
    }

}

export default Hyperlink;