export default class ModalComponent extends window.HTMLElement {
    constructor () {
        super();
        this.closeCallbacks = [];
        this.previousPage = 0;
        this.currentPage = 0;
        this.pages = [];
        // internal memory
        this.container = null;
        this.handleEscapeClick = this.handleEscapeClick.bind(this);
    }

    onClose (closeCallback) {
        this.closeCallbacks.push(closeCallback);
    }
    attachOnClose (closeCallback) {
        this.onClose(closeCallback);
    }

    goToPage (index) {
        if (index === this.currentPage || index >= this.pages.length || index < 0) {
            return;
        }
        this.pages[index].classList.add('current');
        this.previousPage = this.currentPage;
        this.currentPage = index;

        requestAnimationFrame(() => {
            if (index > this.previousPageId) {
                this.pages[this.previousPage].classList.add('past');
            } else {
                this.pages[this.previousPage].classList.add('future');
            }
            this.pages[index].classList.remove('future');
            this.pages[index].classList.remove('past');

            this.addEventListener('transitionend', () => {
                this.pages[this.previousPage].classList.remove('current');
            }, {once: true});
        });
    }

    nextPage () {
        this.goToPage(this.currentPage + 1);
    }

    previousPage () {
        this.goToPage(this.currentPage - 1);
    }

    // animate the dialog to target element
    transformToTargetElement (onShow) {
        if (!this.targetElement) {
            return;
        }
        const clickRect = this.targetElement.getBoundingClientRect();
        const selfRect = this.getBoundingClientRect();

        const scaleX = Math.min(0.5, clickRect.width / selfRect.width);
        const scaleY = Math.min(0.5, clickRect.height / selfRect.height);
        const translateY = onShow ?
            (-(window.pageYOffset+selfRect.top) + clickRect.top + clickRect.height/2 - selfRect.height/2) :
            (-selfRect.top + clickRect.top + clickRect.height/2 - selfRect.height/2)
        ;

        this.style.webkitTransform = 'translate3d(' +
            (-selfRect.left + clickRect.left + clickRect.width/2 - selfRect.width/2) + 'px,' + translateY
            + 'px,' +
            '0) scale(' + scaleX + ',' + scaleY + ')';
        this.style.transform = 'translate3d(' +
            (-selfRect.left + clickRect.left + clickRect.width/2 - selfRect.width/2) + 'px,' + translateY
            + 'px,' +
            '0) scale(' + scaleX + ',' + scaleY + ')';
    }

    show (targetElement, removeOnHide) {
        this.removeOnHide = removeOnHide;
        this.pages = [...this.querySelectorAll('page')];

        if (this.pages.length) {
            this.pages[0].classList.add('current');
        }
        this.currentPage = 0;

        this.pages.forEach((page, index) => {
            if (index > this.currentPage) {
                page.classList.add('future');
            }
        });

        // move the modal object to be under container and move container to
        // be under body
        const scrollTop = window.pageYOffset;
        const container = document.createElement('edlio-overlay');
        this.container = container;
        document.body.appendChild(container);
        container.appendChild(this);

        // make the animation transition (translate) from the targetElement
        this.targetElement = targetElement;
        this.transformToTargetElement(true);

        // use `animationend` event to bind close event listener
        this.addEventListener('transitionend', handleTransitionEnd, {once: true});

        // listen to the scroll event to make modal stay in the view port
        container.style.top = scrollTop + 'px';

        // hack, use setTimeout to execute async animation
        requestAnimationFrame(() => {
            this.classList.add('transition-in');
            this.style.webkitTransform = '';
            this.style.transform = '';
            // disable scrolling behind the container
            document.body.style.overflow = 'hidden';
        });

        function handleTransitionEnd () {
            // listen to overlay window on click event to cancel the modal
            container.addEventListener('mousedown', (event) => {
                this.hide();
            });
            this.addEventListener('mousedown', (event) => {
                event.stopPropagation();
            });

            window.addEventListener('keydown', this.handleEscapeClick);
        }
    }

    handleEscapeClick (event) {
        let handled = false;
        if (event.keyCode !== undefined && event.keyCode === 27) {
            this.hide();
            handled = true;
        }

        if (handled) {
            // Suppress "double action" if event handled
            event.preventDefault();
        }
    }

    hide () {
        window.removeEventListener('keydown', this.handleEscapeClick);

        requestAnimationFrame(() => {
            this.classList.add('transition-out');
            this.classList.remove('transition-in');
            // make the animation transition (translate) from the targetElement
            this.transformToTargetElement();

            this.addEventListener('transitionend', handleTransitionEnd, {once: true});
        });

        function handleTransitionEnd () {
            this.previousParent.appendChild(this);
            this.classList.remove('transition-out');
            this.style.webkitTransform = '';
            this.style.transform = '';
            // reset scrolling event
            document.body.style.overflow = undefined;
            // FIXME: attach the element back to previous parent
            document.body.appendChild(self);
            this.container.remove();

            if (this.removeOnHide) {
                this.remove();
            }
            this.closeCallbacks.forEach(cb => cb());
        }
    }

    connectedCallback () {
        console.log(this.parentNode);
        this.previousParent = this.parentNode;
    }
};
