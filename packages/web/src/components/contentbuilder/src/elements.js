import { Dom, Util } from './util.js';
import Image from './elementimage.js';
import Hyperlink from './elementhyperlink.js';
import Spacer from './elementspacer.js';
import Module from './elementmodule.js';
import Code from './elementcode.js';
import Iframe from './elementiframe.js';
import Table from './elementtable.js';

const dom = new Dom();

export class Element {

    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        this.hyperlink = new Hyperlink(builder);
        this.image = new Image(builder);
        this.spacer =  new Spacer(builder);
        this.module =  new Module(builder);
        this.code =  new Code(builder);
        this.iframe =  new Iframe(builder);
        this.table =  new Table(builder);

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        window.addEventListener('keydown', (e) => {

            if(e.keyCode === 46) { //delete
                if(this.builder.activeIcon) {
                    if(dom.parentsHasClass(e.target, 'is-builder')) {
                        // Delete icon
                        if(this.builder.activeIcon.parentNode.tagName.toLowerCase() === 'a' && this.builder.activeIcon.parentNode.childNodes.length === 1) {
                            let link = this.builder.activeIcon.parentNode;
                            link.parentNode.removeChild(link);
                            // direct
                            const linkTool = builderStuff.querySelector('#divLinkTool');
                            linkTool.style.display = '';
                        } else {
                            this.builder.activeIcon.parentNode.removeChild(this.builder.activeIcon);
                        }
                        e.preventDefault();
                    }
                }
            }

            if(e.keyCode === 8) { //backspace                
                if(this.builder.activeIcon) {
                    if(dom.parentsHasClass(e.target, 'is-builder')) {
                        // Delete icon
                        if(this.builder.activeIcon.parentNode.tagName.toLowerCase() === 'a' && this.builder.activeIcon.parentNode.childNodes.length === 1) {
                            let link = this.builder.activeIcon.parentNode;
                            link.parentNode.removeChild(link);
                            // direct
                            const linkTool = builderStuff.querySelector('#divLinkTool');
                            linkTool.style.display = '';
                        } else {
                            this.builder.activeIcon.parentNode.removeChild(this.builder.activeIcon);
                        }
                        e.preventDefault();
                    }
                }
            }
        }, false);
       
    }

    applyBehavior(col) {

        // Set contentEditable FALSE on special elements

        let sociallinks = col.querySelectorAll('.is-social');
        Array.prototype.forEach.call(sociallinks, (sociallink) => {
            sociallink.contentEditable = false;
        });

        let spacers = col.querySelectorAll('.spacer');
        Array.prototype.forEach.call(spacers, (spacer) => {
            spacer.contentEditable = false;
        });

        let lines = col.querySelectorAll('hr');
        Array.prototype.forEach.call(lines, (line) => {
            line.contentEditable = false;
        });

        // Others

        let links = col.querySelectorAll('a');
        Array.prototype.forEach.call(links, (link) => {
            let linkDisplay = dom.getStyle(link, 'display');
            if(linkDisplay === 'inline-block'){
                //link button
                link.contentEditable = true;
                if(link.parentNode.tagName.toLowerCase() !== 'span') {
                    link.outerHTML = '<span contenteditable="false">' + link.outerHTML  + '</span>';
                } else {
                    // has span
                    if(link.parentNode.childElementCount === 1) {
                        link.parentNode.contentEditable = false;
                    }
                }
            }
        });
        
        //iframe overlay (need to be added so that embeded video, map, etc can be selected). First click will disable/hide the overlay. Outside click will re-enable it.
        let divs = col.querySelectorAll('.embed-responsive');
        Array.prototype.forEach.call(divs, (div) => {
            let overlay = div.querySelector('.ovl');
            if(!overlay) {
                dom.appendHtml(div, '<div class="ovl" style="position:absolute;background:#fff;opacity:0.01;cursor:pointer;top:0;left:0px;width:100%;height:100%;z-index:1"></div>');
                overlay = div.querySelector('.ovl');

                dom.addEventListener(overlay, 'click', () => {
                    overlay.style.display = 'none';
                });
            }
        }); 

    }

    click(col, e) {

        const elm = e.target;  

        /*
        let noedit = false;
        if (col.hasAttribute('data-noedit')) { // Column is not (text) editable.
            noedit = true;
        }

        let _protected = false;
        if (col.hasAttribute('data-protected')) { // Column is not (text) editable and also: cannot be deleted, moved or duplicated.
            _protected = true;
        }
        */

        let customcode = false;
        let subblock = false;
        if (col.hasAttribute('data-html')) { // Column contains custom code.
            customcode = true;
            if(dom.parentsHasAttribute(elm, 'data-subblock')) {
                subblock = true;
            }
        }

        if (!customcode /*&& !noedit && !_protected*/ || subblock) {

            // spacer
            this.spacer.click(e);

            // Icon
            const icons = document.querySelectorAll('.icon-active');
            Array.prototype.forEach.call(icons, (icon) => {
                dom.removeClass(icon, 'icon-active');
            });
            this.builder.activeIcon = null;
            if(elm.tagName.toLowerCase() === 'i' && elm.innerHTML === '') {

                dom.addClass(elm, 'icon-active');

                dom.selectElementContents(elm);

                this.builder.activeIcon = elm;
            }

            // Image (must be placed before //Link)
            this.image.click(e);

            // Link
            this.hyperlink.click(col, e);
            if((elm.tagName.toLowerCase() === 'a' || dom.parentsHasTag(elm, 'a')) && !customcode) {
                e.preventDefault();
            }

            //Table
            this.table.click(e);

            //Iframe
            this.iframe.click(e); 

        } else {
            this.util.hideControls();

            // Extra: make image[data-image-embed] clickable/editable
            if(e.target.tagName.toLowerCase() === 'img' && e.target.hasAttribute('data-image-embed')) {

                this.image.click(e);

                if(e.target.hasAttribute('data-sync')) {
                    let img = e.target;
                    img.setAttribute('data-src', img.src);
                }          
            }
        }
        
        //Custom Code
        this.code.click(col, e);

        //Module
        this.module.click(col, e);

    }

}

export default Element;

