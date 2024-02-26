
import Hero from "@/components/Home/Hero/Hero";
import MainSection from "@/components/Home/MainSection/MainSection";
import Container from "@/components/shared/Container";

export default async function Home() {
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <MainSection />
      </div>
    </Container>
  )
}
