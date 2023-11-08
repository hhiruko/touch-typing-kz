import { motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useConfig } from '@src/hooks/use-config';
import storyList from '@src/lessons/story-list';
import lessons from '@src/lessons';
import { IKey } from '@src/components/keyboard/key';
import CBody from '@src/components/container-body';
import Header from '@src/components/heading';
import Keyboard from '@src/components/keyboard';

const Stories = () => {
  const inpRef = useRef<HTMLInputElement>(null);

  const { storyInfo, speed, setSpeed, visibleCards, language, setAccuracy } =
    useConfig();

  const [wrongKey, setwrongKey] = useState<IKey | null>(null);
  const [activeKey, setactiveKey] = useState<IKey | null>(null);

  const [grandString, setGrandString] = useState(storyList[storyInfo.index]);
  const [mainString, setmainString] = useState('');
  const [dispStrings, setdispStrings] = useState({
    str1: 'Hand',
    str2: 'k',
    str3: 'chief',
  });

  const [errorIndex, seterrorIndex] = useState<{
    [key: number]: boolean;
  }>({});

  const [mainIndex, setMainIndex] = useState(0);

  const isShiftOn = (key: string) => {
    if (!key) return false;
    if (lessons.shiftOnKeyList.indexOf(key) !== -1) return true;
    return false;
  };

  const strLen = 50;

  const [index, setindex] = useState(0);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (strLen === index) {
      setMainIndex(mainIndex + strLen);
      setindex(0);
      return;
    }
    setdispStrings((s) => {
      return {
        ...s,
        str1: mainString.substring(0, index),
        str2: mainString.substring(index, index + 1),
        str3: mainString.substring(index + 1),
      };
    });
    setactiveKey({
      key: mainString[index % strLen] ? mainString[index % strLen] : null,
      shiftKey: isShiftOn(mainString[index % strLen]),
    });
  }, [index, mainString, refresh]);

  useEffect(() => {
    if (inpRef.current) inpRef.current.focus();
    if (!grandString) {
      // setgrandString();
      return;
    }
    // setindex(0);
    setmainString(grandString.substring(mainIndex, mainIndex + strLen));
  }, [mainIndex, refresh]);

  function diffSeconds(dt2: Date, dt1: Date) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(diff);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('speed', speed);
      if (!speed) {
        setSpeed({
          value: 0,
          start: new Date(),
          end: null,
          speed: '',
        });
      } else {
        // console.log(speed, 'skiped');
        if (speed.end && speed.end.getSeconds() === new Date().getSeconds()) {
          // console.log(speed, 'skiped');
          return;
        }
        setSpeed((s) => {
          return {
            ...s,
            end: new Date(),
            speed: (
              (Number(s.value) +
                Number(
                  (
                    grandString.substring(0, mainIndex + index).split(' ')
                      .length / diffSeconds(new Date(), speed.start)
                  ).toFixed(0)
                )) /
              2
            ).toFixed(0),
          };
        });
        setAccuracy(
          Number(
            (
              100 -
                (Object.keys(errorIndex).length / (mainIndex + index)) * 100 ||
              100
            ).toFixed(0)
          )
        );
      }
    }, 1);
    return () => clearInterval(timer);
  }, [speed, mainIndex, index]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === mainString[index]) {
      setactiveKey(e);
      setwrongKey(null);
      if (index > Number(strLen / 2)) {
        setMainIndex(mainIndex + 1);
        // setmainString(grandString.substring(mainIndex, mainIndex + strLen));
      } else setindex(index + 1);
    } else {
      seterrorIndex((s) => {
        return {
          ...s,
          [mainIndex + index]: true,
        };
      });
      setwrongKey(e);
    }
  };

  useEffect(() => {
    setGrandString(storyList[storyInfo.index]);
    setindex(0);
    setMainIndex(0);
    setRefresh((s) => !s);
    setSpeed({
      value: 0,
      start: new Date(),
      end: null,
      speed: '',
    });
  }, [storyInfo.index]);

  console.log()
  return (
    <CBody>
      <Header />

      <div
        className={classNames(
          'flex flex-col justify-end items-center py-12 gap-6 flex-1',
          {
            'justify-center relative pb-24': !visibleCards.keyboard,
            'justify-end': visibleCards.Keyboard,
          }
        )}
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.25 }}
            className={classNames(
              'story-typing tracking-wide text-xl max-w-screen-md bg-keyboard-background shadow-xl rounded-lg p-3 relative bottom-16 xl:bottom-12',
              language
            )}
          >
            <span className="text-primary-600">
              {dispStrings.str1.split('').map((item, indx) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <span
                    className={classNames({
                      'text-red-500': errorIndex[mainIndex + indx],
                    })}
                  >
                    {item === ' ' ? <span>&nbsp;</span> : item}
                  </span>
                );
              })}
            </span>
            <span className="relative cursor text-primary-400">
              {dispStrings.str2}
            </span>
            <span className="text-primary-400">
              {dispStrings.str3.split('').map((item) => {
                return item === ' ' ? (
                  <span>&nbsp;</span>
                ) : (
                  <motion.span>{item}</motion.span>
                );
              })}
            </span>

            <input
              inputMode="none"
              className="opacity-0 absolute height-full w-full mx-auto my-0 left-0"
              type="text"
              maxLength={0}
              onKeyDown={handleKeyPress}
              ref={inpRef}
              onBlur={() => {
                inpRef.current?.focus();
              }}
            />
          </motion.div>
        </div>
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
  );
};

export default Stories;
