import { motion } from 'framer-motion';
import { useState } from 'react';
import classNames from 'classnames';
import CBody from '@src/components/container-body';
import Header from '@src/components/heading';
import { useConfig } from '@src/hooks/use-config';
import { IKey } from '@src/components/keyboard/key';
import Keyboard from '@src/components/keyboard';

const RandomType = () => {
  const [activeKey, setactiveKey] = useState<IKey | null>(null);
  const [wrongKey] = useState<IKey | null>(null);
  const [value, setValue] = useState('');

  const { visibleCards, language } = useConfig();

  return (
    <CBody>
      <Header label="random-type" />

      <div
        className={classNames('flex flex-col items-center py-12 gap-6 flex-1', {
          'justify-center relative pb-24': !visibleCards.keyboard,
          'justify-end': visibleCards.keyboard,
        })}
      >
        <motion.textarea
          autoFocus
          inputMode="none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.25 }}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          className={`freeTA tracking-wide font-roboto_mono text-base max-w-screen-sm bg-primary-100 dark:bg-[#25282a] shadow-xl rounded-lg p-3 relative bottom-16 xl:bottom-12 w-full  min-h-[10rem] ${language}`}
          onKeyPress={(e) => setactiveKey(e)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

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

export default RandomType;
