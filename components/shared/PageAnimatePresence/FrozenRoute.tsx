'use client'

import { useContext, useRef } from 'react'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const FrozenRoute: React.FC<React.PropsWithChildren> = ({ children }) => {

  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )

}

export default FrozenRoute