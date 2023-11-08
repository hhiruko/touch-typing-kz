import { IColorSchemeClass } from '@src/color-schemes';
import { childProps } from '@src/interfaces/index';
import { ILanguage } from '@src/languages';
import classNames from 'classnames';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ICustomStory {}

type ISetState<T = any> = (fn: ((val: T) => T) | T) => void;
export type IPage =
  | ''
  | 'lessons'
  | 'story'
  | 'custom-story'
  | 'settings'
  | 'random-type'
  | 'issues';

interface ILessonInfo {
  index: number;
  cursorIndex: number;
}
interface IStoryInfo {
  index: number;
  cursorIndex: number;
}

interface ISpeedInfo {
  value: number;
  start: Date;
  end: Date | null;
}

interface IStatics {
  progress: number;
  speed: ISpeedInfo;
  accuracy: number;
}

interface ICards {
  progress?: boolean;
  speed?: boolean;
  accuracy?: boolean;
  keyboard?: boolean;
  hands?: boolean;
  [key: NonNullable<string>]: boolean | undefined;
}

interface IConfig {
  visibleCards: ICards;
  statics: IStatics;
  storyInfo: IStoryInfo;
  language: ILanguage;
  lessonInfo: ILessonInfo;
  // page: IPage;
  colorScheme: IColorSchemeClass;
  customStories: ICustomStory[];
}

interface IConfigContext {
  config: IConfig;
  setConfig: Dispatch<SetStateAction<IConfig>>;
}

const defaultStatics: IStatics = {
  accuracy: 100,
  progress: 0,
  speed: {
    value: 0,
    start: new Date(),
    end: new Date(),
  },
};

const pageInfo: ILessonInfo | IStoryInfo = {
  index: 0,
  cursorIndex: 0,
};

const defaultConfig: IConfig = {
  visibleCards: {
    hands: true,
    keyboard: true,
    accuracy: true,
    speed: true,
    progress: true,
  },
  statics: defaultStatics,
  storyInfo: pageInfo,
  language: 'English',
  lessonInfo: pageInfo,
  // page: 'home',
  customStories: [],
  colorScheme: 'dark-teal',
};

const ConfigContext = createContext<IConfigContext>({
  config: defaultConfig,
  setConfig: () => {},
});

const ConfigProvider = ({ children }: childProps) => {
  const loadConfig = async (): Promise<IConfig> => {
    // load config from local storage

    if (typeof window !== 'undefined') {
      // @ts-ignore
      if (window.config) {
        // @ts-ignore
        const config = await window.config();
        if (config) {
          return JSON.parse(config);
        }
      }

      const config = localStorage.getItem('config');
      if (config) {
        return JSON.parse(config);
      }
    }

    console.warn('config not found');

    return defaultConfig;
  };

  const [config, setConfig] = useState<IConfig>(() => {
    loadConfig().then((v) => setConfig(v));
    return defaultConfig;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      if (window.setConfig) {
        // @ts-ignore
        window.setConfig(JSON.stringify(config));
      }

      localStorage.setItem('config', JSON.stringify(config));
    }
  }, [config]);

  return (
    <ConfigContext.Provider
      value={useMemo(
        () => ({
          config,
          setConfig,
        }),
        [config, setConfig]
      )}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  const { config, setConfig } = context;
  // const { page, lessonInfo, language, storyInfo, visibleCards } = config;

  const setPage = (page: IPage) => {
    setConfig((prev) => ({ ...prev, page }));
  };

  const setLessonInfo: ISetState<ILessonInfo> = (lessonInfo) => {
    if (typeof lessonInfo === 'function') {
      setConfig((prev) => ({
        ...prev,
        lessonInfo: lessonInfo(prev.lessonInfo),
      }));
      return;
    }
    setConfig((prev) => ({ ...prev, lessonInfo }));
  };

  const setLanguage = (language: ILanguage) => {
    setConfig((prev) => ({ ...prev, language }));
  };

  const setStoryInfo: ISetState<IStoryInfo> = (storyInfo) => {
    if (typeof storyInfo === 'function') {
      setConfig((prev) => ({
        ...prev,
        storyInfo: storyInfo(prev.storyInfo),
      }));
      return;
    }
    setConfig((prev) => ({ ...prev, storyInfo }));
  };

  const setVisibleCards: ISetState<ICards> = (visibleCards) => {
    if (typeof visibleCards === 'function') {
      setConfig((prev) => ({
        ...prev,
        visibleCards: visibleCards(prev.visibleCards),
      }));
      return;
    }

    setConfig((prev) => ({ ...prev, visibleCards }));
  };

  const setColorScheme = (colorScheme: IColorSchemeClass) => {
    setConfig((prev) => ({ ...prev, colorScheme }));
  };

  const setStatics: ISetState<IStatics> = (statics) => {
    if (typeof statics === 'function') {
      setConfig((prev) => ({
        ...prev,
        statics: statics(prev.statics),
      }));
      return;
    }

    setConfig((prev) => ({ ...prev, statics }));
  };

  const setSpeed: ISetState<ISpeedInfo> = (speed) => {
    if (typeof speed === 'function') {
      setStatics((prev) => ({
        ...prev,
        speed: speed(prev.speed),
      }));
      return;
    }

    setStatics((prev) => ({
      ...prev,
      speed,
    }));
  };

  const setAccuracy: ISetState<number> = (accuracy) => {
    if (typeof accuracy === 'function') {
      setStatics((prev) => ({
        ...prev,
        accuracy: accuracy(prev.accuracy),
      }));
      return;
    }

    setStatics((prev) => ({
      ...prev,
      accuracy,
    }));
  };
  const speed: ISpeedInfo = useCallback(() => {
    const s = config.statics.speed;
    return {
      value: s.value,
      start: new Date(s.start),
      end: s.end ? new Date(s.end) : null,
    };
  }, [config.statics.speed])();

  return {
    ...config,
    config,
    setConfig,
    setPage,
    setLessonInfo,
    setLanguage,
    setStoryInfo,
    setVisibleCards,
    setColorScheme,
    setStatics,
    setSpeed,
    speed,
    accuracy: config.statics.accuracy,
    setAccuracy,
  };
};

export const UseTheme = () => {
  const { colorScheme } = useConfig();

  useEffect(() => {
    document.documentElement.className = classNames(colorScheme, {
      dark: colorScheme.includes('dark'),
    });
  }, [colorScheme]);
  // return <Html className={classNames(colorScheme.className)} />;
  return null;
};

export default ConfigProvider;
