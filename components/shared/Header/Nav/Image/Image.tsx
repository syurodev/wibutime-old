import React, { FC } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './styles.module.scss';
import { opacity } from '../../anim';

type IProps = {
  src: string,
  isActive: boolean
}

const ImageComponent: FC<IProps> = ({ src, isActive }) => {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className={styles.imageContainer}>
      <Image
        src={`/images/${src}`}
        fill
        sizes='full'
        alt="image"
      />
    </motion.div>
  )
}

export default ImageComponent