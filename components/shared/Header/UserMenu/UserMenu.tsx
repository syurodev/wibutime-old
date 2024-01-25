'use client'

import { memo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from 'next-auth/react'
import { IoIosLogOut } from "react-icons/io";

import style from './navbar.module.scss'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link'

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => (
    {
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        duration: 0.65,
        // opacity: { duration: 1 },
        delay: 0.2 + (i * 0.1),
        ease: [0.76, 0, 0.24, 1]
      }
    }
  ),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const slideIn = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: (i: number) => (
    {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        // opacity: { duration: 1 },
        delay: 0.6 + (i * 0.1),
        ease: [0.76, 0, 0.24, 1]
      }
    }
  ),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}


const UserMenu = () => {
  const menuBtnRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const session = useCurrentUser()

  const variants = {
    open: {
      width: menuBtnRef.current?.getBoundingClientRect() && menuBtnRef.current?.getBoundingClientRect()?.width >= 300 ? menuBtnRef.current?.getBoundingClientRect()?.width + 10 : 400,
      height: 600,
      top: "-5px",
      right: "-5px",
      borderRadius: "23px",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      borderRadius: "23px",
      transition: { duration: 0.5, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    }
  }

  return (
    <>
      {
        session && (
          <>
            <div
              className="w-full h-full rounded-full transition-colors relative cursor-pointer overflow-hidden z-30"
              ref={menuBtnRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Avatar>
                <AvatarImage src={session.image || ""} />
                <AvatarFallback>{session.name}</AvatarFallback>
              </Avatar>
            </div>

            <motion.div
              className='max-w-[500px] h-[600px] bg-background absolute z-20 overflow-hidden shadow'
              variants={variants}
              animate={isMenuOpen ? "open" : "closed"}
              initial="closed"
            >
              <AnimatePresence>
                {
                  isMenuOpen && (
                    <div className='h-full w-full p-[100px_40px_50px_40px] box-border flex flex-col justify-between'>
                      <div className='flex flex-col'>
                        <div
                          className={`${style.linkContainer}`}
                        >
                          <motion.div
                            variants={perspective}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                            custom={0}
                            className='py-2'
                          >
                            <Link
                              href={`/u/${session.id}`}
                              className='text-4xl font-semibold hover:text-secondary transition-colors'
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Hồ sơ
                            </Link>
                          </motion.div>

                          {
                            session && session?.permissions.includes("UPLOAD") && (
                              <motion.div
                                variants={perspective}
                                animate="enter"
                                exit="exit"
                                initial="initial"
                                custom={0.1}
                                className='py-2'
                              >
                                <Link
                                  href={"/animes/upload"}
                                  className='text-4xl font-semibold hover:text-secondary transition-colors'
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Upload Anime
                                </Link>
                              </motion.div>
                            )
                          }

                          {
                            session && session?.permissions.includes("UPLOAD") && (
                              <motion.div
                                variants={perspective}
                                animate="enter"
                                exit="exit"
                                initial="initial"
                                custom={0.1}
                                className='py-2'
                              >
                                <Link
                                  href={"/lightnovels/upload"}
                                  className='text-4xl font-semibold hover:text-secondary transition-colors'
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Upload Lightnovel
                                </Link>
                              </motion.div>
                            )
                          }

                          <motion.div
                            variants={perspective}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                            custom={0.2}
                            className='py-2'
                          >
                            <Link
                              href={""}
                              className='text-4xl font-semibold hover:text-secondary transition-colors'
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Yêu thích
                            </Link>
                          </motion.div>
                        </div>
                      </div>

                      {/* footer */}
                      <div className='flex justify-between w-full'>
                        <div
                          className={`${style.linkContainer} w-1/2 text-destructive cursor-pointer select-none`}
                          onClick={() => signOut()}
                        >
                          <motion.div
                            variants={slideIn}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                            custom={1}
                            className='flex items-center gap-1'
                          >
                            <IoIosLogOut className="text-lg" />
                            <span>
                              Đăng xuất
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </AnimatePresence>
            </motion.div>
          </>
        )
      }
    </>
  )
}

export default memo(UserMenu)

function PerspectiveText({ label, className = "" }: { label: string, className: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center flex-col ${style.perspectiveText}`}>
      <p className={`font-semibold ${className}`}>{label}</p>
      <p className={`font-semibold absolute ${className}`}>{label}</p>
    </div>
  )
}