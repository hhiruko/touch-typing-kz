import {
  FaBookOpen,
  FaRandom,
  FaUserGraduate,
  // FaBook,
  FaRecycle,
  FaGithub,
  FaSuperpowers,
} from 'react-icons/fa';
import Link from 'next/link';
import CBody from '@src/components/container-body';
import Card from '@src/components/card';

const Home = () => {
  return (
    <CBody>
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
          <img src="/KB_QWERTY_KZ.png" alt="" />
        </div>
        <div className="max-w-screen-xl w-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="grid gap-12 grid-cols-3">
              {[
                {
                  link: '/lessons',
                  label: 'Сабақтар',
                  icon: <FaUserGraduate />,
                },
                { link: '/story', label: 'Мәтін', icon: <FaBookOpen /> },
                // {
                //   link: '/custom-stories',
                //   label: 'Custom Stories',
                //   icon: <FaBook />,
                // },
                // {
                //   link: '/beta',
                //   label: 'Beta',
                //   icon: <FaSuperpowers />,
                // },
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
    </CBody>
  );
};

Home.SSR = true;

export default Home;
