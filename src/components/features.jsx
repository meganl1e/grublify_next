// may delete this section later
// rn it's on the homepage and it was given to me by replit

export default function Features() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">
            Why Choose Grublify?
          </h2>
          <p className="text-lg text-secondary/80">
            AI-crafted recipes and essential nutrition packs for happy, healthy dogs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Ingredients",
              description: "Human-grade ingredients, carefully sourced and prepared fresh",
              image: "https://images.unsplash.com/photo-1609002186917-6437f7b745a7"
            },
            {
              title: "Customized Nutrition",
              description: "Portions and ingredients tailored to your dog's specific needs",
              image: "https://images.unsplash.com/photo-1534361960057-19889db9621e"
            },
            {
              title: "Convenient Delivery",
              description: "Fresh, perfectly portioned meals delivered right to your door",
              image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
            }
          ].map((feature, index) => (
            <div key={index}>
              <img 
                src={feature.image}
                alt={feature.title}
                className="w-full h-64 object-cover rounded-sm mb-4"
              />
              <div className="bg-primary/60 p-6 rounded-sm">
                <h3 className="text-xl font-bold mb-2 text-secondary">
                  {feature.title}
                </h3>
                <p className="text-secondary/90">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};