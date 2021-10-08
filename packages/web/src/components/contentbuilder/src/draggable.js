/*
Draggable
Insipred by: https://www.kirupa.com/html5/drag.htm
*/

let initialX, initialY, currentX, currentY, xOffset, yOffset, dragActive, activeDraggableBox;

export class Draggable{

    constructor(opts = {}) {
        this.opts = opts;

        const elms = document.querySelectorAll(this.opts.selector);

        Array.prototype.forEach.call(elms, (elm) => {
            elm.setAttribute('draggable','');

            elm.addEventListener('touchstart', this.dragStart, false);
            elm.addEventListener('touchend', this.dragEnd, false);

            elm.addEventListener('mousedown', this.dragStart, false);
            elm.addEventListener('mouseup', this.dragEnd, false);
        });

        document.addEventListener('touchmove', this.drag, false);
        document.addEventListener('mousemove', this.drag, false);

        // if(this.isTouchSupport) {

        //     window.addEventListener('touchmove', (e)=>{
        //         e.returnValue = true;
        //         if (dragActive) {
        //             e.preventDefault();
        //         }
        //     },
        //         {
        //             passive: dragActive
        //         }
        //     ); 

        // }

    }

    dragStart(e) {
        
        if(!e.target.hasAttribute('draggable')) return; //any child element (ex. close button) should not be draggable. LATER: revew.

        dragActive = true;
        activeDraggableBox = e.target.parentElement;
    
        var xOffset;
        var yOffset;
        if (!activeDraggableBox.getAttribute('data-xOffset')) {
            activeDraggableBox.setAttribute('data-xOffset', 0);
            xOffset = 0;
        } else {
            xOffset = activeDraggableBox.getAttribute('data-xOffset');
        }
        if (!activeDraggableBox.getAttribute('data-yOffset')) {
            activeDraggableBox.setAttribute('data-yOffset', 0);
            yOffset = 0;
        } else {
            yOffset = activeDraggableBox.getAttribute('data-yOffset');
        }
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        activeDraggableBox.setAttribute('data-initialX', initialX);
        activeDraggableBox.setAttribute('data-initialY', initialY);
    }
    
    dragEnd(e) {
    
        if(!e.target.hasAttribute('draggable')) return; //any child element (ex. close button) should not be draggable. LATER: revew.
    
        //Update
        currentX = activeDraggableBox.getAttribute('data-currentX');
        currentY = activeDraggableBox.getAttribute('data-currentY');
        initialX = currentX;
        initialY = currentY;
        activeDraggableBox.setAttribute('data-initialX', initialX);
        activeDraggableBox.setAttribute('data-initialY', initialY);
    
        dragActive = false;
    }
    
    drag(e) {
        if (dragActive) {

            e.preventDefault();
    
            var initialX = activeDraggableBox.getAttribute('data-initialX');
            var initialY = activeDraggableBox.getAttribute('data-initialY');
    
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
    
            activeDraggableBox.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
    
            //Save
            activeDraggableBox.setAttribute('data-currentX', currentX);
            activeDraggableBox.setAttribute('data-currentY', currentY);
    
            xOffset = currentX;
            yOffset = currentY;
    
            activeDraggableBox.setAttribute('data-xOffset', xOffset);
            activeDraggableBox.setAttribute('data-yOffset', yOffset);
        }
    }

    isTouchSupport() {
        if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            return true;
        }else {
            return false;
        }
    }

}

export default Draggable;

