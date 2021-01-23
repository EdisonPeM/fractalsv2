import { e } from '@View/helpers';
import { shareButton } from '@View/Components/Button';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

const encodeURL = encodeURIComponent(location.origin);

export const shareWhatsapp = shareButton(
  'whatsapp',
  faWhatsapp,
  `https://api.whatsapp.com/send?text=${encodeURL}`
);

export const shareTelegram = shareButton(
  'telegram',
  faTelegram,
  `https://t.me/share/url?url=${encodeURL}`
);

export const shareFacebook = shareButton(
  'facebook',
  faFacebookSquare,
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURL}`
);

export const shareTwitter = shareButton(
  'twitter',
  faTwitter,
  `https://twitter.com/intent/tweet?text=${encodeURL}`
);

export const shareMail = shareButton(
  'correo',
  faEnvelope,
  `mailto:?subject=${encodeURL}`
);

export const shareCopy = shareButton('clipboard', faLink, location.origin);

// Container
export const shareButtonsContainer = e('div');
shareButtonsContainer.append(shareWhatsapp);
shareButtonsContainer.append(shareTelegram);
shareButtonsContainer.append(shareFacebook);
shareButtonsContainer.append(shareTwitter);
shareButtonsContainer.append(shareMail);
shareButtonsContainer.append(shareCopy);
