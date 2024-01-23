'use client'

import React, { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { slide, slideWithoutScale } from '@/lib/motion'

type IProps = {
  image?: {
    key?: string
    url: string
  } | null | string,
  thumbnail?: {
    key?: string
    url: string
  } | null,
  name: string
  type: "userAvatar" | "contentImage"
}

const Hero: FC<IProps> = ({
  image,
  thumbnail,
  type,
  name
}) => {
  return (
    <div></div>
  )
}

export default Hero