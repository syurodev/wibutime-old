'use client';

import React, { FC, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tag, TagInput } from "@/components/ui/tag-input";
import { animeSchema } from '@/schemas/anime';
import MultiSelect from '../../ui/select-multi';
import { compressImage } from '@/lib/compressImage';
import { uploadFiles } from '@/lib/uploadthing';
import { deleteFiles } from '@/actions/uploadthing';
import { Dropzone } from '../../ui/dropzone';
import TiptapEditor from '@/components/shared/TextEditor/TiptapEditor';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from "@/lib/utils"
import { TimePicker } from '@/components/ui/time-picker';
import DaysOfTheWeekPick from '@/components/shared/DaysOfTheWeekPick';
import { getDayOfWeek } from '@/lib/getDayOfWeek';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAnime } from '@/actions/anime';

type IProps = {
  categories: Category[] | null
}

const FormCreateAnime: FC<IProps> = ({ categories }) => {
  const [isUploadSmallImage, setIsUploadSmallImage] = useState<boolean>(false)
  const [image, setImage] = useState<{
    key: string,
    url: string
  }>({
    key: "",
    url: "",
  });
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof animeSchema>>({
    resolver: zodResolver(animeSchema),
    defaultValues: {
      name: "",
      broadcast_time: new Date(),
      broadcast_day: getDayOfWeek(new Date()),
      musics: [{
        type: "Opening Theme",
        name: "",
      }],
      studio: "",
      number_of_episodes: 1,
    },
  })

  const { fields: fieldsMusic, append: appendMusic, remove: removeMusic } = useFieldArray({
    control: form.control,
    name: "musics",
  },);

  const router = useRouter()
  const [isPending, startTransiton] = useTransition()

  function onSubmit(values: z.infer<typeof animeSchema>) {
    startTransiton(async () => {
      const res = await createAnime(JSON.stringify(values))
      if (res?.code !== 200) {
        toast.error(res?.message)
      } else {
        toast.success(res?.message, {
          description: res.submess
        })
        // localStorage.removeItem(`editor-new-anime-summary-}`)
        // localStorage.removeItem(`editor-new-anime-note-}`)
        router.push(`/animes/anime/${res.data?.id}`)
      }
    })
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, endpoint: "smallImage") => {
    if (!e.target.files) return
    setIsUploadSmallImage(true)

    const result = await compressImage(
      e.target.files, 1
    )
    if (image.key !== "") {
      await deleteFiles(image.key)
    }
    const [res] = await uploadFiles(endpoint, { files: [result] })

    setIsUploadSmallImage(false)

    return res
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className='flex flex-col lg:flex-row gap-6 w-full'>
          <div className='w-full space-y-6'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên anime<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="other_names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên tên khác<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Nhập tên khác"
                      tags={tags}
                      shape={"rounded"}
                      animation={"slideIn"}
                      className="sm:min-w-[450px]"
                      setTags={(newTags) => {
                        setTags(newTags);
                        field.onChange(newTags as [Tag, ...Tag[]]);
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {categories && (
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thể loại<span className='text-destructive'>*</span></FormLabel>
                    <FormControl>
                      <MultiSelect
                        data={categories}
                        content={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
            }

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại<span className='text-destructive'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Loại anime" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LongEpisode">Dài tập</SelectItem>
                      <SelectItem value="Movie">Movie</SelectItem>
                      <SelectItem value="Ova">Ova</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_episodes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tập<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Studio<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày công chiếu<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Chọn ngày công chiếu</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 ml-3" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={isPending}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="broadcast_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lịch phát sóng<span className='text-destructive'>*</span></FormLabel>
                  <FormDescription>
                    <span>Lịch phát sóng hằng tuần</span>
                  </FormDescription>
                  <FormControl>
                    <div className='flex items-end justify-center gap-2 flex-wrap'>
                      <DaysOfTheWeekPick day={field.value as DaysOfTheWeek} setDay={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="broadcast_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-end justify-center gap-2 flex-wrap'>
                      <TimePicker date={field.value} setDate={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tóm tắt<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      contentFor='summary'
                      contentType='anime'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full flex flex-col gap-6'>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh bìa</FormLabel>
                  <FormControl>
                    <Dropzone
                      type='file'
                      accept='image/*'
                      id="dropzone-file"
                      disabled={isUploadSmallImage}
                      value={image.url}
                      onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                        const res = await handleUploadImage(e, "smallImage")
                        if (!res) return
                        field.onChange({
                          key: res.key,
                          url: res.url
                        })
                        setImage({
                          key: res.key,
                          url: res.url
                        })
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Ảnh dạng đứng
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-3'>
              {
                fieldsMusic.map((field, i) => {
                  return (
                    <div
                      key={field.id}
                      className='flex items-start gap-3 w-full'
                    >
                      <div className='w-full flex flex-col gap-3'>
                        <FormField
                          control={form.control}
                          name={`musics.${i}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Loại bài hát<span className='text-destructive'>*</span></FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn loại bài hát" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Opening Theme">Opening Theme</SelectItem>
                                    <SelectItem value="Ending Theme">Ending Theme</SelectItem>
                                    <SelectItem value="OST">OST</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`musics.${i}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tên bài hát<span className='text-destructive'>*</span></FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`musics.${i}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link</FormLabel>
                              <FormDescription>
                                <span>Chỉ chấp nhận liên kết Youtube và Spotify</span>
                              </FormDescription>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        variant={"destructive"}
                        onClick={() => removeMusic(i)}
                        className='mt-8'
                        type='button'
                      >
                        Xoá
                      </Button>
                    </div>
                  )
                })
              }

              <div
                className='border rounded-lg px-4 py-2 w-fit text-sm cursor-pointer'
                onClick={() => appendMusic({
                  type: "Opening Theme",
                  name: "",
                })}
              >
                Thêm bài hát
              </div>
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      contentFor='note'
                      contentType='anime'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='w-full flex justify-end'>
          <Button type="submit" disabled={isPending} className='min-w-[120px]'>
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Đăng
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormCreateAnime