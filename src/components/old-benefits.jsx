// may delete this section later
// rn it's on the homepage and it was given to me by replit
export default function Benefits() {
  return (

  <section className="py-20 px-6 bg-secondary">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12 text-primary">
        Your Dog Deserves The Best
      </h2>
      <div className="grid md:grid-cols-4 gap-8">
        {[
          "Natural Ingredients",
          "Veterinarian Approved",
          "Personalized Plans",
          "Weekly Delivery"
        ].map((benefit, index) => (
          <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-lg font-semibold text-white">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
};