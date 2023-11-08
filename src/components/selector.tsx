import {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';

// import OverlayMenu from 'overlaymenu';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useConfig } from '@src/hooks/use-config';
import { childProps } from '@src/interfaces';

const OverlayMenu = ({
  visible = true,
  setVisible = (_) => {},
  container_ref,
  children,
}: {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  container_ref: React.MutableRefObject<any>;
  children: ReactNode;
}) => {
  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (
      container_ref.current &&
      !container_ref.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };
  const handleEscapePress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Escape') {
      setVisible(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside);
    // @ts-ignore
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
      // @ts-ignore
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);
  return visible ? children : null;
};

interface IOptionItem<T> {
  label: ReactNode;
  value: T;
}

interface ISelector<T extends string | number> {
  value?: IOptionItem<T>;
  options?: IOptionItem<T>[];
  onSelect?: (value: IOptionItem<T>) => void;
  label?: ReactNode;
}

const defFunc = () => {};

const SCard = ({
  children,
  className = '',
  onClick = defFunc,
  ...etc
}: childProps & {
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  const { colorScheme } = useConfig();
  return (
    <motion.div
      onClick={onClick}
      className={classNames(
        'cursor-pointer border border-primary-300 select-none px-6 py-2 rounded-lg shadow-lg hover:border-primary-500 flex items-center gap-2 whitespace-pre justify-between text-xs',
        className,
        {
          'border-dark-primary-900': colorScheme.includes('dark'),
        }
      )}
      {...etc}
    >
      {children}
    </motion.div>
  );
};

const Selector = <T extends string | number>({
  value,
  options = [],
  onSelect = defFunc,
  label,
}: ISelector<T>) => {
  const ref = useRef(null);

  const refs = options.map(() => createRef<HTMLDivElement>());

  const [visible, setVisible] = useState(false);

  return (
    <>
      <SCard
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="flex-1">{value?.label}</div>
      </SCard>
      <OverlayMenu
        visible={visible}
        setVisible={setVisible}
        container_ref={ref}
      >
        <motion.div
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex justify-center items-center backdrop-blur-sm fixed w-full h-full z-20 bg-opacity-25 left-0 font-lato cursor-pointer"
        >
          <motion.div
            whileTap={{ y: 2 }}
            className="right-6 top-6 bg-primary-300 absolute p-1 text-xl rounded-full hover:bg-primary-400"
          >
            <FiX />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            ref={ref}
            className="bg-background  max-h-[30vh] flex flex-col min-w-[13rem] cursor-auto rounded-md overflow-hidden shadow-xl relative bottom-20"
          >
            <div className="flex bg-primary dark:bg-dark-primary-900 text-white p-2 font-bold tracking-wider pb-1">
              {label}
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              {options.map((option, index) => (
                <motion.div
                  ref={refs[index]}
                  whileTap={{ y: 2 }}
                  key={option.value}
                  className={classNames(
                    'flex justify-between items-center hover:bg-gray-200  relative py-2 pb-1.5 px-3 text-xs text-center  cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white',
                    {
                      'bg-primary-200': option.value === value?.value,
                    }
                  )}
                  onClick={() => {
                    onSelect(option);
                    setVisible(false);
                  }}
                >
                  <span className="flex-1">{option.label}</span>
                  {/* Lesson {index + 1} */}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </OverlayMenu>
    </>
  );
};

export default Selector;
