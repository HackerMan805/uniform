import '@webcomponents/webcomponentsjs/webcomponents-bundle';

import AccordionComponent from './components/accordion';
import DrawerComponent from './components/drawer';
import ExampleComponent from './components/example';
import ModalComponent from './components/modal';
import NotificationComponent from './components/notification';
import SelectComponent from './components/select';

main();

function main () {
    if (!window.customElements) {
        console.error('Failed to detect window.customElements. Did you import webcomponents polyfill?');
        return;
    }
    window.customElements.define('uniform-accordion', AccordionComponent);
    window.customElements.define('uniform-drawer', DrawerComponent);
    window.customElements.define('uniform-example', ExampleComponent);
    window.customElements.define('uniform-modal', ModalComponent);
    window.customElements.define('uniform-notification', NotificationComponent);
    window.customElements.define('uniform-select', SelectComponent);
}

