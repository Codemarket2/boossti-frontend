import { Dom, Util } from './util.js';
import HtmlUtil from './html.js';

const dom = new Dom();

class UndoRedo {
    constructor(builder) {
        this.builder = builder;
        this.undoList = [];
    }

    readStyles() {
        if(this.builder.opts.undoContainerOnly) return '';

        let css = '';

        let i, src;

        let links = document.getElementsByTagName('link');
        for (i = 0; i < links.length; i++) {
            src = links[i].href.toLowerCase();
            if (src.indexOf('basetype-') !== -1) {
                css += links[i].outerHTML;
            }
        }

        links = document.getElementsByTagName('link');
        for (i = 0; i < links.length; i++) {
            src = links[i].href.toLowerCase();
            if (src.indexOf('basetype-') !== -1) {
                //noop
            } else if (src.indexOf('type-') !== -1) {
                css += links[i].outerHTML;
            }
        }

        return css;

    }

    writeStyles(styles) {
        if(this.builder.opts.undoContainerOnly) return;

        let i, src;

        let links = document.getElementsByTagName('link');
        for (i = 0; i < links.length; i++) {
            src = links[i].href.toLowerCase();
            if (src.indexOf('basetype-') !== -1) {
                links[i].parentNode.removeChild(links[i]);
            } else if (src.indexOf('type-') !== -1) {
                links[i].parentNode.removeChild(links[i]);
            }
        }

        let head = document.getElementsByTagName('head')[0];
        dom.appendHtml(head, styles);

    }

    readHtml() {
        const htmlutil = new HtmlUtil(this.builder); 
        if(this.builder.opts.page!=='' && !this.builder.opts.undoContainerOnly) {
            let wrapper = document.querySelector(this.builder.opts.page);
            return htmlutil.readHtml(wrapper, false);
        } else {
            const builders = document.querySelectorAll(this.builder.opts.container);
            let html = '';
            Array.prototype.forEach.call(builders, (builder) => {
                // if(html==='') {
                //     html = htmlutil.readHtml(builder, false);
                // } else {
                //     html+= '####|####' + htmlutil.readHtml(builder, false);
                // }
                html += htmlutil.readHtml(builder, false) + '####|####'; //new
            });
            html = html.substr(0,html.length-9); //new
            return html;
        }
    }

    writeHtml(html) {
        if(this.builder.opts.page!=='' && !this.builder.opts.undoContainerOnly) {
            let wrapper = document.querySelector(this.builder.opts.page);

            // wrapper.innerHTML = html;

            // Use createContextualFragment() to make embedded script executable
            // https://ghinda.net/article/script-tags/
            var range = document.createRange();
            wrapper.innerHTML = '';
            wrapper.appendChild(range.createContextualFragment(html));
            
        } else {
            const builders = document.querySelectorAll(this.builder.opts.container);
            let n = 0;
            Array.prototype.forEach.call(builders, (builder) => {
                
                // builder.innerHTML = html.split('####|####')[n];

                // Use createContextualFragment() to make embedded script executable
                // https://ghinda.net/article/script-tags/
                var range = document.createRange();
                builder.innerHTML = '';
                builder.appendChild(range.createContextualFragment(html.split('####|####')[n]));
                
                n++;
            });
        }
    }

    saveForUndo(checkLater) {

        if(this.builder.undoRedoStyles) {

            if(this.undoList[120]) {

                let saves = this.undoList[120][0];
                let html = saves.split('###$###')[1];

                // Styles doesn't need to be checked. saveForUndoCheck is true only after colorpicker or gradient picker opened
                // (because after opened, user may not make changes, so checking for content change is needed).
                // This relates to html content, not styles. So we always check html content, not styles. 

                if(this.builder.saveForUndoCheck) {
                    if(html===this.readHtml()) {

                        // no change
                        // console.log('no change');

                        if(checkLater===true) this.builder.saveForUndoCheck = true;
                        else this.builder.saveForUndoCheck = false;

                        return;
                    }
                }

            }

        } else {

            if(this.undoList[120]) {
                let html = this.undoList[120][0];

                if(this.builder.saveForUndoCheck) {
                    if(html===this.readHtml()) {

                        // no change
                        // console.log('no change');

                        if(checkLater===true) this.builder.saveForUndoCheck = true;
                        else this.builder.saveForUndoCheck = false;

                        return;
                    }
                }
            }
        }

        if(checkLater===true) this.builder.saveForUndoCheck = true;
        else this.builder.saveForUndoCheck = false;

        // console.log('save');

        this.undoList[140] = this.undoList[139]; // addition
        this.undoList[139] = this.undoList[138];
        this.undoList[138] = this.undoList[137];
        this.undoList[137] = this.undoList[136];
        this.undoList[136] = this.undoList[135];
        this.undoList[135] = this.undoList[134];
        this.undoList[134] = this.undoList[133];
        this.undoList[133] = this.undoList[132];
        this.undoList[132] = this.undoList[131];
        this.undoList[131] = this.undoList[130];

        this.undoList[130] = this.undoList[129];
        this.undoList[129] = this.undoList[128];
        this.undoList[128] = this.undoList[127];
        this.undoList[127] = this.undoList[126];
        this.undoList[126] = this.undoList[125];
        this.undoList[125] = this.undoList[124];
        this.undoList[124] = this.undoList[123];
        this.undoList[123] = this.undoList[122];
        this.undoList[122] = this.undoList[121];
        this.undoList[121] = this.undoList[120];

        if(this.builder.undoRedoStyles) {

            let styles = this.readStyles();
            let html = this.readHtml();
            let saves = ' ' + styles + '###$###' + html;

            this.undoList[120] =  [saves, null];

        } else {

            this.undoList[120] =  [this.readHtml(), null];

        }

    }
    
    doUndo() {

        if(!this.undoList[120]) return;
        if(this.builder.undoRedoInProcess === true) return; // do not precess if previous operation is still running

        // console.log('undo');

        this.builder.undoRedoInProcess = true;

        this.undoList[99] = this.undoList[100]; 
        this.undoList[100] = this.undoList[101];
        this.undoList[101] = this.undoList[102];
        this.undoList[102] = this.undoList[103];
        this.undoList[103] = this.undoList[104];
        this.undoList[104] = this.undoList[105];
        this.undoList[105] = this.undoList[106];
        this.undoList[106] = this.undoList[107];
        this.undoList[107] = this.undoList[108];
        this.undoList[108] = this.undoList[109];
        this.undoList[109] = this.undoList[110];
        this.undoList[110] = this.undoList[111];
        this.undoList[111] = this.undoList[112];
        this.undoList[112] = this.undoList[113];
        this.undoList[113] = this.undoList[114];
        this.undoList[114] = this.undoList[115];
        this.undoList[115] = this.undoList[116];
        this.undoList[116] = this.undoList[117];
        this.undoList[117] = this.undoList[118];
        this.undoList[118] = this.undoList[119];

        if(this.builder.undoRedoStyles) {

            let styles = this.readStyles();
            let html = this.readHtml();
            let saves = ' ' + styles + '###$###' + html;

            this.undoList[119] =  [saves, null];

            // -

            saves = this.undoList[120][0];
            styles = saves.split('###$###')[0].trim();
            html = saves.split('###$###')[1];

            this.writeStyles(styles);
            this.writeHtml(html); 

        } else {

            this.undoList[119] = [this.readHtml(), null];

            let html = this.undoList[120][0];
            this.writeHtml(html); 

        }

        this.builder.applyBehavior();
        this.builder.opts.onChange();

        this.undoList[120] = this.undoList[121];
        this.undoList[121] = this.undoList[122];
        this.undoList[122] = this.undoList[123];
        this.undoList[123] = this.undoList[124];
        this.undoList[124] = this.undoList[125];
        this.undoList[125] = this.undoList[126];
        this.undoList[126] = this.undoList[127];
        this.undoList[127] = this.undoList[128];
        this.undoList[128] = this.undoList[129];
        this.undoList[129] = this.undoList[130];
        this.undoList[130] = this.undoList[131];
        this.undoList[131] = this.undoList[132];
        this.undoList[132] = this.undoList[133];
        this.undoList[133] = this.undoList[134];
        this.undoList[134] = this.undoList[135];
        this.undoList[135] = this.undoList[136];
        this.undoList[136] = this.undoList[137];
        this.undoList[137] = this.undoList[138];
        this.undoList[138] = this.undoList[139];
        this.undoList[139] = this.undoList[140];
        this.undoList[140] = this.undoList[141];

        const util = new Util(this.builder);
        util.clearActiveCell();
        util.clearAfterUndoRedo();

        let elm = document.querySelector('[data-saveforundo]');
        if(elm) {
            let panel = document.querySelector('.is-side.elementstyles');
            dom.addClass(panel, 'active');
            setTimeout(()=>{
                elm.click();
            }, 700);
        } else {
            let panel = document.querySelector('.is-side.elementstyles');
            dom.removeClass(panel, 'active');
        }
        
        if(this.builder.opts.onUndo) {
            this.builder.opts.onUndo();
        }

        this.builder.undoRedoInProcess = false;

    }
    
    doRedo() {
        if(!this.undoList[119]) return;
        if(this.builder.undoRedoInProcess === true) return; // do not precess if previous operation is still running

        // console.log('redo');

        this.builder.undoRedoInProcess = true;

        this.undoList[141] = this.undoList[140];
        this.undoList[140] = this.undoList[139]; 
        this.undoList[139] = this.undoList[138];
        this.undoList[138] = this.undoList[137];
        this.undoList[137] = this.undoList[136];
        this.undoList[136] = this.undoList[135];
        this.undoList[135] = this.undoList[134];
        this.undoList[134] = this.undoList[133];
        this.undoList[133] = this.undoList[132];
        this.undoList[132] = this.undoList[131];
        this.undoList[131] = this.undoList[130];
        this.undoList[130] = this.undoList[129];
        this.undoList[129] = this.undoList[128];
        this.undoList[128] = this.undoList[127];
        this.undoList[127] = this.undoList[126];
        this.undoList[126] = this.undoList[125];
        this.undoList[125] = this.undoList[124];
        this.undoList[124] = this.undoList[123];
        this.undoList[123] = this.undoList[122];
        this.undoList[122] = this.undoList[121];
        this.undoList[121] = this.undoList[120];

        if(this.builder.undoRedoStyles) {

            let styles = this.readStyles();
            let html = this.readHtml();
            let saves = ' ' + styles + '###$###' + html;

            this.undoList[120] =  [saves, null];

            // -

            saves = this.undoList[119][0];
            styles = saves.split('###$###')[0].trim();
            html = saves.split('###$###')[1];

            this.writeStyles(styles);
            this.writeHtml(html); 

        } else {

            this.undoList[120] = [this.readHtml(), null];

            let html = this.undoList[119][0];
            this.writeHtml(html);

        }

        this.builder.applyBehavior();
        this.builder.opts.onChange();

        this.undoList[119] = this.undoList[118];
        this.undoList[118] = this.undoList[117];
        this.undoList[117] = this.undoList[116];
        this.undoList[116] = this.undoList[115];
        this.undoList[115] = this.undoList[114];
        this.undoList[114] = this.undoList[113];
        this.undoList[113] = this.undoList[112];
        this.undoList[112] = this.undoList[111];
        this.undoList[111] = this.undoList[110];
        this.undoList[110] = this.undoList[109];
        this.undoList[109] = this.undoList[108];
        this.undoList[108] = this.undoList[107];
        this.undoList[107] = this.undoList[106];
        this.undoList[106] = this.undoList[105];
        this.undoList[105] = this.undoList[104];
        this.undoList[104] = this.undoList[103];
        this.undoList[103] = this.undoList[102];
        this.undoList[102] = this.undoList[101];
        this.undoList[101] = this.undoList[100];
        this.undoList[100] = this.undoList[99];
        this.undoList[99] = null;

        const util = new Util(this.builder);
        util.clearActiveCell();
        util.clearAfterUndoRedo();
        
        let elm = document.querySelector('[data-saveforundo]');
        if(elm) {
            let panel = document.querySelector('.is-side.elementstyles');
            dom.addClass(panel, 'active');
            setTimeout(()=>{
                elm.click();
            }, 700);
        } else {
            let panel = document.querySelector('.is-side.elementstyles');
            dom.removeClass(panel, 'active');
        }

        if(this.builder.opts.onRedo) {
            this.builder.opts.onRedo();
        }

        this.builder.undoRedoInProcess = false;
    }

}
export default UndoRedo;