import ContextMenuComponent from '@/components/shared/ContextMenu/ContextMenuComponent'
import Header from '@/components/shared/Header/Header'
import React from 'react'

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <Header />
      <ContextMenuComponent>
        <div className='min-h-dvh w-screen overflow-hidden'>
          {children}
        </div>
      </ContextMenuComponent>
    </main>
  )
}

export default MainLayout