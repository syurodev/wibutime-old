import Hero from "@/components/Home/Hero/Hero";
import MainSection from "@/components/Home/MainSection/MainSection";

export default async function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <MainSection />
    </div>
  )
}
