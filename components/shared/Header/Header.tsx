'use client'

import { FC, memo, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { background, opacity } from './anim'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Lottie from "lottie-react";
import { Button, buttonVariants } from "@/components/ui/button"

import logoAnimation from '@/lib/logoAnimation.json'
import styles from './styles.module.scss'
import Nav from './Nav/Nav'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import UserMenu from './UserMenu/UserMenu'

const Header: FC = () => {
  const session = useCurrentUser()
  const [isActive, setIsActive] = useState<boolean>(false)
  const navRef = useRef<HTMLElement>(null)

  const handleChangeNavBG = () => {
    if (window.scrollY >= 1) {
      navRef.current?.classList.add("shadow-sm")
    } else {
      navRef.current?.classList.remove("shadow-sm")
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleChangeNavBG);

    return () => {
      window.removeEventListener('scroll', handleChangeNavBG);
    };
  }, []);

  return (
    <nav ref={navRef} className={`${styles.header} p-3 z-50 backdrop-blur-xl bg-background/60 transition-all duration-200 ease-in-out`}>
      <div className={`${styles.bar} ${isActive ? "max-w-[1450px]" : "max-w-[1350px]"} mx-auto transition-all delay-75 duration-500`}>
        <Link
          href={"/"}
          className='relative flex items-center justify-start pl-10'
          scroll
        >
          <Lottie animationData={logoAnimation} loop={false} className='absolute size-44 -left-[75px]' />
          <span className='font-semibold'>Wibutime</span>
        </Link>

        <div onClick={() => { setIsActive(!isActive) }} className={styles.el}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""} before:bg-black dark:before:bg-white after:bg-black 
          dark:after:bg-white`}></div>
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
            {
              session ? (
                <UserMenu />
              ) : (
                <Link
                  href={"/auth/login"}
                  className={`${buttonVariants({ variant: "outline" })} !rounded-full`}>
                  Đăng nhập
                </Link>
              )
            }
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={`${styles.background} bg-black z-40`}
        onClick={() => setIsActive(false)}
      ></motion.div>

      <AnimatePresence mode='wait'>
        {isActive && <Nav />}
      </AnimatePresence>
    </nav>
  )
}

export default memo(Header)