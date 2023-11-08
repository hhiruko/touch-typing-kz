import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';

export interface IKey {
  key: string | null;
  shiftKey: boolean;
  altKey?: boolean;
  ctrlKey?: boolean;
}

interface IKeyProps {
  className?: string;
  activeKey: IKey | null;
  keyMatch?: (string | number)[];
  wrongKey: IKey | null;
  keys: ReactNode;
  keyMatchFun?: (key: IKey) => boolean;
}

const Key = ({
  className,
  activeKey,
  keyMatch,
  wrongKey,
  keys,
  keyMatchFun = (_) => {
    return false;
  },
}: IKeyProps) =>
  useMemo(() => {
    return (
      <div
        className={classNames(className, {
          active:
            activeKey &&
            keyMatch &&
            (activeKey.key === keyMatch[0] ||
              activeKey.key === keyMatch[1] ||
              keyMatchFun(activeKey)),
          'wrong-key':
            activeKey &&
            wrongKey &&
            keyMatch &&
            (activeKey.key === keyMatch[0] ||
              activeKey.key === keyMatch[1] ||
              keyMatchFun(activeKey)),
        })}
      >
        {keys}
      </div>
    );
  }, [activeKey, wrongKey]);

export default Key;
