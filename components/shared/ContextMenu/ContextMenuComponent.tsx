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

  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false)

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
                    {
                      type === "lightnovel" && (
                        <ContextMenuItem onClick={() => setIsOpenUpload(true)}>
                          Thêm chap
                        </ContextMenuItem>
                      )
                    }
                    {
                      type === "manga" && (
                        <ContextMenuItem onClick={() => setIsOpenUpload(true)}>
                          Thêm chap
                        </ContextMenuItem>
                      )
                    }
                    {
                      type === "anime" && (
                        <ContextMenuItem onClick={() => setIsOpenUpload(true)}>
                          Thêm tập
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

      <UploadChapterOrEPWrapper
        isOpen={isOpenUpload}
        onOpenChange={setIsOpenUpload}
        type={type}
        id={id}
        name={name}
      />
    </>
  )
}

export default memo(ContextMenuComponent)