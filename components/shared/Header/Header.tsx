'use client'

import { FC, memo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { background, opacity } from './anim'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import styles from './styles.module.scss'
import Nav from './Nav/Nav'

const Header: FC = () => {

  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <nav className={`${styles.header} bg-[#f4f0ea] p-3`}>
      <div className={styles.bar}>
        <Link href={"/"}>Wibutime</Link>

        <div onClick={() => { setIsActive(!isActive) }} className={styles.el}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
          <div className={styles.label}>
            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
          </div>
        </div>

        <motion.div
          variants={opacity}
          animate={isActive ? "closed" : "open"}
          className={styles.userContainer}
        >
          <div className={styles.user}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          </div>
        </motion.div>

      </div>
      <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>

      <AnimatePresence mode='wait'>
        {isActive && <Nav />}
      </AnimatePresence>
    </nav>
  )
}

export default memo(Header)