function Testimonials() {
  return (
    <div className=" flex flex-col items-center justify-center space-y-8">
      <h3 className="-mb-6 font-medium opacity-80">Recenzii</h3>
      <h1 className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text pb-2 text-center text-5xl font-black tracking-tight text-transparent">
        Folosit de o gramada de oameni grozavi
      </h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
        {[...Array(6)].map((_item, index) => (
          <div
            className="card w-auto rounded-md border border-base-300 bg-base-200/30 transition-all duration-75 hover:scale-110 lg:w-96"
            key={index}
          >
            <div className="card-body space-y-2">
              <p className="text-sm lg:text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate iste at illo commodi amet laboriosam inventore, a
                possimus suscipit quo?
              </p>
              <h2 className="card-title flex items-end justify-between">
                <a href="#" className="flex flex-col">
                  <span className="text-xl font-medium">Titlu</span>
                  <span className="text-sm font-normal opacity-75">
                    @testapp
                  </span>
                </a>
                <div className="avatar">
                  <div className="w-12 rounded-md">
                    <img
                      src="https://api.dicebear.com/7.x/pixel-art/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
                      alt="avatar"
                    />
                  </div>
                </div>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
