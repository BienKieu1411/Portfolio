const stage = document.querySelector('#letter-stage');
const openButton = document.querySelector('#open-letter');
const invitation = document.querySelector('#invitation');
const invitationTitle = document.querySelector('#invitation-title');
const envelopeHint = document.querySelector('#envelope-hint');
const replyOptions = document.querySelector('#reply-options');
const replyResult = document.querySelector('#reply-result');
const resultMessage = document.querySelector('#result-message');
const shareButton = document.querySelector('#share-reply');
const shareStatus = document.querySelector('#share-status');
const replyAgainButton = document.querySelector('#reply-again');
const laterButton = document.querySelector('#reply-later');
const yesButton = document.querySelector('#reply-yes');
const dodgeNote = document.querySelector('#dodge-note');

let replyText = '';
let dodgeCount = 0;

const dodgeMessages = [
    'Ơ, từ từ… cho mình hồi hộp thêm một nhịp nha 😳',
    'Nút này cũng muốn đi hẹn đó Huệ ơi 😝',
    'Trêu Huệ chút thôi! Nếu không tiện thì mình hẹn hôm khác nha 🌷',
];

const dodgeLaterButton = (event) => {
    if (!replyOptions || !laterButton || dodgeCount >= dodgeMessages.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const originalButtonRect = laterButton.getBoundingClientRect();
    replyOptions.classList.add('is-dodging');

    const parentRect = replyOptions.getBoundingClientRect();
    const buttonWidth = laterButton.offsetWidth;
    const buttonHeight = laterButton.offsetHeight;
    const yesRect = yesButton?.getBoundingClientRect();
    const positions = [
        { left: 0, top: 0 },
        { left: Math.max(0, parentRect.width - buttonWidth), top: 0 },
        { left: 0, top: Math.max(0, (parentRect.height - buttonHeight) / 2) },
        { left: Math.max(0, parentRect.width - buttonWidth), top: Math.max(0, (parentRect.height - buttonHeight) / 2) },
        { left: 0, top: Math.max(0, parentRect.height - buttonHeight) },
        { left: Math.max(0, parentRect.width - buttonWidth), top: Math.max(0, parentRect.height - buttonHeight) },
    ];
    const currentLeft = Number.parseFloat(laterButton.style.left) || originalButtonRect.left - parentRect.left;
    const currentTop = Number.parseFloat(laterButton.style.top) || originalButtonRect.top - parentRect.top;
    const pointerX = event.clientX - parentRect.left;
    const pointerY = event.clientY - parentRect.top;

    const candidates = positions.filter((position) => {
        const isCurrentPosition = Math.abs(position.left - currentLeft) < 2 && Math.abs(position.top - currentTop) < 2;
        const overlapsYes = yesRect &&
            position.left < yesRect.right - parentRect.left &&
            position.left + buttonWidth > yesRect.left - parentRect.left &&
            position.top < yesRect.bottom - parentRect.top &&
            position.top + buttonHeight > yesRect.top - parentRect.top;
        return !isCurrentPosition && !overlapsYes;
    });

    const nextPosition = candidates
        .sort((a, b) => {
            const distance = (position) => (position.left + buttonWidth / 2 - pointerX) ** 2 +
                (position.top + buttonHeight / 2 - pointerY) ** 2;
            return distance(b) - distance(a);
        })[0];

    if (nextPosition) {
        laterButton.style.left = `${nextPosition.left}px`;
        laterButton.style.top = `${nextPosition.top}px`;
    }

    dodgeCount += 1;
    if (dodgeNote) {
        dodgeNote.textContent = dodgeMessages[dodgeCount - 1];
        dodgeNote.hidden = false;
    }
    if (dodgeCount === dodgeMessages.length) laterButton.textContent = 'Được, hôm khác nhé 🌷';
};

const openLetter = () => {
    if (!stage || !openButton || !invitation) return;

    invitation.hidden = false;
    invitation.setAttribute('aria-hidden', 'false');
    stage.classList.add('is-open');
    openButton.disabled = true;
    openButton.setAttribute('aria-expanded', 'true');
    if (envelopeHint) envelopeHint.hidden = true;

    if (window.matchMedia('(max-width: 900px)').matches) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        invitation.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    }

    window.setTimeout(() => invitationTitle?.focus({ preventScroll: true }), 320);
};

const setReply = (accepted) => {
    if (!replyOptions || !replyResult || !resultMessage) return;

    replyText = accepted
        ? 'Huệ đồng ý đi first date cùng bạn lúc 19:15, thứ Năm 19/11/2026. 💌'
        : 'Huệ muốn cùng bạn chọn một ngày khác nhé. 🌷';

    resultMessage.textContent = accepted
        ? 'Vậy mình hẹn Huệ tối thứ Năm nhé. Mình mong buổi tối ấy lắm. 💌'
        : 'Được chứ. Mình sẽ cùng chọn ngày Huệ thấy thoải mái nhé. 🌷';
    replyOptions.hidden = true;
    replyResult.hidden = false;
    shareStatus.textContent = '';
    shareButton?.focus();
};

const shareReply = async () => {
    if (!replyText || !shareStatus) return;

    if (navigator.share) {
        try {
            await navigator.share({ title: 'Một lời hồi âm dành cho Huệ', text: replyText });
            shareStatus.textContent = 'Đã mở bảng chia sẻ. Huệ chọn nơi muốn gửi lời nhắn nhé.';
            return;
        } catch (error) {
            if (error?.name === 'AbortError') return;
        }
    }

    try {
        await navigator.clipboard.writeText(replyText);
        shareStatus.textContent = 'Đã chép lời hồi âm. Huệ gửi tin nhắn này cho người mời nhé.';
    } catch {
        shareStatus.textContent = 'Huệ có thể chụp màn hình lời hồi âm này để gửi lại nhé.';
    }
};

const resetReply = () => {
    if (!replyOptions || !replyResult) return;
    replyResult.hidden = true;
    replyOptions.hidden = false;
    replyOptions.querySelector('#reply-yes')?.focus();
};

openButton?.addEventListener('click', openLetter);
document.querySelector('#reply-yes')?.addEventListener('click', () => setReply(true));
laterButton?.addEventListener('pointerenter', dodgeLaterButton);
laterButton?.addEventListener('click', () => setReply(false));
shareButton?.addEventListener('click', shareReply);
replyAgainButton?.addEventListener('click', resetReply);
