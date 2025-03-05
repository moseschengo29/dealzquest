import Section from "./Section";
import { heroBackground } from "../assets";

function Loader() {
  return (
    <Section className="relative  h-screen">
      <div className="relative w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[0%]">
        <img
          src={heroBackground}
          className="w-full"
          width={1440}
          height={840}
          alt="hero"
        />
      </div>

      {/* Spinner */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-t-transparent border-[#FFF94F] z-50 text-[#FFF94F]"></div>
      </div>
    </Section>
  );
}

export default Loader;
