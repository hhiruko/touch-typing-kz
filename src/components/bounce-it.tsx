import { childProps } from '@src/interfaces';
import { motion } from 'framer-motion';

const BounceIt = ({
  children,
  ...etc
}: childProps & {
  [key: string]: any;
}) => {
  return (
    <motion.div initial={{ y: 0 }} whileTap={{ y: 1 }} {...etc}>
      {children}
    </motion.div>
  );
};

export default BounceIt;
