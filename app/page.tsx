import Banner from "@/components/Home/Banner/Banner";
import Image from "next/image";

export default async function Home() {
  return (
    <section className="pt-11 flex flex-col gap-3">
      <Image src={"/images/bg.png"} alt="" fill className="object-cover" />
      {/* <Banner /> */}
    </section>
  )
}
