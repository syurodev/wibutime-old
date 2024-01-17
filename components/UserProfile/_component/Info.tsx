import React, { FC } from 'react'

type IProps = {
  description?: string | null,
  animes: number,
  mangas: number,
  lightnovels: number,
}

const UserInfo: FC<IProps> = ({
  description,
  animes,
  mangas,
  lightnovels,
}) => {
  return (
    <div className='w-full lg:order-last'>
      {
        // description && (
        <p className='font-serif text-pretty'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quo porro aperiam deleniti laboriosam dolorem perspiciatis ab voluptates eaque fugiat in tempore velit, illum pariatur dolor accusamus cum repellendus non.</p>
        // )
      }

      <div>
        <div className='flex justify-center items-center gap-5'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-medium text-anime'>
              Animes
            </p>
            <p className='text-sm'>{animes}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-medium text-manga'>
              Mangas
            </p>
            <p className='text-sm'>{mangas}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-medium text-lightnovel'>
              Lightnovels
            </p>
            <p className='text-sm'>{lightnovels}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo