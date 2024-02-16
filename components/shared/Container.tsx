import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className='h-full w-full pt-20 pb-5 px-5 max-w-[1400px] mx-auto'
    >
      {children}
    </div>
  )
}

export default Container