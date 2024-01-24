import React from 'react'

import News from './News/News'
import Trending from './Trending/Trending'


const Hero = async () => {

  return (
    <section className='grid grid-cols-[1fr] lg:grid-cols-[3fr_1fr] gap-5'>
      <News />
      {/* <Trending /> */}
    </section>
  )
}

export default Hero