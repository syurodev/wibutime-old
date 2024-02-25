import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react'

type IProps = {
  cate: {
    id: string;
    name: string;
    animes: number;
    mangas: number;
    lightnovels: number;
  }
}

const CategoryCard: FC<IProps> = ({ cate }) => {
  return (
    <Card className='shadow'>
      <CardHeader className='px-3 py-3'>
        <CardTitle className='text-base'>
          {cate.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='px-3 pb-3'>
        <p className='text-sm text-anime font-semibold'>Animes: {cate.animes}</p>
        <p className='text-sm text-manga font-semibold'>Mangas: {cate.mangas}</p>
        <p className='text-sm text-lightnovel font-semibold'>Lightnovels: {cate.lightnovels}</p>
      </CardContent>
    </Card>
  )
}

export default CategoryCard