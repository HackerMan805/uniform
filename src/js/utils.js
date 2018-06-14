// helper function to bind click event and touch event
export function onClick (node, cb) {
    node.addEventListener('click', (event) => {
        event.stopPropagation();
        cb();
    });
    node.addEventListener('touchend', (event) => {
        event.preventDefault();
        event.stopPropagation();
        cb();
    });
};
