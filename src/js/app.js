import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

import AccordionComponent from './components/accordion';
import DrawerComponent from './components/drawer';
import ExampleComponent from './components/example';
import ModalComponent from './components/modal';
import NotificationComponent from './components/notification';
import SelectComponent from './components/select';
// TODO: Replace with more sustainable solution
import './libraries/dropbox';
import UploaderComponent from './components/uploader';


main();

function main () {
    if (!window.customElements) {
        console.error('Failed to detect window.customElements. Did you import webcomponents polyfill?');
        return;
    }
    // Backward compatibility definition
    window.customElements.define('edlio-accordion', AccordionComponent);
    window.customElements.define('edlio-drawer', DrawerComponent);
    window.customElements.define('edlio-modal', ModalComponent);
    window.customElements.define('edlio-notification', NotificationComponent);
    window.customElements.define('edlio-select', SelectComponent);
    window.customElements.define('uniform-accordion', AccordionComponent);
    window.customElements.define('uniform-drawer', DrawerComponent);
    window.customElements.define('uniform-example', ExampleComponent);
    window.customElements.define('uniform-modal', ModalComponent);
    window.customElements.define('uniform-notification', NotificationComponent);
    window.customElements.define('uniform-select', SelectComponent);
    window.customElements.define('uniform-uploader', UploaderComponent);
}