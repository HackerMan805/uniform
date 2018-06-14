import {onClick} from '../utils';

export default class AccordionComponent extends window.HTMLElement {
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

    connectedCallback () {
        const sections = [...this.querySelectorAll('section')];
        sections.forEach((section, index) => {
            section.classList.toggle('collapsed', index > 0);
            const header = section.querySelector('header');
            if (!header) {
                console.error('Missing header for accordion. Skipping on click event', this);
                return;
            }
            onClick(header, () => {
                section.classList.toggle('collapsed');
                if (this.multiple) {
                    return;
                }
                sections
                    .filter(otherSection => otherSection !== section)
                    .forEach(otherSection => otherSection.classList.add('collapsed'));
            });
        });
    }
};
