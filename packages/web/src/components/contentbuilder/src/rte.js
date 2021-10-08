/*
LATER:
- Get/show current font size, line height & letter spacing
- Click toggle button shows gray highlight
- Image di luar domain gak bisa di-edit (kasih warning)
*/

import { Util, Dom } from './util.js';
import ColorPicker from './colorpicker.js';
import Hyperlink from './elementhyperlink.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class Rte{
    constructor(builder) {

        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        this.elementStyleEditor = new ElementStyleEditor(builder);

        this.hyperlink = new Hyperlink(builder);

        let rteTool = builderStuff.querySelector('#divRteTool');
        let elementRteTool;
        let rteAlignOptions;
        let rteFormattingOptions;
        let rteColorPicker;
        let rteListOptions;
        let rteFontFamilyOptions;
        let rteParagraphOptions;
        let rteMoreOptions;
        let elementRteMoreOptions;
        let rteTextSettingOptions;
        let rteIconOptions;
        let rteCustomTagOptions;
        if(!rteTool){
            
            let customtag_button = '';
            var customTagsHtml = '';
            if( builder.opts.customTags.length > 0 ) {
                customtag_button = '<button class="rte-tags"><svg class="is-icon-flex" style="width:14px;height:14px"><use xlink:href="#ion-code-working"></use></svg></button>';
            
                for (let j = 0; j < builder.opts.customTags.length; j++) {       
                    customTagsHtml+=`<button data-value="${builder.opts.customTags[j][1]}"> ${builder.opts.customTags[j][0]} </button>`;
                }
            }

            let html_rtemore = '';
            for (var j = 0; j < builder.opts.buttonsMore.length; j++) {
                var btn = builder.opts.buttonsMore[j].toLowerCase();
                if(btn==='createlink') html_rtemore += `<button title="${util.out('Hyperlink')}" class="rte-link"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-link"></use></svg></button>`;
                else if(btn==='icon' && !this.builder.opts.emailMode) html_rtemore += `<button title="${util.out('Icon')}" class="rte-icon"><svg class="is-icon-flex" style="width:14px;height:14px;margin-top:2px;"><use xlink:href="#ion-android-happy"></use></svg></button>`;
                else if(btn==='removeformat') html_rtemore += `<button title="${util.out('Clean')}" class="rte-clean"><svg class="is-icon-flex" style="width:11px;height:11px;"><use xlink:href="#icon-clean"></use></svg></button>`;
                
                else if(btn==='bold') html_rtemore += `<button title="${util.out('Bold')}" class="rte-format" data-command="bold"><span style="font-family:serif;font-size:14px;">B</span></button>`;
                else if(btn==='italic') html_rtemore += `<button title="${util.out('Italic')}" class="rte-format" data-command="italic"><span style="font-family:serif;font-size:14px;font-style:italic;">i</span></button>`;
                else if(btn==='underline') html_rtemore += `<button title="${util.out('Underline')}" class="rte-format" data-command="underline"><span style="font-family:serif;font-size:14px;text-decoration:underline;">U</span></button>`;
                // else if(btn==='createlink') html_rtemore += `<button title="${util.out('Hyperlink')}" class="rte-link"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-link"></use></svg></button>`; 
                else if(btn==='align') html_rtemore += `<button title="${util.out('Align')}" class="rte-align"><svg class="is-icon-flex" style="width:12px;height:12px;margin-top:-2px;"><use xlink:href="#icon-align-full"></use></svg></button>`;
                else if(btn==='list') html_rtemore += `<button title="${util.out('List')}" class="rte-list"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#icon-list-bullet"></use></svg></button>`;
                else if(btn==='color') html_rtemore += `<button title="${util.out('Color')}" class="rte-color"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>`; 
                else if(btn==='formatting') html_rtemore += `<button title="${util.out('Formatting')}" class="rte-formatting"><span style="font-family:serif;font-size:15px;display:inline-block;">A</span></button>`;
                
                else if(btn==='tags') html_rtemore += customtag_button;
                else if(btn==='image') html_rtemore += `<button title="${util.out('Image')}" class="rte-image"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-image"></use></svg></button>`;
                else if(btn==='gridtool') html_rtemore += `<button title="${util.out('Grid Tool')}" class="rte-grideditor"><svg class="is-icon-flex" style="margin-right:-3px;"><use xlink:href="#ion-grid"></use></svg></button>`;
                else if(btn==='html') html_rtemore += `<button title="${util.out('HTML')}" class="rte-html"><svg class="is-icon-flex" style="margin-right:-3px;width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>`;
                else if(btn==='preferences') html_rtemore += `<button title="${util.out('Preferences')}" class="rte-preferences"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-wrench"></use></svg></button>`;
                else if(btn==='addsnippet') html_rtemore += `<button title="${util.out('Add Snippet')}" class="rte-addsnippet"><svg class="is-icon-flex" style="width:18px;height:18px;margin-top:-1px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>`;
                else if(btn==='formatpara') html_rtemore += `<button title="${util.out('Paragraph')}" class="rte-paragraph"><span style="font-family:serif;font-size:14px;display:inline-block;margin-top:2px;">H</span></button>`;
                else if(btn==='font') html_rtemore += `<button title="${util.out('Font')}" class="rte-fontfamily"><span style="font-family:serif;font-size:18px;text-transform:none;display:inline-block;margin-top: -3px;">a</span></button>`;
                else if(btn==='textsettings') html_rtemore += `<button title="${util.out('Text Settings')}" class="rte-textsettings"><svg class="is-icon-flex" style="width:16px;height:16px;"><use xlink:href="#ion-ios-settings"></use></svg></button>`;
                else if(btn==='undo') html_rtemore += `<button title="${util.out('Undo')}" class="rte-undo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-undo"></use></svg></button>`;
                else if(btn==='redo') html_rtemore += `<button title="${util.out('Redo')}" class="rte-redo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-redo"></use></svg></button>`;
                else if(btn==='|') {
                    html_rtemore += '<div class="rte-separator"></div>';
                } else {
                    html_rtemore += `<button title="button not found" data-plugin="${btn}">-</button>`; //temporary (later will be replaced with plugin button)
                }
            }

            let html_rte = '';
            for (j = 0; j < builder.opts.buttons.length; j++) {      
                btn = builder.opts.buttons[j].toLowerCase();
                if(btn==='bold') html_rte += `<button title="${util.out('Bold')}" class="rte-format" data-command="bold"><span style="font-family:serif;font-size:14px;">B</span></button>`;
                else if(btn==='italic') html_rte += `<button title="${util.out('Italic')}" class="rte-format" data-command="italic"><span style="font-family:serif;font-size:14px;font-style:italic;">i</span></button>`;
                else if(btn==='underline') html_rte += `<button title="${util.out('Underline')}" class="rte-format" data-command="underline"><span style="font-family:serif;font-size:14px;text-decoration:underline;">U</span></button>`;
                else if(btn==='createlink') html_rte += `<button title="${util.out('Hyperlink')}" class="rte-link"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-link"></use></svg></button>`; 
                else if(btn==='align') html_rte += `<button title="${util.out('Align')}" class="rte-align"><svg class="is-icon-flex" style="width:12px;height:12px;margin-top:-2px;"><use xlink:href="#icon-align-full"></use></svg></button>`;
                else if(btn==='formatpara') html_rte += `<button title="${util.out('Paragraph')}" class="rte-paragraph"><span style="font-family:serif;font-size:14px;display:inline-block;margin-top:2px;">H</span></button>`;
                else if(btn==='color') html_rte += `<button title="${util.out('Color')}" class="rte-color"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>`; 
                else if(btn==='formatting') html_rte += `<button title="${util.out('Formatting')}" class="rte-formatting"><span style="font-family:serif;font-size:15px;display:inline-block;">A</span></button>`;
                else if(btn==='list') html_rte += `<button title="${util.out('List')}" class="rte-list"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#icon-list-bullet"></use></svg></button>`;
                else if(btn==='textsettings') html_rte += `<button title="${util.out('Text Settings')}" class="rte-textsettings"><svg class="is-icon-flex" style="width:16px;height:16px;"><use xlink:href="#ion-ios-settings"></use></svg></button>`;
                else if(btn==='icon' && !this.builder.opts.emailMode) html_rte += `<button title="${util.out('Icon')}" class="rte-icon"><svg class="is-icon-flex" style="width:14px;height:14px;margin-top:2px"><use xlink:href="#ion-android-happy"></use></svg></button>`;
                else if(btn==='tags') html_rte += customtag_button;
                else if(btn==='removeformat') html_rte += `<button title="${util.out('Clean')}" class="rte-format" data-command="clean"><svg class="is-icon-flex" style="width:11px;height:11px;"><use xlink:href="#icon-clean"></use></svg></button>`;
                else if(btn==='font') html_rte += `<button title="${util.out('Font')}" class="rte-fontfamily"><span style="font-family:serif;font-size:18px;text-transform:none;display:inline-block;margin-top: -3px;">a</span></button>`;
                else if(btn==='image') html_rte += `<button title="${util.out('Image')}" class="rte-image"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-image"></use></svg></button>`;
                else if(btn==='gridtool') html_rte += `<button title="${util.out('Grid Tool')}" class="rte-grideditor"><svg class="is-icon-flex" style="margin-right:-3px;width:17px;height:17px;"><use xlink:href="#ion-grid"></use></svg></button>`;
                else if(btn==='html') html_rte += `<button title="${util.out('HTML')}" class="rte-html"><svg class="is-icon-flex" style="margin-right:-3px;width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>`;
                else if(btn==='preferences') html_rte += `<button title="${util.out('Preferences')}" class="rte-preferences"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-wrench"></use></svg></button>`;
                else if(btn==='addsnippet') html_rte += `<button title="${util.out('Add Snippet')}" class="rte-addsnippet"><svg class="is-icon-flex" style="width:18px;height:18px;margin-top:-1px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>`; 
                else if(btn==='undo') html_rte += `<button title="${util.out('Undo')}" class="rte-undo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-undo"></use></svg></button>`;
                else if(btn==='redo') html_rte += `<button title="${util.out('Redo')}" class="rte-redo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-redo"></use></svg></button>`;
                else if(btn==='more' && html_rtemore!=='') html_rte += `<button title="${util.out('More')}" class="rte-more"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-more"></use></svg></button>`;
                else if(btn==='|') {
                    html_rte += '<div class="rte-separator"></div>';
                } else {
                    html_rte += `<button title="button not found" data-plugin="${btn}">-</button>`; //temporary (later will be replaced with plugin button)
                }

            }
            
            if(this.builder.opts.toolbarAddSnippetButton && html_rte.indexOf('rte-addsnippet')===-1 && html_rtemore.indexOf('rte-addsnippet')===-1){
                html_rte = `<button title="${util.out('Add Snippet')}" class="rte-addsnippet"><svg class="is-icon-flex" style="width:18px;height:18px;margin-top:-1px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>` + html_rte;
            }

            if(html_rtemore !=='' && html_rte.indexOf('rte-more')===-1){
                html_rte = html_rte + `<button title="${util.out('More')}" class="rte-more"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-more"></use></svg></button>`;
            }

            // Element Toolbar
            let html_elementrtemore = '';
            for (j = 0; j < builder.opts.elementButtonsMore.length; j++) {
                btn = builder.opts.elementButtonsMore[j].toLowerCase();
                if(btn==='gridtool') html_elementrtemore += `<button title="${util.out('Grid Tool')}" class="rte-grideditor"><svg class="is-icon-flex" style="margin-right:-3px;"><use xlink:href="#ion-grid"></use></svg></button>`;
                else if(btn==='html') html_elementrtemore += `<button title="${util.out('HTML')}" class="rte-html"><svg class="is-icon-flex" style="margin-right:-3px;width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>`;
                else if(btn==='preferences') html_elementrtemore += `<button title="${util.out('Preferences')}" class="rte-preferences"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-wrench"></use></svg></button>`;
                else if(btn==='addsnippet') html_elementrtemore += `<button title="${util.out('Add Snippet')}" class="rte-addsnippet"><svg class="is-icon-flex" style="width:18px;height:18px;margin-top:-1px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>`;
                else if(btn==='undo') html_elementrtemore += `<button title="${util.out('Undo')}" class="rte-undo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-undo"></use></svg></button>`;
                else if(btn==='redo') html_elementrtemore += `<button title="${util.out('Redo')}" class="rte-redo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-redo"></use></svg></button>`;
                else if(btn==='|') {
                    html_elementrtemore += '<div class="rte-separator"></div>';
                } else {
                    html_elementrtemore += `<button title="button not found" data-plugin="${btn}">-</button>`; //temporary (later will be replaced with plugin button)
                }
            }

            let html_elementrte = '';
            for (j = 0; j < builder.opts.elementButtons.length; j++) {      
                btn = builder.opts.elementButtons[j].toLowerCase();
                if(btn==='left') html_elementrte += `<button title="${util.out('Align Left')}" data-align="left"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-left"></use></svg></button>`;
                else if(btn==='center') html_elementrte += `<button title="${util.out('Align Center')}" data-align="center"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-center"></use></svg></button>`;
                else if(btn==='right') html_elementrte += `<button title="${util.out('Align Right')}" data-align="right"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-right"></use></svg></button>`;
                else if(btn==='full') html_elementrte += `<button title="${util.out('Align Full')}" data-align="justify"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-full"></use></svg></button>`;
                else if(btn==='gridtool') html_elementrte += `<button title="${util.out('Grid Tool')}" class="rte-grideditor"><svg class="is-icon-flex" style="margin-right:-3px;width:17px;height:17px;"><use xlink:href="#ion-grid"></use></svg></button>`;
                else if(btn==='html') html_elementrte += `<button title="${util.out('HTML')}" class="rte-html"><svg class="is-icon-flex" style="margin-right:-3px;width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>`;
                else if(btn==='preferences') html_elementrte += `<button title="${util.out('Preferences')}" class="rte-preferences"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-wrench"></use></svg></button>`;
                else if(btn==='addsnippet') html_elementrte += `<button title="${util.out('Add Snippet')}" class="rte-addsnippet"><svg class="is-icon-flex" style="width:18px;height:18px;margin-top:-1px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>`; 
                else if(btn==='undo') html_elementrte += `<button title="${util.out('Undo')}" class="rte-undo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-undo"></use></svg></button>`;
                else if(btn==='redo') html_elementrte += `<button title="${util.out('Redo')}" class="rte-redo"><svg class="is-icon-flex" style="margin-top:2px;width:15px;height:15px;"><use xlink:href="#ion-ios-redo"></use></svg></button>`;
                else if(btn==='more' && html_elementrtemore!=='') html_elementrte += `<button title="${util.out('More')}" class="rte-more"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-more"></use></svg></button>`;
                else if(btn==='|') {
                    html_elementrte += '<div class="rte-separator"></div>';
                } else {
                    html_elementrte += `<button title="button not found" data-plugin="${btn}">-</button>`; //temporary (later will be replaced with plugin button)
                }
            }

            if(this.builder.opts.toolbarAddSnippetButton && html_elementrte.indexOf('rte-addsnippet')===-1 && html_elementrtemore.indexOf('rte-addsnippet')===-1){
                html_elementrte = `<button title="${util.out('Add Snippet')}" class="rte-addsnippet"><svg class="is-icon-flex" style="width:18px;height:18px;margin-top:-1px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>` + html_rte;
            }

            if(html_elementrtemore !=='' && html_elementrte.indexOf('rte-more')===-1){
                html_elementrte = html_elementrte + `<button title="${util.out('More')}" class="rte-more"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-more"></use></svg></button>`;
            }

            // <div class="is-draggable" style="width: 5px;height: 45pxpx;background:#fff;cursor: move;"></div>
            // <div style="height:55px;background:#fff;border-top:#f5f5f5 1px solid;">
            // </div>
            let html = `<div class="is-rte-tool" style="position:fixed;flex-direction:column;display:none;">
                <div style="display:flex">
                    ${html_rte}
                </div>
            </div>

            <div class="is-elementrte-tool" style="position:fixed;flex-direction:column;display:none;">
                <div style="display:flex">
                    ${html_elementrte}
                </div>
            </div>

            <div class="rte-formatting-options is-rte-pop">
                <div>
                    <button title="${util.out('Strikethrough')}" class="rte-format" data-command="strikethrough" style="float:left"><svg class="is-icon-flex" style="width:17px;height:17px;"><use xlink:href="#icon-strike"></use></svg></button>
                    <button title="${util.out('Superscript')}" class="rte-format" data-command="superscript" style="float:left"><span style="font-family:serif;font-size:13px;">x</span><sup style="font-size:10px">2</sup></button>
                    <button title="${util.out('Subscript')}" class="rte-format" data-command="subscript" style="float:left"><span style="font-family:serif;font-size:13px;">x</span><sub style="font-size:10px">2</sub></button>
                    <button title="${util.out('Uppercase')}" class="rte-format" data-command="uppercase" style="float:left"><span style="font-family:serif;font-size:14px;display:inline-block;text-transform: none;">Aa</span></button>
                    <button title="${util.out('Clean')}" class="rte-format" data-command="clean"><svg class="is-icon-flex" style="width:11px;height:11px;"><use xlink:href="#icon-clean"></use></svg></button>
                </div>
            </div>

            <div class="rte-align-options is-rte-pop">
                <div>
                    <button title="${util.out('Align Left')}" data-align="left"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-left"></use></svg></button>
                    <button title="${util.out('Align Center')}" data-align="center"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-center"></use></svg></button>
                    <button title="${util.out('Align Right')}" data-align="right"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-right"></use></svg></button>
                    <button title="${util.out('Align Full')}" data-align="justify"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-align-full"></use></svg></button>
                </div>
            </div>

            <div class="rte-list-options is-rte-pop">
                <div>
                    <button title="${util.out('Bullets')}" data-action="insertUnorderedList"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-list-bullet"></use></svg></button>
                    <button title="${util.out('Numbering')}" data-action="insertOrderedList"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-list-number"></use></svg></button>
                    <button title="${util.out('Indent')}" data-action="indent"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-indent"></use></svg></button>
                    <button title="${util.out('Outdent')}" data-action="outdent"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#icon-outdent"></use></svg></use></svg></svg></button>
                </div>
            </div>

            <div class="rte-paragraph-options is-rte-pop">
                <div>
                    <div title="${util.out('Heading 1')}" data-block="h1"><h1>Heading 1</h1></div>
                    <div title="${util.out('Heading 2')}" data-block="h2"><h2>Heading 2</h2></div>
                    <div title="${util.out('Heading 3')}" data-block="h3"><h3>Heading 3</h3></div>
                    <div title="${util.out('Heading 4')}" data-block="h4"><h4>Heading 4</h4></div>
                    <div title="${util.out('Paragraph')}" data-block="p"><p>Paragraph</p></div>
                    <div title="${util.out('Preformatted')}" data-block="pre"><p style="font-family:courier;">Preformatted</p></div>
                </div>
            </div>

            <div class="rte-fontfamily-options is-rte-pop">
                <iframe src="about:blank"></iframe>
            </div>

            <div class="rte-color-picker is-rte-pop" data-command="forecolor">
                <div class="is-pop-tabs">
                    <div class="is-pop-tab-item active" data-value="forecolor">${util.out('Forecolor')}</div>
                    <div class="is-pop-tab-item" data-value="backcolor">${util.out('Backcolor')}</div>
                </div>
                <div class="rte-color-picker-area"></div>
            </div>
            
            <div class="rte-textsetting-options is-rte-pop">
                <div>
                    <div class="is-label" style="margin-top:0;border-top:none">${util.out('Font Size')}</div>
                    <div class="rte-fontsize-options" style="display: flex;flex-flow: wrap;">
                        <button title="14px" data-value="14">14</button>
                        <button title="16px" data-value="16">16</button>
                        <button title="18px" data-value="18">18</button>
                        <button title="21px" data-value="21">21</button>
                        <button title="24px" data-value="24">24</button>
                        <button title="28px" data-value="28">28</button>
                        <button title="32px" data-value="32">32</button>
                        <!--<button title="35px" data-value="35">35</button>-->
                        <button title="38px" data-value="38">38</button>
                        <!--<button title="42px" data-value="42">42</button>-->
                        <button title="48px" data-value="48">48</button>
                        <!--<button title="54px" data-value="54">54</button>-->
                        <button title="60px" data-value="60">60</button>
                        <!--<button title="68px" data-value="68">68</button>-->
                        <button title="76px" data-value="76">76</button>
                        <!--<button title="84px" data-value="84">84</button>-->
                        <button title="96px" data-value="96">96</button>
                        <button title="${util.out('Decrease')}" data-value="-" style="font-size:13px">-</button>
                        <button title="${util.out('Increase')}" data-value="+" style="font-size:13px">+</button>
                        <button title="${util.out('Clear')}" data-value=""><svg class="is-icon-flex" style="width:18px;height:18px;margin-top: 2px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
                    </div>
                    <div class="is-label">${util.out('Line Spacing')}</div>
                    <div class="rte-lineheight-options" style="display: flex;flex-flow: wrap;">
                        <button title="1" data-value="1">1</button>
                        <button title="1.2" data-value="1.2">1.2</button>
                        <button title="1.4" data-value="1.4">1.4</button>
                        <button title="1.6" data-value="1.6">1.6</button>
                        <button title="1.8" data-value="1.8">1.8</button>
                        <button title="2" data-value="2">2</button>
                        <button title="2.2" data-value="2.2">2.2</button>
                        <button title="${util.out('Decrease')}" data-value="-" style="font-size:13px">-</button>
                        <button title="${util.out('Increase')}" data-value="+" style="font-size:13px">+</button>
                        <button title="${util.out('Clear')}" data-value=""><svg class="is-icon-flex" style="width:18px;height:18px;margin-top: 2px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
                    </div>
                    <div class="is-label">${util.out('Letter Spacing')}</div>
                    <div class="rte-letterspacing-options" style="display: flex;flex-flow: wrap;">
                        <button title="1" data-value="1">1</button>
                        <button title="2" data-value="2">2</button>
                        <button title="${util.out('Decrease')}" data-value="-" style="font-size:13px">-</button>
                        <button title="${util.out('Increase')}" data-value="+" style="font-size:13px">+</button>
                        <button title="${util.out('Clear')}" data-value=""><svg class="is-icon-flex" style="width:18px;height:18px;margin-top: 2px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>
                    </div>
                </div>
            </div>

            <div class="is-modal insertimage">
                <div style="max-width:560px;">
                    <div class="is-browse-area">
                        <div class="is-drop-area">
                            <input id="fileInsertImage" type="file" accept="image/*" />
                            <div class="drag-text">
                                <p style="display:flex;justify-content:center;align-items:center;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:20px;height:20px;"><use xlink:href="#ion-camera"></use></svg> <span style="margin-left:5px;margin-top:3px;"> ${util.out('Drag and drop an image or click to browse.')} </span></p>
                            </div>
                        </div>
                        <div class="is-preview-area">
                            <div><img id="imgInsertImagePreview" alt="" /><i class="ion-ios-close-empty"></i></div>
                        </div>
                    </div>    
                    <p>${util.out('Or Specify Image Source')}:</p>
                    ${ ((this.builder.opts.onImageSelectClick+'').replace( /\s/g, '') !=='function(){}' || this.builder.opts.imageselect!=='' ? `<div class="image-src clearfix" style="margin-bottom: 12px;"><input class="input-src" type="text" placeholder="${util.out('Source')}"><button title="${util.out('Select')}" class="input-select" style="flex:none;width:50px;height:50px;"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button></div>` : `<div class="image-src clearfix" style="margin-bottom: 12px;"><input class="input-src" type="text" placeholder="${util.out('Source')}"></div>`)}
                    <div style="text-align:right">
                        <button title="${util.out('Cancel')}" class="input-cancel classic-secondary">${util.out('Cancel')}</button>
                        <button title="${util.out('Ok')}" class="input-ok classic-primary">${util.out('Ok')}</button>
                    </div>
                </div>
            </div>

            <div class="rte-icon-options is-rte-pop">
                <iframe id="ifrIconInsert" src="about:blank"></iframe>
            </div>

            <div class="rte-customtag-options is-rte-pop">
                <div>${customTagsHtml}</div>
            </div>

            <div class="rte-more-options is-rte-pop">
                <div>
                ${html_rtemore}
                </div>
            </div>

            <div class="elementrte-more-options is-rte-pop">
                <div>
                ${html_elementrtemore}
                </div>
            </div>
            `;

            dom.appendHtml(builderStuff, html);
            rteTool = builderStuff.querySelector('.is-rte-tool');
            elementRteTool = builderStuff.querySelector('.is-elementrte-tool');
            rteMoreOptions = builderStuff.querySelector('.rte-more-options');
            elementRteMoreOptions = builderStuff.querySelector('.elementrte-more-options');

            rteAlignOptions = builderStuff.querySelector('.rte-align-options');
            rteFormattingOptions = builderStuff.querySelector('.rte-formatting-options');
            rteColorPicker = builderStuff.querySelector('.rte-color-picker');
            rteListOptions = builderStuff.querySelector('.rte-list-options');
            rteFontFamilyOptions = builderStuff.querySelector('.rte-fontfamily-options');
            rteParagraphOptions = builderStuff.querySelector('.rte-paragraph-options');
            rteTextSettingOptions = builderStuff.querySelector('.rte-textsetting-options');
            rteIconOptions = builderStuff.querySelector('.rte-icon-options');
            rteCustomTagOptions = builderStuff.querySelector('.rte-customtag-options');

            // Prepare for tooltip
            let elms = rteTool.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            elms = elementRteTool.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            elms = rteAlignOptions.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            elms = rteFormattingOptions.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            elms = rteListOptions.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            elms = rteMoreOptions.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });
            elms = elementRteMoreOptions.querySelectorAll('[title]');
            Array.prototype.forEach.call(elms, (elm) => {
                elm.setAttribute('data-title',elm.getAttribute('title'));
            });


            if(this.builder.isTouchSupport) {
                // On iPad, on double click text to select word, getSelected() won't return the word, instead it returns empty
                // So this is needed to call getSelected() after 'selectionchange' that is triggered after double click a text.
                document.addEventListener('selectionchange', function() {
                    if(dom.checkEditable()){
                        var text = dom.getSelected();
                        if(text.trim()!==''){
                            //save selection
                            util.saveSelection();
                        }
                    } 
                }, false);

            }

        }
        this.rteTool = rteTool;
        this.elementRteTool = elementRteTool;
        this.rteAlignOptions = rteAlignOptions;
        this.rteFormattingOptions = rteFormattingOptions;
        this.rteColorPicker = rteColorPicker;
        this.rteListOptions = rteListOptions;
        this.rteFontFamilyOptions = rteFontFamilyOptions;
        this.rteParagraphOptions = rteParagraphOptions;
        this.rteMoreOptions = rteMoreOptions;
        this.elementRteMoreOptions = elementRteMoreOptions;
        this.rteTextSettingOptions = rteTextSettingOptions;
        this.rteIconOptions = rteIconOptions;
        this.rteCustomTagOptions = rteCustomTagOptions;

        this.positionToolbar();

        // Formatting
        let btnRteFormatting = this.rteTool.querySelector('button.rte-formatting'); 
        btnRteFormatting = btnRteFormatting ? btnRteFormatting:this.rteMoreOptions.querySelector('button.rte-formatting');
        if(btnRteFormatting) dom.addEventListener(btnRteFormatting, 'click', () => {

            const pop = this.rteFormattingOptions;
            const top = btnRteFormatting.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteFormatting.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;
            
            if(!dom.hasClass(pop,'active')){  
                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';      
                    pop.style.right = 'auto';             
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });

        // Align
        let btnRteAlign = this.rteTool.querySelector('button.rte-align'); 
        btnRteAlign = btnRteAlign ? btnRteAlign:this.rteMoreOptions.querySelector('button.rte-align');
        if(btnRteAlign) dom.addEventListener(btnRteAlign, 'click', () => {

            const pop = this.rteAlignOptions;
            const top = btnRteAlign.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteAlign.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  
                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';      
                    pop.style.right = 'auto';             
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });

        // List
        let btnRteList = this.rteTool.querySelector('button.rte-list'); 
        btnRteList = btnRteList ? btnRteList:this.rteMoreOptions.querySelector('button.rte-list');
        if(btnRteList) dom.addEventListener(btnRteList, 'click', () => {

            const pop = this.rteListOptions;
            const top = btnRteList.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteList.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  
                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';     
                    pop.style.right = 'auto';              
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });


        // Custom Tags
        let btnRteTags = this.rteTool.querySelector('button.rte-tags'); 
        btnRteTags = btnRteTags ? btnRteTags:this.rteMoreOptions.querySelector('button.rte-tags');
        if(btnRteTags) dom.addEventListener(btnRteTags, 'click', () => {

            const pop = this.rteCustomTagOptions;
            const top = btnRteTags.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteTags.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  
                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';          
                    pop.style.right = 'auto';         
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }

                if(dom.parentsHasClass(btnRteTags,'rte-more-options')) {
                    // Adjustment if button is placed on 2nd bar (div.rte-more-options)
                    if(this.builder.opts.toolbar === 'left') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = (left + 54) + 'px';     
                        pop.style.right = 'auto';              
                    } else if(this.builder.opts.toolbar === 'right') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = 'auto';
                        const viewportWidth = window.innerWidth;
                        pop.style.right = (viewportWidth - left + 9) + 'px';  
                    } else {
                        pop.style.top = (top + 54 - 6) + 'px';

                        if(btnRteTags.getBoundingClientRect().left + 45 -parseInt(this.rteMoreOptions.style.left) < pop.offsetWidth) {
                            pop.style.left = (parseInt(this.rteMoreOptions.style.left)) + 'px';
                        } else if ((parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - btnRteTags.getBoundingClientRect().left + 45) < pop.offsetWidth) {
                            pop.style.left = (parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - w) + 'px';
                        } 
                        else {
                            // Do Nothing
                        }
                        
                        pop.style.right = 'auto';   
                    }
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });

        // Paragraph
        let btnRteParagraph = this.rteTool.querySelector('button.rte-paragraph'); 
        btnRteParagraph = btnRteParagraph ? btnRteParagraph:this.rteMoreOptions.querySelector('button.rte-paragraph');
        if(btnRteParagraph) dom.addEventListener(btnRteParagraph, 'click', () => {

            const pop = this.rteParagraphOptions;
            const top = btnRteParagraph.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteParagraph.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  
                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';          
                    pop.style.right = 'auto';         
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }

                if(dom.parentsHasClass(btnRteParagraph,'rte-more-options')) {
                    // Adjustment if button is placed on 2nd bar (div.rte-more-options)
                    if(this.builder.opts.toolbar === 'left') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = (left + 54) + 'px';     
                        pop.style.right = 'auto';              
                    } else if(this.builder.opts.toolbar === 'right') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = 'auto';
                        const viewportWidth = window.innerWidth;
                        pop.style.right = (viewportWidth - left + 9) + 'px';  
                    } else {
                        pop.style.top = (top + 54 - 6) + 'px';
                        pop.style.left = (parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - w) + 'px';
                        pop.style.right = 'auto';   
                    }
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

            this.getState();

        });

        // Font Family
        let iframe = rteFontFamilyOptions.querySelector('iframe');
        var doc = iframe.contentWindow.document;
        doc.open();
        if(!this.builder.opts.emailMode) {
            doc.write(util.getFontFamilyHTML());
        } else {
            doc.write(util.getFontFamilyEmail());
        }
        doc.close();

        let btnRteFontFamily = this.rteTool.querySelector('button.rte-fontfamily'); 
        btnRteFontFamily = btnRteFontFamily ? btnRteFontFamily:this.rteMoreOptions.querySelector('button.rte-fontfamily');
        if(btnRteFontFamily) dom.addEventListener(btnRteFontFamily, 'click', () => {

            const pop = this.rteFontFamilyOptions;
            const top = btnRteFontFamily.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteFontFamily.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  

                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';          
                    pop.style.right = 'auto';         
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }

                if(dom.parentsHasClass(btnRteFontFamily,'rte-more-options')) {
                    // Adjustment if button is placed on 2nd bar (div.rte-more-options)
                    if(this.builder.opts.toolbar === 'left') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = (left + 54) + 'px';     
                        pop.style.right = 'auto';              
                    } else if(this.builder.opts.toolbar === 'right') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = 'auto';
                        const viewportWidth = window.innerWidth;
                        pop.style.right = (viewportWidth - left + 9) + 'px';  
                    } else {
                        pop.style.top = (top + 54 - 6) + 'px';
                        pop.style.left = (parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - w) + 'px';
                        pop.style.right = 'auto';   
                    }
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

            this.getState();

            let iframe = pop.querySelector('iframe');
            let area = iframe.contentWindow.document.querySelector('#divFontList');
            var target = area.querySelector('.on');
            if(target) area.scrollTop = area.scrollTop + target.getBoundingClientRect().top;

        });

        // Icons
        iframe = rteIconOptions.querySelector('iframe');
        doc = iframe.contentWindow.document;
        doc.open();
        doc.write(this.getIconsHTML());
        doc.close();

        let btnRteIcons = this.rteTool.querySelector('button.rte-icon'); 
        btnRteIcons = btnRteIcons ? btnRteIcons:this.rteMoreOptions.querySelector('button.rte-icon');
        if(btnRteIcons) dom.addEventListener(btnRteIcons, 'click', () => {

            const pop = this.rteIconOptions;
            const top = btnRteIcons.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteIcons.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  

                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';          
                    pop.style.right = 'auto';         
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }

                if(dom.parentsHasClass(btnRteIcons,'rte-more-options')) {
                    // Adjustment if button is placed on 2nd bar (div.rte-more-options)
                    if(this.builder.opts.toolbar === 'left') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = (left + 54) + 'px';     
                        pop.style.right = 'auto';              
                    } else if(this.builder.opts.toolbar === 'right') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = 'auto';
                        const viewportWidth = window.innerWidth;
                        pop.style.right = (viewportWidth - left + 9) + 'px';  
                    } else {
                        pop.style.top = (top + 54 - 6) + 'px';

                        if(btnRteIcons.getBoundingClientRect().left + 45 -parseInt(this.rteMoreOptions.style.left) < pop.offsetWidth) {
                            pop.style.left = (parseInt(this.rteMoreOptions.style.left)) + 'px';
                        } else if ((parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - btnRteIcons.getBoundingClientRect().left + 45) < pop.offsetWidth) {
                            pop.style.left = (parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - w) + 'px';
                        } 
                        else {
                            // Do Nothing
                        }
                        
                        pop.style.right = 'auto';   
                    }
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });

        // Color
        let btnRteColor = this.rteTool.querySelector('button.rte-color'); 
        btnRteColor = btnRteColor ? btnRteColor:this.rteMoreOptions.querySelector('button.rte-color');
        if(btnRteColor) dom.addEventListener(btnRteColor, 'click', () => {

            const pop = this.rteColorPicker;
            const top = btnRteColor.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteColor.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            // const h = pop.offsetHeight;
            
            if(!dom.hasClass(pop,'active')){  

                this.builder.uo.saveForUndo(true); // checkLater = true

                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = this.rteTool.style.top; //(top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';  
                    pop.style.right = 'auto';              
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = this.rteTool.style.top; //(top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });

        // Preferences
        let btnRtePreferences = this.rteTool.querySelector('button.rte-preferences'); 
        btnRtePreferences = btnRtePreferences ? btnRtePreferences:this.rteMoreOptions.querySelector('button.rte-preferences');
        if(btnRtePreferences) dom.addEventListener(btnRtePreferences, 'click', () => {
            this.builder.viewPreferences();
        });
        btnRtePreferences = this.elementRteTool.querySelector('button.rte-preferences'); 
        btnRtePreferences = btnRtePreferences ? btnRtePreferences:this.elementRteMoreOptions.querySelector('button.rte-preferences');
        if(btnRtePreferences) dom.addEventListener(btnRtePreferences, 'click', () => {
            this.builder.viewPreferences();
        });

        // View HTML
        let btnRteHtml = this.rteTool.querySelector('button.rte-html'); 
        btnRteHtml = btnRteHtml ? btnRteHtml:this.rteMoreOptions.querySelector('button.rte-html');
        if(btnRteHtml) dom.addEventListener(btnRteHtml, 'click', () => {
            this.builder.viewHtml();
        });
        btnRteHtml = this.elementRteTool.querySelector('button.rte-html'); 
        btnRteHtml = btnRteHtml ? btnRteHtml:this.elementRteMoreOptions.querySelector('button.rte-html');
        if(btnRteHtml) dom.addEventListener(btnRteHtml, 'click', () => {
            this.builder.viewHtml();
        });

        // Grid Editor
        let btnRteGridEditor = this.rteTool.querySelector('button.rte-grideditor'); 
        btnRteGridEditor = btnRteGridEditor ? btnRteGridEditor:this.rteMoreOptions.querySelector('button.rte-grideditor');
        if(btnRteGridEditor) dom.addEventListener(btnRteGridEditor, 'click', () => {

            // direct
            const grideditor = this.builderStuff.querySelector('.grideditor');
            dom.addClass(grideditor, 'active');

            const builders = document.querySelectorAll(this.builder.opts.container);
            Array.prototype.forEach.call(builders, (builder) => {
                builder.setAttribute('grideditor','');
            });
    
        });
        btnRteGridEditor = this.elementRteTool.querySelector('button.rte-grideditor'); 
        btnRteGridEditor = btnRteGridEditor ? btnRteGridEditor:this.elementRteMoreOptions.querySelector('button.rte-grideditor');
        if(btnRteGridEditor) dom.addEventListener(btnRteGridEditor, 'click', () => {

            // direct
            const grideditor = this.builderStuff.querySelector('.grideditor');
            dom.addClass(grideditor, 'active');

            const builders = document.querySelectorAll(this.builder.opts.container);
            Array.prototype.forEach.call(builders, (builder) => {
                builder.setAttribute('grideditor','');
            });
    
        });

        // Undo
        let btnRteUndo = this.rteTool.querySelector('button.rte-undo'); 
        btnRteUndo = btnRteUndo ? btnRteUndo:this.rteMoreOptions.querySelector('button.rte-undo');
        if(btnRteUndo) dom.addEventListener(btnRteUndo, 'click', () => {
            this.builder.uo.doUndo();
        });
        btnRteUndo = this.elementRteTool.querySelector('button.rte-undo'); 
        btnRteUndo = btnRteUndo ? btnRteUndo:this.elementRteMoreOptions.querySelector('button.rte-undo');
        if(btnRteUndo) dom.addEventListener(btnRteUndo, 'click', () => {
            this.builder.uo.doUndo();
        });

        // Redo
        let btnRteRedo = this.rteTool.querySelector('button.rte-redo'); 
        btnRteRedo = btnRteRedo ? btnRteRedo:this.rteMoreOptions.querySelector('button.rte-redo');
        if(btnRteRedo) dom.addEventListener(btnRteRedo, 'click', () => {
            this.builder.uo.doRedo();
        });
        btnRteRedo = this.elementRteTool.querySelector('button.rte-redo'); 
        btnRteRedo = btnRteRedo ? btnRteRedo:this.elementRteMoreOptions.querySelector('button.rte-redo');
        if(btnRteRedo) dom.addEventListener(btnRteRedo, 'click', () => {
            this.builder.uo.doRedo();
        });

        // Add Snippet
        let btnRteAddSnippet = this.rteTool.querySelector('button.rte-addsnippet'); 
        if(btnRteAddSnippet) dom.addEventListener(btnRteAddSnippet, 'click', () => {

            this.viewSnippets();
    
        });
        btnRteAddSnippet = this.elementRteTool.querySelector('button.rte-addsnippet'); 
        if(btnRteAddSnippet) dom.addEventListener(btnRteAddSnippet, 'click', () => {

            this.viewSnippets();
    
        });

        // Link
        let btnRteLink = this.rteTool.querySelector('button.rte-link'); 
        btnRteLink = btnRteLink ? btnRteLink:this.rteMoreOptions.querySelector('button.rte-link');
        if(btnRteLink) dom.addEventListener(btnRteLink, 'click', () => {
            const util = new Util(this.builder);
            util.clearActiveCell();
            this.hyperlink.createLink();
        });

        // Image
        let btnRteImage = this.rteTool.querySelector('button.rte-image'); 
        btnRteImage = btnRteImage ? btnRteImage:this.rteMoreOptions.querySelector('button.rte-image');
        if(btnRteImage) dom.addEventListener(btnRteImage, 'click', () => {
            
            const modal = this.builderStuff.querySelector('.insertimage');
            util.showModal(modal, true, function () {
                //if(!this.builder.isTouchSupport) util.restoreSelection();
            },  false);

            //Clear previous
            modal.querySelector('#fileInsertImage').value = ''; // clear
            modal.querySelector('.is-preview-area').style.display = 'none';
            modal.querySelector('.is-drop-area').style.display = 'block';    
            dom.removeClass(modal.querySelector('.is-drop-area'),'image-dropping');

            //Clear image source input
            modal.querySelector('.input-src').value = '';

        });

        const modalInsertImage = this.builderStuff.querySelector('.insertimage');
        const fileInsertImage = modalInsertImage.querySelector('#fileInsertImage');
        dom.addEventListener(fileInsertImage, 'change', (e) => {

            var input = e.target;

            if (input.files && input.files[0]) {

                var reader = new FileReader();

                reader.onload = function(e) {
                    modalInsertImage.querySelector('.is-drop-area').style.display = 'none';  

                    modalInsertImage.querySelector('#imgInsertImagePreview').src = e.target.result;
                    modalInsertImage.querySelector('.is-preview-area').style.display = 'block';
                    let fileToInsert = input.files[0].name;
                    modalInsertImage.querySelector('#imgInsertImagePreview').setAttribute('data-filename', fileToInsert);

                    //modalInsertImage.querySelector('.image-title').innerHTML = input.files[0].name;
                };

                reader.readAsDataURL(input.files[0]);
            
                modalInsertImage.querySelector('.input-src').value = ''; //Clear manually specified image soure

            } 

        });

        const btnInsertImageOk = modalInsertImage.querySelector('.input-ok');
        dom.addEventListener(btnInsertImageOk, 'click', () => {

            if(!this.builder.activeCol) {
                util.hideModal(modalInsertImage);
                return;
            }

            this.builder.uo.saveForUndo();

            util.restoreSelection(); //a must

            let val = '';
            if(modalInsertImage.querySelector('.is-drop-area').style.display === 'none'){
                val = modalInsertImage.querySelector('#imgInsertImagePreview').src;
            } else {
                val = modalInsertImage.querySelector('.input-src').value;
            }
             
            if(val === '') return;
            let fileToInsert = modalInsertImage.querySelector('#imgInsertImagePreview').getAttribute('data-filename');
            util.pasteHtmlAtCaret('<img data-filename="' + fileToInsert + '" src="' + val + '" alt="" />', false);
                               
            util.hideModal(modalInsertImage);
                               
            this.builder.applyBehavior();

            //save selection
            util.saveSelection();

            //Trigger Change event
            this.builder.opts.onChange();

            //Trigger Render event
            this.builder.opts.onRender();

        });

        const btnInsertImageCancel = modalInsertImage.querySelector('.input-cancel');
        dom.addEventListener(btnInsertImageCancel, 'click', () => {
                    
            util.hideModal(modalInsertImage);

        });

        const dropArea = modalInsertImage.querySelector('.is-drop-area');
        dom.addEventListener(dropArea, 'dragover', () => {
            dom.addClass(dropArea,'image-dropping');
        });
        dom.addEventListener(dropArea, 'dragleave', () => {
            dom.removeClass(dropArea,'image-dropping');
        });

        const delImageInsert = modalInsertImage.querySelector('.is-preview-area i');
        dom.addEventListener(delImageInsert, 'click', () => {
            
            //Clear drop image area
            modalInsertImage.querySelector('#fileInsertImage').value = ''; // clear
            modalInsertImage.querySelector('.is-preview-area').style.display = 'none';
            dropArea.style.display = 'block';    
            dom.removeClass(dropArea,'image-dropping');

        });

        const inputImageInsertSrc = modalInsertImage.querySelector('.input-src');
        dom.addEventListener(inputImageInsertSrc, 'keyup', () => {
            
            //Clear drop image area
            modalInsertImage.querySelector('#fileInsertImage').value = ''; // clear
            modalInsertImage.querySelector('.is-preview-area').style.display = 'none';
            dropArea.style.display = 'block';    
            dom.removeClass(dropArea,'image-dropping');

        });

        if (!this.builder.opts.onImageSelectClick && this.builder.opts.imageselect==='' ) {
            modalInsertImage.querySelector('.input-select').style.display = 'none';
        }
        
        if(this.builder.opts.onImageSelectClick || this.builder.opts.imageselect!==''){

            dom.addClass(modalInsertImage.querySelector('.image-src'),'image-select');

            //Open Custom Image Select
            const inputImageSelect = modalInsertImage.querySelector('.input-select');
            if(inputImageSelect) dom.addEventListener(inputImageSelect, 'click', () => {

                if(this.builder.opts.onImageSelectClick){

                    this.builder.opts.onImageSelectClick({targetInput: modalInsertImage.querySelector('.input-src'), theTrigger: inputImageSelect});

                } else {

                    let modalImageSelect = this.builderStuff.querySelector('.is-modal.imageselect');    
                    let iframe = modalImageSelect.querySelector('iframe');         
                    if (iframe.src === 'about:blank') {
                        iframe.src = this.builder.opts.imageselect;
                    }
                    util.showModal(modalImageSelect);

                }

            });

        } else {
            dom.removeClass(inputImageInsertSrc, 'image-select');
        }


        // Text Settings
        let btnRteTextSettings = this.rteTool.querySelector('button.rte-textsettings'); 
        btnRteTextSettings = btnRteTextSettings ? btnRteTextSettings:this.rteMoreOptions.querySelector('button.rte-textsettings');
        if(btnRteTextSettings) dom.addEventListener(btnRteTextSettings, 'click', () => {

            const pop = this.rteTextSettingOptions;
            const top = btnRteTextSettings.getBoundingClientRect().top; // + window.pageYOffset;
            const left = btnRteTextSettings.getBoundingClientRect().left; // + window.pageXOffset;
            pop.style.display = 'flex';
            const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = pop.offsetHeight;

            if(!dom.hasClass(pop,'active')){  

                if(this.builder.opts.toolbar === 'left') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = (left + 54) + 'px';          
                    pop.style.right = 'auto';         
                } else if(this.builder.opts.toolbar === 'right') {
                    pop.style.top = (top - (h/2) + 20) + 'px';
                    pop.style.left = 'auto';
                    const viewportWidth = window.innerWidth;
                    pop.style.right = (viewportWidth - left + 9) + 'px';  
                } else {
                    pop.style.top = (top + 54 - 6) + 'px';
                    pop.style.left = (left -(w/2)+23) + 'px';
                    pop.style.right = 'auto';   
                }

                if(dom.parentsHasClass(btnRteTextSettings,'rte-more-options')) {
                    // Adjustment if button is placed on 2nd bar (div.rte-more-options)
                    if(this.builder.opts.toolbar === 'left') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = (left + 54) + 'px';     
                        pop.style.right = 'auto';              
                    } else if(this.builder.opts.toolbar === 'right') {
                        pop.style.top = (parseInt(this.rteMoreOptions.style.top) + this.rteMoreOptions.offsetHeight - h) + 'px'; 
                        pop.style.left = 'auto';
                        const viewportWidth = window.innerWidth;
                        pop.style.right = (viewportWidth - left + 9) + 'px';  
                    } else {
                        pop.style.top = (top + 54 - 6) + 'px';
                        pop.style.left = (left -(w/2)+23) + 'px'; //(parseInt(this.rteMoreOptions.style.left) + this.rteMoreOptions.offsetWidth - w) + 'px';
                        pop.style.right = 'auto';   
                    }
                }
                
                dom.removeClass(pop,'deactive');
                dom.addClass(pop, 'active');  
            } else {
                dom.removeClass(pop,'active');
                dom.addClass(pop, 'deactive');
            }

        });

        // More
        let btnRteMore = this.rteTool.querySelector('button.rte-more'); 
        if(btnRteMore) dom.addEventListener(btnRteMore, 'click', () => {

            this.showRteMore();

        });
        let btnElementRteMore = this.elementRteTool.querySelector('button.rte-more'); 
        if(btnElementRteMore) dom.addEventListener(btnElementRteMore, 'click', () => {

            this.showElementRteMore();

        });

        // -----------------------------

        // Formatting
        var btns = Array.prototype.slice.call(this.rteTool.querySelectorAll('.rte-format')).concat(Array.prototype.slice.call(this.rteFormattingOptions.querySelectorAll('.rte-format'))).concat(Array.prototype.slice.call(this.rteMoreOptions.querySelectorAll('.rte-format')));
        Array.prototype.forEach.call(btns, (btn) => {

            dom.addEventListener(btn, 'click', () => { // old 8368

                this.builder.uo.saveForUndo();
                
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

                const command = btn.getAttribute('data-command');

                var text = dom.getSelected();                

                if(command==='bold') {

                    if(text.trim()==='') {

                        var tagname = elm.tagName.toLowerCase();
                        if (tagname === 'b') {

                            dom.selectElementContents(elm);

                            document.execCommand('bold', false, null);

                        } else {
                            if (elm.style.fontWeight === 'bold' || elm.style.fontWeight > 400) {
                                elm.style.fontWeight = '';
                            } else {
                                elm.style.fontWeight = 'bold';
                            }
                        }
                    } else {
                        document.execCommand('bold', false, null);
                    }

                }

                if(command==='italic') {

                    if(text.trim()==='') {

                        tagname = elm.tagName.toLowerCase();
                        if (tagname === 'i') {

                            dom.selectElementContents(elm);

                            document.execCommand('italic', false, null);

                        } else {
                            if (elm.style.fontStyle === 'italic') {
                                elm.style.fontStyle = '';
                            } else {
                                elm.style.fontStyle = 'italic';
                            }
                        }
                    } else {
                        document.execCommand('italic', false, null);
                    }

                }

                if (command === 'underline') {

                    if(text.trim()==='') {

                        tagname = elm.tagName.toLowerCase();
                        if (tagname === 'u') {

                            dom.selectElementContents(elm);

                            document.execCommand('underline', false, null);

                        } else {
                            if (elm.style.textDecoration.indexOf('underline') !== -1) {
                                elm.style.textDecoration = '';
                            } else {
                                elm.style.textDecoration = 'underline';
                            }
                        }
                    } else {
                        document.execCommand('underline', false, null);
                    }

                }
                if (command === 'strikethrough') {

                    if(text.trim()==='') {

                        tagname = elm.tagName.toLowerCase();
                        if (tagname === 'strike') {

                            dom.selectElementContents(elm);

                            document.execCommand('strikethrough', false, null);

                        } else {
                            if (elm.style.textDecoration.indexOf('line-through') !== -1) {
                                elm.style.textDecoration = '';
                            } else {
                                elm.style.textDecoration = 'line-through';
                            }
                        }
                    } else {
                        document.execCommand('strikethrough', false, null);
                    }

                }

                if (command === 'superscript') {
                    document.execCommand('superscript', false, null);
                }

                if (command === 'subscript') {
                    document.execCommand('subscript', false, null);
                }

                if (command === 'uppercase') {
                    if (elm.style.textTransform === 'uppercase') {
                        elm.style.textTransform = '';
                    } else {
                        elm.style.textTransform = 'uppercase';
                    }
                }

                if(command==='clean') {
                    if(text.trim()==='') {

                        elm.style.cssText = '';
                        elm.className = '';

                    } else {

                        if (elm.innerText.replace(/(\r\n|\n|\r)/gm,'') === text.trim().replace(/(\r\n|\n|\r)/gm,'')) {

                            elm.style.cssText = '';
                            elm.className = '';
                            document.execCommand('removeFormat', false, null);
                            document.execCommand('removeFormat', false, null);

                        } else {

                            document.execCommand('removeFormat', false, null);
                            document.execCommand('removeFormat', false, null);

                        }
                    }
                }
                
                this.getState();

                //save selection (only for desktop)
                if(!this.builder.isTouchSupport) {
                    util.saveSelection(); //Needed because after format, a tag is added (ex. <b>,<i>), so, make selection again. 
                }
    
                if (text.trim() === '') {
                    util.restoreSelection(); //place cursor back after formatting (bold, italic, ...)
                    
                    if(this.builder.isTouchSupport) { //prevent keyboard open
                        const btnFocus = this.rteTool.querySelector('button'); 
                        btnFocus.focus();
                    }
                }

                // Or can be placed here:
                // if(this.builder.isTouchSupport) { //prevent keyboard open
                //     const btnFocus = this.rteTool.querySelector('button'); 
                //     btnFocus.focus();
                // }
    
                //Trigger Change event
                this.builder.opts.onChange();

            });

        });
        
        // Align
        btns = this.rteAlignOptions.querySelectorAll('button[data-align]'); 
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => {
                this.builder.uo.saveForUndo();

                util.restoreSelection(); //a must
                
                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }

                const command = btn.getAttribute('data-align');
            
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
                
                let element = elm;

                //if element is button in email mode
                //mod by Jack
                let tbl_button = element.closest('table.button');
                if(tbl_button) {

                    if(command === 'center') {
                        if(tbl_button.parentNode.tagName.toLowerCase()!=='center') {
                            //wrap with center
                            let centerEl = document.createElement('CENTER');
                            tbl_button.parentNode.insertBefore(centerEl, tbl_button);
                            centerEl.appendChild(tbl_button);
                        } else {
                            tbl_button.setAttribute('align', '');
                        }
                    } else {                        
                        tbl_button.setAttribute('align', command);
                    }
                    dom.removeClass(tbl_button, 'float-center');

                } else {

                    while(element.tagName.toLowerCase()!=='p' &&
                        element.tagName.toLowerCase()!=='h1' &&
                        element.tagName.toLowerCase()!=='h2' &&
                        element.tagName.toLowerCase()!=='h3' &&
                        element.tagName.toLowerCase()!=='h4' &&
                        element.tagName.toLowerCase()!=='h5' &&
                        element.tagName.toLowerCase()!=='h6' &&
                        element.tagName.toLowerCase()!=='pre' &&
                        element.tagName.toLowerCase()!=='blockquote' &&
                        element.tagName.toLowerCase()!=='div' &&
                        element.tagName.toLowerCase()!=='td' &&
                        element.tagName.toLowerCase()!=='th') {
                        element = element.parentNode;
                    }
                    element.style.textAlign = command;

                }

                this.getState();

                //save selection
                util.saveSelection();

                //Trigger Change event
                this.builder.opts.onChange();

            });
        });
        btns = this.elementRteTool.querySelectorAll('button[data-align]'); 
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => {

                this.builder.uo.saveForUndo();

                //util.restoreSelection(); //a must
                
                // if(this.builder.isTouchSupport) { //prevent keyboard open
                //     const btnFocus = this.rteTool.querySelector('button'); 
                //     btnFocus.focus();
                // }

                const command = btn.getAttribute('data-align');
            
                // let elm;
                // try{
                //     let curr;
                //     if (window.getSelection) {
                //         curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                //         if (curr.nodeType === 3) {  //text node
                //             elm = curr.parentNode;
                //         } else {
                //             elm = curr;
                //         }
                //     }
                //     else if (document.selection) {
                //         curr = document.selection.createRange();
                //         elm = document.selection.createRange().parentElement();
                //     }
                // } catch(e) {return;}
                

                let elm = this.builder.inspectedElement;

                let element = elm;
                while(element.tagName.toLowerCase()!=='p' &&
                    element.tagName.toLowerCase()!=='h1' &&
                    element.tagName.toLowerCase()!=='h2' &&
                    element.tagName.toLowerCase()!=='h3' &&
                    element.tagName.toLowerCase()!=='h4' &&
                    element.tagName.toLowerCase()!=='h5' &&
                    element.tagName.toLowerCase()!=='h6' &&
                    element.tagName.toLowerCase()!=='pre' &&
                    element.tagName.toLowerCase()!=='blockquote' &&
                    element.tagName.toLowerCase()!=='div' &&
                    element.tagName.toLowerCase()!=='td' &&
                    element.tagName.toLowerCase()!=='th') {
                    element = element.parentNode;
                }
                element.style.textAlign = command;

                this.getState();

                //save selection
                // util.saveSelection();

                //Trigger Change event
                this.builder.opts.onChange();

            });
        });

        // List
        btns = this.rteListOptions.querySelectorAll('button[data-action]'); 
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => {

                this.builder.uo.saveForUndo();

                util.restoreSelection(); //a must

                // cleanup span with style
                let activeCol = this.builder.activeCol;
                let spans = activeCol.querySelectorAll('span'); 
                Array.prototype.forEach.call(spans, (span) => {
                    span.setAttribute('data-keep','');
                });

                const command = btn.getAttribute('data-action'); //insertUnorderedList, insertOrderedList, indent, outdent           
                document.execCommand(command, false, null);

                // cleanup span with style
                activeCol = this.builder.activeCol;
                spans = activeCol.querySelectorAll('span'); 
                Array.prototype.forEach.call(spans, (span) => {
                    let attr = span.getAttribute('data-keep');
                    if(!attr) {
                        span.outerHTML = span.innerHTML;
                    }
                });
                Array.prototype.forEach.call(spans, (span) => {
                    let attr = span.getAttribute('data-keep');
                    if(attr) {
                        dom.removeAttribute(span, 'data-keep');
                    }
                });

                this.getState();

                //save selection
                util.saveSelection();

                //Trigger Change event
                this.builder.opts.onChange();
                
                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }

            });
        });


        // Custom Tags
        btns = this.rteCustomTagOptions.querySelectorAll('[data-value]'); 
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => {
                
                this.builder.uo.saveForUndo();

                const tag = btn.getAttribute('data-value');
                util.pasteHtmlAtCaret(tag, true);

                this.rteCustomTagOptions.style.display = '';
            });
        });

        // Paragraph
        btns = this.rteParagraphOptions.querySelectorAll('[data-block]'); 
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => {
                
                this.builder.uo.saveForUndo();

                util.restoreSelection(); //a must

                const command = btn.getAttribute('data-block'); //h1, h2, h3, h4, p, pre  

                let block = document.queryCommandValue('FormatBlock');
                block = block.toLowerCase();
                if (block === 'pre') {
                    // document.execCommand('formatBlock', false, '<div>'); // without this, pref-ormatted won't change.

                    let elm = dom.textSelection();
                    if(elm) {
                        let element = elm;
                        while(element.tagName.toLowerCase()!=='pre') {
                            element = element.parentNode;
                        }
                        let newnode = element.cloneNode(true);
                        let s = newnode.outerHTML.replace('<pre', '<' + command);
                        s = s.replace('</pre>', '</' + command + '>');
                        element.outerHTML = s;

                        // Highlight 
                        let btns = this.rteParagraphOptions.querySelectorAll('[data-block]');
                        Array.prototype.forEach.call(btns, (btn) => {
                            dom.removeClass(btn,'on');
                        });
                        dom.addClass(this.rteParagraphOptions.querySelector('[data-block="' + command + '"]'),'on');

                    }
                } else {
                    document.execCommand('formatBlock', false, '<' + command + '>'); //Needs contenteditable.         
                }

                this.rteParagraphOptions.style.display = 'none';    
                dom.removeClass(this.rteParagraphOptions,'active');
                dom.addClass(this.rteParagraphOptions, 'deactive');    
 
                this.getState();

                //save selection
                util.saveSelection();

                //Trigger Change event
                this.builder.opts.onChange();

                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }
            });
        });

        // Color
        let tabs = rteColorPicker.querySelectorAll('.is-pop-tab-item');
        Array.prototype.forEach.call(tabs, (tab) => {
            dom.addEventListener(tab, 'click', (e) => {
                
                this.builder.uo.saveForUndo(true); // checkLater = true

                let elms = rteColorPicker.querySelectorAll('.is-pop-tab-item');
                Array.prototype.forEach.call(elms, (elm) => {
                    dom.removeClass(elm, 'active');
                });
                dom.addClass(e.target, 'active');

                let val = rteColorPicker.querySelector('.active').getAttribute('data-value');
                if(val==='forecolor') {
                    rteColorPicker.setAttribute('data-command', 'forecolor');
                } else {
                    rteColorPicker.setAttribute('data-command', 'backcolor');
                }
            });
        });

        new ColorPicker({
            colors: this.builder.opts.colors,
            onPick: (color)=>{

                util.restoreSelection(); //a must
                
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

                const command = rteColorPicker.getAttribute('data-command');

                var text = dom.getSelected();

                if (text.trim() === '') {
                    if (command === 'forecolor') {
                        elm.style.color = color;
                    } else {
                        elm.style.backgroundColor = color;
                    }
                } else {

                    if (elm.innerText === text) {
                        if (command === 'forecolor') {
                            elm.style.color = color;
                        } else {
                            elm.style.backgroundColor = color;
                        }
                    } else {
                        if (command === 'forecolor') {
                            document.execCommand('ForeColor', false, color);
                        } else {
                            document.execCommand('BackColor', false, color);
                        }

                        //Cleanup FONTs
                        var fontElements = document.getElementsByTagName('font');
                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            var s = fontElements[i].color;
                            if (s !== '') {
                                if (command === 'forecolor') {
                                    fontElements[i].removeAttribute('color');
                                    fontElements[i].style.color = color; //s;
                                    // if(this.builder.isTouchSupport) dom.addClass(fontElements[i], 'textblock-active');
                                }
                            }
                        }
                    }
                }

                //save selection (only for desktop)
                if(!this.builder.isTouchSupport) {
                    util.saveSelection(); //Needed because after format, a tag is added (ex. <b>,<i>), so, make selection again. 
                }
    
                if (text.trim() === '') {
                    util.restoreSelection(); //place cursor back after formatting (bold, italic, ...)
                }
                
                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }
                //Trigger Change event
                this.builder.opts.onChange();


            },
            renderOn: '.rte-color-picker-area',

            animateModal: this.builder.opts.animateModal,
            elementToAnimate: this.builder.opts.container,
            lang: this.builder.opts.lang
        });


        // Font Size
        btns = rteTextSettingOptions.querySelectorAll('.rte-fontsize-options button');
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => { // old 9135
                
                let num = btn.getAttribute('data-value');

                util.restoreSelection(); //a must
                
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

                var text = dom.getSelected();

                if (text.trim() === '' || (text.trim() !== '' && elm.innerText === text)) {
                    
                    this.builder.uo.saveForUndo();

                    if(this.builder.opts.fontSizeClassValues.length > 0) {
                        this.applyClassFontSize(elm, num);
                    } else {
                        this.applyInlineFontSize(elm, num);
                    }

                } else {
                    
                    this.builder.uo.saveForUndo();

                    let currentFontSize = Number(window.getComputedStyle(elm).getPropertyValue('font-size').match(/\d+/)[0]);

                    document.execCommand('fontSize', false, '7'); //this makes keyboard opens on mobile

                    let newelm;
                    var fontElements = document.getElementsByTagName('font');
                    for (var i = 0, len = fontElements.length; i < len; ++i) {
                        if (fontElements[i].size === '7') {
                            fontElements[i].removeAttribute('size');
                            fontElements[i].style.fontSize = currentFontSize + 'px';
                            dom.selectElementContents(fontElements[i]);
                            // if(this.builder.isTouchSupport) dom.addClass(fontElements[i], 'textblock-active');

                            newelm = fontElements[i];
                        }
                    }

                    if(newelm){
                        if(this.builder.opts.fontSizeClassValues.length > 0) {
                            this.applyClassFontSize(newelm, num);
                        } else {
                            this.applyInlineFontSize(newelm, num);
                        }
                    }
                    
                }
            
                //save selection
                util.saveSelection();
                
                this.getState();

                //Trigger Change event
                this.builder.opts.onChange();

                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }

            });
        });


        // Line Height
        btns = rteTextSettingOptions.querySelectorAll('.rte-lineheight-options button');
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => { 
                
                let num = btn.getAttribute('data-value');

                util.restoreSelection(); //a must
                
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

                // var text = dom.getSelected();

                this.builder.uo.saveForUndo();

                let currentLineHeight = Number(window.getComputedStyle(elm).getPropertyValue('line-height').match(/\d+/)[0]);

                let lineheight;
                if (num === '+') {
                    lineheight = (currentLineHeight + 1) + 'px';
                } else if (num === '-') {
                    lineheight = (currentLineHeight - 1) + 'px';
                } else if (num === '') {
                    lineheight = '';
                } else {
                    lineheight = num;
                }
                /** mod by Jack */
                //elm.style.lineHeight = lineheight;
                dom.doFunction(elm, function(theEl) {
                    theEl.style.lineHeight = lineheight;
                }, true);

                //save selection
                util.saveSelection();

                this.getState();

                //Trigger Change event
                this.builder.opts.onChange();

                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }

            });
        });


        // Letter Spacing
        btns = rteTextSettingOptions.querySelectorAll('.rte-letterspacing-options button');
        Array.prototype.forEach.call(btns, (btn) => {
            dom.addEventListener(btn, 'click', () => { 
                
                let num = btn.getAttribute('data-value');
                
                util.restoreSelection(); //a must
                
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

                // var text = dom.getSelected();

                this.builder.uo.saveForUndo();

                let currentLetterSpacing = parseInt(window.getComputedStyle(elm).getPropertyValue('letter-spacing'));
                if(isNaN(currentLetterSpacing)) currentLetterSpacing = 0;

                let letterspacing;
                if (num === '+') {
                    letterspacing = (currentLetterSpacing + 1) + 'px';
                } else if (num === '-') {
                    letterspacing = (currentLetterSpacing - 1) + 'px';
                } else if (num === '') {
                    letterspacing = '';
                } else {
                    letterspacing = num + 'px';
                }
                /** mod by Jack */
                //elm.style.letterSpacing = letterspacing;
                dom.doFunction(elm, function(theEl) {
                    theEl.style.letterSpacing = letterspacing;
                }, true);

                //save selection
                util.saveSelection();
                
                this.getState();

                //Trigger Change event
                this.builder.opts.onChange();

                if(this.builder.isTouchSupport) { //prevent keyboard open
                    const btnFocus = this.rteTool.querySelector('button'); 
                    btnFocus.focus();
                }

            });
        });


        // -----------------------------

        // Click anywhere will hide Column tool
        document.addEventListener('click', (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement; 
            
            if(!this.builderStuff) return; // in case the builder is destroyed
            if(this.builderStuff.getAttribute('preventDevault')) {
                setTimeout(()=>{
                    this.builderStuff.removeAttribute('preventDevault');
                },30);
                return;
            }

            let a, b, c, d, f;

            if(this.rteAlignOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-align'); 
                b = dom.parentsHasClass(target, 'rte-align-options'); 
                if(!(a||b)) {
                    this.rteAlignOptions.style.display = '';
                    dom.removeClass(this.rteAlignOptions,'active');
                    dom.addClass(this.rteAlignOptions, 'deactive');
                }
            }

            if(this.rteListOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-list'); 
                b = dom.parentsHasClass(target, 'rte-list-options'); 
                if(!(a||b)) {
                    this.rteListOptions.style.display = '';
                    dom.removeClass(this.rteListOptions,'active');
                    dom.addClass(this.rteListOptions, 'deactive');
                }
            }

            if(this.rteFormattingOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-formatting'); 
                b = dom.parentsHasClass(target, 'rte-formatting-options'); 
                if(!(a||b)) {
                    this.rteFormattingOptions.style.display = '';
                    dom.removeClass(this.rteFormattingOptions,'active');
                    dom.addClass(this.rteFormattingOptions, 'deactive');
                }
            }

            if(this.rteColorPicker.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-color'); 
                b = dom.parentsHasClass(target, 'rte-color-picker'); 
                c = dom.parentsHasClass(target, 'pickcolormore'); 
                if(!(a||b||c)) {
                    this.rteColorPicker.style.display = '';
                    dom.removeClass(this.rteColorPicker,'active');
                    dom.addClass(this.rteColorPicker, 'deactive');
                }
            }

            if(this.rteFontFamilyOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-fontfamily'); 
                b = dom.parentsHasClass(target, 'rte-fontfamily-options'); 
                if(!(a||b)) {
                    this.rteFontFamilyOptions.style.display = '';
                    dom.removeClass(this.rteFontFamilyOptions,'active');
                    dom.addClass(this.rteFontFamilyOptions, 'deactive');
                }
            }

            if(this.rteIconOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-icon'); 
                b = dom.parentsHasClass(target, 'rte-icon-options'); 
                c = false;
                if(target.tagName) c = target.tagName.toLowerCase() === 'i' && target.innerHTML === '';
                if(!(a||b||c)) {
                    this.rteIconOptions.style.display = '';
                    dom.removeClass(this.rteIconOptions,'active');
                    dom.addClass(this.rteIconOptions, 'deactive');
                } 
            }

            if(this.rteCustomTagOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-tags'); 
                b = dom.parentsHasClass(target, 'rte-customtag-options'); 
                if(!(a||b)) {
                    this.rteCustomTagOptions.style.display = '';
                    dom.removeClass(this.rteCustomTagOptions,'active');
                    dom.addClass(this.rteCustomTagOptions, 'deactive');
                }
            }

            if(this.rteParagraphOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-paragraph'); 
                b = dom.parentsHasClass(target, 'rte-paragraph-options'); 
                if(!(a||b)) {
                    this.rteParagraphOptions.style.display = '';
                    dom.removeClass(this.rteParagraphOptions,'active');
                    dom.addClass(this.rteParagraphOptions, 'deactive');
                }
            }

            if(this.rteTextSettingOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-textsettings'); 
                b = dom.parentsHasClass(target, 'rte-textsetting-options'); 
                if(!(a||b)) {
                    this.rteTextSettingOptions.style.display = '';
                    dom.removeClass(this.rteTextSettingOptions,'active');
                    dom.addClass(this.rteTextSettingOptions, 'deactive');
                }
            }

            if(this.rteMoreOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-more'); 
                b = dom.parentsHasClass(target, 'rte-more-options'); 
                c = dom.parentsHasClass(target, 'is-rte-pop'); 
                d = dom.parentsHasClass(target, 'is-modal'); 
                f = false;
                if(target.tagName) f = target.tagName.toLowerCase() === 'i' && target.innerHTML === '' && dom.parentsHasClass(btnRteIcons, 'rte-more-options');
                if(!(a||b||c||d||f)) {
                    this.rteMoreOptions.style.display = '';
                    dom.removeClass(this.rteMoreOptions,'active');
                    dom.addClass(this.rteMoreOptions, 'deactive');
                }
            }

            if(this.elementRteMoreOptions.style.display === 'flex') {
                a = dom.parentsHasClass(target, 'rte-more'); // more button
                b = dom.parentsHasClass(target, 'elementrte-more-options'); 
                c = dom.parentsHasClass(target, 'is-rte-pop'); 
                d = dom.parentsHasClass(target, 'is-modal'); 
                f = false;
                //if(target.tagName) f = target.tagName.toLowerCase() === 'i' && target.innerHTML === '' && dom.parentsHasClass(btnRteIcons, 'rte-more-options');
                if(!(a||b||c||d||f)) {
                    this.elementRteMoreOptions.style.display = '';
                    dom.removeClass(this.elementRteMoreOptions,'active');
                    dom.addClass(this.elementRteMoreOptions, 'deactive');
                }
            }
            
        });

    }

    viewSnippets() {

        // direct
        const util = new Util(this.builder);
        let modal = this.builderStuff.querySelector('.snippets');
        util.showModal(modal, false, null, false);

        let iframe = modal.querySelector('iframe');
        if(iframe.src==='about:blank') {
            iframe.src = this.builder.opts.snippetData;
        }

    }

    showRteMore() {
        const btnRteMore = this.rteTool.querySelector('button.rte-more'); 
        const pop = this.rteMoreOptions;
        const top = btnRteMore.getBoundingClientRect().top; // + window.pageYOffset;
        const left = btnRteMore.getBoundingClientRect().left; // + window.pageXOffset;
        pop.style.display = 'flex';
        const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        const h = pop.offsetHeight;

        if(!dom.hasClass(pop,'active')){  
            if(this.builder.opts.toolbar === 'left') {
                pop.style.top = (parseInt(this.rteTool.style.top) + this.rteTool.offsetHeight - h) + 'px'; //(top - (h/2) + 20) + 'px';
                pop.style.left = (left + 54) + 'px';     
                pop.style.right = 'auto';              
            } else if(this.builder.opts.toolbar === 'right') {
                pop.style.top = (parseInt(this.rteTool.style.top) + this.rteTool.offsetHeight - h) + 'px'; //(top - (h/2) + 20) + 'px';
                pop.style.left = 'auto';
                const viewportWidth = window.innerWidth;
                pop.style.right = (viewportWidth - left + 9) + 'px';  
            } else {
                pop.style.top = (top + 54 - 6) + 'px';
                pop.style.left = (parseInt(this.rteTool.style.left) + this.rteTool.offsetWidth - w) + 'px'; //(left -(w/2)+23) + 'px';
                pop.style.right = 'auto';   
            }
            
            dom.removeClass(pop,'deactive');
            dom.addClass(pop, 'active');  
        } else {
            dom.removeClass(pop,'active');
            dom.addClass(pop, 'deactive');
        }
    }

    showElementRteMore() {
        const btnElementRteMore = this.elementRteTool.querySelector('button.rte-more'); 
        const pop = this.elementRteMoreOptions;
        const top = btnElementRteMore.getBoundingClientRect().top; // + window.pageYOffset;
        const left = btnElementRteMore.getBoundingClientRect().left; // + window.pageXOffset;
        pop.style.display = 'flex';
        const w = pop.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
        const h = pop.offsetHeight;

        if(!dom.hasClass(pop,'active')){  
            if(this.builder.opts.toolbar === 'left') {
                pop.style.top = (parseInt(this.elementRteTool.style.top) + this.elementRteTool.offsetHeight - h) + 'px'; //(top - (h/2) + 20) + 'px';
                pop.style.left = (left + 54) + 'px';     
                pop.style.right = 'auto';              
            } else if(this.builder.opts.toolbar === 'right') {
                pop.style.top = (parseInt(this.elementRteTool.style.top) + this.elementRteTool.offsetHeight - h) + 'px'; //(top - (h/2) + 20) + 'px';
                pop.style.left = 'auto';
                const viewportWidth = window.innerWidth;
                pop.style.right = (viewportWidth - left + 9) + 'px';  
            } else {
                pop.style.top = (top + 54 - 6) + 'px';
                pop.style.left = (parseInt(this.elementRteTool.style.left) + this.elementRteTool.offsetWidth - w) + 'px'; //(left -(w/2)+23) + 'px';
                pop.style.right = 'auto';   
            }
            
            dom.removeClass(pop,'deactive');
            dom.addClass(pop, 'active');  
        } else {
            dom.removeClass(pop,'active');
            dom.addClass(pop, 'deactive');
        }
    }

    applyInlineFontSize(elm, num) {

        let currentFontSize = Number(window.getComputedStyle(elm).getPropertyValue('font-size').match(/\d+/)[0]);

        let fontsize;
        if (num === '+') {
            fontsize = (currentFontSize + 1) + 'px';
        } else if (num === '-') {
            fontsize = (currentFontSize - 1) + 'px';
        } else if (num === '') {
            fontsize = '';
        } else {
            fontsize = num + 'px';
        }
        /** mod by Jack */
        //elm.style.fontSize = fontsize;
        dom.doFunction(elm, function(theEl) {
            theEl.style.fontSize = fontsize;
        }, true);
    }

    applyClassFontSize(elm, num) {

        let currentFontSize = Number(window.getComputedStyle(elm).getPropertyValue('font-size').match(/\d+/)[0]);

        let classname = '';
        if(num==='+' || num === '-' || num === '') classname = num;
        else classname = 'size-' + num;

        const arrSizes = this.builder.opts.fontSizeClassValues;

        // Get current class size & remove all class size from the element
        var currentClassSize = '';
        for(var i=0;i<=arrSizes.length-1;i++){
            
            if (dom.hasClass(elm, 'size-'+arrSizes[i])) {
                currentClassSize = 'size-'+arrSizes[i];                
                /** mod by Jack */
                //dom.removeClass(elm, 'size-'+arrSizes[i]);
                let n = arrSizes[i];
                dom.doFunction(elm, (theEl) => {
                    dom.removeClass(theEl, 'size-'+n);
                }, true);
            } else {
                /** mod by Jack */
                let n = arrSizes[i];
                dom.doFunction(elm, (theEl) => {
                    dom.removeClass(theEl, 'size-'+n);
                }, true);
            }

        }

        // If no class size found AND + or - is clicked, get equivalent class size
        if(currentClassSize==='' && (classname==='+'||classname==='-')) {
            for(i=0;i<=arrSizes.length-1;i++){
                if(currentFontSize >=arrSizes[i] & currentFontSize <arrSizes[i+1]){
                    currentClassSize = 'size-'+arrSizes[i];
                }
            }
        }

        if(classname==='+') {
            i = currentClassSize.replace('size-','') *1;
            var idx = arrSizes.indexOf(i); 
            if(idx<arrSizes.length-1) {
                currentClassSize = 'size-' + arrSizes[idx+1];
            }
            /** mod by Jack */
            //dom.addClass(elm, currentClassSize);
            dom.doFunction(elm, function(theEl) {
                dom.addClass(theEl, currentClassSize);
            }, true);
        } else if (classname==='-') {
            i = currentClassSize.replace('size-','') *1;
            idx = arrSizes.indexOf(i); 
            if(idx>=1) {
                currentClassSize = 'size-' + arrSizes[idx-1];
            }
            /** mod by Jack */
            //dom.addClass(elm, currentClassSize);
            dom.doFunction(elm, function(theEl) {
                dom.addClass(theEl, currentClassSize);
            }, true);
        } else if (classname==='') {
            // all current class size already removed
        } else {
            /** mod by Jack */
            //dom.addClass(elm, classname);
            dom.doFunction(elm, function(theEl) {
                dom.addClass(theEl, classname);
            }, true);
        }
        
        /** mod by Jack */
        //elm.style.fontSize = '';
        dom.doFunction(elm, function(theEl) {
            theEl.style.fontSize = '';
        }, true);
    }

    click(col) {

        let elm = this.builder.inspectedElement;


        this.rteTool.style.display = 'none';
        this.elementRteTool.style.display = 'none';

        // console.log(elm);

        if((elm.tagName.toLowerCase() === 'img'||
            dom.hasClass(elm,'is-social')||
            dom.hasClass(elm,'is-rounded-button-medium')||
            dom.hasClass(elm,'cell-active')) &&
            !dom.getSelected()) {
            
            if(this.elementRteTool.style.display==='none' || this.elementRteTool.style.display===''){
                this.elementRteTool.style.display = 'flex';
                this.rteTool.style.display = 'none';

                let btns = this.elementRteTool.querySelectorAll('button[data-align]'); 
                Array.prototype.forEach.call(btns, (btn) => {
                    btn.style.display = '';
                });

                this.positionToolbar();   
            }

        } else if(dom.hasClass(elm,'spacer')||
            dom.hasClass(elm,'ovl')||
            col.getAttribute('data-html')) {
            
            if(this.elementRteTool.style.display==='none' || this.elementRteTool.style.display===''){
                this.elementRteTool.style.display = 'flex';
                this.rteTool.style.display = 'none';

                let btns = this.elementRteTool.querySelectorAll('button[data-align]'); 
                Array.prototype.forEach.call(btns, (btn) => {
                    btn.style.display = 'none';
                });

                this.positionToolbar();   
            }
            
        } else {
                
            if(this.rteTool.style.display==='none' || this.rteTool.style.display===''){
                this.rteTool.style.display = 'flex';
                this.elementRteTool.style.display = 'none';
                this.positionToolbar();   
            }

        }


        this.util.saveSelection();

        this.getState();

    }

    getState() { // old 14140

        if (document.queryCommandState('bold')) {
            dom.addClass(this.rteTool.querySelector('button[data-command=bold]'), 'on');
        } else {
            dom.removeClass(this.rteTool.querySelector('button[data-command=bold]'), 'on');
        }
        if (document.queryCommandState('italic')) {
            dom.addClass(this.rteTool.querySelector('button[data-command=italic]'), 'on');
        } else {
            dom.removeClass(this.rteTool.querySelector('button[data-command=italic]'), 'on');
        }
        if (document.queryCommandState('underline')) {
            dom.addClass(this.rteTool.querySelector('button[data-command=underline]'), 'on');
        } else {
            dom.removeClass(this.rteTool.querySelector('button[data-command=underline]'), 'on');
        }
        if (document.queryCommandState('strikethrough')) {
            dom.addClass(this.rteFormattingOptions.querySelector('[data-command=strikethrough]'), 'on');
        } else {
            dom.removeClass(this.rteFormattingOptions.querySelector('[data-command=strikethrough]'), 'on');
        }
        if (document.queryCommandState('superscript')) {
            dom.addClass(this.rteFormattingOptions.querySelector('[data-command=superscript]'), 'on');
        } else {
            dom.removeClass(this.rteFormattingOptions.querySelector('[data-command=superscript]'), 'on');
        }
        if (document.queryCommandState('subscript')) {
            dom.addClass(this.rteFormattingOptions.querySelector('[data-command=subscript]'), 'on');
        } else {
            dom.removeClass(this.rteFormattingOptions.querySelector('[data-command=subscript]'), 'on');
        }

        let elm = dom.textSelection();
        if(elm) {
            if (elm.style.textTransform === 'uppercase') {
                dom.addClass(this.rteFormattingOptions.querySelector('[data-command=uppercase]'), 'on');
            } else {
                dom.removeClass(this.rteFormattingOptions.querySelector('[data-command=uppercase]'), 'on');
            }
        } else {
            return; // Without this, the line below generates error on first image click (FF). In addition, getState is for text. 
        }

        if (document.queryCommandState('JustifyFull')) {
            dom.addClass(this.rteAlignOptions.querySelector('[data-align=justify]'), 'on');
            // let elm = this.elementRteTool.querySelector('[data-align=justify]');
            // if(elm) dom.addClass(elm, 'on');
        } else {
            dom.removeClass(this.rteAlignOptions.querySelector('[data-align=justify]'), 'on');
        }
        if (document.queryCommandState('JustifyLeft')) {
            dom.addClass(this.rteAlignOptions.querySelector('[data-align=left]'), 'on');
        } else {
            dom.removeClass(this.rteAlignOptions.querySelector('[data-align=left]'), 'on');
        }
        if (document.queryCommandState('JustifyRight')) {
            dom.addClass(this.rteAlignOptions.querySelector('[data-align=right]'), 'on');
        } else {
            dom.removeClass(this.rteAlignOptions.querySelector('[data-align=right]'), 'on');
        }
        if (document.queryCommandState('JustifyCenter')) {
            dom.addClass(this.rteAlignOptions.querySelector('[data-align=center]'), 'on');
        } else {
            dom.removeClass(this.rteAlignOptions.querySelector('[data-align=center]'), 'on');
        } 

        var s = document.queryCommandValue('FontName');
        var fontname = s.split(',')[0];
        fontname = fontname.replace(/"/g, ''); 
        fontname = fontname.replace(/'/g, ''); //NEW 4.0.5
        fontname = fontname.replace(/&quot;/g, ''); //NEW 4.0.5
        fontname = fontname.trim().toLowerCase();

        let btnRteFontFamily = this.rteTool.querySelector('button.rte-fontfamily'); 
        btnRteFontFamily = btnRteFontFamily ? btnRteFontFamily:this.rteMoreOptions.querySelector('button.rte-fontfamily');
        if(btnRteFontFamily) {
            const iframe = this.rteFontFamilyOptions.querySelector('iframe');
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            if(iframeDocument) {
                [].forEach.call(iframeDocument.querySelectorAll('#divFontList > div'),function(e){

                    var f = e.getAttribute('data-font-family');
                    f = f.split(',')[0];
                    f = f.replace(/'/g, ''); // NEW 4.0.5
                    f = f.trim().toLowerCase();
                    
                    if(f===fontname && f!=='') {
                        dom.addClass(e,'on');
                    } else {
                        dom.removeClass(e,'on');
                    }
                    
                });
            }
        }

        let btns = this.rteParagraphOptions.querySelectorAll('[data-block]');
        Array.prototype.forEach.call(btns, (btn) => {
            dom.removeClass(btn,'on');
        });

        var block = document.queryCommandValue('FormatBlock');
        block = block.toLowerCase();

        if (block === 'normal') block = 'p';
        if (block === 'heading 1') block = 'h1';
        if (block === 'heading 2') block = 'h2';
        if (block === 'heading 3') block = 'h3';
        if (block === 'heading 4') block = 'h4';
        if (block === 'formatted') block = 'pre';

        if (block === 'p' || block === 'h1' || block === 'h2' || block === 'h3' || block === 'h4' || block === 'pre') {
            dom.addClass(this.rteParagraphOptions.querySelector('[data-block="' + block + '"]'),'on');
        }
        
    }

    getIconsHTML() {
        const path = this.builder.assetPath + 'ionicons/';
        const html = `
        <!DOCTYPE HTML>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Fonts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">  
            <link href="${path}css/ionicons.min.css" rel="stylesheet" type="text/css" />
            <style>
                html, body {height:100%}
                body {overflow:hidden;margin:0;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size:100%; 
                    line-height:1.7;
                }
                #divIcons {display:flex;flex-direction:row;flex-wrap:wrap;margin:0;padding:9px 11px 9px 9px;height:100%;overflow-y:scroll !important;box-sizing:border-box;}
                #divIcons > div {width:40px;height:37px;line-height:37px;font-size:14px;color:#111111;cursor:pointer;overflow:hidden;text-align:center;position:relative;}                
                #divIcons > div:hover {background:#f5f5f5;}
            </style>
        </head>
        <body>

        <div id="divIcons">
        <div><i class="icon ion-alert"> </i></div>
        <div><i class="icon ion-alert-circled"> </i></div>
        <div><i class="icon ion-android-add"> </i></div>
        <div><i class="icon ion-android-add-circle"> </i></div>
        <div><i class="icon ion-android-alarm-clock"> </i></div>
        <div><i class="icon ion-android-alert"> </i></div>
        <div><i class="icon ion-android-apps"> </i></div>
        <div><i class="icon ion-android-archive"> </i></div>
        <div><i class="icon ion-android-arrow-back"> </i></div>
        <div><i class="icon ion-android-arrow-down"> </i></div>
        <div><i class="icon ion-android-arrow-dropdown"> </i></div>
        <div><i class="icon ion-android-arrow-dropdown-circle"> </i></div>
        <div><i class="icon ion-android-arrow-dropleft"> </i></div>
        <div><i class="icon ion-android-arrow-dropleft-circle"> </i></div>
        <div><i class="icon ion-android-arrow-dropright"> </i></div>
        <div><i class="icon ion-android-arrow-dropright-circle"> </i></div>
        <div><i class="icon ion-android-arrow-dropup"> </i></div>
        <div><i class="icon ion-android-arrow-dropup-circle"> </i></div>
        <div><i class="icon ion-android-arrow-forward"> </i></div>
        <div><i class="icon ion-android-arrow-up"> </i></div>
        <div><i class="icon ion-android-attach"> </i></div>
        <div><i class="icon ion-android-bar"> </i></div>
        <div><i class="icon ion-android-bicycle"> </i></div>
        <div><i class="icon ion-android-boat"> </i></div>
        <div><i class="icon ion-android-bookmark"> </i></div>
        <div><i class="icon ion-android-bulb"> </i></div>
        <div><i class="icon ion-android-bus"> </i></div>
        <div><i class="icon ion-android-calendar"> </i></div>
        <div><i class="icon ion-android-call"> </i></div>
        <div><i class="icon ion-android-camera"> </i></div>
        <div><i class="icon ion-android-cancel"> </i></div>
        <div><i class="icon ion-android-car"> </i></div>
        <div><i class="icon ion-android-cart"> </i></div>
        <div><i class="icon ion-android-chat"> </i></div>
        <div><i class="icon ion-android-checkbox"> </i></div>
        <div><i class="icon ion-android-checkbox-blank"> </i></div>
        <div><i class="icon ion-android-checkbox-outline"> </i></div>
        <div><i class="icon ion-android-checkbox-outline-blank"> </i></div>
        <div><i class="icon ion-android-checkmark-circle"> </i></div>
        <div><i class="icon ion-android-clipboard"> </i></div>
        <div><i class="icon ion-android-close"> </i></div>
        <div><i class="icon ion-android-cloud"> </i></div>
        <div><i class="icon ion-android-cloud-circle"> </i></div>
        <div><i class="icon ion-android-cloud-done"> </i></div>
        <div><i class="icon ion-android-cloud-outline"> </i></div>
        <div><i class="icon ion-android-color-palette"> </i></div>
        <div><i class="icon ion-android-compass"> </i></div>
        <div><i class="icon ion-android-contact"> </i></div>
        <div><i class="icon ion-android-contacts"> </i></div>
        <div><i class="icon ion-android-contract"> </i></div>
        <div><i class="icon ion-android-create"> </i></div>
        <div><i class="icon ion-android-delete"> </i></div>
        <div><i class="icon ion-android-desktop"> </i></div>
        <div><i class="icon ion-android-document"> </i></div>
        <div><i class="icon ion-android-done"> </i></div>
        <div><i class="icon ion-android-done-all"> </i></div>
        <div><i class="icon ion-android-download"> </i></div>
        <div><i class="icon ion-android-drafts"> </i></div>
        <div><i class="icon ion-android-exit"> </i></div>
        <div><i class="icon ion-android-expand"> </i></div>
        <div><i class="icon ion-android-favorite"> </i></div>
        <div><i class="icon ion-android-favorite-outline"> </i></div>
        <div><i class="icon ion-android-film"> </i></div>
        <div><i class="icon ion-android-folder"> </i></div>
        <div><i class="icon ion-android-folder-open"> </i></div>
        <div><i class="icon ion-android-funnel"> </i></div>
        <div><i class="icon ion-android-globe"> </i></div>
        <div><i class="icon ion-android-hand"> </i></div>
        <div><i class="icon ion-android-hangout"> </i></div>
        <div><i class="icon ion-android-happy"> </i></div>
        <div><i class="icon ion-android-home"> </i></div>
        <div><i class="icon ion-android-image"> </i></div>
        <div><i class="icon ion-android-laptop"> </i></div>
        <div><i class="icon ion-android-list"> </i></div>
        <div><i class="icon ion-android-locate"> </i></div>
        <div><i class="icon ion-android-lock"> </i></div>
        <div><i class="icon ion-android-mail"> </i></div>
        <div><i class="icon ion-android-map"> </i></div>
        <div><i class="icon ion-android-menu"> </i></div>
        <div><i class="icon ion-android-microphone"> </i></div>
        <div><i class="icon ion-android-microphone-off"> </i></div>
        <div><i class="icon ion-android-more-horizontal"> </i></div>
        <div><i class="icon ion-android-more-vertical"> </i></div>
        <div><i class="icon ion-android-navigate"> </i></div>
        <div><i class="icon ion-android-notifications"> </i></div>
        <div><i class="icon ion-android-notifications-none"> </i></div>
        <div><i class="icon ion-android-notifications-off"> </i></div>
        <div><i class="icon ion-android-open"> </i></div>
        <div><i class="icon ion-android-options"> </i></div>
        <div><i class="icon ion-android-people"> </i></div>
        <div><i class="icon ion-android-person"> </i></div>
        <div><i class="icon ion-android-person-add"> </i></div>
        <div><i class="icon ion-android-phone-landscape"> </i></div>
        <div><i class="icon ion-android-phone-portrait"> </i></div>
        <div><i class="icon ion-android-pin"> </i></div>
        <div><i class="icon ion-android-plane"> </i></div>
        <div><i class="icon ion-android-playstore"> </i></div>
        <div><i class="icon ion-android-print"> </i></div>
        <div><i class="icon ion-android-radio-button-off"> </i></div>
        <div><i class="icon ion-android-radio-button-on"> </i></div>
        <div><i class="icon ion-android-refresh"> </i></div>
        <div><i class="icon ion-android-remove"> </i></div>
        <div><i class="icon ion-android-remove-circle"> </i></div>
        <div><i class="icon ion-android-restaurant"> </i></div>
        <div><i class="icon ion-android-sad"> </i></div>
        <div><i class="icon ion-android-search"> </i></div>
        <div><i class="icon ion-android-send"> </i></div>
        <div><i class="icon ion-android-settings"> </i></div>
        <div><i class="icon ion-android-share"> </i></div>
        <div><i class="icon ion-android-share-alt"> </i></div>
        <div><i class="icon ion-android-star"> </i></div>
        <div><i class="icon ion-android-star-half"> </i></div>
        <div><i class="icon ion-android-star-outline"> </i></div>
        <div><i class="icon ion-android-stopwatch"> </i></div>
        <div><i class="icon ion-android-subway"> </i></div>
        <div><i class="icon ion-android-sunny"> </i></div>
        <div><i class="icon ion-android-sync"> </i></div>
        <div><i class="icon ion-android-textsms"> </i></div>
        <div><i class="icon ion-android-time"> </i></div>
        <div><i class="icon ion-android-train"> </i></div>
        <div><i class="icon ion-android-unlock"> </i></div>
        <div><i class="icon ion-android-upload"> </i></div>
        <div><i class="icon ion-android-volume-down"> </i></div>
        <div><i class="icon ion-android-volume-mute"> </i></div>
        <div><i class="icon ion-android-volume-off"> </i></div>
        <div><i class="icon ion-android-volume-up"> </i></div>
        <div><i class="icon ion-android-walk"> </i></div>
        <div><i class="icon ion-android-warning"> </i></div>
        <div><i class="icon ion-android-watch"> </i></div>
        <div><i class="icon ion-android-wifi"> </i></div>
        <div><i class="icon ion-aperture"> </i></div>
        <div><i class="icon ion-archive"> </i></div>
        <div><i class="icon ion-arrow-down-a"> </i></div>
        <div><i class="icon ion-arrow-down-b"> </i></div>
        <div><i class="icon ion-arrow-down-c"> </i></div>
        <div><i class="icon ion-arrow-expand"> </i></div>
        <div><i class="icon ion-arrow-graph-down-left"> </i></div>
        <div><i class="icon ion-arrow-graph-down-right"> </i></div>
        <div><i class="icon ion-arrow-graph-up-left"> </i></div>
        <div><i class="icon ion-arrow-graph-up-right"> </i></div>
        <div><i class="icon ion-arrow-left-a"> </i></div>
        <div><i class="icon ion-arrow-left-b"> </i></div>
        <div><i class="icon ion-arrow-left-c"> </i></div>
        <div><i class="icon ion-arrow-move"> </i></div>
        <div><i class="icon ion-arrow-resize"> </i></div>
        <div><i class="icon ion-arrow-return-left"> </i></div>
        <div><i class="icon ion-arrow-return-right"> </i></div>
        <div><i class="icon ion-arrow-right-a"> </i></div>
        <div><i class="icon ion-arrow-right-b"> </i></div>
        <div><i class="icon ion-arrow-right-c"> </i></div>
        <div><i class="icon ion-arrow-shrink"> </i></div>
        <div><i class="icon ion-arrow-swap"> </i></div>
        <div><i class="icon ion-arrow-up-a"> </i></div>
        <div><i class="icon ion-arrow-up-b"> </i></div>
        <div><i class="icon ion-arrow-up-c"> </i></div>
        <div><i class="icon ion-asterisk"> </i></div>
        <div><i class="icon ion-at"> </i></div>
        <div><i class="icon ion-backspace"> </i></div>
        <div><i class="icon ion-backspace-outline"> </i></div>
        <div><i class="icon ion-bag"> </i></div>
        <div><i class="icon ion-battery-charging"> </i></div>
        <div><i class="icon ion-battery-empty"> </i></div>
        <div><i class="icon ion-battery-full"> </i></div>
        <div><i class="icon ion-battery-half"> </i></div>
        <div><i class="icon ion-battery-low"> </i></div>
        <div><i class="icon ion-beaker"> </i></div>
        <div><i class="icon ion-beer"> </i></div>
        <div><i class="icon ion-bluetooth"> </i></div>
        <div><i class="icon ion-bonfire"> </i></div>
        <div><i class="icon ion-bookmark"> </i></div>
        <div><i class="icon ion-bowtie"> </i></div>
        <div><i class="icon ion-briefcase"> </i></div>
        <div><i class="icon ion-bug"> </i></div>
        <div><i class="icon ion-calculator"> </i></div>
        <div><i class="icon ion-calendar"> </i></div>
        <div><i class="icon ion-camera"> </i></div>
        <div><i class="icon ion-card"> </i></div>
        <div><i class="icon ion-cash"> </i></div>
        <div><i class="icon ion-chatbox"> </i></div>
        <div><i class="icon ion-chatbox-working"> </i></div>
        <div><i class="icon ion-chatboxes"> </i></div>
        <div><i class="icon ion-chatbubble"> </i></div>
        <div><i class="icon ion-chatbubble-working"> </i></div>
        <div><i class="icon ion-chatbubbles"> </i></div>
        <div><i class="icon ion-checkmark"> </i></div>
        <div><i class="icon ion-checkmark-circled"> </i></div>
        <div><i class="icon ion-checkmark-round"> </i></div>
        <div><i class="icon ion-chevron-down"> </i></div>
        <div><i class="icon ion-chevron-left"> </i></div>
        <div><i class="icon ion-chevron-right"> </i></div>
        <div><i class="icon ion-chevron-up"> </i></div>
        <div><i class="icon ion-clipboard"> </i></div>
        <div><i class="icon ion-clock"> </i></div>
        <div><i class="icon ion-close"> </i></div>
        <div><i class="icon ion-close-circled"> </i></div>
        <div><i class="icon ion-close-round"> </i></div>
        <div><i class="icon ion-closed-captioning"> </i></div>
        <div><i class="icon ion-cloud"> </i></div>
        <div><i class="icon ion-code"> </i></div>
        <div><i class="icon ion-code-download"> </i></div>
        <div><i class="icon ion-code-working"> </i></div>
        <div><i class="icon ion-coffee"> </i></div>
        <div><i class="icon ion-compass"> </i></div>
        <div><i class="icon ion-compose"> </i></div>
        <div><i class="icon ion-connection-bars"> </i></div>
        <div><i class="icon ion-contrast"> </i></div>
        <div><i class="icon ion-crop"> </i></div>
        <div><i class="icon ion-cube"> </i></div>
        <div><i class="icon ion-disc"> </i></div>
        <div><i class="icon ion-document"> </i></div>
        <div><i class="icon ion-document-text"> </i></div>
        <div><i class="icon ion-drag"> </i></div>
        <div><i class="icon ion-earth"> </i></div>
        <div><i class="icon ion-easel"> </i></div>
        <div><i class="icon ion-edit"> </i></div>
        <div><i class="icon ion-egg"> </i></div>
        <div><i class="icon ion-eject"> </i></div>
        <div><i class="icon ion-email"> </i></div>
        <div><i class="icon ion-email-unread"> </i></div>
        <div><i class="icon ion-erlenmeyer-flask"> </i></div>
        <div><i class="icon ion-erlenmeyer-flask-bubbles"> </i></div>
        <div><i class="icon ion-eye"> </i></div>
        <div><i class="icon ion-eye-disabled"> </i></div>
        <div><i class="icon ion-female"> </i></div>
        <div><i class="icon ion-filing"> </i></div>
        <div><i class="icon ion-film-marker"> </i></div>
        <div><i class="icon ion-fireball"> </i></div>
        <div><i class="icon ion-flag"> </i></div>
        <div><i class="icon ion-flame"> </i></div>
        <div><i class="icon ion-flash"> </i></div>
        <div><i class="icon ion-flash-off"> </i></div>
        <div><i class="icon ion-folder"> </i></div>
        <div><i class="icon ion-fork"> </i></div>
        <div><i class="icon ion-fork-repo"> </i></div>
        <div><i class="icon ion-forward"> </i></div>
        <div><i class="icon ion-funnel"> </i></div>
        <div><i class="icon ion-gear-a"> </i></div>
        <div><i class="icon ion-gear-b"> </i></div>
        <div><i class="icon ion-grid"> </i></div>
        <div><i class="icon ion-hammer"> </i></div>
        <div><i class="icon ion-happy"> </i></div>
        <div><i class="icon ion-happy-outline"> </i></div>
        <div><i class="icon ion-headphone"> </i></div>
        <div><i class="icon ion-heart"> </i></div>
        <div><i class="icon ion-heart-broken"> </i></div>
        <div><i class="icon ion-help"> </i></div>
        <div><i class="icon ion-help-buoy"> </i></div>
        <div><i class="icon ion-help-circled"> </i></div>
        <div><i class="icon ion-home"> </i></div>
        <div><i class="icon ion-icecream"> </i></div>
        <div><i class="icon ion-image"> </i></div>
        <div><i class="icon ion-images"> </i></div>
        <div><i class="icon ion-information"> </i></div>
        <div><i class="icon ion-information-circled"> </i></div>
        <div><i class="icon ion-ionic"> </i></div>
        <div><i class="icon ion-ios-alarm"> </i></div>
        <div><i class="icon ion-ios-alarm-outline"> </i></div>
        <div><i class="icon ion-ios-albums"> </i></div>
        <div><i class="icon ion-ios-albums-outline"> </i></div>
        <div><i class="icon ion-ios-americanfootball"> </i></div>
        <div><i class="icon ion-ios-americanfootball-outline"> </i></div>
        <div><i class="icon ion-ios-analytics"> </i></div>
        <div><i class="icon ion-ios-analytics-outline"> </i></div>
        <div><i class="icon ion-ios-arrow-back"> </i></div>
        <div><i class="icon ion-ios-arrow-down"> </i></div>
        <div><i class="icon ion-ios-arrow-forward"> </i></div>
        <div><i class="icon ion-ios-arrow-left"> </i></div>
        <div><i class="icon ion-ios-arrow-right"> </i></div>
        <div><i class="icon ion-ios-arrow-thin-down"> </i></div>
        <div><i class="icon ion-ios-arrow-thin-left"> </i></div>
        <div><i class="icon ion-ios-arrow-thin-right"> </i></div>
        <div><i class="icon ion-ios-arrow-thin-up"> </i></div>
        <div><i class="icon ion-ios-arrow-up"> </i></div>
        <div><i class="icon ion-ios-at"> </i></div>
        <div><i class="icon ion-ios-at-outline"> </i></div>
        <div><i class="icon ion-ios-barcode"> </i></div>
        <div><i class="icon ion-ios-barcode-outline"> </i></div>
        <div><i class="icon ion-ios-baseball"> </i></div>
        <div><i class="icon ion-ios-baseball-outline"> </i></div>
        <div><i class="icon ion-ios-basketball"> </i></div>
        <div><i class="icon ion-ios-basketball-outline"> </i></div>
        <div><i class="icon ion-ios-bell"> </i></div>
        <div><i class="icon ion-ios-bell-outline"> </i></div>
        <div><i class="icon ion-ios-body"> </i></div>
        <div><i class="icon ion-ios-body-outline"> </i></div>
        <div><i class="icon ion-ios-bolt"> </i></div>
        <div><i class="icon ion-ios-bolt-outline"> </i></div>
        <div><i class="icon ion-ios-book"> </i></div>
        <div><i class="icon ion-ios-book-outline"> </i></div>
        <div><i class="icon ion-ios-bookmarks"> </i></div>
        <div><i class="icon ion-ios-bookmarks-outline"> </i></div>
        <div><i class="icon ion-ios-box"> </i></div>
        <div><i class="icon ion-ios-box-outline"> </i></div>
        <div><i class="icon ion-ios-briefcase"> </i></div>
        <div><i class="icon ion-ios-briefcase-outline"> </i></div>
        <div><i class="icon ion-ios-browsers"> </i></div>
        <div><i class="icon ion-ios-browsers-outline"> </i></div>
        <div><i class="icon ion-ios-calculator"> </i></div>
        <div><i class="icon ion-ios-calculator-outline"> </i></div>
        <div><i class="icon ion-ios-calendar"> </i></div>
        <div><i class="icon ion-ios-calendar-outline"> </i></div>
        <div><i class="icon ion-ios-camera"> </i></div>
        <div><i class="icon ion-ios-camera-outline"> </i></div>
        <div><i class="icon ion-ios-cart"> </i></div>
        <div><i class="icon ion-ios-cart-outline"> </i></div>
        <div><i class="icon ion-ios-chatboxes"> </i></div>
        <div><i class="icon ion-ios-chatboxes-outline"> </i></div>
        <div><i class="icon ion-ios-chatbubble"> </i></div>
        <div><i class="icon ion-ios-chatbubble-outline"> </i></div>
        <div><i class="icon ion-ios-checkmark"> </i></div>
        <div><i class="icon ion-ios-checkmark-empty"> </i></div>
        <div><i class="icon ion-ios-checkmark-outline"> </i></div>
        <div><i class="icon ion-ios-circle-filled"> </i></div>
        <div><i class="icon ion-ios-circle-outline"> </i></div>
        <div><i class="icon ion-ios-clock"> </i></div>
        <div><i class="icon ion-ios-clock-outline"> </i></div>
        <div><i class="icon ion-ios-close"> </i></div>
        <div><i class="icon ion-ios-close-empty"> </i></div>
        <div><i class="icon ion-ios-close-outline"> </i></div>
        <div><i class="icon ion-ios-cloud"> </i></div>
        <div><i class="icon ion-ios-cloud-download"> </i></div>
        <div><i class="icon ion-ios-cloud-download-outline"> </i></div>
        <div><i class="icon ion-ios-cloud-outline"> </i></div>
        <div><i class="icon ion-ios-cloud-upload"> </i></div>
        <div><i class="icon ion-ios-cloud-upload-outline"> </i></div>
        <div><i class="icon ion-ios-cloudy"> </i></div>
        <div><i class="icon ion-ios-cloudy-night"> </i></div>
        <div><i class="icon ion-ios-cloudy-night-outline"> </i></div>
        <div><i class="icon ion-ios-cloudy-outline"> </i></div>
        <div><i class="icon ion-ios-cog"> </i></div>
        <div><i class="icon ion-ios-cog-outline"> </i></div>
        <div><i class="icon ion-ios-color-filter"> </i></div>
        <div><i class="icon ion-ios-color-filter-outline"> </i></div>
        <div><i class="icon ion-ios-color-wand"> </i></div>
        <div><i class="icon ion-ios-color-wand-outline"> </i></div>
        <div><i class="icon ion-ios-compose"> </i></div>
        <div><i class="icon ion-ios-compose-outline"> </i></div>
        <div><i class="icon ion-ios-contact"> </i></div>
        <div><i class="icon ion-ios-contact-outline"> </i></div>
        <div><i class="icon ion-ios-copy"> </i></div>
        <div><i class="icon ion-ios-copy-outline"> </i></div>
        <div><i class="icon ion-ios-crop"> </i></div>
        <div><i class="icon ion-ios-crop-strong"> </i></div>
        <div><i class="icon ion-ios-download"> </i></div>
        <div><i class="icon ion-ios-download-outline"> </i></div>
        <div><i class="icon ion-ios-drag"> </i></div>
        <div><i class="icon ion-ios-email"> </i></div>
        <div><i class="icon ion-ios-email-outline"> </i></div>
        <div><i class="icon ion-ios-eye"> </i></div>
        <div><i class="icon ion-ios-eye-outline"> </i></div>
        <div><i class="icon ion-ios-fastforward"> </i></div>
        <div><i class="icon ion-ios-fastforward-outline"> </i></div>
        <div><i class="icon ion-ios-filing"> </i></div>
        <div><i class="icon ion-ios-filing-outline"> </i></div>
        <div><i class="icon ion-ios-film"> </i></div>
        <div><i class="icon ion-ios-film-outline"> </i></div>
        <div><i class="icon ion-ios-flag"> </i></div>
        <div><i class="icon ion-ios-flag-outline"> </i></div>
        <div><i class="icon ion-ios-flame"> </i></div>
        <div><i class="icon ion-ios-flame-outline"> </i></div>
        <div><i class="icon ion-ios-flask"> </i></div>
        <div><i class="icon ion-ios-flask-outline"> </i></div>
        <div><i class="icon ion-ios-flower"> </i></div>
        <div><i class="icon ion-ios-flower-outline"> </i></div>
        <div><i class="icon ion-ios-folder"> </i></div>
        <div><i class="icon ion-ios-folder-outline"> </i></div>
        <div><i class="icon ion-ios-football"> </i></div>
        <div><i class="icon ion-ios-football-outline"> </i></div>
        <div><i class="icon ion-ios-game-controller-a"> </i></div>
        <div><i class="icon ion-ios-game-controller-a-outline"> </i></div>
        <div><i class="icon ion-ios-game-controller-b"> </i></div>
        <div><i class="icon ion-ios-game-controller-b-outline"> </i></div>
        <div><i class="icon ion-ios-gear"> </i></div>
        <div><i class="icon ion-ios-gear-outline"> </i></div>
        <div><i class="icon ion-ios-glasses"> </i></div>
        <div><i class="icon ion-ios-glasses-outline"> </i></div>
        <div><i class="icon ion-ios-grid-view"> </i></div>
        <div><i class="icon ion-ios-grid-view-outline"> </i></div>
        <div><i class="icon ion-ios-heart"> </i></div>
        <div><i class="icon ion-ios-heart-outline"> </i></div>
        <div><i class="icon ion-ios-help"> </i></div>
        <div><i class="icon ion-ios-help-empty"> </i></div>
        <div><i class="icon ion-ios-help-outline"> </i></div>
        <div><i class="icon ion-ios-home"> </i></div>
        <div><i class="icon ion-ios-home-outline"> </i></div>
        <div><i class="icon ion-ios-infinite"> </i></div>
        <div><i class="icon ion-ios-infinite-outline"> </i></div>
        <div><i class="icon ion-ios-information"> </i></div>
        <div><i class="icon ion-ios-information-empty"> </i></div>
        <div><i class="icon ion-ios-information-outline"> </i></div>
        <div><i class="icon ion-ios-ionic-outline"> </i></div>
        <div><i class="icon ion-ios-keypad"> </i></div>
        <div><i class="icon ion-ios-keypad-outline"> </i></div>
        <div><i class="icon ion-ios-lightbulb"> </i></div>
        <div><i class="icon ion-ios-lightbulb-outline"> </i></div>
        <div><i class="icon ion-ios-list"> </i></div>
        <div><i class="icon ion-ios-list-outline"> </i></div>
        <div><i class="icon ion-ios-location"> </i></div>
        <div><i class="icon ion-ios-location-outline"> </i></div>
        <div><i class="icon ion-ios-locked"> </i></div>
        <div><i class="icon ion-ios-locked-outline"> </i></div>
        <div><i class="icon ion-ios-loop"> </i></div>
        <div><i class="icon ion-ios-loop-strong"> </i></div>
        <div><i class="icon ion-ios-medical"> </i></div>
        <div><i class="icon ion-ios-medical-outline"> </i></div>
        <div><i class="icon ion-ios-medkit"> </i></div>
        <div><i class="icon ion-ios-medkit-outline"> </i></div>
        <div><i class="icon ion-ios-mic"> </i></div>
        <div><i class="icon ion-ios-mic-off"> </i></div>
        <div><i class="icon ion-ios-mic-outline"> </i></div>
        <div><i class="icon ion-ios-minus"> </i></div>
        <div><i class="icon ion-ios-minus-empty"> </i></div>
        <div><i class="icon ion-ios-minus-outline"> </i></div>
        <div><i class="icon ion-ios-monitor"> </i></div>
        <div><i class="icon ion-ios-monitor-outline"> </i></div>
        <div><i class="icon ion-ios-moon"> </i></div>
        <div><i class="icon ion-ios-moon-outline"> </i></div>
        <div><i class="icon ion-ios-more"> </i></div>
        <div><i class="icon ion-ios-more-outline"> </i></div>
        <div><i class="icon ion-ios-musical-note"> </i></div>
        <div><i class="icon ion-ios-musical-notes"> </i></div>
        <div><i class="icon ion-ios-navigate"> </i></div>
        <div><i class="icon ion-ios-navigate-outline"> </i></div>
        <div><i class="icon ion-ios-nutrition"> </i></div>
        <div><i class="icon ion-ios-nutrition-outline"> </i></div>
        <div><i class="icon ion-ios-paper"> </i></div>
        <div><i class="icon ion-ios-paper-outline"> </i></div>
        <div><i class="icon ion-ios-paperplane"> </i></div>
        <div><i class="icon ion-ios-paperplane-outline"> </i></div>
        <div><i class="icon ion-ios-partlysunny"> </i></div>
        <div><i class="icon ion-ios-partlysunny-outline"> </i></div>
        <div><i class="icon ion-ios-pause"> </i></div>
        <div><i class="icon ion-ios-pause-outline"> </i></div>
        <div><i class="icon ion-ios-paw"> </i></div>
        <div><i class="icon ion-ios-paw-outline"> </i></div>
        <div><i class="icon ion-ios-people"> </i></div>
        <div><i class="icon ion-ios-people-outline"> </i></div>
        <div><i class="icon ion-ios-person"> </i></div>
        <div><i class="icon ion-ios-person-outline"> </i></div>
        <div><i class="icon ion-ios-personadd"> </i></div>
        <div><i class="icon ion-ios-personadd-outline"> </i></div>
        <div><i class="icon ion-ios-photos"> </i></div>
        <div><i class="icon ion-ios-photos-outline"> </i></div>
        <div><i class="icon ion-ios-pie"> </i></div>
        <div><i class="icon ion-ios-pie-outline"> </i></div>
        <div><i class="icon ion-ios-pint"> </i></div>
        <div><i class="icon ion-ios-pint-outline"> </i></div>
        <div><i class="icon ion-ios-play"> </i></div>
        <div><i class="icon ion-ios-play-outline"> </i></div>
        <div><i class="icon ion-ios-plus"> </i></div>
        <div><i class="icon ion-ios-plus-empty"> </i></div>
        <div><i class="icon ion-ios-plus-outline"> </i></div>
        <div><i class="icon ion-ios-pricetag"> </i></div>
        <div><i class="icon ion-ios-pricetag-outline"> </i></div>
        <div><i class="icon ion-ios-pricetags"> </i></div>
        <div><i class="icon ion-ios-pricetags-outline"> </i></div>
        <div><i class="icon ion-ios-printer"> </i></div>
        <div><i class="icon ion-ios-printer-outline"> </i></div>
        <div><i class="icon ion-ios-pulse"> </i></div>
        <div><i class="icon ion-ios-pulse-strong"> </i></div>
        <div><i class="icon ion-ios-rainy"> </i></div>
        <div><i class="icon ion-ios-rainy-outline"> </i></div>
        <div><i class="icon ion-ios-recording"> </i></div>
        <div><i class="icon ion-ios-recording-outline"> </i></div>
        <div><i class="icon ion-ios-redo"> </i></div>
        <div><i class="icon ion-ios-redo-outline"> </i></div>
        <div><i class="icon ion-ios-refresh"> </i></div>
        <div><i class="icon ion-ios-refresh-empty"> </i></div>
        <div><i class="icon ion-ios-refresh-outline"> </i></div>
        <div><i class="icon ion-ios-reload"> </i></div>
        <div><i class="icon ion-ios-reverse-camera"> </i></div>
        <div><i class="icon ion-ios-reverse-camera-outline"> </i></div>
        <div><i class="icon ion-ios-rewind"> </i></div>
        <div><i class="icon ion-ios-rewind-outline"> </i></div>
        <div><i class="icon ion-ios-rose"> </i></div>
        <div><i class="icon ion-ios-rose-outline"> </i></div>
        <div><i class="icon ion-ios-search"> </i></div>
        <div><i class="icon ion-ios-search-strong"> </i></div>
        <div><i class="icon ion-ios-settings"> </i></div>
        <div><i class="icon ion-ios-settings-strong"> </i></div>
        <div><i class="icon ion-ios-shuffle"> </i></div>
        <div><i class="icon ion-ios-shuffle-strong"> </i></div>
        <div><i class="icon ion-ios-skipbackward"> </i></div>
        <div><i class="icon ion-ios-skipbackward-outline"> </i></div>
        <div><i class="icon ion-ios-skipforward"> </i></div>
        <div><i class="icon ion-ios-skipforward-outline"> </i></div>
        <div><i class="icon ion-ios-snowy"> </i></div>
        <div><i class="icon ion-ios-speedometer"> </i></div>
        <div><i class="icon ion-ios-speedometer-outline"> </i></div>
        <div><i class="icon ion-ios-star"> </i></div>
        <div><i class="icon ion-ios-star-half"> </i></div>
        <div><i class="icon ion-ios-star-outline"> </i></div>
        <div><i class="icon ion-ios-stopwatch"> </i></div>
        <div><i class="icon ion-ios-stopwatch-outline"> </i></div>
        <div><i class="icon ion-ios-sunny"> </i></div>
        <div><i class="icon ion-ios-sunny-outline"> </i></div>
        <div><i class="icon ion-ios-telephone"> </i></div>
        <div><i class="icon ion-ios-telephone-outline"> </i></div>
        <div><i class="icon ion-ios-tennisball"> </i></div>
        <div><i class="icon ion-ios-tennisball-outline"> </i></div>
        <div><i class="icon ion-ios-thunderstorm"> </i></div>
        <div><i class="icon ion-ios-thunderstorm-outline"> </i></div>
        <div><i class="icon ion-ios-time"> </i></div>
        <div><i class="icon ion-ios-time-outline"> </i></div>
        <div><i class="icon ion-ios-timer"> </i></div>
        <div><i class="icon ion-ios-timer-outline"> </i></div>
        <div><i class="icon ion-ios-toggle"> </i></div>
        <div><i class="icon ion-ios-toggle-outline"> </i></div>
        <div><i class="icon ion-ios-trash"> </i></div>
        <div><i class="icon ion-ios-trash-outline"> </i></div>
        <div><i class="icon ion-ios-undo"> </i></div>
        <div><i class="icon ion-ios-undo-outline"> </i></div>
        <div><i class="icon ion-ios-unlocked"> </i></div>
        <div><i class="icon ion-ios-unlocked-outline"> </i></div>
        <div><i class="icon ion-ios-upload"> </i></div>
        <div><i class="icon ion-ios-upload-outline"> </i></div>
        <div><i class="icon ion-ios-videocam"> </i></div>
        <div><i class="icon ion-ios-videocam-outline"> </i></div>
        <div><i class="icon ion-ios-volume-high"> </i></div>
        <div><i class="icon ion-ios-volume-low"> </i></div>
        <div><i class="icon ion-ios-wineglass"> </i></div>
        <div><i class="icon ion-ios-wineglass-outline"> </i></div>
        <div><i class="icon ion-ios-world"> </i></div>
        <div><i class="icon ion-ios-world-outline"> </i></div>
        <div><i class="icon ion-ipad"> </i></div>
        <div><i class="icon ion-iphone"> </i></div>
        <div><i class="icon ion-ipod"> </i></div>
        <div><i class="icon ion-jet"> </i></div>
        <div><i class="icon ion-key"> </i></div>
        <div><i class="icon ion-knife"> </i></div>
        <div><i class="icon ion-laptop"> </i></div>
        <div><i class="icon ion-leaf"> </i></div>
        <div><i class="icon ion-levels"> </i></div>
        <div><i class="icon ion-lightbulb"> </i></div>
        <div><i class="icon ion-link"> </i></div>
        <div><i class="icon ion-load-a"> </i></div>
        <div><i class="icon ion-load-b"> </i></div>
        <div><i class="icon ion-load-c"> </i></div>
        <div><i class="icon ion-load-d"> </i></div>
        <div><i class="icon ion-location"> </i></div>
        <div><i class="icon ion-lock-combination"> </i></div>
        <div><i class="icon ion-locked"> </i></div>
        <div><i class="icon ion-log-in"> </i></div>
        <div><i class="icon ion-log-out"> </i></div>
        <div><i class="icon ion-loop"> </i></div>
        <div><i class="icon ion-magnet"> </i></div>
        <div><i class="icon ion-male"> </i></div>
        <div><i class="icon ion-man"> </i></div>
        <div><i class="icon ion-map"> </i></div>
        <div><i class="icon ion-medkit"> </i></div>
        <div><i class="icon ion-merge"> </i></div>
        <div><i class="icon ion-mic-a"> </i></div>
        <div><i class="icon ion-mic-b"> </i></div>
        <div><i class="icon ion-mic-c"> </i></div>
        <div><i class="icon ion-minus"> </i></div>
        <div><i class="icon ion-minus-circled"> </i></div>
        <div><i class="icon ion-minus-round"> </i></div>
        <div><i class="icon ion-model-s"> </i></div>
        <div><i class="icon ion-monitor"> </i></div>
        <div><i class="icon ion-more"> </i></div>
        <div><i class="icon ion-mouse"> </i></div>
        <div><i class="icon ion-music-note"> </i></div>
        <div><i class="icon ion-navicon"> </i></div>
        <div><i class="icon ion-navicon-round"> </i></div>
        <div><i class="icon ion-navigate"> </i></div>
        <div><i class="icon ion-network"> </i></div>
        <div><i class="icon ion-no-smoking"> </i></div>
        <div><i class="icon ion-nuclear"> </i></div>
        <div><i class="icon ion-outlet"> </i></div>
        <div><i class="icon ion-paintbrush"> </i></div>
        <div><i class="icon ion-paintbucket"> </i></div>
        <div><i class="icon ion-paper-airplane"> </i></div>
        <div><i class="icon ion-paperclip"> </i></div>
        <div><i class="icon ion-pause"> </i></div>
        <div><i class="icon ion-person"> </i></div>
        <div><i class="icon ion-person-add"> </i></div>
        <div><i class="icon ion-person-stalker"> </i></div>
        <div><i class="icon ion-pie-graph"> </i></div>
        <div><i class="icon ion-pin"> </i></div>
        <div><i class="icon ion-pinpoint"> </i></div>
        <div><i class="icon ion-pizza"> </i></div>
        <div><i class="icon ion-plane"> </i></div>
        <div><i class="icon ion-planet"> </i></div>
        <div><i class="icon ion-play"> </i></div>
        <div><i class="icon ion-playstation"> </i></div>
        <div><i class="icon ion-plus"> </i></div>
        <div><i class="icon ion-plus-circled"> </i></div>
        <div><i class="icon ion-plus-round"> </i></div>
        <div><i class="icon ion-podium"> </i></div>
        <div><i class="icon ion-pound"> </i></div>
        <div><i class="icon ion-power"> </i></div>
        <div><i class="icon ion-pricetag"> </i></div>
        <div><i class="icon ion-pricetags"> </i></div>
        <div><i class="icon ion-printer"> </i></div>
        <div><i class="icon ion-pull-request"> </i></div>
        <div><i class="icon ion-qr-scanner"> </i></div>
        <div><i class="icon ion-quote"> </i></div>
        <div><i class="icon ion-radio-waves"> </i></div>
        <div><i class="icon ion-record"> </i></div>
        <div><i class="icon ion-refresh"> </i></div>
        <div><i class="icon ion-reply"> </i></div>
        <div><i class="icon ion-reply-all"> </i></div>
        <div><i class="icon ion-ribbon-a"> </i></div>
        <div><i class="icon ion-ribbon-b"> </i></div>
        <div><i class="icon ion-sad"> </i></div>
        <div><i class="icon ion-sad-outline"> </i></div>
        <div><i class="icon ion-scissors"> </i></div>
        <div><i class="icon ion-search"> </i></div>
        <div><i class="icon ion-settings"> </i></div>
        <div><i class="icon ion-share"> </i></div>
        <div><i class="icon ion-shuffle"> </i></div>
        <div><i class="icon ion-skip-backward"> </i></div>
        <div><i class="icon ion-skip-forward"> </i></div>
        <div><i class="icon ion-social-android"> </i></div>
        <div><i class="icon ion-social-android-outline"> </i></div>
        <div><i class="icon ion-social-angular"> </i></div>
        <div><i class="icon ion-social-angular-outline"> </i></div>
        <div><i class="icon ion-social-apple"> </i></div>
        <div><i class="icon ion-social-apple-outline"> </i></div>
        <div><i class="icon ion-social-bitcoin"> </i></div>
        <div><i class="icon ion-social-bitcoin-outline"> </i></div>
        <div><i class="icon ion-social-buffer"> </i></div>
        <div><i class="icon ion-social-buffer-outline"> </i></div>
        <div><i class="icon ion-social-chrome"> </i></div>
        <div><i class="icon ion-social-chrome-outline"> </i></div>
        <div><i class="icon ion-social-codepen"> </i></div>
        <div><i class="icon ion-social-codepen-outline"> </i></div>
        <div><i class="icon ion-social-css3"> </i></div>
        <div><i class="icon ion-social-css3-outline"> </i></div>
        <div><i class="icon ion-social-designernews"> </i></div>
        <div><i class="icon ion-social-designernews-outline"> </i></div>
        <div><i class="icon ion-social-dribbble"> </i></div>
        <div><i class="icon ion-social-dribbble-outline"> </i></div>
        <div><i class="icon ion-social-dropbox"> </i></div>
        <div><i class="icon ion-social-dropbox-outline"> </i></div>
        <div><i class="icon ion-social-euro"> </i></div>
        <div><i class="icon ion-social-euro-outline"> </i></div>
        <div><i class="icon ion-social-facebook"> </i></div>
        <div><i class="icon ion-social-facebook-outline"> </i></div>
        <div><i class="icon ion-social-foursquare"> </i></div>
        <div><i class="icon ion-social-foursquare-outline"> </i></div>
        <div><i class="icon ion-social-freebsd-devil"> </i></div>
        <div><i class="icon ion-social-github"> </i></div>
        <div><i class="icon ion-social-github-outline"> </i></div>
        <div><i class="icon ion-social-google"> </i></div>
        <div><i class="icon ion-social-google-outline"> </i></div>
        <div><i class="icon ion-social-googleplus"> </i></div>
        <div><i class="icon ion-social-googleplus-outline"> </i></div>
        <div><i class="icon ion-social-hackernews"> </i></div>
        <div><i class="icon ion-social-hackernews-outline"> </i></div>
        <div><i class="icon ion-social-html5"> </i></div>
        <div><i class="icon ion-social-html5-outline"> </i></div>
        <div><i class="icon ion-social-instagram"> </i></div>
        <div><i class="icon ion-social-instagram-outline"> </i></div>
        <div><i class="icon ion-social-javascript"> </i></div>
        <div><i class="icon ion-social-javascript-outline"> </i></div>
        <div><i class="icon ion-social-linkedin"> </i></div>
        <div><i class="icon ion-social-linkedin-outline"> </i></div>
        <div><i class="icon ion-social-markdown"> </i></div>
        <div><i class="icon ion-social-nodejs"> </i></div>
        <div><i class="icon ion-social-octocat"> </i></div>
        <div><i class="icon ion-social-pinterest"> </i></div>
        <div><i class="icon ion-social-pinterest-outline"> </i></div>
        <div><i class="icon ion-social-python"> </i></div>
        <div><i class="icon ion-social-reddit"> </i></div>
        <div><i class="icon ion-social-reddit-outline"> </i></div>
        <div><i class="icon ion-social-rss"> </i></div>
        <div><i class="icon ion-social-rss-outline"> </i></div>
        <div><i class="icon ion-social-sass"> </i></div>
        <div><i class="icon ion-social-skype"> </i></div>
        <div><i class="icon ion-social-skype-outline"> </i></div>
        <div><i class="icon ion-social-snapchat"> </i></div>
        <div><i class="icon ion-social-snapchat-outline"> </i></div>
        <div><i class="icon ion-social-tumblr"> </i></div>
        <div><i class="icon ion-social-tumblr-outline"> </i></div>
        <div><i class="icon ion-social-tux"> </i></div>
        <div><i class="icon ion-social-twitch"> </i></div>
        <div><i class="icon ion-social-twitch-outline"> </i></div>
        <div><i class="icon ion-social-twitter"> </i></div>
        <div><i class="icon ion-social-twitter-outline"> </i></div>
        <div><i class="icon ion-social-usd"> </i></div>
        <div><i class="icon ion-social-usd-outline"> </i></div>
        <div><i class="icon ion-social-vimeo"> </i></div>
        <div><i class="icon ion-social-vimeo-outline"> </i></div>
        <div><i class="icon ion-social-whatsapp"> </i></div>
        <div><i class="icon ion-social-whatsapp-outline"> </i></div>
        <div><i class="icon ion-social-windows"> </i></div>
        <div><i class="icon ion-social-windows-outline"> </i></div>
        <div><i class="icon ion-social-wordpress"> </i></div>
        <div><i class="icon ion-social-wordpress-outline"> </i></div>
        <div><i class="icon ion-social-yahoo"> </i></div>
        <div><i class="icon ion-social-yahoo-outline"> </i></div>
        <div><i class="icon ion-social-yen"> </i></div>
        <div><i class="icon ion-social-yen-outline"> </i></div>
        <div><i class="icon ion-social-youtube"> </i></div>
        <div><i class="icon ion-social-youtube-outline"> </i></div>
        <div><i class="icon ion-soup-can"> </i></div>
        <div><i class="icon ion-soup-can-outline"> </i></div>
        <div><i class="icon ion-speakerphone"> </i></div>
        <div><i class="icon ion-speedometer"> </i></div>
        <div><i class="icon ion-spoon"> </i></div>
        <div><i class="icon ion-star"> </i></div>
        <div><i class="icon ion-stats-bars"> </i></div>
        <div><i class="icon ion-steam"> </i></div>
        <div><i class="icon ion-stop"> </i></div>
        <div><i class="icon ion-thermometer"> </i></div>
        <div><i class="icon ion-thumbsdown"> </i></div>
        <div><i class="icon ion-thumbsup"> </i></div>
        <div><i class="icon ion-toggle"> </i></div>
        <div><i class="icon ion-toggle-filled"> </i></div>
        <div><i class="icon ion-transgender"> </i></div>
        <div><i class="icon ion-trash-a"> </i></div>
        <div><i class="icon ion-trash-b"> </i></div>
        <div><i class="icon ion-trophy"> </i></div>
        <div><i class="icon ion-tshirt"> </i></div>
        <div><i class="icon ion-tshirt-outline"> </i></div>
        <div><i class="icon ion-umbrella"> </i></div>
        <div><i class="icon ion-university"> </i></div>
        <div><i class="icon ion-unlocked"> </i></div>
        <div><i class="icon ion-upload"> </i></div>
        <div><i class="icon ion-usb"> </i></div>
        <div><i class="icon ion-videocamera"> </i></div>
        <div><i class="icon ion-volume-high"> </i></div>
        <div><i class="icon ion-volume-low"> </i></div>
        <div><i class="icon ion-volume-medium"> </i></div>
        <div><i class="icon ion-volume-mute"> </i></div>
        <div><i class="icon ion-wand"> </i></div>
        <div><i class="icon ion-waterdrop"> </i></div>
        <div><i class="icon ion-wifi"> </i></div>
        <div><i class="icon ion-wineglass"> </i></div>
        <div><i class="icon ion-woman"> </i></div>
        <div><i class="icon ion-wrench"> </i></div>
        <div><i class="icon ion-xbox"> </i></div>
        </div>

        <script type="text/javascript">
            var elms = document.querySelectorAll('#divIcons > div');
            for(var i=0;i<elms.length;i++) {
                elms[i].addEventListener('click', function(e){

                    var elm = e.target;
                    if(!elm.className) elm = elm.childNodes[0];
                    parent._cb.addIcon(elm.className)

                });
            }

        </script>

        </body>
        </html>
                
        
        `;
        return html;
    }

    addIcon(classname) {
        
        this.util.restoreSelection();

        if(this.builder.activeIcon) {

            this.builder.uo.saveForUndo();
            
            const arrSizes = this.builder.opts.fontSizeClassValues;

            // Get current class size
            var currentClassSize = '';
            for(var i=0;i<=arrSizes.length-1;i++){
                if (dom.hasClass(this.builder.activeIcon, 'size-'+arrSizes[i])) {
                    currentClassSize = 'size-'+arrSizes[i];
                }
            }

            this.builder.activeIcon.className = classname + (currentClassSize!==''? ' ' + currentClassSize: '');
            dom.addClass(this.builder.activeIcon, 'icon-active');

            dom.selectElementContents(this.builder.activeIcon);
            this.util.saveSelection();
        } else {
                
            if(!dom.textSelection()) return;

            this.builder.uo.saveForUndo();
            
            this.util.pasteHtmlAtCaret('<i class="' + classname + ' icon-active"></i>', true); 

            this.builder.activeIcon = document.querySelector('.icon-active');

            dom.selectElementContents(this.builder.activeIcon);
            this.util.saveSelection();
        }
    
        //Trigger Change event
        this.builder.opts.onChange();

        //Trigger Render event
        this.builder.opts.onRender();

    }

    clearFont() {
                
        this.builder.uo.saveForUndo();

        this.applyFont('','','');
    }

    applyFont(fontfamily, fontstyle, provider) {

        let elm;

        var panel = this.builderStuff.querySelector('.is-side.elementstyles');
        if(dom.hasClass(panel, 'active')) {
                
            this.builder.uo.saveForUndo();

            elm = this.builder.inspectedElement;

            elm.style.fontFamily = fontfamily;

            this.builderStuff.querySelector('#inpElmFontFamily').value = fontfamily; //direct (see elementpanel-text.js)
            
            this.elementStyleEditor.refresh();

        } else {
                
            try{
                let curr;
                if (window.getSelection) {
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if (curr.nodeType === 3) {  //text node
                        elm = curr.parentNode;
                    } else {
                        elm = curr;
                    }
                    if (elm.tagName !== 'H1' && elm.tagName !== 'H2' && elm.tagName !== 'H3' &&
                    elm.tagName !== 'H4' && elm.tagName !== 'H5' && elm.tagName !== 'H6' &&
                    elm.tagName !== 'P') {
                        elm = elm.parentNode;
                    }
                }
                else if (document.selection) {
                    curr = document.selection.createRange();
                    elm = document.selection.createRange().parentElement();

                    if (elm.tagName !== 'H1' && elm.tagName !== 'H2' && elm.tagName !== 'H3' &&
                    elm.tagName !== 'H4' && elm.tagName !== 'H5' && elm.tagName !== 'H6' &&
                    elm.tagName !== 'P') {
                        elm = elm.parentElement();
                    }
                }
            } catch(e) {return;}

            this.builder.uo.saveForUndo();

            var text = dom.getSelected();

            if(text.trim()!=='' && elm.innerText !== text) {
                document.execCommand('fontName', false, fontfamily);
                var fontElements = document.getElementsByTagName('font');
                for (var i = 0, len = fontElements.length; i < len; ++i) {
                    if (fontElements[i].face === fontfamily) {
                        fontElements[i].removeAttribute('face');
                        fontElements[i].style.fontFamily = fontfamily;
                        dom.selectElementContents(fontElements[i]);
                        // if(this.builder.isTouchSupport) dom.addClass(fontElements[i], 'textblock-active');
                    }
                }

            } else if(text.trim()!=='' && elm.innerText === text) { //selection fully mode on text AND element. Use element then.
                elm.style.fontFamily = fontfamily;            
            } else {
                elm.style.fontFamily = fontfamily;
            }
            
        }

        
        var o = fontstyle;
        if (!o) { 
            o = ''; 
        } else { 
            o = ':' + o; 
        }

        var fontname = fontfamily.split(',')[0];
        if(provider==='google'){
            var bExist = false;
            var links=document.getElementsByTagName('link'); 
            for(i=0;i<links.length;i++) {                        
                var sSrc=links[i].href.toLowerCase();                        
                sSrc = sSrc.replace(/\+/g,' ').replace(/%20/g,' '); 
                if(sSrc.indexOf(fontname.toLowerCase())!==-1) bExist=true;
            }
            if(!bExist) {

                var element = elm;
                while(!dom.hasClass(element, 'is-builder')){
                    element = element.parentNode;
                }
                dom.appendHtml(element, '<link href="//fonts.googleapis.com/css?family=' + fontname + o + '" rel="stylesheet" property="stylesheet" type="text/css">');
                                         
            }
        }

        if(!this.builder.inspectedElement){ 
            //save selection
            this.util.saveSelection(); //Needed because after format, a tag is added (ex. <span>), so, make selection again. 

            if(this.builder.isTouchSupport) { //prevent keyboard open
                const btnFocus = this.rteTool.querySelector('button'); 
                btnFocus.focus();
            }

            this.getState();
        }
        
        //Trigger Change event
        this.builder.opts.onChange();
        setTimeout(()=>{
            this.builder.opts.onChange();
        },300);

        //LATER: make function
        //Cleanup Google font css link

        links=document.getElementsByTagName('link'); 
        for(i=0;i<links.length;i++) {                        
            sSrc=links[i].href.toLowerCase();                        
            if(sSrc.indexOf('googleapis')!==-1) {
                //get fontname
                sSrc = sSrc.replace(/\+/g,' ').replace(/%20/g,' '); 
                fontname = sSrc.substr( sSrc.indexOf('family=') + 7 );
                if(fontname.indexOf(':') !== -1){
                    fontname = fontname.split(':')[0];
                }
                if(fontname.indexOf('|') !== -1){
                    fontname = fontname.split('|')[0];
                }
                //check if fontname used in content
                var tmp = document.body.innerHTML.toLowerCase();

                var count = tmp.split(fontname).length;     
                if(count<3){
                    //not used     
                    var attr = links[i].getAttribute('data-protect');
                    if (!attr) {
                        links[i].setAttribute('data-rel','_del');
                    }
                }
            }
        }
        
        [].forEach.call(document.querySelectorAll('link[data-rel="_del"]'),function(e){
            e.parentNode.removeChild(e);
        });

    }

    setFont(fontfamily, fontstyle, fontdisplay, provider) { // NEW 4.0.5

        let elm;

        var panel = this.builderStuff.querySelector('.is-side.elementstyles');
        if(dom.hasClass(panel, 'active')) {
                
            this.builder.uo.saveForUndo();

            elm = this.builder.inspectedElement;

            elm.style.fontFamily = fontfamily;

            this.builderStuff.querySelector('#inpElmFontFamily').value = fontfamily; //direct (see elementpanel-text.js)
            
            this.elementStyleEditor.refresh();

        } else {

            if(this.builder.isIE) this.util.restoreSelection(); //a must (IE)

            try{
                let curr;
                if (window.getSelection) {
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if (curr.nodeType === 3) {  //text node
                        elm = curr.parentNode;
                    } else {
                        elm = curr;
                    }
                    if (elm.tagName !== 'H1' && elm.tagName !== 'H2' && elm.tagName !== 'H3' &&
                    elm.tagName !== 'H4' && elm.tagName !== 'H5' && elm.tagName !== 'H6' &&
                    elm.tagName !== 'P') {
                        elm = elm.parentNode;
                    }
                }
                else if (document.selection) {
                    curr = document.selection.createRange();
                    elm = document.selection.createRange().parentElement();

                    if (elm.tagName !== 'H1' && elm.tagName !== 'H2' && elm.tagName !== 'H3' &&
                    elm.tagName !== 'H4' && elm.tagName !== 'H5' && elm.tagName !== 'H6' &&
                    elm.tagName !== 'P') {
                        elm = elm.parentElement();
                    }
                }
            } catch(e) {return;}

            this.builder.uo.saveForUndo();

            var text = dom.getSelected();

            if(text.trim()!=='' && elm.innerText !== text) {
                document.execCommand('fontName', false, fontfamily); // this removes all quotes, so needs to make valid later (below).
                var fontElements = document.getElementsByTagName('font');
                for (var i = 0, len = fontElements.length; i < len; ++i) {
                    // fontElements[i].face = Press Start 2p, cursive => no quotes here
                    // fontfamily = 'Press Start 2p', cursive
                    if (fontElements[i].face.replace(/'/g, '') === fontfamily.replace(/'/g, '')) {
                        fontElements[i].removeAttribute('face');
                        fontElements[i].style.fontFamily = fontfamily;
                        dom.selectElementContents(fontElements[i]);
                        // if(this.builder.isTouchSupport) dom.addClass(fontElements[i], 'textblock-active');
                    }
                }

                //cleaning added <span face="">.
                // example: 
                // <p style="text-align: justify;"><span style="font-family: &quot;Press Start 2p&quot;, cursive;">Lorem </span>
                // <span style="font-family: &quot;M PLUS Rounded 1c&quot;, sans-serif;">Ipsum</span>
                // <span face="Press Start 2p, cursive;"> is simply dummy text of the printing and typesetting industry...</span></p>
                fontElements = document.querySelectorAll('[face]');
                for (i = 0, len = fontElements.length; i < len; ++i) {
                    // Make valid (adding quotes):
                    let tmp = fontElements[i].getAttribute('face');
                    if(tmp.indexOf(',')!==-1){
                        var f1 = tmp.split(',')[0];
                        var f2 = tmp.split(',')[1];
                        if(f1.indexOf(' ') !== -1) {
                            tmp = `'${f1}',${f2}`;
                        }
                    }
                    fontElements[i].style.fontFamily = tmp;
                    fontElements[i].removeAttribute('face');
                }

            } else if(text.trim()!=='' && elm.innerText === text) { //selection fully mode on text AND element. Use element then.
                elm.style.fontFamily = fontfamily;
                
                let allfonts = elm.querySelectorAll('*');
                Array.prototype.forEach.call(allfonts, (item) => {
                    if(item.style.fontFamily!==''){
                        item.style.fontFamily = '';
                    }
                });
                
            } else {
                elm.style.fontFamily = fontfamily;
            }
            
        }
        
        
        var o = fontstyle;
        if (!o) { 
            o = ''; 
        } else { 
            o = ':' + o; 
        }

        var d = ''; // NEW 4.0.5
        if(fontdisplay) {
            d = '&display=swap';
        }

        var fontname = fontfamily.split(',')[0];

        fontname = fontname.replace(/'/g, ''); // NEW 4.0.5 (replace quotes in font family)

        if(provider==='google'){
            var bExist = false;
            var links=document.getElementsByTagName('link'); 
            for(i=0;i<links.length;i++) {                        
                var sSrc=links[i].href.toLowerCase();                        
                sSrc = sSrc.replace(/\+/g,' ').replace(/%20/g,' '); 
                if(sSrc.indexOf(fontname.toLowerCase())!==-1) bExist=true;
            }
            if(!bExist) {
                
                var element = elm;
                while(!dom.hasClass(element, 'is-builder')){
                    element = element.parentNode;
                }
                dom.appendHtml(element, '<link href="//fonts.googleapis.com/css?family=' + fontname + d + o + '" rel="stylesheet" property="stylesheet" type="text/css">');
                                         
            }
        }

        if(!this.builder.inspectedElement){ 
            //save selection
            this.util.saveSelection(); //Needed because after format, a tag is added (ex. <span>), so, make selection again. 

            if(this.builder.isTouchSupport) { //prevent keyboard open
                const btnFocus = this.rteTool.querySelector('button'); 
                btnFocus.focus();
            }

            this.getState();
        }
        
        //Trigger Change event
        this.builder.opts.onChange();

        //LATER: make function
        //Cleanup Google font css link

        links=document.getElementsByTagName('link'); 
        for(i=0;i<links.length;i++) {                        
            sSrc=links[i].href.toLowerCase();                        
            if(sSrc.indexOf('googleapis')!==-1) {
                //get fontname
                sSrc = sSrc.replace(/\+/g,' ').replace(/%20/g,' '); 
                fontname = sSrc.substr( sSrc.indexOf('family=') + 7 );
                if(fontname.indexOf(':') !== -1){
                    fontname = fontname.split(':')[0];
                }
                if(fontname.indexOf('|') !== -1){
                    fontname = fontname.split('|')[0];
                }

                fontname = fontname.replace('&display=swap',''); // NEW 4.0.5
                //console.log(fontname);
                //check if fontname used in content
                let tmp = document.body.innerHTML.toLowerCase();

                var count = tmp.split(fontname).length;     
                if(count<3){
                    //not used     
                    var attr = links[i].getAttribute('data-protect');
                    if (!attr) {
                        links[i].setAttribute('data-rel','_del');
                    }
                }
            }
        }
        
        [].forEach.call(document.querySelectorAll('link[data-rel="_del"]'),function(e){
            e.parentNode.removeChild(e);
        });

    }

    positionToolbar() {

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if(this.builder.opts.toolbar === 'left' || this.builder.opts.toolbar === 'right') {

            let h = this.rteTool.offsetHeight;

            let top = (viewportHeight/2) - (h/2);

            this.rteTool.style.left = '';
            this.rteTool.style.top = top + 'px';

            // Element Toolbar
            h = this.elementRteTool.offsetHeight;

            top = (viewportHeight/2) - (h/2);

            this.elementRteTool.style.left = '';
            this.elementRteTool.style.top = top + 'px';
            
            
        } else {

            let w = this.rteTool.offsetWidth;
    
            let left = (viewportWidth/2) - (w/2);
    
            this.rteTool.style.top = '';
            this.rteTool.style.left = left + 'px';

            // Element Toolbar
            w = this.elementRteTool.offsetWidth;
    
            left = (viewportWidth/2) - (w/2);
    
            this.elementRteTool.style.top = '';
            this.elementRteTool.style.left = left + 'px';

        }
    }

}

export default Rte;