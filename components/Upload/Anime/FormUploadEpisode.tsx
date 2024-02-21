"use client"

import React, { FC, useEffect, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'
import { UploadButton, uploadFiles } from '@/lib/uploadthing'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createAnimeEpisode, getSeasons } from '@/actions/anime'
import { animeEpisodeSchema } from '@/schemas/anime'
import { deleteFiles } from '@/actions/uploadthing'
import { Dropzone } from '@/components/ui/dropzone'
import { compressImage } from '@/lib/compressImage'
import { Switch } from '@/components/ui/switch'

type IProps = {
  animeId: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  type?: ContextMenu
  seasonId?: string
}

const FormUploadEpisode: FC<IProps> = ({ animeId, onOpenChange, type, seasonId }) => {
  const [content, setContent] = useState<{
    key: string,
    url: string
  }>({
    key: "",
    url: ""
  })
  const [thumbnail, setThumbnail] = useState<{
    key: string,
    url: string
  }>({
    key: "",
    url: ""
  })
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadingThumbnail, setUploadingThumbnail] = useState<boolean>(false)
  const [isPending, startTransiton] = useTransition()
  const [isPendingUpload, startTransitonUpload] = useTransition()
  const [seasons, setSeasons] = useState<{
    id: string,
    name: string,
  }[] | null>(null)

  useEffect(() => {
    if (type && type === "anime season") return

    const fetchSeasons = async (animeId: string) => {
      const res = await getSeasons(animeId)

      if (res.code !== 200) {
        toast.warning(res.message)
        onOpenChange(false)
      } else {
        if (res.data && res.data.length === 0) {
          toast.warning("Không có season")
          onOpenChange(false)
        } else {
          setSeasons(res.data)
        }
      }
    }


    startTransiton(() => {
      fetchSeasons(animeId)
    })
  }, [animeId, onOpenChange, type])

  const form = useForm<z.infer<typeof animeEpisodeSchema>>({
    resolver: zodResolver(animeEpisodeSchema),
    defaultValues: {
      charge: false,
      thumbnail: {
        key: "",
        url: ""
      },
      content: {
        key: "",
        url: ""
      },
      season_id: type === 'anime season' ? seasonId : ""
    },
  })

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, endpoint: "smallImage") => {
    if (!e.target.files) return
    setUploadingThumbnail(true)

    const result = await compressImage(
      e.target.files, 1
    )
    if (thumbnail.key !== "") {
      await deleteFiles(thumbnail.key)
    }
    const [res] = await uploadFiles(endpoint, { files: [result] })

    setUploadingThumbnail(false)

    return res
  }

  function onSubmit(values: z.infer<typeof animeEpisodeSchema>) {
    startTransitonUpload(async () => {
      const res = await createAnimeEpisode(JSON.stringify(values), animeId)

      if (res?.code !== 200) {
        toast.error(res?.message)
      } else {
        toast.success(res?.message, {
          description: res.submess
        })
        onOpenChange(false)
      }
    })
  }

  return (
    isPending ? (
      <ReloadIcon className="h-4 w-4 animate-spin mx-auto" />
    ) :
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="index"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số thứ tự<span className='text-destructive'>*</span></FormLabel>
                <FormControl>
                  <Input placeholder="01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {
            type === "anime" && (
              <FormField
                control={form.control}
                name="season_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn season<span className='text-destructive'>*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn season" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          seasons && seasons.map((item) => {
                            return (
                              <SelectItem
                                key={`volume - ${item.id}`}
                                value={item.id}
                              >
                                {item.name}
                              </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          <FormField
            control={form.control}
            name="charge"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Tính phí</FormLabel>
                  <FormDescription>
                    Phí mặc định cho mỗi người mua là 200 Coins. Hệ thống sẽ thu 50 Coins và phần còn lại sẽ được cộng vào số Coins của bạn.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-start'>
                  Nội dung<span className='text-destructive'>*</span>
                  {
                    uploading && <ReloadIcon className="ml-2 h-4 w-4 animate-spin mx-auto" />
                  }
                  {
                    content.url !== "" && <span className='text-anime text-xs ml-2'>Đã tải lên 1 tệp</span>
                  }
                </FormLabel>
                <FormControl>
                  <div
                    className='w-full flex items-center justify-center'
                  >
                    <UploadButton
                      endpoint='animeVideo'
                      appearance={{
                        button:
                          "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 w-full",
                        container: "w-max flex-row rounded-lg border-cyan-300 bg-slate-800 w-80",
                        allowedContent:
                          "flex h-8 flex-col items-center justify-center px-2 text-white w-full",
                      }}
                      onBeforeUploadBegin={async (file) => {
                        setUploading(true)
                        if (content.key !== "") {
                          await deleteFiles(content.key)
                          setContent({
                            key: "",
                            url: ""
                          })
                        }
                        return file
                      }}
                      onClientUploadComplete={(res: {
                        name: string;
                        size: number;
                        key: string;
                        url: string;
                      }[]) => {
                        if (res) {
                          field.onChange({
                            key: res[0].key,
                            url: res[0].url
                          })
                          setContent({
                            key: res[0].key,
                            url: res[0].url
                          })
                          setUploading(false)
                        }
                        return
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(error.message)
                      }}
                    />

                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình thu nhỏ</FormLabel>
                <FormControl>
                  <Dropzone
                    type='file'
                    accept='image/*'
                    id="dropzone-file"
                    disabled={uploadingThumbnail}
                    value={thumbnail.url}
                    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                      const res = await handleUploadImage(e, "smallImage")
                      if (!res) return
                      field.onChange({
                        key: res.key,
                        url: res.url
                      })
                      setThumbnail({
                        key: res.key,
                        url: res.url
                      })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end'>
            <Button type="submit" disabled={isPendingUpload}>
              {
                isPendingUpload && <ReloadIcon className="mr-2 h-4 w-4 animate-spin mx-auto" />
              }
              Thêm Episode
            </Button>
          </div>
        </form>
      </Form>
  )
}

export default FormUploadEpisode