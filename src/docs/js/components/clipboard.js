export default class ClipboardComponent extends window.HTMLElement {
    constructor () {
        super();
        let buttontmpl = document.createElement('div');
        buttontmpl.className += 'button secondary copy-to-clipboard';
        buttontmpl.innerHTML = '<svg viewBox="0 0 2048 2048" class="icon"><use xlink:href="#files-o"></use></svg>';             
        this.appendChild(buttontmpl);    

    }

    copyToClipboard(text) {
        let el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        let selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    }

    connectedCallback () {       
        const text = this.getAttribute("data-text");
        this.querySelector('.copy-to-clipboard').addEventListener('click', () => {    
            this.copyToClipboard(text);
        });
    }
}

