// components
import HorizontalSlider from "./HorizontalSlider";
import SelectedWork from "./SelectedWork";
import HorizontalWorkSlider from "./HorizontalWorkSlider";
import AboutMe from "./AboutMe";
import VideoRevel from "./VideoRevel";
import TextMarquee from "./TextMarquee";
import MyJourney from "./MyJourney";
import MyToolKit from "./MyToolKit";
import WhatIsNext from "./WhatIsNext";

export default function MainContent() {
  return (
    <section className="bg-charcoal">
      <HorizontalSlider />
      <SelectedWork />
      <HorizontalWorkSlider />
      <AboutMe />
      <VideoRevel />
      <TextMarquee />
      <MyJourney />
      <MyToolKit />
      <WhatIsNext />
    </section>
  );
}
