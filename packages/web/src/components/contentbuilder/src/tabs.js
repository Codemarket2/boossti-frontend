import { Dom } from './util.js';

const dom = new Dom();

class Tabs {
    constructor(){
        
        let tabs = document.querySelectorAll('.is-tabs a');
        Array.prototype.forEach.call(tabs, (tab) => {

            dom.addEventListener(tab, 'click', (e) => { 

                const menuid = tab.getAttribute('data-menu');
                if(menuid) {
                    document.querySelector('#' + menuid).style.display = 'block';
                    e.preventDefault();
                    return false;
                }

                if(dom.hasClass(tab, 'active')) {
                    e.preventDefault();
                    return false;
                }
                const id = tab.getAttribute('data-content');
                if(!id) {
                    e.preventDefault();
                    return false;
                }

                const group = tab.parentNode.getAttribute('data-group');

                let samegrouptabs = document.querySelectorAll('.is-tabs[data-group="' + group + '"] > a');
                Array.prototype.forEach.call(samegrouptabs, (samegrouptab) => {
                    dom.removeClass(samegrouptab, 'active');
                });
                samegrouptabs = document.querySelectorAll('.is-tabs-more[data-group="' + group + '"] > a');
                Array.prototype.forEach.call(samegrouptabs, (samegrouptab) => {
                    dom.removeClass(samegrouptab, 'active');
                });
                dom.addClass(tab, 'active');

                let samegroupcontents = document.querySelectorAll('.is-tab-content[data-group="' + group + '"]');
                Array.prototype.forEach.call(samegroupcontents, (samegroupcontent) => {
                    samegroupcontent.style.display = 'none';
                });
                document.querySelector('#' + id).style.display = 'flex';

                document.querySelector('.is-tabs-more').style.display = 'none';

                e.preventDefault();
                return false;
            });

        });

        tabs = document.querySelectorAll('.is-tabs-more a');
        Array.prototype.forEach.call(tabs, (tab) => {
       
            dom.addEventListener(tab, 'click', (e) => { 
                if(dom.hasClass(tab, 'active')) {
                    e.preventDefault();
                    return false;
                }
                const id = tab.getAttribute('data-content');
                if(!id) {
                    e.preventDefault();
                    return false;
                }

                const group = tab.parentNode.getAttribute('data-group');

                let samegrouptabs = document.querySelectorAll('.is-tabs[data-group="' + group + '"] > a');
                Array.prototype.forEach.call(samegrouptabs, (samegrouptab) => {
                    dom.removeClass(samegrouptab, 'active');
                });
                samegrouptabs = document.querySelectorAll('.is-tabs-more[data-group="' + group + '"] > a');
                Array.prototype.forEach.call(samegrouptabs, (samegrouptab) => {
                    dom.removeClass(samegrouptab, 'active');
                });
                dom.addClass(tab, 'active');
            
                const samegroupcontents = document.querySelectorAll('.is-tab-content[data-group="' + group + '"]');
                Array.prototype.forEach.call(samegroupcontents, (samegroupcontent) => {
                    samegroupcontent.style.display = 'none';
                });
                if(document.querySelector('#' + id)) document.querySelector('#' + id).style.display = 'flex';

                if(document.querySelector('.is-tabs-more')) document.querySelector('.is-tabs-more').style.display = 'none';

                e.preventDefault();
                return false;

            });
        });


        // Click anywhere will hide is-tabs-more
        let bTabsMoreOpen = false;
        
        // Drag anything will hide is-tabs-more
        document.addEventListener('mousedown', (e) => { // mousedown is triggered before click
            e = e || window.event;
            var target = e.target || e.srcElement;  

            let tabsMoreMenus = document.querySelectorAll('.is-tabs-more');
            Array.prototype.forEach.call(tabsMoreMenus, (tabsMoreMenu) => {
                if(tabsMoreMenu.style.display === 'block') {
                    bTabsMoreOpen = true;
                }
            });

            if(bTabsMoreOpen) {
                let a = dom.parentsHasAttribute(target, 'data-menu');
                // let a = dom.parentsHasClass(target, 'is-tabs');
                let b = dom.parentsHasClass(target, 'is-tabs-more');
                if (!(a||b)) {
                    if(document.querySelector('.is-tabs-more')) document.querySelector('.is-tabs-more').style.display = 'none';
                }
            }
        });  
        
        document.addEventListener('click', (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement;  
            
            if(bTabsMoreOpen) {
                let a = dom.parentsHasAttribute(target, 'data-menu');
                // let a = dom.parentsHasClass(target, 'is-tabs');
                let b = dom.parentsHasClass(target, 'is-tabs-more');
                if (!(a||b)) {
                    if(document.querySelector('.is-tabs-more')) document.querySelector('.is-tabs-more').style.display = 'none';
                }
            }
        });
        
    }
}

export default Tabs;