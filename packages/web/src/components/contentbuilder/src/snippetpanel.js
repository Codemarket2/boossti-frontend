import { Util, Dom } from './util.js';
import Dropdown from './dropdown.js';
import Sortable from 'sortablejs';

const dom = new Dom();

const renderSnippetPanel = (builder) => {

    const util = new Util(builder);
    const builderStuff = util.builderStuff();

    let hideHandle = '';
    let sidePanel = builder.opts.sidePanel;

    if(builder.opts.snippetList ==='#divSnippetList') {

        const html = `<div id="divSnippetList" class="is-side ${(sidePanel === 'right' ? '' : ' fromleft')} snippetlist">
            </div>`;

        dom.appendHtml(builderStuff, html);

        if(!builder.opts.snippetHandle){
            hideHandle = 'display:none;';
        }

    } else {
        hideHandle = 'display:none;';
        sidePanel = 'left';
    }

    let defaultcat = '';
    let defaultcatval = '';
    let catoptions = '';
    if(builder.opts.emailMode) {
        defaultcatval = builder.opts.defaultEmailSnippetCategory;
        for(let i=0;i<builder.opts.emailSnippetCategories.length;i++){
            catoptions +=  '<div data-value="' + builder.opts.emailSnippetCategories[i][0] + '">' + builder.opts.emailSnippetCategories[i][1] + '</div>';
            if(builder.opts.emailSnippetCategories[i][0] === builder.opts.defaultEmailSnippetCategory) defaultcat = builder.opts.emailSnippetCategories[i][1];
        }
    } else {
        defaultcatval = builder.opts.defaultSnippetCategory;
        for(let i=0;i<builder.opts.snippetCategories.length;i++){
            catoptions += '<div data-value="' + builder.opts.snippetCategories[i][0] + '">' + builder.opts.snippetCategories[i][1] + '</div>';
            if(builder.opts.snippetCategories[i][0] === builder.opts.defaultSnippetCategory) defaultcat = builder.opts.snippetCategories[i][1];
        }
    }

    let html_snippets = '' +
        '<div style="position:absolute;top:0;right:0;padding: 0;width:100%;z-index:2;">' +
            '<div class="is-selectbox snippet-cat" data-group="snippet-cat" data-value="' + defaultcatval + '">' +
                '<span>' + defaultcat + '</span>' +
                '<svg class="is-icon-flex" style="position:absolute;top:13px;right:10px;"><use xlink:href="#ion-android-arrow-dropdown"></use></svg>' +
            '</div>' +
            '<div class="is-selectbox-options" data-group="snippet-cat">' +
                catoptions +
            '</div>' +
        '</div>' +
        (sidePanel==='right'? 
            '<div id="divSnippetScrollUp" style="top:calc(50% - 27px);right:25px;">&#9650;</div>' +
            '<div id="divSnippetScrollDown" style="top:calc(50% + 27px);right:25px;">&#9660;</div>' +
            '<div id="divSnippetHandle" title="' + util.out('Snippets') + '" data-title="' + util.out('Snippets') + '" style="' + hideHandle + '">' +
                '<svg class="is-icon-flex"><use xlink:href="#ion-ios-arrow-left"></use></svg>' +
            '</div>' : 
            '<div id="divSnippetScrollUp" style="top:calc(50% - 27px);left:10px;">&#9650;</div>' +
            '<div id="divSnippetScrollDown" style="top:calc(50% + 27px);left:10px;">&#9660;</div>' +
            '<div id="divSnippetHandle" title="' + util.out('Snippets') + '" data-title="' + util.out('Snippets') + '" style="' + hideHandle + '">' +
                '<svg class="is-icon-flex"><use xlink:href="#ion-ios-arrow-right"></use></svg>' +
            '</div>') +         
            '<div class="is-design-list">' +
            '</div>';

    let snippetPanel = document.querySelector(builder.opts.snippetList);
    
    dom.appendHtml(snippetPanel, html_snippets);

    if(builder.opts.snippetList ==='#divSnippetList') {

        // Hide snippet panel on content click
        document.addEventListener('click', (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement;  
                
            if(builder.opts.snippetsSidebarDisplay === 'auto') {
                if(dom.hasClass(snippetPanel,'active')) {
                    // let a = dom.parentsHasAttribute(target, 'contenteditable');
                    // let b = dom.parentsHasClass(target, 'is-builder'); // builder area
                    // if(a||b) {
                    //     hideSnippets(builder);
                    // }
                    let a = dom.parentsHasClass(target, 'is-builder'); // builder area
                    if(a) {
                        hideSnippets(builder);
                    }
                }
            }

        }, false); 
    }

    const snippetlist = document.querySelector('.is-design-list');

    let snippetPath = builder.opts.snippetPath;

    /*
    Hide slider snippets (backward compatible)
    let bHideSliderSnippet = false;
    try{
        if (typeof jQuery.fn.slick === 'undefined') {
            bHideSliderSnippet = true;
        }
    } catch(e){
        bHideSliderSnippet = true;
    }
    */

    // Hide slider snippet if slick is not included
    var bHideSliderSnippet = true;
    if(window.jQuery) {
        if(window.jQuery.fn.slick) {
            bHideSliderSnippet = false;
        }
    }
    if(bHideSliderSnippet){
        for (let i = 0; i < builder.opts.snippetJSON.snippets.length; i++) {
            if (builder.opts.snippetJSON.snippets[i].thumbnail.indexOf('element-slider.png') !== -1) {
                builder.opts.snippetJSON.snippets.splice(i, 1);
                break;
            }
        }
    }
    // /Hide slider snippets

    let index = 1;
    if(builder.opts.emailMode) {

        builder.opts.snippetJSON.snippets.forEach(item => {
            item.id = index; //Give id to each record
            if (item.category === builder.opts.defaultEmailSnippetCategory+'') {
                dom.appendHtml(snippetlist, '<div class="snippet-item" data-id="' + item.id + '" data-cat="' + item.category + '"><img src="' + snippetPath + item.thumbnail + '"></div>');
            }
            index++;
        });

    } else {

        builder.opts.snippetJSON.snippets.forEach(item => {
            item.id = index; //Give id to each record
            if (item.category === builder.opts.defaultSnippetCategory+'') {
                dom.appendHtml(snippetlist, '<div class="snippet-item" data-id="' + item.id + '" data-cat="' + item.category + '"><img src="' + snippetPath + item.thumbnail + '"></div>');
            }
            index++;
        });

    }

    let userAgentString = navigator.userAgent; 
    let safariAgent = userAgentString.indexOf('Safari') > -1; 
    let chromeAgent = userAgentString.indexOf('Chrome') > -1; 
    if ((chromeAgent) && (safariAgent)) safariAgent = false;

    new Sortable(snippetlist, {
        forceFallback: safariAgent,
        group: {
            name: 'shared',
            pull: 'clone',
            put: false // Do not allow items to be put into this list
        },
        sort: false,
        animation: 150,
        onMove: () => {
            let emptyinfo = document.querySelector('.row-add-initial'); // if there is empty info, remove it during snippet drag drop
            // if(emptyinfo) emptyinfo.parentNode.removeChild(emptyinfo);
            if(emptyinfo) emptyinfo.style.display = 'none';
        },
        onStart: () => {

            builder.uo.saveForUndo(); // Even if cancelled, saveForUndo will make sure not to save if there is no change 
            
            let elm = document.querySelector('.is-sidebar-overlay');
            if(elm) elm.style.display = 'none'; // LATER: ContentBox
        },
        onEnd: () => {
            let elm = document.querySelector('.is-sidebar-overlay');
            if(elm) elm.style.display = 'block'; // LATER: ContentBox
            util.checkEmpty(); // In case container is still empty (drag drop snippet cancelled)
            
            let emptyinfo = document.querySelector('.row-add-initial');
            if(emptyinfo) emptyinfo.style.display = '';
        },
    });
    
    new Dropdown(document.querySelector('.snippet-cat'), {
        onChange: (value)=>{
            let cat = value;

            let elms = snippetlist.querySelectorAll('.snippet-item');
            let exist = false;
            Array.prototype.forEach.call(elms, (elm) => {
                if(elm.getAttribute('data-cat')===cat) exist=true;
            });
            if (!exist) {
                builder.opts.snippetJSON.snippets.forEach(item => {
                    if (item.category === cat) {
                        dom.appendHtml(snippetlist, '<div class="snippet-item" data-id="' + item.id + '" data-cat="' + item.category + '"><img src="' + snippetPath + item.thumbnail + '"></div>');
                    }
                });
            }
            if(cat) {
                //let elms = snippetlist.querySelectorAll('.snippet-item');
                Array.prototype.forEach.call(elms, (elm) => {
                    dom.addClass(elm,'hide');
                });
                Array.prototype.forEach.call(elms, (elm) => {
                    if(elm.getAttribute('data-cat')===cat) {
                        elm.className = elm.className.replace(/hide/g, '');
                    }
                });
            }
        }
    });

    if(builder.opts.snippetList ==='#divSnippetList') {

        const snippethandle = snippetPanel.querySelector('#divSnippetHandle');
        dom.addEventListener(snippethandle, 'click', () => {

            toggleSnippets(builder);

            util.clearActiveCell();

            util.clearControls();

        });

        const viewportWidth = window.innerWidth;
        if(builder.opts.snippetOpen && viewportWidth>=960){

            snippetPanel.style.cssText = 'transition: all ease 0.8s;';
            setTimeout(function(){
                toggleSnippets(builder); 
            },100);

            setTimeout(function(){
                snippetPanel.style.cssText = '';
            },1300);
            
        } 

    }

    //Scroll helper
    let scrollup = snippetPanel.querySelector('#divSnippetScrollUp');
    let scrolldown = snippetPanel.querySelector('#divSnippetScrollDown');
    // if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {

    // } else {
    //     scrollup.style.display = 'none';
    //     scrolldown.style.display = 'none';
    // }
    scrollup.style.display = 'none';
    scrolldown.style.display = 'none';

    /*
    TODO
    
    var maxScroll=100000000;       
    jQuery('#divSnippetScrollUp').css('display','none');
    jQuery('#divSnippetScrollUp').on("click touchup", function(e) { 
        jQuery(".is-design-list").animate({ scrollTop: (jQuery(".is-design-list").scrollTop() - (jQuery(".is-design-list").height()-150) ) + "px" },300, function(){
            if(jQuery(".is-design-list").scrollTop()!=0){
                jQuery('#divSnippetScrollUp').fadeIn(300);
            } else {
                    jQuery('#divSnippetScrollUp').fadeOut(300);
            }
            if(jQuery(".is-design-list").scrollTop() != maxScroll){
                jQuery('#divSnippetScrollDown').fadeIn(300);
            } else {
                    jQuery('#divSnippetScrollDown').fadeOut(300);
            }  
        });           

        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });            
    jQuery('#divSnippetScrollDown').on("click touchup", function(e) {                         
        jQuery(".is-design-list").animate({ scrollTop: (jQuery(".is-design-list").scrollTop() + (jQuery(".is-design-list").height()-150) ) + "px" }, 300, function() {
            if(jQuery(".is-design-list").scrollTop()!=0){
                jQuery('#divSnippetScrollUp').fadeIn(300);
            } else {
                jQuery('#divSnippetScrollUp').fadeOut(300);
        
            }
            if(maxScroll===100000000){
                maxScroll = jQuery('.is-design-list').prop('scrollHeight') - jQuery('.is-design-list').height() - 30;
            }  
            
            if(jQuery(".is-design-list").scrollTop() != maxScroll){
                jQuery('#divSnippetScrollDown').fadeIn(300);
            } else {
                jQuery('#divSnippetScrollDown').fadeOut(300);
            }  
        });

        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });
    */

};

function toggleSnippets(builder) {
    
    let snippetPanel = document.querySelector('#divSnippetList');

    const snippethandle = snippetPanel.querySelector('#divSnippetHandle');

    if(dom.hasClass(snippetPanel,'active')) {

        dom.removeClass(snippetPanel, 'active');

        if(builder.opts.sidePanel==='right'){
            snippethandle.innerHTML = '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>';
        } else {
            snippethandle.innerHTML = '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>';
        }            

    } else {

        dom.addClass(snippetPanel, 'active');

        if(builder.opts.sidePanel==='right'){
            snippethandle.innerHTML = '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>';
        } else {
            snippethandle.innerHTML = '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>';
        }
    }
}

function hideSnippets(builder) {
    
    let snippetPanel = document.querySelector('#divSnippetList');

    const snippethandle = snippetPanel.querySelector('#divSnippetHandle');

    dom.removeClass(snippetPanel, 'active');

    if(builder.opts.sidePanel==='right'){
        snippethandle.innerHTML = '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>';
    } else {
        snippethandle.innerHTML = '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>';
    } 
}

export default renderSnippetPanel;