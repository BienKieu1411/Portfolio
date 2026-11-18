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

let replyText = '';

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
document.querySelector('#reply-later')?.addEventListener('click', () => setReply(false));
shareButton?.addEventListener('click', shareReply);
replyAgainButton?.addEventListener('click', resetReply);
