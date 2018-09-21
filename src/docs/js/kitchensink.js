import CodeblockComponent from './components/codeblock';
import ClipboardComponent from './components/clipboard';

kitchensink();

function kitchensink () {
    if (!window.customElements) {
        console.error('Failed to detect window.customElements. Did you import webcomponents polyfill?');
        return;
    }

    window.customElements.define('kitchensink-codeblock', CodeblockComponent);
    window.customElements.define('kitchensink-clipboard', ClipboardComponent);
}