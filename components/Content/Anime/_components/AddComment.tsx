import React from 'react'

import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'

const AddComment = () => {
  return (
    <div className='w-full flex flex-col gap-3'>
      <Textarea className='w-full' />

      <div className='flex gap-3 justify-end'>
        <Button
          variant={"outline"}
          rounded={"full"}
        >
          Huỷ
        </Button>
        <Button
          variant={"default"}
          rounded={"full"}
        >
          Bình luận
        </Button>
      </div>
    </div>
  )
}

export default AddComment