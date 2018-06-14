import {onClick} from '../utils';

export default class NotificationComponent extends window.HTMLElement {
    constructor () {
        super();
    }

    connectedCallback () {
        const closeButton = this.querySelector('.close');
        if (!closeButton) {
            return;
        }
        onClick(closeButton, () => this.remove());
    }
}
