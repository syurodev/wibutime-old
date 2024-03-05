"use client"

import React, { FC, memo, useEffect, useState } from 'react'
import { LuArrowLeft, LuArrowRight, LuHome, LuListOrdered, LuMessageCircle, LuX } from 'react-icons/lu'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import ChapterList from './ChapterList'
import CommentSheet from '@/components/shared/Comment/CommentSheet'

type IProps = {
  novelId: string,
  novelName: string,
  authorId: string,
  totalComment: number,
  currentChapter: string,
  volumes: {
    id: string,
    image: {
      key: string,
      url: string
    },
    name: string,
    chapters: {
      id: string,
      name: string,
      charge: boolean,
    }[]
  }[],
}

const MenuButton: FC<IProps> = ({
  novelId,
  currentChapter,
  volumes,
  novelName,
  authorId,
  totalComment
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenChapterList, setIsOpenChapterList] = useState<boolean>(false)
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false)
  const [nextChapterId, setNextChapterId] = useState<string | null>(null)
  const [previousChapterId, setPreviousChapterId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    function findChapterIndexes(currentChapterId: string): { volumeIndex: number, chapterIndex: number } | null {
      for (let volumeIndex = 0; volumeIndex < volumes.length; volumeIndex++) {
        const volume = volumes[volumeIndex];
        const chapterIndex = volume.chapters.findIndex(chapter => chapter.id === currentChapterId);
        if (chapterIndex !== -1) {
          return { volumeIndex, chapterIndex };
        }
      }
      return null;
    }

    const chapterIndexes = findChapterIndexes(currentChapter);

    if (chapterIndexes) {
      const { volumeIndex, chapterIndex } = chapterIndexes;
      const volume = volumes[volumeIndex];
      const nextChapterId = chapterIndex > 0 ? volume.chapters[chapterIndex - 1].id : null;
      const previousChapterId = chapterIndex < volume.chapters.length - 1 ? volume.chapters[chapterIndex + 1].id : null;

      setNextChapterId(nextChapterId)
      setPreviousChapterId(previousChapterId)
    }
  }, [currentChapter, volumes])

  return (
    <>
      <div
        className={`fixed bottom-5 right-5 opacity-70 overflow-hidden shadow flex flex-col items-center justify-around hover:opacity-100 transition-all duration-300 ease-in-out bg-primary w-3 h-3 rounded-full hover:w-12 hover:h-12 hover:bottom-2 hover:right-2 origin-center ${isOpen && "!h-72 !w-12 !right-2 !bottom-2"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {
          isOpen && (
            <>
              <Button
                size={"icon"}
                rounded={"full"}
                variant={"secondary"}
                disabled={!nextChapterId}
                onClick={() => router.push(`/lightnovels/lightnovel/${novelId}/r/${nextChapterId}`)}
              >
                <LuArrowRight className="text-lg" />
              </Button>

              <Button
                size={"icon"}
                rounded={"full"}
                variant={"secondary"}
                disabled={!previousChapterId}
                onClick={() => router.push(`/lightnovels/lightnovel/${novelId}/r/${previousChapterId}`)}
              >
                <LuArrowLeft className="text-lg" />
              </Button>

              <Button
                size={"icon"}
                rounded={"full"}
                variant={"secondary"}
                onClick={() => setIsOpenComment(true)}
              >
                <LuMessageCircle className="text-lg" />
              </Button>

              <Button
                size={"icon"}
                rounded={"full"}
                variant={"secondary"}
                disabled={!novelId}
                onClick={() => router.push(`/lightnovels/lightnovel/${novelId}`)}
              >
                <LuHome className="text-lg" />
              </Button>

              <Button
                size={"icon"}
                rounded={"full"}
                variant={"secondary"}
                onClick={() => setIsOpenChapterList(true)}
                disabled={!volumes || volumes.length === 0}
              >
                <LuListOrdered className="text-lg" />
              </Button>

              <Button
                size={"icon"}
                rounded={"full"}
                variant={"secondary"}
                onClick={() => setIsOpen(false)}
              >
                <LuX className="text-lg" />
              </Button>
            </>
          )
        }
      </div>

      {
        volumes && volumes.length > 0 && (
          <ChapterList
            isOpen={isOpenChapterList}
            onOpenChange={setIsOpenChapterList}
            currentChapter={currentChapter}
            volumes={volumes}
            novelName={novelName}
            authorId={authorId}
            novelId={novelId}
          />
        )
      }

      <CommentSheet
        isOpen={isOpenComment}
        onOpenChange={setIsOpenComment}
        commentFor='lightnovel chapter'
        contentId={currentChapter}
        authorId={authorId}
        totalComment={totalComment}
      />
    </>
  )
}

export default memo(MenuButton)