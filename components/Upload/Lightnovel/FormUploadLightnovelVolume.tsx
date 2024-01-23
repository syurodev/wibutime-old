"use client"

import { FC, useState, useTransition } from 'react'
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
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { lightnovelVolumeSchema } from '@/schemas/lightnovel'
import { compressFile } from '@/lib/compressFile';
import { uploadFiles } from '@/lib/uploadthing';
import { deleteFiles } from '@/actions/uploadthing';
import { Dropzone } from '../../ui/dropzone';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import { createLightnovelVolume } from '@/actions/lightnovel'

type IProps = {
  id: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const FormUploadLightnovelVolume: FC<IProps> = ({
  id,
  onOpenChange
}) => {
  const [isPending, startTransiton] = useTransition()
  const [isUploadSmallImage, setIsUploadSmallImage] = useState<boolean>(false)
  const [image, setImage] = useState<{
    key: string,
    url: string
  }>({
    key: "",
    url: "",
  });

  const form = useForm<z.infer<typeof lightnovelVolumeSchema>>({
    resolver: zodResolver(lightnovelVolumeSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof lightnovelVolumeSchema>) {
    startTransiton(async () => {
      const res = await createLightnovelVolume(values, id)

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

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, endpoint: "smallImage" | "coverImage") => {
    if (!e.target.files) return
    setIsUploadSmallImage(true)

    const result = await compressFile(
      e.target.files,
      endpoint === 'smallImage' ? 0.5 : 1
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Volume<span className='text-destructive'>*</span></FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh Volume</FormLabel>
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

        <div className='w-full flex justify-end'>
          <Button type="submit" disabled={isPending} className='min-w-[120px]'>
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Thêm Volume
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormUploadLightnovelVolume