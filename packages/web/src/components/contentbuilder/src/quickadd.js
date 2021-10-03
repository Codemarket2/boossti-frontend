import { Util, Dom } from './util.js';

const dom = new Dom();

const renderQuickAdd = (builder) => {

    const util = new Util(builder);

    const builderStuff = util.builderStuff();
    let quickadd = builderStuff.querySelector('.quickadd');
    if(!quickadd) {
        const html = `<div class="is-pop quickadd arrow-right" style="z-index:10003;">
        <div class="is-pop-close" style="display:none;z-index:1;width:40px;height:40px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:40px;font-size: 12px;color:#777;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.47);width:40px;height:40px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div>
        <div class="is-pop-tabs">
            <div class="is-pop-tab-item active" data-value="left">${util.out('Add to Left')}</div>
            <div class="is-pop-tab-item" data-value="right">${util.out('Add to Right')}</div>
        </div>
        <div style="padding:8px;display:flex;flex-direction:row;flex-flow: wrap;justify-content: center;align-items: center;">
            <button title="${util.out('Paragraph')}" class="add-paragraph"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#icon-align-full"></use></svg></span>${util.out('Paragraph')}</button>
            <button title="${util.out('Headline')}" class="add-headline"><span style="font-family:serif;display:block;margin:0 0 8px;">H</span>${util.out('Headline')}</button>
            <button title="${util.out('Image')}" class="add-image"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex ion-image" style="width:14px;height:14px;"><use xlink:href="#ion-image"></use></svg></span>${util.out('Image')}</button>
            <button title="${util.out('Heading 1')}" class="add-heading1"><span style="font-family:serif;display:block;margin:0 0 8px;">H1</span>${util.out('Heading 1')}</button>
            <button title="${util.out('Heading 2')}" class="add-heading2"><span style="font-family:serif;display:block;margin:0 0 8px;">H2</span>${util.out('Heading 2')}</button>
            <button title="${util.out('Heading 3')}" class="add-heading3"><span style="font-family:serif;display:block;margin:0 0 8px;">H3</span>${util.out('Heading 3')}</button>
            <button title="${util.out('List')}" class="add-list"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:13px;height:13px;"><use xlink:href="#icon-list-bullet"></use></svg></span>${util.out('List')}</button>
            <button title="${util.out('Quote')}" class="add-quote"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:13px;height:13px;"><use xlink:href="#ion-quote"></use></svg></span>${util.out('Quote')}</button>
            <button title="${util.out('Preformatted')}" class="add-preformatted"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:13px;height:13px;"><use xlink:href="#ion-code"></use></svg></span>${util.out('Preformatted')}</button>
            <button title="${util.out('Table')}" class="add-table"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#icon-table"></use></svg></use></svg></svg></span>${util.out('Table')}</button>
            <button title="${util.out('Spacer')}" class="add-spacer"><span style="display:block;margin:0 0 8px;"><span style="display:inline-block;background:#eee;width:30px;height:5px;"></span></span>${util.out('Spacer')}</button>
            ${(builder.opts.emailMode ? '':`<button title="${util.out('Button')}" class="add-button"><span style="display:block;margin:0 0 8px;"><span style="display:inline-block;border:#a1a1a1 1px solid;background:#f3f3f3;width:15px;height:6px;"></span></span>${util.out('Button')}</button>`)}
            <button title="${util.out('More...')}" class="add-more classic" style="width:100%;height:45px;margin-top:10px;flex-direction:initial;">${util.out('More...')}</button>
        </div>
        </div>
        
        <div class="is-modal snippets">
            <div style="max-width:1250px;height:90%;padding:0;">
            <iframe style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>
            </div>
        </div>
        `;

        dom.appendHtml(builderStuff, html);
        quickadd = builderStuff.querySelector('.quickadd');

        document.addEventListener('click', (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement;  
            
            if(quickadd.style.display === 'flex') {
                let a = dom.parentsHasClass(target, 'quickadd');
                let b = dom.parentsHasClass(target, 'row-add');
                let c = dom.parentsHasClass(target, 'is-rowadd-tool');
                let d = dom.parentsHasClass(target, 'cell-add');
                let f = dom.parentsHasClass(target, 'elm-add');
                let g = dom.parentsHasClass(target, 'row-add-initial');
                if(a||b||c||d||f||g) {
                    return;
                }
                else {
                    quickadd.style.display = '';
                }
            }
            
        });

        let tabs = quickadd.querySelectorAll('.is-pop-tab-item');
        Array.prototype.forEach.call(tabs, (tab) => {
            dom.addEventListener(tab, 'click', (e) => {
                let elms = quickadd.querySelectorAll('.is-pop-tab-item');
                Array.prototype.forEach.call(elms, (elm) => {
                    dom.removeClass(elm, 'active');
                });
                dom.addClass(e.target, 'active');

                let val = quickadd.querySelector('.active').getAttribute('data-value');
                if(val==='left') {
                    quickadd.setAttribute('data-mode', 'cell-left');
                } else {
                    quickadd.setAttribute('data-mode', 'cell-right');
                }
            });
        });
    
        let elm = quickadd.querySelector('.add-paragraph');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');

            const html = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>`;

            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-headline');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = `<div class="display">
                <h1>Headline Goes Here</h1>
                <p>Lorem Ipsum is simply dummy text</p>
            </div>`;
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-image');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');

            let html = '<img onload="imageLoaded(this)" src="' + builder.opts.snippetPath + 'example.jpg" alt="" />';
            if(builder.opts.snippetSampleImage !== '') {
                html = builder.opts.snippetSampleImage;
            }

            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-heading1');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = '<h1>Heading 1 here</h1>';
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-heading2');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = '<h2>Heading 2 here</h2>';
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-heading3');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = '<h3>Heading 3 here</h3>';
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-preformatted');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = `<pre>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.</pre>`;
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-list');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = `<ul style="list-style: initial;padding-left: 20px;">
                <li>Lorem Ipsum is simply dummy text</li>
                <li>Lorem Ipsum is simply dummy text</li>
            </ul>`;
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-quote');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = '<blockquote>Lorem Ipsum is simply dummy text</blockquote>';
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-button');
        if(elm) dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = '<a href="#" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Read More</a>';
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-spacer');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = '<div class="spacer height-80"></div>';
    
            util.addContent(html, mode, 'data-noedit');
    
        });

        elm = quickadd.querySelector('.add-table');
        dom.addEventListener(elm, 'click', () => {
            const mode = quickadd.getAttribute('data-mode');
    
            const html = `<table class="default" style="border-collapse:collapse;width:100%;">
                <tr>
                    <td><br></td>
                    <td><br></td>
                </tr>
                <tr>
                    <td><br></td>
                    <td><br></td>
                </tr>
            </table>`;
    
            util.addContent(html, mode);
    
        });

        elm = quickadd.querySelector('.add-more');
        dom.addEventListener(elm, 'click', () => {
   
            let modal = builderStuff.querySelector('.snippets');
            util.showModal(modal, false, null, false);

            let iframe = modal.querySelector('iframe');
            if(iframe.src==='about:blank') {
                iframe.src = builder.opts.snippetData;
            }

            quickadd.style.display = '';

        });

    }
    
    return quickadd;
};

export default renderQuickAdd;