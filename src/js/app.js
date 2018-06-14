import '@webcomponents/webcomponentsjs/webcomponents-bundle';

import ExampleComponent from './components/example';
import SelectComponent from './components/select';

main();

function main () {
    if (!window.customElements) {
        console.error('Failed to detect window.customElements. Did you import webcomponents polyfill?');
        return;
    }
    window.customElements.define('uniform-example', ExampleComponent);
    window.customElements.define('uniform-select', SelectComponent);
}

// var EdlioSelectPrototype = Object.create(HTMLElement.prototype);
// var EdlioModalPrototype = Object.create(HTMLElement.prototype);
// var EdlioAccordionPrototype = Object.create(HTMLElement.prototype);
// var EdlioDrawerMenuPrototype = Object.create(HTMLElement.prototype);
// var EdlioNotificationPrototype = Object.create(HTMLElement.prototype);

// EdlioModalPrototype.createdCallback = function() {
// };

// /**
//  * Simply attach a onClose function to clean up anything consumer needs to
//  * clean up. In AngularJS case, we need to call scope.$destroy();
//  */
// EdlioModalPrototype.attachOnClose = function(onClose) {
//     var self = this;
//     self.onClose = onClose;
// };

// EdlioModalPrototype.goToPage = function(index) {
//     var self = this;

//     if (
//         index === self.currentPageId ||
//         index + 1 > self.pages.length ||
//         index < 0
//     ) {
//         return;
//     }

//     self.pages[index].classList.add('current');
//     self.previousPageId = self.currentPageId;
//     self.currentPageId = index;

//     setTimeout(function() {
//         if (index > self.previousPageId) {
//             self.pages[self.previousPageId].classList.add('past');
//         } else {
//             self.pages[self.previousPageId].classList.add('future');
//         }
//         self.pages[index].classList.remove('future');
//         self.pages[index].classList.remove('past');

//         self.addEventListener('transitionend', function() {
//             self.pages[self.previousPageId].classList.remove('current');
//         });
//     });
// };

// EdlioModalPrototype.nextPage = function() {
//     this.goToPage(this.currentPageId + 1);
// };

// EdlioModalPrototype.previousPage = function() {
//     this.goToPage(this.currentPageId - 1);
// };

// /**
//  * When there is target element, we will start the transition from the
//  * target element
//  */
// EdlioModalPrototype.transformToTargetElement = function(onShow) {
//     var self = this;

//     var clickRect = self.targetElement.getBoundingClientRect();
//     var dialogRect = self.getBoundingClientRect();

//     var scaleX = Math.min(0.5, clickRect.width / dialogRect.width);
//     var scaleY = Math.min(0.5, clickRect.height / dialogRect.height);
//     var translateY = onShow ?
//         (-(window.pageYOffset+dialogRect.top) + clickRect.top + clickRect.height/2 - dialogRect.height/2) :
//         (-dialogRect.top + clickRect.top + clickRect.height/2 - dialogRect.height/2)
//         ;

//     self.style.webkitTransform = 'translate3d(' +
//         (-dialogRect.left + clickRect.left + clickRect.width/2 - dialogRect.width/2) + 'px,' + translateY
//          + 'px,' +
//         '0) scale(' + scaleX + ',' + scaleY + ')';
//     self.style.transform = 'translate3d(' +
//         (-dialogRect.left + clickRect.left + clickRect.width/2 - dialogRect.width/2) + 'px,' + translateY
//          + 'px,' +
//         '0) scale(' + scaleX + ',' + scaleY + ')';
// };

// EdlioModalPrototype.show = function(targetElement, removeOnHide) {
//     var self = this;
//     self.removeOnHide = removeOnHide;

//     self.pages = self.querySelectorAll('page');

//     if (self.pages.length) {
//         self.pages[0].classList.add('current');
//         self.currentPageId = 0;

//         Array.prototype.slice.call(self.pages).forEach(function(page, index) {
//             if (index !== self.currentPageId) {
//                 page.classList.add('future');
//             }
//         });
//     }

//     // move the modal object to be under container and move container to
//     // be under body
//     var scrollTop = window.pageYOffset;

//     var container = document.createElement('edlio-overlay');
//     document.body.appendChild(container);
//     container.appendChild(self);

//     // make the animation transition (translate) from the targetElement
//     if (targetElement) {
//         self.targetElement = targetElement;

//         self.transformToTargetElement(true);
//     }

//     // use `animationend` event to bind close event listener
//     self.addEventListener('transitionend', handleTransitionEnd, false);

//     // listen to the scroll event to make modal stay in the view port
//     container.style.top = scrollTop + 'px';

//     // hack, use setTimeout to execute async animation
//     setTimeout(function() {
//         self.classList.add('transition-in');
//         self.style.webkitTransform = '';
//         self.style.transform = '';
//         document.body.style.overflow = 'hidden';
//     });

//     function handleTransitionEnd (argument) {
//         // listen to overlay window on click event to cancel the modal
//         container.addEventListener('mousedown', function(event) {
//             self.hide();
//         });
//         self.addEventListener('mousedown', function(event) {
//             event.stopPropagation();
//         });

//         // need to assign the escape call back to be bind to the self because
//         // we want to remove this function later as the modal dismissed
//         self.handleEscapeClick = function(event) {
//             var handled = false;

//             if (event.keyCode !== undefined && event.keyCode === 27) {
//                 self.hide();
//                 handled = true;
//             }

//             if (handled) {
//                 // Suppress "double action" if event handled
//                 event.preventDefault();
//             }
//         };
//         window.addEventListener('keydown', self.handleEscapeClick);

//         self.removeEventListener('transitionend', handleTransitionEnd);
//     }
// };

// EdlioModalPrototype.hide = function() {
//     var self = this;

//     if (self.onClose instanceof Function) {
//         self.onClose();
//     }

//     var container = document.getElementsByTagName('edlio-overlay')[0];

//     document.body.onscroll = function() { };
//     window.removeEventListener('keydown', self.handleEscapeClick);

//     setTimeout(function() {
//         self.classList.add('transition-out');
//         self.classList.remove('transition-in');
//         // make the animation transition (translate) from the targetElement
//         if (self.targetElement) {
//             self.transformToTargetElement();
//         }

//         self.addEventListener('transitionend', handleTransitionEnd, false);
//     });

//     function handleTransitionEnd (argument) {
//         document.body.appendChild(self);
//         self.classList.remove('transition-out');
//         self.style.webkitTransform = '';
//         self.style.transform = '';
//         document.body.style.overflow = 'auto';

//         container.remove();

//         if (self && self.removeOnHide) {
//             self.remove();
//         }

//         self.removeEventListener('transitionend', handleTransitionEnd);
//     }
// };

// EdlioAccordionPrototype.createdCallback = function() {
//     var self = this;

//     if (self.getAttribute('collapse-others')) {
//         self.collapseOthers = true;
//     }

//     var sections =
//         Array.prototype.slice.call(self.querySelectorAll('section'));

//     sections.forEach(function(section) {
//         if (self.collapseOthers) {
//             section.classList.add('collapsed');
//         }

//         if (section.querySelector('header')) {
//             section.querySelector('header')
//                 .addEventListener('click', function() {
//                     if (self.collapseOthers) {
//                         sections.filter(function(otherSection) {
//                             return otherSection !== section;
//                         }).forEach(function(otherSection) {
//                             otherSection.classList.add('collapsed');
//                         });
//                     }

//                     section.classList.toggle('collapsed');
//                 });
//             section.querySelector('header')
//                 .addEventListener('touchend', function(event) {
//                     event.preventDefault();
//                     if (self.collapseOthers) {
//                         sections.filter(function(otherSection) {
//                             return otherSection !== section;
//                         }).forEach(function(otherSection) {
//                             otherSection.classList.add('collapsed');
//                         });
//                     }

//                     section.classList.toggle('collapsed');
//                 });
//         }
//     });
// };

// EdlioDrawerMenuPrototype.createdCallback = function() {
//     var self = this;
// };

// EdlioDrawerMenuPrototype.open = function() {
//     var self = this;

//     self.style.top = (window.pageYOffset !== 0) ?
//         window.pageYOffset + 'px' :
//         '3.125em';
//     document.body.style.overflow = 'hidden';

//     self.overlay = document.createElement('edlio-overlay');
//     document.body.appendChild(self.overlay);
//     self.overlay.style.top = window.pageYOffset + 'px';
//     self.overlay.addEventListener('click', function() {
//         self.close();
//     });

//     self.overlay.addEventListener('touchend', function(event) {
//         event.preventDefault();
//         self.close();
//     });

//     self.classList.add('open');
// };

// EdlioDrawerMenuPrototype.close = function() {
//     var self = this;

//     self.overlay.remove();

//     document.body.style.overflow = 'auto';
//     self.classList.remove('open');
// };

// EdlioNotificationPrototype.createdCallback = function() {
//     var self = this;

//     self.classList.add('notification');

//     if (self.querySelector('.close')) {
//         self.querySelector('.close')
//             .addEventListener('click', function() {
//                 self.remove();
//             });
//         self.querySelector('.close')
//             .addEventListener('touchend', function(event) {
//                 event.preventDefault();
//                 self.remove();
//             });
//     }
// };

// document.registerElement('edlio-select', {
//     prototype: EdlioSelectPrototype
// });

// document.registerElement('edlio-modal', {
//     prototype: EdlioModalPrototype
// });

// document.registerElement('edlio-accordion', {
//     prototype: EdlioAccordionPrototype
// });

// document.registerElement('edlio-drawer', {
//     prototype: EdlioDrawerMenuPrototype
// });

// document.registerElement('edlio-notification', {
//     prototype: EdlioNotificationPrototype
// });
