import { Featured } from "./components/Featured";
import { Hero } from "./components/Hero";
import { Process, Services, Statement } from "./components/Sections";
import { SiteFooter } from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Statement />
        <Services />
        <Featured />
        <Process />
      </main>
      <SiteFooter cta />
    </>
  );
}
