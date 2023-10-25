import Hero from "../components/Hero";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CTA />
      <div className="pb-6 pt-2 md:pb-12 md:pt-4 " />
      <Testimonials />
    </div>
  );
}

export default Home;
