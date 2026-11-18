(() => {
    const scene = document.querySelector('#motion-scene');
    const panel = document.querySelector('.evening-photo');
    const photo = panel?.querySelector('img');
    if (!scene || !photo) return;

    const start = () => {
        panel.classList.add('is-playing');
        scene.hidden = false;
    };

    if (photo.complete) {
        start();
    } else {
        photo.addEventListener('load', start, { once: true });
        photo.addEventListener('error', start, { once: true });
    }
})();
