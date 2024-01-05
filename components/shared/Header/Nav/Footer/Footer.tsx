import { motion } from 'framer-motion';

import styles from './styles.module.scss';
import { translate } from '../../anim';
import { navFooter } from '../data';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate} initial="initial"
          animate="enter"
          exit="exit">
          <span>Made by:</span> Syuro
        </motion.li>
      </ul>

      <ThemeToggle />

      {
        navFooter.map((item, index) => {
          return (
            <ul key={`navfooter${item.title}-${index}`}>
              <motion.li
                custom={[0.3, 0]}
                variants={translate} initial="initial"
                animate="enter"
                exit="exit">
                <Link href={item.href}>{item.title}</Link>
              </motion.li>
            </ul>
          )
        })
      }

      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate} initial="initial"
          animate="enter"
          exit="exit">
          Privacy Policy
        </motion.li>
        <motion.li
          custom={[0.3, 0]}
          variants={translate} initial="initial"
          animate="enter"
          exit="exit">
          Terms & Conditions
        </motion.li>
      </ul>
    </div>
  )
}

export default Footer