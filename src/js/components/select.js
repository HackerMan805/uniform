import { onClick } from '../utils';

/**
 * # Uniform select menu
 *
 * A custom select menu that displays differently from the browser `<select>`
 * menu
 *
 * ## Usage
 *
 * ```
 * <uniform-select>
 *   <select-title>
 *     Current item
 *   </select-title>
 *   <select-menu>
 *     <select-item>
 *       item 1
 *     </select-item>
 *     <select-item>
 *       item 2
 *     </select-item>
 *     <select-item>
 *       item 3
 *     </select-item>
 *   </select-menu>
 * </uniform-select>
 * ```
 */
export default class SelectComponent extends window.HTMLElement {
    constructor () {
        super();
    }

    get multiple () {
        return this.hasAttribute('multiple');
    }
    set multiple (val) {
        if (val) {
            this.setAttribute('multiple', '');
        } else {
            this.removeAttribute('multiple');
        }
    }

    toggle () {
        this.classList.toggle('open');
    }

    close () {
        this.classList.remove('open');
    }

    open () {
        this.classList.add('open');
    }

    connectedCallback () {
        // Observer for child node changes for framework that dynamically add
        // child node with their templating.  With each new node being added,
        // we want to close the select menu when this select menu does not
        // allow multiple
        const observer = new MutationObserver(mutations => {
            if (this.allowMultiple) {
                return;
            }
            mutations.forEach(mutation => {
                Array.prototype.slice.call(mutation.addedNodes)
                    .filter(n => n.nodeName === 'SELECT-ITEM')
                    .forEach(node => {
                            onClick(node, this.close.bind(this));
                            return;
                    });
            });
        });
        var config = { childList: true };
        observer.observe(this, config);
        // add event listener to existing select-items
        [...this.querySelectorAll('select-item')]
            .forEach(n => {
                onClick(n, this.close.bind(this));
            });

        // add event listener under body to close select menu
        onClick(document.querySelector('body'), this.close.bind(this));
        [...document.querySelectorAll('uniform-modal')]
            .forEach(function(modal) {
                onClick(modal, this.close.bind(this));
            });
        onClick(this.querySelector('select-title'), this.toggle.bind(this));
    }
};
