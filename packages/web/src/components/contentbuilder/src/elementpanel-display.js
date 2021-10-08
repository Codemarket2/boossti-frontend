import { Dom, Util } from './util.js';
import ElementStyleEditor from './elementpanel-css.js';

const dom = new Dom();

class ElementDisplayStyles {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        const elementStyleEditor = new ElementStyleEditor(builder);

        let panelStuff = builderStuff.querySelector('#divElementDisplay');
        this.panelStuff = panelStuff;
        
        const html = `
            <div style="margin-top:13px;font-weight:bold;">${util.out('Display')}</div>

            <div class="is-settings clearfix" style="width:100%;">
                <div style="display:flex">
                    <select id="inpElmDisplay" style="width:110px;">
                        <option value=""></option>
                        <option value="block">Block</option>
                        <option value="inline-block">Inline Block</option>
                        <option value="inline">Inline</option>
                        <option value="flex">Flex</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>

            <div style="margin-top:25px;font-weight:bold;width:100%;">${util.out('Flex')}</div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Direction')}:</div>
                <div style="display:flex">
                    <select id="inpElmFlexDirection" style="width:110px;">
                        <option value=""></option>
                        <option value="row">Row</option>
                        <option value="row-reverse">Row Reverse</option>
                        <option value="column">Column</option>
                        <option value="column-reverse">Column Reverse</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Wrap')}:</div>
                <div style="display:flex">
                    <select id="inpElmFlexWrap" style="width:110px;">
                        <option value=""></option>
                        <option value="no-wrap">No Wrap</option>
                        <option value="wrap">Wrap</option>
                        <option value="wrap-reverse">Wrap Reverse</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:100%;">
                <div>${util.out('Justify Content')}:</div>
                <div style="display:flex">
                    <select id="inpElmJustifyContent" style="width:110px;">
                        <option value=""></option>
                        <option value="center">Center</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-between">Space Between</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Align Items')}:</div>
                <div style="display:flex">
                    <select id="inpElmAlignItems" style="width:110px;">
                        <option value=""></option>
                        <option value="center">Center</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="stretch">Stretch</option>
                        <option value="baseline">Baseline</option>
                    </select>
                </div>
            </div>

            <div class="is-settings clearfix" style="width:120px;">
                <div>${util.out('Align Content')}:</div>
                <div style="display:flex">
                    <select id="inpElmAlignContent" style="width:110px;">
                        <option value=""></option>
                        <option value="center">Center</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="stretch">Stretch</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-between">Space Between</option>
                    </select>
                </div>
            </div>
        `;
        dom.appendHtml(panelStuff, html);


        const inpElmDisplay = panelStuff.querySelector('#inpElmDisplay');
        inpElmDisplay.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmDisplay').value;
            
            elm.style.display = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmFlexDirection = panelStuff.querySelector('#inpElmFlexDirection');
        inpElmFlexDirection.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmFlexDirection').value;
            
            elm.style.flexDirection = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmFlexWrap = panelStuff.querySelector('#inpElmFlexWrap');
        inpElmFlexWrap.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmFlexWrap').value;
            
            elm.style.flexWrap = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmJustifyContent = panelStuff.querySelector('#inpElmJustifyContent');
        inpElmJustifyContent.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmJustifyContent').value;
            
            elm.style.justifyContent = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmAlignItems = panelStuff.querySelector('#inpElmAlignItems');
        inpElmAlignItems.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmAlignItems').value;
            
            elm.style.alignItems = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

        const inpElmAlignContent = panelStuff.querySelector('#inpElmAlignContent');
        inpElmAlignContent.addEventListener('change', () => {

            this.builder.uo.saveForUndo();

            let elm = this.builder.inspectedElement;

            let val = panelStuff.querySelector('#inpElmAlignContent').value;
            
            elm.style.alignContent = val;

            elementStyleEditor.refresh();
        
            //Trigger Change event
            this.builder.opts.onChange();
        });

    }

    readElementStyles(elm) {

        let panelStuff = this.panelStuff; 

        const inpElmDisplay = panelStuff.querySelector('#inpElmDisplay');
        inpElmDisplay.value = '';
        let s = elm.style.display;
        if(s) inpElmDisplay.value = s;

        const inpElmFlexDirection = panelStuff.querySelector('#inpElmFlexDirection');
        inpElmFlexDirection.value = '';
        s = elm.style.flexDirection;
        if(s) inpElmFlexDirection.value = s;
        
        const inpElmFlexWrap = panelStuff.querySelector('#inpElmFlexWrap');
        inpElmFlexWrap.value = '';
        s = elm.style.flexWrap;
        if(s) inpElmFlexWrap.value = s;
        
        const inpElmJustifyContent = panelStuff.querySelector('#inpElmJustifyContent');
        inpElmJustifyContent.value = '';
        s = elm.style.justifyContent;
        if(s) inpElmJustifyContent.value = s;
        
        const inpElmAlignItems = panelStuff.querySelector('#inpElmAlignItems');
        inpElmAlignItems.value = '';
        s = elm.style.alignItems;
        if(s) inpElmAlignItems.value = s;
        
        const inpElmAlignContent = panelStuff.querySelector('#inpElmAlignContent');
        inpElmAlignContent.value = '';
        s = elm.style.alignContent;
        if(s) inpElmAlignContent.value = s;
        
    }
}

export default ElementDisplayStyles;