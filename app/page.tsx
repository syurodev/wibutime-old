import Hero from "@/components/Home/Hero/Hero";
import MainSection from "@/components/Home/MainSection/MainSection";

export default async function Home() {
  return (
    <div className="flex flex-col gap-3">
      <Hero />
      <MainSection />
    </div>
  )
}
