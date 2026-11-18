const openButton = document.querySelector('#open-letter');
const invitation = document.querySelector('#invitation');
const invitationTitle = document.querySelector('#invitation-title');
const replyOptions = document.querySelector('#reply-options');
const yesButton = document.querySelector('#reply-yes');
const laterButton = document.querySelector('#reply-later');
const replyResult = document.querySelector('#reply-result');
const shareButton = document.querySelector('#share-reply');
const backButton = document.querySelector('#reply-again');
const shareStatus = document.querySelector('#share-status');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const positions = ['top-right', 'bottom-right', 'bottom-left'];
const replyText = 'Anh ơi, em đi nhé. 7h15 tối thứ Năm (19/11).';
let position = 0;

const dodge = () => {
    position = (position + 1) % positions.length;
    laterButton.dataset.position = positions[position];
};

openButton.addEventListener('click', () => {
    openButton.disabled = true;
    if (reducedMotion.matches) {
        openButton.hidden = true;
    } else {
        openButton.classList.add('is-opening');
        invitation.classList.add('is-revealed');
        openButton.addEventListener('animationend', () => {
            openButton.hidden = true;
        }, { once: true });
    }

    invitation.hidden = false;
    invitationTitle.focus({ preventScroll: true });
});

laterButton.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') dodge();
});

laterButton.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') dodge();
});

yesButton.addEventListener('click', () => {
    replyOptions.hidden = true;
    replyResult.hidden = false;
    shareButton.focus();
});

backButton.addEventListener('click', () => {
    replyResult.hidden = true;
    shareStatus.textContent = '';
    replyOptions.hidden = false;
    yesButton.focus();
});

shareButton.addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({ text: replyText });
            return;
        } catch (error) {
            if (error.name === 'AbortError') return;
        }
    }

    try {
        await navigator.clipboard.writeText(replyText);
        shareStatus.textContent = 'Đã sao chép. Em dán vào tin nhắn cho anh nhé.';
    } catch {
        shareStatus.textContent = 'Em nhắn trực tiếp cho anh nhé.';
    }
});

invitation.hidden = true;
replyOptions.hidden = false;
openButton.hidden = false;
