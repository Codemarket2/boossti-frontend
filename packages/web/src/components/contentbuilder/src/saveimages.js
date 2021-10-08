import { Dom } from './util.js';

const dom = new Dom();

class SaveImages{
    constructor(opts = {}) {
        let defaults = {
            page: '',
            container: '.container',            
            handler: 'saveimage.php',
            onComplete: function () { },
            customval: '',
            stuffPlacement: '#_cbhtml',
            hiquality: false,
            // onBase64Upload: function () { },
        };

        this.opts = Object.assign(this, defaults, opts);

        this.count = 0;

        let builderStuff = document.querySelector(this.opts.stuffPlacement);
        if(!builderStuff) {
            builderStuff = document.createElement('div');
            builderStuff.id = '_cbhtml';
            builderStuff.className = 'is-ui';
            dom.appendChild(document.body, builderStuff);
        }
        this.builderStuff = builderStuff;
    }

    save() {
        if(this.opts.page!=='') {
            let area = document.querySelector(this.opts.page);
            this.uploadImages(area);
        } else {
            let areas = document.querySelectorAll(this.opts.container);
            Array.prototype.forEach.call(areas, (area) => {
                this.uploadImages(area);
            });
        }

        //Check per 2 sec if all images have been changed with the new saved images.
        var int = setInterval(()=>{

            let finished = true;
            if(this.opts.page!=='') {
                let area = document.querySelector(this.opts.page);
                finished = this.checkImages(area);
            } else {
                let areas = document.querySelectorAll(this.opts.container);
                Array.prototype.forEach.call(areas, (area) => {
                    if(this.checkImages(area) === false) {
                        finished = false;
                    }
                });
            }

            if (finished) {

                this.opts.onComplete();

                window.clearInterval(int);

                // No need to remove hidden iframes
                // //remove unused forms (previously used for submitting images)
                // for (var i = 1; i <= this.count; i++) {
                //     let frm = this.builderStuff.querySelector('#form-' + i);
                //     frm.parentNode.removeChild(frm);
                // }
            }
        }, 2000);
        
    }

    checkImages(area) {
        const images = area.querySelectorAll('img');
        let returnVal = true;
        Array.prototype.forEach.call(images, (img) => {
            let src = img.getAttribute('src');
            if (typeof src !== typeof undefined && src !== false) {
                if (src.indexOf('base64') !== -1) { //if there is still base64 image, means not yet finished.
                    returnVal = false;
                }
            }
        });
        return returnVal;
    }

    uploadImages(area) {
        if(!area) return;
        //Check all images
        const images = area.querySelectorAll('img');
        Array.prototype.forEach.call(images, (img) => {
            let src = img.getAttribute('src');
            if (typeof src !== typeof undefined && src !== false) {
                if (src.indexOf('base64') !== -1) {

                    // let customcode = false;
                    // if(dom.parentsHasAttribute(img, 'data-html')){
                    //     customcode = true;
                    // }
                    // let subblock = false;
                    // if(dom.parentsHasAttribute(img, 'data-subblock')){
                    //     subblock = true;
                    // }
                    // if(!customcode || (customcode && subblock)) {

                    // }


                    if(this.opts.onBase64Upload) {

                        //Read image (base64 string)
                        let image = src;
                        image = image.replace(/^data:image\/(png|jpeg);base64,/, '');

                        let filename = img.getAttribute('data-filename');

                        this.opts.onBase64Upload(img, image, filename); // target image, base64 string, filename

                    } else {
                        
                        this.count++;

                        //Read image (base64 string)
                        let image = src;
                        image = image.replace(/^data:image\/(png|jpeg);base64,/, '');

                        //Prepare form to submit image
                        if(!this.builderStuff.querySelector('#form-' + this.count)) {
                            var html = '<form id="form-' + this.count + '" target="frame-' + this.count + '" method="post" enctype="multipart/form-data">' +
                                '<input id="hidimg-' + this.count + '" name="hidimg-' + this.count + '" type="hidden" />' +
                                '<input id="hidname-' + this.count + '" name="hidname-' + this.count + '" type="hidden" />' +
                                '<input id="hidtype-' + this.count + '" name="hidtype-' + this.count + '" type="hidden" />' +
                                '<input id="hidcustomval-' + this.count + '" name="hidcustomval-' + this.count + '" type="hidden" />' +
                                '' +
                                '<input name="count" value="' + this.count + '" type="hidden" />' +
                                '<iframe id="frame-' + this.count + '" name="frame-' + this.count + '" style="width:1px;height:1px;border:none;position:absolute;z-index:-100000;left:-5px;"></iframe>' +
                            '</form>';
                            this.builderStuff.insertAdjacentHTML('beforeend', html);
                        }

                        //Give ID to image
                        img.setAttribute('id', 'img-' + this.count);

                        //Set hidden field with image (base64 string) to be submitted
                        this.builderStuff.querySelector('#hidimg-' + this.count).value = image;

                        //Set hidden field with custom value to be submitted
                        this.builderStuff.querySelector('#hidcustomval-' + this.count).value = this.customval;

                        //Set hidden field with file name to be submitted
                        let filename = img.getAttribute('data-filename');
                        if(filename){
                            let filename_without_ext = filename.substr(0, filename.lastIndexOf('.')) || filename;
                            filename_without_ext = filename_without_ext.toLowerCase().replace(/ /g, '-');
                            this.builderStuff.querySelector('#hidname-' + this.count).value = filename_without_ext;
                        }

                        //Set hidden field with file extension to be submitted
                        if (this.opts.hiquality) {
                            //If high quality is set true, set image as png
                            this.builderStuff.querySelector('#hidtype-' + this.count).value = 'png'; //high quality
                        } else {
                            //If high quality is set false, depend on image extension
                            var extension = filename.substr((filename.lastIndexOf('.') + 1));
                            extension = extension.toLowerCase();
                            if (extension === 'jpg' || extension === 'jpeg') {
                                this.builderStuff.querySelector('#hidtype-' + this.count).value = 'jpg';
                            } else {
                                this.builderStuff.querySelector('#hidtype-' + this.count).value = 'png';
                            }
                        }

                        //Submit form
                        this.builderStuff.querySelector('#form-' + this.count).setAttribute('action', this.opts.handler + (this.opts.handler.indexOf('?') >= 0 ? '&' : '?') + 'count=' + this.count);
                        this.builderStuff.querySelector('#form-' + this.count).submit();

                        //Note: the submitted image will be saved on the server 
                        //by saveimage.php (if using PHP) or saveimage.ashx (if using .NET)
                        //and the image src will be changed with the new saved image.
                        
                    }

                }
            }
        });

    }

}

export default SaveImages;