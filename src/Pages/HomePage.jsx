// components
import HorizontalSlider from "../components/HorizontalSlider";
import SelectedWork from "../components/SelectedWork";
import HorizontalWorkSlider from "../components/HorizontalWorkSlider";
import AboutMe from "../components/AboutMe";
import VideoRevel from "../components/VideoRevel";
import TextMarquee from "../components/TextMarquee";
import MyJourney from "../components/MyJourney";
import MyToolKit from "../components/MyToolKit";
import WhatIsNext from "../components/WhatIsNext";

export default function HomePage() {
  return (
    <>
      <section className="bg-charcoal">
        <HorizontalSlider />
        <SelectedWork />
        <HorizontalWorkSlider />
        <AboutMe />
        {/* <VideoRevel /> */}
        <TextMarquee />
        <MyJourney />
        <MyToolKit />
        <WhatIsNext />
      </section>
    </>
  );
}
