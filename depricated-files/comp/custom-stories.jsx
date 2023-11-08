import Header from '@components/atoms/header';
import Footer from '@components/atoms/footer';
import { motion } from 'framer-motion';
import { createRef, useEffect, useState } from 'react';
import Keyboard from '@components/templates/keyboard';
import { useRecoilValue } from 'recoil';
import {
  configsContext,
  customStoriesContext,
} from '@commons/context/recoil-context';
import { shiftOnKeyList } from '@components/lessons';
import classNames from 'classnames';
import CBody from '@components/atoms/cbody';

import { usePersistentRecoilState } from '@components/hooks/use-recoil-presist';

const CustomStories = () => {
  const inpRef = createRef();

  const [configs, setConfigs] = usePersistentRecoilState(configsContext);
  const customStories = useRecoilValue(customStoriesContext());

  useEffect(() => {
    if (configs.customStoryIndex === undefined) {
      setConfigs({ ...configs, customStoryIndex: 0 });
    }
  }, [configs]);

  const [wrongKey, setwrongKey] = useState(null);

  const [activeKey, setactiveKey] = useState(null);

  const [grandString, setGrandString] = useState(
    // eslint-disable-next-line no-nested-ternary
    customStories.length > 0
      ? customStories[configs.customStoryIndex || 0]
        ? customStories[configs.customStoryIndex || 0].story_text
        : 'No Stories Present Add some'
      : 'No Stories Present Add some'
  );

  const [mainString, setmainString] = useState('');
  const [dispStrings, setdispStrings] = useState({
    str1: 'Hand',
    str2: 'k',
    str3: 'chief',
  });

  const [errorIndex, seterrorIndex] = useState({});

  const [mainIndex, setMainIndex] = useState(0);

  const [accuracy, setAccuracy] = useState(100);

  const isShiftOn = (key) => {
    if (!key) return false;
    if (shiftOnKeyList.indexOf(key) !== -1) return true;
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
    if (configs.isModalOpen) {
      return;
    }
    if (inpRef.current) inpRef.current.focus();
    if (!grandString) {
      // setgrandString();
      return;
    }
    // setindex(0);
    setmainString(grandString.substring(mainIndex, mainIndex + strLen));
  }, [mainIndex, refresh, configs.isModalOpen]);

  const [speed, setspeed] = useState(null);

  function diffSeconds(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(diff);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('speed', speed);
      if (!speed) {
        setspeed({
          speed: 0,
          start: new Date(),
          end: 0,
        });
      } else {
        // console.log(speed, 'skiped');
        if (
          speed.end !== 0 &&
          speed.end.getSeconds() === new Date().getSeconds()
        ) {
          // console.log(speed, 'skiped');
          return;
        }
        setspeed((s) => {
          return {
            ...s,
            end: new Date(),
            speed: (
              (Number(s.speed) +
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

  const handleKeyPress = (e) => {
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
    setGrandString(
      // eslint-disable-next-line no-nested-ternary
      customStories.length > 0
        ? customStories[configs.customStoryIndex || 0]
          ? customStories[configs.customStoryIndex || 0].story_text
          : ''
        : ''
    );

    setindex(0);
    setMainIndex(0);
    setRefresh((s) => !s);
    setspeed(null);
  }, [configs.customStoryIndex, customStories]);

  return (
    <CBody>
      <Header
        {...{
          index,
          customStoryIndex: configs.customStoryIndex,
          speed,
          accuracy,
          page: 'Custom Stories',
        }}
        isWithCustomStories
      />
      <div
        className={classNames('flex flex-col items-center py-12 gap-6 flex-1', {
          'justify-center relative pb-24': !configs.Keyboard,
          'justify-end': configs.Keyboard,
        })}
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.25 }}
            className={classNames(
              'story-typing tracking-wide text-xl max-w-screen-md bg-primary-50 dark:bg-[#25282a] shadow-xl rounded-lg p-3 relative bottom-16 xl:bottom-12',
              configs.language
            )}
          >
            <span className="text-primary-600 dark:text-dark-primary-800">
              {dispStrings.str1.split('').map((item, indx) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <span
                    className={classNames({
                      'text-red-500': errorIndex[mainIndex + indx],
                    })}
                  >
                    {item}
                  </span>
                );
              })}
            </span>
            <span className="relative cursor text-primary-400 dark:text-dark-primary-600">
              {dispStrings.str2}
            </span>
            <span className="text-primary-400 dark:text-dark-primary-600">
              {dispStrings.str3}
            </span>

            <input
              inputMode="none"
              className="opacity-0 absolute height-full w-full mx-auto my-0 left-0"
              type="text"
              maxLength={0}
              onKeyPress={handleKeyPress}
              ref={inpRef}
              onBlur={() => {
                if (configs.isModalOpen) return;
                inpRef.current.focus();
              }}
            />
          </motion.div>
        </div>
        {configs.Keyboard && (
          <div className="flex max-w-screen-xl w-full">
            <Keyboard
              showHand={configs.Hands}
              activeKey={activeKey}
              wrongKey={wrongKey}
              className={`${configs.language} day`}
            />
          </div>
        )}
      </div>
    </CBody>
  );
};

export default CustomStories;
