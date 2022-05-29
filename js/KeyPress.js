export let isKeyDown = {
    up: false,
    down: false,
    left: false,
    right: false,
    enter: false
}

document.onkeydown = function (e) {
    switch (e.key) {
        case 'Enter':
            isKeyDown.enter = true
            break;
        case 'ArrowUp':
            isKeyDown.up = true
            break;
        case 'ArrowDown':
            isKeyDown.down = true
            break;
        case 'ArrowLeft':
            isKeyDown.left = true
            break;
        case 'ArrowRight':
            isKeyDown.right = true
    }
};

document.onkeyup = function (e) {
    switch (e.key) {
        case 'Enter':
            isKeyDown.enter = false
            break;
        case 'ArrowUp':
            isKeyDown.up = false
            break;
        case 'ArrowDown':
            isKeyDown.down = false
            break;
        case 'ArrowLeft':
            isKeyDown.left = false
            break;
        case 'ArrowRight':
            isKeyDown.right = false
    }
};