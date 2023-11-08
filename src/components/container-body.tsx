import { childProps } from '@src/interfaces/index';
import { useEffect, useState } from 'react';

const CBody = ({
  children,
  ...props
}: childProps & {
  [key: string]: any;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div
      className="flex flex-col min-h-screen min-w-[1080px] text-primary bg-background"
      {...props}
    >
      {children}
    </div>
  ) : (
    <div />
  );
};

export default CBody;
