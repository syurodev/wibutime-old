"use client"

import React, { FC, useEffect, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'

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

import { lightnovelChapterSchema } from '@/schemas/lightnovel'
import { createLightnovelChapter, getVolumes } from '@/actions/lightnovel'
import { Switch } from '@/components/ui/switch'

const TiptapEditor = dynamic(() => import('@/components/shared/TextEditor/TiptapEditor'), {
  ssr: true,
});

type IProps = {
  novelId: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}

const FormUploadLightnovelChapter: FC<IProps> = ({ novelId, onOpenChange, open }) => {
  const [isPending, startTransiton] = useTransition()
  const [isPendingUpload, startTransitonUpload] = useTransition()
  const [volumes, setVolumes] = useState<{
    id: string,
    name: string,
    image?: {
      key?: string,
      url: string
    } | {} | null
  }[] | null>(null)
  const [words, setWords] = useState<number>(0)

  useEffect(() => {
    const fetchVolumes = async (novelId: string) => {
      const res = await getVolumes(novelId)

      if (res.code !== 200) {
        toast.warning(res.message)
        onOpenChange(false)
      } else {
        if (res.data && res.data.length === 0) {
          toast.warning("Không có volumes")
          onOpenChange(false)
        } else {
          setVolumes(res.data)
        }
      }
    }

    startTransiton(() => {
      fetchVolumes(novelId)
    })
  }, [novelId, onOpenChange])

  const form = useForm<z.infer<typeof lightnovelChapterSchema>>({
    resolver: zodResolver(lightnovelChapterSchema),
    defaultValues: {
      name: "",
      charge: false
    },
  })

  function onSubmit(values: z.infer<typeof lightnovelChapterSchema>) {

    startTransitonUpload(async () => {
      const res = await createLightnovelChapter(JSON.stringify(values), novelId, words)

      if (res?.code !== 200) {
        toast.error(res?.message)
      } else {
        // localStorage.removeItem(`editor-new-lightnovel-content-${novelId}}`)
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chapter</FormLabel>
                <FormControl>
                  <Input placeholder="example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volume_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chọn volume</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn volume" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      volumes && volumes.map((item) => {
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
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  {
                    open && (
                      <TiptapEditor
                        content={field.value}
                        onChange={field.onChange}
                        contentId={novelId}
                        setWords={setWords}
                        contentFor='content'
                        contentType='lightnovel'
                      />
                    )
                  }
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
              Thêm Chapter
            </Button>
          </div>
        </form>
      </Form>
  )
}

export default FormUploadLightnovelChapter