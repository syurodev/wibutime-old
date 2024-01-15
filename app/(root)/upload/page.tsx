import React from 'react'
import { redirect } from 'next/navigation'

import { getServerSession } from '@/lib/getServerSession'
import FormUploadLightnovel from '@/components/Upload/FormUploadLightnovel'
import { getAllCategories } from '@/actions/categories'

const UploadPage = async () => {

  const session = await getServerSession()

  if (!session || !session.permissions.includes("UPLOAD")) {
    redirect("/")
  }

  const categories = await getAllCategories()

  return (
    <div>
      <FormUploadLightnovel categories={categories.data} />
    </div>
  )
}

export default UploadPage