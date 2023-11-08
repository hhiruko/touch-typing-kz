import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { LargePaths } from './hand-path';
import { IKey } from './key';

const color = 'var(--color-primary-500)';

interface IHand {
  activeKey: IKey | null;
  wrongKey: IKey | null;
  leftHand?: boolean;
  rightHand?: boolean;
}

const Hand = ({
  activeKey,
  wrongKey: _,
  leftHand = false,
  rightHand = false,
}: IHand) => {
  // useEffect(() => {
  //   console.log('acitve:', activeKey, '\nwrong: ', wrongKey);
  // }, [activeKey, wrongKey]);

  const keyListLeftHand = {
    thumb: [' ', 'Alt', 'Control'],
    index_finger: [
      'Ң',
      'ң',
      'Ғ',
      'ғ',
      'К',
      'к',
      'Е',
      'е',
      'А',
      'а',
      'П',
      'п',
      'М',
      'м',
      'И',
      'и',
    ],
    middle_finger: ['І', 'і', 'У', 'у', 'В', 'в', 'С', 'с'],
    ring_finger: ['Ә', 'ә', 'Ц', 'ц', 'Ы', 'ы', 'Ч', 'ч'],
    little_finger: [
      ')',
      '(',
      '!',
      '"',
      'Tab',
      'Й',
      'й',
      'CapsLock',
      'Ф',
      'ф',
      'Я',
      'я',
    ],
  };

  const keyListRightHand = {
    thumb: [' ', 'Alt', 'Control'],
    index_finger: [
      ':',
      '.',
      ';',
      ',',
      'Н',
      'н',
      'Г',
      'г',
      'Р',
      'р',
      'О',
      'о',
      'Т',
      'т',
      'Ь',
      'ь',
    ],
    middle_finger: ['Ү', 'ү', 'Ш', 'ш', 'Л', 'л', 'Б', 'б'],
    ring_finger: ['Ұ', 'ұ', 'Щ', 'щ', 'Д', 'д', 'Ю', 'ю'],
    little_finger: [
      'Қ',
      'қ',
      'Ө',
      'ө',
      'Һ',
      'һ',
      'Backspace',
      'З',
      'з',
      'Х',
      'х',
      'Ъ',
      'ъ',
      '/',
      '\\',
      'Ж',
      'ж',
      'Э',
      "э",
      'Enter',
      '?',
      '№',
    ],
  };
  const checkShift = ({ key }: { key: string }) => {
    let res;
    if (leftHand) {
      res = Object.values(keyListRightHand).reduce(
        (acc, curr) => curr.indexOf(key) !== -1 || acc,
        false
      );
    }
    if (rightHand) {
      res = Object.values(keyListLeftHand).reduce(
        (acc, curr) => curr.indexOf(key) !== -1 || acc,
        false
      );
    }
    return res;
  };
  const [keyList, setKeyList] = useState<{
    thumb: string[];
    index_finger: string[];
    middle_finger: string[];
    ring_finger: string[];
    little_finger: (string | number)[];
  }>({
    thumb: [],
    index_finger: [],
    middle_finger: [],
    ring_finger: [],
    little_finger: [],
  });
  useEffect(() => {
    if (leftHand) {
      setKeyList(keyListLeftHand);
    }
    if (rightHand) {
      setKeyList(keyListRightHand);
    }
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="540.501"
      // height="640.304"
      version="1"
      viewBox="0 0 540.501 640.304"
      xmlSpace="preserve"
      className={classNames('flex-1 h-[15rem] xl:h-auto xl:pb-10', {
        'flip-x hand-mr': leftHand,
        'hand-ml': rightHand,
      })}
    >
      <LargePaths />
      {activeKey &&
        activeKey.key &&
        keyList.thumb.indexOf(activeKey.key) !== -1 && (
          <path
            fill={color}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M81.634 386.638l-4.198-7.326-6.322-7.23-9.184-8.888-9.02-8.501-8.427-6.082-7.368-5.886s-2.274-4.387-1.925-6.772c.35-2.385 1.75-5.708 1.75-5.708s.465-2.662 4.723-4.77c4.257-2.108 9.396-3.5 9.396-3.5l11.114-2.761 12.42-.085s7.128.255 14.3 3.152c7.172 2.896 19.111 9.028 19.111 9.028l7.216 4.388 3.848 4.217 3.237 5.963 3.586 11.031-42.245 32.924z"
          />
        )}

      {activeKey &&
        activeKey.key &&
        keyList.index_finger.indexOf(activeKey.key) !== -1 && (
          <path
            fill={color}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M181.088 234.967l-9.172-57.406-6.973-47.756s-1.705-16.27 5.03-21.935c6.734-5.665 11.064-7.838 11.064-7.838s3.586-2.258 9.533-.64c5.948 1.62 10.321-.083 14.694 14.867 4.373 14.949 8.987 32.655 8.987 32.655l4.57 11.385 2.843 11.5 4.582 21.64 8.537 36.895-52.363 14.915z"
          />
        )}

      {activeKey &&
        activeKey.key &&
        keyList.middle_finger.indexOf(activeKey.key) !== -1 && (
          <path
            fill={color}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M268.764 203.234l1.098-20.902 1.813-18.573 2.007-15.266 3.084-18.433.875-7.88 1.05-10.392s1.755-17.283 1.754-21.366c0-4.083 1.439-18.032 1.439-18.032l2.579-9.243 7.479-9.583 7.084-3.791 8.046-.852s3.98 1.236 5.73 2.386c1.749 1.15 8.396 8.178 8.396 8.178l2.012 4.387 1.224 7.07-.394 6.985 1.13 12.178s.742 28.358-.057 32.599c-.8 4.241-1.247 25.97-1.247 25.97l-.132 6.26-1.224 12.907v.126l.597 9.417-2.173 28.691z"
          />
        )}

      {activeKey &&
        activeKey.key &&
        keyList.ring_finger.indexOf(activeKey.key) !== -1 && (
          <path
            fill={color}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M350.279 214.01l7.304-25.173 2.985-19.023 4.956-19.312 6.534-17.297 6.065-12.336 5.48-9.976 5.948-4.685 7.434-1.66 3.018.085 5.466 1.662 4.723 3.577 3.893 5.75.874 6.365-.218 16.165-2.675 18.203-1.349 6.288-2.493 13.673-1.574 9.498-1.756 15.652.007 7.264-2.754 18.697z"
          />
        )}

      {activeKey &&
        activeKey.key &&
        (keyList.little_finger.indexOf(activeKey.key) !== -1 ||
          (activeKey.shiftKey && checkShift({ key: activeKey.key }))) && (
          <path
            fill={color}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M437.219 272.66l15.672-18.473 12.273-17.177 3.705-7.423 5.265-6.873 6.467-4.657 9.184-2.3 7.784 3.151 6.384 9.286 1.357 9.286-2.232 9.54-5.19 10.109-10.169 17.967-14.097 23.62-1.337 3.01z"
          />
        )}
    </svg>
  );
};
export default Hand;
