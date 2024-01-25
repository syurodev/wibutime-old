import React, { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfo from './_component/Info'
import Uploaded from './_component/Uploaded'

type IProps = {
  data: UserProfile
}

const UserProfile: FC<IProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-5'>

      <div className='w-full mt-5 flex flex-col items-center'>
        <Avatar
          className='size-28'
        >
          <AvatarImage
            src={data.image || "images/default-avatar.webp"}
            alt={data.name}
            className='object-cover'
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>

        <p
          className='text-center font-semibold text-2xl lg:text-3xl'
        >
          {data.name}
        </p>

        {data.username && <p className='text-center text-xs text-secondary-foreground'>@{data.username}</p>}
      </div>

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]'>
        <UserInfo
          {...data}
          animes={data.animes.length}
          mangas={data.mangas.length}
          lightnovels={data.lightnovels.length}
        />

        <Uploaded
          {...data}
        />
      </div>
    </div>
  )
}

export default UserProfile