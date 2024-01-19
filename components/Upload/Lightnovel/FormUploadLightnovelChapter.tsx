"use client"

import React, { FC, useEffect, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import TiptapEditor from '@/components/shared/TextEditor/TiptapEditor'
import { createLightnovelChapter, getVolumes } from '@/actions/lightnovel'
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'

type IProps = {
  novelId: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const FormUploadLightnovelChapter: FC<IProps> = ({ novelId, onOpenChange }) => {
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
    },
  })

  function onSubmit(values: z.infer<typeof lightnovelChapterSchema>) {
    startTransitonUpload(async () => {
      const res = await createLightnovelChapter(JSON.stringify(values), novelId)

      if (res?.code !== 200) {
        toast.error(res?.message)
      } else {
        toast.success(res?.message, {
          description: res.submess
        })
        localStorage.removeItem(`editor-new-content-${novelId}`)
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
            name="volumeId"
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.name}
                    onChange={field.onChange}
                    id={novelId}
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
              Thêm Chapter
            </Button>
          </div>
        </form>
      </Form>
  )
}

export default FormUploadLightnovelChapter