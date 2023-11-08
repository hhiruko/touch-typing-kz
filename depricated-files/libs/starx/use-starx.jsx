import { useState, useEffect } from 'react';
import { configs } from '@commons/configs/config';
import NewStarx from './ws-starx';

export const useStarx = ({
  host = configs.host,
  port = configs.port,
  path = configs.path,
  onInit = (_) => {},
}) => {
  const root = NewStarx();
  const { starx: s } = root;
  const [starx] = useState(s);
  useEffect(() => {
    try {
      starx.init({ host, port, path, reconnect: true }, () => onInit(starx));
      return () => {
        if (starx) {
          starx.notify('room.close', {});
        }
      };
    } catch (err) {
      console.log(err);
      return () => {};
    }
  }, []);

  return starx;
};
