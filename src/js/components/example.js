export default class ExampleComponent extends window.HTMLElement {
    constructor () {
        super();
        this.counter = 0;
    }

    connectedCallback () {
        this.innerText = `Spikes Example Component. Current counter: ${this.counter}`;
        this.addEventListener('click', () => {
            this.counter++;
            this.innerText = `Spikes Example Component. Current counter: ${this.counter}`;
        });
    }
}
