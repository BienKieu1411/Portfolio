(() => {
    const scene = document.querySelector('#motion-scene');
    const photo = document.querySelector('.evening-photo img');
    if (!scene || !photo) return;

    const start = () => {
        scene.classList.add('is-playing');
        scene.hidden = false;
    };

    if (photo.complete) {
        start();
    } else {
        photo.addEventListener('load', start, { once: true });
        photo.addEventListener('error', start, { once: true });
    }
})();
