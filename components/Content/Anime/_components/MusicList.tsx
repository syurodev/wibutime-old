import React, { FC } from 'react'
import { LuMusic } from 'react-icons/lu'

type IProps = {
  data: {
    type: MusicType,
    name: string,
    url?: string
  }[] | null
}


const MusicList: FC<IProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu hoặc danh sách bài hát trống!</p>;
  }

  // Tạo biến openings và endings
  const openings = data.filter(song => song.type === 'Opening Theme');
  const endings = data.filter(song => song.type === 'Ending Theme');

  return (
    <div className='flex-col md:flex-row flex gap-2'>
      <div
        className='w-full'
      >
        <p className='text-sm font-semibold'>Opening</p>
        <div className='flex flex-col gap-2'>
          {
            openings.map(song => (
              song.url ? (
                <a
                  href={song.url}
                  key={song.name}
                  target='_blank'
                  rel="noopener"
                  className='text-sm text-pretty'
                >
                  <LuMusic className="mr-1 inline-block" />{song.name}
                </a>
              ) : (
                <p
                  key={song.name}
                  className='text-sm text-pretty'
                >
                  <LuMusic className="mr-1 inline-block" />{song.name}
                </p>
              )
            ))
          }
        </div>
      </div>

      <div
        className='w-full'
      >
        <p className='text-sm font-semibold'>Ending</p>
        <div className='flex flex-col gap-2'>
          {
            endings.map(song => (
              song.url ? (
                <a
                  href={song.url}
                  key={song.name}
                  target='_blank'
                  rel="noopener"
                  className='text-sm text-pretty'
                >
                  <LuMusic className="mr-1 inline-block" />{song.name}
                </a>
              ) : (
                <p
                  key={song.name}
                  className='text-sm text-pretty'
                >
                  <LuMusic className="mr-1 inline-block" />{song.name}
                </p>
              )
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MusicList