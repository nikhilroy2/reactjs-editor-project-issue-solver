import React from 'react';
import { ReactComponent as FailedIcon } from '../../../assets/img/close-red.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/img/tick-green.svg';
import { ReactComponent as Plus } from '../../../assets/img/plus-primary.svg';
import { ReactComponent as Lock } from '../../../assets/img/lock-def.svg';
import { ReactComponent as Basket } from '../../../assets/img/basket.svg';
import Spinner from '../../../layouts/Loaders/ModalSpinner';

import Tooltip from '../../Elements/Tooltip';
import store from '../../../store';

export const tabs = [
  {
    name: 'My fonts',
    tab: 0,
    width: '88px',
  },
  {
    name: 'Google fonts',
    tab: 1,
    width: '116px',
  },
];

export const backgroundStyles = {
  left: '267px',
};

export const listHeight = 458;
export const rowHeight = 192;
export const rowWidth = 743;
export const rowCount = 3;

export const tabWidth = 93;

export const getIcon = (type, status, addFont, removeFont) => {
  if (type === 'my') {
    switch (status) {
      case 'locked': {
        return <Tooltip text="Locked"><Lock /></Tooltip>
      }
      case 'pending': {
        return <Tooltip text="Pending"><Spinner /></Tooltip>
      }
      case 'not-locked': {
        return <Tooltip text="Delete"><Basket className="editor__font-block_remove-font" onClick={removeFont} /></Tooltip>
      }
      default: {
        return <Basket />
      }
    }
  }
  if (type === 'google') {
    switch (status) {
      case 'pending': {
        return <Tooltip text="Pending"><Spinner /></Tooltip>
      }
      case 'success': {
        return <Tooltip text="Added"><SuccessIcon /></Tooltip>
      }
      case 'failed': {
        return <Tooltip text="Failed"><FailedIcon /></Tooltip>
      }
      default: {
        return <Tooltip text="Add font"><Plus className="editor__font-block_add-font" onClick={addFont} /></Tooltip>
      }
    }
  }

  return false;
};

export const getGoogleFontStatus = (fetch, error, success) => {
  if (fetch) {
    return 'pending'
  } if (error) {
    return 'failed'
  } if (success) {
    return 'success'
  }
  return ''
};

export const exampleText = {
  arabic: 'الظلال أخفى القمر.',
  bengali: 'আগুনের শিখা নিভে গিয়েছিল, আর তিনি জানলা দিয়ে তারাদের দিকে তাকালেন ৷',
  'chinese-hongkong': '他們所有的設備和儀器彷彿都是有生命的。',
  'chinese-simplified': '他们所有的设备和仪器彷佛都是有生命的。',
  'chinese-traditional': '他們所有的設備和儀器彷彿都是有生命的。',
  cyrillic: 'Алая вспышка осветила силуэт зазубренного крыла.',
  'cyrillic-ext': 'Видовище перед нашими очима справді вражало.',
  devanagari: 'अंतरिक्ष यान से दूर नीचे पृथ्वी शानदार ढंग से जगमगा रही थी ।',
  greek: 'Ήταν απλώς θέμα χρόνου.',
  'greek-ext': 'Ήταν απλώς θέμα χρόνου.',
  gujarati: 'અમને તેની જાણ થાય તે પહેલાં જ, અમે જમીન છોડી દીધી હતી.',
  gurmukhi: 'ਸਵਾਲ ਸਿਰਫ਼ ਸਮੇਂ ਦਾ ਸੀ।',
  hebrew: 'אז הגיע הלילה של כוכב השביט הראשון.',
  japanese: '彼らの機器や装置はすべて生命体だ。',
  kannada: 'ಇದು ಕೇವಲ ಸಮಯದ ಪ್ರಶ್ನೆಯಾಗಿದೆ.',
  khmer: 'ខ្ញុំបានមើលព្យុះ ដែលមានភាពស្រស់ស្អាតណាស់ ប៉ុន្តែគួរឲ្យខ្លាច',
  korean: '그들의 장비와 기구는 모두 살아 있다.',
  latin: 'Almost before we knew it, we had left the ground.',
  'latin-ext': 'Almost before we knew it, we had left the ground.',
  malayalam: 'അവരുടെ എല്ലാ ഉപകരണങ്ങളും യന്ത്രങ്ങളും ഏതെങ്കിലും രൂപത്തിൽ സജീവമാണ്.',
  myanmar: 'သူတို့ရဲ့ စက်ပစ္စည်းတွေ၊ ကိရိယာတွေ အားလုံး အသက်ရှင်ကြတယ်။',
  oriya: 'ଏହା କେବଳ ଏକ ସମୟ କଥା ହିଁ ଥିଲା.',
  sinhala: 'එය කාලය පිළිබඳ ප්‍රශ්නයක් පමණක් විය.',
  tamil: 'அந்திமாலையில், அலைகள் வேகமாக வீசத் தொடங்கின.',
  telugu: 'ఆ రాత్రి మొదటిసారిగా ఒక నక్షత్రం నేలరాలింది.',
  thai: 'การเดินทางขากลับคงจะเหงา',
  tibetan: 'ཁོ་ཚོའི་སྒྲིག་ཆས་དང་ལག་ཆ་ཡོད་ཚད་གསོན་པོ་རེད།',
  vietnamese: 'Bầu trời trong xanh thăm thẳm, không một gợn mây.',
};

export const getLockedBlock = (id) => {
  const state = store.getState();
  const { fonts: { activeFonts } } = state;
  const activeFont = activeFonts.find((font) => Number(font.font_id) === Number(id))
  if (activeFont) {
    return activeFont.locked;
  }
  return false;
};

export const checkIsFontAdded = (id) => {
  const state = store.getState();
  const { fonts: { activeFonts } } = state;
  const activeFont = activeFonts.find((font) => Number(font.font_id) === Number(id))
  return !!activeFont;
};
