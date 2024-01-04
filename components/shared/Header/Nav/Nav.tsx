import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { height } from '../anim'
import styles from './styles.module.scss';
import Body from './Body/Body'
import { navItem } from './data'
import Footer from './Footer/Footer';

const Nav = () => {

  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      {/* <div className={styles.wrapper}> */}
      <div className={styles.container}>
        <Body links={navItem} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
        <Footer />
      </div>
      {/* </div> */}
    </motion.div>
  )
}

export default Nav