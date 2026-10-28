// lib
import { useEffect } from "react";

// components
import SelectedWork from "../components/SelectedWork";
import HorizontalWorkSlider from "../components/HorizontalWorkSlider";

export default function WorkPage() {
  useEffect(() => {
    document.title = "Work | Mohamed Magdy";
  }, []);

  return (
    <section className="min-h-screen bg-charcoal">
      <SelectedWork />
      <HorizontalWorkSlider />
    </section>
  );
}
