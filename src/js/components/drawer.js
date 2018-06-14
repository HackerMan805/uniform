import {onClick} from '../utils';

export default class DrawerComponent extends window.HTMLElement {
    constructor () {
        super();
    }

    open () {
        this.style.top = (window.pageYOffset !== 0) ?
            window.pageYOffset + 'px' :
            '3.125em'; // hard-coded topbar height
        document.body.style.overflow = 'hidden';

        this.overlay = document.createElement('uniform-overlay');
        document.body.appendChild(uniform.overlay);
        this.overlay.style.top = window.pageYOffset + 'px';
        onClick(this.overlay, this.close.bind(this));

        this.classList.add('open');
    }

    close () {
        this.overlay.remove();
        document.body.style.overflow = undefined;
        this.classList.remove('open');
    }
};
