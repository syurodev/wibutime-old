'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IoPlayOutline, IoPauseOutline, IoVolumeOffOutline, IoVolumeMuteOutline, IoVolumeLowOutline, IoVolumeMediumOutline, IoVolumeHighOutline } from "react-icons/io5";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";

type IProps = {
  url: string
}

const VideoPlayer: FC<IProps> = ({ url }) => {
  const playerRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [currentDuration, setCurrentDuration] = useState<string>("00:00")
  const [percentComplete, setPercentComplete] = useState<number>(0)
  const [_, setTrigger] = useState<boolean>(false)

  const handleMuted = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.muted = !playerRef.current.muted

      setTrigger(trigger => !trigger)
    }
  }, [])

  const handleChangeVolume = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (playerRef.current) {
      playerRef.current.volume = Number(event.target.value)

      if (playerRef.current.volume === 0 || playerRef.current.volume !== 0 && playerRef.current.muted) {
        handleMuted()
      } else {
        setTrigger(trigger => !trigger)
      }
    }
  }, [handleMuted])

  const handleClickFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      playerRef.current?.requestFullscreen();
    }

    setIsFullScreen((isFullScreen) => !isFullScreen);
  }, [isFullScreen, setIsFullScreen]);

  const handleClickPlay = useCallback(() => {
    if (isPlaying) {
      playerRef.current?.pause()
    } else {
      playerRef.current?.play()
    }

    setIsPlaying(isPlaying => !isPlaying)
  }, [isPlaying, setIsPlaying])

  const timestampFormat = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2
    })
  }, [])

  const formatTimestamp = useCallback((time: number) => {
    const hours = Math.floor(time / (60 * 60))
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    if (hours === 0) {
      return `${minutes}:${timestampFormat.format(seconds)}`
    } else {
      return `${hours}:${timestampFormat.format(minutes)}:${timestampFormat.format(seconds)}`
    }
  }, [timestampFormat])

  const totalDuration = useMemo(() => {
    return formatTimestamp(playerRef.current?.duration || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatTimestamp, playerRef.current?.duration])

  const handleKeyPress = useCallback((
    event: KeyboardEvent
  ) => {
    if (document.activeElement?.tagName.toLocaleLowerCase() === "input") return

    const { key } = event

    switch (key.toLocaleLowerCase()) {
      case " ":
        handleClickPlay();
      default:
        return;
    }

  }, [handleClickPlay])

  const updateTimestamp = () => {
    setCurrentDuration(formatTimestamp(playerRef.current?.currentTime || 0))
    setPercentComplete(
      Math.round(
        (1000 * (playerRef.current?.currentTime || 0)) /
        (playerRef.current?.duration || 1)
      ) / 1000
    );
  }

  const handleTimeUpdate = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!timelineRef.current) return;

      const timelineBounds = timelineRef.current.getBoundingClientRect();
      const clickPosition = e.clientX;

      const timeWidth = clickPosition - timelineBounds?.left;
      const timelineWidth = timelineBounds.right - timelineBounds.left;

      const durationFraction = timeWidth / timelineWidth;

      if (playerRef.current)
        playerRef.current.currentTime =
          durationFraction * playerRef.current.duration;
    },
    [timelineRef, playerRef]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [setIsFullScreen]);

  return (
    <div
      className='relative w-full lg:w-[1100px] h-full max-h-[90%] flex items-center justify-center bg-background m-auto group'
    >
      <div
        className='absolute -bottom-[150px] left-1/2 -translate-x-1/2 rounded-lg bg-background/50 backdrop-blur-md transition-all group-hover:bottom-2 duration-500 cursor-pointer z-10 py-3 px-5 ease-in-out w-[400px] md:w-[500px] shadow'
      >
        <div
          className="flex flex-col items-center justify-between gap-2"
        >
          <div className='grid grid-cols-3 items-center justify-center w-full'>
            {/* Volume */}
            <div>
              <div
                className='flex items-center gap-2 group/volume'
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  rounded={"lg"}
                  className='opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-2'
                  onClick={handleMuted}
                >
                  {
                    playerRef.current?.muted ? (
                      <IoVolumeMuteOutline className="text-xl" />
                    ) : playerRef.current && playerRef.current?.volume <= 0.25 ? (
                      <IoVolumeOffOutline className="text-xl" />
                    ) : playerRef.current && playerRef.current?.volume <= 0.5 ? (
                      <IoVolumeLowOutline className="text-xl" />
                    ) : playerRef.current && playerRef.current?.volume <= 0.75 ? (
                      <IoVolumeMediumOutline className="text-xl" />
                    ) : (
                      <IoVolumeHighOutline className="text-xl" />
                    )
                  }
                </Button>

                <Input
                  type="range"
                  min={"0"}
                  max={"1"}
                  step={"any"}
                  value={playerRef.current?.volume || 0}
                  onChange={handleChangeVolume}
                  className='w-0 scale-0 group-hover/volume:w-24 group-hover/volume:scale-100 transition-all duration-200 ease-in-out origin-left'
                />
              </div>
            </div>

            {/* Play */}
            <div className='flex items-center justify-center'>
              <Button
                variant={"ghost"}
                size={"icon"}
                rounded={"lg"}
                className='opacity-0 group-hover:opacity-100 transition-all duration-200'
                onClick={handleClickPlay}
              >
                {isPlaying ? (
                  <IoPauseOutline className="text-3xl" />
                ) : (
                  <IoPlayOutline className="text-3xl" />
                )
                }
              </Button>
            </div>

            {/* Fullscreen */}
            <div className='flex justify-end -mr-2'>
              <Button
                variant={"ghost"}
                size={"icon"}
                rounded={"lg"}
                className='opacity-0 group-hover:opacity-100 transition-all duration-200'
                onClick={handleClickFullScreen}
              >
                {isFullScreen ? (
                  <RxExitFullScreen className="text-xl" />
                ) : (
                  <RxEnterFullScreen className="text-xl" />
                )
                }
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className='flex items-center gap-2 group/timeline justify-between h-2 w-full'>
            <span className='min-w-[70px] text-xs'>{currentDuration}</span>
            <div
              className='w-full '
              onClick={handleTimeUpdate}
              ref={timelineRef}
            >
              <Progress value={percentComplete * 100} />
            </div>
            <span className='min-w-[70px] text-end text-xs'>{totalDuration}</span>
          </div>
        </div>
      </div>

      <video
        ref={playerRef}
        src={url}
        autoPlay
        className='rounded-lg w-full aspect-video z-[5]'
        controls={false}
        onClick={handleClickPlay}
        onTimeUpdate={updateTimestamp}
      />
    </div>
  )
}

export default VideoPlayer