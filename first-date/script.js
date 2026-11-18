const replyOptions = document.querySelector('#reply-options');
const yesButton = document.querySelector('#reply-yes');
const laterButton = document.querySelector('#reply-later');
const replyResult = document.querySelector('#reply-result');
const replyMessage = document.querySelector('#reply-message');
const backButton = document.querySelector('#reply-again');

const positions = ['top-right', 'bottom-right', 'bottom-left'];
let position = 0;

const dodge = () => {
    position = (position + 1) % positions.length;
    laterButton.dataset.position = positions[position];
};

laterButton.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') dodge();
});

laterButton.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') dodge();
});

yesButton.addEventListener('click', () => {
    replyOptions.hidden = true;
    replyResult.hidden = false;
    replyMessage.focus();
});

backButton.addEventListener('click', () => {
    replyResult.hidden = true;
    replyOptions.hidden = false;
    yesButton.focus();
});

replyOptions.hidden = false;
