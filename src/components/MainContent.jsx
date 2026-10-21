// components
import HorizontalSlider from "./HorizontalSlider";
import SelectedWork from "./SelectedWork";
import HorizontalWorkSlider from "./HorizontalWorkSlider";
import AboutMe from "./AboutMe";
import VideoRevel from "./VideoRevel";

export default function MainContent() {
  return (
    <section className="bg-charcoal  ">
      <HorizontalSlider />
      <SelectedWork />
      <HorizontalWorkSlider />
      <AboutMe />
      <VideoRevel />
    </section>
  );
}
