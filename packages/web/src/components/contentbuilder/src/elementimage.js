import { Dom, Util } from './util.js';
import Cropper from 'cropperjs';
import Moveable from 'moveable';

const dom = new Dom();

export class Image {

    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        let imageTool = builderStuff.querySelector('#divImageTool');
        let imageResizer;
        if(!imageTool) {
            let html = `
                <div id="divImageTool" class="is-tool" style="background:rgba(0, 0, 0, 0.15);border:transparent 1px solid;">
                    <div class="image-embed" style="${(this.builder.opts.imageEmbed?'':'display:none;')}width:40px;height:40px;overflow:hidden;">
                        <div style="position:absolute;width:100%;height:100%;"><svg class="is-icon-flex" style="position: absolute;top: 13px;left: 15px;width: 14px;height: 14px;fill:rgb(255,255,255);"><use xlink:href="#ion-image"></use></svg></div>
                        <input title="${util.out('Change Image')}" data-title="${util.out('Change Image')}" id="fileEmbedImage" type="file" accept="image/*" style="position:absolute;top:-20px;left:0;width:100%;height:60px;opacity: 0;cursor: pointer;"/>
                    </div>
                    <button title="${util.out('Link')}" data-title="${util.out('Link')}" class="image-link" style="width:40px;height:40px;background:none;color:#fff;"><svg class="is-icon-flex" style="fill:rgba(255, 255, 255, 0.95);width:17px;height:17px;"><use xlink:href="#ion-link"></use></svg></button> 
                    <button title="${util.out('Edit')}" data-title="${util.out('Edit')}" class="image-edit" style="width:40px;height:40px;background:none;color:#fff;"><svg class="is-icon-flex" style="fill:rgb(255,255,255);width:14px;height:14px;"><use xlink:href="#ion-android-create"></use></svg></button>
                </div>
                <div id="divImageProgress">
                    <div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                
                <div class="is-modal imageedit">
                    <div style="width:auto;max-width:826px;padding-top:7px;display:flex;flex-direction:column;align-items:center;">
                        <div class="imageedit-crop" style="display:flex;height:80px;align-items:center;align-self:flex-start;">
                            <button title="5x5" data-crop-size="1" style="width: 60px;height: 60px;">5x5</button>
                            <button title="4x3" data-crop-size="1.33333" style="width: 60px;height: 45px;">4x3</button>
                            <button title="3x4" data-crop-size="0.75" style="width: 45px;height: 60px;">3x4</button>
                            <button title="6x4" data-crop-size="1.5" style="width: 60px;height: 40px;">6x4</button>
                            <button title="4x6" data-crop-size="0.6666" style="width: 40px;height: 60px;">4x6</button>
                            <button title="${util.out('Free')}" data-crop-size="" style="width: 60px;height: 45px;">${util.out('Free')}</button>
                        </div>
                        <div class="imageedit-preview" style="min-width:200px;">
                        </div>
                        <div style="margin-top:7px;text-align:right;align-self:flex-end;">
                            <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                            <button title="${util.out('Apply')}" class="input-ok classic-primary">${util.out('Apply')}</button>
                        </div>
                    </div>
                </div>
                
                <div class="is-modal imagelink">
                    <div style="max-width:526px;">

                        <div class="image-src">
                            <input class="input-src" type="text" placeholder="${util.out('Source')}"/>
                            <button title="${util.out('Select')}" class="input-select" style="flex:none;width:50px;height:50px;"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                            <div class="image-larger1" style="position:relative;flex:none;width:50px;height:50px;box-shadow: 0px 3px 6px -6px rgba(0, 0, 0, 0.32);">
                                <form class="form-upload-larger" target="frameTargetImageUpload" method="post" action="${this.builder.opts.largerImageHandler}" enctype="multipart/form-data" style="position:absolute;top:0;left:0;width:100%;height:100%;">
				                    <input id="hidRefId1" name="hidRefId" type="hidden" value="" />
                                    <svg class="is-icon-flex" style="position: absolute;top: 16px;left: 15px;width: 18px;height: 18px;fill:rgb(53, 53, 53);"><use xlink:href="#ion-image"></use></svg>
                                    <input title="${util.out('Select')}" id="fileImage1" name="fileImage" type="file" accept="image/*" style="position:absolute;top:-30px;left:0;width:100%;height:80px;opacity: 0;cursor: pointer;">
                                </form>

                                <iframe id="frameTargetImageUpload" name="frameTargetImageUpload" src="about:blank" style="width:1px;height:1px;position:absolute;top:0;right:-100000px"></iframe>
                            </div>
                        </div>

                        <input class="input-title" type="text" placeholder="Title" style="width:100%;border-top: none;"/>

                        <div class="image-link">
                            <input class="input-link" type="text" placeholder="${util.out('Link')}" style="width:100%;border-top: none;"/>
                            <button title="${util.out('Select')}" class="input-select2" style="flex:none;width:50px;height:50px;"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>
                            <div class="image-larger2" style="position:relative;flex:none;width:50px;height:50px;box-shadow: 0px 3px 6px -6px rgba(0, 0, 0, 0.32);">
                                <form class="form-upload-larger" target="frameTargetImageUpload" method="post" action="${this.builder.opts.largerImageHandler}" enctype="multipart/form-data" style="position:absolute;top:0;left:0;width:100%;height:100%;">
				                    <input id="hidRefId2" name="hidRefId" type="hidden" value="" />
                                    <svg class="is-icon-flex" style="position: absolute;top: 16px;left: 15px;width: 18px;height: 18px;fill:rgb(53, 53, 53);"><use xlink:href="#ion-image"></use></svg>
                                    <input title="${util.out('Select')}" id="fileImage2" name="fileImage" type="file" accept="image/*" style="position:absolute;top:-30px;left:0;width:100%;height:80px;opacity: 0;cursor: pointer;">
                                </form>
                            </div>
                        </div>

                        <label style="display:inline-block;margin-top:14px;margin-bottom:10px;">
                            <input class="input-newwindow" type="checkbox" /> ${util.out('Open New Window')}&nbsp;
                        </label>
                        <div style="text-align:right">
                            <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                            <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                        </div>
                    </div>
                </div>

                <div class="is-modal imageselect" style="z-index:10005">
                    <div style="max-width:800px;height:80%;padding:0;">
                        <iframe style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>
                    </div>
                </div>

                <div id="divImageResizer" data-x=0 data-y=0 class="is-tool moveable resizable">
                </div>
                `;
                
            dom.appendHtml(builderStuff, html);

            // Image Tool (#divImageTool) ~~~~~~~~~~~~

            imageTool = builderStuff.querySelector('#divImageTool');
            this.imageTool = imageTool;
            
            // Image Resizer (#divImageResizer)
            imageResizer = document.querySelector('#divImageResizer');
            this.imageResizer = imageResizer;

            // moveable
            this.builder.moveable = new Moveable(document.body, {
                target: imageResizer, //document.querySelector('.resizable'),
                resizable: true,
                throttleResize: 0,
                keepRatio: true,
            }).on('resize', ({ target, width, height }) => {
                
                if(width===0 || height===0 || isNaN(width) || isNaN(height)) {
                    return;
                }

                // hide image tool
                this.imageTool.style.display = '';

                // hide element tool
                let elementTool = builderStuff.querySelector('.is-element-tool');
                elementTool.style.display = '';

                // get active image
                let activeImage = this.builder.activeImage;
                let bCircular = false;
                if(dom.hasClass(activeImage.parentNode, 'img-circular')) {
                    activeImage = activeImage.parentNode;
                    bCircular = true;
                }
                if(!bCircular) {
                    activeImage.style.width = `${width}px`;
                    activeImage.style.height = 'auto';
                } else {

                    let pl = parseFloat(window.getComputedStyle(activeImage.parentNode).getPropertyValue('padding-left'));
                    let pr = parseFloat(window.getComputedStyle(activeImage.parentNode).getPropertyValue('padding-right'));
                    let maxWidth = activeImage.parentNode.offsetWidth - pl - pr;
                    if(width>=maxWidth) width=maxWidth;
                    if(height>=width) {
                        activeImage.style.width = `${width}px`;
                        activeImage.style.height =`${width}px`;
                        activeImage.querySelector('img').style.width = `${width}px`; 
                        activeImage.querySelector('img').style.height = `${width}px`; 
                    } else {
                        activeImage.style.width = `${width}px`;
                        activeImage.style.height =`${height}px`;
                        activeImage.querySelector('img').style.width = `${width}px`; 
                        activeImage.querySelector('img').style.height = `${height}px`; 
                    }
                }


                // sync (target = imageResizer)
                target.style.top = (activeImage.getBoundingClientRect().top + window.pageYOffset) + 'px';
                target.style.left = (activeImage.getBoundingClientRect().left + window.pageXOffset) + 'px';
                target.style.width = activeImage.offsetWidth + 'px';
                target.style.height = activeImage.offsetHeight + 'px';
                this.repositionHandler(activeImage.offsetWidth, activeImage.offsetHeight);
                
                // https://stackoverflow.com/questions/29908261/prevent-text-selection-on-mouse-drag
                // prevent text selection
                if (document.selection) {
                    document.selection.empty();
                } else {
                    window.getSelection().removeAllRanges();
                }

                // Hide column tool
                let columnTool = builderStuff.querySelector('.is-column-tool');
                dom.removeClass(columnTool, 'active');

            }).on('resizeEnd', ({ target }) => {

                let activeImage = this.builder.activeImage;
                let bCircular = false;
                if(dom.hasClass(activeImage.parentNode, 'img-circular')) {
                    activeImage = activeImage.parentNode;
                    bCircular = true;
                }

                //target = imageResizer
                // var originalWidth = target.getAttribute('data-width');
                // var currentWidth = activeImage.offsetWidth;
                // var percentage = (currentWidth / originalWidth) * 100;
                // activeImage.style.width = percentage + '%';


                // https://stackoverflow.com/questions/25197184/get-the-height-of-an-element-minus-padding-margin-border-widths
                var cs = getComputedStyle(activeImage.parentNode);

                var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
                //var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

                var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
                //var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

                // Element width and height minus padding and border
                var elementWidth = activeImage.parentNode.offsetWidth - paddingX - borderX;
                //var elementHeight = activeImage.parentNode.offsetHeight - paddingY - borderY;

                if(!bCircular) {
                    var parentWidth = elementWidth; //activeImage.parentNode.offsetWidth;
                    var currentWidth = activeImage.offsetWidth;
                    var percentage = (currentWidth / parentWidth) * 100;
                    activeImage.style.width = percentage + '%';
                } 

                if(this.builder.opts.emailMode) {
                    //activeImage.setAttribute('width', percentage + '%');
                    activeImage.setAttribute('width', currentWidth);
                }

                target.setAttribute('data-resized', 1);
                setTimeout(()=>{
                    target.setAttribute('data-resized', 0);
                },300);

                //Trigger Change event
                this.builder.opts.onChange();

                // Show column tool
                let columnTool = builderStuff.querySelector('.is-column-tool');
                dom.addClass(columnTool, 'active');
                
            });

            document.querySelector('.moveable-control-box').style.display = 'none';

            imageResizer.addEventListener('click', () => {

                this.repositionImageTool();

                this.builder.elmTool.repositionElementTool();
            });

            // Browse local image
            let elm = imageTool.querySelector('#fileEmbedImage');
            dom.addEventListener(elm, 'change', (e) => {

                this.builder.uo.saveForUndo();

                var input = e.target;

                let img = this.builder.activeImage;

                /*
                var canvas = document.getElementById('Canvas'),
                context = canvas.getContext('2d');
                var reader = new FileReader();
                reader.addEventListener("load", (e)=>{
                    var src_image = document.querySelector('#_preview');
                    src_image.addEventListener("load", ()=>{
                        canvas.height = src_image.height;
                        canvas.width = src_image.width;
                        context.drawImage(src_image, 0, 0);
                        var imageData = canvas.toDataURL("image/png"); 
                        img.src = imageData;
                    });
                    src_image.src = e.target.result;
                });
                reader.readAsDataURL(input.files[0]);
                return;
                */

                //imageTool.style.display = 'none';

                let imageProgress = builderStuff.querySelector('#divImageProgress');
                imageProgress.style.display = 'table';
                imageProgress.style.width = img.offsetWidth + 'px';
                imageProgress.style.height = img.offsetHeight + 'px';
                imageProgress.style.top = (img.getBoundingClientRect().top + window.pageYOffset) + 'px';
                imageProgress.style.left = (img.getBoundingClientRect().left + window.pageXOffset) + 'px';

                //The #fileEmbedImage triggered 2 times in IE (because of clearInputs below). This makes input.files[0].name returns error on 2nd trigger. Just add try{}!
                try{

                    img.setAttribute('data-filename',input.files[0].name); //needed for saveimage.js | 

                    this.processImage(input.files[0], img,  () => {

                        imageProgress.style.display = 'none';

                        elm = imageTool.querySelector('#fileEmbedImage');
                        elm.value = ''; //clear input

                        //Check if image is part of module snippet. If so, refresh the (active) module (hide imageTool). If not, refresh imageTool position
                        this.refreshIfIsModule(img);

                        //Trigger Change event
                        this.builder.opts.onChange();

                        this.builder.elmTool.refresh();
                    });

                } catch(e) {
                    
                    imageProgress.style.display = 'none';

                }

            });

            // Trigger onImageBrowseClick (if set), will cancel browsing local image
            if (this.builder.opts.onImageBrowseClick) {
                elm = imageTool.querySelector('.image-embed');
                dom.addEventListener(elm, 'click', (e) => {
                    
                    this.builder.opts.onImageBrowseClick();

                    e.preventDefault();
                    return false;
                });
            }


            // Image Link Dialog (.is-modal.imagelink) ~~~~~~~~~~~~

            let modalImageLink = builderStuff.querySelector('.imagelink');

            if(this.builder.opts.largerImageHandler==='') {
                modalImageLink.querySelector('.image-larger1').style.display = 'none';
                modalImageLink.querySelector('.image-larger2').style.display = 'none';
            }

            if (!this.builder.opts.onImageSelectClick && this.builder.opts.imageselect==='' ) {
                modalImageLink.querySelector('.input-select').style.display = 'none';
                modalImageLink.querySelector('.input-select2').style.display = 'none';
            }

            // Open Link dialog. Old: 9886
            elm = imageTool.querySelector('.image-link');
            dom.addEventListener(elm, 'click', () => {

                //imageTool.style.display = 'none';

                document.querySelector('.moveable-control-box').style.display = 'none'; //needed by Safari (prevent z-index problem)
                
                if (this.builder.opts.onImageSettingClick) {

                    this.builder.opts.onImageSettingClick();

                    return false;
                }

                let img = this.builder.activeImage;

                let lnk;
                if(img.parentNode.tagName.toLowerCase() === 'a' && img.parentNode.childElementCount === 1) {
                    lnk = img.parentNode;
                }

                //get values
                let src = img.getAttribute('src'); //img.src;
                let title = img.getAttribute('alt');
                let inputSrc = modalImageLink.querySelector('.input-src');
                if(src.indexOf('base64') === -1) {
                    inputSrc.value = src;
                } else {
                    inputSrc.value = '[Image Data]';
                }
                let inputTitle = modalImageLink.querySelector('.input-title');
                inputTitle.value = title;

                let inputLink = modalImageLink.querySelector('.input-link');
                inputLink.value = '';

                let inputTarget = modalImageLink.querySelector('.input-newwindow');
                inputTarget.checked = false;
                
                if (lnk) {
                    inputLink.value = lnk.getAttribute('href');

                    if (title === '') {
                        let lnkTitle = lnk.getAttribute('title');
                        if(lnkTitle) inputTitle.value = lnkTitle;
                    }

                    var target = lnk.getAttribute('target');
                    if (target === '_blank') {
                        inputTarget.checked = true;
                    } else {
                        inputTarget.checked = false;
                    }
                }

                util.showModal(modalImageLink, true, null, true);

                inputSrc.focus();

            });

            // Cancel
            elm = modalImageLink.querySelector('.input-cancel');
            dom.addEventListener(elm, 'click', () => {

                util.hideModal(modalImageLink);

                document.querySelector('.moveable-control-box').style.display = 'block'; //needed by Safari (prevent z-index problem)

            });

            // Apply link to image
            elm = modalImageLink.querySelector('.input-ok');
            dom.addEventListener(elm, 'click', () => {
                
                this.builder.uo.saveForUndo();

                let img = this.builder.activeImage;

                let lnk;
                if(img.parentNode.tagName.toLowerCase() === 'a' && img.parentNode.childElementCount === 1) {
                    lnk = img.parentNode;
                }

                let src = modalImageLink.querySelector('.input-src').value;
                let title = modalImageLink.querySelector('.input-title').value;
                let link = modalImageLink.querySelector('.input-link').value;

                if(src.indexOf('[Image Data]') === -1){
                    img.setAttribute('src', src);
                } else  {
                    //no change
                }
                
                img.setAttribute('alt', title);

                if (link !== '') {
                    if (lnk) {
                        lnk.setAttribute('href', link);

                        lnk.setAttribute('title', title);

                        if (modalImageLink.querySelector('.input-newwindow').checked) {
                            lnk.setAttribute('target', '_blank');
                        } else {
                            lnk.removeAttribute('target');
                        }

                        if(link.toLowerCase().indexOf('.jpg')!==-1 || link.toLowerCase().indexOf('.jpeg')!==-1 || link.toLowerCase().indexOf('.png')!==-1 || link.toLowerCase().indexOf('.gif')!==-1) {
                            dom.addClass(lnk, 'is-lightbox');
                        } else {
                            dom.removeClass(lnk, 'is-lightbox');
                        }

                    } else {
                        //Create link
                        lnk = dom.createElement('a');
                        lnk.setAttribute('href', link);
                        lnk.setAttribute('title', title);
                        lnk.innerHTML = img.outerHTML;

                        if (modalImageLink.querySelector('.input-newwindow').checked) {
                            lnk.setAttribute('target', '_blank');
                        } else {
                            lnk.removeAttribute('target');
                        }

                        if(link.toLowerCase().indexOf('.jpg')!==-1 || link.toLowerCase().indexOf('.jpeg')!==-1 || link.toLowerCase().indexOf('.png')!==-1 || link.toLowerCase().indexOf('.gif')!==-1) {
                            dom.addClass(lnk, 'is-lightbox');
                        } else {
                            dom.removeClass(lnk, 'is-lightbox');
                        }

                        img.outerHTML = lnk.outerHTML;
                    }

                } else {
                    if (lnk) {
                        //Remove link
                        lnk.outerHTML = lnk.innerHTML;
                    }
                }

                //Check if image is part of module snippet. If so, refresh the (active) module (hide imageTool). If not, refresh imageTool position
                this.refreshIfIsModule(img);

                //Trigger Change event
                this.builder.opts.onChange();

                //Trigger Render event
                this.builder.opts.onRender();

                util.hideModal(modalImageLink);

                this.builder.elmTool.refresh();

            });

            // Select image (opens Asset Manager plugin or custom dialog)
            let divImageSrc = modalImageLink.querySelector('.image-src');
            if (this.builder.opts.onImageSelectClick || this.builder.opts.imageselect ) {
  
                elm = modalImageLink.querySelector('.input-select');
                if(elm) dom.addEventListener(elm, 'click', () => {

                    if(this.builder.opts.onImageSelectClick) {
                                   
                        this.builder.opts.onImageSelectClick({targetInput: modalImageLink.querySelector('.input-src'), theTrigger: elm});

                    } else {

                        let modalImageSelect = builderStuff.querySelector('.is-modal.imageselect');
                        let iframe = modalImageSelect.querySelector('iframe');
                        if(iframe.src === 'about:blank'){
                            iframe.src = this.builder.opts.imageselect;
                        }
                        util.showModal(modalImageSelect);

                        modalImageSelect.setAttribute('data-target', '.input-src'); // set target for value set (see selectImage() in contentbuilder.js)

                    }

                }); 

                elm = modalImageLink.querySelector('.input-select2');
                if(elm) dom.addEventListener(elm, 'click', () => {

                    if(this.builder.opts.onImageSelectClick) {
                                   
                        this.builder.opts.onImageSelectClick({targetInput: modalImageLink.querySelector('.input-link'), theTrigger: elm});

                    } else {

                        let modalImageSelect = builderStuff.querySelector('.is-modal.imageselect');
                        let iframe = modalImageSelect.querySelector('iframe');
                        if(iframe.src === 'about:blank'){
                            iframe.src = this.builder.opts.imageselect;
                        }
                        util.showModal(modalImageSelect);

                        modalImageSelect.setAttribute('data-target', '.input-link'); // set target for value set (see selectImage() in contentbuilder.js)

                    }

                }); 

            } else {
                dom.removeClass(divImageSrc, 'image-select');
            }

            let fileLargerImage1 = modalImageLink.querySelector('#fileImage1');
            dom.addEventListener(fileLargerImage1, 'change', (e) => {

                let element = fileLargerImage1;
                while(element.nodeName.toLowerCase() !== 'form') {
                    element = element.parentNode;
                }
                let frmUpload = element;
            
                dom.addClass(frmUpload, 'please-wait');

                modalImageLink.querySelector('#hidRefId1').value = this.builder.opts.customval;

                // frmUpload.submit();

                if(this.builder.opts.onLargerImageUpload) {

                    this.builder.opts.onLargerImageUpload(e);
                    
                } else {
                    
                    frmUpload.submit();

                }
            });

            let fileLargerImage2 = modalImageLink.querySelector('#fileImage2');
            dom.addEventListener(fileLargerImage2, 'change', (e) => {
            
                let element = fileLargerImage2;
                while(element.nodeName.toLowerCase() !== 'form') {
                    element = element.parentNode;
                }
                let frmUpload = element;

                dom.addClass(frmUpload, 'please-wait');

                modalImageLink.querySelector('#hidRefId2').value = this.builder.opts.customval;

                // frmUpload.submit();

                if(this.builder.opts.onLargerImageUpload) {

                    this.builder.opts.onLargerImageUpload(e);
                    
                } else {
                    
                    frmUpload.submit();

                }
            });


            // Image Edit Dialog (.is-modal.imageedit) ~~~~~~~~~~~~

            let modalImageEdit = builderStuff.querySelector('.imageedit');
            
            // Edit (crop) image
            elm = imageTool.querySelector('.image-edit');
            dom.addEventListener(elm, 'click', () => {

                let img = this.builder.activeImage;
                
                util.showModal(modalImageEdit, true);

                let preview = modalImageEdit.querySelector('.imageedit-preview');

                const maxW = 800;
                const maxH = 550;
                if(img.offsetWidth < maxW && img.offsetHeight < maxH) {
                    preview.style.width = img.offsetWidth + 'px';
                } else {
                    let h = maxW*img.offsetHeight/img.offsetWidth; // test useing maxW
                    if(h<=maxH) { //ok
                        preview.style.width = maxW + 'px';
                    } else {
                        preview.style.height = maxH + 'px';
                    }
                }

                preview.innerHTML = '<img src="" style="max-width:100%"/>';
                let imagePreview = modalImageEdit.querySelector('img');
                imagePreview.src = img.src;

                this.cropper = new Cropper(imagePreview, {
                    zoomable: false
                });

                document.querySelector('.moveable-control-box').style.display = 'none'; //needed by Safari (prevent z-index problem)

            });

            // Set crop proportion
            let cropOptions = modalImageEdit.querySelector('.imageedit-crop');
            let btns = cropOptions.querySelectorAll('button');
            Array.prototype.forEach.call(btns, (btn) => {

                dom.addEventListener(btn, 'click', () => {
                    let aspectRatio = btn.getAttribute('data-crop-size') * 1;
                    this.cropper.setAspectRatio(aspectRatio);
                });

            });      
            
            // Cancel image edit
            let btnCancel = modalImageEdit.querySelector('.input-cancel');
            dom.addEventListener(btnCancel, 'click', () => {
                util.hideModal(modalImageEdit);

                document.querySelector('.moveable-control-box').style.display = 'block'; //needed by Safari (prevent z-index problem)
            });

            // Apply (crop) image
            elm = modalImageEdit.querySelector('.input-ok');
            dom.addEventListener(elm, 'click', () => {
                
                this.builder.uo.saveForUndo();

                let img = this.builder.activeImage;

                let attr = img.getAttribute('data-filename');
                let extension = 'jpg';
                if(attr) {
                    extension = attr.substr((attr.lastIndexOf('.') +1)).toLowerCase();
                } else {
                    // no data-filename found (image from snippets)
                    let f = img.src;
                    if(f.indexOf('/')>-1) img.setAttribute('data-filename',f.substr(f.lastIndexOf('/')+1));
                    else img.setAttribute('data-filename',f);
                    extension = f.substr((f.lastIndexOf('.') +1)).toLowerCase();
                }

                if(extension==='jpg'){
                    img.src = this.cropper.getCroppedCanvas({
                        fillColor: '#fff',
                    }).toDataURL('image/jpeg');
                } else {
                    img.src = this.cropper.getCroppedCanvas({
                    }).toDataURL();
                }

                //Check if image is part of module snippet. If so, refresh the (active) module (hide imageTool). If not, refresh imageTool position
                this.refreshIfIsModule(img);

                //Trigger Change event
                this.builder.opts.onChange();

                util.hideModal(modalImageEdit);
                
                this.builder.elmTool.refresh();
            });     
            
        }

    }

    refreshIfIsModule(elm) {
        let isModule = dom.parentsHasAttribute(elm, 'data-html');
        if(isModule) {
            this.imageTool.style.display = '';


            // Extra: make image[data-image-embed] clickable/editable
            if(elm.hasAttribute('data-sync')) {
                let originalSrc = elm.getAttribute('data-src');
                let originalFilename = elm.getAttribute('data-filename');
                if(originalSrc) {
                    let element = elm;
                    while(!element.getAttribute('data-html')) {
                        element = element.parentNode;
                    }
                    let module = element;
                    
                    let imgs = module.querySelectorAll('img');
                    Array.prototype.forEach.call(imgs, (img) => {
                        if(img.src===originalSrc){
                            img.src = elm.src;
                            img.removeAttribute('data-src');

                            img.setAttribute('data-filename', originalFilename);
                        }
                    });
                    elm.removeAttribute('data-src');
                }
            }


            setTimeout(()=>{
                this.util.refreshModule();
                this.imageTool.style.display = '';
            }, 1000);


        } else {
            this.refresh();
        }
    }

    refresh() {
        if(this.builder.activeImage) {
            
            let imageTool = this.imageTool;
            imageTool.style.display = '';
            setTimeout(()=>{
                
                let elm = this.builder.activeImage;
                if(dom.hasClass(elm.parentNode, 'img-circular')) {
                    elm = elm.parentNode;
                }

                imageTool.style.display = 'flex';
                let _toolwidth = imageTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
         
                let w = elm.offsetWidth;
                let top = elm.getBoundingClientRect().top + window.pageYOffset;
                let left = elm.getBoundingClientRect().left;
                left = left + (w/2 - _toolwidth/2);
                                                
                //Adjust left in case an element is outside the screen
                const _screenwidth = window.innerWidth;
                if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;
    
                imageTool.style.top = top + 'px';
                imageTool.style.left = left + 'px';

                let imageResizer = this.imageResizer;
                imageResizer.style.top = (elm.getBoundingClientRect().top + window.pageYOffset) + 'px';
                imageResizer.style.left = (elm.getBoundingClientRect().left + window.pageXOffset) + 'px';
                imageResizer.style.width = elm.offsetWidth + 'px';
                imageResizer.style.height = elm.offsetHeight + 'px';
                imageResizer.style.display = 'block';
                this.repositionHandler(elm.offsetWidth, elm.offsetHeight);

                // moveable
                this.builder.moveable.updateRect();
                document.querySelector('.moveable-control-box').style.display = 'block';


                if(elm.offsetWidth===0) { // when there is image link applied

                    // let imageTool = this.imageTool;
                    imageTool.style.display = '';
                    this.builder.activeImage =  null;
    
                    // let imageResizer = this.imageResizer;
                    imageResizer.style.display = 'none';
    
                    // moveable
                    imageResizer.style.top = '-10px';
                    imageResizer.style.left = '-10px';
                    imageResizer.style.width = '1px';
                    imageResizer.style.height = '1px';
                    this.builder.moveable.updateRect();
                    document.querySelector('.moveable-control-box').style.display = 'none';

                }

            }, 300); 

        }

    }

    repositionImageTool() { // = refresh(), but without delay
        if(this.builder.activeImage) {

            let imageTool = this.imageTool;

            let elm = this.builder.activeImage;
            if(dom.hasClass(elm.parentNode, 'img-circular')) {
                elm = elm.parentNode;
            }

            imageTool.style.display = 'flex';
            let _toolwidth = imageTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        
            let w = elm.offsetWidth;
            let top = elm.getBoundingClientRect().top + window.pageYOffset;
            let left = elm.getBoundingClientRect().left;
            left = left + (w/2 - _toolwidth/2);
                                            
            //Adjust left in case an element is outside the screen
            const _screenwidth = window.innerWidth;
            if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;

            imageTool.style.top = top + 'px';
            imageTool.style.left = left + 'px';

            let imageResizer = this.imageResizer;
            imageResizer.style.top = (elm.getBoundingClientRect().top + window.pageYOffset) + 'px';
            imageResizer.style.left = (elm.getBoundingClientRect().left + window.pageXOffset) + 'px';
            imageResizer.style.width = elm.offsetWidth + 'px';
            imageResizer.style.height = elm.offsetHeight + 'px';
            imageResizer.style.display = 'block';

            this.repositionHandler(elm.offsetWidth, elm.offsetHeight);

            // moveable
            this.builder.moveable.updateRect();
            document.querySelector('.moveable-control-box').style.display = 'block';
        }

    }

    click(e) {

        let elm = e.target;

        //Image
        if (elm.tagName.toLowerCase() === 'img') {

            /* <img data-fixed src=".." /> (image must be fixed, cannot be replaced) */
            let fixedImage = false;  
            if(elm.hasAttribute('data-fixed')) {
                fixedImage = true;
            }
            if(!fixedImage) {

                this.builder.activeImage =  elm;

                if(dom.hasClass(elm.parentNode, 'img-circular')) {
                    elm = elm.parentNode;
                }
                
                let imageTool = this.imageTool;
                imageTool.style.display = 'flex';
                let _toolwidth = imageTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
         
                let w = elm.offsetWidth;
                let top = elm.getBoundingClientRect().top + window.pageYOffset;
                // let left = elm.getBoundingClientRect().left - 2;
                // left = left + (w - _toolwidth);
                let left = elm.getBoundingClientRect().left;
                left = left + (w/2 - _toolwidth/2);
                                                
                //Adjust left in case an element is outside the screen
                const _screenwidth = window.innerWidth;
                if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;

                imageTool.style.top = top + 'px';
                imageTool.style.left = left + 'px';

                // Image Resizer
                if(!elm.hasAttribute('data-noresize')) { 
                    let imageResizer = this.imageResizer;
                    imageResizer.style.top = (elm.getBoundingClientRect().top + window.pageYOffset) + 'px';
                    imageResizer.style.left = (elm.getBoundingClientRect().left + window.pageXOffset) + 'px';
                    imageResizer.style.width = elm.offsetWidth + 'px';
                    imageResizer.style.height = elm.offsetHeight + 'px';
                    imageResizer.style.display = 'block';
                    this.repositionHandler(elm.offsetWidth, elm.offsetHeight);

                    //Get & save original image width
                    let imgwidth = elm.style.width;
                    let imgwidthpx;
                    if(imgwidth.indexOf('%')!==-1) {
                        imgwidth = imgwidth.replace('%','')*1;
                        imgwidthpx = (elm.offsetWidth*100)/imgwidth;
                    } else {
                        imgwidthpx = elm.offsetWidth;
                    }
                    imageResizer.setAttribute('data-width', Math.round(imgwidthpx));

                    // moveable
                    this.builder.moveable.updateRect();
                    document.querySelector('.moveable-control-box').style.display = 'block';
                    
                } else {

                    let imageResizer = this.imageResizer;
                    imageResizer.style.display = 'none';

                    // moveable
                    imageResizer.style.top = '-10px';
                    imageResizer.style.left = '-10px';
                    imageResizer.style.width = '1px';
                    imageResizer.style.height = '1px';
                    this.builder.moveable.updateRect();
                    document.querySelector('.moveable-control-box').style.display = 'none';

                }
                
                let prog = false;
                if(e.screenX && e.screenX !== 0 && e.screenY && e.screenY !== 0){
                    // console.log('real button click');
                    // Do Nothing
                } else {
                    // console.log('Programmatically');
                    prog = true;
                }
            
                if(prog) {
                    imageTool.style.display = '';

                    let imageResizer = this.imageResizer;
                    imageResizer.style.display = 'none';

                    // moveable
                    imageResizer.style.top = '-10px';
                    imageResizer.style.left = '-10px';
                    imageResizer.style.width = '1px';
                    imageResizer.style.height = '1px';
                    this.builder.moveable.updateRect();
                    document.querySelector('.moveable-control-box').style.display = 'none'; 
                }

                // NOTE:
                // if(this.builder.isTouchSupport) { //prevent keyboard open
                //     const builderStuff = this.util.builderStuff();
                //     const rteTool = builderStuff.querySelector('#divRteTool');
                //     const btnFocus = rteTool.querySelector('button'); 
                //     btnFocus.focus();
                //     setTimeout(()=>{
                //         btnFocus.focus();
                //     },100);
                // }

            } else {

                let imageTool = this.imageTool;
                imageTool.style.display = '';
                this.builder.activeImage =  null;

                let imageResizer = this.imageResizer;
                imageResizer.style.display = 'none';

                // moveable
                imageResizer.style.top = '-10px';
                imageResizer.style.left = '-10px';
                imageResizer.style.width = '1px';
                imageResizer.style.height = '1px';
                this.builder.moveable.updateRect();
                document.querySelector('.moveable-control-box').style.display = 'none';
            }
        } else {

            let imageTool = this.imageTool;
            imageTool.style.display = '';
            this.builder.activeImage =  null;

            let imageResizer = this.imageResizer;
            imageResizer.style.display = 'none';
            
            // moveable
            imageResizer.style.top = '-10px';
            imageResizer.style.left = '-10px';
            imageResizer.style.width = '1px';
            imageResizer.style.height = '1px';
            this.builder.moveable.updateRect();
            document.querySelector('.moveable-control-box').style.display = 'none';
        }        

    }

    // Image Resizer
    repositionHandler(width, height) {
        let imageResizer = document.querySelector('#divImageResizer');
        imageResizer.style.width = width + 'px';
        imageResizer.style.height = height + 'px';
    }

    processImage(file, targetImg, processImageDone) { //file can also be an URL (from the same host), ex. file = "/assets/image.jpg";

        if(!file){
            processImageDone();
            return false;
        }

        if (!document.getElementById('myTmpCanvasNoCrop')) {
            var new_canvas = document.createElement('canvas');
            new_canvas.id = 'myTmpCanvasNoCrop';
            new_canvas.style.display = 'none';
            document.querySelector('body').appendChild(new_canvas);
        }

        if(this.builder.opts.autoResizeImageEmbed) {
            
            // var imgName;
            var extension;
            if(!file.name){
                //file is an URL
                // imgName = file.substr((file.lastIndexOf('/') + 1));
                extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
            } else {
                //file is an image file
                // imgName = file.name;
                extension = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase();
            }
            var type, quality;
            if (extension === 'jpg' || extension === 'jpeg') {
                type = 'image/jpeg';
                quality = this.builder.opts.imageQuality;
            } else {
                type = 'image/png';
                quality = 1;
            }

            loadImage(
                file,
                (img, data)=>{

                    var orientation;
                    if (data.exif) {
                        orientation = data.exif.get('Orientation');
                    }
                    
                    
                    //Check orientation
                    //http://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
                    var initialWidth;
                    var initialHeight;
                    if (4 < orientation && orientation < 9) {
                        //potrait          
                        initialWidth = img.height;
                        initialHeight = img.width;
                    } else {
                        //landscape
                        initialWidth = img.width;
                        initialHeight = img.height;
                    }

                    // Use normal process for small images
                    // if(initialWidth <200 && initialHeight<200) {
                    if(initialWidth <1200 && initialHeight<1200) {
                        let reader = new FileReader();
                        reader.addEventListener('load', (e)=>{
                            if (!document.getElementById('__preview')) {
                                var previewImage = document.createElement('img');
                                previewImage.id = '__preview';
                                previewImage.style.display = 'none';
                                let builderStuff = this.util.builderStuff();
                                dom.appendChild(builderStuff, previewImage);
                            }
                            var src_image = document.querySelector('#__preview');
                            src_image.onload = ()=> {
                                var tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');
                                var context = tmpCanvasNoCrop.getContext('2d');
                                tmpCanvasNoCrop.height = src_image.height;
                                tmpCanvasNoCrop.width = src_image.width;
                                context.drawImage(src_image, 0, 0);
                                
                                var imageData = tmpCanvasNoCrop.toDataURL(type, quality); 
                                
                                targetImg.src = imageData;
                
                                src_image.onload = null;
                                tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                                processImageDone();
                            };
                            src_image.src = e.target.result;
                        });
                        reader.readAsDataURL(file);
                        return;
                    }

                    //Specify target dimension: 2 times bigger than placement, but not more than 1200px
                    var targetWidth = targetImg.clientWidth * 2;
                    if (targetWidth > 1200) targetWidth = 1200;
                    targetWidth = 1200; //force target width to 1200px
                    var targetHeight = (targetWidth * initialHeight) / initialWidth;

                    //Adjust target dimension (in case image is smaller than targeted dimension)
                    var resize = false;
                    // var targetWidth; var targetHeight;
                    if (initialHeight <= targetHeight && initialWidth > targetWidth) {
                        //Original height is smaller than placeholder height. Original width is bigger than placeholder width.
                        //targetWidth = targetWidth;
                        targetHeight = (initialHeight * targetWidth) / initialWidth;
                        if (initialHeight <= targetHeight) {
                            targetHeight = initialHeight;
                            targetWidth = (initialHeight * targetWidth) / targetHeight;
                        }
                        resize = true;
                    } else if (initialWidth <= targetWidth && initialHeight > targetHeight) {
                        //Original width is smaller than placeholder width. Original height is bigger than placeholder height.
                        //targetHeight = targetHeight;
                        targetWidth = (initialWidth * targetHeight) / initialHeight;
                        if (initialWidth <= targetWidth) {
                            targetWidth = initialWidth;
                            targetHeight = (initialWidth * targetHeight) / targetWidth;
                        }
                        resize = true;
                    } else if (initialWidth <= targetWidth && initialHeight <= targetHeight) {
                        //no resize (original image is smaller than placeholder)
                        targetWidth = initialWidth;
                        targetHeight = initialHeight;
                    } else {
                        //targetWidth = targetWidth;
                        targetHeight = (initialHeight * targetWidth) / initialWidth;
                        resize = true;
                    }

                    if (type === 'image/png') {
                        resize = false;
                    }


                    if(!resize) { // NEW: this is to prevent using MegaPixImage (problem with some PNG. PNG doesn't need to resize, so no need to use MegaPixImage)

                        let tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');
                        let context = tmpCanvasNoCrop.getContext('2d');
                        tmpCanvasNoCrop.height = initialHeight;
                        tmpCanvasNoCrop.width = initialWidth;
                        context.drawImage(img, 0, 0);
                        targetImg.onload =  ()=> {

                            targetImg.onload = null;
                            targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality); //finished
                            tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop); 
                            processImageDone();

                        };
                        targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality);
                        
                        return;
                    }

                    //RENDER (tmpCanvasNoCrop)                    
                    var mpImg = new MegaPixImage(img);
                    var tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');

                    mpImg.render(tmpCanvasNoCrop, { width: initialWidth, height: initialHeight, orientation: orientation },  ()=>{

                        if (resize) {

                            //RESIZE (tmpCanvasNoCrop) with good quality.  
                            //var tmpImg = new Image();
                            var iW = initialWidth;
                            var iH = initialHeight;
                            targetImg.onload =  ()=> {

                                this.count++; // count increment

                                iW /= 2;
                                iH /= 2;
                                if (iW < targetWidth || iH < targetHeight) { iW = targetWidth; iH = targetHeight; }

                                var mpImg = new MegaPixImage(targetImg);
                                //console.log(iW + ' ' + iH)
                                mpImg.render(tmpCanvasNoCrop, { width: iW, height: iH },  ()=>{ // must specify both width & height correctly (proportionally) 
                                    
                                    if (iW <= targetWidth || iH <= targetHeight) {

                                        targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality); //finished

                                        //console.log(this.count); // count check
                                        if(this.count===3) {
                                            targetImg.onload = null;
                                            try {
                                                tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop); 
                                            } catch(e) {
                                                // Do Nothing
                                            }
                                            processImageDone();
                                        }

                                        try {
                                            tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop); 
                                        } catch(e) {
                                            // Do Nothing
                                        }
                                        processImageDone();
                                        return false;

                                    }
                                    targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality);

                                    //console.log(this.count); // count check
                                    if(this.count===3) {
                                        targetImg.onload = null;
                                        try {
                                            tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                                        } catch(e) {
                                            // Do Nothing
                                        }
                                        processImageDone();
                                    }
                                });
                            };
                            targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality);

                            this.count = 0; //console.log(this.count); // count start

                        } else {

                            targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality); //finished
                            tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                            processImageDone();
                        }

                    });

                },
                {
                    canvas: false,
                    meta: true
                }
            );

        } else {

            let reader = new FileReader();
            reader.addEventListener('load', (e)=>{
    
                //Problem: image not fully rendered
                // targetImg.onload = ()=> {
                //     let tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');
                //     let context = tmpCanvasNoCrop.getContext('2d');
                //     tmpCanvasNoCrop.height = targetImg.height;
                //     tmpCanvasNoCrop.width = targetImg.width;
                //     context.drawImage(targetImg, 0, 0);
                //     let imageData = tmpCanvasNoCrop.toDataURL("image/png"); 
                //     targetImg.src = imageData;
    
                //     targetImg.onload = null;
                //     //tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                //     processImageDone();
                // }
                // targetImg.src = e.target.result;
    
                //Fix:
                if (!document.getElementById('__preview')) {
                    var previewImage = document.createElement('img');
                    previewImage.id = '__preview';
                    previewImage.style.display = 'none';
                    let builderStuff = this.util.builderStuff();
                    dom.appendChild(builderStuff, previewImage);
                }
                var src_image = document.querySelector('#__preview');
                src_image.onload = ()=> {
                    var tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');
                    var context = tmpCanvasNoCrop.getContext('2d');
                    tmpCanvasNoCrop.height = src_image.height;
                    tmpCanvasNoCrop.width = src_image.width;
                    context.drawImage(src_image, 0, 0);
                    var imageData = tmpCanvasNoCrop.toDataURL(type, quality); 
                    targetImg.src = imageData;
    
                    src_image.onload = null;
                    tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                    processImageDone();
                };
                src_image.src = e.target.result;
    
            });
            reader.readAsDataURL(file);
            return;
            
        }

    }

}

export default Image;


/*! Mega pixel image rendering library for iOS6 Safari | Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com> | MIT license | https://github.com/stomita/ios-imagefile-megapixel */

/**
 * Mega pixel image rendering library for iOS6 Safari
 *
 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
 * which causes unexpected subsampling when drawing it in canvas.
 * By using this library, you can safely render the image with proper stretching.
 *
 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
 * Released under the MIT license
 */

/**
 * Detect subsampling in loaded image.
 * In iOS, larger images than 2M pixels may be subsampled in rendering.
 */
function detectSubsampling(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, -iw + 1, 0);
        // subsampled image becomes half smaller in rendering size.
        // check alpha channel value to confirm image is covering edge pixel or not.
        // if alpha value is 0 image is not covering, hence subsampled.
        return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    } else {
        return false;
    }
}

/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 */
function detectVerticalSquash(img, iw, ih) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
}

/**
 * Rendering image element (with resizing) and get its data URL
 */
function renderImageToDataURL(img, options, doSquash) {
    var canvas = document.createElement('canvas');
    renderImageToCanvas(img, canvas, options, doSquash);
    return canvas.toDataURL('image/jpeg', options.quality || 0.8);
}

/**
 * Rendering image element (with resizing) into the canvas element
 */
function renderImageToCanvas(img, canvas, options, doSquash) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (!(iw+ih)) return;
    var width = options.width, height = options.height;
    var ctx = canvas.getContext('2d');
    ctx.save();
    transformCoordinate(canvas, ctx, width, height, options.orientation);
    var subsampled = detectSubsampling(img);
    if (subsampled) {
        iw /= 2;
        ih /= 2;
    }
    var d = 1024; // size of tiling canvas
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = d;
    var tmpCtx = tmpCanvas.getContext('2d');
    var vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
    var dw = Math.ceil(d * width / iw);
    var dh = Math.ceil(d * height / ih / vertSquashRatio);
    var sy = 0;
    var dy = 0;
    while (sy < ih) {
        var sx = 0;
        var dx = 0;
        while (sx < iw) {
            tmpCtx.clearRect(0, 0, d, d);
            tmpCtx.drawImage(img, -sx, -sy);
            ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
            sx += d;
            dx += dw;
        }
        sy += d;
        dy += dh;
    }
    ctx.restore();
    tmpCanvas = tmpCtx = null;
}

/**
 * Transform canvas coordination according to specified frame size and orientation
 * Orientation value is from EXIF tag
 */
function transformCoordinate(canvas, ctx, width, height, orientation) {
    switch (orientation) {
    case 5:
    case 6:
    case 7:
    case 8:
        canvas.width = height;
        canvas.height = width;
        break;
    default:
        canvas.width = width;
        canvas.height = height;
    }
    switch (orientation) {
    case 2:
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
    case 3:
        // 180 rotate left
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
    case 4:
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
    case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
    case 6:
        // 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
        break;
    case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
    case 8:
        // 90 rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
    default:
        break;
    }
}

var URL = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;

/**
 * MegaPixImage class
 */
function MegaPixImage(srcImage) {
    if (window.Blob && srcImage instanceof Blob) {
        if (!URL) { throw Error('No createObjectURL function found to create blob url'); }
        var img = new Image();
        img.src = URL.createObjectURL(srcImage);
        this.blob = srcImage;
        srcImage = img;
    }
    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
        var _this = this;
        srcImage.onload = srcImage.onerror = function() {
            var listeners = _this.imageLoadListeners;
            if (listeners) {
                _this.imageLoadListeners = null;
                for (var i=0, len=listeners.length; i<len; i++) {
                    listeners[i]();
                }
            }
        };
        this.imageLoadListeners = [];
    }
    this.srcImage = srcImage;
}

/**
 * Rendering megapix image into specified target element
 */
MegaPixImage.prototype.render = function(target, options, callback) {
    if (this.imageLoadListeners) {
        var _this = this;
        this.imageLoadListeners.push(function() { _this.render(target, options, callback); });
        return;
    }
    options = options || {};
    var imgWidth = this.srcImage.naturalWidth, imgHeight = this.srcImage.naturalHeight,
        width = options.width, height = options.height,
        maxWidth = options.maxWidth, maxHeight = options.maxHeight,
        doSquash = !this.blob || this.blob.type === 'image/jpeg';
    if (width && !height) {
        height = (imgHeight * width / imgWidth) << 0;
    } else if (height && !width) {
        width = (imgWidth * height / imgHeight) << 0;
    } else {
        width = imgWidth;
        height = imgHeight;
    }
    if (maxWidth && width > maxWidth) {
        width = maxWidth;
        height = (imgHeight * width / imgWidth) << 0;
    }
    if (maxHeight && height > maxHeight) {
        height = maxHeight;
        width = (imgWidth * height / imgHeight) << 0;
    }
    var opt = { width : width, height : height };
    for (var k in options) opt[k] = options[k];

    var tagName = target.tagName.toLowerCase();
    if (tagName === 'img') {
        target.src = renderImageToDataURL(this.srcImage, opt, doSquash);
    } else if (tagName === 'canvas') {
        renderImageToCanvas(this.srcImage, target, opt, doSquash);
    }
    if (typeof this.onrender === 'function') {
        this.onrender(target);
    }
    if (callback) {
        callback();
    }
    if (this.blob) {
        this.blob = null;
        URL.revokeObjectURL(this.srcImage.src);
    }
};
      
/*
 * JavaScript Load Image
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/**
 * Loads an image for a given File object.
 * Invokes the callback with an img or optional canvas element
 * (if supported by the browser) as parameter:.
 *
 * @param {File|Blob|string} file File or Blob object or image URL
 * @param {Function} [callback] Image load event callback
 * @param {object} [options] Options object
 * @returns {HTMLImageElement|HTMLCanvasElement|FileReader} image object
 */
function loadImage(file, callback, options) {
    var img = document.createElement('img');
    var url;
    img.onerror = function(event) {
        return loadImage.onerror(img, event, file, callback, options);
    };
    img.onload = function(event) {
        return loadImage.onload(img, event, file, callback, options);
    };
    if (typeof file === 'string') {
        loadImage.fetchBlob(
            file,
            function(blob) {
                if (blob) {
                    // eslint-disable-next-line no-param-reassign
                    file = blob;
                    url = loadImage.createObjectURL(file);
                } else {
                    url = file;
                    if (options && options.crossOrigin) {
                        img.crossOrigin = options.crossOrigin;
                    }
                }
                img.src = url;
            },
            options
        );
        return img;
    } else if (
        loadImage.isInstanceOf('Blob', file) ||
        // Files are also Blob instances, but some browsers
        // (Firefox 3.6) support the File API but not Blobs:
        loadImage.isInstanceOf('File', file)
    ) {
        url = img._objectURL = loadImage.createObjectURL(file);
        if (url) {
            img.src = url;
            return img;
        }
        return loadImage.readFile(file, function(e) {
            var target = e.target;
            if (target && target.result) {
                img.src = target.result;
            } else if (callback) {
                callback(e);
            }
        });
    }
}
// The check for URL.revokeObjectURL fixes an issue with Opera 12,
// which provides URL.createObjectURL but doesn't properly implement it:
// var urlAPI =  (URL.revokeObjectURL && URL) || webkitURL;
var urlAPI =  (URL.revokeObjectURL && URL); // Oct 29, 2019

/**
 * Helper function to revoke an object URL
 *
 * @param {HTMLImageElement} img Image element
 * @param {object} [options] Options object
 */
function revokeHelper(img, options) {
    if (img._objectURL && !(options && options.noRevoke)) {
        loadImage.revokeObjectURL(img._objectURL);
        delete img._objectURL;
    }
}

// If the callback given to this function returns a blob, it is used as image
// source instead of the original url and overrides the file argument used in
// the onload and onerror event callbacks:
loadImage.fetchBlob = function(url, callback) {
    callback();
};

loadImage.isInstanceOf = function(type, obj) {
    // Cross-frame instanceof check
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

loadImage.transform = function(img, options, callback, file, data) {
    callback(img, data);
};

loadImage.onerror = function(img, event, file, callback, options) {
    revokeHelper(img, options);
    if (callback) {
        callback.call(img, event);
    }
};

loadImage.onload = function(img, event, file, callback, options) {
    revokeHelper(img, options);
    if (callback) {
        loadImage.transform(img, options, callback, file, {
            originalWidth: img.naturalWidth || img.width,
            originalHeight: img.naturalHeight || img.height
        });
    }
};

loadImage.createObjectURL = function(file) {
    return urlAPI ? urlAPI.createObjectURL(file) : false;
};

loadImage.revokeObjectURL = function(url) {
    return urlAPI ? urlAPI.revokeObjectURL(url) : false;
};

// Loads a given File object via FileReader interface,
// invokes the callback with the event object (load or error).
// The result can be read via event.target.result:
loadImage.readFile = function(file, callback, method) {
    if (FileReader) {
        var fileReader = new FileReader();
        fileReader.onload = fileReader.onerror = callback;
        // eslint-disable-next-line no-param-reassign
        method = method || 'readAsDataURL';
        if (fileReader[method]) {
            fileReader[method](file);
            return fileReader;
        }
    }
    return false;
};

/*
load-image-meta.js
*/

var hasblobSlice =
    typeof Blob !== 'undefined' &&
    (Blob.prototype.slice ||
    Blob.prototype.webkitSlice ||
    Blob.prototype.mozSlice);

loadImage.blobSlice =
    hasblobSlice &&
    function() {
        var slice = this.slice || this.webkitSlice || this.mozSlice;
        return slice.apply(this, arguments);
    };

loadImage.metaDataParsers = {
    jpeg: {
        0xffe1: [], // APP1 marker
        0xffed: [] // APP13 marker
    }
};

// Parses image meta data and calls the callback with an object argument
// with the following properties:
// * imageHead: The complete image head as ArrayBuffer (Uint8Array for IE10)
// The options argument accepts an object and supports the following
// properties:
// * maxMetaDataSize: Defines the maximum number of bytes to parse.
// * disableImageHead: Disables creating the imageHead property.
loadImage.parseMetaData = function(file, callback, options, data) {
    // eslint-disable-next-line no-param-reassign
    options = options || {};
    // eslint-disable-next-line no-param-reassign
    data = data || {};
    var that = this;
    // 256 KiB should contain all EXIF/ICC/IPTC segments:
    var maxMetaDataSize = options.maxMetaDataSize || 262144;
    var noMetaData = !( typeof DataView !== 'undefined' && file && file.size >= 12 && file.type === 'image/jpeg' && loadImage.blobSlice );
    //callback(data);return;
    //noMetaData=true;
    if ( noMetaData || !loadImage.readFile(
        loadImage.blobSlice.call(file, 0, maxMetaDataSize),
        function(e) {
            if (e.target.error) {
                // FileReader error
                // eslint-disable-next-line no-console
                console.log(e.target.error);
                callback(data);
                return;
            }
            // Note on endianness:
            // Since the marker and length bytes in JPEG files are always
            // stored in big endian order, we can leave the endian parameter
            // of the DataView methods undefined, defaulting to big endian.
            var buffer = e.target.result;
            var dataView = new DataView(buffer);
            var offset = 2;
            var maxOffset = dataView.byteLength - 4;
            var headLength = offset;
            var markerBytes;
            var markerLength;
            var parsers;
            var i;
            // Check for the JPEG marker (0xffd8):
            if (dataView.getUint16(0) === 0xffd8) {
                while (offset < maxOffset) {
                    markerBytes = dataView.getUint16(offset);
                    // Search for APPn (0xffeN) and COM (0xfffe) markers,
                    // which contain application-specific meta-data like
                    // Exif, ICC and IPTC data and text comments:
                    if ( (markerBytes >= 0xffe0 && markerBytes <= 0xffef) || markerBytes === 0xfffe ) {
                        // The marker bytes (2) are always followed by
                        // the length bytes (2), indicating the length of the
                        // marker segment, which includes the length bytes,
                        // but not the marker bytes, so we add 2:
                        markerLength = dataView.getUint16(offset + 2) + 2;
                        if (offset + markerLength > dataView.byteLength) {
                            // eslint-disable-next-line no-console
                            console.log('Invalid meta data: Invalid segment size.');
                            break;
                        }
                        parsers = loadImage.metaDataParsers.jpeg[markerBytes];
                        if (parsers) {
                            for (i = 0; i < parsers.length; i += 1) {
                                parsers[i].call( that, dataView, offset, markerLength, data, options );
                            }
                        }
                        offset += markerLength;
                        headLength = offset;
                    } else {
                        // Not an APPn or COM marker, probably safe to
                        // assume that this is the end of the meta data
                        break;
                    }
                }
                // Meta length must be longer than JPEG marker (2)
                // plus APPn marker (2), followed by length bytes (2):
                if (!options.disableImageHead && headLength > 6) {
                    if (buffer.slice) {
                        data.imageHead = buffer.slice(0, headLength);
                    } else {
                        // Workaround for IE10, which does not yet
                        // support ArrayBuffer.slice:
                        data.imageHead = new Uint8Array(buffer).subarray(0, headLength);
                    }
                }
            } else {
                // eslint-disable-next-line no-console
                console.log('Invalid JPEG file: Missing JPEG marker.');
            }
            callback(data);
        },
        'readAsArrayBuffer'
    )
    ) {
        callback(data);
    }
};

// Determines if meta data should be loaded automatically:
loadImage.hasMetaOption = function(options) {
    return options && options.meta;
};

var originalTransform = loadImage.transform;
loadImage.transform = function(img, options, callback, file, data) {
    if (loadImage.hasMetaOption(options)) {
        loadImage.parseMetaData(
            file,
            function(data) {
                originalTransform.call(loadImage, img, options, callback, file, data);
            },
            options,
            data
        );
    } else {
        originalTransform.apply(loadImage, arguments);
    }
};

/*
load-image-exif.js
*/

loadImage.ExifMap = function() {
    return this;
};

loadImage.ExifMap.prototype.map = {
    Orientation: 0x0112
};

loadImage.ExifMap.prototype.get = function(id) {
    return this[id] || this[this.map[id]];
};

loadImage.getExifThumbnail = function(dataView, offset, length) {
    if (!length || offset + length > dataView.byteLength) {
        console.log('Invalid Exif data: Invalid thumbnail data.');
        return;
    }
    return loadImage.createObjectURL(
        new Blob([dataView.buffer.slice(offset, offset + length)])
    );
};

loadImage.exifTagTypes = {
    // byte, 8-bit unsigned int:
    1: {
        getValue: function(dataView, dataOffset) {
            return dataView.getUint8(dataOffset);
        }, size: 1
    },
    // ascii, 8-bit byte:
    2: {
        getValue: function(dataView, dataOffset) {
            return String.fromCharCode(dataView.getUint8(dataOffset));
        },
        size: 1,
        ascii: true
    },
    // short, 16 bit int:
    3: {
        getValue: function(dataView, dataOffset, littleEndian) {
            return dataView.getUint16(dataOffset, littleEndian);
        },
        size: 2
    },
    // long, 32 bit int:
    4: {
        getValue: function(dataView, dataOffset, littleEndian) {
            return dataView.getUint32(dataOffset, littleEndian);
        },
        size: 4
    },
    // rational = two long values, first is numerator, second is denominator:
    5: {
        getValue: function(dataView, dataOffset, littleEndian) {
            return ( dataView.getUint32(dataOffset, littleEndian) / dataView.getUint32(dataOffset + 4, littleEndian) );
        },
        size: 8
    },
    // slong, 32 bit signed int:
    9: {
        getValue: function(dataView, dataOffset, littleEndian) {
            return dataView.getInt32(dataOffset, littleEndian);
        },
        size: 4
    },
    // srational, two slongs, first is numerator, second is denominator:
    10: {
        getValue: function(dataView, dataOffset, littleEndian) {
            return ( dataView.getInt32(dataOffset, littleEndian) / dataView.getInt32(dataOffset + 4, littleEndian) );
        },
        size: 8
    }
};
// undefined, 8-bit byte, value depending on field:
loadImage.exifTagTypes[7] = loadImage.exifTagTypes[1];

loadImage.getExifValue = function( dataView, tiffOffset, offset, type, length, littleEndian) {
    var tagType = loadImage.exifTagTypes[type];
    var tagSize;
    var dataOffset;
    var values;
    var i;
    var str;
    var c;
    if (!tagType) {
        console.log('Invalid Exif data: Invalid tag type.');
        return;
    }
    tagSize = tagType.size * length;
    // Determine if the value is contained in the dataOffset bytes,
    // or if the value at the dataOffset is a pointer to the actual data:
    dataOffset = tagSize > 4 ? tiffOffset + dataView.getUint32(offset + 8, littleEndian) : offset + 8;
    if (dataOffset + tagSize > dataView.byteLength) {
        console.log('Invalid Exif data: Invalid data offset.');
        return;
    }
    if (length === 1) {
        return tagType.getValue(dataView, dataOffset, littleEndian);
    }
    values = [];
    for (i = 0; i < length; i += 1) {
        values[i] = tagType.getValue( dataView, dataOffset + i * tagType.size, littleEndian );
    }
    if (tagType.ascii) {
        str = '';
        // Concatenate the chars:
        for (i = 0; i < values.length; i += 1) {
            c = values[i];
            // Ignore the terminating NULL byte(s):
            if (c === '\u0000') {
                break;
            }
            str += c;
        }
        return str;
    }
    return values;
};

loadImage.parseExifTag = function( dataView, tiffOffset, offset, littleEndian, data ) {
    var tag = dataView.getUint16(offset, littleEndian);
    data.exif[tag] = loadImage.getExifValue( dataView, tiffOffset, offset, dataView.getUint16(offset + 2, littleEndian),  dataView.getUint32(offset + 4, littleEndian), littleEndian );
};

loadImage.parseExifTags = function( dataView, tiffOffset, dirOffset, littleEndian, data ) {
    var tagsNumber, dirEndOffset, i;
    if (dirOffset + 6 > dataView.byteLength) {
        console.log('Invalid Exif data: Invalid directory offset.');
        return;
    }
    tagsNumber = dataView.getUint16(dirOffset, littleEndian);
    dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
    if (dirEndOffset + 4 > dataView.byteLength) {
        console.log('Invalid Exif data: Invalid directory size.');
        return;
    }
    for (i = 0; i < tagsNumber; i += 1) {
        this.parseExifTag( dataView, tiffOffset, dirOffset + 2 + 12 * i, littleEndian, data );
    }
    // Return the offset to the next directory:
    return dataView.getUint32(dirEndOffset, littleEndian);
};

loadImage.parseExifData = function(dataView, offset, length, data, options) {
    if (options.disableExif) {
        return;
    }
    var tiffOffset = offset + 10;
    var littleEndian;
    var dirOffset;
    var thumbnailData;
    // Check for the ASCII code for "Exif" (0x45786966):
    if (dataView.getUint32(offset + 4) !== 0x45786966) {
        // No Exif data, might be XMP data instead
        return;
    }
    if (tiffOffset + 8 > dataView.byteLength) {
        console.log('Invalid Exif data: Invalid segment size.');
        return;
    }
    // Check for the two null bytes:
    if (dataView.getUint16(offset + 8) !== 0x0000) {
        console.log('Invalid Exif data: Missing byte alignment offset.');
        return;
    }
    // Check the byte alignment:
    switch (dataView.getUint16(tiffOffset)) {
    case 0x4949:
        littleEndian = true;
        break;
    case 0x4d4d:
        littleEndian = false;
        break;
    default:
        console.log('Invalid Exif data: Invalid byte alignment marker.');
        return;
    }
    // Check for the TIFF tag marker (0x002A):
    if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002a) {
        console.log('Invalid Exif data: Missing TIFF marker.');
        return;
    }
    // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
    dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
    // Create the exif object to store the tags:
    data.exif = new loadImage.ExifMap();
    // Parse the tags of the main image directory and retrieve the
    // offset to the next directory, usually the thumbnail directory:
    dirOffset = loadImage.parseExifTags( dataView, tiffOffset, tiffOffset + dirOffset, littleEndian, data );
    if (dirOffset && !options.disableExifThumbnail) {
        thumbnailData = { exif: {} };
        dirOffset = loadImage.parseExifTags( dataView, tiffOffset, tiffOffset + dirOffset, littleEndian, thumbnailData );
        // Check for JPEG Thumbnail offset:
        if (thumbnailData.exif[0x0201]) {
            data.exif.Thumbnail = loadImage.getExifThumbnail( dataView, tiffOffset + thumbnailData.exif[0x0201], thumbnailData.exif[0x0202] );
        }
    }
    // Check for Exif Sub IFD Pointer:
    if (data.exif[0x8769] && !options.disableExifSub) {
        loadImage.parseExifTags( dataView, tiffOffset, tiffOffset + data.exif[0x8769], littleEndian, data );
    }
    // Check for GPS Info IFD Pointer:
    if (data.exif[0x8825] && !options.disableExifGps) {
        loadImage.parseExifTags( dataView, tiffOffset, tiffOffset + data.exif[0x8825], littleEndian, data );
    }
};

// Registers the Exif parser for the APP1 JPEG meta data segment:
loadImage.metaDataParsers.jpeg[0xffe1].push(loadImage.parseExifData);

// Adds the following properties to the parseMetaData callback data:
// * exif: The exif tags, parsed by the parseExifData method

// Adds the following options to the parseMetaData method:
// * disableExif: Disables Exif parsing.
// * disableExifThumbnail: Disables parsing of the Exif Thumbnail.
// * disableExifSub: Disables parsing of the Exif Sub IFD.
// * disableExifGps: Disables parsing of the Exif GPS Info IFD.
  