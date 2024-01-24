'use client';

import React, { FC, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation';

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
import { lightnovelSchema } from '@/schemas/lightnovel';
import MultiSelect from '../../ui/select-multi';
import { Textarea } from "@/components/ui/textarea"
import { compressFile } from '@/lib/compressFile';
import { uploadFiles } from '@/lib/uploadthing';
import { deleteFiles } from '@/actions/uploadthing';
import { Dropzone } from '../../ui/dropzone';
import { createLightnovel } from '@/actions/lightnovel';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import TiptapEditor from '@/components/shared/TextEditor/TiptapEditor';

type IProps = {
  categories: Category[] | null
}

const FormUploadLightnovel: FC<IProps> = ({ categories }) => {
  const [isUploadSmallImage, setIsUploadSmallImage] = useState<boolean>(false)
  const [image, setImage] = useState<{
    key: string,
    url: string
  }>({
    key: "",
    url: "",
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const form = useForm<z.infer<typeof lightnovelSchema>>({
    resolver: zodResolver(lightnovelSchema),
    defaultValues: {
      name: "",
    },
  })

  const router = useRouter()
  const [isPending, startTransiton] = useTransition()

  function onSubmit(values: z.infer<typeof lightnovelSchema>) {
    startTransiton(async () => {
      const res = await createLightnovel(JSON.stringify(values))

      if (res?.code !== 200) {
        toast.error(res?.message)
      } else {
        toast.success(res?.message, {
          description: res.submess
        })

        router.push(`/lightnovels/lightnovel/${res.data?.id}`)
      }
    })
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, endpoint: "smallImage") => {
    if (!e.target.files) return
    setIsUploadSmallImage(true)

    const result = await compressFile(
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
                  <FormLabel>Tên tác phẩm<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Tên tên khác</FormLabel>
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
                      <MultiSelect data={categories} content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
            }

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tác giả<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hoạ sĩ</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      content={field.name}
                      onChange={field.onChange}
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
                  <FormLabel>Ảnh tác phẩm</FormLabel>
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

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.name}
                      onChange={field.onChange}
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

export default FormUploadLightnovel