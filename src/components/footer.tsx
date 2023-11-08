import { UseTheme } from '@src/hooks/use-config';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [views, setviews] = useState(0);

  const counterUrl =
    'https://counter10.p.rapidapi.com/?rapidapi-key=44fcc7f8f7mshacfcb91fc4190bfp189dddjsnaa696e83052d&&';

  const increasePageView = () => {
    const v = sessionStorage.getItem('views');
    if (v) {
      setviews(parseInt(v, 10));
      return;
    }

    axios({
      url: `${counterUrl}ID=typingguru_site`,
      method: 'get',
    })
      .then((res) => {
        sessionStorage.setItem('views', res.data.message);
        setviews(res.data.message);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios({
      url: `${counterUrl}ID=typingguru_site_views`,
      method: 'get',
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => console.error(err));
  }, []);

  const isDev = process.env.NODE_ENV === 'development';

  useEffect(isDev ? () => {} : increasePageView, []);

  return (
    <footer className="flex justify-center w-full fixed bottom-0 font-ropa_sans text-md p-3 text-primary">
      <UseTheme />
    </footer>
  );
};

export default Footer;
