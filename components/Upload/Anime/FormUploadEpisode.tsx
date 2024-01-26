"use client"

import React, { FC, useEffect, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'

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

import TiptapEditor from '@/components/shared/TextEditor/TiptapEditor'
import { createLightnovelChapter } from '@/actions/lightnovel'
import { getSeasons } from '@/actions/anime'
import { animeEpisodeSchema } from '@/schemas/anime'

type IProps = {
  animeId: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const FormUploadEpisode: FC<IProps> = ({ animeId, onOpenChange }) => {
  const [isPending, startTransiton] = useTransition()
  const [isPendingUpload, startTransitonUpload] = useTransition()
  const [seasons, setSeasons] = useState<{
    id: string,
    name: string,
  }[] | null>(null)
  const [words, setWords] = useState<number>(0)

  useEffect(() => {
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
  }, [animeId, onOpenChange])

  const form = useForm<z.infer<typeof animeEpisodeSchema>>({
    resolver: zodResolver(animeEpisodeSchema),
    defaultValues: {

    },
  })

  function onSubmit(values: z.infer<typeof animeEpisodeSchema>) {
    startTransitonUpload(async () => {
      const res = await createLightnovelChapter(JSON.stringify(values), animeId, words)

      if (res?.code !== 200) {
        toast.error(res?.message)
      } else {
        toast.success(res?.message, {
          description: res.submess
        })
        localStorage.removeItem(`editor-new-content-${animeId}`)
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
                <FormLabel>Số thứ tự</FormLabel>
                <FormControl>
                  <Input placeholder="01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="season_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chọn volume</FormLabel>
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
                    id={animeId}
                    setWords={setWords}
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

export default FormUploadEpisode