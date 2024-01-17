import React, { FC } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardItem from '@/components/shared/Card/CardItem'
import { getServerSession } from '@/lib/getServerSession'

type IProps = {
  animes: AnimeQuickInformation[],
  mangas: MangaQuickInformation[],
  lightnovels: LightnovelQuickInformation[],
}

const Uploaded: FC<IProps> = async ({
  animes,
  mangas,
  lightnovels,
}) => {
  const session = await getServerSession()

  return (
    <Tabs defaultValue="animes" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="animes">Animes</TabsTrigger>
        <TabsTrigger value="mangas">Mangas</TabsTrigger>
        <TabsTrigger value="lightnovels">Lightnovels</TabsTrigger>
      </TabsList>
      <TabsContent value="animes" className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          animes && animes.length > 0 ? (
            animes.map((item, index) => {
              return (
                <CardItem
                  key={`lightnovel - ${item.name}`}
                  {...item}
                  image={item.image as {
                    key?: string;
                    url: string;
                  } | null | undefined
                  }
                  type='lightnovel'
                  poster={session && item.user.id === session.id || false}
                />
              )
            })
          ) : (
            <p>Không có anime</p>
          )
        }
      </TabsContent>
      <TabsContent value="mangas" className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          mangas && mangas.length > 0 ? (
            mangas.map((item, index) => {
              return (
                <CardItem
                  key={`lightnovel - ${item.name}`}
                  {...item}
                  image={item.image as {
                    key?: string;
                    url: string;
                  } | null | undefined
                  }
                  type='lightnovel'
                  poster={session && item.user.id === session.id || false}
                />
              )
            })
          ) : (
            <p>Không có manga</p>
          )
        }
      </TabsContent>
      <TabsContent value="lightnovels" className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          lightnovels && lightnovels.length > 0 ? (
            lightnovels.map((item, index) => {
              return (
                <CardItem
                  key={`lightnovel - ${item.name}`}
                  {...item}
                  image={item.image as {
                    key?: string;
                    url: string;
                  } | null | undefined
                  }
                  type='lightnovel'
                  poster={session && item.user.id === session.id || false}
                />
              )
            })
          ) : (
            <p>Không có lightnovel</p>
          )
        }
      </TabsContent>
    </Tabs>
  )
}

export default Uploaded