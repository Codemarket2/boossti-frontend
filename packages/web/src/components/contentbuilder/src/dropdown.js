import { Dom } from './util.js';

const dom = new Dom();

class Dropdown {
    constructor(element, opts = {}) {

        let defaults = {
            
            onChange: function(){},

        };

        this.opts = Object.assign(this, defaults, opts);

        const selectbox = element;
        let groupname = selectbox.getAttribute('data-group');
        let dropdown = document.querySelector('.is-selectbox-options[data-group="' + groupname + '"]');
        if(this.opts.dropdown) dropdown = this.opts.dropdown;

        dom.addEventListener(selectbox, 'click', () => {

            if(dropdown.style.display === 'none') {

                let dropdowns = document.querySelectorAll('.is-selectbox-options');
                Array.prototype.forEach.call(dropdowns, (elm) => {
                    elm.style.display = 'none';
                }); 

                dropdown.style.display = 'block';

                let elms = dom.elementChildren(dropdown);
                elms.forEach((elm) => {
                    dom.removeClass(elm, 'selected');
                });
                
                let value = selectbox.getAttribute('data-value');
                let optionselected = dropdown.querySelector('[data-value="' + value + '"]');
                if(optionselected) {
                    dom.addClass(optionselected, 'selected');
                }
            } else {
                dropdown.style.display = 'none';
            }

        });

        const elms = dom.elementChildren(dropdown);
        elms.forEach((elm) => {
            
            dom.addEventListener(elm, 'click', () => {
                dropdown.style.display = 'none';

                let cat = elm.getAttribute('data-value');
                selectbox.querySelector('span').innerHTML = elm.innerHTML;
                selectbox.setAttribute('data-value', cat);

                this.opts.onChange(cat);

            });

        });

    } 

}

export default Dropdown;
