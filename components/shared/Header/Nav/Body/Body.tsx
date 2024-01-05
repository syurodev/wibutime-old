import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './styles.module.scss';
import { blur, translate } from '../../anim';
import { FC, memo } from 'react';

type IProps = {
  links: {
    title: string
    href: string
    status: string
  }[]
  selectedLink: {
    isActive: boolean;
    index: number;
  }
  setSelectedLink: React.Dispatch<React.SetStateAction<{
    isActive: boolean;
    index: number;
  }>>
}

const Body: FC<IProps> = ({ links, selectedLink, setSelectedLink }) => {

  const getChars = (word: string) => {
    let chars: any[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate} initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}>
          {char}
        </motion.span>
      )
    })
    return chars;
  }

  return (
    <div className={styles.body}>
      {
        links.map((link, index) => {
          const { title, href, status } = link;
          return <Link key={`l_${index}`} href={href}>
            <motion.p
              className={status === "comingsoon" ? "select-none pointer-events-none !opacity-35" : ""}
              onMouseOver={() => { setSelectedLink({ isActive: true, index }) }}
              onMouseLeave={() => { setSelectedLink({ isActive: false, index }) }}
              variants={blur}
              animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}>
              {getChars(title)}
            </motion.p>
          </Link>
        })
      }
    </div>
  )
}

export default memo(Body)