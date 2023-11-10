import { motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useConfig } from '@src/hooks/use-config';
import storyList from '@src/lessons/story-list';
import lessons from '@src/lessons';
import CBody from '@src/components/container-body';
import Header from '@src/components/heading';
import Keyboard from '@src/components/keyboard';
import { IKey } from '@src/components/keyboard/key';
import {
  FaBookOpen,
  FaRandom,
} from 'react-icons/fa';

import Link from 'next/link';
import Card from '@src/components/card';

const Story = () => {
  const myref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!myref.current) return;
    myref.current.focus();
  }, [myref]);

  const strLen = 16;

  const [grandMainStrng, setgrandMainStrng] = useState(storyList[0]);

  const [mainString, setmainString] = useState('');
  const [halfFirst, sethalfFirst] = useState('');
  const [halfSecond, sethalfSecond] = useState('');
  const [activeKey, setactiveKey] = useState<IKey | null>(null);
  const [wrongKey, setwrongKey] = useState<IKey | null>(null);
  const [refresh, setrefresh] = useState(true);
  const [wrongInputCount, setwrongInputCount] = useState(0);

  const {
    storyInfo,
    setStoryInfo,
    speed,
    setSpeed,
    language,
    visibleCards,
    setAccuracy,
  } = useConfig();

  const { cursorIndex } = storyInfo;

  const setIndex = (val: number) => {
    setStoryInfo((s) => ({ ...s, cursorIndex: val }));
  };

  const [hintText, sethintText] = useState('');
  const isShiftOn = (key: string) => {
    if (!key) return false;
    if (lessons.shiftOnKeyList.indexOf(key) !== -1) return true;
    return false;
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const _handleKeyDown = (event: KeyboardEvent<HTMLDivElement> | null) => {
    if (event && event.key === mainString[cursorIndex % strLen]) {
      if (cursorIndex + 1 >= grandMainStrng.length) {
        if (storyInfo.index >= (storyList.length - 1)) {
          setIsDeleted(true);
          return;
        }
        setIndex(0);
        setgrandMainStrng(storyList[storyInfo.index + 1]);
        setStoryInfo((s) => ({ ...s, index: s.index + 1 }));
        return;
      }
      setIndex(cursorIndex + 1);
    }
    
    setactiveKey({
      key: mainString[cursorIndex % strLen]
        ? mainString[cursorIndex % strLen]
        : null,
      shiftKey: isShiftOn(mainString[cursorIndex % strLen]),
    });
    setwrongKey(
      event && event.key === mainString[cursorIndex % strLen] ? null : event
    );
    if (event && !(event.key === mainString[cursorIndex % strLen])) {
      setwrongInputCount((s) => s + 1);
    }
  };

  const handleStrings = () => {
    sethalfFirst(mainString.substring(0, cursorIndex % strLen));
    sethalfSecond(
      mainString.substring(cursorIndex % strLen, mainString.length)
    );
    sethintText(
      grandMainStrng ? grandMainStrng.substring(
        cursorIndex - (cursorIndex % strLen) + strLen,
        cursorIndex - (cursorIndex % strLen) + strLen + 8
      ) : ''
    );
    _handleKeyDown(null);
  };

  function diffSeconds(dt2: Date, dt1: Date) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(diff);
  }

  // useeffect to run the function on every interval

  useEffect(() => {
    const interval = setTimeout(() => {
      // console.log('refresh');
      // console.log(speed);
      if (!speed) {
        // console.log(!speed);
        setSpeed({
          value: 0,
          start: new Date(),
          end: null,
          speed: ''
        });
      } else {
        if (speed.end && speed.end.getSeconds() === new Date().getSeconds()) {
          // console.log(true, 'skiped');
          return;
        }

        setSpeed((s) => {
          return {
            ...s,
            end: new Date(),
            speed: (
              (grandMainStrng ? grandMainStrng.substring(0, cursorIndex).split(' ').length : 0) /
              diffSeconds(new Date(), speed.start)
            ).toFixed(0),
          };
        });
        setAccuracy(
          Number(
            (
              ((cursorIndex - wrongInputCount) / cursorIndex) * 100 || 100
            ).toFixed(0)
          )
        );
      }
    }, 1);
    return () => clearInterval(interval);
  }, [grandMainStrng, cursorIndex, speed, setSpeed]);

  useEffect(() => {
    setmainString(
      grandMainStrng ? grandMainStrng.substring(
        cursorIndex - (cursorIndex % strLen),
        cursorIndex - (cursorIndex % strLen) + strLen
      ) : ''
    );
    handleStrings();
  }, [cursorIndex, strLen, mainString, refresh]);

  useEffect(() => {
    setgrandMainStrng(storyList[storyInfo.index]);
    setIndex(0);
    setwrongInputCount(0);
    setSpeed({
      value: 0,
      start: new Date(),
      end: null,
      speed: '',
    });
    handleStrings();
    setrefresh(!refresh);
  }, [storyInfo.index]);

  useEffect(() => {
    setSpeed({
      value: 0,
      start: new Date(),
      end: null,
      speed: '',
    });
    setIndex(0);
    setwrongInputCount(0);
  }, [language]);


  return (
    <div>
    {!isDeleted ? (
    <CBody>
      <Header />
      <div
        className={classNames('flex flex-col items-center py-12 gap-6 flex-1', {
          'justify-center relative pb-24': !visibleCards.keyboard,
          'justify-end': visibleCards.keyboard,
        })}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25 }}
          className={classNames(
            'typing-view relative bottom-16 xl:bottom-12',
            language
          )}
        >
          <div>
            <span>
              {mainString.replace(/ /g, '\u00a0')}
              <span className="virtual">
                {hintText.replace(/ /g, '\u00a0')}
              </span>
            </span>
          </div>
          <div>
            <span className="text-primary-500">
              {halfFirst.replace(/ /g, '\u00a0')}
            </span>
            <span title="home">{halfSecond.replace(/ /g, '\u00a0')}</span>
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              inputMode="none"
              maxLength={1}
              id="inp"
              ref={myref}
              type="text"
              onBlur={() => {
                myref.current?.focus();
              }}
              autoComplete="off"
              onKeyDown={_handleKeyDown}
            />
          </div>
        </motion.div>

        {visibleCards.keyboard && (
          <div className="flex max-w-screen-xl w-full">
            <Keyboard
              showHand={visibleCards.hands}
              activeKey={activeKey}
              wrongKey={wrongKey}
              className={`${language} day`}
            />
          </div>
        )}
      </div>
    </CBody>
    ) : (<CBody>
      <div className="flex justify-center">
        <div className="header flex gap-6 w-full max-w-screen-xl p-3 py-6">
          <div className="flex">
            <Link href="/">
              <h1 className="text-xl font-lato cursor-pointer select-none">
                Touch Typing
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-24 pt-12">
        <div>
          <h1 className="text-xl font-lato cursor-pointer select-none">
            Мәтін бітті!
          </h1>
        </div>
        <div className="max-w-screen-xl w-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="grid gap-12 grid-cols-2">
              {[
                { link: '/lessons', label: 'Сабақтар', icon: <FaBookOpen /> },
                {
                  link: '/random-type',
                  label: 'Практика',
                  icon: <FaRandom />,
                },

                
              ].map(({ link, label, icon }) => {
                return (
                  <Link key={link} href={link}>
                    <Card className="items-center justify-center min-w-[12rem] py-6">
                      <div className="text-4xl">{icon}</div>
                      <span className="font-lato text-2xl">{label}</span>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CBody>)
  }
    </div>
  );
};

export default Story;
