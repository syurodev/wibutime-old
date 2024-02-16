import React from 'react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { getServerSession } from '@/lib/getServerSession'
import { getAllCategories } from '@/actions/categories'
import FormCreateAnime from '@/components/Upload/Anime/FormCreateAnime'
import Container from '@/components/shared/Container'

const CreateAnimePage = async () => {
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
    <Container>
      <FormCreateAnime categories={categories.data} />
    </Container>
  )
}

export default CreateAnimePage