import Container from '@/components/shared/Container'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import Content from './_components/Content'

type IProps = {
  params: {
    id: string
  }
}

const CategoryContents: FC<IProps> = async ({ params }) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/categories/${params.id}`,
    {
      cache: "no-cache"
    }
  )

  if (!res.ok) return notFound()

  const data: CategoryContents | null = await res.json()

  if (!data) return notFound()

  return (
    <Container>
      <Content data={data} />
    </Container>
  )
}

export default CategoryContents