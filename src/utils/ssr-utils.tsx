import { childProps } from '@src/interfaces';

export const SafeHydrate = ({ children }: childProps) => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
);
