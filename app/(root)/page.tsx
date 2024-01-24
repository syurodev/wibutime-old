import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import Hero from "@/components/Home/Hero/Hero";
import MainSection from "@/components/Home/MainSection/MainSection";
import { getHero } from '@/actions/home';

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["news", "trending"],
    queryFn: getHero
  })

  return (
    <div className="flex flex-col gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Hero />
      </HydrationBoundary>
      <MainSection />
    </div>
  )
}
