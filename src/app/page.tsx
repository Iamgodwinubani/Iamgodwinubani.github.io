import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Stack } from "@/components/sections/Stack";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Expertise />
      <Stack />
      <Approach />
      <Contact />
    </>
  );
}
