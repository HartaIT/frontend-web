import FocusedSVG from "../assets/focused-working-ff.svg";

function Hero() {
  return (
    <div className="hero rounded-md md:p-12">
      <div className="hero-content flex-col justify-center space-y-4 md:justify-start md:space-x-8 md:space-y-0 lg:flex-row">
        <img src={FocusedSVG} alt="Your SVG" className="w-96 md:mr-8" />
        <div>
          <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-800 bg-clip-text p-2 text-6xl font-black tracking-tight text-transparent lg:text-7xl">
            Cauti concursuri si nu le mai gasesti?
          </h1>
          <p className="ml-2 py-4 text-lg font-medium md:py-6 md:text-2xl lg:text-4xl">
            Ai ajuns in locul potrivit! Aici gasesti toate concursurile din
            Romania, cat si internship-uri sau workshop-uri!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
