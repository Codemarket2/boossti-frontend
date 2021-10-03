import { Util, Dom } from './util.js';

const dom = new Dom();

class Tooltip{
    constructor(builder) {
        
        const util = new Util(builder);
        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let tooltip = builderStuff.querySelector('.is-tooltip');
        if(!tooltip){
            let html = '<div class="is-tooltip"></div>';
            dom.appendHtml(builderStuff, html);
            tooltip = builderStuff.querySelector('.is-tooltip');

        }
        this.tooltip = tooltip;

    }

    setAll(o) {
        let area;
        if(!o) area = this.builderStuff;
        else area = o;
        //let elms = Array.prototype.slice.call(this.builderStuff.querySelectorAll('[data-title]')).concat(Array.prototype.slice.call(document.querySelectorAll('.is-builder .is-tool [data-title]')));
        let elms = area.querySelectorAll('[data-title]');
        Array.prototype.forEach.call(elms, (elm) => {

            this.set(elm, 0, 0);

        });

    }

    set(elm, topadj, leftadj) {
        
        if(!topadj) topadj=0;
        if(!leftadj) leftadj=0;


        let tooltip = this.tooltip;

        elm.addEventListener('mouseover', function(e){
            var relTarget = e.relatedTarget;
            if (this === relTarget || isAChildOf(this, relTarget)) return; 
            
            elm = this;

            const style = window.getComputedStyle(elm.parentNode);
            let direction = style.getPropertyValue('flex-direction');
            //console.log(style.flexDirection); 

            let s = elm.getAttribute('data-title');
            tooltip.innerHTML = s;
            const top = elm.getBoundingClientRect().top + window.pageYOffset;
            const left = elm.getBoundingClientRect().left + window.pageXOffset;
            //console.log(top + ' - ' + left);
            tooltip.style.display = 'flex';
            const w = elm.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            const h = elm.offsetHeight;

            tooltip.style.marginRight=''; //reset

            const viewportWidth = window.innerWidth;
            tooltip.style.top = (top + h + 5 + topadj) + 'px';
            if(h<30) {
                tooltip.style.top = (top + h + 2 + topadj) + 'px';
            }
            if(direction === 'column') {
                tooltip.style.top = (top + h/2 - tooltip.offsetHeight/2 + topadj) + 'px';
                tooltip.style.left = (left + w + 3 + leftadj) + 'px';

                if(viewportWidth - (left + w) < 100) { // 100 or tooltip.offsetWidth
                    tooltip.style.left = (left - tooltip.offsetWidth - 3 + leftadj) + 'px';
                }
            } else {
                let tooltipLeft = left+ w/2 - tooltip.offsetWidth/2 + leftadj;
                tooltip.style.left = tooltipLeft + 'px'; // center

                // Adjustment for snippet handle tooltip (or any other that is outside viewport)
                let rightedge = tooltipLeft + tooltip.offsetWidth;
                if(rightedge > viewportWidth) { 
                    let adj = rightedge - viewportWidth;
                    tooltip.style.left = (tooltipLeft - adj - 3) + 'px'; //3 = additional adjustment

                    if(tooltip.offsetHeight>25) tooltip.style.marginRight = '5px'; // to fix incorrect position if tooltip has more than 1 line
                } 
                if(tooltipLeft<0) {
                    tooltip.style.left = '3px';
                }
            }

            // overide
            let tipOnTop = elm.hasAttribute('data-tooltip-top');
            if(tipOnTop) {
                tooltip.style.top = (top - tooltip.offsetHeight - 3) + 'px'; //10 = additional adjustment
            } 

            elm.removeAttribute('title');
            
        }, false);

        elm.addEventListener('mouseout', function(e){

            var relTarget = e.relatedTarget;
            if (this === relTarget || isAChildOf(this, relTarget)) return; 

            elm = this;
            elm.setAttribute('title', elm.getAttribute('data-title'));
            tooltip.style.display = 'none';
            
        }, false);

        elm.addEventListener('click', function(e){

            var relTarget = e.relatedTarget;
            if (this === relTarget || isAChildOf(this, relTarget)) return; 

            elm = this;
            elm.setAttribute('title', elm.getAttribute('data-title'));
            tooltip.style.display = 'none';

        }, false);
    }
}

// https://stackoverflow.com/questions/8399408/mouseover-mouseout-eventlistener-inheriting-to-child-nodes
function isAChildOf(parent, child) {
    if (parent === child) { 
        return false; 
    }
    while (child && child !== parent) { 
        child = child.parentNode; 
    }
    return child === parent;
}

export default Tooltip;