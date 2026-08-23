import { Hero } from "@/components/home/hero";
import { ActProblem } from "@/components/home/act-problem";
import { ActSupersession } from "@/components/home/act-supersession";
import { ActSpecimens } from "@/components/home/act-specimens";
import { ActExit } from "@/components/home/act-exit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActProblem />
      <ActSupersession />
      <ActSpecimens />
      <ActExit />
    </>
  );
}
