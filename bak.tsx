<div className='flex flex-col gap-7 -mt-20'>
  <div className='flex gap-5 h-fit overflow-hidden -mx-4'>
    <div className='flex gap-5 h-fit w-full p-4 items-center pt-20'>
      <div className='relative min-w-[200px] max-w-[250px] min-h-[300px] max-h-[350px] h-full w-full aspect-[2/3] rounded-lg shadow-xl overflow-hidden'>
        <Image
          src={data.image ? data.image.url : "/images/default-content-image.jpeg"}
          alt={data.name}
          fill
          sizes='100%'
          priority
          className='object-cover'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <h2
          className='text-center text-pretty font-semibold text-xl'
        >
          {data.name}
        </h2>

        <div
          className='flex gap-4 justify-center -my-3'
        >
          {/* <div className='flex items-center gap-1'>
              <IoEyeOutline />
              <span className='text-xs'>{viewed}</span>
            </div> */}
          <Button
            variant={"ghost"}
            className='group items-center gap-1'
          >
            <GoHeart className="group-hover:text-rose-300 transition-colors" />
            <span className='text-xs'>{data.favorites.length}</span>
          </Button>
        </div>

        <div className='text-sm'>
          {
            data.author && (
              <p>
                <span>Tác giả: </span>
                <span>{data.author}</span>
              </p>
            )
          }

          {
            data.artist && (
              <p>
                <span>Hoạ sĩ: </span>
                <span>{data.artist}</span>
              </p>
            )
          }
        </div>

        {/* Categories */}
        <div className='flex justify-start gap-3 flex-wrap'>
          {
            data.categories.map((item, index) => {
              return (
                <Link
                  key={`category-${index}`}
                  href={"#"}
                  className={badgeVariants({ variant: "default" })}
                >
                  {item.name}
                </Link>
              )
            })
          }
        </div>

        <p
          className='text-xs text-pretty'
        >
          {data.summary}
        </p>
      </div>
    </div>

    {/* <Image
            src={data.image ? data.image.url : "/images/default-content-image.jpeg"}
            alt={data.name}
            fill
            sizes='100%'
            className='object-cover -z-10 blur-xl opacity-20 !min-h-[450px] !max-h-[55%]'
            priority
          /> */}
  </div>

  <div>
    <div
    >
      <Link
        className='flex items-center gap-2'
        href={`/u/${data.user.id}`}
      >
        <Avatar>
          <AvatarImage src={data.user.image || "/images/default-avatar.webp"} alt={data.user.name} />
          <AvatarFallback>{data.user.name}</AvatarFallback>
        </Avatar>
        <p>{data.user.name}</p>
        {/* <p className={`text-xs select-none p-2 bg-${type}`}>nhóm dịch</p> */}
        <Badge variant={data.type}>Nhóm dịch</Badge>
      </Link>
    </div>
  </div>

  <div
    className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_1fr]">

    {/* Info */}
    <div className='flex flex-col gap-7 md:order-last'>
      {/* {
              history && (
                <Card>
                  <CardHeader>
                    <CardTitle
                      className="text-lightnovel"
                    >
                      Tiếp tục
                    </CardTitle>
                    <CardDescription>Đọc lần cuối</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                        className={`${badgeVariants({ variant: "outline" })}`}
                        href={history?.url}
                      >
                        <span className='line-clamp-1'>
                          {history?.title}
                        </span>
                      </Link>
                    example
                  </CardContent>
                </Card>
              )
            } */}
    </div>

    {/* EP / Chapter */}
    <div className='flex flex-col gap-5'>

      <div className='flex flex-col gap-2'>

        <div className='flex flex-col justify-start gap-3 flex-wrap'>
          {
            data.volumes && data.volumes.map((item, index) => {
              return (
                <Card
                  key={`category-${index}`}
                >
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{`${item.chapters.length} Chapters`}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex gap-3'>
                    <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative'>
                      <Image
                        src={item.image ? item.image.url : "images/image2.jpeg"}
                        alt={item.name}
                        fill sizes='100%'
                        priority
                        className='object-cover'
                      />
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                      {
                        item.chapters.map((chapter, index) => {
                          return (
                            <Link
                              key={`${item.name}-${chapter.name}`}
                              href={"#"}
                            >
                              <div
                                className='flex items-center justify-between w-full'
                              >
                                <p className='line-clamp-1'>
                                  {chapter.name}
                                </p>

                                <span className='text-xs text-secondary-foreground'>
                                  {chapter.createdAt}
                                </span>
                              </div>
                            </Link>
                          )
                        })
                      }
                    </div>
                  </CardContent>
                </Card>
              )
            })
          }
        </div>
      </div>
    </div>
  </div>
</div>