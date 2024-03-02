"use client"

import { FC, ReactNode, memo, useState } from 'react'
import dynamic from 'next/dynamic';
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

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
import CreateAnimeLightnovelMangaWrapper from '@/components/Upload/CreateAnimeLightnovelMangaWrapper';

const UploadChapterOrEPWrapper = dynamic(() => import('@/components/Upload/UploadChapterOrEPWrapper'), {
  ssr: false,
});
const UploadSeasonOrVolumeWrapper = dynamic(() => import('@/components/Upload/UploadSeasonOrVolumeWrapper'), {
  ssr: false,
});

type IProps = {
  id?: string,
  name?: string,
  poster?: boolean,
  type?: ContextMenu,
  children: ReactNode
}

const ContextMenuComponent: FC<IProps> = ({
  type,
  poster = false,
  id,
  name,
  children,
}) => {
  const router = useRouter()
  const [isOpenUploadChapterOrEpisode, setIsOpenUploadChapterOrEpisode] = useState<boolean>(false)
  const [isOpenUploadVolumeOrSeason, setIsOpenUploadVolumeOrSeason] = useState<boolean>(false)
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className='w-full h-full'>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent
          className="w-56"
          sticky='always'
          forceMount
        >
          <ContextMenuItem inset onClick={() => router.refresh()}>
            <ReloadIcon /> <span className='ml-2'>Tải lại</span>
          </ContextMenuItem>

          {
            id && (
              <ContextMenuItem inset>
                <a href={`/${type}s/${type}/${id}`} target='_blank' rel="noopener">Mở bằng thẻ mới</a>
              </ContextMenuItem>
            )
          }
          {
            poster && (
              <>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger inset>Thao tác</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    {/* Lightnovel */}
                    {
                      type === "lightnovel" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadVolumeOrSeason(true)}>
                          Thêm Volume
                        </ContextMenuItem>
                      )
                    }
                    {
                      (type === "lightnovel" || type === "lightnovel volume") && (
                        <>
                          <ContextMenuItem onClick={() => setIsOpenUploadChapterOrEpisode(true)}>
                            Thêm Chapter
                          </ContextMenuItem>

                          <ContextMenuItem onClick={() => setIsOpenEdit(true)}>
                            Chỉnh sửa
                          </ContextMenuItem>
                        </>
                      )
                    }
                    {/* Anime */}
                    {
                      type === "manga" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadVolumeOrSeason(true)}>
                          Thêm Season
                        </ContextMenuItem>
                      )
                    }
                    {
                      (type === "manga" || type === "manga season") && (
                        <ContextMenuItem onClick={() => setIsOpenUploadChapterOrEpisode(true)}>
                          Thêm Chapter
                        </ContextMenuItem>
                      )
                    }
                    {/* Anime */}
                    {
                      type === "anime" && (
                        <ContextMenuItem onClick={() => setIsOpenUploadVolumeOrSeason(true)}>
                          Thêm Season
                        </ContextMenuItem>
                      )
                    }
                    {
                      (type === "anime" || type === "anime season") && (
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

      {
        id && type && name && (
          <UploadSeasonOrVolumeWrapper
            isOpen={isOpenUploadVolumeOrSeason}
            onOpenChange={setIsOpenUploadVolumeOrSeason}
            type={type}
            id={id}
            name={name}
          />
        )
      }

      {
        id && type && name && (
          <UploadChapterOrEPWrapper
            isOpen={isOpenUploadChapterOrEpisode}
            onOpenChange={setIsOpenUploadChapterOrEpisode}
            type={type}
            id={id}
            name={name}
          />
        )
      }

      {
        id && type && name && (
          <CreateAnimeLightnovelMangaWrapper
            isOpen={isOpenEdit}
            onOpenChange={setIsOpenEdit}
            type={type}
            id={id}
            name={name}
            edit={true}
          />
        )
      }
    </>
  )
}

export default memo(ContextMenuComponent)