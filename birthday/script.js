const action = document.querySelector('#birthday-action');
const blowButton = document.querySelector('#blow-candles');
const letter = document.querySelector('#birthday-letter');
const letterTitle = document.querySelector('#letter-title');
const scene = document.querySelector('.cake-scene');

blowButton.addEventListener('click', () => {
    scene.classList.add('is-celebrating');
    letter.hidden = false;
    blowButton.setAttribute('aria-expanded', 'true');
    action.hidden = true;
    letterTitle.focus();
}, { once: true });

letter.hidden = true;
action.hidden = false;
