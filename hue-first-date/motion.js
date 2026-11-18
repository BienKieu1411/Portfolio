(() => {
    const scene = document.querySelector('#motion-scene');
    const replay = document.querySelector('#replay-motion');
    const photo = document.querySelector('.evening-photo img');
    if (!scene || !replay || !photo) return;

    const play = () => {
        scene.classList.remove('is-playing');
        // Let the browser apply the reset before starting the same CSS animations.
        void scene.offsetWidth;
        scene.classList.add('is-playing');
    };

    const start = () => {
        scene.hidden = false;
        replay.hidden = false;
        play();
    };

    replay.addEventListener('click', play);
    if (photo.complete) {
        start();
    } else {
        photo.addEventListener('load', start, { once: true });
        photo.addEventListener('error', start, { once: true });
    }
})();
