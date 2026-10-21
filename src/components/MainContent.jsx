// components
import HorizontalSlider from "./HorizontalSlider";
import SelectedWork from "./SelectedWork";
import HorizontalWorkSlider from "./HorizontalWorkSlider";
import AboutMe from "./AboutMe";

export default function MainContent() {
  return (
    <section className="bg-charcoal  ">
      <HorizontalSlider />
      <SelectedWork />
      <HorizontalWorkSlider />
      <AboutMe />
    </section>
  );
}
