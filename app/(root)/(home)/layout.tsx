import React from 'react'
import Container from '@/components/shared/Container'

const Layout = ({
  news,
  trending,
  continue_section,
  children,
}: {
  news: React.ReactNode
  trending: React.ReactNode
  continue_section: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <Container>
      <section className='grid grid-cols-[1fr] lg:grid-cols-[3fr_1fr] gap-5'>
        {news}
        {trending}
      </section>
      {continue_section}
      {children}
    </Container>
  )
}

export default Layout