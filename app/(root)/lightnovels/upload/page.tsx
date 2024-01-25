import React from 'react'
import Link from 'next/link'

import { getServerSession } from '@/lib/getServerSession'
import FormCreateLightnovel from '@/components/Upload/Lightnovel/FormCreateLightnovel'
import { getAllCategories } from '@/actions/categories'
import { buttonVariants } from '@/components/ui/button'

const UploadPage = async () => {

  const session = await getServerSession()

  if (!session || !session.permissions.includes("UPLOAD")) {
    return (
      <div className='w-full h-dvh flex items-center justify-center'>
        <div>
          <h3>Bạn không có quyền thực hiện chức năng này!</h3>
          <Link className={buttonVariants({ variant: "default" })} href="/">Về trang chủ</Link>
        </div>
      </div>
    )
  }

  const categories = await getAllCategories()

  return (
    <div>
      <FormCreateLightnovel categories={categories.data} />
    </div>
  )
}

export default UploadPage