import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface CardProps {
  variant?: 'default' | 'small';
  children?: ReactNode;
  className?: string;
}
const Card = ({ variant = 'default', children, className }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      className={classNames(
        `shadow-lg rounded-xl flex flex-col select-none cursor-pointer dark:border dark:border-dark-background-keyboard`,
        className,
        {
          'p-5 gap-5': variant === 'default',
          'p-2': variant === 'small',
        }
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
