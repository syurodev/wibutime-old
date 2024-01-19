"use client"

import { FC, ReactNode, memo, useState } from 'react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import UploadChapterOrEPWrapper from '@/components/Upload/UploadChapterOrEPWrapper'
import UploadSeasonOrVolumeWrapper from '@/components/Upload/UploadSeasonOrVolumeWrapper'

type IProps = {
  id: string,
  name: string,
  poster: boolean,
  type: ContentType,
  children: ReactNode
}

const ContextMenuComponent: FC<IProps> = ({
  type,
  poster = false,
  id,
  name,
  children,
}) => {

  const [isOpenUploadChapterOrEpisode, setIsOpenUploadChapterOrEpisode] = useState<boolean>(false)
  const [isOpenUploadVolumeOrSeason, setIsOpenUploadVolumeOrSeason] = useState<boolean>(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            <a href={`/${type}s/${type}/${id}`} target='_blank'>Mở bằng thẻ mới</a>
          </ContextMenuItem>
          {
            poster && (
              <>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger inset>Thao tác</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>
                      Chỉnh sửa
                    </ContextMenuItem>
                    {/* Volume/Season */}
                    {
                      type === "lightnovel" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadVolumeOrSeason(true)}>
                          Thêm Volume
                        </ContextMenuItem>
                      )
                    }
                    {
                      type === "manga" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadVolumeOrSeason(true)}>
                          Thêm Season
                        </ContextMenuItem>
                      )
                    }
                    {
                      type === "anime" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadVolumeOrSeason(true)}>
                          Thêm Season
                        </ContextMenuItem>
                      )
                    }
                    {/* Chapter/Episode */}
                    {
                      type === "lightnovel" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadChapterOrEpisode(true)}>
                          Thêm Chapter
                        </ContextMenuItem>
                      )
                    }
                    {
                      type === "manga" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadChapterOrEpisode(true)}>
                          Thêm Chapter
                        </ContextMenuItem>
                      )
                    }
                    {
                      type === "anime" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadChapterOrEpisode(true)}>
                          Thêm Episode
                        </ContextMenuItem>
                      )
                    }
                    <ContextMenuItem className='text-destructive'>
                      Xoá
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </>
            )
          }
        </ContextMenuContent>
      </ContextMenu>

      <UploadSeasonOrVolumeWrapper
        isOpen={isOpenUploadVolumeOrSeason}
        onOpenChange={setIsOpenUploadVolumeOrSeason}
        type={type}
        id={id}
        name={name}
      />

      <UploadChapterOrEPWrapper
        isOpen={isOpenUploadChapterOrEpisode}
        onOpenChange={setIsOpenUploadChapterOrEpisode}
        type={type}
        id={id}
        name={name}
      />
    </>
  )
}

export default memo(ContextMenuComponent)