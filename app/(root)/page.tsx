import { signOut } from "@/auth";
import Hero from "@/components/Home/Hero/Hero";
import MainSection from "@/components/Home/MainSection/MainSection";
import PageFadeInOut from "@/components/shared/PageAnimatePresence/PageFadeInOut";
import { Button } from "@/components/ui/button";

export default async function Home() {

  return (
    <PageFadeInOut>
      <div className="flex flex-col gap-5">
        <Hero />
        <MainSection />
      </div>
    </PageFadeInOut>
  )
}