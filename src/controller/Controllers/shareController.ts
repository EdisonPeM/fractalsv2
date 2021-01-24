import { registerShare } from '../../googleAnalytics';
import { onClick } from '@Controller/listeners';
import {
  shareTelegram,
  shareWhatsapp,
  shareFacebook,
  shareTwitter,
  shareMail,
  shareCopy,
} from '@View/Elements/shareButtons';

export function addShareListener() {
  const getURL = () => location.href;
  const getEncodeURL = () => {
    const URL = getURL();
    const urlEncode = encodeURIComponent(URL);
    return urlEncode;
  };

  const mensaje = 'Mira el Fractal que he creado! 👀❕';
  const breakLine = encodeURIComponent('\n\n');

  onClick(shareWhatsapp, () => {
    registerShare('whatsapp');
    shareWhatsapp.href = `https://api.whatsapp.com/send?text=${
      mensaje + breakLine + getEncodeURL()
    }`;
  });

  onClick(shareTelegram, () => {
    registerShare('telegram');
    shareTelegram.href = `https://t.me/share/url?url=${getEncodeURL()}&text=${
      breakLine + mensaje
    }`;
  });

  onClick(shareFacebook, () => {
    registerShare('facebook');
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${getEncodeURL()}`;
  });

  onClick(shareTwitter, () => {
    registerShare('twitter');
    shareTwitter.href = `https://twitter.com/intent/tweet?url=${getEncodeURL()}&text=${
      mensaje + breakLine
    }`;
  });

  onClick(shareMail, () => {
    registerShare('email');
    shareMail.href = `mailto:?subject=${mensaje + breakLine + getEncodeURL()}`;
  });

  onClick(shareCopy, (ev: MouseEvent) => {
    registerShare('clipboard');
    ev.preventDefault();

    const el = document.createElement('textarea');
    el.value = `${mensaje}\n\n${getURL()}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
}

/*
function sharePopUp(urlShare: string) {
  console.log('POPUP');

  const minWidth = 520;
  const minHeight = 520;

  const winTop = `${screen.height / 2 - minHeight / 2}`;
  const winLeft = `${screen.width / 2 - minWidth / 2}`;

  const popUpOptions = `top=${winTop},left=${winLeft},toolbar=${0},status=${0},width=${minWidth},height=${minHeight}`;

  window.open(urlShare, 'sharer', popUpOptions);
}
*/
// https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;caption=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;content=http%3A%2F%2Fsharingbuttons.io&amp;canonicalUrl=http%3A%2F%2Fsharingbuttons.io&amp;shareSource=tumblr_share_button
// https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fsharingbuttons.io&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;summary=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;source=http%3A%2F%2Fsharingbuttons.io
// https://reddit.com/submit/?url=http%3A%2F%2Fsharingbuttons.io&amp;resubmit=true&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.
