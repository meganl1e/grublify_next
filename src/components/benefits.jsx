export default function Benefits() {
  return (
    <div className="bg-white">

      <div className="flex-1 py-8"> 

        {/* sub headline */}
        <section className="relative py-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-semibold mb-12 text-secondary">
              Your Dog Deserves <span className="text-primary">The Best</span>
            </h1>
          </div>


          <div className="max-w-5xl mx-auto space-y-12">

            <section className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="h-[300px] overflow-hidden rounded-md">
                  <img 
                    src="https://images.unsplash.com/photo-1634898635164-fbe5425b9d86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="woman"
                    className="w-full h-full object-cover object-bottom rounded-md"
                  />
                </div>

              </div>
              <div className="flex-1 space-y-6">
                <h1 className="text-3xl font-medium text-secondary/90">
                  Simple recipes for your pup
                </h1>
                <p className="text-xl text-secondary/80">
                  Easy homemade recipes and nutrition packs for complete, balanced meals
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-3xl font-medium text-secondary/90">
                  Complete nutrition, no guesswork
                </h1>
                <p className="text-xl text-secondary/80">
                  Our recipes meet AAFCO standards, ensuring your dog gets all the essential vitamins and minerals
                </p>
              </div>
              <div className="flex-1">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1718652417723-9a2bf74e28c3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="woman "
                  className="w-full h-full object-cover object-bottom rounded-md"
                />
              </div>
            </section>

          </div>
        </section>
      </div>
    </div>
  )
};