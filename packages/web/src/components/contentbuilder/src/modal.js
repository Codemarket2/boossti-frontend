class Modal {
    constructor(opts = {}) {

        let defaults = {
            
            animateModal: false,
            elementToAnimate: '',
            stuffPlacement: '#_cbhtml',

        };

        this.opts = Object.assign(this, defaults, opts);

        this.id = this.makeId();

        let builderStuff = document.querySelector(this.opts.stuffPlacement);
        if(!builderStuff) {
            builderStuff = document.createElement('div');
            builderStuff.id = '_cbhtml';
            document.body.appendChild(builderStuff);
        }
        this.builderStuff = builderStuff;

        // Stuff placement for this (single) instance
        const objStuff = document.createElement('div');
        objStuff.id = this.id;
        builderStuff.appendChild(objStuff);
        this.objStuff = objStuff;

    }

    confirm(message, callback, animated) {

        let html = `<div class="is-modal is-confirm">
            <div style="max-width:526px;text-align:center;">
                <p>${message}</p>
                <button title="${this.out('Delete')}" class="input-ok classic">${this.out('Delete')}</button>
            </div>
        </div>`;

        let confirmModal = this.objStuff.querySelector('.is-confirm');
        if(!confirmModal) {
            this.objStuff.insertAdjacentHTML('beforeend', html);
            confirmModal = this.builderStuff.querySelector('.is-confirm');
        }

        this.show(confirmModal, false, () => {

            //this function runs when overlay is clicked. Remove modal.
            confirmModal.parentNode.removeChild(confirmModal);

            //do task
            callback(false);

        }, animated);

        let buttonok = confirmModal.querySelector('.is-confirm .input-ok');
        this.addEventListener(buttonok, 'click', () => {

            this.hide(confirmModal);
            confirmModal.parentNode.removeChild(confirmModal); //remove modal

            //do task
            callback(true);
        });
    }

    show(modal, overlayStay, cancelCallback, animated) {

        this.addClass(modal, 'active');

        // animated param (if set) will overide global setting
        let animate = false;
        if( !(typeof animated === 'undefined' || animated === null) ){ // animated param is set
            animate = animated;
        } else { // if animated param is not set
            animate = this.opts.animateModal; // use global setting
        }

        if(animate) {
            const buildercontainers = document.querySelectorAll(this.opts.elementToAnimate);
            Array.prototype.forEach.call(buildercontainers, (buildercontainer) => {
                buildercontainer.style.transform = 'scale(0.98)';
                buildercontainer.style.WebkitTransform= 'scale(0.98)';
                buildercontainer.style.MozTransform= 'scale(0.98)';
            });
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
                this.addEventListener(overlay, 'click', () => {

                    //cancelCallback
                    if (cancelCallback) cancelCallback();

                    this.hide(modal);
                });
            }
        }
    }

    hide(modal) {
        if(this.opts.elementToAnimate!=='') {
            const buildercontainers = document.querySelectorAll(this.opts.elementToAnimate);
            Array.prototype.forEach.call(buildercontainers, (buildercontainer) => {
                buildercontainer.style.transform = '';
                buildercontainer.style.WebkitTransform= '';
                buildercontainer.style.MozTransform= '';
            });
        }

        this.removeClass(modal, 'active');
    }

    // http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
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

    addClass(element, classname) {
        if(!element) return;
        if(this.hasClass(element,classname)) return;
        if(element.classList.length===0) element.className = classname;
        else element.className = element.className + ' ' + classname;
    }

    removeClass(element, classname) {
        if(!element) return;
        if(element.classList.length>0) {
            element.className = element.className.replace(classname, '');
        }
    }

    hasClass(element, classname) {
        if(!element) return false;
        return element.classList ? element.classList.contains(classname) : new RegExp('\\b'+ classname+'\\b').test(element.className);
    }

    addEventListener(parent, type, listener) {
        parent.addEventListener(type, listener);
    }

}

export default Modal;